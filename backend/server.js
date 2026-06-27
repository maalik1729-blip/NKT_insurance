import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import Lead from "./models/Lead.js";

// Force Node.js to use Google & Cloudflare DNS to resolve MongoDB Atlas SRV records
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (err) {
  console.warn("[DNS] Custom resolver config failed, using system default DNS:", err.message);
}

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB Atlas
if (!MONGODB_URI) {
  console.error("[MongoDB] MONGODB_URI is not set in environment variables.");
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("[MongoDB] Connected successfully to Atlas"))
  .catch((err) => {
    console.error("[MongoDB] Connection failure:", err);
  });

// Enable CORS for frontend applications (client on 8080, admin on 8081, etc.)
app.use(cors());
app.use(express.json());

// Basic health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date(),
  });
});

// Helper function to process lead insertion + WhatsApp automation
async function handleNewLeadProcessing(leadData) {
  const { name, phone, interest } = leadData;

  // 1️⃣ Save to MongoDB Atlas
  const lead = new Lead({
    name,
    phone,
    interest,
    status: "new",
    source: "web",
    timeline: [
      {
        id: `te_${Date.now()}`,
        type: "system",
        message: "Lead submitted online via client website.",
        timestamp: new Date().toISOString(),
      },
    ],
  });
  await lead.save();
  console.log(`[MongoDB] Saved new lead: ${lead._id} (${name})`);

  // 2️⃣ Trigger WhatsApp Automation
  const PHONE_ID = process.env.VITE_WA_PHONE_NUMBER_ID;
  const TOKEN = process.env.VITE_WA_ACCESS_TOKEN;
  const ADMIN = process.env.VITE_WA_ADMIN_NUMBER || "919940089442";

  if (!PHONE_ID || !TOKEN) {
    console.warn("[WhatsApp] Credentials not configured in .env. Skipping messaging.");
    return { lead, adminAlertSuccess: false, customerConfirmationSuccess: false };
  }

  const interestLabel = {
    life: "Life Insurance 🏥",
    health: "Health Insurance 💊",
    motor: "Motor Insurance 🚗",
    lic: "LIC Plans 📋",
    multiple: "Multiple Insurance 📋",
    "not-sure": "Not Sure Yet 🤔",
    other: "Other 🤔",
  };

  // Admin Notification Message
  const adminMessage = [
    "🔔 *New Lead Alert — NKT Insurance!*",
    "",
    `👤 Name: ${name}`,
    `📱 Phone: ${phone}`,
    `📋 Interest: ${interestLabel[interest] || interest}`,
    `🕐 Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    "",
    "👉 Reply within 30 minutes!",
  ].join("\n");

  let adminAlertSuccess = false;
  try {
    const adminResponse = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: ADMIN,
        type: "text",
        text: { body: adminMessage },
      }),
    });
    
    adminAlertSuccess = adminResponse.ok;
    if (!adminResponse.ok) {
      console.error("[WhatsApp] Admin alert failed:", await adminResponse.json());
    } else {
      console.log("[WhatsApp] Admin alert sent successfully to", ADMIN);
    }
  } catch (err) {
    console.error("[WhatsApp] Admin alert exception:", err);
  }

  // Customer Auto-Confirmation Message
  const rawPhone = phone.replace(/\D/g, "");
  const toNumber = rawPhone.startsWith("91") ? rawPhone : `91${rawPhone}`;

  const customerMessage = [
    `Hi ${name}! 👋`,
    "",
    "Thank you for contacting *NKT Insurance*! ✅",
    "",
    "We have received your request. Our advisor will call or WhatsApp you within *30 minutes* during business hours (9 AM – 8 PM).",
    "",
    "📞 You can also reach us directly:",
    "WhatsApp: +91 99400 89442",
    "",
    "— NKT Insurance Team 🏥",
  ].join("\n");

  let customerConfirmationSuccess = false;
  try {
    const customerResponse = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: toNumber,
        type: "text",
        text: { body: customerMessage },
      }),
    });

    customerConfirmationSuccess = customerResponse.ok;
    if (!customerResponse.ok) {
      console.error("[WhatsApp] Customer confirmation failed:", await customerResponse.json());
    } else {
      console.log("[WhatsApp] Customer confirmation sent successfully to", toNumber);
    }
  } catch (err) {
    console.error("[WhatsApp] Customer confirmation exception:", err);
  }

  return {
    lead,
    adminAlertSuccess,
    customerConfirmationSuccess,
  };
}

// GET root route to verify backend is active (Health check)
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "NKT Insurance Backend Server is running successfully.",
    databaseStatus: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    timestamp: new Date()
  });
});

// Unified POST route for lead submission (supports both endpoints for compatibility)
app.post("/api/leads", async (req, res) => {
  const { name, phone, interest } = req.body;
  if (!name || !phone || !interest) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  try {
    const result = await handleNewLeadProcessing(req.body);
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    console.error("[Backend] Lead processing error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Backward compatibility redirect/alias
app.post("/api/whatsapp/notify", async (req, res) => {
  const { name, phone, interest } = req.body;
  if (!name || !phone || !interest) {
    return res.status(400).json({ success: false, error: "Missing required fields." });
  }

  try {
    const result = await handleNewLeadProcessing(req.body);
    res.status(200).json({ success: result.adminAlertSuccess, ...result });
  } catch (error) {
    console.error("[Backend] Notification endpoint error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// GET route to fetch all leads (used by separate Admin Panel CRM)
app.get("/api/leads", async (req, res) => {
  try {
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error("[Backend] Fetch leads error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// PATCH route to update any of a lead's fields (used by separate Admin Panel CRM)
app.patch("/api/leads/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const lead = await Lead.findByIdAndUpdate(id, updateData, { new: true });
    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found." });
    }

    res.json({ success: true, lead });
  } catch (error) {
    console.error("[Backend] Update lead error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// DELETE route to delete a lead (used by separate Admin Panel CRM)
app.delete("/api/leads/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({ success: false, error: "Lead not found." });
    }
    res.json({ success: true, message: "Lead deleted successfully." });
  } catch (error) {
    console.error("[Backend] Delete lead error:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// POST route to securely authenticate admin CRM logins using environment variables
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;
  const expectedUsername = process.env.ADMIN_USERNAME || "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD || "admin123";

  if (username === expectedUsername && password === expectedPassword) {
    return res.json({ success: true, username });
  } else {
    return res.status(401).json({ success: false, error: "Invalid credentials." });
  }
});

// GET route for WhatsApp Webhook verification (Meta verification challenge)
app.get("/api/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  const verifyToken = process.env.VITE_WA_VERIFY_TOKEN || "nkt_insurance_verification_token";

  if (mode && token) {
    if (mode === "subscribe" && token === verifyToken) {
      console.log("[Webhook] WhatsApp Webhook verified successfully.");
      return res.status(200).send(challenge);
    } else {
      console.warn("[Webhook] Verification token mismatch.");
      return res.sendStatus(403);
    }
  }
  return res.sendStatus(400);
});

// POST route for WhatsApp Webhook event receipt
app.post("/api/webhook", (req, res) => {
  const body = req.body;
  console.log("[Webhook] Received event payload:", JSON.stringify(body, null, 2));
  res.status(200).send("EVENT_RECEIVED");
});

app.listen(PORT, () => {
  console.log(`[Server] Express server running on port ${PORT}`);
});
