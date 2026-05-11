# Product Guidelines

## 1. Documentation Standards
- **Detailed Docstrings:** All models, views, serializers, and complex business logic functions must include comprehensive docstrings explaining their purpose, parameters, and return types.
- **OpenAPI / Swagger:** The API must be self-documenting. Generate interactive OpenAPI/Swagger documentation for all endpoints to facilitate testing and presentation during the diploma defense.

## 2. API Design & Structure
- **Standard DRF:** Adhere to the default Django REST Framework idioms for routing, serialization, and pagination. Rely on standard HTTP status codes and DRF exception handling.

## 3. Code Organization & Architecture
- **Services Layer:** Keep Views and Models skinny. Complex business logic must be isolated within dedicated `services/` modules (as already implemented in the recommendations app).
- **Query Optimization:** Performance is a strict priority. Mandatory use of `select_related`, `prefetch_related`, and `annotate` is required across all ViewSets to eliminate N+1 query problems.