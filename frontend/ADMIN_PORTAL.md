# Admin Portal — Advisor Workspace & Client Space

**Status:** ✅ Complete  
**Route:** `/admin/login` (with `/admin` redirecting to `/admin/login`)  
**File:** [admin.login.tsx](file:///d:/nktinsurance-main/src/routes/admin.login.tsx) & [src/components/admin/](file:///d:/nktinsurance-main/src/components/admin/)  
**Date:** June 2026

---

## Overview

The Admin Portal is a dual-login authenticated workspace serving two distinct user types:

- **Clients** — Check callback request status, view active policies, submit new requests
- **Advisors** — Manage all leads, view analytics, update statuses, export data

It is intentionally excluded from search indexing (`robots: noindex, nofollow`) and is accessed via the "Portal" button in the main navigation.

---

## Architecture

The portal resolves under the `/admin/login` route (with `/admin` performing an automatic client-side redirect). The page component logic has been refactored and modularized into sub-components in [src/components/admin/](file:///d:/nktinsurance-main/src/components/admin/) to address code complexity and maintainability.

Authentication state is managed internally by the [AdminDashboard.tsx](file:///d:/nktinsurance-main/src/components/admin/AdminDashboard.tsx) component using React `useState`. There is no server-side session — authentication state lives in component memory only (resets on refresh, as expected for a demo/staging environment).

### State Machine

```
Initial → UnifiedLoginPortal
  ↓ Client login success
ClientDashboard (clientEmail, clientName)
  ↓ Logout
Initial

Initial → UnifiedLoginPortal
  ↓ Advisor login success
AdvisorDashboard (advisorEmail)
  ↓ Logout
Initial
```

---

## Login Portal — Split-Screen Design

### Layout

2-column split layout:

- **Left column (1.1fr):** Branding cover image with dark gradient overlay, NKT logo, headline, and compliance text
- **Right column (0.9fr):** Unified tab-based login form

The left column is hidden on screens ≤1024px (mobile/tablet shows form only).

### Tab Switcher (Pill UI)

```
[ Client Space ]  [ Advisor Panel ]
```

- Pill-style segmented control
- Client tab: terracotta accent (`var(--color-secondary)`)
- Advisor tab: forest green accent (`var(--color-accent)`)
- Smooth 200ms transition between states

---

## Client Login

### Flow

1. User enters their registered email address
2. 600ms simulated async delay
3. Name is derived from email prefix (e.g. `priya.patel@...` → "Priya Patel")
4. Redirects to `ClientDashboard` with email + name

### Demo Hint

```
Email: priya.patel@example.com
```

### Name Detection Logic

```ts
// Recognises known demo clients by email prefix
if (emailLower.includes("rajesh")) detectedName = "Rajesh Sharma";
else if (emailLower.includes("priya")) detectedName = "Priya Patel";
else if (emailLower.includes("amit")) detectedName = "Amit Verma";
// ... fallback: capitalised email prefix
```

---

## Advisor Login

Two methods are supported:

### 1. Google OAuth (Primary)

- Uses `@react-oauth/google` `<GoogleLogin>` component
- Configured with `useOneTap`, pill shape, large size
- On success: JWT decoded with `jwt-decode`, name/email extracted
- 600ms delay before dashboard redirect

### 2. Password Login (Fallback)

- Email + password form with show/hide password toggle (`Eye` / `EyeOff` icons)
- Hardcoded staging credentials:
  ```
  Username: admin
  Password: admin123
  ```
- 800ms simulated async delay

### Error / Loading States

- Inline notification bar below form card
- Green (accent-bg) for success messages
- Red for error messages
- `<Spinner>` component shown alongside loading message

---

## Client Dashboard

After login, clients see a 2-column grid (`1fr 1fr`) dashboard.

### Left Column

**Active Policies**

- Shows 2 mock policies (Life Insurance LIC Tech Term, Health Insurance Family Floater)
- Each policy card uses radial gradient background with accent/secondary colours
- Displays: plan type, plan name, cover amount, premium due date, status badge

**New Callback Request Form**

- Fields: Insurance type (select), Mobile number, Additional notes
- On submit: saves new `Lead` object to localStorage, shows 5-second success message
- Triggers `onNewLeadAdded()` callback to refresh advisor's lead list

### Right Column

**Documents**

- Mock downloadable documents: Premium Receipt, Policy Schedule, Tax Certificate
- Download triggers `alert()` (mock — no real file delivery)

**Quick Actions**

- "File a Claim" → `alert()` (mock)
- "WhatsApp Advisor" → opens `wa.me` link

**Callback History**

- Filters `nkt_leads` localStorage by client email
- Shows status badge per request (new / contacted / quoted / closed)

---

## Advisor Dashboard

Full lead management workspace.

### Header Bar

- NKT logo + "Advisor Workspace" title
- Advisor email shown
- Logout button

### Analytics Row — 4 KPI Cards

| Card         | Icon       | Data                                   |
| ------------ | ---------- | -------------------------------------- |
| Total Leads  | Users      | Count of all leads                     |
| New Leads    | TrendingUp | Count where status = "new"             |
| Contacted    | UserCheck  | Count where status = "contacted"       |
| Est. Premium | Coins      | Sum of all lead premiums (₹ formatted) |

### Charts Row — 2 Charts

1. **Bar Chart** (Recharts `BarChart`) — Leads by insurance type (Life, Health, Motor)
2. **Pie Chart** (Recharts `PieChart`) — Lead status distribution

Chart colours:

- Life: `#14532D` (accent)
- Health: `#B45309` (secondary)
- Motor: `#0369A1` (blue)
- New: `#14532D`, Contacted: `#B45309`, Quoted: `#0369A1`, Closed: `#6B7280`

### Lead Table

Columns: Name, Phone, Interest, Status, Premium (₹), Created date, Actions

**Filtering & Search:**

- Search box: filters by name or phone (case-insensitive)
- Status filter: All / New / Contacted / Quoted / Closed
- Interest filter: All / Life / Health / Motor

**Actions per row:**

- Edit button (`Edit2` icon) → opens inline edit modal
- Delete button (`X` icon) → removes from localStorage

**Status badges** colour-coded:

- New → green accent bg
- Contacted → terracotta bg
- Quoted → blue bg
- Closed → gray bg

### Add Lead Modal

- Triggered by "+ Add Lead" button
- Fields: Name, Phone, Email, Insurance interest, Status, Premium estimate, Notes
- Saves to localStorage with generated ID

### Edit Lead Modal

- Same fields as Add Lead, pre-populated with existing data
- Updates the lead in-place in localStorage

### Export Button

- Downloads leads as CSV
- Filename: `nkt-leads-YYYY-MM-DD.csv`
- Columns: ID, Name, Phone, Email, Interest, Status, Premium, Notes, Created

---

## Lead Data Structure

All leads are stored in `localStorage` under the key `nkt_leads`:

```ts
interface Lead {
  id: string; // "lead_" + Date.now() + random
  name: string;
  phone: string;
  email: string;
  interest: string; // "life" | "health" | "motor" | "multiple" | "not-sure"
  status: string; // "new" | "contacted" | "quoted" | "closed"
  premium: number; // estimated annual premium in ₹
  notes: string;
  createdAt: string; // ISO date string
}
```

### Default Seed Data

On first load (empty localStorage), 6 sample leads are seeded automatically:

- Rajesh Sharma — Life, new
- Priya Patel — Health, contacted
- Amit Verma — Motor, quoted
- Sunita Rao — Life, new
- Vikram Singh — Health, closed
- Anil Gupta — Motor, contacted

---

## Dependencies

| Package               | Purpose                                             |
| --------------------- | --------------------------------------------------- |
| `@react-oauth/google` | Google OAuth 2.0 login button                       |
| `jwt-decode`          | Decodes Google JWT credential to extract name/email |
| `recharts`            | Bar chart + Pie chart for analytics                 |
| `lucide-react`        | All icons throughout the portal                     |
| `Spinner` component   | Loading indicator on login buttons                  |

### Google OAuth Config

The `GoogleOAuthProvider` wraps the entire route with the app's Client ID (set via env or hardcoded in component):

```tsx
<GoogleOAuthProvider clientId="...">
  <AdminDashboard />
</GoogleOAuthProvider>
```

---

## Responsive Behaviour

| Breakpoint | Change                                             |
| ---------- | -------------------------------------------------- |
| ≤1024px    | Left branding column hidden; form takes full width |
| ≤768px     | Advisor dashboard grid collapses to single column  |
| ≤600px     | KPI cards wrap to 2×2 grid                         |

---

## Security Notes

This is a **demo/staging** portal — not a production authentication system. Key limitations:

- No real server-side auth
- Advisor credentials are hardcoded (`admin123`)
- Lead data stored only in browser localStorage (not synced to server)
- Session resets on page refresh
- Google OAuth is wired but doesn't gate anything server-side

For production, replace with a proper auth provider (Supabase, Firebase Auth, etc.) and a real backend API.

---

## Files

- `src/routes/admin.tsx` — Redirect route helper for `/admin` (redirects to `/admin/login`).
- `src/routes/admin.login.tsx` — TanStack route definition, search validation, canonical tags, and page wrapper for `/admin/login`.
- `src/components/admin/AdminDashboard.tsx` — Orchestrator component. Integrates GoogleOAuthProvider, manages workspace/portal views, checks session, updates localStorage, triggers audio notifications, and runs cross-tab sync.
- `src/components/admin/UnifiedLoginPortal.tsx` — Visual split-screen login layout, password form fallback, and Google login triggers.
- `src/components/admin/AdvisorWorkspace.tsx` — Full advisor leads CRM dashboard (leads list, search/filters, edit/add modals, data table, and analytics charts).
- `src/components/admin/types.ts` — Type declarations for CRM (Lead, TimelineEvent, LeadStatus, AdvisorToast).
- `src/assets/images/login_branding_cover.png` — Cover image for left login column
- `src/assets/images/logo.png` — NKT logo used in branding header

---

## Before vs After

### Before

- No portal existed
- Leads captured by LeadForm had no management interface
- No way to view or follow up on submitted callbacks

### After

- ✅ Dual-role login (Client + Advisor)
- ✅ Client can self-serve: view policies, check request status, submit new requests
- ✅ Advisor has full CRUD on leads
- ✅ Analytics dashboard with charts
- ✅ CSV export for offline use
- ✅ Google OAuth integration
- ✅ Editorial branding on login screen (matches site design system)
