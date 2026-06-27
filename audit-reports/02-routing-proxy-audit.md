# NKT Insurance Solutions — Edge Proxy & Vercel Routing Audit

## Summary
The edge routing audit validates the same-domain reverse proxy implementation running at the Vercel CDN layer. The proxy correctly forwards `/admin/login` and static assets under `/admin/assets/` to the standalone admin portal app, maintaining a single-domain experience for users. However, the static asset routing rules are fragile and hard-coded to specific filenames, creating high maintenance overhead. Additionally, visiting `/admin` returns a blank 404 rather than routing to `/admin/login` because all redirects were completely disabled.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🟠 High | Frontend (`vercel.json`) | **Fragile Static Asset Proxying:** Public assets in the admin-portal's root directory (like `icons.svg` and `favicon.png`) are proxied individually. If new assets (like `manifest.json`, additional SVGs, or WebP files) are added, they will fail to load and return a 404. | Update `vercel.json` rewrites to include a fallback pattern for root-level files that redirects them dynamically, or prefix all static resources under a dedicated subfolder that is cleanly proxied. |
| 2 | 🟡 Medium | Frontend (`vercel.json`) | **Blank 404 for Root `/admin` Route:** Because redirects from `/admin` to `/admin/login` were disabled to avoid namespace collisions, users visiting `https://www.nktinsurance.co.in/admin` directly receive a generic client-side 404 instead of a clean login landing page. | Implement a fallback rewrite rule or handle the `/admin` path client-side in the router to force a same-domain redirect to `/admin/login` instead of returning a 404. |
| 3 | 🟢 Low | Frontend / Admin Portal | **Cross-Origin Security Constraints:** While rewriting masks the domain difference, standard cookies and authentication headers could be dropped during browser cross-origin requests unless CORS configurations are explicitly matched. | Ensure that all fetch requests from the admin portal to the backend utilize relative endpoints where possible or are explicitly configured with appropriate credentials policies. |

## Next Actions
1. Map `/admin/icons.svg` and `/admin/favicon.png` alongside other assets dynamically under [vercel.json](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/frontend/vercel.json) using a pattern match like `/admin/:file(favicon.png|icons.svg|manifest.json)`.
2. Configure a client-side navigation redirect for `/admin` or configure a Vercel routing fallback that maps `/admin` safely to `/admin/login` without breaking proxy isolation.
3. Verify asset load performance of the proxied admin portal in a staging environment to monitor edge latency.
