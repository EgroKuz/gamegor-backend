# Implementation Plan: Auth Pages Aesthetic Redesign

## Phase 1: Shared UI Components & Layout
- [ ] **Task: Create Split-Screen Wrapper Component**
    - [ ] Write tests for a new `AuthLayout` component verifying it renders children and a graphic section.
    - [ ] Implement `AuthLayout` with Tailwind CSS for responsiveness (side-by-side on desktop, stacked/hidden on mobile).
- [ ] **Task: Create Reusable Form Inputs**
    - [ ] Write tests for a reusable `FormInput` component, ensuring it handles labels, types, and error states.
    - [ ] Implement `FormInput` with Tailwind styling (dark theme, neon focus borders) and inline error message support.
    - [ ] Write tests for a `PasswordInput` component that includes a show/hide toggle.
    - [ ] Implement `PasswordInput` extending the base input styling.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: Shared UI Components' (Protocol in workflow.md)**

## Phase 2: Refactoring Login & Registration
- [ ] **Task: Redesign Login Page**
    - [ ] Update `Login.test.jsx` to reflect the new DOM structure and interactions (e.g., toggling password).
    - [ ] Refactor `Login.jsx` to use `AuthLayout`, `FormInput`, and `PasswordInput`.
    - [ ] Apply neon aesthetic to the submit button and add the "Switch to Register" link.
    - [ ] Ensure existing AuthContext login logic works seamlessly with the new form.
- [ ] **Task: Redesign Registration Page**
    - [ ] Update `Register.test.jsx` to reflect the new DOM structure and interactions.
    - [ ] Refactor `Register.jsx` to use the new UI components.
    - [ ] Implement inline validation checks (e.g., password matching) before submission.
    - [ ] Apply styling and add the "Switch to Login" link.
- [ ] **Task: Conductor - User Manual Verification 'Phase 2: Refactoring Login & Registration' (Protocol in workflow.md)**

## Phase 3: Final Verification
- [ ] **Task: Run Full Test Suite & Coverage Check**
    - [ ] Ensure all frontend tests pass, specifically the updated auth tests.
    - [ ] Verify coverage is >80% for the modified files (`Login.jsx`, `Register.jsx`, new UI components).
- [ ] **Task: Conductor - User Manual Verification 'Final Verification' (Protocol in workflow.md)**