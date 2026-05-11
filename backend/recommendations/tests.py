from django.test import TestCase
from unittest.mock import patch
from games.models import Game
from recommendations.services.session_service import SessionRecommendationService

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
