from django.test import TestCase
from django.contrib.auth import get_user_model
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
        # We expect to import this service which doesn't exist yet
        from .services.aggregator import get_user_statistics
        
        stats = get_user_statistics(self.user)
        self.assertEqual(stats['games_played'], 2)
        self.assertEqual(stats['reviews_written'], 2)
        self.assertEqual(stats['videos_watched'], 1)
        self.assertIn("RPG", stats['top_genres'])
