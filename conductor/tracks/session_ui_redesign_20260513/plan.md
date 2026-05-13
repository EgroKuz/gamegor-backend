# Implementation Plan: Redesign Session Item UI

**Phase 1: Component Refactoring**
- [ ] Task: Modify `frontend/src/components/profile/SessionItem.jsx`. Remove the `duration_minutes` calculation and the JSX span rendering the duration icon and text.
- [ ] Task: Remove the JSX span rendering the session ID.
- [ ] Task: Update the CSS classes for the game title `<h3>` and `<Link>` to make it more prominent (e.g., larger text size, different color, or better spacing).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Component Refactoring' (Protocol in workflow.md)

**Phase 2: Test Updates & Verification**
- [ ] Task: Update `frontend/src/components/profile/SessionItem.test.jsx` (if it exists) or any other tests that explicitly check for the presence of the duration or ID text.
- [ ] Task: Run the frontend test suite to ensure no regressions.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Test Updates & Verification' (Protocol in workflow.md)
