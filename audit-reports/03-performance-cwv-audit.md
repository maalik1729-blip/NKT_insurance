# NKT Insurance Solutions — Frontend Performance & Core Web Vitals Audit

## Summary
This performance audit evaluates Core Web Vitals on standard Indian mobile connections (4G, ~10 Mbps average) for users aged 28–55. The editorial typography fallbacks are properly configured with `size-adjust` rules, effectively preventing Cumulative Layout Shift (CLS) on font swaps. The primary performance bottlenecks are the massive bundle size of the index route (containing forms, charts, calculator math, and SVGs in one block) and the lack of explicit preload tags or layout dimension declarations for above-the-fold media.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🔴 Critical | Frontend (`src/routes/index.tsx`) | **Monolithic Home Route / Hydration Overhead:** The homepage route file is 2,191 lines long. Hydrating this massive amount of inline calculator logic, SVG icons, and HTML markup on a mobile connection causes high Interaction to Next Paint (INP) latency. | Code-split the calculation sliders, testimonials, and FAQs. Load heavy sub-sections lazily (using React Suspense or TanStack dynamic imports) so they load only after initial hydration. |
| 2 | 🟠 High | Frontend (`src/routes/index.tsx`) | **LCP Image Preload & Dimension Missing:** The key LCP elements (hero graphic and section illustrations) are imported as assets but lack explicit preload links in the head configuration, causing rendering delays on mobile. | Add `<link rel="preload" as="image" href="...">` declarations to the `head()` option in the root page route configuration, and ensure images have explicit width/height attributes. |
| 3 | 🟡 Medium | Frontend (`src/components/`) | **Aria Labeling & Focus Indicators Missing:** The floating WhatsApp button and form elements lack explicit `aria-label` tags, and custom `:focus-visible` styling is missing, violating WCAG AA accessibility standards. | Add descriptive `aria-label` tags to the WhatsApp float button and apply focus ring tokens to all interactive elements to support keyboard-only navigation. |

## Next Actions
1. Code-split the large calculator dashboard inside [index.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/index.tsx) into a lazy-loaded sub-component.
2. Inject image preload links for the hero banner into the TanStack Route head definition in [index.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/index.tsx).
3. Add custom focus ring styling (`outline: 2px solid var(--color-focus)`) to all inputs and interactive components inside `styles.css`.
