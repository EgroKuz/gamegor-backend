from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Модель пользователя, расширяющая стандартную модель Django.
    Соответствует сущности 'Пользователь' из ER-диаграммы.
    """
    nickname = models.CharField(max_length=50, unique=True, verbose_name="Никнейм")
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")
    avatar = models.URLField(null=True, blank=True, verbose_name="Аватар")
    role = models.CharField(
        max_length=20,
        choices=[
            ('user', 'Пользователь'),
            ('moderator', 'Модератор'),
        ],
        default='user',
        verbose_name="Роль"
    )
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return self.nickname or self.username