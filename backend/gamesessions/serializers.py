from rest_framework import serializers
from .models import GameSession
from games.models import Game

class GameSessionSerializer(serializers.ModelSerializer):
    game_detail = serializers.StringRelatedField(source='game', read_only=True)
    game_cover_image = serializers.URLField(source='game.cover_image', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = GameSession
        fields = [
            'id', 'game', 'game_detail', 'game_cover_image', 'rating', 'comment', 
            'tags', 'created_at', 'updated_at', 'user_name'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

class GameSessionCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GameSession
        fields = ['id', 'game', 'rating', 'comment', 'tags']
        read_only_fields = ['id']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)