# NKT Insurance Solutions — Design Constitution

> This file is the locked design system for this project.
> All AI-assisted edits must read and respect this file before touching any design, layout, or CSS.
> Source of truth for brand voice, palette, typography, component patterns, and hard bans.
>
> This version documents the **Editorial Design System** that is actually implemented in
> `src/styles.css` and across all routes/components — Deep Forest Green + Spectral/Inter.
> It replaces an earlier draft constitution (Literata/DM Sans + coral) that was never built.

---

## Product Context

**What:** A lead-generation landing page for NKT Insurance Solutions — an independent Indian insurance advisor specialising in Life (LIC), Health, and Motor insurance.

**Who:** Indian families (age 28–55), semi-urban and urban, making their first or second insurance decision. Also small business owners renewing motor policies. Trust-sensitive, phone-call-first audience.

**The one job:** Get the visitor to fill the form or tap WhatsApp. Every section should move toward that goal.

**Brand voice:** Warm, honest, local, human. NOT: corporate, SaaS, tech-forward, generic fintech. Think "trusted neighbourhood advisor you've known for 10 years," not "disruptive insurtech platform."

**Design direction:** Editorial & trustworthy, breaking from typical insurance-template norms — Deep Forest Green instead of the usual insurance blue, serif display type for authority, warm terracotta as a secondary accent for Indian cultural resonance.

---

## Typography

### Fonts

- **Display (headings):** `Spectral` — editorial serif, gives authority and warmth without being a generic Playfair clone
- **Body (all prose, labels, UI):** `Inter` — clean, highly legible, neutral workhorse for dense form/content pages

### Zero-layout-shift fallbacks

Local fallback fonts are declared via `@font-face` with `size-adjust` / `ascent-override` / `descent-override` so swapped text doesn't reflow:

```css
@font-face {
  font-family: "Spectral-Fallback";
  src: local("Georgia");
  size-adjust: 102%;
  ascent-override: 92%;
  descent-override: 25%;
  line-gap-override: 0%;
}
@font-face {
  font-family: "Inter-Fallback";
  src: local("Arial");
  size-adjust: 107%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
```

```css
--font-display-stack: "Spectral", "Spectral-Fallback", "Merriweather", Georgia, serif;
--font-body-stack:
  "Inter", "Inter-Fallback", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

### Rules

- Display font (`var(--font-display)`) used on: all `h1`–`h6`, hero headline, section headings, testimonial pull-quote
- Body font (`var(--font-body)`) used for: nav links, buttons, labels, body copy, form fields, footer
- Headings: `font-weight: 600`, `line-height: 1.2`, `letter-spacing: -0.02em`, `text-wrap: balance`
- Paragraphs: `text-wrap: pretty` to avoid orphans
- All-caps text gets `letter-spacing: 0.08em`
- Tabular numbers (`font-variant-numeric: tabular-nums`) for data tables
- Body line-height: `1.7`; OpenType features enabled (`kern`, `liga`, `clig`, optical sizing)
- **Hard ban:** `Playfair Display`, `Roboto`, `Open Sans`, `Outfit`, `Plus Jakarta Sans`, `Literata`, `DM Sans` — not part of this system

---

## Colour Palette

All values are CSS custom properties defined in `:root` (`src/styles.css`). Never use inline hex values in component code that duplicate a token — reference the variable.

```css
/* Editorial canvas — deeper green-grey, more perceptible than near-white (not pure #FFFFFF) */
--color-bg: #f1f5f1;
--color-surface: #f3f8f4;
--color-surface-2: #eaf2ec;

/* Rich ink hierarchy — editorial depth */
--color-ink: #0a0a0a;
--color-ink-2: #525252;
--color-ink-3: #737373;

/* Deep Forest Green — distinctive, trustworthy, not typical insurance blue */
--color-accent: #14532d;
--color-accent-h: #052e16; /* hover */
--color-accent-bg: #f0fdf4; /* light tint */
--color-accent-line: #bbf7d0;

/* Warm Terracotta — secondary accent, Indian cultural resonance */
--color-secondary: #b45309;
--color-secondary-h: #92400e;
--color-secondary-bg: #fff7ed;
--color-secondary-line: #fed7aa;

/* Dark sections — deep forest with authority */
--color-dark: #14532d;
--color-dark-surf: #166534;
--color-dark-ink: #f0fdf4;
--color-dark-ink-2: #bbf7d0;
--color-dark-border: #15803d;

/* WhatsApp — harmonised with green palette */
--color-wa: #16a34a;
--color-wa-h: #15803d;

/* Section tints — subtle green-tinted variations */
--color-tint-why: #f7fef9;
--color-tint-lead: #f0fdf4;
--color-tint-footer: #fafafa;

