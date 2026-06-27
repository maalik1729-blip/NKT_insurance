# NKT Insurance Solutions Platform

This project is organized as a decoupled three-tier application structure:
1. **Frontend**: The public, customer-facing website built with TanStack Start, React, and Vite (runs on port `8080`).
2. **Admin Portal**: A standalone advisor CRM workspace built with React, Vite, and Lucide/Recharts (runs on port `8081`).
3. **Backend**: An Express.js REST API server connecting to MongoDB Atlas and handling WhatsApp notifications (runs on port `5000`).

---

## Directory Structure

```
nktinsurance/
├── backend/            ← Express API & MongoDB Mongoose integration
│   ├── .env            ← Secured credentials (WA tokens, Mongo URI)
│   ├── models/         ← MongoDB Mongoose models (Lead schema)
│   └── server.js       ← Backend Express API & DNS workarounds
│
├── frontend/           ← Public-facing client website
│   ├── src/            ← Customer lead forms & pages
│   └── vite.config.ts  ← Config (Proxy/calls backend API on 5000)
│
└── admin-portal/       ← Standalone Advisor CRM dashboard
    ├── src/            ← Advisor workspaces, analytics, and login
    └── vite.config.ts  ← Config (Default port set to 8081)
```

---

## Setup & Running Locally

Ensure Node.js is installed on your computer.

### 1. Run the Express Backend Server

The backend requires the `.env` file containing MongoDB URI and WhatsApp API credentials:

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on port `5000` with automatic watches):
   ```bash
   npm run dev
   ```

### 2. Run the Public Client Website (Frontend)

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on port `8080`):
   ```bash
   npm run dev
   ```
4. Access the client site at `http://localhost:8080`.

### 3. Run the Advisor CRM Workspace (Admin Portal)

1. Open a third terminal and navigate to the admin-portal directory:
   ```bash
   cd admin-portal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (runs on port `8081`):
   ```bash
   npm run dev
   ```
4. Access the CRM workspace at `http://localhost:8081`.

---

## Technical Features

### Database Persistence
- Leads are saved dynamically in MongoDB Atlas inside the `leads` collection.
- Timeline activities, status, notes, follow-up dates, advisor names, and premiums are fully persisted in the database.

### WhatsApp Automation
- Submitting a lead automatically triggers a notification message to the advisor's number and a confirmation message to the client's number.
- Integrates Meta Graph API v18.0.

### Real-Time Alerts
- The Advisor CRM workspace polls the Express API (every 8 seconds) to fetch the latest leads.
- When a new lead is detected, the admin portal plays an audio chime alert using the Web Audio API and pops up a visual toast notification.
