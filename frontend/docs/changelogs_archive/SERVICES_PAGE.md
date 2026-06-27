# Services Overview Page

**Status:** ✅ Complete  
**Route:** `/services`  
**File:** `src/routes/services.tsx`  
**Date:** June 2026

---

## Overview

The Services page is the top-level insurance plans overview. It sits between the homepage and the three individual product pages (Life, Health, Motor). Its job is to orient visitors who aren't yet sure which insurance type they need, then funnel them to the right product page or directly to a consultation.

---

## Page Sections

### 1. Page Hero

```
Breadcrumb: Home › Insurance Plans

Tag badge: [FileText icon] Plans & Coverage

H1: Three pillars of protection,
    compared honestly

Lead text: We're independent — not tied to any single insurer.
           Every recommendation is shortlisted from LIC and
           8 top private insurers based on your family's
           actual situation, not our commission.

CTAs: [Get Free Advice → /contact]  [See All Plans → #plans]
```

**Key copy decision:** "compared honestly" and "not tied to any single insurer" directly address the #1 trust concern for Indian insurance buyers — advisor bias.

---

### 2. Partner Logos Bar

```
Insurer partners we work with
LIC · Star · HDFC · Bajaj · TATA · ICICI · NIA · Care
```

**Partners displayed (8):**

| Display Name  | Abbreviation |
| ------------- | ------------ |
| LIC of India  | LIC          |
| Star Health   | Star         |
| HDFC Ergo     | HDFC         |
| Bajaj Allianz | Bajaj        |
| Tata AIG      | TATA         |
| ICICI Lombard | ICICI        |
| New India     | NIA          |
| Care Health   | Care         |

Each partner shown as `<Building2 icon> Full Name` in `.partners__logo` badge. Section uses `.partners` + `.partners__grid` CSS classes. Provides credibility through recognised insurer names.

---

### 3. Plan Cards

**Section anchor:** `#plans`  
**Heading:** "Choose your coverage"  
**Subtext:** "Each plan type solves a different problem. We help you understand what you need before you buy."

Three plan cards rendered from `PLANS` data array:

#### Life Insurance (Featured)

```
Icon:     ShieldCheck
Badge:    "Most Popular"
Body:     Protect your family's financial future...
Features: Term plans from ₹500/month
          LIC endowment & money-back
          Child education planning
          Tax savings under 80C
CTA:      Explore Life Insurance → /life-insurance
```

#### Health Insurance

```
Icon:     Heart
Body:     Cashless hospitalisation across 7,000+ hospitals...
Features: Cashless at 7,000+ hospitals
          Family floater plans
          Critical illness cover
          Pre-existing conditions covered
CTA:      Explore Health Insurance → /health-insurance
```

#### Motor Insurance

```
Icon:     Car
Body:     Car and two-wheeler insurance with genuine claim support...
Features: Third-party & comprehensive
          Zero-depreciation add-on
          Roadside assistance
          Direct claim support
CTA:      Explore Motor Insurance → /motor-insurance
```

**Card styling:**

- `.plan-cards` grid — CSS class from `styles.css`
- Featured card gets `.plan-card--featured` modifier (elevated styling)
- Badge rendered with `.plan-card__badge` class (only on featured)
- Feature list items use `CheckCircle2` icon + text
- Each card has a primary CTA button with `ArrowRight` icon

---

### 4. Why Independent Advisor Section

**Tinted background:** `.section--tinted`  
**Heading:** "Why an independent advisor?"  
**Subtext:** "Banks and insurer agents are paid to push one company's products. We compare all of them."

4 info cards in `.info-grid`:

| Icon           | Title                | Body                                                                                     |
| -------------- | -------------------- | ---------------------------------------------------------------------------------------- |
| `Users`        | Unbiased comparisons | Compare from LIC + 8 private insurers, full picture — premiums, exclusions, claim ratios |
| `BadgeCheck`   | IRDAI licensed       | Fully licensed, accountable to the regulator                                             |
| `Award`        | 10+ years experience | Know which plans pay claims easily vs cause complications                                |
| `CheckCircle2` | Lifelong support     | Renewals, claims, additions managed for life of policy                                   |

