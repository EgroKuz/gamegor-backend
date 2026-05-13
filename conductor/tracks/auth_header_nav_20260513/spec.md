# Specification: Auth-Based Header Navigation

## Overview
This track updates the main `Header` component to dynamically adjust its navigation links based on whether the user is logged in (`isAuthenticated`).

## Functional Requirements
- **Unauthenticated View (Guests):**
    - The main navigation should only display **Games** and **Videos**.
    - The **Home** link must be hidden.
    - The **Sessions** link must be hidden (already implemented).
    - The **Profile** link on the far right must be replaced with a **Login** link pointing to `/login`.
- **Authenticated View (Logged In):**
    - The main navigation displays **Home**, **Games**, **Videos**, and **Sessions**.
    - The far right link displays **Profile** pointing to `/profile`.

## Non-Functional Requirements
- **Styling:** The new "Login" link should maintain the exact same simple text styling as the current "Profile" link (e.g., `text-sm hover:text-neon-teal`).
- **Tests:** Existing layout tests expecting certain links to always be present must be updated to account for the dynamic authenticated/unauthenticated states.

## Acceptance Criteria
- When logged out, the header only shows "Games", "Videos", and "Login".
- When logged in, the header shows "Home", "Games", "Videos", "Sessions", and "Profile".
- The layout remains stable when switching states.
