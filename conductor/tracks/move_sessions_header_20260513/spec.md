# Specification: Move Sessions Link to Header

## Overview
This track involves a UI refactoring to improve navigation. The link to view the user's game sessions will be removed from the Profile page and added to the main application header alongside primary navigation links like 'Games' and 'Videos'. To maintain a clean header, the label will be shortened to "Sessions".

## Functional Requirements
- **Header Navigation:**
    - Add a new navigation link labeled "Sessions" to the main `Header` component.
    - The link must point to the `/profile/sessions` route (or the equivalent route for viewing game sessions).
    - The link must **only** be visible to authenticated users.
- **Profile Page Cleanup:**
    - Remove the existing "View Game Sessions" button or link from the `ProfilePage` component.

## Non-Functional Requirements
- **UX/UI:** The new header link should match the styling (hover states, active states, typography) of the existing header links ('Games', 'Videos', etc.).
- **Responsiveness:** Ensure the header remains usable on mobile devices with the addition of the new link (e.g., it correctly appears in the mobile menu drawer if one exists).

## Acceptance Criteria
- When logged in, a "Sessions" link is visible in the main header.
- Clicking the "Sessions" link navigates to the game sessions page.
- When logged out, the "Sessions" link is NOT visible in the header.
- The "View Game Sessions" link is no longer present on the Profile page.

## Out of Scope
- Changing the functionality or layout of the Game Sessions page itself.
- Changing the routing structure (URL path) of the game sessions page.
