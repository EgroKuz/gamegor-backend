# Specification: Profile & Game Sessions Pages

## Overview
The goal of this track is to implement the user Profile page (`/profile`) and the Game Sessions page (`/profile/sessions`). These pages allow users to manage their personal information and view detailed logs of their gaming activity and reviews.

## Goals
- **Profile Management:** Allow users to view and edit their basic information (nickname, email, password) and avatar.
- **Session History:** Provide a detailed view of a user's past game sessions, including metrics and written reviews.
- **Aesthetic Alignment:** Ensure both pages match the project's established dark theme and neon gaming aesthetic using Tailwind CSS.

## Functional Requirements

### 1. Profile Page (`/profile`)
- **Display:** Show the current user's username, nickname, email, and avatar.
- **Edit Info:** Provide a form/modal to update the nickname and email.
- **Change Password:** Provide a secure flow to change the user's password (requiring current password).
- **Avatar Management:** Allow the user to upload a new profile picture (or select from presets if file upload is out of scope for the backend).
- **Navigation:** Include a prominent link to the Game Sessions page.

### 2. Game Sessions Page (`/profile/sessions`)
- **List View:** Display a list or grid of the user's recorded game sessions.
- **Detailed Metrics:** Each item must show:
  - Game Title (with thumbnail)
  - Date Played
  - Duration
  - User's Rating/Score
- **Interactive Reviews:** Users should be able to click on a session to expand or navigate to a view that displays their full written review for that session.
- **Editing (Optional/Future):** Provide UI hooks (e.g., Edit/Delete buttons) for future functionality to modify session data.

### 3. Technical Constraints
- Use **React Router** for navigation (`/profile` and `/profile/sessions`).
- Implement required API calls in `frontend/src/api/users.js` and `frontend/src/api/sessions.js`.
- Protect both routes using the existing `ProtectedRoute` component.
- Add unit tests for new components using **Vitest** and **React Testing Library**.
- Target test coverage >80%.

## Acceptance Criteria
- [ ] Navigating to `/profile` displays the current user's data.
- [ ] The user can successfully update their nickname/email and see the changes reflected.
- [ ] Navigating to `/profile/sessions` displays a list of the user's sessions fetched from the backend.
- [ ] Session items display detailed metrics (duration, rating) alongside the game title.
- [ ] The user can view the full text of their review for a specific session.
- [ ] Both pages are responsive and adhere to the project's styling guidelines.
- [ ] New components have passing unit tests.