from django.contrib import admin
from .models import Recommendation

@admin.register(Recommendation)
class RecommendationAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'recommendation_type', 'video', 'game', 'score', 'viewed', 'created_at']
    list_filter = ['recommendation_type', 'viewed', 'created_at']
    search_fields = ['user__username', 'video__title', 'game__title', 'skill_tag']
    readonly_fields = ['created_at']