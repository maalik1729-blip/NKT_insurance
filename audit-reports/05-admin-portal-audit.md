# NKT Insurance Solutions — Admin CRM Portal Audit

## Summary
The Admin Portal is a standalone React SPA served at `http://localhost:8081` (local) and proxied to `https://www.nktinsurance.co.in/admin/login` (production). While the Vite build configurations and cross-tab storage sync are working correctly, the security profile of the application is weak. Lead PII is saved as plaintext in `localStorage`, the authentication mechanism is a client-side mock check susceptible to bypasses, and route protection is non-existent beyond conditional rendering.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🔴 Critical | Admin Portal (`src/`) | **Plaintext PII Cached Client-Side:** Customer names, phone numbers, and interests are stored in `localStorage` in plaintext to support cross-tab synchronization, exposing user data on shared computers. | Encrypt the lead payload before saving it to `localStorage`, or transition state management to memory (using React Context or Redux) combined with short-lived session caches. |
| 2 | 🟠 High | Admin Portal (`src/components/admin/UnifiedLoginPortal.tsx`) | **Weak Mock Authentication:** The authentication check compares username and password inputs directly against process env strings on the client side, returning credentials check success without token verification. | Replace the client-side login check with a secure backend authentication endpoint returning a secure HTTP-Only cookie or JWT token. |
| 3 | 🟡 Medium | Admin Portal (`src/components/admin/AdminDashboard.tsx`) | **Stale Data Polling Strategy:** The application pulls the complete lead list every 8 seconds. This creates substantial overhead on Render and database connections, and fails to handle sessions that remain active overnight. | Switch to delta polling (requesting only leads updated after a specific timestamp) or integrate WebSockets / Server-Sent Events (SSE) for modern real-time synchronization. |
| 4 | 🟢 Low | Admin Portal (`src/components/admin/AdvisorWorkspace.tsx`) | **Chart Layout Scaling Mismatch:** Recharts container objects lack explicit responsive height limits in some layouts, causing visual cutoff on tablet screens (768px–1024px). | Ensure that all `<ResponsiveContainer>` wrappers in the analytics sections define explicit, fluid min-height limits. |

## Next Actions
1. Migrate the advisor authentication verification check in [UnifiedLoginPortal.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/admin-portal/src/components/admin/UnifiedLoginPortal.tsx) to call the Express server's secure login route.
2. Encrypt all local lead list arrays before saving them into local storage inside [AdminDashboard.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/admin-portal/src/components/admin/AdminDashboard.tsx#L187).
3. Review and ensure Recharts wrappers in [AdvisorWorkspace.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/admin-portal/src/components/admin/AdvisorWorkspace.tsx) are fully fluid across tablet sizes.
