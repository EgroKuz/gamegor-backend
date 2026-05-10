from django.db.models import Avg, Count
from rest_framework import permissions, views
from rest_framework.response import Response

from gamesessions.models import GameSession
from recommendations.models import Recommendation
from videos.models import UserVideoInteraction


class UserStatsView(views.APIView):
    """Returns user gameplay/video/recommendation statistics."""

    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        sessions = GameSession.objects.filter(user=user)
        interactions = UserVideoInteraction.objects.filter(user=user)
        recommendations = Recommendation.objects.filter(user=user)

        weak_skills = (
            sessions.exclude(tags=[])
            .values_list('tags', flat=True)
        )

        tags_counter = {}
        for tags in weak_skills:
            for tag in tags:
                tags_counter[tag] = tags_counter.get(tag, 0) + 1

        top_tags = sorted(tags_counter.items(), key=lambda x: x[1], reverse=True)[:5]

        data = {
            'sessions_count': sessions.count(),
            'average_rating': sessions.aggregate(avg=Avg('rating'))['avg'],
            'games_played_count': sessions.values('game').distinct().count(),
            'video_interactions_count': interactions.count(),
            'avg_video_rating': interactions.aggregate(avg=Avg('rating'))['avg'],
            'recommendations_count': recommendations.count(),
            'viewed_recommendations_count': recommendations.filter(viewed=True).count(),
            'top_session_tags': [{'tag': tag, 'count': count} for tag, count in top_tags],
            'sessions_by_game': list(
                sessions.values('game__title').annotate(count=Count('id')).order_by('-count')[:10]
            ),
        }
        return Response(data)
