# Specification: Frontend Dashboard UI

## Overview
The goal is to replace the current placeholder `Dashboard.jsx` with a fully functional dashboard that displays key user metrics, recent achievements, and personalized content recommendations.

## Goals
- **User Statistics:** Display total games played, videos watched, and top genres.
- **Achievements:** Show a list of earned achievements with titles and descriptions.
- **Recommendations:** Display a carousel or grid of recommended videos (and eventually games).
- **Aesthetic:** Maintain the dark gaming theme with neon accents.
- **Responsiveness:** Ensure the dashboard looks great on both desktop and mobile.

## Requirements

### 1. Data Integration
- Fetch user statistics from `/api/stats/`.
- Fetch earned achievements from `/api/stats/achievements/` (or related endpoint).
- Fetch personalized recommendations from `/api/recommendations/personalized/`.

### 2. UI Components
- **StatsCard:** A reusable component to display a single metric (e.g., "Games Played: 12").
- **AchievementItem:** A component to display an achievement (icon, title, date earned).
- **RecommendationCard:** A component for a recommended video/game (thumbnail, title, metadata).
- **DashboardLayout:** A grid-based layout for these components.

### 3. Technical Constraints
- Use **React** and **Tailwind CSS**.
- Use **Zustand** or **Context API** if global state is needed (preference for existing patterns).
- Use **Vitest** and **React Testing Library** for TDD.
- Target coverage: >80%.

## Acceptance Criteria
- [ ] Dashboard displays correct statistics fetched from the backend.
- [ ] Earned achievements are listed with correct details.
- [ ] Recommendations are displayed and link to the respective content.
- [ ] UI is responsive and follows the gaming aesthetic.
- [ ] All new components have unit tests.
