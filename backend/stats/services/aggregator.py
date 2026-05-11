from django.db.models import Count
from gamesessions.models import GameSession
from videos.models import UserVideoInteraction

def get_user_statistics(user):
    """
    Aggregates overall statistics for a given user.
    """
    # Number of unique games played
    games_played = GameSession.objects.filter(user=user).values('game').distinct().count()
    
    # Total reviews/sessions written
    reviews_written = GameSession.objects.filter(user=user).count()
    
    # Total videos interacted with
    videos_watched = UserVideoInteraction.objects.filter(user=user).count()

    # Top genres based on games played
    genre_counts = GameSession.objects.filter(user=user).values('game__genre').annotate(count=Count('game__genre')).order_by('-count')
    top_genres = [item['game__genre'] for item in genre_counts if item['game__genre']]
    
    return {
        'games_played': games_played,
        'reviews_written': reviews_written,
        'videos_watched': videos_watched,
        'top_genres': top_genres
    }
