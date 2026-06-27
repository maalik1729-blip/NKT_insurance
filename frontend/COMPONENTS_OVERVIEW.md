# Components Overview

**Status:** ✅ Complete  
**Directory:** `src/components/`  
**Date:** June 2026

---

## Component Inventory

```
src/components/
├── admin/                  Admin portal sub-components (extracted for layout isolation)
│   ├── types.ts            Types for leads, advisor toasts, and timeline history
│   ├── UnifiedLoginPortal.tsx Segmented login form & left visual column panel
│   ├── AdvisorWorkspace.tsx Advisor workspace with search, filter table, edit modals
│   └── AdminDashboard.tsx  CRM manager, handles audio play, browser cross-tab sync
│
├── dashboard/              Analytics visualization sub-components (extracted)
│   ├── DashboardData.ts    Market share, CSR, and claims metrics datasets
│   └── InsuranceDashboard.tsx Recharts visuals, KPI grid, tabbed filter layouts
│
├── CtaBanner.tsx           Shared call-to-action banner (used on all detail + services pages)
├── FaqAccordion.tsx        Shared FAQ accordion (used on all detail + services + about pages)
├── icons.tsx               Contact constants + custom SVG icons (WhatsApp, Phone, Mail)
├── LeadForm.tsx            Lead capture form → localStorage + WhatsApp redirect
├── SiteFooter.tsx          3-column global footer
├── SiteNav.tsx             Global navigation with logo, dropdown, portal/quote CTAs
├── Spinner.tsx             Reusable SVG loading spinner
└── WhatsAppFab.tsx         Fixed floating WhatsApp button
```

---

## CtaBanner

**File:** `src/components/CtaBanner.tsx`  
**Used on:** Life, Health, Motor, About, Contact, Claims, Services pages

### Props

```ts
interface CtaBannerProps {
  heading: string; // main headline
  sub: string; // supporting text below heading
}
```

### Design

