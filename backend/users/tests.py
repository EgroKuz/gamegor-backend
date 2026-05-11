from django.test import TestCase
from django.contrib.auth import get_user_model
from users.services.user_service import UserService

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
