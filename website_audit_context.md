# NKT Insurance Solutions — Website Audit Context Specification

This document provides a comprehensive technical, architectural, and design specification of the NKT Insurance Solutions platform. It is structured to serve as context that can be fed directly to an LLM (like Claude) to craft precise, contextual prompts for auditing the website's performance, code quality, design system compliance, routing robustness, and integration patterns.

---

## 1. Project Overview & Target Audience

* **Product:** A professional lead-generation platform for NKT Insurance Solutions, an independent Indian insurance advisor specializing in Life (LIC plans), Health, and Motor insurance.
* **Target Audience:** Indian families (ages 28–55), urban and semi-urban, seeking trustworthy insurance advisory. The user demographic is trust-sensitive and prefers phone-call or WhatsApp-first communication.
* **Conversion Goals:** Convert page visitors to active leads via the online submission forms or direct WhatsApp CTA clicks.
* **Brand Tone:** Warm, professional, local, and honest. It positions itself as a "trusted neighborhood advisor" rather than a tech-heavy corporate entity.

---

## 2. Decoupled Architecture (Three-Tier Monorepo)

The repository is built as a three-tier system:

### A. Frontend (Public-Facing Client Site)
* **Tech Stack:** React 19, TanStack Start (SSR/hybrid frameworks), TypeScript, Vite.
* **Routing:** TanStack Router (file-based routing under `src/routes/`).
* **Design Engine:** Tailwind CSS + Vanilla CSS (`src/styles.css`).
* **URL:** `https://www.nktinsurance.co.in/` (Proxied Vercel deployment: `https://nkt-insurance-urow.vercel.app/`).

### B. Admin Portal (Advisor CRM Workspace)
* **Tech Stack:** React 19, Vite, Tailwind CSS, Lucide icons, Recharts (analytics graphs).
* **Base Path:** Built under the base subpath `/admin/`.
* **State Management:** Local React state synced with `localStorage` for cross-tab updates and persistence.
* **URL:** `https://nkt-insurance-an58.vercel.app/` (Also accessible under the main domain via `/admin/login`).

### C. Backend API Server
* **Tech Stack:** Node.js, Express, MongoDB Atlas (Mongoose), REST API.
* **Key Operations:** Leads storage, lead status/timeline tracking, Meta Graph API v18.0 WhatsApp triggers (both admin notification and customer confirmation), and WhatsApp webhooks challenge verification.
* **URL:** Deployed on Render at `https://nkt-insurance.onrender.com/`.

---

## 3. Design System & Style Constitution

The design relies on a locked **Editorial Design System** structured inside `frontend/src/styles.css` to build immediate trust.

### A. Typography Stack
* **Display Font (Headings):** `Spectral` (Serif Display font). Used on all headings, pull-quotes, and titles.
* **Body Font (Prose, Forms, UI):** `Inter` (Sans-serif font). Used on inputs, buttons, body copy, and labels.
* **Zero-Layout-Shift Fallbacks:** Set up via local fallbacks with precise `size-adjust` rules (Georgia for Spectral; Arial for Inter) to avoid layout jumps on web font loading.

### B. Color Hierarchy
* **Canvas Background:** `#f1f5f1` (deeper green-grey tint instead of stark white).
* **Primary Accent (Trust):** `#14532d` (Deep Forest Green). Hover is `#052e16`. Light tint is `#f0fdf4`.
* **Secondary Accent (Warmth):** `#b45309` (Warm Terracotta for Indian cultural resonance).
* **WhatsApp Brand Color:** `#16a34a` (harmonized green).
* **Dark Sections:** Deep forest green (`#14532d`), not navy or dark grey.

### C. Key Design Restrictions ("Hard Bans")
* **No Emoji Icons:** Emojis are strictly banned as icons in features, menus, or nav links. `lucide-react` SVGs must be used.
* **No Gradients:** Pink/purple/blue gradients and gradient text (`background-clip: text`) are banned.
* **Left-Biased Layouts:** Full-viewport centered stacked headers/heroes are banned. Layouts must be left-biased 2-column on desktop.
* **No Excess Eyebrows:** Standardizing section eyebrows on every block is banned.
* **AI-Footers Banned:** The generic 4-column "Product/Company/Resources" footer layout is replaced by a clean, local-focused 3-column contact and plans grid.

