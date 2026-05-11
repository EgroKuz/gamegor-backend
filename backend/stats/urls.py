from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AchievementViewSet, UserAchievementViewSet, user_statistics_view

router = DefaultRouter()
router.register(r'achievements', AchievementViewSet, basename='achievements')

urlpatterns = [
    path('', include(router.urls)),
    path('stats/', user_statistics_view, name='user-statistics'),
    path('users/me/achievements/', UserAchievementViewSet.as_view({'get': 'list'}), name='user-achievements'),
]
