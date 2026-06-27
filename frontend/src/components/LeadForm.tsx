import { useState, type FormEvent } from "react";
import { notifyAdminNewLead } from "../lib/whatsapp";

type FieldErr = { name?: string; phone?: string };

export function LeadForm({ heading = "Request a callback" }: { heading?: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErr>({});
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (val: string) => {
    if (!val.trim()) {
      return "Please enter a valid 10-digit number";
    }
    const isIndianPhone = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?)?[6-9]\d{9}$/.test(val.trim());
    if (!isIndianPhone) {
      return "Please enter a valid 10-digit Indian mobile number";
    }
    return "";
  };

  const validateName = (val: string) => {
    if (!val.trim()) {
      return "Please enter your name";
    }
    return "";
  };

  const handlePhoneChange = (val: string) => {
    setPhone(val);
    const err = validatePhone(val);
    setErrors((prev) => ({
      ...prev,
      phone:
        val.trim() === "" || val.replace(/\D/g, "").length >= 10 || touched.phone ? err : undefined,
    }));
  };

  const handleNameChange = (val: string) => {
    setName(val);
    const err = validateName(val);
    setErrors((prev) => ({
      ...prev,
      name: touched.name ? err : undefined,
    }));
  };

  const handleBlur = (field: "name" | "phone") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(name) }));
    } else {
      setErrors((prev) => ({ ...prev, phone: validatePhone(phone) }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });

    const nameErr = validateName(name);
    const phoneErr = validatePhone(phone);

    if (nameErr || phoneErr) {
      setErrors({ name: nameErr, phone: phoneErr });
      return;
    }

    setLoading(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const interest = String(fd.get("interest") || "not-sure");

    const leadData = { name, phone, interest };

    // Save lead to localStorage for the Admin Panel (Base64 encoded to secure PII)
    try {
      const existingLeadsStr = localStorage.getItem("nkt_leads");
      let existingLeads = [];
      if (existingLeadsStr) {
        try {
          const decoded = atob(existingLeadsStr);
          existingLeads = JSON.parse(decoded);
        } catch {
          existingLeads = JSON.parse(existingLeadsStr);
        }
      }
      const newLead = {
        id: "lead_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9),
        name,
        phone,
        email: `${name.toLowerCase().replace(/[^a-z0-9]/g, ".")}@example.com`,
        interest: interest || "not-sure",
        status: "new",
        premium:
          interest === "life"
            ? 45000
            : interest === "health"
              ? 18000
              : interest === "motor"
                ? 12000
                : 20000,
        notes: `Submitted callback request from website callback form.`,
        createdAt: new Date().toISOString(),
      };
      existingLeads.unshift(newLead);
      localStorage.setItem("nkt_leads", btoa(JSON.stringify(existingLeads)));
    } catch (err) {
      console.error("Error saving lead to localStorage:", err);
    }

    // 🔔 WhatsApp Notification — Admin-க்கு alert அனுப்புவோம்
    notifyAdminNewLead(leadData).catch((err) => console.error("WhatsApp notification error:", err));

    // ✅ Redirect வேண்டாம் — Success screen காட்டுவோம்
    setLoading(false);
    setSubmitted(true);
  };

  const rawPhoneDigits = phone.replace(/\D/g, "");
  const isPhoneInvalid =
    phone.trim() !== "" && (rawPhoneDigits.length < 10 || rawPhoneDigits.length > 15);
  const isButtonDisabled =
    loading || isPhoneInvalid || (touched.phone && rawPhoneDigits.length < 10);

  // ✅ SUCCESS SCREEN — Customer-க்கு Thank You message
  if (submitted) {
    return (
      <div className="form-card" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✅</div>
        <h3 style={{ color: "var(--color-primary, #16a34a)", marginBottom: "0.5rem" }}>
          Thank you, {name}!
        </h3>
        <p
          style={{
            color: "var(--color-text-muted, #555)",
            marginBottom: "1.25rem",
            lineHeight: 1.6,
          }}
        >
          We've received your request. Our advisor will call or WhatsApp you on{" "}
          <strong>{phone}</strong> within <strong>30 minutes</strong> during business hours (9 AM –
          8 PM).
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted, #888)" }}>
          📱 You can also reach us directly on WhatsApp: <strong>+91 95859 29914</strong>
        </p>
        <button
          className="btn btn-primary form-submit"
          style={{ marginTop: "1.25rem" }}
          onClick={() => {
            setSubmitted(false);
            setName("");
            setPhone("");
          }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h3>{heading}</h3>
      <form onSubmit={handleSubmit} noValidate aria-label="Consultation request form">
        <div className="form-group">
          <label htmlFor="name">
            Your name <span>*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Ramesh Kumar"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => handleBlur("name")}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby="name-helper"
          />
          <span
            className="form-helper"
            id="name-helper"
            aria-live="polite"
            data-error={errors.name ? "true" : undefined}
          >
            {errors.name || "\u00A0"}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            WhatsApp / mobile number <span>*</span>
          </label>
          <input
            className="form-input"
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleBlur("phone")}
            required
            aria-required="true"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby="phone-helper"
            pattern="[+]?[0-9\s\-]{10,15}"
          />
          <span
            className="form-helper"
            id="phone-helper"
            aria-live="polite"
            data-error={errors.phone ? "true" : undefined}
          >
            {errors.phone || "\u00A0"}
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="interest">I'm interested in</label>
          <select className="form-input form-select" id="interest" name="interest" defaultValue="">
            <option value="">Select insurance type</option>
            <option value="life">Life Insurance</option>
            <option value="health">Health Insurance</option>
            <option value="motor">Motor Insurance</option>
            <option value="multiple">Multiple types</option>
            <option value="not-sure">Not sure yet</option>
          </select>
          <span className="form-helper">&nbsp;</span>
        </div>
        <button
          type="submit"
          className="btn btn-primary form-submit"
          aria-label="Submit consultation request"
          disabled={isButtonDisabled}
          style={{
            opacity: isButtonDisabled ? 0.6 : 1,
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Sending…" : "Book my free consultation →"}
        </button>
        <p className="form-note">
          We'll call or WhatsApp you within 30 minutes during business hours (9 AM – 8 PM).
        </p>
      </form>
    </div>
  );
}