---

## 4. Edge CDN, Proxy, & Custom Routing Rules

A core audit area is the **same-domain reverse proxy routing** managed at the Vercel edge layer via `frontend/vercel.json` rules:

```json
{
  "rewrites": [
    { "source": "/admin/assets/:path*", "destination": "https://nkt-insurance-an58.vercel.app/assets/:path*" },
    { "source": "/admin/login", "destination": "https://nkt-insurance-an58.vercel.app/" },
    { "source": "/admin/favicon.png", "destination": "https://nkt-insurance-an58.vercel.app/favicon.png" },
    { "source": "/admin/icons.svg", "destination": "https://nkt-insurance-an58.vercel.app/icons.svg" }
  ]
}
```

* **Purpose:** Allows administrators to visit `https://www.nktinsurance.co.in/admin/login` without changing the domain in the address bar.
* **Mechanism:** 
  1. Requests to `/admin/login` serve the Admin Portal HTML in the background.
  2. The Admin Portal is built with Vite `base: "/admin/"` so it references assets starting with `/admin/assets/`.
  3. The proxy forwards these requests to the standalone Vercel files.
  4. Any other requests to `/admin/` (like `/admin/panel` or `/admin`) bypass the rewrites and return `404` pages.
* **MIME-Type Workaround:** The standalone admin portal deployment configuration (`admin-portal/vercel.json`) has a rewrite `{"source": "/admin/:path*", "destination": "/:path*"}` to map `/admin/` assets back to root directories, resolving strict CSS/JS MIME type checking blocks.

---

## 5. Third-Party Integrations & Backend Services

### A. MongoDB Schema (`backend/models/Lead.js`)
* Persists details for incoming leads: `name`, `phone`, `interest` (life, health, motor, lic, multiple, etc.), `status` (new, contacted, in-progress, closed), `timeline` (an array documenting system-generated events, admin notes, advisor changes, and updates).

### B. Meta WhatsApp Graph API v18.0
* **Admin Alert:** Pushes instant lead notification to advisor number `919585929914` using a template-free text message payload.
* **Customer Auto-Confirmation:** Sends welcome message confirming receipt and outlining the 30-minute callback window.
* **Sandbox Rule:** Recipient numbers must send an opt-in message (e.g., "Hi") to sandbox number `+1 (555) 670-8889` before receiving notifications.
* **Syslog Error Highlighting Workaround:** Render logs flag any line containing the word "alert" as syslog severity level 1 (Alert), displaying success logs in red. To prevent this, success logs are designated as `Admin notification` instead of `Admin alert`.

---

## 6. Suggested Prompts to Audit this Codebase

Use these templates when feeding the above context into Claude to audit the site:

### Prompt 1: Performance & UX Layout Shift Audit
> "Using the provided NKT Insurance context, analyze the styling and font stacking patterns inside `src/styles.css`. Evaluate the zero-layout-shift fallbacks, responsive grid settings, and viewport constraints. Identify potential layout shifts (CLS), accessibility concerns, and touch target violations, keeping in mind the 28-55 age demographic."

### Prompt 2: Routing, Security & Edge Configuration Audit
> "Analyze the Vercel proxy rewrite config rules and Vite asset-prefixing settings. Validate the edge proxy behavior between the main client site and the CRM portal under `/admin/login`. Identify any edge cases where static assets (images, icons) might fail to load, cookies might be misrouted, or client-side SPAs might trigger infinite loops during cross-origin reloads."

### Prompt 3: Backend, Database & Integration Review
> "Audit the Express backend's lead handling logic and the WhatsApp API notification trigger loop. Evaluate error handling within the async MongoDB save state and the third-party fetch calls. Suggest optimizations for connection pooling, request timeouts, and validation layers."