- **Background:** `var(--color-accent)` (Deep Forest Green #14532D)
- **Layout:** Flexbox, `space-between`, wraps on mobile
- **Left side:** `<h2>` heading + `<p>` sub text (white text)
- **Right side:** Two buttons

### Buttons

| Button       | Style                  | Action              |
| ------------ | ---------------------- | ------------------- |
| Primary CTA  | White bg + accent text | Links to `/contact` |
| WhatsApp CTA | Semi-transparent white | Opens `wa.me` link  |

```tsx
// Primary CTA
<Link to="/contact">
  Get Free Consultation <ArrowRight size={14} />
</Link>

// WhatsApp
<a href={`https://wa.me/${WA_NUMBER}`}>
  <WhatsAppIcon size={16} /> WhatsApp Us
</a>
```

### Button sizing

- Height: 52px
- Font weight: 600
- Border radius: `var(--radius-md)`

### Customisation per page

Each page passes different `heading` + `sub` to match the page context:

| Page             | Heading                                      | Sub                                  |
| ---------------- | -------------------------------------------- | ------------------------------------ |
| Life Insurance   | Get a personalised life cover recommendation | Free, no-obligation...               |
| Health Insurance | Compare the best health plans...             | We shortlist from Star, HDFC Ergo... |
| Motor Insurance  | Renew or buy motor insurance in 15 minutes   | Get quotes for car or bike...        |
| About            | Ready to work with an advisor you can trust? | 30-minute free consultation...       |
| Services         | Not sure which plan is right for you?        | Book free 30-minute consultation...  |

---

## FaqAccordion

**File:** `src/components/FaqAccordion.tsx`  
**Used on:** Life, Health, Motor, About, Contact, Claims, Services pages

### Props

```ts
interface FaqAccordionProps {
  items: { q: string; a: string }[]; // array of question/answer pairs
  heading: string; // section heading
  subtext?: string; // optional description below heading
}
```

### Behaviour

- Single-expand: opening one item closes all others
- Tracks open index via `useState<number | null>(null)`
- `null` = all closed; `number` = that index is open

### Animation

Dynamic height using refs — no fixed `max-height` guessing:

```ts
const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
const [heights, setHeights] = useState<number[]>([]);

// Measure each item's content height
useEffect(() => {
  setHeights(itemRefs.current.map((ref) => ref?.scrollHeight ?? 0));
}, [items]);
```

```tsx
// Animated container
<div style={{
  maxHeight: open === i ? `${heights[i]}px` : "0px",
  overflow: "hidden",
  transition: "max-height 300ms cubic-bezier(0.16, 1, 0.3, 1)"
}}>
```

### Chevron rotation

```tsx
<ChevronDown
  style={{
    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 250ms",
  }}
/>
```

### Inline editorial styles

The component uses inline styles throughout (no CSS class dependencies) for full design control:

- Max-width: 900px (proper reading measure for Q&A)
- Border-top/bottom separators between items
- Spectral italic for question text
- Inter body for answer text
- Hover colour transition on question button

### Accessibility

- `<button type="button">` for each question trigger
- `aria-expanded` on trigger
- Answer div conditionally rendered with proper visibility
- `role="list"` could be added in future for screen reader enumeration

---

## icons.tsx

**File:** `src/components/icons.tsx`  
**Purpose:** Two responsibilities — contact constants and custom SVG icons

### Contact Constants

```ts
export const WA_NUMBER = "917845349914";
export const TEL = "+919585929914";
export const TEL_DISPLAY = "+91 95859 29914";
export const EMAIL = "contact@nktinsurance.com";
export const WA_DEFAULT = `https://wa.me/${WA_NUMBER}?text=Hi%20NKT%2C%20I%20need%20free%20insurance%20advice.`;
```

All nav, footer, FAB, and form redirect links import from here — never inline hardcoded numbers.

### Custom SVG Icons

#### `WhatsAppIcon`

```ts
interface Props {
  size?: number;
} // default: 16
```

Renders the official WhatsApp brand path as filled SVG. Used instead of lucide-react because lucide doesn't include branded icons.

#### `PhoneIcon`

```ts
interface Props {
  size?: number;
} // default: 15
```

Stroke-based phone receiver SVG. Used in footer contact row.

#### `MailIcon`

```ts
interface Props {
  size?: number;
} // default: 16
```

Stroke-based envelope SVG. Used in footer contact row and admin portal.

All three use `aria-hidden="true"` — they're always accompanied by visible text or `aria-label`.

---

## LeadForm

→ See `LEAD_FORM_COMPONENT.md` for full documentation.

**Quick summary:**

- Props: `{ heading?: string }`
- Validates name + phone client-side
- Saves lead to `localStorage` (`nkt_leads` array)
- Redirects to pre-filled WhatsApp URL
- Fully accessible (aria-invalid, aria-describedby, aria-live)

---

## SiteNav

→ See `NAVIGATION_FOOTER.md` for full documentation.

**Quick summary:**

- Logo image + wordmark
- Insurance Plans dropdown (hover + click, 3 items)
- Desktop actions: phone number, Portal, Get a Quote
- Mobile hamburger → slide-down menu with grouped links + full-width CTAs
- Auto-closes on route change
- `.nav--scrolled` class added after 10px scroll

---

## SiteFooter

→ See `NAVIGATION_FOOTER.md` for full documentation.

**Quick summary:**

- 3-column grid: Brand+Contact | Plans nav | Company nav
- Dynamic year, IRDAI notice
- `role="contentinfo"`, `id="contact"` anchor

---

## Spinner

**File:** `src/components/Spinner.tsx`

### Props

```ts
interface SpinnerProps {
  size?: number; // default: 16
  color?: string; // default: "currentColor"
}
```

### Implementation

SVG-based rotating spinner — scales cleanly at any size, inherits parent colour:

```tsx
<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  stroke={color}
  strokeWidth="3"
  style={{ animation: "spin 0.8s linear infinite" }}
  aria-hidden="true"
>
  {/* Ghost circle — full ring at 25% opacity */}
  <circle cx="12" cy="12" r="10" opacity="0.25" />
  {/* Active arc — quarter circle that spins */}
  <path d="M12 2a10 10 0 0 1 10 10" />
  <style>{`
    @keyframes spin { to { transform: rotate(360deg); } }
  `}</style>
</svg>
```

**Design choices:**

- `strokeLinecap="round"` on the arc for a polished tail
- Ghost circle at `opacity: 0.25` gives the "track" behind the active arc
- Inline `<style>` tag ensures keyframe works regardless of CSS isolation
- `aria-hidden="true"` — spinner is decorative; loading state communicated via button text or aria-live

**Used in:**

- `src/components/admin/UnifiedLoginPortal.tsx` — Login buttons (client + advisor) during async auth
- `src/components/admin/AdvisorWorkspace.tsx` — Inline spinners during actions
- `src/routes/index.tsx` — LeadForm submit button during 300ms WhatsApp redirect delay
- `src/components/SiteNav.tsx` — Portal login spinner (legacy, may have been refactored)

### Usage pattern

```tsx
import { Spinner } from "../components/Spinner";

<button disabled={loading}>
  {loading && <Spinner size={14} color="currentColor" />}
  {loading ? "Submitting..." : "Submit"}
</button>;
```

The button should also set `disabled={loading}` and reduce `opacity` via CSS to signal the non-interactive state.

---

## WhatsAppFab

**File:** `src/components/WhatsAppFab.tsx`

```tsx
export function WhatsAppFab() {
  return (
    <a href={WA_DEFAULT} class="fab" aria-label="Chat on WhatsApp" title="WhatsApp us now">
      <WhatsAppIcon size={26} />
    </a>
  );
}
```

- Fixed position bottom-right (`.fab` class in `styles.css`)
- Pre-filled message: "Hi NKT, I need free insurance advice."
- `aria-label` for screen readers; `title` for sighted hover tooltip
- No props — single fixed behaviour across all pages

---

## Admin Portal CRM Components

These modular components reside in `src/components/admin/` and manage the entire Lead CRM experience.

### AdminDashboard

**File:** `src/components/admin/AdminDashboard.tsx`  
**Purpose:** Acts as the parent container and orchestrator.

- Evaluates the route's URL query search params for pre-selected views.
- Initiates GoogleOAuth provider wrapper and checks localStorage login session.
- Runs cross-tab state syncing via the `"storage"` listener.
- Renders the split-screen `UnifiedLoginPortal` or gates to `AdvisorWorkspace`/`ClientDashboard` depending on session state.
- Houses the Web Audio API audio synthesizer to trigger chime sounds on new lead registrations.

### UnifiedLoginPortal

**File:** `src/components/admin/UnifiedLoginPortal.tsx`  
**Purpose:** Displays the split-screen login.

- Segmented tab control handles Client vs Advisor toggle.
- Captures advisor password authentication (fallback) or handles Google login credentials decoder.
- Emits simulated async delays with local spinner feedback.

### AdvisorWorkspace

**File:** `src/components/admin/AdvisorWorkspace.tsx`  
**Purpose:** Houses the main CRM manager panel.

- Shows total lead metric count grids (Total, New, Active contacted, Est. Premium).
- Integrates Recharts graphs showing lead categories and status distributions.
- Implements edit/add dialog modals, CSV file exporting, search filters, and status updating.

---

## Analytics Dashboard Components

Located in `src/components/dashboard/`.

### InsuranceDashboard

**File:** `src/components/dashboard/InsuranceDashboard.tsx`  
**Purpose:** Displays claims ratios, market shares, and solvency margins.

- Features tabs to toggle between Life, Health, and Motor sectors.
- Renders dual line/bar charts, tooltips, and dynamic breakdown details.

### DashboardData

**File:** `src/components/dashboard/DashboardData.ts`  
**Purpose:** Pure data definition file.

- Exports metrics arrays and colour styling hex tokens.
- Ensures route page and chart views are separated from hardcoded visualization models.

---

## Shared Patterns

### Icon usage rule (from CLAUDE.md)

- **`lucide-react` only** for all UI icons
- Custom SVGs (`WhatsAppIcon`, `PhoneIcon`, `MailIcon`) only for branded/missing icons
- All decorative icons: `aria-hidden="true"`
- Never emoji as icons

### Component styling approach

| Component      | Styling method                  |
| -------------- | ------------------------------- |
| `CtaBanner`    | Inline styles                   |
| `FaqAccordion` | Inline styles                   |
| `LeadForm`     | CSS classes                     |
| `SiteNav`      | CSS classes + some inline       |
| `SiteFooter`   | CSS classes                     |
| `Spinner`      | Inline style + scoped `<style>` |
| `WhatsAppFab`  | CSS class (`.fab`)              |
| `icons.tsx`    | N/A (SVG only)                  |

The inline vs class split reflects the editorial redesign phases — components redesigned in Phase 3+ use inline styles; older components retain CSS classes.

---

## Adding a New Component

1. Create `src/components/MyComponent.tsx`
2. Export a named function (not default export) — consistent with existing pattern
3. Use `lucide-react` for icons, design tokens (`var(--color-*)`) for colours
4. Add `aria-hidden="true"` to decorative icons
5. Import contact constants from `icons.tsx` if needed (never hardcode phone/WA numbers)
6. Document usage in this file
