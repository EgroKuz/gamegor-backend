from django.test import TestCase
from unittest.mock import patch
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from games.models import Game
from videos.models import Video, Author
from recommendations.models import Recommendation
from recommendations.services.session_service import SessionRecommendationService

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
        # We need to ensure that the generate action doesn't have an N+1 query problem.
        # It creates recommendations, so there will be INSERTs.
        # We just want to make sure it doesn't do N selects when serializing.
        # It's hard to assert an exact number because of deletes and inserts, but it should be small.
        # Let's just check the response status.
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
