# Specification: Auth Pages Aesthetic Redesign

## Overview
The goal of this track is to redesign the existing Login (`/login`) and Registration (`/register`) pages to match the project's current gaming-inspired aesthetic, utilizing Tailwind CSS for styling and improving the overall user experience.

## Goals
- **Visual Consistency:** Align the auth pages with the dark theme and neon accents (teal/violet) established in the main layout.
- **Layout Modernization:** Implement a split-screen design for the auth pages.
- **UX Enhancements:** Add interactive feedback, inline form validation, password visibility toggles, and seamless navigation between login and registration.

## Functional Requirements

### 1. Split-Screen Layout
- Both `/login` and `/register` pages should utilize a responsive split-screen layout.
- One half should contain the form; the other half should feature a thematic graphic, pattern, or solid dark background with a branding element.
- On smaller screens (mobile), the layout should stack vertically or hide the graphic half to focus on the form.

### 2. Styling (Gaming Aesthetic)
- Use dark gray backgrounds (`bg-gray-900`, `bg-gray-950`).
- Apply neon teal and/or neon violet accents to primary buttons, active inputs, and links.
- Implement subtle glow effects on hover/focus states for interactive elements.

### 3. User Experience Features
- **Inline Validation:** Display clear error messages below specific input fields when validation fails (e.g., "Password is too short").
- **Show/Hide Password:** Include an icon/button within password fields to toggle text visibility.
- **Seamless Switching:** Provide prominent links on both pages to easily switch between "Sign In" and "Sign Up".

### 4. Code & Technical Constraints
- Refactor the existing `Login.jsx` and `Register.jsx` components.
- Use **Tailwind CSS** exclusively for styling.
- Maintain existing integration with the `AuthContext` and backend API endpoints.
- Update or add unit tests for the redesigned components using **Vitest** and **React Testing Library**.
- Target test coverage >80%.

## Acceptance Criteria
- [ ] Login and Registration pages use a responsive split-screen layout.
- [ ] Styling strictly adheres to the dark theme with neon accents.
- [ ] Form inputs have clear focus states and hover effects.
- [ ] Password fields include a functional "show/hide" toggle.
- [ ] Form validation errors are displayed inline clearly.
- [ ] Navigation links between Login and Register are functional and visible.
- [ ] Existing authentication logic (login/register API calls) remains fully functional.
- [ ] Component tests are updated/created and passing.