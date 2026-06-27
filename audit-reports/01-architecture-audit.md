# NKT Insurance Solutions — Architecture & Monorepo Health Audit

## Summary
The NKT Insurance Solutions project utilizes a decoupled three-tier monorepo structure consisting of an Express.js backend, a TanStack Start client frontend, and a React SPA admin portal. The boundary isolation between tiers is generally clean, preventing cross-tier import leakage. However, there are architectural deviations from the established constitution: route files in the client site act as heavy components rather than thin shells, major library versions (React, Recharts, Lucide) are mismatched between tiers, and TypeScript strictness is loosely enforced in the admin portal.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🟠 High | Frontend (`src/routes/`) | **Route Shell Discipline Violation:** Route files like `index.tsx` (2,191 lines) and `about.tsx` (617 lines) contain heavy component definitions, state logic, and layout markup, violating the thin-shell rule. | Refactor route files to act as lightweight page declarations. Extract all UI components, custom hooks, and page layouts into dedicated folders in `src/components/`. |
| 2 | 🟡 Medium | Monorepo (`package.json`s) | **Duplicated & Mismatched Dependencies:** Critical library versions differ across the workspace (e.g., Recharts is `^2.15.4` on frontend and `^3.9.0` on admin portal; React is `^19.2.0` vs `^19.2.7`). | Align package versions across the root workspace or transition to a unified monorepo management tool (like pnpm workspaces or npm workspaces) with shared dependency configurations. |
| 3 | 🟡 Medium | Admin Portal (`src/`) | **Loose TypeScript Typings:** The admin portal uses implicit `any` types, manual type assertions (like `(window as any).webkitAudioContext`), and misses explicit return values on event handlers. | Enable strict mode rules (`strict: true`) in `admin-portal/tsconfig.json` and replace `any` casts with proper type assertions or safe feature-detection checks. |
| 4 | 🟢 Low | Monorepo (`.gitignore` / `.env`) | **Redundant Config Files:** Leftover configuration drafts (like `ADMIN_PORTAL.md` and legacy guidelines) exist in the client repository, cluttering root workspace directories. | Clean up local documentation and move archived milestone change summaries into a consolidated `docs/changelogs_archive/` path. |

## Next Actions
1. Extract the massive landing page layout from [index.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/index.tsx) into a separate layout component under `frontend/src/components/Home/HomeLayout.tsx`.
2. Extract the milestones and prose logic from [about.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/about.tsx) into `frontend/src/components/About/`.
3. Standardize dependency versions in the `package.json` files for both [frontend](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/package.json) and [admin-portal](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/admin-portal/package.json).
