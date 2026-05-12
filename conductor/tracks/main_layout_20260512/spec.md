# Specification: Create the main application layout

## Overview
Create the foundational layout for the Game Aggregator application, providing a consistent structure and "gaming aggregator" aesthetic across all pages.

## Functional Requirements
- **Header/Navbar:** A top-level navigation bar containing the logo, primary navigation links, and placeholder for user profile/menu.
- **Sidebar:** A side panel for secondary navigation or filters, complementing the top navigation.
- **Footer:** A site-wide footer for copyright information and legal/support links.
- **Main Content Area:** A central area where page-specific components (routes) will be rendered.
- **Navigation:** Primary site navigation structured as a Top Navigation bar.

## Non-Functional Requirements
- **Aesthetic:** Apply a "Custom Gaming Aesthetic" using dark backgrounds, high-contrast text, and neon accents (e.g., teal, violet) leveraging Tailwind CSS.
- **Responsiveness:** Implement using a **Desktop-First** approach, ensuring the layout remains functional and visually appealing on mobile devices.
- **Consistency:** Use React components to ensure the layout is reusable across the entire application.

## Acceptance Criteria
- [ ] Header, Sidebar, Footer, and Main Content Area are all present and correctly positioned on the page.
- [ ] The Top Navigation bar correctly routes to placeholder pages or existing routes.
- [ ] The layout uses the specified gaming aesthetic (dark theme with neon accents).
- [ ] The application remains usable on smaller screens, with the layout adjusting appropriately.

## Out of Scope
- Implementation of specific page content (e.g., Dashboard details, Search results).
- Finalized user authentication flow (only UI placeholders in the header).
