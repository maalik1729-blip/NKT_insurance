# Codebase Structure & Tech Stack

**Status:** ✅ Reference document  
**Date:** June 2026

---

## Tech Stack

| Layer         | Technology                           | Version              |
| ------------- | ------------------------------------ | -------------------- |
| Framework     | TanStack Start (SSR React)           | `^1.167.50`          |
| Routing       | TanStack Router (file-based)         | `^1.168.25`          |
| UI            | React                                | `^19.2.0`            |
| Language      | TypeScript                           | `^5.8.3`             |
| Build tool    | Vite                                 | `^8.0.16`            |
| Styling       | Custom CSS (`src/styles.css`)        | —                    |
| Icons         | lucide-react                         | `^0.575.0`           |
| Data fetching | TanStack Query                       | `^5.83.0`            |
| Charts        | Recharts                             | `^2.15.4`            |
| Auth          | `@react-oauth/google` + `jwt-decode` | `^0.13.5` / `^4.0.0` |
| Deployment    | Vercel (via `.vercel/output`)        | —                    |
| Testing       | Vitest + Testing Library             | `^4.1.8`             |
| Linting       | ESLint + Prettier                    | —                    |

### Installed but not actively used in current UI

`@radix-ui/*` (full component library), `react-hook-form`, `zod`, `tailwindcss`, `clsx`, `sonner`, `cmdk`, `vaul`, `date-fns`, `embla-carousel-react` — these were added as scaffolding but the current site uses the custom CSS design system instead of Tailwind/Radix patterns.

---

## Directory Structure

```
nktinsurance-main/
├── src/
│   ├── assets/
│   │   └── images/                  ← All image assets (PNG + WebP)
│   │       ├── customer_*.png/.webp ← 7 customer photos (homepage grid)
│   │       ├── *_insurance_section* ← Section images for Life/Health/Motor hero
│   │       ├── login_branding_cover.png ← Admin portal left-column background
│   │       ├── logo.png             ← NKT brand logo (used in nav + footer)
│   │       └── favicon.png
│   │
│   ├── components/                  ← Shared/reusable components
│   │   ├── admin/                   ← Admin portal CRM sub-components
│   │   │   ├── types.ts             ← CRM type definitions
│   │   │   ├── UnifiedLoginPortal.tsx ← Visual & submission form components
│   │   │   ├── AdvisorWorkspace.tsx ← CRM leads grid tables, filters & modals
│   │   │   └── AdminDashboard.tsx   ← Orchestrator, localStorage sync & sound alerts
│   │   ├── dashboard/               ← Insurance analytics dashboard sub-components
│   │   │   ├── DashboardData.ts     ← Graph data constants
│   │   │   └── InsuranceDashboard.tsx ← Recharts analytics component
│   │   ├── CtaBanner.tsx
│   │   ├── FaqAccordion.tsx
│   │   ├── icons.tsx                ← Contact constants + WhatsApp/Phone/Mail SVGs
│   │   ├── LeadForm.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteNav.tsx
│   │   ├── Spinner.tsx
│   │   └── WhatsAppFab.tsx
│   │
│   ├── data/                        ← Static JSON datasets (non-routing)
│   │   ├── health_data.json
│   │   └── motor_data.json
│   │
│   ├── hooks/
│   │   └── useScrollReveal.ts       ← IntersectionObserver scroll animation hook
│   │
│   ├── lib/
│   │   ├── error-capture.ts         ← Error capture utility
│   │   ├── error-page.ts            ← HTML error page renderer
│   │   └── lovable-error-reporting.ts ← Error reporting integration
│   │
│   ├── routes/                      ← File-based routes (each file = one URL)
│   │   ├── __root.tsx               ← App shell: fonts, SEO defaults, nav, footer, FAB
│   │   ├── index.tsx                ← Homepage (/)
│   │   ├── about.tsx                ← About page (/about)
│   │   ├── admin.tsx                ← Redirect route to /admin/login (/admin)
│   │   ├── admin.login.tsx          ← Dual CRM portal login and dashboard (/admin/login)
│   │   ├── claims.tsx               ← Claims guide (/claims)
│   │   ├── contact.tsx              ← Contact page (/contact)
│   │   ├── health-insurance.tsx     ← Health insurance detail (/health-insurance)
│   │   ├── insurance-dashboard.tsx  ← Analytics dashboard (/insurance-dashboard)
│   │   ├── life-insurance.tsx       ← Life insurance detail (/life-insurance)
│   │   ├── motor-insurance.tsx      ← Motor insurance detail (/motor-insurance)
│   │   ├── services.tsx             ← Services overview (/services)
│   │   └── README.md                ← Route conventions reference
│   │
│   ├── router.tsx                   ← Router factory (TanStack Router + QueryClient)
│   ├── routeTree.gen.ts             ← Auto-generated route tree (DO NOT EDIT)
│   ├── server.ts                    ← Edge/server entry point
│   ├── start.ts                     ← TanStack Start instance + error middleware
│   └── styles.css                   ← Global design system (all CSS custom properties, component classes)
│
├── .env                             ← Environment variables (not committed)
├── .gitignore
├── .prettierrc / .prettierignore
├── package.json
├── tsconfig.json                    ← TypeScript config
├── vite.config.ts                   ← Vite + TanStack Router plugin config
├── CLAUDE.md                        ← Design constitution (source of truth)
├── PRODUCT.md                       ← Brand, users, product purpose
└── *.md                             ← Phase/change documentation files
```

