# Implementation Plan: Move Sessions Link to Header

**Phase 1: Update Header Navigation**
- [x] Task: Modify `frontend/src/components/layout/Header.jsx` (or similar layout component). Add a new `<Link>` to `/profile/sessions` labeled "Sessions". 2923ab5
- [x] Task: Wrap the new link in an authentication check (e.g., using `AuthContext` or `token`) so it only renders for logged-in users. 2923ab5
- [x] Task: Ensure styling matches existing header navigation links. 2923ab5
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Update Header Navigation' (Protocol in workflow.md)

**Phase 2: Cleanup Profile Page** [checkpoint: 0367a8d]
- [x] Task: Modify `frontend/src/pages/ProfilePage.jsx`. Locate and remove the "View Game Sessions" button/link. cbf077d
- [x] Task: Conductor - User Manual Verification 'Phase 2: Cleanup Profile Page' (Protocol in workflow.md) 0367a8d

**Phase 3: Final Verification** [checkpoint: 3d13552]
- [x] Task: Run frontend test suite. Update any broken component tests related to `Header` or `ProfilePage`. 168ab4d
- [x] Task: Manually verify responsiveness of the header with the new link. 3d13552
- [x] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md) 3d13552
