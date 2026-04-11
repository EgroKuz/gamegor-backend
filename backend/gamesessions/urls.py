from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'sessions', views.GameSessionViewSet, basename='gamesession')

urlpatterns = [
    path('', include(router.urls)),
]