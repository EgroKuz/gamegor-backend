from rest_framework import serializers
from .models import Recommendation
from videos.serializers import VideoSerializer
from games.serializers import GameSerializer

class RecommendationSerializer(serializers.ModelSerializer):
    video_detail = VideoSerializer(source='video', read_only=True)
    game_detail = GameSerializer(source='game', read_only=True)
    
    class Meta:
        model = Recommendation
        fields = [
            'id', 'recommendation_type', 'video', 'video_detail',
            'game', 'game_detail', 'skill_tag', 'score', 'viewed', 'created_at'
        ]
        read_only_fields = ['user', 'created_at']