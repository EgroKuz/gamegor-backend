from rest_framework import serializers
from .models import Game, Platform

class PlatformSerializer(serializers.ModelSerializer):
    game_count = serializers.IntegerField(source='annotated_game_count', read_only=True)

    class Meta:
        model = Platform
        fields = ['id', 'name', 'type', 'specs', 'game_count']

class GameSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = ['id', 'title', 'genre', 'developer', 'release_date',
                  'cover_image', 'description', 'platforms', 'total_achievements']
