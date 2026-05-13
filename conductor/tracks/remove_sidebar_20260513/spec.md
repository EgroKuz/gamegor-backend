# Specification: Remove Sidebar Filters

## Overview
This track involves a UI cleanup to remove the left sidebar (Filters) from all pages. The sidebar is no longer needed in the current design. The component will be unmounted from the main layout, allowing the primary content to expand and utilize the full available width of the screen.

## Functional Requirements
- **Layout Modification:**
    - Remove the `Sidebar` component from the `MainLayout` component (or wherever it is currently rendered globally).
    - Ensure that removing the sidebar does not break the layout structure (e.g., flexbox containers might need adjustment to ensure the main `<main>` tag takes up the full width `flex-1`).
- **Component Preservation:**
    - Do NOT delete `frontend/src/components/layout/Sidebar.jsx` or its tests. Keep the files in the codebase for potential future use.

## Non-Functional Requirements
- **Responsiveness:** The layout should continue to function correctly on both desktop and mobile devices without the sidebar taking up space.
- **Tests:** Update any layout or aesthetic tests that explicitly expect the sidebar to be present in the document.

## Acceptance Criteria
- The "Filters" sidebar is no longer visible on any page (Home, Games, Videos, Profile, etc.).
- The main content area expands to utilize the space previously taken by the sidebar.
- Existing tests pass (after being updated to no longer expect the sidebar).

## Out of Scope
- Completely deleting the `Sidebar` component files.
- Refactoring the internal layout of individual pages (e.g., `GameDetailsPage` or `VideoContentPage`), except where globally affected by the `MainLayout`.
