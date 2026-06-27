# NKT Insurance Solutions — SEO, Accessibility & Trust Signal Audit

## Summary
The client landing page is designed for trust, highlighting advisor details, LIC licensing, and physical address information. However, several improvements are needed to maximize Google Local Pack visibility and improve usability for visitors aged 28–55. The site lacks Open Graph image tags for WhatsApp preview optimization, has incomplete structured schema specifications, and misses accessibility tags on key form sliders.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🟠 High | Frontend (`src/routes/__root.tsx`) | **Missing Open Graph Image Metadata:** There is no `og:image` metadata defined in the root route configuration, causing WhatsApp preview links to display without custom logo/image previews. | Add a high-resolution branding image URL to the Open Graph metadata options inside the root route definition. |
| 2 | 🟡 Medium | Frontend (`src/routes/__root.tsx`) | **Incomplete Structured Schema Data:** The JSON-LD schema declares a generic `LocalBusiness` but lacks insurance-specific parameters like IRDAI credentials, license details, and list of policy categories. | Extend the JSON-LD schema configuration to include specific `InsuranceAgency` properties, mapping IRDAI registration parameters directly. |
| 3 | 🟡 Medium | Frontend (`src/routes/index.tsx`) | **Missing ARIA Roles on Form Sliders:** Custom range sliders in the premium estimation tools lack descriptive ARIA labels (`aria-valuenow`, `aria-valuemin`), making them inaccessible to screen readers. | Bind appropriate ARIA attributes to the range input elements within the calculation UI. |
| 4 | 🟢 Low | Frontend (`src/routes/index.tsx`) | **WhatsApp CTA Link Structure:** The WhatsApp fab and CTA links use standard formats but lack fallback pre-filled text parameter templates, missing a minor conversion opportunity. | Update all `wa.me` links to include pre-filled text parameters (e.g. `?text=Hi%20NKT...`) to guide client messages. |

## Next Actions
1. Define a default OG image link in the head meta parameters inside [__root.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/__root.tsx#L83).
2. Extend the schema.org metadata inside [__root.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/__root.tsx#L113) to include specific `InsuranceAgency` configurations.
3. Update custom range slider inputs inside [index.tsx](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/src/routes/index.tsx) with explicit `aria-valuenow` tags.
