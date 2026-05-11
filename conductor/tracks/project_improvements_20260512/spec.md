# Specification: Project Improvements and Optimization

## Overview
This track focuses on executing a comprehensive improvement plan based on the initial codebase analysis. The goal is to address critical performance bottlenecks, enhance security configurations, and complete the project's infrastructure setup for deployment.

## Functional Requirements
- **Performance (ORM):**
  - Identify and fix N+1 query problems in all ViewSets (`games`, `platforms`, `videos`, `gamesessions`).
  - Use `select_related` for foreign key relationships.
  - Use `prefetch_related` for many-to-many relationships (e.g., `platforms` in `GameSerializer`).
  - Use `annotate` for aggregations (e.g., `game_count` in `PlatformSerializer`).
- **Security Settings:**
  - Refactor `backend/settings.py` to remove hardcoded values.
  - Ensure `DEBUG`, `SECRET_KEY`, `ALLOWED_HOSTS`, and Database credentials are read exclusively from environment variables using `python-dotenv`.
  - Delete `passwords.txt` from the repository.
  - Configure `CORS_ALLOWED_ORIGINS` securely instead of allowing all origins.
- **Dockerization:**
  - Create a `Dockerfile` for the Django backend.
  - Use an ASGI/WSGI production server (e.g., `gunicorn` or `uvicorn`) inside the Docker container instead of `manage.py runserver`.
  - Integrate the new `backend` service into the existing `docker-compose.yml`.

## Non-Functional Requirements
- **Strict TDD:** All modifications (especially performance fixes) must be verified by automated tests to ensure existing functionality is not broken and query counts are actually reduced.

## Acceptance Criteria
- No ViewSet triggers N+1 queries when fetching lists.
- `settings.py` contains no hardcoded secrets or insecure defaults.
- Running `docker-compose up` successfully starts the entire stack, including the Django backend serving requests via a production-ready server.
- All unit tests pass.