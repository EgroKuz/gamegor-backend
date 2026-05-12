# Specification: API Documentation (OpenAPI)

## Overview
This track focuses on fulfilling the product guideline requirement to make the API self-documenting. We will integrate `drf-spectacular` to automatically generate an OpenAPI 3 schema and expose an interactive Swagger UI for developers and the diploma commission.

## Functional Requirements
- Install and configure `drf-spectacular`.
- Generate a dynamic OpenAPI 3.0 schema representing all exposed DRF ViewSets and endpoints.
- Expose a public `/api/schema/` endpoint returning the raw YAML/JSON schema.
- Expose a public `/api/docs/swagger-ui/` endpoint rendering the interactive Swagger UI.
- Configure DRF settings to use `drf-spectacular` as the default schema generator.

## Non-Functional Requirements
- The documentation should accurately reflect required fields, response types, and authentication requirements (e.g., JWT).
- The endpoints must be accessible without authentication to allow easy review during the diploma presentation.

## Acceptance Criteria
- `drf-spectacular` is added to `requirements.txt`.
- Browsing to `/api/docs/swagger-ui/` successfully loads the interactive Swagger interface.
- All major endpoints (Users, Games, Sessions, Videos, Recommendations) are visible in the UI.

## Out of Scope
- Writing manual, highly customized schema extensions for every single custom action (basic auto-generation is sufficient for this pass).
- Exposing Redoc UI (only Swagger UI is requested).