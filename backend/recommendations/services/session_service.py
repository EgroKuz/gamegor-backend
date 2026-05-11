from games.models import Game
from .ai_advisor import AIAdvisor

class SessionRecommendationService:
    @staticmethod
    def get_context_data(game_id, tags_string, comment):
        context = {
            'game_id': game_id,
            'tags': tags_string,
            'comment': comment,
            'game_name': None,
            'ai_advice': ""
        }
        
        if game_id and game_id != '—':
            try:
                game = Game.objects.get(id=game_id)
                context['game_name'] = game.title
            except (Game.DoesNotExist, ValueError):
                pass
                
        if game_id or comment or tags_string:
            tags_list = tags_string.split(',') if tags_string else []
            context['ai_advice'] = AIAdvisor.get_advice_for_session(game_id, comment, tags_list)
            
        return context
