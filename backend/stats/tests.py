from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Achievement, UserAchievement

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
