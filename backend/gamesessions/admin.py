from django.contrib import admin
from .models import GameSession

@admin.register(GameSession)
class GameSessionAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'game', 'rating', 'created_at', 'updated_at']
    list_filter = ['game', 'rating', 'created_at']
    search_fields = ['user__username', 'user__nickname', 'game__title', 'comment']
    readonly_fields = ['created_at', 'updated_at']
    fields = ['user', 'game', 'rating', 'comment', 'tags', 'created_at', 'updated_at']