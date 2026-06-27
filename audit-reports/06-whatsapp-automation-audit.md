# NKT Insurance Solutions — WhatsApp Automation Flow Audit

## Summary
The WhatsApp automation pipeline triggers two notification calls (Admin alert to `919585929914` and Client auto-confirmation) upon new lead registration. It is built on the Meta Graph API v18.0. The Render logger warning has been resolved by mapping levels to "Admin notification" success logs. However, the pipeline faces reliability gaps: a failure on one WhatsApp message does not rollback or flag the database entry, phone numbers are not fully normalized to standard E.164 formats, and webhook deduplication is missing.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🟠 High | Backend (`server.js`) | **Lack of Message Send Atomicity:** If the administrator alert succeeds but the client confirmation fails (e.g., due to sandbox restriction or rate limits), the lead is saved with no record of partial failure. | Add status properties (`adminAlertSuccess`, `customerConfirmationSuccess`) to the Lead database schema and record the outcome of each message for easier debugging. |
| 2 | 🟡 Medium | Backend (`server.js`) | **Missing Phone Number Normalization:** Client phone numbers are stripped of non-digits, but there is no validation to normalize leading zeros or missing country codes to E.164 (`91XXXXXXXXXX`), causing API errors. | Add phone normalization utilities to strip leading zeros, validate 10 digits, and prepend `91` before forwarding to the Meta Graph API. |
| 3 | 🟡 Medium | Backend (`server.js`) | **Lack of Webhook Deduplication:** If Meta re-delivers a webhook event (due to temporary networking errors), the `/api/webhook` POST endpoint might process the payload twice, causing duplicate lead data. | Store incoming webhook message IDs in a redis cache or temporary MongoDB log, checking for duplicates before lead ingestion. |
| 4 | 🟢 Low | Backend (`server.js`) | **Permanent Token Lifecycle Warning:** The API integration relies on `VITE_WA_ACCESS_TOKEN`. There is no check or automated monitoring to alert if this token expires or gets revoked. | Implement a system alert or test endpoint check in the backend to monitor token validation status. |

## Next Actions
1. Store WhatsApp delivery status flags directly in the database model [Lead.js](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/backend/models/Lead.js).
2. Add normalization functions to [server.js](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/backend/server.js#L130) to guarantee all phone targets follow E.164 specifications.
3. Log full API error payloads returned by Meta Graph API calls rather than returning generic messages.
