from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Модель пользователя, расширяющая стандартную модель Django.
    Соответствует сущности 'Пользователь' из ER-диаграммы.
    """
    nickname = models.CharField(max_length=50, unique=True, verbose_name="Никнейм")
    registration_date = models.DateTimeField(auto_now_add=True, verbose_name="Дата регистрации")
    
    class Meta:
        db_table = 'users'
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'
    
    def __str__(self):
        return self.nickname or self.username