# recommendations/services/ai_advisor.py
import requests
import logging
from django.conf import settings
from games.models import Game

logger = logging.getLogger(__name__)

class AIAdvisor:
    """
    Сервис для получения рекомендаций от ИИ (Ollama + Qwen).
    """
    
    @classmethod
    def get_advice_for_session(cls, game_id, comment, tags):
        """
        Получает рекомендацию от ИИ на основе комментария к сессии.
        """
        game_name = ""
        if game_id and game_id != '—':
            try:
                game = Game.objects.get(id=game_id)
                game_name = game.title
            except (Game.DoesNotExist, ValueError):
                pass
        
        prompt = cls._build_prompt(game_name, comment, tags)
        
        try:
            return cls._call_ollama(prompt)
        except requests.exceptions.Timeout:
            logger.warning("Время ожидания ответа от Ollama истекло.")
            return cls._get_fallback_advice(comment, tags)
        except requests.exceptions.RequestException as e:
            logger.error(f"Ошибка соединения с Ollama API: {e}")
            return cls._get_fallback_advice(comment, tags)
        except Exception as e:
            logger.error(f"Неожиданная ошибка при вызове Ollama: {e}")
            return cls._get_fallback_advice(comment, tags)
    
    @classmethod
    def _build_prompt(cls, game_name, comment, tags):
        tags_str = ", ".join(tags) if tags else "не указаны"
        
        prompt = f"""Ты — опытный игровой тренер и аналитик. Твоя задача — дать конкретные, практические советы игроку на основе его проблемы и игры.

Контекст:
- Игра: {game_name if game_name else 'Не указана'}
- Проблема/комментарий игрока: {comment if comment else 'Нет описания проблемы'}
- Слабые навыки (теги): {tags_str}

Дай небольшой ответ (3-4 предложений) с конкретными рекомендациями:
1. Что именно нужно тренировать
2. Какие упражнения или подходы использовать
3. На что обратить внимание в следующих играх

Если отзыв положительный, поддержи игрока и посоветуй больше практики

Отвечай всегда на русском языке, дружелюбно и мотивирующе."""

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

        # Увеличиваем таймаут до 60 секунд, так как генерация ответа может занимать длительное время
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
