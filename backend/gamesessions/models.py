from django.db import models
from django.conf import settings
from games.models import Game

class GameSession(models.Model):
    """
    Сущность 'Отзыв' из ER-диаграммы.
    Хранит информацию об игровой сессии пользователя.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='sessions',
        verbose_name="Пользователь"
    )
    game = models.ForeignKey(
        Game, 
        on_delete=models.CASCADE,
        related_name='sessions',
        verbose_name="Игра"
    )
    rating = models.IntegerField(
        choices=[(i, i) for i in range(1, 11)],
        verbose_name="Оценка (1-10)"
    )
    comment = models.TextField(verbose_name="Комментарий")
    tags = models.JSONField(
        default=list,
        verbose_name="Теги",
        help_text="Массив тегов, например: ['aim', 'tactics', 'map_knowledge']"
    )
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Дата обновления")
    
    class Meta:
        db_table = 'game_sessions'
        verbose_name = 'Игровая сессия'
        verbose_name_plural = 'Игровые сессии'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['user', 'game']),
            models.Index(fields=['tags']),  # Индекс для JSON поля
        ]
    
    def __str__(self):
        return f"{self.user} - {self.game} - {self.created_at.date()}"