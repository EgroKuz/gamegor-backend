# Implementation Plan: Profile & Game Sessions Pages

## Phase 1: API Integration & Routing [checkpoint: e87a4fe]
- [x] **Task: Create API Services** [51e7289]
    - [x] Write tests for `users.js` and `sessions.js` API helper functions (mocking fetch).
    - [x] Implement user endpoints (get profile, update profile, change password) in `frontend/src/api/users.js`.
    - [x] Implement session endpoints (get user sessions) in `frontend/src/api/sessions.js`.
- [x] **Task: Setup Routing** [fb34d72]
    - [x] Update `App.jsx` to include `<ProtectedRoute>` routes for `/profile` and `/profile/sessions`.
    - [x] Create placeholder components for `ProfilePage` and `GameSessionsPage`.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: API & Routing' (Protocol in workflow.md)** [e87a4fe]

## Phase 2: Profile Page Implementation
- [x] **Task: Build Profile Information UI** [7a4614d]
    - [x] Write tests for displaying user info (username, email, avatar).
    - [x] Implement the read-only view of the profile.
- [~] **Task: Implement Edit Profile Functionality**
    - [ ] Write tests for the edit form (nickname, email) and submit handling.
    - [ ] Implement the edit form and connect it to the update API.
- [ ] **Task: Implement Change Password Functionality**
    - [ ] Write tests for the change password form (old password, new password, confirm).
    - [ ] Implement the form and connect it to the change password API.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Profile Page' (Protocol in workflow.md)**

## Phase 3: Game Sessions Page Implementation
- [ ] **Task: Create SessionItem Component**
    - [ ] Write tests for `SessionItem` rendering game details, duration, rating, and date.
    - [ ] Implement `SessionItem` with Tailwind styling.
- [ ] **Task: Implement Interactive Reviews**
    - [ ] Write tests for expanding/collapsing the review text within the `SessionItem` (or navigating to a detailed view).
    - [ ] Implement the interactive review display logic.
- [ ] **Task: Assemble GameSessionsPage**
    - [ ] Write tests for `GameSessionsPage` fetching data and rendering a list of `SessionItem`s.
    - [ ] Implement the main page logic, handling loading, error, and empty states.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Game Sessions Page' (Protocol in workflow.md)**

## Phase 4: Final Verification
- [ ] **Task: Run Full Test Suite & Coverage Check**
    - [ ] Ensure all frontend tests pass.
    - [ ] Verify coverage is >80% for the new pages and components.
- [ ] **Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)**