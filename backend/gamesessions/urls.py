from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'sessions', views.GameSessionViewSet, basename='gamesession')

urlpatterns = [
    path('sessions-page/', views.MySessionsPageView.as_view(), name='my_sessions_page'),
    path('', include(router.urls)),
]