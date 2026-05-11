from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from .models import Achievement, UserAchievement
from games.models import Game, Platform
from gamesessions.models import GameSession
from videos.models import Video, UserVideoInteraction, Author

User = get_user_model()

class AchievementModelTest(TestCase):
    def setUp(self):
        self.achievement = Achievement.objects.create(
            title="First Blood",
            description="Play your first game",
            criteria_type="games_played",
            threshold=1
        )

    def test_achievement_creation(self):
        self.assertEqual(self.achievement.title, "First Blood")
        self.assertEqual(self.achievement.criteria_type, "games_played")
        self.assertEqual(self.achievement.threshold, 1)

    def test_achievement_str(self):
        self.assertEqual(str(self.achievement), "First Blood")


class UserAchievementModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.achievement = Achievement.objects.create(
            title="First Blood",
            description="Play your first game",
            criteria_type="games_played",
            threshold=1
        )
        self.user_achievement = UserAchievement.objects.create(
            user=self.user,
            achievement=self.achievement
        )

    def test_user_achievement_creation(self):
        self.assertEqual(self.user_achievement.user, self.user)
        self.assertEqual(self.user_achievement.achievement, self.achievement)
        self.assertIsNotNone(self.user_achievement.earned_at)

    def test_user_achievement_str(self):
        self.assertEqual(str(self.user_achievement), f"testuser - First Blood")


class StatisticsAggregationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="statuser", password="password123")
        self.game1 = Game.objects.create(title="Game 1", genre="RPG", release_date="2020-01-01")
        self.game2 = Game.objects.create(title="Game 2", genre="Action", release_date="2021-01-01")
        
        GameSession.objects.create(user=self.user, game=self.game1, rating=8, comment="Good")
        GameSession.objects.create(user=self.user, game=self.game2, rating=10, comment="Awesome")
        
        self.author = Author.objects.create(name="Test Author", channel_url="http://test")
        self.video = Video.objects.create(title="Vid 1", url="http://vid", video_type="review", duration=120, uploaded_at="2021-01-01T00:00:00Z", author=self.author)
        UserVideoInteraction.objects.create(user=self.user, video=self.video, rating=5)

    def test_get_user_statistics(self):
        from .services.aggregator import get_user_statistics
        
        stats = get_user_statistics(self.user)
        self.assertEqual(stats['games_played'], 2)
        self.assertEqual(stats['reviews_written'], 2)
        self.assertEqual(stats['videos_watched'], 1)
        self.assertIn("RPG", stats['top_genres'])


class AchievementEvaluationTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="evaluser", password="password123")
        self.game = Game.objects.create(title="Test Game", genre="RPG", release_date="2020-01-01")
        
        self.ach_games = Achievement.objects.create(
            title="Gamer", description="Play 1 game", criteria_type="games_played", threshold=1
        )
        self.ach_reviews = Achievement.objects.create(
            title="Critic", description="Write 1 review", criteria_type="reviews_written", threshold=1
        )

    def test_evaluate_achievements_unlocks_new(self):
        from .services.achievements import evaluate_achievements
        
        GameSession.objects.create(user=self.user, game=self.game, rating=8, comment="Good")
        unlocked = evaluate_achievements(self.user)
        
        self.assertEqual(len(unlocked), 2)
        self.assertEqual(UserAchievement.objects.filter(user=self.user).count(), 2)

    def test_evaluate_achievements_ignores_already_unlocked(self):
        from .services.achievements import evaluate_achievements
        
        UserAchievement.objects.create(user=self.user, achievement=self.ach_games)
        GameSession.objects.create(user=self.user, game=self.game, rating=8, comment="Good")
        unlocked = evaluate_achievements(self.user)
        
        self.assertEqual(len(unlocked), 1)
        self.assertEqual(unlocked[0], self.ach_reviews)
        self.assertEqual(UserAchievement.objects.filter(user=self.user).count(), 2)

class StatsAPIEndpointsTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="apiuser", password="password123")
        self.client.force_authenticate(user=self.user)
        
        self.achievement = Achievement.objects.create(
            title="Test Ach", description="Desc", criteria_type="games_played", threshold=1
        )
        UserAchievement.objects.create(user=self.user, achievement=self.achievement)

    def test_get_statistics_endpoint(self):
        response = self.client.get('/api/stats/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('games_played', response.data)

    def test_get_achievements_endpoint(self):
        response = self.client.get('/api/achievements/')
        self.assertEqual(response.status_code, 200)
        self.assertTrue(len(response.data) > 0)

    def test_get_user_achievements_endpoint(self):
        response = self.client.get('/api/users/me/achievements/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
