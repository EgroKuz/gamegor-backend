from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'videos', views.VideoViewSet, basename='video')
router.register(r'authors', views.AuthorViewSet, basename='author')
router.register(r'interactions', views.UserVideoInteractionViewSet, basename='interaction')

urlpatterns = [
    path('', include(router.urls)),
]