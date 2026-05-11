from stats.models import Achievement, UserAchievement
from stats.services.aggregator import get_user_statistics

def evaluate_achievements(user):
    """
    Evaluates user statistics and unlocks new achievements if thresholds are met.
    Returns a list of newly unlocked Achievement objects.
    """
    stats = get_user_statistics(user)
    
    # Mapping criteria to stats
    stat_mapping = {
        'games_played': stats['games_played'],
        'videos_watched': stats['videos_watched'],
        'reviews_written': stats['reviews_written'],
    }
    
    unlocked_achievements = []
    
    # Get achievements the user doesn't already have
    already_earned_ids = UserAchievement.objects.filter(user=user).values_list('achievement_id', flat=True)
    potential_achievements = Achievement.objects.exclude(id__in=already_earned_ids)
    
    for achievement in potential_achievements:
        current_val = stat_mapping.get(achievement.criteria_type, 0)
        
        if current_val >= achievement.threshold:
            # Unlock it
            UserAchievement.objects.create(user=user, achievement=achievement)
            unlocked_achievements.append(achievement)
            
    return unlocked_achievements
