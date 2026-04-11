# recommendations/services/recommender.py
from django.db.models import Q
from videos.models import Video
from games.models import Game
from ..models import Recommendation
from .tag_analyzer import TagAnalyzer
from collections import Counter

class Recommender:
    """
    Класс для генерации персонализированных рекомендаций.
    """
    
    @classmethod
    def recommend_videos_by_tags(cls, user_id, limit=10):
        """
        Рекомендует видео на основе тегов из игровых сессий.
        """
        user_tags = TagAnalyzer.get_user_tags_profile(user_id)
        
        if not user_tags:
            # Если нет сессий — рекомендуем популярные видео
            return Video.objects.filter(
                moderated=True
            ).order_by('-views_count')[:limit]
        
        videos = Video.objects.filter(moderated=True)
        
        # Вычисляем релевантность каждого видео
        video_scores = []
        for video in videos:
            if video.tags:
                common_tags = set(video.tags) & set(user_tags.keys())
                if common_tags:
                    score = sum(user_tags[tag] for tag in common_tags)
                    video_scores.append((video, score))
        
        # Сортируем по релевантности
        video_scores.sort(key=lambda x: x[1], reverse=True)
        
        return [video for video, score in video_scores[:limit]]
    
    @classmethod
    def recommend_videos_by_skills(cls, user_id, limit=10):
        """
        Рекомендует видео на основе слабых навыков пользователя.
        """
        weak_skills = TagAnalyzer.get_weak_skills(user_id)
        
        if not weak_skills:
            return Video.objects.filter(moderated=True).order_by('-views_count')[:limit]
        
        # Берём топ-3 слабых навыка
        top_skills = [item['skill'] for item in weak_skills[:3]]
        
        # Ищем видео, связанные с этими навыками
        videos = Video.objects.filter(
            moderated=True,
            tags__overlap=top_skills
        ).distinct().order_by('-views_count')[:limit]
        
        return videos
    
    @classmethod
    def get_personalized_recommendations(cls, user_id, limit=10):
        """
        Комбинирует различные методы рекомендаций.
        """
        # Получаем рекомендации по тегам
        tag_recommendations = cls.recommend_videos_by_tags(user_id, limit=limit // 2)
        
        # Получаем рекомендации по слабым навыкам
        skill_recommendations = cls.recommend_videos_by_skills(user_id, limit=limit // 2)
        
        # Объединяем и убираем дубликаты
        all_recommendations = list(tag_recommendations) + list(skill_recommendations)
        seen = set()
        unique_recommendations = []
        
        for video in all_recommendations:
            if video.id not in seen:
                seen.add(video.id)
                unique_recommendations.append(video)
        
        return unique_recommendations[:limit]
    
    @classmethod
    def generate_and_save_recommendations(cls, user_id, limit=20):
        """
        Генерирует рекомендации и сохраняет их в базу.
        """
        # Удаляем старые рекомендации
        Recommendation.objects.filter(user_id=user_id).delete()
        
        # Получаем новые рекомендации
        recommendations = cls.get_personalized_recommendations(user_id, limit)
        
        # Сохраняем в базу
        saved = []
        for video in recommendations:
            rec = Recommendation.objects.create(
                user_id=user_id,
                recommendation_type='video',
                video=video,
                score=video.views_count / 1000  # упрощённая оценка
            )
            saved.append(rec)
        
        return saved