# Specification: Games Catalog & Details Pages

## Overview
The goal of this track is to implement the primary user-facing pages for browsing the video game catalog: a main Games list page and individual Game Details pages.

## Goals
- **Games Catalog:** Provide a visually appealing grid of available games.
- **Searchability:** Allow users to quickly find games via text search.
- **Game Details:** Present core information about a specific game in a dedicated view.
- **Navigation:** Establish routing between the catalog and individual game details.

## Functional Requirements

### 1. Main Games Page (`/games`)
- Display a grid of game cards.
- Each game card should show the game's thumbnail/cover image and title.
- Include a text search input field at the top of the page.
- The grid should dynamically update/filter based on the text search input.
- Clicking a game card must route the user to that specific game's detail page.

### 2. Game Details Page (`/games/:id`)
- Fetch and display detailed information for a single game based on the URL parameter.
- Display the main cover image prominently.
- Display core textual information:
  - Title
  - Description
  - Developer/Publisher
  - Release Date (if available in the data model)
- Include a "Back to Games" navigation button/link.

### 3. API Integration
- Utilize `frontend/src/api/client.js` to fetch data.
- Fetch list of games from `/api/games/`.
- Fetch individual game details from `/api/games/<id>/`.

## Technical Constraints
- Use **React Router** for navigation (`/games` and `/games/:id`).
- Ensure the UI matches the established dark gaming aesthetic using **Tailwind CSS**.
- Create reusable components (e.g., `GameCard`).
- Add unit tests for new components using **Vitest** and **React Testing Library**.
- Target coverage >80%.

## Acceptance Criteria
- [ ] Navigating to `/games` displays a grid of games fetched from the backend.
- [ ] The text search input correctly filters the displayed games by title.
- [ ] Clicking a game card navigates to `/games/:id`.
- [ ] The Game Details page displays the correct cover image, description, and developer info.
- [ ] The layout is responsive (mobile-friendly grid).
- [ ] New components have passing unit tests.