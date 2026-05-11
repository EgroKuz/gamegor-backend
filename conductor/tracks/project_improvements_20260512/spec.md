# Specification: Project Improvements 2026-05-12

## Overview
This track focuses on enhancing the project's robustness, performance, and security in preparation for the diploma defense. Key areas include optimizing database queries, improving AI service reliability, hardening authentication, and establishing a cleaner architectural pattern to resolve circular dependencies.

## Functional Requirements
- **Optimization:**
    - Eliminate N+1 query problems in `GameViewSet`, `VideoViewSet`, and `RecommendationViewSet`.
    - Improve AI advisor (`AIAdvisor`) performance and implement robust error handling for Ollama service timeouts or failures.
- **Security:**
    - Implement stricter password validation policies.
    - Enhance session security settings (e.g., `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`).
- **Refactoring:**
    - Introduce a clear Service Layer to house business logic, moving it out of ViewSets and Models to resolve circular dependencies cleanly.
- **Testing:**
    - Achieve significant test coverage for `recommendations` and `users` apps.

## Non-Functional Requirements
- **Performance:** API response times for lists should be significantly reduced after N+1 fixes.
- **Reliability:** The system should gracefully handle Ollama service unavailability.
- **Maintainability:** Circular dependencies should be eliminated, making the codebase easier to navigate.

## Acceptance Criteria
- All N+1 query warnings are resolved for primary list/detail endpoints.
- AI advisor returns a fallback message instead of crashing when Ollama is offline.
- New tests for `recommendations` and `users` pass with >80% coverage in those apps.
- Circular imports no longer require manual imports inside methods.

## Out of Scope
- Major UI/UX redesign of the templates.
- Adding entirely new features not mentioned in the current product definition.