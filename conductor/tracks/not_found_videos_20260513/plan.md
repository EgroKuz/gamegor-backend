# Implementation Plan: Not Found (404) & Video Content Pages

## Phase 1: API & Routing Setup
- [x] **Task: Setup Video API Service** [2c9c209]
    - [x] Write failing test for `videos.js` API helper fetching from `/videos/`.
    - [x] Implement `frontend/src/api/videos.js` with `getVideos` function.
- [x] **Task: Setup React Router Routes** [f9944af]
    - [x] Update `App.jsx` to include a catch-all route `*` for the 404 page.
    - [x] Update `App.jsx` to include a route `/videos` for the Video Content page.
    - [x] Create placeholder components for `NotFoundPage` and `VideoContentPage`.
- [ ] **Task: Update Header Navigation**
    - [ ] Add a link to the Video Content page (`/videos`) in `Header.jsx`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: API & Routing Setup' (Protocol in workflow.md)**

## Phase 2: Not Found (404) Page Implementation
- [ ] **Task: Build NotFoundPage Component**
    - [ ] Write failing tests verifying the 'Game Over' message and navigation links.
    - [ ] Implement `NotFoundPage` with Tailwind CSS for the dark/glitch aesthetic.
    - [ ] Ensure links to Home (`/`) and Games (`/games`) work correctly.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Not Found Page Implementation' (Protocol in workflow.md)**

## Phase 3: Video Content Page Implementation
- [ ] **Task: Create VideoCard Component**
    - [ ] Write failing tests for `VideoCard` to render YouTube embed `<iframe>` and game title.
    - [ ] Implement `VideoCard` with Tailwind CSS.
- [ ] **Task: Build VideoContentPage**
    - [ ] Write failing tests for fetching videos and rendering a grid of `VideoCard`s.
    - [ ] Implement `VideoContentPage` logic (loading state, error state, empty state).
    - [ ] Integrate `getVideos` API call.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Video Content Page Implementation' (Protocol in workflow.md)**

## Phase 4: Final Verification
- [ ] **Task: Run Full Test Suite & Coverage Check**
    - [ ] Run `vitest --coverage` and ensure all tests pass.
    - [ ] Verify coverage is >80% for the newly created components.
- [ ] **Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)**