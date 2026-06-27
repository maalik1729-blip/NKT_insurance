interface LeadData {
  name: string;
  phone: string;
  interest: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Notifies the administrator and customer via the backend WhatsApp Express API.
 * @param lead The lead details (name, phone, interest)
 * @returns Promise<boolean> True if notification succeeded
 */
export async function notifyAdminNewLead(lead: LeadData): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      console.error("[WhatsApp Client] API call failed with status:", response.status);
      return false;
    }

    const data = await response.json();
    return data.success ?? false;
  } catch (error) {
    console.error("[WhatsApp Client] API call exception:", error);
    return false;
  }
}

/**
 * Wrapper for sending customer confirmation message
 */
export async function sendCustomerConfirmation(lead: LeadData): Promise<boolean> {
  return notifyAdminNewLead(lead);
}
