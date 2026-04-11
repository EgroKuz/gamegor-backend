from django.db import models
from django.conf import settings
from games.models import Game
from videos.models import Video

class Recommendation(models.Model):
    """
    Модель для хранения сгенерированных рекомендаций.
    """
    RECOMMENDATION_TYPES = [
        ('video', 'Видео'),
        ('game', 'Игра'),
        ('skill', 'Навык'),
    ]
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='recommendations',
        verbose_name="Пользователь"
    )
    recommendation_type = models.CharField(
        max_length=20,
        choices=RECOMMENDATION_TYPES,
        verbose_name="Тип рекомендации"
    )
    video = models.ForeignKey(
        Video,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='recommendations',
        verbose_name="Рекомендуемое видео"
    )
    game = models.ForeignKey(
        Game,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='recommendations',
        verbose_name="Рекомендуемая игра"
    )
    skill_tag = models.CharField(
        max_length=50,
        null=True,
        blank=True,
        verbose_name="Тег навыка"
    )
    score = models.FloatField(
        default=0.0,
        verbose_name="Оценка релевантности"
    )
    viewed = models.BooleanField(
        default=False,
        verbose_name="Просмотрено"
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Дата создания"
    )
    
    class Meta:
        db_table = 'recommendations'
        verbose_name = 'Рекомендация'
        verbose_name_plural = 'Рекомендации'
        ordering = ['-score', '-created_at']
    
    def __str__(self):
        if self.video:
            return f"{self.user} -> {self.video.title}"
        elif self.game:
            return f"{self.user} -> {self.game.title}"
        else:
            return f"{self.user} -> {self.skill_tag}"