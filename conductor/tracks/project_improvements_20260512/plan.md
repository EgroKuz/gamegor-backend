# Implementation Plan: Project Improvements 2026-05-12

**Phase 1: Architecture & Refactoring** [checkpoint: 744731f]
- [x] Task: Create a Service Layer for `recommendations` and `users` to centralize business logic. 17af810
- [x] Task: Move complex logic from `recommendations/views.py` and models to `recommendations/services/`. 2430358
- [x] Task: Move user-related business logic (profile updates, stats aggregation) to `users/services/`. a0e1a41
- [x] Task: Eliminate circular imports by routing dependencies through the service layer. 35960ae
- [x] Task: Conductor - User Manual Verification 'Phase 1: Architecture & Refactoring' (Protocol in workflow.md) 744731f

**Phase 2: Optimization**
- [x] Task: Optimize `VideoViewSet` and `UserVideoInteractionViewSet` to eliminate N+1 queries using `select_related` and `prefetch_related`. fcd2e6a
- [x] Task: Resolve N+1 queries in `RecommendationViewSet` actions, ensuring efficient retrieval of related videos and games. a46d704
- [x] Task: Implement robust error handling and timeouts for `AIAdvisor` to handle Ollama service unavailability gracefully. 5b147c0
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Optimization' (Protocol in workflow.md)

**Phase 3: Security & Auth**
- [ ] Task: Implement stricter password validation policies in `settings.py`.
- [ ] Task: Configure session and CSRF security settings (Secure, HttpOnly, SameSite) for production readiness.
- [ ] Task: Review and restrict `CORS_ALLOWED_ORIGINS` using environment variables to prevent unauthorized cross-origin requests.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Security & Auth' (Protocol in workflow.md)

**Phase 4: Testing & Quality**
- [ ] Task: Implement comprehensive unit tests for the new `recommendations` service layer.
- [ ] Task: Implement unit and integration tests for `users` app, focusing on authentication and profile management.
- [ ] Task: Implement end-to-end integration tests for the AI recommendation flow.
- [ ] Task: Verify that code coverage for `recommendations` and `users` apps exceeds 80%.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Testing & Quality' (Protocol in workflow.md)