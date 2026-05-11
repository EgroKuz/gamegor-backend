# Specification: Implement Stats and Achievements Modules

## Overview
This track focuses on implementing the missing `stats` and `achievements` modules to align the Django backend codebase with the project's ER diagram and IDEF0 functional models. This will allow users to track their gaming statistics and earn achievements based on their activity.

## Functional Requirements
- **Achievements Module:**
  - Create `Achievement` model (title, description, criteria_type, threshold).
  - Create `UserAchievement` model to track which user earned which achievement and when.
- **Statistics Module:**
  - Implement endpoints or services to aggregate user statistics (e.g., games played, top genres, platforms used, videos watched).
- **API Endpoints:**
  - `GET /api/stats/` - Retrieve the current user's aggregated statistics.
  - `GET /api/achievements/` - Retrieve all available achievements.
  - `GET /api/users/me/achievements/` - Retrieve the user's unlocked achievements.

## Acceptance Criteria
- `stats` app contains complete models/services and API endpoints.
- `achievements` logic successfully evaluates criteria and awards achievements to users.
- All new ViewSets utilize `select_related` and `prefetch_related` to prevent N+1 query issues.
- Swagger/OpenAPI documentation is updated with the new endpoints.