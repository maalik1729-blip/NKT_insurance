# NKT Insurance Solutions — Full Audit Runbook
> **Instruction file for AI IDE (Claude Code / Cursor / Kiro)**
> Feed this file as context. Execute all 7 audit prompts sequentially.
> Each audit saves its output as a separate `.md` file in `/audit-reports/`.

---

## ⚙️ GLOBAL EXECUTION RULES

Before running any prompt below, follow these rules exactly:

1. **Read CLAUDE.md and website_audit_context.md first.** These are the ground truth for architecture, design system, and integration specs. Never contradict them.
2. **Execute prompts in order: Prompt 1 → 2 → 3 → 4 → 5 → 6 → 7.** Each builds on the previous.
3. **After completing each prompt, save the output** as a `.md` file in the project root under `/audit-reports/` using the filename specified in each prompt header.
4. **Output format for every audit file:**
   - Start with a `## Summary` section (3–5 sentence executive overview)
   - Then a `## Issues` section with a numbered table: `| # | Severity | File/Layer | Issue | Recommended Fix |`
   - Severity labels: `🔴 Critical` / `🟠 High` / `🟡 Medium` / `🟢 Low`
   - End with a `## Next Actions` section listing the top 3 fixes to do immediately
5. **Do not merge outputs.** Each prompt = one separate `.md` file.
6. **If a file or function referenced in a prompt does not exist**, note it as `[FILE NOT FOUND — verify path]` and continue.

---

## PROMPT 1 — Architecture & Monorepo Health Audit
> **Save output to:** `/audit-reports/01-architecture-audit.md`

```
You are auditing the NKT Insurance Solutions monorepo — a three-tier decoupled application:
- Frontend: React 19 + TanStack Start (SSR) + TypeScript + Vite (port 8080) at src/routes/ and src/components/
- Admin Portal: React 19 + Vite SPA with Vite base path /admin/ (port 8081)
- Backend: Node.js + Express + MongoDB Atlas via Mongoose (port 5000 local / 10000 Render)

Architecture rules from CLAUDE.md:
- Route files in src/routes/ must be thin shells — all logic goes in src/components/
- No cross-tier imports (frontend must never import from backend or admin-portal)
- TypeScript strict mode: no `any` types, no missing return types
- VITE_ prefix required for all frontend env vars; backend secrets must never appear in Vite bundles

Audit the following across all three tiers:
1. Monorepo separation — Are there any shared utilities/types duplicated across tiers? Any cross-boundary imports violating isolation?
2. TypeScript strictness — Scan for `any` types, missing return types, untyped props, and implicit `unknown` in catch blocks.
3. Route shell discipline — In src/routes/, are any files doing more than routing (containing useState, business logic, or data fetching directly)?
4. Environment variable hygiene — Are VITE_ variables used only on the frontend? Any risk of MONGODB_URI, WA_ACCESS_TOKEN, or other backend secrets leaking into the Vite bundle?
5. Dead code — Identify unused routes, components, models, or helper files that can be removed.
6. Dependency audit — Flag any packages that are outdated (major version behind), duplicated across tiers, or unused in package.json.

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/01-architecture-audit.md.
```

---

## PROMPT 2 — Edge Proxy & Vercel Routing Audit
> **Save output to:** `/audit-reports/02-routing-proxy-audit.md`

```
Audit the Vercel edge routing configuration for NKT Insurance Solutions.

Known proxy rules in frontend/vercel.json:
  { "source": "/admin/assets/:path*", "destination": "https://nkt-insurance-an58.vercel.app/assets/:path*" }
  { "source": "/admin/login",         "destination": "https://nkt-insurance-an58.vercel.app/" }
  { "source": "/admin/favicon.png",   "destination": "https://nkt-insurance-an58.vercel.app/favicon.png" }
  { "source": "/admin/icons.svg",     "destination": "https://nkt-insurance-an58.vercel.app/icons.svg" }
  All other /admin/* routes → fall through to 404

Admin Portal Vite config: base = "/admin/"
Admin Portal's own vercel.json: { "source": "/admin/:path*", "destination": "/:path*" }

Audit for:
1. Asset loading gaps — Are there asset types not covered by the proxy rules (fonts, lazy-loaded JS chunks, web workers, source maps) that would silently 404 in production?
2. SPA reload loop risk — When a user hard-refreshes /admin/login, does the rewrite correctly serve the SPA index.html or does it trigger a rewrite loop?
3. Cookie & auth header propagation — Are credentials or Authorization headers correctly forwarded through Vercel rewrites or silently dropped on cross-origin proxying?
4. MIME-type enforcement — Will CSS and JS files served through the proxy carry correct Content-Type headers? Flag any cross-origin MIME-check failure risk caused by the /admin/ → root rewrite.
5. Edge case coverage — Simulate HTTP responses for: /admin, /admin/, /admin/panel, /admin/login, /admin/assets/index.js, /admin/icons.svg. Are all returning the expected status codes?
6. Rewrite rule ordering — In Vercel, rewrites are matched top-to-bottom. Is the current rule order correct, or can a more specific rule be shadowed by a broader one?

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/02-routing-proxy-audit.md.
```

