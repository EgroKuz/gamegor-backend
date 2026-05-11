from django.contrib.auth import get_user_model

User = get_user_model()

class UserService:
    @staticmethod
    def change_password(user, old_password, new_password):
        if user.check_password(old_password):
            user.set_password(new_password)
            user.save()
            return True, 'Пароль успешно изменён'
        return False, 'Неверный пароль'