/* Utility */
--color-border: #e5e5e5;
--color-focus: #14532d;
--color-error: #dc2626;
--color-success: #16a34a;
--color-white: #ffffff;
```

### Colour rules

- Background canvas is `#F1F5F1` — a deeper green-grey, clearly distinct from white without warming the palette. Note it sits close to `--color-surface` (`#F3F8F4`); tinted sections should lean on `--color-surface-2` (`#EAF2EC`) or borders for separation from the base canvas.
- **Hard ban:** Purple-to-blue or purple-to-pink gradients anywhere
- **Hard ban:** Gradient text (`background-clip: text`)
- Accent (Forest Green) footprint should stay deliberate — primary CTAs, links, focus rings, dark sections
- Secondary (Terracotta) is used sparingly for warmth (badges, highlights) — never replaces the primary accent
- Dark sections use `--color-dark` (forest green), not cold navy

---

## Spacing Scale

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

**Rule:** Never use arbitrary pixel values outside this scale. If a new value is needed, add it as a named token.

### Radius & layout tokens

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-xl: 24px;

--max-w: 1140px; /* container max-width */
--prose-w: 62ch; /* body line-length cap */
```

---

## Layout Rules

- **Hero:** Left-biased 2-column layout (`grid-template-columns: 1fr 400px` on desktop, stacks to `1fr` on mobile). Text left, visual right. Never full-viewport centred stack.
- **Grids:** Use `repeat(auto-fit, minmax(Npx, 1fr))` for responsive card/feature grids. Avoid `repeat(3, 1fr)` for content cards (fine for fixed stat rows where 3 is the actual data shape).
- **Cards:** Only when content genuinely needs containment. Never card-in-card.
- **Footer:** 3-column grid (`1.4fr 1fr 1fr`: brand+contact / plans / company), collapsing to 2 then 1 column on smaller screens — not a 4-column AI footer.
- Section padding uses fluid `clamp()` values built from the spacing scale.

---

## Navigation Rules

- Primary nav: Insurance Plans (dropdown), Claims, About, Contact — 4 top-level links max
- Phone number visible in nav (`.nav__phone`) — trust signal for insurance
- Single CTA (WhatsApp) — not two competing buttons
- Light background — humanises the brand
- Logo: image/SVG mark + typographic wordmark, no emoji

---

## Eyebrow / Section Label Rules

- **Default: OFF.** Sections do not get eyebrow labels.
- Maximum 1 eyebrow per page (hero badge only, if it carries trust data)
- Headings carry hierarchy on their own
- **Hard ban:** Eyebrow on every section

---

## Icon Rules

- **Hard ban:** Emoji as feature icons (🛡️ ❤️ 🚗 🎯 ⚡ 💰 👥 🔄 etc.)
- Use `lucide-react` exclusively for all icons
- One icon library only — never mix
- Decorative icons: `aria-hidden="true"`

---

## Motion Rules

- Easing tokens: `--ease-out`, `--ease-out-quart`, `--ease-out-expo` — all `cubic-bezier(...)` ease-out curves, no bounce/elastic
- Every `@keyframes` block must have a corresponding `@media (prefers-reduced-motion: reduce)` fallback (see `styles.css` lines ~263–272 for the pattern)
- Decorative/ambient animation (pulse, float) wrapped in `@media (prefers-reduced-motion: no-preference)`
- Prefer animating `transform`/`opacity`; avoid animating `width`, `height`, `top`, `left`, `margin`, `padding`
- `transition: all` exists in a couple of legacy spots — new code should specify explicit properties

---

## Interactive State Rules

All interactive elements must define: default · hover · `:focus-visible` · `:active` · `:disabled`

- Mouse/touch focus is suppressed (`:focus { outline: none }`); keyboard focus uses `:focus-visible`
- Buttons/links/nav: `outline: 2px solid var(--color-accent); outline-offset: 2px; border-radius: 4px;`
- Inputs/textarea/select: glow ring via `box-shadow: 0 0 0 3px var(--color-accent-bg), 0 0 0 4px var(--color-accent);`
- Disabled: `opacity: 0.55; cursor: not-allowed; pointer-events: none`
- Submit buttons should expose a `data-loading="true"` disabled state

---

## Hard Bans (Never Do These)

1. ❌ Emoji as feature/nav/section icons
2. ❌ Full-viewport centred hero (everything on one axis)
3. ❌ Eyebrow label on every section
4. ❌ 4-column AI footer (Product/Company/Resources/Legal)
5. ❌ Logo-left + links-centre + two-CTA-right AI nav
6. ❌ `Playfair Display`, `Literata`, `DM Sans`, `Roboto`, `Outfit`, `Plus Jakarta Sans` as font choices
7. ❌ Purple-to-blue or purple-to-pink gradients anywhere
8. ❌ Gradient text (`background-clip: text`)
9. ❌ Cold navy dark backgrounds — dark sections must use the forest-green `--color-dark`
10. ❌ Arbitrary pixel values outside the `--space-*` scale
11. ❌ Inline hex values that duplicate an existing token — use the CSS variable

---

## Contact Config

Live values (`src/components/icons.tsx`):

```ts
export const WA_NUMBER = "917845349914"; // WhatsApp
export const TEL = "+919585929914"; // Phone (tel: link)
export const TEL_DISPLAY = "+91 95859 29914"; // Phone (display)
export const EMAIL = "contact@nktinsurance.com";
```

**Registered office address** (used in `routes/contact.tsx` office-location block and the
`LocalBusiness` JSON-LD in `routes/__root.tsx`):

```
25/293 A M G Street
Newtown, Vaniyambadi
Tirupathur District
Tamil Nadu – 635752
```

---

## Accessibility Baseline (Non-Negotiable)

- `overflow-x: clip` on both `html` and `body`
- Skip link at top of page
- `aria-labelledby` on all major sections
- All form inputs: `id`, `name`, `aria-required`, `aria-invalid` on error
- `min-height: 1lh` on helper/error text slots
- Decorative SVGs/icons: `aria-hidden="true"`
- Interactive elements: min 44×44px touch target
- Body text contrast: ≥ 4.5:1
- Custom `:focus-visible` styling on every interactive element (see Interactive State Rules)

---

_This file documents the design system as actually implemented and audited (Impeccable audit,
17/20, June 13 2026 — see `IMPECCABLE_AUDIT_REPORT.md`). Update this file whenever the brand,
palette, or component system evolves — and update the codebase to match, not the other way
around._

---

## Codebase Architecture & Asset Guidelines

To keep the repository clean, type-safe, and light-weight, developers must adhere to the following directory conventions and asset optimization practices:

### 1. Routing Directory Isolation (`src/routes/`)

- **Single Responsibility:** Files in `src/routes/` must contain _only_ TanStack route definitions, search validation, canonical tags, and basic page shells.
- **Complexity Delegation:** All layout blocks, custom state machines, dashboards, and charts must be moved to dedicated modules under `src/components/`.
- **JSON Data Isolation:** Unused data sheets and non-routing `.json` files must live in `src/data/` (not inside the routing directory).

### 2. Component Organization (`src/components/`)

- **Admin CRM:** All workspace CRM sub-components (type definitions, login forms, leads grids, analytics charts, and context orchestrators) reside in `src/components/admin/`.
- **Analytics Dashboard:** Recharts graphics and analytical visualization grids reside in `src/components/dashboard/`.

### 3. Image Optimization Constraints (`src/assets/images/`)

- **Size Limits:** Never commit raw uncompressed PNG images (files > 1MB are prohibited).
- **Compression:** Compress images (using lossy PNG quantization or WebP conversion) before checking them in.
- **Aspect & Dimensions:** Resize images to their maximum expected responsive rendering sizes (e.g., 400px for customer avatars, 1280px for section cover backgrounds).
- **Tooling:** Run `node scripts/optimize-images.mjs` to auto-generate WebP formats.

### 4. Historical Archives

- Move all milestone progress logs, phase completion reports, and audit details out of the root directory and store them under `docs/changelogs_archive/` to keep the root tidy.

---

## Developer Commands & Workspace Workflows

### Common Commands

- **Start Development Server:** `npm run dev` (Runs locally on `http://localhost:8080`)
- **Build Production Bundle:** `npm run build` (Compiles TanStack Start SSR assets and Nitro server output)
- **Preview Production Build:** `npx vite preview` or `npm run preview`
- **Linting & Code Quality:** `npm run lint`