---

## PROMPT 3 — Frontend Performance & Core Web Vitals Audit
> **Save output to:** `/audit-reports/03-performance-cwv-audit.md`

```
Audit the NKT Insurance Solutions frontend for Core Web Vitals compliance.
Target user: Indian families, ages 28–55, mid-range Android devices, 4G connections (avg ~10 Mbps).

Design system ground truth from website_audit_context.md:
- Display font: Spectral (Serif) with Georgia fallback (size-adjust tuned for zero CLS)
- Body font: Inter (Sans-serif) with Arial fallback (size-adjust tuned for zero CLS)
- Canvas: #f1f5f1 | Primary: #14532d | Accent: #b45309
HARD BANS (violations must be flagged):
- No gradients (pink/purple/blue gradient text or backgrounds)
- No emoji icons (use lucide-react only)
- No full-viewport centered stacked heroes — must be left-biased 2-column on desktop
- No excess eyebrow labels on every section
- No generic 4-column AI-style footer

Audit for:
1. CLS (Cumulative Layout Shift) — Do the Spectral/Georgia and Inter/Arial fallback size-adjust values match actual font metrics? Is FOIT or FOUT occurring? Are images missing explicit width/height attributes?
2. LCP (Largest Contentful Paint) — What is the likely LCP element on the homepage? Is it server-rendered and preloaded? Are hero images in WebP or AVIF format?
3. INP (Interaction to Next Paint) — Are there heavy event handlers, unthrottled scroll listeners, or blocking JS that delays first interaction response?
4. TanStack Start SSR hydration — Is the hydration bundle size optimized? Is there a hydration mismatch risk between SSR HTML and client state?
5. Responsive layout — Do 2-column desktop layouts collapse correctly at 360px–414px (most common Indian mid-range Android viewport)?
6. Touch target compliance — Are all CTAs, WhatsApp buttons, and form inputs meeting a minimum 44×44px touch target for the 28–55 age group?
7. Design system violations — Scan all components for: gradient usage, emoji icons, centered hero stacks, excess eyebrows, 4-column AI-style footers.

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/03-performance-cwv-audit.md.
```

---

## PROMPT 4 — Backend API & MongoDB Integration Audit
> **Save output to:** `/audit-reports/04-backend-api-audit.md`

```
Audit the NKT Insurance Solutions Express backend for production reliability.
File to audit: backend/server.js and backend/models/Lead.js

Stack: Node.js + Express + Mongoose + MongoDB Atlas
Deployed on: Render (free tier — subject to cold starts and sleep after 15min inactivity)

Key operations:
1. POST lead → validate input → save to MongoDB → trigger WhatsApp admin notification → send customer confirmation WhatsApp
2. GET webhook challenge verification (Meta hub.challenge handshake)
3. Lead status updates (status field: new → contacted → in-progress → closed)
4. Timeline append (array of system events, admin notes, advisor changes)

Audit for:
1. Async error handling — Are all async route handlers wrapped in try/catch or passed to an Express error middleware? Are unhandled Promise rejections caught at process level?
2. MongoDB connection pooling — Is the Atlas connection opened once at startup or re-opened per request? Is there a reconnection strategy for Render cold-start scenarios?
3. Input validation — Is the lead payload (name, phone, interest) validated before the DB write? Is the phone number validated for Indian format (+91XXXXXXXXXX, 10-digit after country code)?
4. WhatsApp API resilience — If the Meta Graph API call fails (timeout, 429 rate limit, expired token), does the lead still save to MongoDB? Is the failure logged with the lead ID for retry?
5. Webhook security — Is the GET challenge verifying hub.verify_token against an env var (not hardcoded)? Is there signature verification (X-Hub-Signature-256) on POST webhook events?
6. Syslog log hygiene — Confirm "Admin alert" is replaced with "Admin notification" everywhere in server.js to avoid Render syslog severity-1 false positives.
7. Rate limiting — Is the POST /leads endpoint rate-limited (e.g., express-rate-limit)? Is there a request payload size cap (express.json limit)?
8. Render cold-start risk — Is the first DB operation after sleep protected with a connection readiness check?

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/04-backend-api-audit.md.
```

