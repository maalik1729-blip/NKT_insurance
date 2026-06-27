# NKT Insurance Solutions — Developer Guide (CLAUDE.md)

This file contains the project architecture description, developer commands, port management, environment variables configuration, and coding guidelines for the NKT Insurance Solutions platform.

---

## Project Architecture & Directory Structure

The project is organized as a decoupled three-tier application structure:
```
nkt-insurance/
├── backend/            ← Express.js REST API & MongoDB Atlas integration
│   ├── models/         ← MongoDB Mongoose models (Lead schema)
│   ├── server.js       ← Backend server code & WhatsApp webhooks
│   └── .env            ← Server environment variables
│
├── frontend/           ← Public-facing client website (TanStack Start, React)
│   ├── src/routes/     ← Pages and routing definitions
│   ├── src/components/ ← Reusable client UI components
│   ├── vercel.json     ← Vercel deployment and proxy configuration
│   └── .env            ← Client environment variables
│
└── admin-portal/       ← Standalone Advisor CRM dashboard (Vite, React, Recharts)
    ├── src/components/ ← CRM workspace, analytics charts, login page
    ├── vercel.json     ← Redirect fallback configuration
    └── .env            ← Admin portal environment variables
```

---

## Build, Run & Test Commands

### 1. Express Backend (`backend/`)
* **Install dependencies:** `npm install`
* **Start Development Server:** `npm run dev` (Runs locally on port `5000` with automatic watches)
* **Start Production Server:** `npm run start`

### 2. Client Frontend (`frontend/`)
* **Install dependencies:** `npm install`
* **Start Development Server:** `npm run dev` (Runs locally on port `8080`)
* **Build Production Bundle:** `npm run build` (Compiles TanStack Start SSR assets and Nitro output)
* **Preview Production Build:** `npm run preview`
* **Run Unit Tests:** `npm run test`
* **Run Linting:** `npm run lint`

### 3. Advisor CRM Admin Portal (`admin-portal/`)
* **Install dependencies:** `npm install`
* **Start Development Server:** `npm run dev` (Runs locally on port `8081` / `/admin/`)
* **Build Production Bundle:** `npm run build` (Compiles static assets under `dist/`)
* **Preview Production Build:** `npm run preview`
* **Run Linting:** `npm run lint`

---

## Port Management (Windows PowerShell)

If port `8080` (or any other port) is locked by a lingering Node/Vite process, run the following commands to identify and terminate it:
```powershell
# Check for listener on port 8080
$conn = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue

# Force kill the process holding port 8080
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }
```

---

## Environment Variables Configuration

Ensure the `.env` files are set up in their respective directories before starting development:

### Backend Configuration (`backend/.env`)
* `MONGODB_URI`: Connection string for MongoDB Atlas
* `VITE_WA_ACCESS_TOKEN`: Meta Graph API v18.0 temporary or permanent access token
* `VITE_WA_PHONE_NUMBER_ID`: WhatsApp Phone Number ID from Meta Developer Console
* `VITE_WA_ADMIN_NUMBER`: The administrator WhatsApp number to receive lead alerts (e.g., `919585929914`)
* `PORT`: Default is `10000` (Render) or `5000` (Local)

### Frontend Configuration (`frontend/.env`)
* `VITE_API_URL`: Backend API URL (Local: `http://localhost:5000` | Prod: `https://nkt-insurance.onrender.com`)
* `VITE_ADMIN_PORTAL_URL`: Live URL of the admin portal (for client fallback redirections)

---

## Edge CDN & Proxy Configuration (`vercel.json`)

### Frontend Proxied Route Configuration
The client website redirects and rewrites `/admin/` paths using Vercel rewrites so the Admin Portal loads directly on the same domain (`https://www.nktinsurance.co.in/admin/login`):
* All static assets under `/admin/assets/:path*` are proxied to `https://nkt-insurance-an58.vercel.app/assets/:path*`.
* `/admin/login` is proxied to the root of `https://nkt-insurance-an58.vercel.app/`.
* Any other route under `/admin/` (like `/admin` or `/admin/panel`) will bypass the proxy rules and return the client site's standard `404` page.

### Admin Portal SPA Assets Configuration
Since the admin portal is proxied from `/admin/login`, its Vite configuration has `base: "/admin/"` to prepend asset paths in built HTML. To prevent MIME-type check failures when visiting the standalone URL (`https://nkt-insurance-an58.vercel.app/`), the `admin-portal/vercel.json` maps incoming `/admin/*` assets to the correct local directories.

---

## Code Style & Architecture Guidelines

1. **TypeScript Type Safety:** Ensure strict typing for props, models, and states. Avoid `any` types.
2. **Directory Isolation:**
   * Keep route definitions in `src/routes/` as light shells.
   * Move complex states, business logic, grids, and dashboards to `src/components/`.
3. **MIME-Type & Asset Prefixing:**
   * The Admin Portal's Vite assets are generated with a `/admin/` base.
   * In local development, the admin portal is served at `http://localhost:8081/admin/`.
4. **WhatsApp Automation Session Rule:**
   * WhatsApp Sandbox users must send a text (e.g., "Hi") to the sandbox number (`+1 (555) 670-8889`) to open a 24-hour communication window for receiving alerts.
5. **No Emojis as Icons:**
   * Never use raw emojis for UI icons or decorations. Use `lucide-react` icons exclusively.
