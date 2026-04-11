from rest_framework import serializers
from .models import Video, Author, UserVideoInteraction

class AuthorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Author
        fields = ['id', 'name', 'channel_url', 'avatar', 'subscribers_count']

class VideoSerializer(serializers.ModelSerializer):
    author_detail = AuthorSerializer(source='author', read_only=True)
    game_title = serializers.CharField(source='game.title', read_only=True)
    
    class Meta:
        model = Video
        fields = [
            'id', 'title', 'author', 'author_detail', 'game', 'game_title',
            'video_type', 'url', 'thumbnail', 'duration', 'views_count',
            'likes_count', 'tags', 'uploaded_at', 'moderated'
        ]
        read_only_fields = ['views_count', 'likes_count']

class UserVideoInteractionSerializer(serializers.ModelSerializer):
    video_detail = VideoSerializer(source='video', read_only=True)
    
    class Meta:
        model = UserVideoInteraction
        fields = ['id', 'video', 'video_detail', 'watch_duration', 'rating', 'comment', 'watched_at']
        read_only_fields = ['user', 'watched_at']