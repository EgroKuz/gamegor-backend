# Product Guide

## Initial Concept
A backend API on Django + Django REST Framework for a video game aggregator with a recommendation system.

## Target Audience
- **Gamers / Viewers:** Users seeking a platform to find games and videos, track their sessions, and receive recommendations based on their preferences and skills.

## Primary Goal
- **Diploma Defense Ready:** The immediate focus is preparing the project for an academic diploma defense. This includes ensuring code quality, finalizing business logic, fixing performance issues, and aligning the implementation with the academic documentation.

## Core Value Proposition
- **All-in-One Aggregator:** A unified platform that consolidates tracking for games, platforms, video content, and user gaming sessions into a single, cohesive ecosystem.

## Key Features
- **Game & Video Tracking:** Centralized search and rating for games and content.
- **AI Recommendations:** Smart matching of games and videos based on user preferences.
- **Stats & Achievements:** Comprehensive user statistics aggregation (games played, genres, videos watched) and unlockable achievements based on platform activity.

## Key Technical Priorities
- **Performance & Security:** N+1 query problems are resolved. AI integration is hardened with timeouts, and core logic is isolated in a testable Service Layer. Session and password security policies meet production readiness standards.