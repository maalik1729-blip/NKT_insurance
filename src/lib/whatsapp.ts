import { createServerFn } from "@tanstack/react-start";

// WhatsApp Business API — NKT Insurance
// Meta Graph API v18.0

const PHONE_NUMBER_ID = import.meta.env.VITE_WA_PHONE_NUMBER_ID;
const ACCESS_TOKEN = import.meta.env.VITE_WA_ACCESS_TOKEN;
const API_URL = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;

// Admin number — .env-ல் VITE_WA_ADMIN_NUMBER set பண்ணு
const ADMIN_WA_NUMBER = import.meta.env.VITE_WA_ADMIN_NUMBER || "919940089442";

interface LeadData {
  name: string;
  phone: string;
  interest: string;
}

// Meta WhatsApp API-க்கு message அனுப்பும் helper
async function sendWAMessage(to: string, message: string): Promise<boolean> {
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.warn("WhatsApp API credentials not configured in .env");
    return false;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: message },
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("WhatsApp API error:", err);
      return false;
    }

    const data = await response.json();
    console.log("WhatsApp message sent:", data);
    return true;
  } catch (error) {
    console.error("WhatsApp send failed:", error);
    return false;
  }
}

// Server Function - runs strictly on the server (no token exposure to client!)
const notifyAdminNewLeadServer = createServerFn({ method: "POST" })
  .validator((lead: LeadData) => lead)
  .handler(async ({ data: lead }) => {
    const PHONE_ID = process.env.VITE_WA_PHONE_NUMBER_ID || import.meta.env.VITE_WA_PHONE_NUMBER_ID;
    const TOKEN = process.env.VITE_WA_ACCESS_TOKEN || import.meta.env.VITE_WA_ACCESS_TOKEN;
    const ADMIN =
      process.env.VITE_WA_ADMIN_NUMBER || import.meta.env.VITE_WA_ADMIN_NUMBER || "919940089442";

    if (!PHONE_ID || !TOKEN) {
      console.warn("WhatsApp API credentials not configured in environment");
      return false;
    }

    const interestLabel: Record<string, string> = {
      life: "Life Insurance 🏥",
      health: "Health Insurance 💊",
      motor: "Motor Insurance 🚗",
      lic: "LIC Plans 📋",
      multiple: "Multiple Insurance 📋",
      "not-sure": "Not Sure Yet 🤔",
      other: "Other 🤔",
    };

    // 1️⃣ Admin Alert Message
    const adminMessage = [
      "🔔 *New Lead Alert — NKT Insurance!*",
      "",
      `👤 Name: ${lead.name}`,
      `📱 Phone: ${lead.phone}`,
      `📋 Interest: ${interestLabel[lead.interest] || lead.interest}`,
      `🕐 Time: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
      "",
      "👉 Reply within 30 minutes!",
    ].join("\n");

    let adminAlertSuccess = false;
    try {
      const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
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
      adminAlertSuccess = response.ok;
      if (!response.ok) {
        console.error("[WhatsApp] Admin alert failed:", await response.json());
      } else {
        console.log("[WhatsApp] Admin alert sent successfully");
      }
    } catch (err) {
      console.error("[WhatsApp] Admin alert exception:", err);
    }

    // 2️⃣ Customer Auto Confirmation Message
    const rawPhone = lead.phone.replace(/\D/g, "");
    const toNumber = rawPhone.startsWith("91") ? rawPhone : `91${rawPhone}`;

    const customerMessage = [
      `Hi ${lead.name}! 👋`,
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
      const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
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
      customerConfirmationSuccess = response.ok;
      if (!response.ok) {
        console.error("[WhatsApp] Customer confirmation failed:", await response.json());
      } else {
        console.log("[WhatsApp] Customer confirmation sent successfully");
      }
    } catch (err) {
      console.error("[WhatsApp] Customer confirmation exception:", err);
    }

    // Return true if at least the admin alert worked
    return adminAlertSuccess;
  });

// Server API route-ஐ Server Function ஆக மாற்றிவிட்டோம் (CORS fix & Production compatibility!)
export async function notifyAdminNewLead(lead: LeadData): Promise<boolean> {
  try {
    const success = await notifyAdminNewLeadServer({ data: lead });
    return success ?? false;
  } catch (error) {
    console.error("WhatsApp notify failed:", error);
    return false;
  }
}

// 2️⃣ Customer-க்கு auto confirmation message அனுப்புவோம் (Server Function wrapper)
export async function sendCustomerConfirmation(lead: LeadData): Promise<boolean> {
  return notifyAdminNewLead(lead);
}
