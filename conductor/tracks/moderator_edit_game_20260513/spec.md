# Specification: Moderator Edit Game Feature

## Overview
This track adds the ability for authorized moderators to edit all fields of a game. The editing interface will be presented as a modal dialog accessible via an "Edit Game" button on the Game Details page (`/games/:id`). 

## Functional Requirements
- **Backend Permissions & Role Exposure:**
    - Update the `UserSerializer` in the backend to include the `is_staff` field (read-only).
    - Update the `GameViewSet` in the backend to allow `update` and `partial_update` actions for users with `is_staff=True`.
- **Frontend Auth State:**
    - Update `AuthContext` to fetch and store the current user's profile upon authentication, exposing the `is_staff` boolean to the rest of the application.
- **Edit Game UI:**
    - Add an "Edit Game" button to the `GameDetailsPage` that is strictly visible only if `is_staff === true`.
    - Clicking the button opens a modal containing a form to edit all game fields: `title`, `genre`, `developer`, `release_date`, `cover_image` (as a URL string), `description`, and `total_achievements`.
- **Update Logic:**
    - Upon form submission, send a `PUT` or `PATCH` request to `/api/games/:id/`.
    - On success, close the modal, refresh the game details, and show a success indication.
    - Handle API validation errors appropriately within the modal.

## Non-Functional Requirements
- **Security:** The backend MUST enforce the `is_staff` permission. The frontend UI hiding is only for UX; real security lies in the API endpoint.
- **UX:** The modal should match the existing dark/neon aesthetic of the app.

## Acceptance Criteria
- A non-staff user does not see the "Edit Game" button and cannot access the edit functionality.
- A staff user sees the "Edit Game" button on the game details page.
- The modal allows editing all specified fields and saving them successfully to the database.
- The UI immediately reflects the updated game details after a successful edit.

## Out of Scope
- File uploading for cover images (URL string only).
- Complex editing of many-to-many relationships (like adding/removing platforms) unless trivial to implement with multi-select (will stick to core game fields for this iteration).
