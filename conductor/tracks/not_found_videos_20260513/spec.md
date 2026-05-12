# Specification: Not Found (404) & Video Content Pages

## Overview
This track introduces two new frontend pages: a themed 'Not Found' (404) error page to handle invalid routes gracefully, and a 'Video Content' page to aggregate and display game-related videos using external embeds.

## Goals
- **Error Handling:** Improve UX by providing a custom, themed 404 page instead of a default browser error.
- **Content Aggregation:** Create a dedicated hub for users to watch gaming videos embedded from external platforms (e.g., YouTube).
- **Aesthetic Alignment:** Ensure both new pages match the project's dark theme and neon gaming aesthetic using Tailwind CSS.

## Functional Requirements

### 1. Not Found Page (404)
- **Routing:** A catch-all route (`*`) in React Router must redirect to this component.
- **Display:** Show a themed "Game Over" or "Glitch" aesthetic message indicating the page doesn't exist.
- **Navigation:** Provide prominent buttons/links to return to the Home page and the Games page.

### 2. Video Content Page (`/videos`)
- **List/Grid View:** Display a grid of available videos fetched from the backend API.
- **Video Display:** Use external embed players (e.g., YouTube `<iframe>`) to play the videos directly on the page.
- **Metadata:** Each video card/item must display its title and its associated game (Game Association).
- **Navigation:** Accessible via the main navigation header.

### 3. Technical Constraints
- Use **React Router** for navigation (`*` and `/videos`).
- Implement required API calls in `frontend/src/api/videos.js` (assuming a standard DRF endpoint like `/api/v1/videos/`).
- Ensure responsive design using Tailwind CSS.
- Add unit tests for new components using **Vitest** and **React Testing Library**, aiming for >80% coverage.

## Acceptance Criteria
- [ ] Navigating to a non-existent URL (e.g., `/fake-url`) displays the themed 404 page.
- [ ] The 404 page contains a working link back to the home page.
- [ ] Navigating to `/videos` displays a grid/list of embedded videos.
- [ ] Video items clearly show which game they are associated with.
- [ ] The Video Content page handles loading and error states gracefully.
- [ ] New components have passing unit tests.