# Specification: Add Game Session Form

## Overview
This track implements the "Add Game Session / Review" form on the frontend. This form allows users to record their gameplay sessions, providing a rating, comment, and specific tags. The form will be accessed via the "Add Review" button on the Game Details page. Crucially, after submission, the user will be redirected to a Recommendations page, aligning with the backend flow that generates AI advice based on the session data.

## Functional Requirements
- **Access Point:** The form must be accessible by clicking the "Add Review" button on the `GameDetailsPage`. This should either open a modal or navigate to a dedicated form page, passing the `game_id`.
- **Form Fields:** The form must collect the following data:
    - **Rating:** A numerical input (e.g., 1-10) or star rating.
    - **Comment/Review:** A text area for the user's detailed review or description of their session.
    - **Tags:** A selection mechanism for tags describing the session (e.g., "hard boss", "great story").
- **Submission & Redirection:**
    - Upon successful submission, the frontend must send a POST request to the `/api/sessions/` endpoint.
    - After the successful API response, the user must be redirected to the "Recommendations" page (or the section of the dashboard where AI advice is displayed for that specific session).

## Non-Functional Requirements
- **UX/UI:** The form should be consistent with the dark, neon-accented aesthetic of the application. It should provide clear validation feedback (e.g., if rating is required).
- **Integration:** Must integrate seamlessly with the existing `AuthContext` to ensure the user is authenticated before submitting.

## Acceptance Criteria
- Clicking "Add Review" on a game details page opens the review form.
- The form allows inputting a rating, comment, and selecting tags.
- Submitting the form creates a new `GameSession` record via the backend API.
- After successful submission, the user is redirected to the appropriate recommendations view.
- The form handles API errors gracefully and displays user-friendly error messages.

## Out of Scope
- Modifying the backend `AIAdvisor` logic.
- Creating the full standalone Recommendations page (if it doesn't already exist, the redirect target might need to be a specific session detail view or the dashboard until a dedicated page is built).
