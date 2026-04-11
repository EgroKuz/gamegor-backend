from django.db import models
from django.conf import settings
from games.models import Game

class Author(models.Model):
    """
    Сущность 'Автор видеоконтента' из ER-диаграммы.
    """
    name = models.CharField(max_length=100, verbose_name="Имя автора")
    channel_url = models.URLField(verbose_name="Ссылка на канал")
    avatar = models.URLField(null=True, blank=True, verbose_name="Аватар")
    subscribers_count = models.IntegerField(default=0, verbose_name="Подписчики")
    
    class Meta:
        db_table = 'authors'
        verbose_name = 'Автор'
        verbose_name_plural = 'Авторы'
    
    def __str__(self):
        return self.name


class Video(models.Model):
    """
    Сущность 'Видео' из ER-диаграммы.
    """
    VIDEO_TYPES = [
        ('guide', 'Гайд'),
        ('analysis', 'Разбор'),
        ('news', 'Новости'),
        ('stream', 'Стрим'),
        ('tip', 'Лайфхак'),
    ]
    
    title = models.CharField(max_length=300, verbose_name="Название")
    author = models.ForeignKey(
        Author, 
        on_delete=models.CASCADE, 
        related_name='videos',
        verbose_name="Автор"
    )
    game = models.ForeignKey(
        Game, 
        on_delete=models.CASCADE, 
        related_name='videos', 
        null=True, 
        blank=True,
        verbose_name="Игра"
    )
    video_type = models.CharField(
        max_length=20, 
        choices=VIDEO_TYPES,
        verbose_name="Тип видео"
    )
    url = models.URLField(verbose_name="Ссылка на видео")
    thumbnail = models.URLField(verbose_name="Превью")
    duration = models.IntegerField(verbose_name="Длительность (сек)")
    views_count = models.IntegerField(default=0, verbose_name="Просмотры")
    likes_count = models.IntegerField(default=0, verbose_name="Лайки")
    tags = models.JSONField(
        default=list, 
        verbose_name="Теги",
        help_text="Теги для связи с игровыми сессиями"
    )
    uploaded_at = models.DateTimeField(verbose_name="Дата загрузки")
    moderated = models.BooleanField(default=False, verbose_name="Промодерировано")
    moderated_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='moderated_videos',
        verbose_name="Модератор"
    )
    
    class Meta:
        db_table = 'videos'
        verbose_name = 'Видео'
        verbose_name_plural = 'Видео'
        indexes = [
            models.Index(fields=['game', 'video_type']),
            models.Index(fields=['tags']),
        ]
    
    def __str__(self):
        return self.title


class UserVideoInteraction(models.Model):
    """
    Сущность 'Пользователь_Видео' из ER-диаграммы.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        verbose_name="Пользователь"
    )
    video = models.ForeignKey(
        Video, 
        on_delete=models.CASCADE,
        verbose_name="Видео"
    )
    watched_at = models.DateTimeField(auto_now_add=True, verbose_name="Время просмотра")
    watch_duration = models.IntegerField(default=0, verbose_name="Длительность просмотра (сек)")
    rating = models.IntegerField(
        null=True, 
        blank=True,
        choices=[(i, i) for i in range(1, 6)],
        verbose_name="Оценка"
    )
    comment = models.TextField(null=True, blank=True, verbose_name="Комментарий")
    
    class Meta:
        db_table = 'user_video_interactions'
        verbose_name = 'Взаимодействие с видео'
        verbose_name_plural = 'Взаимодействия с видео'
        unique_together = ['user', 'video']
    
    def __str__(self):
        return f"{self.user} - {self.video.title[:30]}"


class Subscription(models.Model):
    """
    Сущность 'Подписка' из ER-диаграммы.
    """
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name='subscriptions',
        verbose_name="Пользователь"
    )
    author = models.ForeignKey(
        Author, 
        on_delete=models.CASCADE,
        related_name='subscribers',
        verbose_name="Автор"
    )
    subscribed_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата подписки")
    unsubscribed_at = models.DateTimeField(null=True, blank=True, verbose_name="Дата отписки")
    is_active = models.BooleanField(default=True, verbose_name="Активна")
    
    class Meta:
        db_table = 'subscriptions'
        verbose_name = 'Подписка'
        verbose_name_plural = 'Подписки'
        unique_together = ['user', 'author']
    
    def __str__(self):
        return f"{self.user} подписан на {self.author}"