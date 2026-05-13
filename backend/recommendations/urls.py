from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'recommendations', views.RecommendationViewSet, basename='recommendation')

urlpatterns = [
    path('recommendations-page/', views.RecommendationPageView.as_view(), name='recommendation_page'),
    path('session-advice/', views.SessionAdviceAPIView.as_view(), name='session_advice_api'),
    path('', include(router.urls)),
]