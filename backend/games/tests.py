from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Game, Platform

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