Each card uses `.info-card`, `.info-card__icon`, `.info-card__title`, `.info-card__body` CSS classes.

---

### 5. FAQ Section

Uses the shared `<FaqAccordion>` component.

**Heading:** "Common insurance questions"  
**Subtext:** "Plain answers — no jargon, no sales pitch."

**6 FAQ items:**

| Question                                       | Topic               |
| ---------------------------------------------- | ------------------- |
| Which insurance should I buy first?            | Buying priority     |
| How much life cover is enough?                 | Cover sizing        |
| LIC vs private insurers — which is better?     | Provider comparison |
| What happens if I miss a premium payment?      | Policy management   |
| Can I buy insurance online without an advisor? | DIY vs advisor      |
| How long does it take to get a policy issued?  | Timelines           |

---

### 6. CTA Banner

Uses the shared `<CtaBanner>` component.

```
Heading: Not sure which plan is right for you?
Sub:     Book a free 30-minute consultation. We'll compare
         plans based on your actual situation.
```

---

## Scroll Reveal

```ts
function ServicesPage() {
  useScrollReveal();  // ← activates scroll-triggered entrance animations
  ...
}
```

The `useScrollReveal` hook (from `src/hooks/useScrollReveal.ts`) applies entrance animations to elements as they scroll into view using `IntersectionObserver`.

---

## SEO Metadata

```ts
const TITLE = "Insurance Plans — Life, Health & Motor | NKT Insurance Solutions";
const DESC  = "Compare LIC and top-insurer plans for life, health, and motor coverage.
               Independent, IRDAI-licensed advice for Indian families — no pressure, just clarity.";
```

Open Graph and canonical tags are also set:

```ts
{ property: "og:title",       content: TITLE }
{ property: "og:description", content: DESC }
{ property: "og:url",         content: "/services" }
{ rel: "canonical",           href: "/services" }
```

---

## Data Structure

### PLANS Array

```ts
const PLANS = [
  {
    icon:     JSX,      // lucide-react icon element
    name:     string,   // display name
    body:     string,   // 1-2 sentence description
    features: string[], // 4 bullet points
    href:     string,   // route to product detail page
    featured: boolean,  // adds featured card styling
    badge?:   string,   // optional badge label (featured only)
  }
]
```

### PARTNERS Array

```ts
const PARTNERS = [
  { name: string, abbr: string }, // 8 entries
];
```

### FAQ Array

```ts
const FAQ: { q: string; a: string }[] = [
  // 6 entries
];
```

---

## Component Dependencies

| Import                         | Source                       | Usage              |
| ------------------------------ | ---------------------------- | ------------------ |
| `Link`                         | `@tanstack/react-router`     | All internal links |
| `useScrollReveal`              | `../hooks/useScrollReveal`   | Scroll animations  |
| `FaqAccordion`                 | `../components/FaqAccordion` | FAQ section        |
| `CtaBanner`                    | `../components/CtaBanner`    | Bottom CTA         |
| `ShieldCheck, Heart, Car, ...` | `lucide-react`               | Icons throughout   |

---

## Navigation Path

```
Homepage (/)
  └── "Explore" buttons on service sections → /services

Main Nav
  └── Insurance Plans (dropdown) → individual product pages (bypasses /services)

/services
  └── Plan card CTAs → /life-insurance, /health-insurance, /motor-insurance
  └── Get Free Advice → /contact
```

Note: The main nav dropdown links directly to product pages, not to `/services`. The Services page is for users who arrive via the homepage "explore" flow or direct URL — it provides a comparison overview before committing to a product page.

---

## Design Notes

- Uses CSS class-based styling (`.plan-card`, `.info-grid`, `.partners__grid`) rather than inline styles — this is the older styling pattern from before the editorial redesign
- The three product detail pages (Life, Health, Motor) use inline editorial styles; the Services page retains the CSS class approach since it was not part of the Phase 3 editorial redesign
- If this page is redesigned in the future, the inline editorial pattern from the product pages should be applied for consistency

---

## Files

- `src/routes/services.tsx` — Page component and data
- `src/styles.css` — `.plan-card`, `.info-grid`, `.partners`, `.page-hero` CSS classes
- `src/hooks/useScrollReveal.ts` — Scroll animation hook
