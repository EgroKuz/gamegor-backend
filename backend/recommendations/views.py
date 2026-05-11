from django.views.generic import TemplateView
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Recommendation
from .serializers import RecommendationSerializer
from .services.recommender import Recommender

class RecommendationViewSet(viewsets.ModelViewSet):
    """
    ViewSet для работы с рекомендациями.
    """
    serializer_class = RecommendationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Recommendation.objects.filter(user=self.request.user)
    
    @action(detail=False, methods=['get'])
    def generate(self, request):
        """
        Генерирует новые рекомендации для текущего пользователя.
        """
        recommendations = Recommender.generate_and_save_recommendations(request.user.id)
        serializer = self.get_serializer(recommendations, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def personalized(self, request):
        """
        Возвращает персонализированные рекомендации (без сохранения).
        """
        recommendations = Recommender.get_personalized_recommendations(request.user.id)
        from videos.serializers import VideoSerializer
        serializer = VideoSerializer(recommendations, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def weak_skills(self, request):
        """
        Возвращает слабые места пользователя.
        """
        from .services.tag_analyzer import TagAnalyzer
        weak_skills = TagAnalyzer.get_weak_skills(request.user.id)
        return Response(weak_skills)
    
    @action(detail=True, methods=['post'])
    def mark_viewed(self, request, pk=None):
        """
        Отмечает рекомендацию как просмотренную.
        """
        recommendation = self.get_object()
        recommendation.viewed = True
        recommendation.save()
        return Response({'status': 'marked as viewed'})

class RecommendationPageView(TemplateView):
    """Страница текстовой рекомендации после сохранения сессии."""
    template_name = "recommendations/session_recommendation.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        game_id = self.request.GET.get('game')
        tags = self.request.GET.get('tags', '')
        context['game_id'] = game_id
        context['tags'] = tags
        
        # Получаем название игры если есть game_id
        if game_id and game_id != '—':
            try:
                from games.models import Game
                game = Game.objects.get(id=game_id)
                context['game_name'] = game.title  # Исправлено: было game.name
            except (Game.DoesNotExist, ValueError):
                context['game_name'] = None
        else:
            context['game_name'] = None
        
        return context
