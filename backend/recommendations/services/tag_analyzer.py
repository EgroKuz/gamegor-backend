# recommendations/services/tag_analyzer.py
from collections import Counter
from django.db.models import Count, Avg
from gamesessions.models import GameSession
from videos.models import Video
import json

class TagAnalyzer:
    """
    Класс для анализа тегов из игровых сессий пользователя.
    """
    
    # Предопределённые категории навыков
    SKILL_CATEGORIES = {
        'aim': ['aim', 'прицеливание', 'стрельба', 'shooting', 'accuracy'],
        'tactics': ['tactics', 'тактика', 'стратегия', 'strategy', 'positioning'],
        'map_knowledge': ['map', 'карта', 'position', 'позиции', 'layout'],
        'economy': ['economy', 'экономика', 'money', 'деньги'],
        'communication': ['comms', 'коммуникация', 'teamwork', 'команда'],
        'mechanics': ['mechanics', 'механика', 'movement', 'движение'],
        'utility': ['utility', 'гранаты', 'grenades', 'способности'],
        'decision_making': ['decision', 'решения', 'clutch', 'решения'],
    }
    
    @classmethod
    def get_user_tags_profile(cls, user_id):
        """
        Собирает все теги из сессий пользователя и считает их частоту.
        Возвращает Counter с тегами и их частотой.
        """
        sessions = GameSession.objects.filter(user_id=user_id)
        all_tags = []
        
        for session in sessions:
            if session.tags:
                all_tags.extend(session.tags)
        
        return Counter(all_tags)
    
    @classmethod
    def get_user_skill_profile(cls, user_id):
        """
        Преобразует теги в категории навыков.
        Возвращает словарь {категория: частота}.
        """
        tags_counter = cls.get_user_tags_profile(user_id)
        skill_counter = Counter()
        
        for tag, count in tags_counter.items():
            for skill, keywords in cls.SKILL_CATEGORIES.items():
                if tag.lower() in keywords or any(kw in tag.lower() for kw in keywords):
                    skill_counter[skill] += count
                    break
        
        return dict(skill_counter)
    
    @classmethod
    def get_weak_skills(cls, user_id, threshold=0.3):
        """
        Определяет слабые места пользователя.
        Сравнивает частоту тегов со средними значениями.
        """
        user_profile = cls.get_user_skill_profile(user_id)
        
        # Получаем среднюю частоту тегов по всем пользователям
        all_sessions = GameSession.objects.all()
        all_tags = []
        for session in all_sessions:
            if session.tags:
                all_tags.extend(session.tags)
        
        avg_counter = Counter(all_tags)
        total_sessions = all_sessions.count()
        
        weak_skills = []
        for skill, user_count in user_profile.items():
            avg_count = avg_counter.get(skill, 0) / max(total_sessions, 1)
            
            # Если частота пользователя меньше средней, это слабое место
            if user_count < avg_count * threshold:
                weak_skills.append({
                    'skill': skill,
                    'user_frequency': user_count,
                    'avg_frequency': avg_count,
                    'improvement_needed': avg_count - user_count
                })
        
        return sorted(weak_skills, key=lambda x: x['improvement_needed'], reverse=True)