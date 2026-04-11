from django.contrib import admin
from .models import Game, Platform, GamePlatform

@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
    list_display = ['title', 'genre', 'developer', 'release_date']
    search_fields = ['title', 'developer']
    list_filter = ['genre']

@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ['name', 'type']

admin.site.register(GamePlatform)