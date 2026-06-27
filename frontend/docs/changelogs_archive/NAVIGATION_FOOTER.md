# Navigation & Footer — SiteNav, SiteFooter, WhatsApp FAB

**Status:** ✅ Complete  
**Files:** `src/components/SiteNav.tsx`, `src/components/SiteFooter.tsx`, `src/components/WhatsAppFab.tsx`  
**Date:** June 2026

---

## Overview

The global navigation, footer, and floating WhatsApp button are rendered on every page via `src/routes/__root.tsx`. They form the persistent shell of the site and have been redesigned to match the editorial design system.

---

## SiteNav

### Structure

```
<header role="banner">
  <nav class="nav nav--scrolled?">
    <div class="container">
      <div class="nav__inner">
        Brand (logo + wordmark)
        Desktop links (Insurance Plans dropdown, Claims, About, Contact)
        Actions (phone number, Portal button, Get a Quote button)
        Mobile hamburger
      </div>
      Mobile menu (conditional)
    </div>
  </nav>
</header>
```

### Brand / Logo

- **Logo image:** `src/assets/images/logo.png` — 36×36px, `object-fit: contain`, `border-radius: var(--radius-md)`
- **Wordmark:** Two-line stacked text
  - Line 1: "NKT Insurance" — nav brand name style
  - Line 2: "LIC · Health · Motor" — nav tagline style
- Entire brand block is a `<Link to="/">` with aria-label

### Scroll Behaviour

```ts
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const handleScroll = () => setScrolled(window.scrollY > 10);
  window.addEventListener("scroll", handleScroll, { passive: true });
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```

- Adds `.nav--scrolled` class when page is scrolled more than 10px
- CSS applies background/shadow on `.nav--scrolled` for sticky effect

### Auto-close on Route Change

```ts
useEffect(() => {
  setMenuOpen(false);
  setDropdownOpen(false);
}, [router.state.location.pathname]);
```

Both mobile menu and dropdown close automatically when the user navigates to a new page.

---

### Insurance Plans Dropdown

**Trigger:** Desktop nav item with hover + click support

```tsx
<div onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
  <button aria-expanded={dropdownOpen}>
    Insurance Plans <ChevronDown /> // rotates 180° when open
  </button>
  <div class="nav__dropdown-menu nav__dropdown-menu--open?">// 3 dropdown items</div>
</div>
```

**Dropdown items (3):**

| Icon          | Title                | Description                         | Link                |
| ------------- | -------------------- | ----------------------------------- | ------------------- |
| `ShieldCheck` | Life Insurance (LIC) | Term cover, savings & retirement.   | `/life-insurance`   |
| `Heart`       | Health Insurance     | Cashless treatment & medical cover. | `/health-insurance` |
| `Car`         | Motor Insurance      | Quick policies for your car & bike. | `/motor-insurance`  |

Each item has:

- `.nav__dropdown-icon` — icon in accent-coloured square
- `.nav__dropdown-title` — bold title
- `.nav__dropdown-desc` — muted description line
- Closes dropdown on click via `onClick={() => setDropdownOpen(false)}`

**Chevron rotation:**

```tsx
<ChevronDown
  style={{
    transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 200ms",
  }}
/>
```

---

### Desktop Action Bar (right side)

Three elements right-aligned in `.nav__actions`:

1. **Phone number link**

   ```tsx
   <a href={`tel:${TEL}`} class="nav__phone">
     <Phone size={13} /> {TEL_DISPLAY}
   </a>
   ```
   - Trust signal — always visible on desktop
   - Uses `TEL` (`+919585929914`) and `TEL_DISPLAY` (`+91 95859 29914`) from `icons.tsx`

2. **Portal button** (outline style)

   ```tsx
   <Link to="/admin" class="btn btn-outline btn-sm">
     <User size={13} /> Portal
   </Link>
   ```

3. **Get a Quote button** (primary style)
   ```tsx
   <Link to="/contact" class="btn btn-primary btn-sm">
     Get a Quote <ArrowRight size={13} />
   </Link>
   ```

---

### Mobile Hamburger

- Three `<span>` bars with animated open/close state via `.nav__hamburger-bar--open` class
- `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label` toggle between "Open menu" / "Close menu"

### Mobile Menu

Conditional render (`{menuOpen && <nav>}`) — slides in when open.

**Structure:**

```
Insurance Plans (section label)
  └── Life Insurance (LIC)
  └── Health Insurance
  └── Motor Insurance
─────────────────── (divider)
Claims
About
Contact
─────────────────────
[ Portal ]         (full-width outline button)
[ Get a Free Quote ] (full-width primary button)
+91 95859 29914    (phone link)
```

- Each insurance plan link includes its `lucide-react` icon in accent green
- CTA buttons at 42px height (touch-friendly)
- All links call `setMenuOpen(false)` on click

---

## SiteFooter

### Layout — 3-Column Grid

```
footer.footer
  div.container
    div.footer__grid   ← 1.4fr | 1fr | 1fr
      Brand + Contact
      Plans nav
      Company nav
    div.footer__bottom
      Copyright
      IRDAI notice
```

### Column 1 — Brand + Contact