---

## PROMPT 5 — Admin CRM Portal Audit
> **Save output to:** `/audit-reports/05-admin-portal-audit.md`

```
Audit the NKT Insurance Admin Portal — a standalone React 19 + Vite SPA used exclusively by the insurance advisor.
Source: admin-portal/src/

Known architecture:
- State management: Local React state + localStorage (cross-tab sync via storage event)
- Analytics: Recharts (lead funnel, status distribution charts)
- Icons: lucide-react only (emoji icons strictly banned)
- Auth: Login page exists (audit the mechanism)
- Accessible via: https://www.nktinsurance.co.in/admin/login (proxied from main domain)

Audit for:
1. localStorage security — What data is stored in localStorage? Is any lead PII (names, phone numbers) persisted client-side without encryption? What happens if the advisor uses a shared device?
2. Cross-tab sync — Is the storage event listener correctly scoped to prevent stale state rendering? Is there a race condition if two tabs update the same lead simultaneously?
3. Auth implementation — Is the login using a real mechanism (JWT, session cookie, HTTP-only cookie) or a client-side password check? What happens if the user navigates directly to a CRM view URL without being authenticated?
4. Route protection — Are all CRM views behind an auth guard HOC or layout wrapper? Can unauthenticated users access lead data by knowing component mount paths?
5. Recharts responsiveness — Are all charts wrapped in <ResponsiveContainer>? Do they render correctly at tablet viewport (768px–1024px), which is the most likely advisor device?
6. Lead data freshness — Is lead data fetched on component mount only, or is there polling / refetch on window focus? If the advisor keeps the portal open overnight, can data go 8+ hours stale?
7. lucide-react compliance — Confirm zero raw emoji usage in the entire admin-portal/src/ directory. Flag any violations.
8. Build config audit — Confirm Vite base is set to "/admin/" in admin-portal/vite.config.ts. Confirm output dir is "dist". Flag any mismatch.

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/05-admin-portal-audit.md.
```

---

## PROMPT 6 — WhatsApp Automation Flow Audit
> **Save output to:** `/audit-reports/06-whatsapp-automation-audit.md`

```
Audit the WhatsApp notification pipeline in the NKT Insurance Solutions backend.
Primary file: backend/server.js

Integration: Meta Graph API v18.0
Env vars in use: VITE_WA_ACCESS_TOKEN, VITE_WA_PHONE_NUMBER_ID, VITE_WA_ADMIN_NUMBER

Two notification flows triggered on new lead:
1. Admin notification → POST to Meta API → advisor number 919585929914 receives lead details
2. Customer confirmation → POST to Meta API → customer receives callback window message

Sandbox constraint: Customer numbers must send "Hi" to +1 (555) 670-8889 to open 24hr messaging window before receiving messages.

Audit for:
1. Token lifecycle — Is VITE_WA_ACCESS_TOKEN a 24hr temporary token or a permanent System User token? Is there an expiry check or alert mechanism before it silently fails?
2. Phone number normalisation — Is the customer phone number converted to E.164 format (e.g., 09585929914 → 919585929914) before sending to Meta API? Is the leading zero stripped and +91 prepended?
3. Dual-send atomicity — If admin notification succeeds but customer confirmation fails (or vice versa), is the partial failure logged against the lead record in MongoDB? Is there a retry or manual re-trigger mechanism?
4. Sandbox vs. production guard — Is there an environment flag (NODE_ENV or a dedicated IS_SANDBOX env var) that routes messages to sandbox vs. production? Is there a risk of sandbox mode being left on in production?
5. Message template compliance — Are outgoing messages using approved Meta message templates (required for business-initiated messages outside 24hr window)? Or free-form text (only valid inside a customer-initiated 24hr window)? Flag any compliance risk.
6. Webhook idempotency — If Meta re-delivers a webhook POST (guaranteed-at-least-once delivery), does the backend create a duplicate lead? Is there a deduplication check (e.g., on phone + timestamp)?
7. Error surfacing — Are WhatsApp API error responses (4xx/5xx from Meta) logged with the full error body, not just a generic "WhatsApp failed" message? Is the lead ID included in the log for traceability?

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/06-whatsapp-automation-audit.md.
```