---

## Routing

TanStack Router uses **file-based routing**. Every `.tsx` in `src/routes/` becomes a URL:

| File                      | URL                                               |
| ------------------------- | ------------------------------------------------- |
| `index.tsx`               | `/`                                               |
| `about.tsx`               | `/about`                                          |
| `admin.tsx`               | `/admin` (Redirect helper to `/admin/login`)      |
| `admin.login.tsx`         | `/admin/login` (Dual CRM workspace login + panel) |
| `claims.tsx`              | `/claims`                                         |
| `contact.tsx`             | `/contact`                                        |
| `health-insurance.tsx`    | `/health-insurance`                               |
| `insurance-dashboard.tsx` | `/insurance-dashboard` (Analytics dashboard)      |
| `life-insurance.tsx`      | `/life-insurance`                                 |
| `motor-insurance.tsx`     | `/motor-insurance`                                |
| `services.tsx`            | `/services`                                       |
| `__root.tsx`              | App shell (wraps all routes via `<Outlet />`)     |

**Rules:**

- `routeTree.gen.ts` is **auto-generated** by the TanStack Router Vite plugin — never edit by hand
- Dynamic routes use `$param` syntax (bare `$`, not `{param}`)
- Layout routes use `_layout.tsx`
- `__root.tsx` is the only root layout

### Route definition pattern

```ts
export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Page Title | NKT Insurance Solutions" },
      { name: "description", content: "..." },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});
```

---

## Root Layout (`__root.tsx`)

Everything rendered on every page lives here:

```tsx
<html lang="en">
  <head>
    <!-- Google Fonts: Spectral + Inter -->
    <!-- Preload font stylesheet -->
    <!-- Favicon -->
    <!-- Open Graph defaults -->
    <!-- JSON-LD LocalBusiness structured data -->
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <SiteNav />
    <main id="main-content">
      <Outlet />   ← each route renders here
    </main>
    <SiteFooter />
    <WhatsAppFab />
  </body>
</html>
```

### JSON-LD Structured Data

`LocalBusiness` schema is embedded in `__root.tsx` for SEO:

```json
{
  "@type": "LocalBusiness",
  "name": "NKT Insurance Solutions",
  "address": {
    "streetAddress": "25/293 A M G Street",
    "addressLocality": "Vaniyambadi",
    "addressRegion": "Tamil Nadu",
    "postalCode": "635752"
  },
  "telephone": "+919585929914",
  "url": "https://nktinsurance.com"
}
```

---

## Styling Architecture

A single `src/styles.css` file contains the entire design system:

### CSS Custom Properties (`:root`)

```css
/* Typography */
--font-display:
  "Spectral", fallback, serif --font-body: "Inter", fallback,
  sans-serif /* Colour tokens */ --color-bg, --color-surface, --color-surface-2 --color-ink,
  --color-ink-2, --color-ink-3 --color-accent, --color-accent-h, --color-accent-bg,
  --color-accent-line --color-secondary, --color-secondary-h, --color-secondary-bg,
  ... --color-dark, --color-dark-surf, --color-dark-ink, ... --color-wa,
  --color-wa-h --color-border, --color-focus, --color-error,
  --color-success /* Spacing scale */ --space-1 (4px) through --space-10 (128px) /* Border radius */
    --radius-sm (4px),
  --radius-md (8px), --radius-lg (16px),
  --radius-xl (24px) /* Layout */ --max-w: 1140px ← container max-width --prose-w: 62ch ← body
    line-length cap /* Easing */ --ease-out,
  --ease-out-quart, --ease-out-expo;
```

### Two Styling Patterns in the Codebase

**CSS Classes** (older pages / components):

- `SiteNav`, `SiteFooter`, `LeadForm`, `WhatsAppFab`, `services.tsx`
- Classes defined in `styles.css`: `.nav`, `.footer`, `.fab`, `.form-card`, `.plan-card`, `.info-grid`, etc.

**Inline Styles** (editorially redesigned pages):

