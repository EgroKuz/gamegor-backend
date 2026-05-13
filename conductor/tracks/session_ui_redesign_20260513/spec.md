# Specification: Redesign Session Item UI

## Overview
This track focuses on cleaning up the visual presentation of individual game sessions (`SessionItem.jsx`) on the "Game Sessions" page. The goal is to remove unnecessary technical details (duration and session ID) and make the game title more prominent.

## Functional Requirements
- **Remove Duration:**
    - The session duration metric (e.g., `⏱️ 2h 30m`) and its associated calculation logic must be removed from the `SessionItem` component.
- **Remove Session ID:**
    - The session ID display (e.g., `🆔 ID: 123`) must be removed from the UI.
- **Enhance Game Title:**
    - The game title must be restyled to be more prominent. It should remain a clickable link to the game details page.

## Non-Functional Requirements
- **UX/UI:** The redesign should maintain the overall dark/neon aesthetic but provide a cleaner, less cluttered look for each session card.

## Acceptance Criteria
- The "Game Sessions" page displays a list of sessions without showing the duration for any session.
- The Session ID is no longer visible on the session cards.
- The game title is clearly visible and more prominent than before.
- Existing functionality (expanding to see the comment, clicking the game title to navigate, clicking to view AI advice) remains intact.

## Out of Scope
- Modifying the backend API data structure (duration and ID will still be returned by the API, just not displayed).
- Redesigning the entire Game Sessions page layout (only the individual item card is changing).
