# Implementation Plan: Move Sessions Link to Header

**Phase 1: Update Header Navigation**
- [ ] Task: Modify `frontend/src/components/layout/Header.jsx` (or similar layout component). Add a new `<Link>` to `/profile/sessions` labeled "Sessions".
- [ ] Task: Wrap the new link in an authentication check (e.g., using `AuthContext` or `token`) so it only renders for logged-in users.
- [ ] Task: Ensure styling matches existing header navigation links.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Update Header Navigation' (Protocol in workflow.md)

**Phase 2: Cleanup Profile Page**
- [ ] Task: Modify `frontend/src/pages/ProfilePage.jsx`. Locate and remove the "View Game Sessions" button/link.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Cleanup Profile Page' (Protocol in workflow.md)

**Phase 3: Final Verification**
- [ ] Task: Run frontend test suite. Update any broken component tests related to `Header` or `ProfilePage`.
- [ ] Task: Manually verify responsiveness of the header with the new link.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)
