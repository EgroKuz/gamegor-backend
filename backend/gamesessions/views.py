from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
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
        return GameSession.objects.filter(user=self.request.user).order_by('-created_at')
    
    def get_serializer_class(self):
        if self.action == 'create':
            return GameSessionCreateSerializer
        return GameSessionSerializer
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        