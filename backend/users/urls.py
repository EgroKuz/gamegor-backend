from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet, basename='user')

urlpatterns = [
    path('profile-page/', views.ProfilePageView.as_view(), name='profile_page'),
    path('stats-page/', views.StatsAchievementsPageView.as_view(), name='stats_page'),
    path('auth/', views.AuthPageView.as_view(), name='auth_page'),
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]