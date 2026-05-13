# Product Guide

## Initial Concept
A full-stack video game aggregator with a recommendation system, featuring a React (Vite) frontend and a Django REST Framework backend API.

## Target Audience
- **Gamers / Viewers:** Users seeking a platform to find games and videos, track their sessions, and receive recommendations based on their preferences and skills.

## Primary Goal
- **Diploma Defense Ready:** The immediate focus is preparing the project for an academic diploma defense. This includes ensuring code quality, finalizing business logic, fixing performance issues, and aligning the implementation with the academic documentation.

## Core Value Proposition
- **All-in-One Aggregator:** A unified platform that consolidates tracking for games, platforms, video content, and user gaming sessions into a single, cohesive ecosystem.

## Key Features
- **Game & Video Tracking:** Centralized search and rating for games and content.
- **Video Content Hub:** A dedicated page aggregating game-related videos, allowing users to watch content directly on the platform and discover related games.
- **AI Recommendations:** Smart matching of games and videos based on user preferences.
- **User Profiles & History:** Personal dashboard for managing user data and viewing detailed game session history with interactive reviews.
- **Stats & Achievements:** Comprehensive user statistics aggregation (games played, genres, videos watched) and unlockable achievements based on platform activity.

## Key Technical Priorities
- **Performance & Security:** N+1 query problems are resolved. AI integration is hardened with timeouts, and core logic is isolated in a testable Service Layer. Session and password security policies meet production readiness standards.