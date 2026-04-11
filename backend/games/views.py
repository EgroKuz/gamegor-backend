from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Game, Platform
from .serializers import GameSerializer, PlatformSerializer

class GameViewSet(viewsets.ModelViewSet):
    """
    ViewSet для просмотра и редактирования игр.
    Предоставляет CRUD операции для модели Game.
    """
    queryset = Game.objects.all().order_by('-release_date')
    serializer_class = GameSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['genre', 'developer']
    search_fields = ['title', 'developer', 'description']
    ordering_fields = ['title', 'release_date', 'total_achievements']

class PlatformViewSet(viewsets.ModelViewSet):
    """
    ViewSet для просмотра и редактирования платформ.
    """
    queryset = Platform.objects.all().order_by('name')
    serializer_class = PlatformSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'type']
    ordering_fields = ['name', 'type']