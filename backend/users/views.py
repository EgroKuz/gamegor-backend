from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.views.generic import TemplateView
from .serializers import UserSerializer, RegisterSerializer, ChangePasswordSerializer
from .services.user_service import UserService

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()
    
    @action(detail=False, methods=['get', 'put'])
    def profile(self, request):
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = self.get_serializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['post'])
    def change_password(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            success, message = UserService.change_password(
                request.user, 
                serializer.data.get('old_password'), 
                serializer.data.get('new_password')
            )
            if success:
                return Response({'message': message}, status=status.HTTP_200_OK)
            return Response({'old_password': message}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

class AuthPageView(TemplateView):
    """
    Простая HTML-страница для регистрации и авторизации пользователей.
    """
    template_name = "users/auth.html"


class ProfilePageView(TemplateView):
    """
    HTML-страница профиля пользователя с редактированием данных.
    """
    template_name = "users/profile.html"


class StatsAchievementsPageView(TemplateView):
    """
    HTML-страница статистики и достижений пользователя.
    """
    template_name = "users/stats_achievements.html"
