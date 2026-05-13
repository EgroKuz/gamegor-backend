# Implementation Plan: Not Found (404) & Video Content Pages

## Phase 1: API & Routing Setup [checkpoint: e9b4161]
- [x] **Task: Setup Video API Service** [2c9c209]
    - [x] Write failing test for `videos.js` API helper fetching from `/videos/`.
    - [x] Implement `frontend/src/api/videos.js` with `getVideos` function.
- [x] **Task: Setup React Router Routes** [f9944af]
    - [x] Update `App.jsx` to include a catch-all route `*` for the 404 page.
    - [x] Update `App.jsx` to include a route `/videos` for the Video Content page.
    - [x] Create placeholder components for `NotFoundPage` and `VideoContentPage`.
- [x] **Task: Update Header Navigation** [e5ed017]
    - [x] Add a link to the Video Content page (`/videos`) in `Header.jsx`.
- [x] **Task: Conductor - User Manual Verification 'Phase 1: API & Routing Setup' (Protocol in workflow.md)**

## Phase 2: Not Found (404) Page Implementation [checkpoint: 2a10a8f]
- [x] **Task: Build NotFoundPage Component** [c5bb242]
    - [x] Write failing tests verifying the 'Game Over' message and navigation links.
    - [x] Implement `NotFoundPage` with Tailwind CSS for the dark/glitch aesthetic.
    - [x] Ensure links to Home (`/`) and Games (`/games`) work correctly.
- [x] **Task: Conductor - User Manual Verification 'Phase 2: Not Found Page Implementation' (Protocol in workflow.md)**

## Phase 3: Video Content Page Implementation [checkpoint: 5c1654e]
- [x] **Task: Create VideoCard Component** [fc9a3d5]
    - [x] Write failing tests for `VideoCard` to render YouTube embed `<iframe>` and game title.
    - [x] Implement `VideoCard` with Tailwind CSS.
- [x] **Task: Build VideoContentPage** [76eedfe]
    - [x] Write failing tests for fetching videos and rendering a grid of `VideoCard`s.
    - [x] Implement `VideoContentPage` logic (loading state, error state, empty state).
    - [x] Integrate `getVideos` API call.
- [x] **Task: Conductor - User Manual Verification 'Phase 3: Video Content Page Implementation' (Protocol in workflow.md)**

## Phase 4: Final Verification [checkpoint: 5c1654e]
- [x] **Task: Run Full Test Suite & Coverage Check**
    - [x] Run `vitest --coverage` and ensure all tests pass.
    - [x] Verify coverage is >80% for the newly created components.
- [x] **Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)**