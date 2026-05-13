# Specification: Game Cover Images

## Overview
This track enhances the visual appeal of the `GamesPage` by displaying cover images for each game within the `GameCard` component. 

## Functional Requirements
- **Display Images:**
    - Update the `GameCard` component to render an `<img>` element using the `cover_image_url` property from the game data.
    - The image should be displayed at the top of the card (Top Banner style).
- **Fallback Logic:**
    - If `cover_image_url` is missing, null, or fails to load, display a visual placeholder (e.g., a gray box with a generic gaming icon 🎮) to maintain consistent card sizes.

## Non-Functional Requirements
- **UX/UI:** The image should be styled to fit well within the existing card layout (e.g., proper aspect ratio, object-cover to prevent stretching, rounded top corners to match the card).
- **Performance:** Ensure images do not break the grid layout if they load slowly.

## Acceptance Criteria
- Games with a `cover_image_url` display their respective images at the top of their card on the `/games` route.
- Games without an image display the icon placeholder instead.
- The overall grid layout of the `GamesPage` remains stable and visually pleasing.

## Out of Scope
- Adding functionality to upload or modify game images (this assumes the data is already in the backend/database).
