from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from games.models import Game
from .models import Video, Author

User = get_user_model()

class VideoPerformanceTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="password123")
        self.author = Author.objects.create(name="Test Author", channel_url="http://test")
        self.game = Game.objects.create(title="Test Game", genre="RPG", release_date="2020-01-01")
        
        for i in range(5):
            Video.objects.create(
                title=f"Vid {i}",
                author=self.author,
                game=self.game,
                video_type="review",
                url=f"http://vid{i}",
                duration=120,
                uploaded_at="2021-01-01T00:00:00Z",
                moderated=True
            )

    def test_video_list_query_count(self):
        # The VideoSerializer accesses author_detail (author) and game_title (game)
        # We expect 1 query if select_related is used correctly.
        # Without it, it will be 1 (for videos) + 5 (authors) + 5 (games) = ~11 queries
        with self.assertNumQueries(1):
            response = self.client.get('/api/videos/')
            self.assertEqual(response.status_code, status.HTTP_200_OK)
