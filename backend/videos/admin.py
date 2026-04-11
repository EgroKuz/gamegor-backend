from django.contrib import admin
from .models import Video, Author, UserVideoInteraction, Subscription

@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'video_type', 'game', 'moderated']
    list_filter = ['video_type', 'moderated']
    search_fields = ['title', 'author__name']

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name', 'subscribers_count']

@admin.register(UserVideoInteraction)
class InteractionAdmin(admin.ModelAdmin):
    list_display = ['user', 'video', 'watched_at', 'rating']

@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['user', 'author', 'subscribed_at', 'is_active']