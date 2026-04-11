from rest_framework import viewsets, filters, permissions
from django_filters.rest_framework import DjangoFilterBackend
from .models import Video, Author, UserVideoInteraction
from .serializers import VideoSerializer, AuthorSerializer, UserVideoInteractionSerializer

class VideoViewSet(viewsets.ModelViewSet):
    """
    ViewSet для просмотра и редактирования видео.
    """
    queryset = Video.objects.filter(moderated=True).order_by('-uploaded_at')
    serializer_class = VideoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['video_type', 'game']
    search_fields = ['title', 'tags', 'author__name']
    ordering_fields = ['uploaded_at', 'views_count', 'duration']

class AuthorViewSet(viewsets.ModelViewSet):
    """
    ViewSet для просмотра авторов видеоконтента.
    """
    queryset = Author.objects.all().order_by('-subscribers_count')
    serializer_class = AuthorSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']

class UserVideoInteractionViewSet(viewsets.ModelViewSet):
    """
    ViewSet для взаимодействий пользователя с видео.
    """
    serializer_class = UserVideoInteractionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return UserVideoInteraction.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)