# Implementation Plan: Moderator Edit Game

**Phase 1: Backend Updates** [checkpoint: d32d5bc]
- [x] Task: Update `backend/users/serializers.py` -> `UserSerializer` to include `is_staff` as a read-only field. 4402094
- [x] Task: Update `backend/games/views.py` -> `GameViewSet`. Currently, it might be read-only or restrict updates. Add/modify permission classes or methods to allow `update` and `partial_update` exclusively for `IsAdminUser` (or a custom permission that checks `is_staff`). 4402094
- [x] Task: Ensure `backend/games/serializers.py` -> `GameSerializer` allows writing to the core fields. (Note: handling nested `platforms` might require special logic in `update()`; if so, implement it). 4402094
- [x] Task: Conductor - User Manual Verification 'Phase 1: Backend Updates' (Protocol in workflow.md) d32d5bc

**Phase 2: Frontend Auth Context** [checkpoint: existing]
- [x] Task: Modify `frontend/src/api/users.js` to ensure there is a function to fetch the current user's profile (e.g., `getProfile()`). (Already implemented)
- [x] Task: Modify `frontend/src/context/AuthContext.jsx` to fetch the user profile when authenticated and expose a `user` object (containing `is_staff`) to consumers. (Already implemented)
- [x] Task: Conductor - User Manual Verification 'Phase 2: Frontend Auth Context' (Protocol in workflow.md) (Already implemented)

**Phase 3: Edit Game UI & Logic** [checkpoint: existing]
- [x] Task: Create `frontend/src/components/games/EditGameModal.jsx` featuring a form with inputs for `title`, `genre`, `developer`, `release_date`, `cover_image`, `description`, and `total_achievements`. (Already implemented)
- [x] Task: Add an `updateGame` function to `frontend/src/api/games.js`. (Already implemented)
- [x] Task: Modify `frontend/src/pages/GameDetailsPage.jsx` to conditionally render the "Edit Game" button if `user?.is_staff`. (Already implemented)
- [x] Task: Wire the button to open the `EditGameModal`, handle form submission via `updateGame`, and refresh the page data on success. (Already implemented)
- [x] Task: Conductor - User Manual Verification 'Phase 3: Edit Game UI & Logic' (Protocol in workflow.md) (Already implemented)

**Phase 4: Final Verification**
- [ ] Task: Run full backend test suite (`python manage.py test`). Add tests for the backend permission logic.
- [ ] Task: Run full frontend test suite (`npm run test`). Add component tests for `EditGameModal` and `GameDetailsPage` checking role-based rendering.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