- All route pages (Life, Health, Motor, About, Contact, Claims, Homepage, Admin)
- `CtaBanner`, `FaqAccordion` components
- Direct use of CSS custom properties as values: `color: "var(--color-accent)"`

---

## Image Assets

All in `src/assets/images/`. Two formats available for most images:

| Image group     | Files                                        | Usage                    |
| --------------- | -------------------------------------------- | ------------------------ |
| Customer photos | `customer_*.png` + `.webp` (7 pairs)         | Homepage photo grid      |
| Section images  | `*_insurance_section.png/.webp` + `@2x.webp` | Product page heroes      |
| Login cover     | `login_branding_cover.png`                   | Admin portal left column |
| Logo            | `logo.png`                                   | Nav + footer brand mark  |
| Favicon         | `favicon.png`                                | Browser tab icon         |

**WebP availability:** Most images have both PNG and WebP. The `@2x.webp` variants are high-DPI versions for retina displays on the product pages.

**Current usage note:** Most `<img>` tags reference the PNG version directly. The WebP variants are present but not yet wired up with `<picture>` / `srcset` — image optimization (P1 item from `IMPECCABLE_AUDIT_REPORT.md`) is a pending improvement.

---

## Hooks

### `useScrollReveal` (`src/hooks/useScrollReveal.ts`)

Activates CSS-based entrance animations using `IntersectionObserver`.

```ts
export function useScrollReveal() {
  useEffect(() => {
    // Deferred via requestAnimationFrame to avoid SSR hydration mismatch
    rafId = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal--visible");
            }
          });
        },
        { threshold: 0.04, rootMargin: "0px 0px -20px 0px" }
      );

      // Observed selectors
      document.querySelectorAll(
        "section, .service-block, .process__step, .testimonial-primary,
         .testimonial-secondary, .plan-card, .about__stat, .calc-container,
         .form-card, .why__item, .claim-step, .trust-bar__inner span"
      ).forEach(el => observer.observe(el));
    });
  }, []);
}
```

**Key detail:** `requestAnimationFrame` defers observation until after React hydration is complete, preventing SSR/client mismatch warnings. Used on `services.tsx` and the homepage.

---

## Build & Dev Commands

```bash
npm run dev           # Start dev server (Vite, hot reload)
npm run build         # Production build → .vercel/output/
npm run build:dev     # Development mode build
npm run preview       # Preview production build locally
npm run lint          # ESLint check
npm run format        # Prettier format
npm run test          # Vitest single run
npm run test:watch    # Vitest watch mode
npm run test:coverage # Coverage report
```

**Dev server:** Runs at `http://localhost:8080/` (TanStack Start default port)

---

## Deployment

Deployed to **Vercel** via the `.vercel/output/` directory:

```
.vercel/output/
├── config.json
├── nitro.json
├── static/          ← compiled JS bundles, assets
└── functions/
    └── __server.func/  ← SSR edge function
        ├── index.mjs
        ├── _chunks/
        ├── _libs/       ← vendored dependencies
        └── _ssr/        ← SSR page chunks (one per route)
```

The build uses Nitro as the server adapter (`@tanstack/react-start` → Nitro → Vercel Edge).

---

## Environment Variables

Defined in `.env` (not committed). Currently used for:

- Google OAuth Client ID (`VITE_GOOGLE_CLIENT_ID` or similar — check `AdminDashboard.tsx`)

---

## TypeScript Config

```
tsconfig.json
├── paths: @/* → ./src/* (absolute imports)
├── strict: true
└── target: ES2020
```

Import alias:

```ts
import { Spinner } from "@/components/Spinner"; // works
import { Spinner } from "../components/Spinner"; // also works
```

---

## Error Handling

`src/lib/` provides SSR error handling utilities:

| File                         | Purpose                                        |
| ---------------------------- | ---------------------------------------------- |
| `error-capture.ts`           | Captures SSR errors before h3 swallows them    |
| `error-page.ts`              | Renders a plain HTML 500 error page            |
| `lovable-error-reporting.ts` | Error reporting integration (Lovable platform) |

`src/server.ts` wraps all requests to intercept h3's silent JSON error responses and replace them with a proper HTML error page.

---

## Key Files to Know

| File                       | Why it matters                                       |
| -------------------------- | ---------------------------------------------------- |
| `CLAUDE.md`                | Design constitution — read before ANY design changes |
| `PRODUCT.md`               | Brand, users, product goals                          |
| `src/styles.css`           | All CSS tokens + component classes                   |
| `src/routes/__root.tsx`    | Font loading, JSON-LD, app shell                     |
| `src/components/icons.tsx` | Contact constants — phone, WA, email                 |
| `src/routeTree.gen.ts`     | Auto-generated — never edit manually                 |
| `.env`                     | Environment secrets                                  |