- **Logo image:** 24×24px inline with text wordmark "NKT Insurance Solutions"
- **Brand statement:** 2-sentence description of the business
- **Contact links (3):**

  | Icon           | Text                       | Link                              |
  | -------------- | -------------------------- | --------------------------------- |
  | `PhoneIcon`    | `+91 95859 29914`          | `tel:+919585929914`               |
  | `WhatsAppIcon` | WhatsApp                   | `https://wa.me/917845349914`      |
  | `MailIcon`     | `contact@nktinsurance.com` | `mailto:contact@nktinsurance.com` |

### Column 2 — Plans Nav

```
Plans
├── Life Insurance          → /life-insurance
├── Health Insurance        → /health-insurance
├── Motor Insurance         → /motor-insurance
├── All Insurance Plans     → /services
└── Claims Support          → /claims
```

### Column 3 — Company Nav

```
Company
├── About NKT               → /about
├── Insurance Plans         → /services
├── Claims Support          → /claims
└── Contact Us              → /contact
```

### Bottom Bar

```
© 2026 NKT Insurance Solutions · India    |    IRDAI Licensed · Mon–Sat 9 AM–8 PM
```

- Year is dynamic: `new Date().getFullYear()`
- `role="contentinfo"` on `<footer>` for screen readers
- `id="contact"` anchor for in-page links

---

## WhatsApp FAB

**File:** `src/components/WhatsAppFab.tsx`

```tsx
<a href={WA_DEFAULT} class="fab" aria-label="Chat on WhatsApp" title="WhatsApp us now">
  <WhatsAppIcon size={26} />
</a>
```

- **Link:** `https://wa.me/917845349914?text=Hi%20NKT%2C%20I%20need%20free%20insurance%20advice.`
- **Position:** Fixed, bottom-right corner (defined in `styles.css` under `.fab`)
- **Icon:** Custom inline SVG `WhatsAppIcon` (not lucide — WhatsApp brand SVG)
- **Accessibility:** `aria-label` + `title` for screen readers and tooltips
- Rendered in `__root.tsx` after `<Outlet />` so it appears on every page

---

## Icons Used in Nav/Footer

All from `lucide-react` except `WhatsAppIcon`, `PhoneIcon`, `MailIcon` which are custom SVGs defined in `src/components/icons.tsx`:

| Component      | Used in                                                  |
| -------------- | -------------------------------------------------------- |
| `ShieldCheck`  | Dropdown (Life), SiteNav brand in earlier versions       |
| `Phone`        | Nav action bar, mobile menu phone link                   |
| `ChevronDown`  | Dropdown toggle, rotates 180° on open                    |
| `User`         | Portal button                                            |
| `ArrowRight`   | Get a Quote button                                       |
| `Heart`        | Dropdown (Health), mobile menu                           |
| `Car`          | Dropdown (Motor), mobile menu                            |
| `X`            | Not currently in nav (available for future close button) |
| `WhatsAppIcon` | SiteFooter contact, WhatsApp FAB                         |
| `PhoneIcon`    | SiteFooter contact                                       |
| `MailIcon`     | SiteFooter contact                                       |

---

## Contact Constants (from `icons.tsx`)

```ts
export const WA_NUMBER = "917845349914"; // WhatsApp link number
export const TEL = "+919585929914"; // tel: href
export const TEL_DISPLAY = "+91 95859 29914"; // human-readable
export const EMAIL = "contact@nktinsurance.com";
export const WA_DEFAULT = `https://wa.me/${WA_NUMBER}?text=...`;
```

All nav, footer, and FAB links use these constants — never hardcoded inline.

---

## Key Design Decisions

### Why logo image instead of text/SVG mark?

The `logo.png` asset gives a consistent branded mark across nav and footer without needing to maintain an SVG version. It uses `object-fit: contain` to avoid distortion.

### Why two CTA buttons in nav (Portal + Get a Quote)?

- **Portal** = returning users (clients checking status, advisors managing leads)
- **Get a Quote** = new visitors (primary conversion action)
  They serve different intents and don't compete — Portal is outlined, Quote is primary.

### Why phone number in nav?

Per `PRODUCT.md` and `CLAUDE.md`: Indian insurance customers are phone-call-first. Showing the number prominently in the nav is a trust signal and reduces friction for the most preferred contact method.

---

## Before vs After

| Element        | Before                 | After                                |
| -------------- | ---------------------- | ------------------------------------ |
| Logo           | Text-only wordmark     | Logo image + two-line wordmark       |
| Nav CTAs       | Single WhatsApp button | Phone number + Portal + Get a Quote  |
| Dropdown       | No hover support       | Mouse hover + click toggle           |
| Dropdown items | Text links only        | Icon + title + description           |
| Mobile menu    | Basic links            | Grouped sections + full-width CTAs   |
| Footer columns | 4-column AI template   | 3-column brand-led (per CLAUDE.md)   |
| Footer contact | Text links             | Icon + label contact cards           |
| WhatsApp FAB   | Basic link             | Branded SVG icon, pre-filled message |

---

## Files Modified

1. `src/components/SiteNav.tsx` — Full redesign
2. `src/components/SiteFooter.tsx` — Full redesign
3. `src/components/WhatsAppFab.tsx` — Created
4. `src/components/icons.tsx` — Contact constants + custom SVG icons
5. `src/assets/images/logo.png` — Logo asset added
6. `src/styles.css` — `.nav`, `.footer`, `.fab` CSS classes
