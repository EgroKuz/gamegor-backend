# recommendations/services/ai_advisor.py
import requests
from django.conf import settings
from games.models import Game


class AIAdvisor:
    """
    Сервис для получения рекомендаций от ИИ (Ollama + Qwen).
    """
    
    @classmethod
    def get_advice_for_session(cls, game_id, comment, tags):
        """
        Получает рекомендацию от ИИ на основе комментария к сессии.
        
        Args:
            game_id: ID игры
            comment: Комментарий пользователя о проблеме/опыте
            tags: Теги сессии (слабые навыки)
            
        Returns:
            str: Текстовая рекомендация от ИИ
        """
        # Получаем название игры
        game_name = ""
        if game_id and game_id != '—':
            try:
                game = Game.objects.get(id=game_id)
                game_name = game.title
            except (Game.DoesNotExist, ValueError):
                pass
        
        # Формируем промпт
        prompt = cls._build_prompt(game_name, comment, tags)
        
        # Отправляем запрос к Ollama
        try:
            response = cls._call_ollama(prompt)
            return response
        except Exception as e:
            print(f"Ошибка при вызове Ollama: {e}")
            return cls._get_fallback_advice(comment, tags)
    
    @classmethod
    def _build_prompt(cls, game_name, comment, tags):
        """
        Строит промпт для ИИ на основе данных сессии.
        """
        tags_str = ", ".join(tags) if tags else "не указаны"
        
        prompt = f"""Ты — опытный игровой тренер и аналитик. Твоя задача — дать конкретные, практические советы игроку на основе его проблемы.

Контекст:
- Игра: {game_name if game_name else 'Не указана'}
- Проблема/комментарий игрока: {comment if comment else 'Нет описания проблемы'}
- Слабые навыки (теги): {tags_str}

Дай небольшой ответ (3-4 предложений) с конкретными рекомендациями:
1. Что именно нужно тренировать
2. Какие упражнения или подходы использовать
3. На что обратить внимание в следующих играх

Отвечай на русском языке, дружелюбно и мотивирующе."""

        return prompt
    
    @classmethod
    def _call_ollama(cls, prompt):
        """
        Отправляет запрос к Ollama API и возвращает ответ.
        """
        host = getattr(settings, 'OLLAMA_HOST', 'http://localhost:11434')
        model = getattr(settings, 'OLLAMA_MODEL', 'qwen')
        
        url = f"{host}/api/generate"
        
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.7,
                "top_p": 0.9,
            }
        }
        
        response = requests.post(url, json=payload, timeout=60)
        response.raise_for_status()
        
        result = response.json()
        return result.get('response', 'Не удалось получить ответ от ИИ.')
    
    @classmethod
    def _get_fallback_advice(cls, comment, tags):
        """
        Возвращает запасной совет, если ИИ недоступен.
        """
        tags_str = ", ".join(tags) if tags else "указанным направлениям"
        
        if comment:
            return f"Рекомендация: проанализируйте вашу проблему \"{comment[:100]}...\". Сфокусируйтесь на тренировке по направлениям: {tags_str}. Разбирайте каждую ошибку и закрепляйте правильные паттерны поведения в следующих сессиях."
        else:
            return f"Рекомендация: уделите внимание тренировке по направлениям: {tags_str}. Сфокусируйтесь на коротких ежедневных практиках и разбирайте ошибки после каждой катки."
