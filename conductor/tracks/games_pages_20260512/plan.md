# Implementation Plan: Games Catalog & Details Pages

## Phase 1: API Integration & Routing
- [x] **Task: Create API Service for Games** [f5a9d81]
    - [x] Write tests for API helper functions (mocking fetch).
    - [x] Implement `getGames` and `getGameDetails` in `frontend/src/api/games.js`.
- [x] **Task: Setup Routing** [d281fca]
    - [x] Write integration test ensuring correct component rendering for `/games` and `/games/:id` routes.
    - [x] Update `App.jsx` to include routes for `GamesPage` and `GameDetailsPage` (pointing to placeholder components initially).
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: API Integration & Routing' (Protocol in workflow.md)**

## Phase 2: Games Catalog Page (Main View)
- [ ] **Task: Create GameCard Component**
    - [ ] Write tests for `GameCard` rendering title and image.
    - [ ] Implement `GameCard` with Tailwind styling and hover effects.
- [ ] **Task: Implement GamesPage Logic and Grid**
    - [ ] Write tests for fetching games on mount and rendering the grid.
    - [ ] Implement `GamesPage.jsx` fetching data via API and mapping over `GameCard`s.
- [ ] **Task: Implement Text Search Filtering**
    - [ ] Write tests for search input updating state and filtering the rendered list.
    - [ ] Add search input to `GamesPage` and implement client-side (or server-side if supported) filtering logic.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Games Catalog Page' (Protocol in workflow.md)**

## Phase 3: Game Details Page
- [ ] **Task: Implement GameDetailsPage Layout**
    - [ ] Write tests for `GameDetailsPage` fetching specific game data based on URL parameter.
    - [ ] Write tests to ensure core info (title, description, developer) is rendered.
    - [ ] Implement `GameDetailsPage.jsx` with a hero section for the cover and detailed text sections.
- [ ] **Task: Add Navigation & Polish**
    - [ ] Ensure "Back to Games" navigation works correctly.
    - [ ] Apply responsive Tailwind classes to ensure details look good on mobile and desktop.
- [ ] **Task: Conductor - User Manual Verification 'Phase 3: Game Details Page' (Protocol in workflow.md)**

## Phase 4: Final Verification
- [ ] **Task: Run Full Test Suite & Coverage Check**
    - [ ] Ensure all frontend tests pass.
    - [ ] Verify coverage is >80% for `api/games.js`, `GameCard.jsx`, `GamesPage.jsx`, and `GameDetailsPage.jsx`.
- [ ] **Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)**