# Implementation Plan: Project Improvements and Optimization

## Phase 1: Security and Configuration
- [x] Task: Remove `passwords.txt` from source control af07d8a
- [x] Task: Refactor `settings.py` to use `python-dotenv` for `DEBUG`, `ALLOWED_HOSTS`, and `CORS` e288c97
- [ ] Task: Write basic tests to verify settings are loaded from environment variables
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Security and Configuration' (Protocol in workflow.md)

## Phase 2: Performance (ORM) Optimization
- [ ] Task: Write failing tests capturing current query counts for `GameViewSet` and `PlatformViewSet`
- [ ] Task: Implement `prefetch_related` and `annotate` in `games/views.py` and `games/serializers.py` to fix N+1 queries
- [ ] Task: Write failing tests capturing current query counts for `VideoViewSet` and `GameSessionViewSet`
- [ ] Task: Implement `select_related` in `videos/views.py` and `gamesessions/views.py` to fix N+1 queries
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Performance (ORM) Optimization' (Protocol in workflow.md)

## Phase 3: Dockerization
- [ ] Task: Create a `Dockerfile` for the Django backend using Gunicorn/Uvicorn
- [ ] Task: Update `docker-compose.yml` to include the `backend` service and proper network routing
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Dockerization' (Protocol in workflow.md)