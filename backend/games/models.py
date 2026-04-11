from django.db import models

class Platform(models.Model):
    """
    Сущность 'Платформа' из ER-диаграммы.
    Хранит информацию об игровых платформах (PC, PlayStation и т.д.)
    """
    name = models.CharField(max_length=50, verbose_name="Название")
    type = models.CharField(
        max_length=20, 
        choices=[
            ('pc', 'ПК'),
            ('console', 'Консоль'),
            ('mobile', 'Мобильная'),
        ],
        verbose_name="Тип платформы"
    )
    specs = models.JSONField(null=True, blank=True, verbose_name="Технические характеристики")
    
    class Meta:
        db_table = 'platforms'
        verbose_name = 'Платформа'
        verbose_name_plural = 'Платформы'
    
    def __str__(self):
        return self.name


class Game(models.Model):
    """
    Сущность 'Игра' из ER-диаграммы.
    Содержит основную информацию об игровом продукте.
    """
    title = models.CharField(max_length=200, verbose_name="Название")
    genre = models.CharField(max_length=100, verbose_name="Жанр")
    developer = models.CharField(max_length=200, verbose_name="Разработчик")
    release_date = models.DateField(verbose_name="Дата релиза")
    total_achievements = models.IntegerField(default=0, verbose_name="Всего достижений")
    platforms = models.ManyToManyField(
        Platform, 
        through='GamePlatform',
        related_name='games',
        verbose_name="Платформы"
    )
    cover_image = models.URLField(null=True, blank=True, verbose_name="Обложка")
    description = models.TextField(null=True, blank=True, verbose_name="Описание")
    
    class Meta:
        db_table = 'games'
        verbose_name = 'Игра'
        verbose_name_plural = 'Игры'
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['genre']),
        ]
    
    def __str__(self):
        return self.title


class GamePlatform(models.Model):
    """
    Промежуточная модель для связи многие-ко-многим между играми и платформами.
    """
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    
    class Meta:
        db_table = 'game_platforms'
        unique_together = ['game', 'platform']