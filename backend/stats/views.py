from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .models import Achievement, UserAchievement
from .serializers import AchievementSerializer, UserAchievementSerializer
from .services.aggregator import get_user_statistics
from .services.achievements import evaluate_achievements

@extend_schema(
    responses={
        200: OpenApiResponse(description="User statistics successfully retrieved")
    },
    operation_id="get_user_statistics"
)
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_statistics_view(request):
    """
    Returns aggregated statistics for the current user.
    Also evaluates and unlocks achievements seamlessly.
    """
    # Evaluate achievements before returning stats
    evaluate_achievements(request.user)
    stats = get_user_statistics(request.user)
    return Response(stats)

class AchievementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing all available achievements.
    """
    queryset = Achievement.objects.all().order_by('id')
    serializer_class = AchievementSerializer

class UserAchievementViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing the current user's unlocked achievements.
    """
    serializer_class = UserAchievementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Uses select_related to avoid N+1 queries when serializing the nested Achievement
        if getattr(self, 'swagger_fake_view', False) or not self.request.user.is_authenticated:
            return UserAchievement.objects.none()
        return UserAchievement.objects.filter(user=self.request.user).select_related('achievement').order_by('-earned_at')