---

## PROMPT 7 — SEO, Accessibility & Trust Signal Audit
> **Save output to:** `/audit-reports/07-seo-accessibility-audit.md`

```
Audit the public-facing NKT Insurance Solutions website for SEO compliance, accessibility, and trust-signal effectiveness.
Source: frontend/src/

Target demographic: Indian families, ages 28–55, trust-sensitive, WhatsApp-first communication preference
Brand positioning: "Trusted neighborhood advisor" — warm, professional, local, honest
Conversion goals: Online form submissions + WhatsApp CTA clicks
Rendering: TanStack Start SSR (server-side rendered HTML available to crawlers)

Audit for:
1. Meta tags — Does every route have a unique <title> (50–60 chars) and <meta name="description"> (120–155 chars)? Are Open Graph tags (og:title, og:description, og:image) present for WhatsApp link preview cards?
2. Structured data — Is there a LocalBusiness or InsuranceAgency schema.org JSON-LD block? Does it include: name, address, telephone, url, openingHours, areaServed? This directly impacts Google local pack eligibility.
3. Semantic HTML — Are headings in strict H1→H2→H3 hierarchy (one H1 per page)? Are all form inputs using <label for=""> correctly associated? Are tables (if any) using <th scope="">?
4. Accessibility — Are all interactive elements keyboard-navigable (Tab order, Enter/Space activation)? Do WhatsApp CTA buttons have aria-label attributes (e.g., "Chat with NKT Insurance on WhatsApp")? Is color contrast meeting WCAG AA (4.5:1 for body text, 3:1 for large text) against #f1f5f1 canvas?
5. Trust signals above the fold — Are LIC authorization number, IRDAI registration number, advisor photo, testimonials, and physical address visible without scrolling on mobile? These are conversion-critical for the 28–55 demographic.
6. Form UX for 28–55 demographic — Is body font size ≥ 16px (prevents iOS auto-zoom)? Do name inputs use autocomplete="name"? Do phone inputs use type="tel" and inputmode="numeric"? Is there a visible error state for invalid phone numbers?
7. WhatsApp CTA format — Are WhatsApp links using the correct format: https://wa.me/919585929914?text=Hi%20NKT%2C%20I%20need%20insurance%20advice? Is the pre-filled message text set?
8. Sitemap & robots — Does /sitemap.xml exist and include all public routes? Does /robots.txt allow crawling of all public pages and block /admin/*?
9. Core Web Vitals SEO impact — Cross-reference issues flagged in Prompt 3 (CLS, LCP, INP) and rate their direct impact on Google Search ranking for local insurance queries.

Format output as specified in GLOBAL EXECUTION RULES. Save to /audit-reports/07-seo-accessibility-audit.md.
```

---

## ✅ COMPLETION CHECKLIST

After all 7 prompts are executed, verify:

- [ ] `/audit-reports/01-architecture-audit.md` — exists and has Issues table
- [ ] `/audit-reports/02-routing-proxy-audit.md` — exists and has Issues table
- [ ] `/audit-reports/03-performance-cwv-audit.md` — exists and has Issues table
- [ ] `/audit-reports/04-backend-api-audit.md` — exists and has Issues table
- [ ] `/audit-reports/05-admin-portal-audit.md` — exists and has Issues table
- [ ] `/audit-reports/06-whatsapp-automation-audit.md` — exists and has Issues table
- [ ] `/audit-reports/07-seo-accessibility-audit.md` — exists and has Issues table

Once all 7 files exist, generate a final summary file:

**Save to:** `/audit-reports/00-MASTER-SUMMARY.md`

```
Read all 7 audit report files from /audit-reports/. Generate a master summary with:
1. Total issue count by severity across all 7 audits (table: Severity | Count)
2. Top 10 critical/high issues across all audits ranked by business impact
3. Recommended fix sequence (which issues to fix first, second, third — considering dependencies)
4. Estimated effort tags per issue: [30min] / [2hr] / [1day] / [1week]
```

---

*Runbook version: 1.0 | Project: NKT Insurance Solutions | Generated for AI IDE execution*
