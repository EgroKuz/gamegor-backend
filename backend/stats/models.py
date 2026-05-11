from django.db import models
from django.conf import settings

class Achievement(models.Model):
    """
    Represents an achievement that users can earn.
    """
    CRITERIA_CHOICES = (
        ('games_played', 'Games Played'),
        ('videos_watched', 'Videos Watched'),
        ('reviews_written', 'Reviews Written'),
    )

    title = models.CharField(max_length=100)
    description = models.TextField()
    criteria_type = models.CharField(max_length=50, choices=CRITERIA_CHOICES)
    threshold = models.PositiveIntegerField()

    def __str__(self):
        return self.title

class UserAchievement(models.Model):
    """
    Tracks which user earned which achievement.
    """
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE, related_name='earned_by')
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'achievement')

    def __str__(self):
        return f"{self.user.username} - {self.achievement.title}"
