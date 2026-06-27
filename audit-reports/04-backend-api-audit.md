# NKT Insurance Solutions — Backend API & MongoDB Integration Audit

## Summary
The Express.js REST API backend is deployed on Render and connects to a MongoDB Atlas cluster. The WhatsApp webhook verification flow is correctly implemented, and the Render logging severity issue was resolved by replacing false-positive "alert" keywords. However, the API has significant security and resilience concerns: incoming POST webhook events from Meta are not verified using HMAC signatures, input validation for Indian phone formats is missing, and there is no API rate limiting to prevent spam abuse.

## Issues

| # | Severity | File/Layer | Issue | Recommended Fix |
|---|----------|------------|-------|-----------------|
| 1 | 🔴 Critical | Backend (`server.js`) | **Missing Webhook Signature Validation:** The webhook POST endpoint (`/api/webhook`) receives message events but does not check the `X-Hub-Signature-256` header using SHA256 HMAC, leaving the server vulnerable to spoofing. | Implement signature verification middleware in `server.js` using the App Secret from Meta Developer Console to validate incoming request bodies. |
| 2 | 🟠 High | Backend (`server.js`) | **Weak Phone Number Format Validation:** The lead collection endpoint normalizes digits but fails to strictly validate whether the phone number is a valid 10-digit Indian mobile number (+91 or leading 7/8/9), allowing garbage data entries. | Integrate a validation regex pattern (e.g., `/^(?:\+?91)?[6-9]\d{9}$/`) inside the server endpoint payload validation block. |
| 3 | 🟡 Medium | Backend (`server.js` / Mongoose) | **Missing API Rate Limiting:** The `/api/leads` and `/api/whatsapp/notify` endpoints have no rate limiting, leaving the server vulnerable to automated lead submission spam or denial-of-service. | Add `express-rate-limit` middleware configured specifically for lead creation endpoints, limiting submissions per IP. |
| 4 | 🟡 Medium | Backend (`server.js`) | **Render Cold Start / Database Keep-Alive:** Render free tier instances go to sleep after 15 minutes of inactivity. When a cold start occurs, first requests face high latency and might timeout if Mongoose connection readiness checks fail. | Add a database health readiness check to the `/health` route, and use a ping service to keep the instance active during business hours. |

## Next Actions
1. Implement Meta signature verification for [server.js](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/backend/server.js) `/api/webhook` POST requests using `crypto.createHmac`.
2. Add a robust Regex validation check for Indian mobile number patterns on lead submission in [server.js](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/backend/server.js#L190).
3. Integrate `express-rate-limit` into the Express app configuration in [server.js](file:///d:/Downloads/NKT_insurance/NKT_insurance-main/backend/server.js).
