from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from games.models import Game
from .models import GameSession

User = get_user_model()

class GameSessionPerformanceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.client.force_authenticate(user=self.user)
        self.game = Game.objects.create(title="Test Game", genre="RPG", release_date="2020-01-01")
        
        for i in range(5):
            GameSession.objects.create(
                user=self.user,
                game=self.game,
                rating=8,
                comment=f"Good {i}"
            )

    def test_gamesession_list_query_count(self):
        # The GameSessionSerializer accesses game_detail (game) and user_name (user)
        # We expect 1 query if select_related is used correctly.
        with self.assertNumQueries(1):
            response = self.client.get('/api/sessions/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
