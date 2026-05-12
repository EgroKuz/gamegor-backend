from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from django.views.generic import TemplateView
from .models import GameSession
from .serializers import GameSessionSerializer, GameSessionCreateSerializer

class GameSessionViewSet(viewsets.ModelViewSet):
    """
    ViewSet для управления игровыми сессиями пользователя.
    """
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['game', 'rating']
    ordering_fields = ['created_at', 'rating']
    
    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False) or not self.request.user.is_authenticated:
            return GameSession.objects.none()
        return GameSession.objects.filter(user=self.request.user).select_related('game', 'user').order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return GameSessionCreateSerializer
        return GameSessionSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        

class GameSessionCreatePageView(TemplateView):
    """
    Страница добавления игровой сессии для выбранной игры.
    """
    template_name = "gamesessions/session_form.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["game_id"] = kwargs.get("game_id")
        return context


class MySessionsPageView(TemplateView):
    """Страница со списком игровых сессий текущего пользователя."""
    template_name = "gamesessions/my_sessions.html"
