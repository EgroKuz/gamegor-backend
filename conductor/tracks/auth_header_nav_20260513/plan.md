# Implementation Plan: Auth-Based Header Navigation

**Phase 1: Component Refactoring**
- [ ] Task: Modify `frontend/src/components/layout/Header.jsx`. Conditionally render the "Home" `<Link>` so it only appears when `isAuthenticated` is true.
- [ ] Task: Modify `frontend/src/components/layout/Header.jsx`. Replace the static "Profile" `<Link>` with a conditional rendering block: if `isAuthenticated`, show "Profile" (`/profile`), else show "Login" (`/login`).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Component Refactoring' (Protocol in workflow.md)

**Phase 2: Test Updates & Verification**
- [ ] Task: Update `frontend/src/components/layout/Layout.test.jsx`. Update the existing header test to verify the authenticated state, and add a new test case to verify the header renders correctly for unauthenticated users (only "Games", "Videos", "Login").
- [ ] Task: Run the frontend test suite to ensure all component layout tests pass.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Test Updates & Verification' (Protocol in workflow.md)
