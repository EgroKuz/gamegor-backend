from django.test import TestCase
from django.contrib.auth import get_user_model
from users.services.user_service import UserService
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class UserServiceTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='oldpassword',
            nickname='tester'
        )

    def test_change_password_success(self):
        success, message = UserService.change_password(self.user, 'oldpassword', 'newpassword')
        self.assertTrue(success)
        self.assertEqual(message, "Пароль успешно изменён")
        self.assertTrue(self.user.check_password('newpassword'))

    def test_change_password_failure(self):
        success, message = UserService.change_password(self.user, 'wrongpassword', 'newpassword')
        self.assertFalse(success)
        self.assertEqual(message, "Неверный пароль")
        self.assertTrue(self.user.check_password('oldpassword'))

class UserProfileIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='apiuser', 
            password='Password123!', 
            nickname='apitester',
            email='test@example.com'
        )

    def test_get_profile_authenticated(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/users/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'apiuser')
        self.assertEqual(response.data['email'], 'test@example.com')

    def test_get_profile_unauthenticated(self):
        response = self.client.get('/api/users/profile/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_update_profile(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.put('/api/users/profile/', {'nickname': 'newtester', 'email': 'new@example.com'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.nickname, 'newtester')
        self.assertEqual(self.user.email, 'new@example.com')

class UserAuthIntegrationTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_registration(self):
        # We enforce 10 char minimum password
        data = {
            'username': 'newuser',
            'password': 'StrongPassword123!',
            'password2': 'StrongPassword123!',
            'nickname': 'newbie'
        }
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_registration_short_password(self):
        data = {
            'username': 'shortpassuser',
            'password': 'short',
            'password2': 'short',
            'nickname': 'shorty'
        }
        response = self.client.post('/api/register/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(User.objects.filter(username='shortpassuser').exists())