### Port Management (Windows PowerShell)

If port `8080` is locked by a lingering Node/Vite process, use the following commands to identify and terminate it:

```powershell
# Check for listener on port 8080
$conn = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue

# Force kill the process holding port 8080
if ($conn) { Stop-Process -Id $conn.OwningProcess -Force }
```

### Key Workspace Functions & Integrations

#### 1. Real-time Lead Sync & Web Alerts

Implemented in [AdminDashboard.tsx](file:///d:/nktinsurance-main/src/components/admin/AdminDashboard.tsx):

- **Cross-tab Sync:** Listens to `storage` events on the `"nkt_leads"` localStorage key, updating the Advisor leads grid instantly without page reloads.
- **Audio Chime:** Plays a browser-synthesized chime using Web Audio API on new lead arrival.
- **Visual Toasts:** Floating toast alerts slide in from the right when new leads are registered.
- **Sync Status:** Pulsing green status dot showing `"Live Sync"` actively running.

#### 2. WhatsApp Business API Notification

Implemented in [whatsapp.ts](file:///d:/nktinsurance-main/src/lib/whatsapp.ts):

- **Access Tokens:** Configured through `VITE_WA_ACCESS_TOKEN` and `VITE_WA_PHONE_NUMBER_ID` in `.env`.
- **Admin Alerts:** Sends instant WhatsApp details notification to `919585929914` (admin).
- **Session Rules:** Receivers must send a greeting message like "Hi" to the Sandbox Sender number (`+1 (555) 670-8889`) to open a 24-hour message session window.
