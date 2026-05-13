from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import Game, Platform

User = get_user_model()

class GamePerformanceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create multiple platforms and games to trigger N+1 queries
        platforms = [Platform.objects.create(name=f"Platform {i}", type="console") for i in range(3)]
        for i in range(5):
            game = Game.objects.create(
                title=f"Game {i}",
                genre="RPG",
                developer="Test Dev",
                release_date="2020-01-01"
            )
            game.platforms.set(platforms)

    def test_game_list_query_count(self):
        # We expect a constant number of queries (e.g., 2: one for games, one for prefetched platforms)
        # Without prefetch_related, it will be 1 (for games) + 5 (one for each game's platforms) = 6
        with self.assertNumQueries(2):
            response = self.client.get('/api/games/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_platform_list_query_count(self):
        # The PlatformSerializer calculates game_count using obj.games.count()
        # Without annotation, this will do 1 query for platforms + 3 queries for counts = 4 queries
        # With annotation, it should be 1 query.
        with self.assertNumQueries(1):
            response = self.client.get('/api/platforms/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)

class GamePermissionsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.game = Game.objects.create(
            title="Test Game",
            genre="Action",
            developer="Test Dev",
            release_date="2022-01-01"
        )
        self.url = f'/api/games/{self.game.id}/'
        
        # Create a regular user
        self.regular_user = User.objects.create_user(
            username='regularuser',
            password='testpassword123',
            nickname='regular_nick'
        )
        
        # Create a staff user (moderator)
        self.staff_user = User.objects.create_user(
            username='staffuser',
            password='testpassword123',
            nickname='staff_nick',
            is_staff=True
        )

    def test_anonymous_can_read(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
    def test_anonymous_cannot_update(self):
        data = {'title': 'Updated Title'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
    def test_regular_user_cannot_update(self):
        self.client.force_authenticate(user=self.regular_user)
        data = {'title': 'Updated Title'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
        
    def test_staff_user_can_update(self):
        self.client.force_authenticate(user=self.staff_user)
        data = {'title': 'Updated Title'}
        response = self.client.patch(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.game.refresh_from_db()
        self.assertEqual(self.game.title, 'Updated Title')
