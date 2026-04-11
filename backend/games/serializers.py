from rest_framework import serializers
from .models import Game, Platform

class PlatformSerializer(serializers.ModelSerializer):
    game_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Platform
        fields = ['id', 'name', 'type', 'specs', 'game_count']
    
    def get_game_count(self, obj):
        return obj.games.count()

class GameSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)
    
    class Meta:
        model = Game
        fields = ['id', 'title', 'genre', 'developer', 'release_date', 
                  'cover_image', 'description', 'platforms', 'total_achievements']