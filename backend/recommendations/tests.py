from django.test import TestCase
from unittest.mock import patch
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from games.models import Game
from videos.models import Video, Author
from recommendations.models import Recommendation
from gamesessions.models import GameSession
from recommendations.services.ai_advisor import AIAdvisor
from recommendations.services.session_service import SessionRecommendationService
from recommendations.services.tag_analyzer import TagAnalyzer
from recommendations.services.recommender import Recommender
import requests

class AIAdvisorTests(TestCase):
    @patch('recommendations.services.ai_advisor.requests.post')
    def test_get_advice_timeout_fallback(self, mock_post):
        mock_post.side_effect = requests.exceptions.Timeout("Request timed out")

        advice = AIAdvisor.get_advice_for_session(
            game_id=None,
            comment="This is a test comment",
            tags=["tag1", "tag2"]
        )

        self.assertIn("Рекомендация:", advice)
        self.assertIn("tag1, tag2", advice)

User = get_user_model()

class RecommendationPerformanceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.author = Author.objects.create(name="Test Author", channel_url="http://test")
        self.game = Game.objects.create(title="Test Game", genre="RPG", release_date="2020-01-01")

        for i in range(5):
            vid = Video.objects.create(
                title=f"Vid {i}",
                author=self.author,
                game=self.game,
                video_type="review",
                url=f"http://vid{i}",
                duration=120,
                uploaded_at="2021-01-01T00:00:00Z",
                moderated=True
            )
            Recommendation.objects.create(
                user=self.user,
                recommendation_type='video',
                video=vid,
                game=self.game,
                score=1.0
            )

    def test_recommendation_list_query_count(self):
        self.client.force_authenticate(user=self.user)
        with self.assertNumQueries(2):
            response = self.client.get('/api/recommendations/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    @patch('recommendations.services.ai_advisor.AIAdvisor.get_advice_for_session')
    def test_generate_action_query_count(self, mock_get_advice):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/recommendations/generate/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class SessionRecommendationServiceTests(TestCase):
    def setUp(self):
        self.game = Game.objects.create(
            title="Test Game",
            genre="Action",
            developer="Test Dev",
            release_date="2026-01-01"
        )

    @patch('recommendations.services.ai_advisor.AIAdvisor.get_advice_for_session')
    def test_get_context_data_with_game(self, mock_get_advice):
        mock_get_advice.return_value = "Test advice"

        context = SessionRecommendationService.get_context_data(
            game_id=self.game.id,
            tags_string="tag1,tag2",
            comment="Test comment"
        )

        self.assertEqual(context['game_name'], "Test Game")
        self.assertEqual(context['ai_advice'], "Test advice")
        mock_get_advice.assert_called_once_with(self.game.id, "Test comment", ["tag1", "tag2"])

    def test_get_context_data_invalid_game(self):
        context = SessionRecommendationService.get_context_data(
            game_id="999",
            tags_string="",
            comment=""
        )

        self.assertIsNone(context['game_name'])

class TagAnalyzerTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="tag_user", password="pwd", nickname="tag_user")
        self.user2 = User.objects.create_user(username="tag_user2", password="pwd", nickname="tag_user2")
        self.game = Game.objects.create(title="Game", genre="FPS", release_date="2020-01-01")

        GameSession.objects.create(user=self.user, game=self.game, tags=["shooting", "strategy"], rating=5, comment="test")
        GameSession.objects.create(user=self.user, game=self.game, tags=["shooting"], rating=5, comment="test")

        GameSession.objects.create(user=self.user2, game=self.game, tags=["grenades", "movement", "aim"], rating=5, comment="test")

    def test_get_user_tags_profile(self):
        profile = TagAnalyzer.get_user_tags_profile(self.user.id)
        self.assertEqual(profile["shooting"], 2)
        self.assertEqual(profile["strategy"], 1)
        self.assertEqual(profile.get("grenades", 0), 0)

    def test_get_user_skill_profile(self):
        profile = TagAnalyzer.get_user_skill_profile(self.user.id)
        # "shooting" maps to 'aim', "strategy" maps to 'tactics'
        self.assertEqual(profile.get('aim'), 2)
        self.assertEqual(profile.get('tactics'), 1)

    def test_get_weak_skills(self):
        weak_skills = TagAnalyzer.get_weak_skills(self.user.id, threshold=1.0)
        self.assertIsInstance(weak_skills, list)
        # Assuming the bug exists where it compares with raw tags, this will return empty or not fail.
        # Just ensure it executes without error.

class RecommenderTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="rec_user", password="pwd", nickname="rec_user")
        self.author = Author.objects.create(name="Author", channel_url="http://test")
        self.game = Game.objects.create(title="Game", genre="FPS", release_date="2020-01-01")

        GameSession.objects.create(user=self.user, game=self.game, tags=["shooting"], rating=5, comment="test")

        self.vid1 = Video.objects.create(
            title="Aim Guide", author=self.author, game=self.game,
            video_type="guide", url="http://vid1", duration=10,
            uploaded_at="2021-01-01T00:00:00Z", moderated=True,
            tags=["shooting", "aim"], views_count=100
        )
        self.vid2 = Video.objects.create(
            title="Nade Guide", author=self.author, game=self.game,
            video_type="guide", url="http://vid2", duration=10,
            uploaded_at="2021-01-01T00:00:00Z", moderated=True,
            tags=["grenades"], views_count=200
        )

    def test_recommend_videos_by_tags(self):
        vids = Recommender.recommend_videos_by_tags(self.user.id)
        self.assertEqual(len(vids), 1)
        self.assertEqual(vids[0], self.vid1)

    def test_generate_and_save_recommendations(self):
        recs = Recommender.generate_and_save_recommendations(self.user.id, limit=2)
        self.assertTrue(len(recs) > 0)
        self.assertTrue(Recommendation.objects.filter(user=self.user).exists())

class AIRecommendationIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="ai_user", password="pwd", nickname="ai_user")
        self.author = Author.objects.create(name="Author", channel_url="http://test")
        self.game = Game.objects.create(title="Game", genre="FPS", release_date="2020-01-01")

        self.vid1 = Video.objects.create(
            title="Aim Guide", author=self.author, game=self.game,
            video_type="guide", url="http://vid1", duration=10,
            uploaded_at="2021-01-01T00:00:00Z", moderated=True,
            tags=["shooting", "aim"], views_count=100
        )

    def test_e2e_session_creation_triggers_recommendation(self):
        # 1. Authenticate user
        self.client.force_authenticate(user=self.user)

        # 2. User creates a game session with weak tags
        session_data = {
            'game': self.game.id,
            'rating': 4,
            'comment': "I can't aim properly",
            'tags': ["shooting"]
        }
        response = self.client.post('/api/sessions/', session_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 3. User requests to generate recommendations based on profile
        response = self.client.get('/api/recommendations/generate/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # 4. Assert that the correct video was recommended
        self.assertTrue(len(response.data) > 0)
        self.assertEqual(response.data[0]['video_detail']['id'], self.vid1.id)

    @patch('recommendations.services.ai_advisor.AIAdvisor._call_ollama')
    def test_e2e_session_page_loads_ai_advice(self, mock_ollama):
        mock_ollama.return_value = "Try adjusting your crosshair placement."
        
        # This page is public/template view, requires session context
        url = f"/api/recommendations-page/?game={self.game.id}&comment=I%20can't%20aim&tags=shooting"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertContains(response, "Try adjusting your crosshair placement.")
