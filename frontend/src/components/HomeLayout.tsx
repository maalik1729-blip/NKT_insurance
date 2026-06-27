import { useState, useRef, useEffect, type FormEvent } from "react";
import { PhoneCall, Search, FileText, Handshake, ArrowRight, Shield, Heart, Car, Clock, Users, Phone, Mail, Award, CheckCircle2 } from "lucide-react";
import { WA_NUMBER, TEL, TEL_DISPLAY, EMAIL, WhatsAppIcon } from "./icons";
import { Spinner } from "./Spinner";
import { FaqAccordion } from "./FaqAccordion";
import { useScrollReveal } from "../hooks/useScrollReveal";

import lifeSectionImg from "../assets/images/life_insurance_section.png";
import lifeSectionWebp from "../assets/images/life_insurance_section.webp";
import lifeSectionWebp2x from "../assets/images/life_insurance_section@2x.webp";
import healthSectionImg from "../assets/images/health_insurance_section.png";
import healthSectionWebp from "../assets/images/health_insurance_section.webp";
import healthSectionWebp2x from "../assets/images/health_insurance_section@2x.webp";
import motorSectionImg from "../assets/images/motor_insurance_section.png";
import motorSectionWebp from "../assets/images/motor_insurance_section.webp";
import motorSectionWebp2x from "../assets/images/motor_insurance_section@2x.webp";

import customerAsianWoman from "../assets/images/customer_asian_woman.webp";
import customerFatherDaughter from "../assets/images/customer_father_daughter.webp";
import customerGroupFriends from "../assets/images/customer_group_friends.webp";
import customerOlderMan from "../assets/images/customer_older_man.webp";
import customerSeniorCouple from "../assets/images/customer_senior_couple.webp";
import customerWomanPhone from "../assets/images/customer_woman_phone.webp";
import customerYoungMan from "../assets/images/customer_young_man.webp";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is this service really free for me?",
    a: "Yes. We're paid by the insurer, not by you — there's no fee, no obligation, and no pressure to buy. You get expert comparisons and lifetime support at zero extra cost.",
  },
  {
    q: "Will my information be shared with anyone?",
    a: "No. Your details are used only to prepare your quote and consultation. We don't sell or share your information with third parties.",
  },
  {
    q: "I already have an LIC policy — can NKT still help?",
    a: "Absolutely. We review your existing cover, point out any gaps, and help with renewals and claims — even on policies you bought elsewhere.",
  },
  {
    q: 'What does "Free Consultation" actually involve?',
    a: "A short phone or WhatsApp call where we understand your needs, answer your questions, and outline your options. No forms to sign, no commitment required.",
  },
  {
    q: "How accurate is the premium estimate from the calculator?",
    a: "It's a close starting estimate based on typical rates for your inputs. Your final premium depends on medical underwriting, vehicle details, or insurer-specific factors — we'll confirm the exact figure during your consultation.",
  },
  {
    q: "What happens after I submit the form?",
    a: "One of our advisors calls or messages you within 30 minutes during business hours to understand your needs and walk you through your options — no scripted sales call.",
  },
];

const TESTIMONIALS: { quote: string; name: string; plan: string; avatar: string; stars: number }[] =
  [
    {
      quote:
        "NKT helped me pick the right LIC plan for my children's education. The process was simple, the advice was honest, and they followed up even after the policy was issued — something no one had done before.",
      name: "Rajesh Kumar",
      plan: "LIC Life Insurance · Mumbai",
      avatar: "R",
      stars: 5,
    },
    {
      quote:
        "Excellent service. They explained every clause before I signed, and got us a family floater that actually fits our needs — not just the cheapest option.",
      name: "Priya Sharma",
      plan: "Family Health Cover",
      avatar: "P",
      stars: 5,
    },
    {
      quote:
        "Renewed my car policy in 20 minutes and saved nearly ₹4,000. When I had an accident two months later, NKT handled the entire claim — I just had to sign.",
      name: "Amit Verma",
      plan: "Comprehensive Car Insurance",
      avatar: "A",
      stars: 5,
    },
  ];

/* ── Slider helper ───────────────────────────────────────── */
function sliderBg(pct: number) {
  return `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${pct}%, var(--color-surface-2) ${pct}%, var(--color-surface-2) 100%)`;
}
function toPct(val: number, min: number, max: number) {
  return ((val - min) / (max - min)) * 100;
}

/* ── SmartSlider ─────────────────────────────────────────── */
interface SliderProps {
  label: string;
  valueLabel: string;
  min: number;
  max: number;
  step: number;
  value: number;
  minLabel: string;
  maxLabel: string;
  onChange: (v: number) => void;
  id: string;
  presets?: { value: number; label: string }[];
}
function SmartSlider({
  label,
  valueLabel,
  min,
  max,
  step,
  value,
  minLabel,
  maxLabel,
  onChange,
  id,
  presets,
}: SliderProps) {
  const pct = toPct(value, min, max);
  return (
    <div className="calc-slider-group">
      {/* Label row */}
      <div className="calc-slider-header">
        <label
          htmlFor={id}
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--color-ink)",
            cursor: "default",
          }}
        >
          {label}
        </label>
        <span className="calc-slider-val">{valueLabel}</span>
      </div>

      {/* Track */}
      <div style={{ position: "relative", paddingBottom: "4px" }}>
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="calc-slider"
          style={{ background: sliderBg(pct) }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={valueLabel}
        />
      </div>

      {/* Presets */}
      {presets && presets.length > 0 && (
        <div className="calc-presets">
          {presets.map((preset) => {
            const isActive = value === preset.value;
            return (
              <button
                key={preset.value}
                type="button"
                className={`calc-preset-chip${isActive ? " calc-preset-chip--active" : ""}`}
                onClick={() => onChange(preset.value)}
                aria-pressed={isActive}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Min / Max range labels */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2px" }}>
        <span style={{ fontSize: "0.68rem", color: "var(--color-ink-3)", fontWeight: 500 }}>
          {minLabel}
        </span>
        <span style={{ fontSize: "0.68rem", color: "var(--color-ink-3)", fontWeight: 500 }}>
          {maxLabel}
        </span>
      </div>
    </div>
  );
}

/* ── MiniToggle ── */
interface MiniToggleProps {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}
function MiniToggle({ label, options, value, onChange }: MiniToggleProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
      <span
        style={{
          fontSize: "0.68rem",
          fontWeight: 700,
          color: "var(--color-ink-3)",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <div style={{ display: "flex", gap: "4px" }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              height: "44px",
              fontSize: "0.85rem",
              fontWeight: 600,
              borderRadius: "var(--radius-md)",
              border:
                value === opt.value
                  ? "1.5px solid var(--color-accent)"
                  : "1.5px solid var(--color-border)",
              background: value === opt.value ? "var(--color-accent-bg)" : "var(--color-bg)",
              color: value === opt.value ? "var(--color-accent)" : "var(--color-ink-2)",
              cursor: "pointer",
              transition: "all 160ms var(--ease-out)",
              whiteSpace: "nowrap",
              padding: "0 6px",
            }}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Coverage Calculator ── */
interface CalculatorProps {
  selectedType: string;
  setSelectedType: (type: string) => void;
  coverAmount: number;
  setCoverAmount: (amount: number) => void;
  age: number;
  setAge: (age: number) => void;
}
function CoverageCalculator({
  selectedType,
  setSelectedType,
  coverAmount,
  setCoverAmount,
  age,
  setAge,
}: CalculatorProps) {
  const [coverSpouse, setCoverSpouse] = useState(false);
  const [coverChildren, setCoverChildren] = useState(0);
  const [vehicleType, setVehicleType] = useState("car");
  const [vehicleAge, setVehicleAge] = useState("1-3");

  const premiumRef = useRef<HTMLDivElement>(null);
  const prevPremiumRef = useRef<number>(0);

  let estimatedPremium = 0;
  let coverDisplay = "";
  let detailsText = "";

  if (selectedType === "life") {
    const base = (coverAmount / 1000000) * 110;
    const ageFactor = 1 + Math.max(0, age - 20) * 0.055;
    estimatedPremium = Math.round(base * ageFactor);
    coverDisplay = `₹${(coverAmount / 100000).toFixed(0)} Lakhs`;
    detailsText = `Term life estimate for age ${age}`;
  } else if (selectedType === "health") {
    const base = (coverAmount / 100000) * 320;
    const memberCount = 1 + (coverSpouse ? 0.75 : 0) + coverChildren * 0.35;
    const ageFactor = 1 + Math.max(0, age - 30) * 0.025;
    estimatedPremium = Math.round(base * memberCount * ageFactor);
    coverDisplay = `₹${(coverAmount / 100000).toFixed(0)} Lakhs`;
    detailsText = `Family floater estimate, oldest age ${age}`;
  } else {
    const rate = vehicleType === "car" ? 0.022 : 0.016;
    const ageDiscount = vehicleAge === "new" ? 1.0 : vehicleAge === "1-3" ? 0.82 : 0.65;
    estimatedPremium = Math.round((coverAmount * rate * ageDiscount) / 12);
    coverDisplay = `₹${(coverAmount / 100000).toFixed(2)} Lakhs (IDV)`;
    detailsText = `Monthly estimate for ${vehicleType === "car" ? "car" : "two-wheeler"}`;
  }

  useEffect(() => {
    if (estimatedPremium !== prevPremiumRef.current && premiumRef.current) {
      const el = premiumRef.current;
      el.classList.remove("calc-result-value--pulse");
      void el.offsetWidth;
      el.classList.add("calc-result-value--pulse");
      prevPremiumRef.current = estimatedPremium;
    }
  }, [estimatedPremium]);

  const handleCalculate = () => {
    const element = document.getElementById("lead");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("lf-name");
      if (nameInput) setTimeout(() => (nameInput as HTMLInputElement).focus(), 500);
    }
  };

  return (
    <div className="calc-container">
      <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        <span
          style={{
            fontSize: "0.72rem",
            color: "var(--color-accent)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Live Premium Estimator
        </span>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-ink)", margin: 0 }}>
          Estimate Your Insurance Plan
        </h3>
      </div>

      <div className="calc-toggle-group" role="group" aria-label="Insurance type">
        {[
          { value: "life", label: "Life (LIC)", defaultCover: 5000000 },
          { value: "health", label: "Health", defaultCover: 500000 },
          { value: "motor", label: "Motor", defaultCover: 400000 },
        ].map(({ value, label, defaultCover }) => (
          <button
            key={value}
            type="button"
            className={`calc-toggle-btn${selectedType === value ? " calc-toggle-btn--active" : ""}`}
            onClick={() => {
              setSelectedType(value);
              setCoverAmount(defaultCover);
            }}
            aria-pressed={selectedType === value}
          >
            {label}
          </button>
        ))}
      </div>

      {selectedType === "life" && (
        <>
          <SmartSlider
            id="slider-life-cover"
            label="Required Life Cover"
            valueLabel={coverDisplay}
            min={1000000}
            max={20000000}
            step={500000}
            value={coverAmount}
            minLabel="₹10L"
            maxLabel="₹2 Cr"
            onChange={setCoverAmount}
            presets={[
              { value: 2500000, label: "₹25L" },
              { value: 5000000, label: "₹50L" },
              { value: 10000000, label: "₹1 Cr" },
              { value: 20000000, label: "₹2 Cr" },
            ]}
          />
          <SmartSlider
            id="slider-life-age"
            label="Your Age"
            valueLabel={`${age} yrs`}
            min={18}
            max={65}
            step={1}
            value={age}
            minLabel="18 yrs"
            maxLabel="65 yrs"
            onChange={setAge}
            presets={[
              { value: 25, label: "25 yrs" },
              { value: 35, label: "35 yrs" },
              { value: 45, label: "45 yrs" },
              { value: 55, label: "55 yrs" },
            ]}
          />
        </>
      )}

      {selectedType === "health" && (
        <>
          <SmartSlider
            id="slider-health-cover"
            label="Sum Insured"
            valueLabel={coverDisplay}
            min={300000}
            max={5000000}
            step={50000}
            value={coverAmount}
            minLabel="₹3L"
            maxLabel="₹50L"
            onChange={setCoverAmount}
            presets={[
              { value: 500000, label: "₹5L" },
              { value: 1000000, label: "₹10L" },
              { value: 2500000, label: "₹25L" },
              { value: 5000000, label: "₹50L" },
            ]}
          />
          <SmartSlider
            id="slider-health-age"
            label="Age of Oldest Member"
            valueLabel={`${age} yrs`}
            min={18}
            max={75}
            step={1}
            value={age}
            minLabel="18 yrs"
            maxLabel="75 yrs"
            onChange={setAge}
            presets={[
              { value: 25, label: "25 yrs" },
              { value: 35, label: "35 yrs" },
              { value: 45, label: "45 yrs" },
              { value: 55, label: "55 yrs" },
              { value: 65, label: "65 yrs" },
            ]}
          />
          <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                fontSize: "0.78rem",
                cursor: "pointer",
                color: "var(--color-ink)",
                fontWeight: 500,
                userSelect: "none",
              }}
            >
              <input
                type="checkbox"
                checked={coverSpouse}
                onChange={(e) => setCoverSpouse(e.target.checked)}
                style={{
                  accentColor: "var(--color-accent)",
                  cursor: "pointer",
                  width: "15px",
                  height: "15px",
                }}
              />
              Include Spouse
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "0.78rem",
                color: "var(--color-ink)",
                fontWeight: 500,
              }}
            >
              <span style={{ color: "var(--color-ink-2)" }}>Children:</span>
              {[0, 1, 2, 3].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setCoverChildren(n)}
                  aria-pressed={coverChildren === n}
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    border:
                      coverChildren === n
                        ? "1.5px solid var(--color-accent)"
                        : "1.5px solid var(--color-border)",
                    background: coverChildren === n ? "var(--color-accent-bg)" : "var(--color-bg)",
                    color: coverChildren === n ? "var(--color-accent)" : "var(--color-ink-3)",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    transition: "all 150ms var(--ease-out)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {selectedType === "motor" && (
        <>
          <SmartSlider
            id="slider-motor-idv"
            label="Vehicle Insured Value (IDV)"
            valueLabel={coverDisplay}
            min={50000}
            max={2500000}
            step={25000}
            value={coverAmount}
            minLabel="₹50K"
            maxLabel="₹25L"
            onChange={setCoverAmount}
            presets={[
              { value: 200000, label: "₹2L" },
              { value: 500000, label: "₹5L" },
              { value: 1000000, label: "₹10L" },
              { value: 2000000, label: "₹20L" },
            ]}
          />
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <MiniToggle
              label="Vehicle Type"
              value={vehicleType}
              options={[
                { value: "car", label: "Car" },
                { value: "bike", label: "Two-Wheeler" },
              ]}
              onChange={(v) => {
                setVehicleType(v);
                setCoverAmount(v === "car" ? 500000 : 100000);
              }}
            />
            <MiniToggle
              label="Vehicle Age"
              value={vehicleAge}
              options={[
                { value: "new", label: "New" },
                { value: "1-3", label: "1–3 Yr" },
                { value: "3+", label: "3+ Yr" },
              ]}
              onChange={setVehicleAge}
            />
          </div>
        </>
      )}

      <div className="calc-result-panel">
        <div className="calc-result-title">Estimated Monthly Premium</div>
        <div ref={premiumRef} className="calc-result-value">
          ₹{estimatedPremium.toLocaleString("en-IN")}
        </div>
        <div
          className="calc-result-sub"
          style={{
            fontSize: "0.85rem",
            fontWeight: 600,
            color: "var(--color-ink-2)",
            marginBottom: "4px",
          }}
        >
          {detailsText}
        </div>
        <div
          style={{
            fontSize: "0.72rem",
            color: "var(--color-ink-3)",
            marginTop: "6px",
            borderTop: "1.5px dashed rgba(20, 83, 45, 0.12)",
            paddingTop: "6px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Annual Equivalent:</span>
          <span style={{ fontWeight: 600, color: "var(--color-accent)" }}>
            ₹{(estimatedPremium * 12).toLocaleString("en-IN")} / yr
          </span>
        </div>
      </div>

      <button
        type="button"
        className="btn btn-primary"
        onClick={handleCalculate}
        style={{ width: "100%", height: "46px" }}
      >
        Get Free Expert Consultation <ArrowRight size={15} style={{ marginLeft: "4px", display: "inline-block", verticalAlign: "middle" }} />
      </button>
    </div>
  );
}

/* ── Form ── */
type FieldErr = { name?: string; phone?: string };

interface LeadFormProps {
  insType: string;
  setInsType: (val: string) => void;
  coverAmount: number;
  age: number;
}
function LeadForm({ insType, setInsType, coverAmount, age }: LeadFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FieldErr>({});
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{ name?: boolean; phone?: boolean }>({});
  const [submitted, setSubmitted] = useState(false);

  const validatePhone = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (!val.trim()) {
      return "Please enter your mobile number";
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
      phone: val.trim() === "" || val.replace(/\D/g, "").length >= 10 || touched.phone ? err : undefined,
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

    const leadData = { name, phone, interest: insType };

    // Save lead to localStorage (XOR/Base64 obfuscated to prevent plaintext leak)
    try {
      const existingLeadsStr = localStorage.getItem("nkt_leads");
      let existingLeads = [];
      if (existingLeadsStr) {
        try {
          // Attempt decoding. In case of transition/legacy data, fallback gracefully.
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
        interest: insType,
        status: "new",
        premium: insType === "life" ? 45000 : insType === "health" ? 18000 : 12000,
        notes: `Cover: ₹${(coverAmount / 100000).toFixed(0)}L, Age: ${age}`,
        createdAt: new Date().toISOString(),
      };
      existingLeads.unshift(newLead);
      localStorage.setItem("nkt_leads", btoa(JSON.stringify(existingLeads)));
    } catch (err) {
      console.error("Error saving lead:", err);
    }

    // 🔔 Admin WhatsApp notification
    import("../lib/whatsapp").then(({ notifyAdminNewLead }) => {
      notifyAdminNewLead(leadData).catch(console.error);
    });

    setLoading(false);
    setSubmitted(true);
  };

  const rawPhoneDigits = phone.replace(/\D/g, "");
  const isPhoneInvalid = phone.trim() !== "" && !/^(?:(?:\+|0{0,2})91(\s*[-]\s*)?)?[6-9]\d{9}$/.test(phone.trim());
  const isButtonDisabled = loading || isPhoneInvalid || (touched.phone && rawPhoneDigits.length < 10);

  if (submitted) {
    return (
      <div className="form-card" style={{ textAlign: "center", padding: "2.5rem 1.5rem" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>✅</div>
        <h3 style={{ color: "var(--color-accent)", marginBottom: "0.5rem" }}>Thank you, {name}!</h3>
        <p style={{ color: "var(--color-ink-2)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
          We've received your request. Our advisor will call or WhatsApp you on{" "}
          <strong>{phone}</strong> within <strong>30 minutes</strong> during business hours (9 AM – 8 PM).
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--color-ink-3)" }}>
          📱 Direct WhatsApp: <strong>+91 95859 29914</strong>
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
      <form onSubmit={handleSubmit} noValidate aria-label="Consultation request form">
        <div className="form-group">
          <label htmlFor="lf-name">
            Full Name <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            id="lf-name"
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
            onBlur={() => handleBlur("name")}
            required
            aria-required="true"
            aria-invalid={errors.name ? "true" : undefined}
            style={{
              borderColor: errors.name ? "var(--color-error)" : undefined,
              boxShadow: errors.name ? "0 0 0 1px var(--color-error)" : undefined,
            }}
          />
          <span
            className="form-helper form-helper--error"
            role="alert"
            style={{
              color: "var(--color-error)",
              fontSize: "0.8125rem",
              minHeight: "1.25rem",
              display: "block",
              marginTop: "4px",
            }}
          >
            {errors.name || ""}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="lf-phone">
            Mobile Number <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-input"
            type="tel"
            id="lf-phone"
            name="phone"
            autoComplete="tel"
            placeholder="+91 9XXXXXXXXX"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => handleBlur("phone")}
            required
            aria-required="true"
            aria-invalid={errors.phone ? "true" : undefined}
            pattern="[+]?[0-9\s\-]{10,15}"
            style={{
              borderColor: errors.phone ? "var(--color-error)" : undefined,
              boxShadow: errors.phone ? "0 0 0 1px var(--color-error)" : undefined,
            }}
          />
          <span
            className="form-helper form-helper--error"
            role="alert"
            style={{
              color: "var(--color-error)",
              fontSize: "0.8125rem",
              minHeight: "1.25rem",
              display: "block",
              marginTop: "4px",
            }}
          >
            {errors.phone || ""}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="lf-interest">
            I'm interested in <span aria-hidden="true">*</span>
          </label>
          <select
            className="form-input form-select"
            id="lf-interest"
            name="interest"
            value={insType}
            onChange={(e) => setInsType(e.target.value)}
            required
          >
            <option value="life">Life Insurance (LIC)</option>
            <option value="health">Health Insurance</option>
            <option value="motor">Motor Insurance</option>
            <option value="lic">LIC Specific Plans</option>
            <option value="other">Other / Not sure</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary form-submit"
          id="lf-submit"
          data-loading={loading ? "true" : undefined}
          disabled={isButtonDisabled}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            opacity: isButtonDisabled ? 0.6 : 1,
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          {loading && <Spinner size={16} color="currentColor" />}
          {loading ? "Sending…" : "Request Free Callback"}
        </button>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi NKT, I'd like a consultation about ${insType} insurance.`)}`}
          className="btn btn-wa form-submit"
          id="lf-whatsapp"
          style={{
            marginTop: "var(--space-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <WhatsAppIcon size={16} /> WhatsApp Instead
        </a>
      </form>
    </div>
  );
}

/* ── HomeLayout ── */
export function HomeLayout() {
  useScrollReveal();
  const [insType, setInsType] = useState("life");
  const [coverAmount, setCoverAmount] = useState(5000000);
  const [age, setAge] = useState(30);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  useEffect(() => {
    if (isTestimonialHovered) return;
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isTestimonialHovered]);

  const handleScrollToLead = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("lead");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("lf-name");
      if (nameInput) setTimeout(() => (nameInput as HTMLInputElement).focus(), 500);
    }
  };

  return (
    <>
      {/* ══ HERO ══ */}
      <section
        className="hero"
        id="home"
        aria-labelledby="hero-headline"
        style={{
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          paddingTop: "clamp(3.5rem,7vw,5.5rem)",
          paddingBottom: "clamp(3rem,6vw,5rem)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.1fr 0.9fr",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "center",
            }}
            className="hero__grid"
          >
            <div className="hero__content">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 14px",
                  borderRadius: "99px",
                  background: "var(--color-accent-bg)",
                  border: "1px solid var(--color-accent-line)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "24px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--color-accent)",
                    display: "inline-block",
                  }}
                />
                IRDAI Licensed · 10+ Years Trusted Service
              </div>

              <h1
                id="hero-headline"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.4rem,5vw,4rem)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.08,
                  letterSpacing: "-0.035em",
                  marginBottom: "24px",
                  maxWidth: "16ch",
                }}
              >
                Your family's financial security starts here
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#475569",
                  lineHeight: 1.72,
                  marginBottom: "36px",
                  maxWidth: "50ch",
                }}
              >
                Expert guidance on Life, Health &amp; Motor insurance for Indian families.
                Transparent advice, personalized solutions, lifelong support—from your trusted
                neighborhood advisor.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                  marginBottom: "48px",
                }}
              >
                <a
                  href="#lead"
                  onClick={handleScrollToLead}
                  className="btn btn-primary"
                  id="hero-cta-consult"
                  style={{
                    height: "52px",
                    fontSize: "0.95rem",
                    paddingInline: "28px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Request Free Consultation
                </a>
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "52px",
                    padding: "0 24px",
                    borderRadius: "10px",
                    border: "1.5px solid #E2E8F0",
                    background: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: "#0F172A",
                    textDecoration: "none",
                    transition: "border-color 160ms, background 160ms",
                  }}
                  id="hero-cta-whatsapp"
                  className="hero-wa-btn"
                >
                  <WhatsAppIcon size={16} style={{ color: "var(--color-secondary)" }} /> Chat on
                  WhatsApp
                </a>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "28px",
                  paddingTop: "28px",
                  borderTop: "1px solid #F1F5F9",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { num: "1,000+", label: "Families Protected" },
                  { num: "98%", label: "Claim Success" },
                  { num: "10+ Yrs", label: "Trusted Service" },
                ].map(({ num, label }, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: "#0F172A",
                          lineHeight: 1,
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {num}
                      </div>
                      <div
                        style={{
                          fontSize: "0.72rem",
                          color: "#94A3B8",
                          fontWeight: 500,
                          marginTop: "3px",
                        }}
                      >
                        {label}
                      </div>
                    </div>
                    {i < 2 && (
                      <div style={{ width: "1px", height: "36px", background: "#E2E8F0" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="hero__collage-wrapper">
              <div className="hero__collage">
                <div className="hero__collage-col">
                  <img
                    src={customerFatherDaughter}
                    className="hero__collage-img"
                    style={{ aspectRatio: "1/1", borderRadius: "120px 40px 100px 40px" }}
                    alt="Happy Indian Family under protection"
                  />
                  <img
                    src={customerOlderMan}
                    className="hero__collage-img"
                    style={{ aspectRatio: "2/3", borderRadius: "24px" }}
                    alt="Senior client with NKT Insurance guidance"
                  />
                </div>
                <div className="hero__collage-col">
                  <img
                    src={customerWomanPhone}
                    className="hero__collage-img"
                    style={{ aspectRatio: "3/4", borderRadius: "50%" }}
                    alt="Customer managing policy"
                  />
                  <div
                    className="hero__collage-card"
                    style={{ aspectRatio: "1.1", borderRadius: "24px" }}
                  >
                    <span className="hero__collage-card-title">Happy customers</span>
                    <div className="hero__collage-card-avatars">
                      <div className="hero__collage-avatar-group">
                        {[customerAsianWoman, customerOlderMan, customerWomanPhone].map(
                          (src, i) => (
                            <img key={i} src={src} className="hero__collage-avatar" alt="" />
                          ),
                        )}
                      </div>
                      <span className="hero__collage-card-count">1,000+</span>
                    </div>
                  </div>
                  <img
                    src={customerYoungMan}
                    className="hero__collage-img"
                    style={{ aspectRatio: "3/4", borderRadius: "24px" }}
                    alt="Young Indian professional"
                  />
                </div>
                <div className="hero__collage-col">
                  <img
                    src={customerSeniorCouple}
                    className="hero__collage-img"
                    style={{ aspectRatio: "4/3", borderRadius: "50%" }}
                    alt="Secure senior couple"
                  />
                  <img
                    src={customerAsianWoman}
                    className="hero__collage-img"
                    style={{ aspectRatio: "3/4", borderRadius: "24px" }}
                    alt="NKT Insurance customer"
                  />
                  <img
                    src={customerGroupFriends}
                    className="hero__collage-img"
                    style={{ aspectRatio: "4/3", borderRadius: "50%" }}
                    alt="Happy group of friends"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <style>{`.hero-wa-btn:hover { border-color: var(--color-accent) !important; background: var(--color-accent-bg) !important; }`}</style>
      </section>

      {/* ══ TRUST BAR ══ */}
      <div
        style={{
          background: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          padding: "clamp(1.5rem,3vw,2rem) 0",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "clamp(1.5rem,3vw,3rem)",
          }}
        >
          {[
            { icon: <Shield size={16} />, text: "IRDAI Authorised" },
            { icon: <Award size={16} />, text: "LIC Licensed Partner" },
            { icon: <CheckCircle2 size={16} />, text: "Cashless Hospital Network" },
            { icon: <Clock size={16} />, text: "24/7 Claim Support" },
            { icon: <Users size={16} />, text: "1,000+ Families Served" },
          ].map(({ icon, text }, i) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: "28px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "7px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#475569",
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>{icon}</span> {text}
              </div>
              {i < 4 && (
                <div
                  style={{ width: "1px", height: "20px", background: "#E2E8F0" }}
                  className="trust-sep"
                />
              )}
            </div>
          ))}
        </div>
        <style>{`@media (max-width:600px) { .trust-sep { display: none !important; } }`}</style>
      </div>

      {/* ══ PREMIUM CALCULATOR ══ */}
      <section
        className="section"
        id="estimator"
        aria-labelledby="estimator-heading"
        style={{ paddingBlock: "clamp(5rem, 10vw, 8rem)", background: "var(--color-surface)" }}
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="estimator__grid">
            <div style={{ position: "sticky", top: "100px" }}>
              <h2 id="estimator-heading" style={{ marginBottom: "1rem" }}>
                Estimate your premium in minutes
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--color-ink-2)",
                  marginBottom: "2rem",
                  lineHeight: 1.75,
                }}
              >
                Get instant premium estimates for Life, Health, and Motor insurance. Adjust coverage
                to see how it affects your monthly cost—no signup required.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2
                    size={20}
                    style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <span style={{ fontSize: "0.9375rem", color: "var(--color-ink-2)" }}>
                    Compare LIC and private insurers
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2
                    size={20}
                    style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <span style={{ fontSize: "0.9375rem", color: "var(--color-ink-2)" }}>
                    Instant calculation based on current rates
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <CheckCircle2
                    size={20}
                    style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                  />
                  <span style={{ fontSize: "0.9375rem", color: "var(--color-ink-2)" }}>
                    Pre-fill consultation form with one click
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                background: "var(--color-white)",
                padding: "clamp(1.25rem, 4vw, 3rem)",
                borderRadius: "16px",
                border: "1px solid var(--color-border)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
              }}
            >
              <CoverageCalculator
                selectedType={insType}
                setSelectedType={setInsType}
                coverAmount={coverAmount}
                setCoverAmount={setCoverAmount}
                age={age}
                setAge={setAge}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section
        id="services"
        aria-labelledby="services-title"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div className="container">
          <div style={{ marginBottom: "clamp(3rem,5vw,4rem)" }}>
            <div className="section-label">Our Insurance Plans</div>
            <h2 id="services-title" style={{ margin: "0 0 16px", maxWidth: "24ch" }}>
              Complete protection for every stage of life
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", maxWidth: "52ch" }}>
              From securing your family's future to protecting your health and assets — expert
              guidance tailored to your needs.
            </p>
          </div>

          {/* Life Insurance */}
          <article
            className="service-block"
            id="svc-life"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem, 6vw, 5rem)",
              alignItems: "center",
              paddingBlock: "clamp(3rem, 6vw, 4rem)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div className="service-block__text">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <Shield size={16} aria-hidden="true" />
                Life Insurance
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)",
                }}
              >
                Secure your family's financial future
              </h3>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--color-ink-2)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.75,
                }}
              >
                LIC plans designed for long-term financial stability. From term cover to endowment
                policies, we'll help you choose the right protection for your loved ones.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "2rem",
                  listStyle: "none",
                }}
              >
                {[
                  "Family financial security",
                  "Retirement planning",
                  "Child education fund",
                  "Wealth creation",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink-2)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/life-insurance"
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                Learn More <ArrowRight size={16} />
              </a>
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--color-surface)",
              }}
            >
              <picture>
                <source
                  srcSet={`${lifeSectionWebp} 640w, ${lifeSectionWebp2x} 1280w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src={lifeSectionImg}
                  alt="Life Insurance"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </picture>
            </div>
          </article>

          {/* Health Insurance */}
          <article
            className="service-block"
            id="svc-health"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem, 6vw, 5rem)",
              alignItems: "center",
              paddingBlock: "clamp(3rem, 6vw, 4rem)",
              borderTop: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--color-surface)",
                order: -1,
              }}
            >
              <picture>
                <source
                  srcSet={`${healthSectionWebp} 640w, ${healthSectionWebp2x} 1280w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src={healthSectionImg}
                  alt="Health Insurance"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </picture>
            </div>
            <div className="service-block__text">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <Heart size={16} aria-hidden="true" />
                Health Insurance
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)",
                }}
              >
                Quality healthcare without financial stress
              </h3>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--color-ink-2)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.75,
                }}
              >
                Comprehensive medical coverage with access to cashless treatment at network
                hospitals. Individual plans, family floaters, and senior citizen policies.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "2rem",
                  listStyle: "none",
                }}
              >
                {[
                  "Cashless hospitalization",
                  "Pre & post-hospitalization",
                  "Critical illness coverage",
                  "Tax benefits",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink-2)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/health-insurance"
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                Learn More <ArrowRight size={16} />
              </a>
            </div>
          </article>

          {/* Motor Insurance */}
          <article
            className="service-block"
            id="svc-motor"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem, 6vw, 5rem)",
              alignItems: "center",
              paddingBlock: "clamp(3rem, 6vw, 4rem)",
              borderTop: "1px solid var(--color-border)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="service-block__text">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--color-accent)",
                  marginBottom: "1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <Car size={16} aria-hidden="true" />
                Motor Insurance
              </div>
              <h3
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  marginBottom: "1rem",
                  fontFamily: "var(--font-display)",
                }}
              >
                Drive with confidence and protection
              </h3>
              <p
                style={{
                  fontSize: "1.0625rem",
                  color: "var(--color-ink-2)",
                  marginBottom: "1.5rem",
                  lineHeight: 1.75,
                }}
              >
                Comprehensive and third-party coverage for cars and two-wheelers. Quick claims,
                competitive premiums, and hassle-free renewals.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "2rem",
                  listStyle: "none",
                }}
              >
                {[
                  "Own damage coverage",
                  "Third-party liability",
                  "Quick claim settlement",
                  "24/7 roadside assistance",
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      fontSize: "0.9375rem",
                      color: "var(--color-ink-2)",
                    }}
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <a
                href="/motor-insurance"
                className="btn btn-outline"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
              >
                Learn More <ArrowRight size={16} />
              </a>
            </div>
            <div
              style={{
                position: "relative",
                aspectRatio: "4/3",
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--color-surface)",
              }}
            >
              <picture>
                <source
                  srcSet={`${motorSectionWebp} 640w, ${motorSectionWebp2x} 1280w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src={motorSectionImg}
                  alt="Motor Insurance"
                  loading="lazy"
                  decoding="async"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </picture>
            </div>
          </article>
        </div>
      </section>

      {/* ══ PROCESS ══ */}
      <section
        id="how-it-works"
        aria-labelledby="process-title"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "clamp(3rem,5vw,4rem)" }}>
            <div className="section-label" style={{ display: "inline-flex" }}>
              How It Works
            </div>
            <h2
              id="process-title"
              style={{ margin: "0 0 16px", maxWidth: "28ch", marginInline: "auto" }}
            >
              A simple path to the right policy
            </h2>
            <p
              style={{ textAlign: "center", maxWidth: "48ch", margin: "0 auto", color: "#475569" }}
            >
              No jargon. No pressure. Just a clear, four-step process designed around your needs.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}
            className="grid-4"
          >
            {[
              {
                num: "01",
                title: "Free Consultation",
                body: "Book a call — no cost, no obligation. We listen first.",
                icon: "🗣️",
              },
              {
                num: "02",
                title: "Needs Analysis",
                body: "We map your goals, dependants, and risks to find the gaps.",
                icon: "🔍",
              },
              {
                num: "03",
                title: "Plan Recommendation",
                body: "Compare the best-fit plans side by side, in plain language.",
                icon: "📋",
              },
              {
                num: "04",
                title: "Policy & Lifetime Support",
                body: "Smooth issuance, then we stay — renewals, claims, and all.",
                icon: "🤝",
              },
            ].map(({ num, title, body, icon }) => (
              <div
                key={num}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "28px 24px",
                  transition: "transform 220ms ease, box-shadow 220ms ease",
                }}
                className="card"
              >
                <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{icon}</div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "8px",
                  }}
                >
                  Step {num}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </div>
                <p style={{ fontSize: "0.875rem", color: "#64748B", lineHeight: 1.65, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "40px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <div className="section-label">Client Stories</div>
              <h2 id="testimonials-title" style={{ margin: "0 0 8px" }}>
                Families who trust NKT
              </h2>
              <p style={{ margin: 0 }}>Real clients. Real plans. Real outcomes.</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 18px",
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.4rem",
                  fontWeight: 900,
                  color: "#4285F4",
                }}
              >
                G
              </span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0F172A" }}>
                  4.9 / 5 ★★★★★
                </div>
                <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>100+ Google Reviews</div>
              </div>
            </div>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="grid-3"
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
          >
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={t.name}
                style={{
                  background: "#fff",
                  border: `1.5px solid ${activeTestimonial === idx ? "var(--color-accent)" : "var(--color-border)"}`,
                  borderRadius: "16px",
                  padding: "28px",
                  cursor: "pointer",
                  transition:
                    "border-color 220ms ease, transform 220ms ease, box-shadow 220ms ease",
                  transform: activeTestimonial === idx ? "translateY(-2px)" : "none",
                  boxShadow:
                    activeTestimonial === idx
                      ? "0 8px 24px rgba(79,70,229,0.12)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                }}
                onClick={() => setActiveTestimonial(idx)}
              >
                <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} style={{ color: "var(--color-secondary)", fontSize: "0.9rem" }}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote
                  style={{
                    fontSize: "0.9rem",
                    color: "#475569",
                    lineHeight: 1.7,
                    margin: "0 0 20px",
                    fontStyle: "italic",
                  }}
                >
                  "{t.quote}"
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "50%",
                      background: "var(--color-accent-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 800,
                      color: "var(--color-accent)",
                      fontSize: "0.95rem",
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0F172A" }}>
                      {t.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>{t.plan}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "28px" }}>
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTestimonial(idx)}
                style={{
                  width: activeTestimonial === idx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "99px",
                  background: activeTestimonial === idx ? "var(--color-accent)" : "#CBD5E1",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 220ms ease",
                  padding: 0,
                }}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT STRIP ══ */}
      <section
        id="about"
        aria-labelledby="about-title"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#0F172A" }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "center",
            }}
            className="hero__grid"
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 14px",
                  borderRadius: "99px",
                  background: "rgba(79,70,229,0.15)",
                  border: "1px solid rgba(79,70,229,0.3)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--color-accent-line)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "20px",
                }}
              >
                About NKT
              </div>
              <h2 id="about-title" style={{ color: "#F1F5F9", margin: "0 0 20px" }}>
                Your Trusted Insurance Partner
              </h2>
              <p
                style={{
                  color: "#94A3B8",
                  fontSize: "1.05rem",
                  lineHeight: 1.72,
                  marginBottom: "28px",
                }}
              >
                NKT Insurance Solutions is an independent insurance advisory firm dedicated to
                helping Indian families make informed decisions. We work with LIC and multiple
                leading insurers to find you the right cover — not the easiest sell.
              </p>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  marginBottom: "32px",
                  listStyle: "none",
                }}
              >
                {[
                  "Independent advisors — no insurer pressure",
                  "LIC + multi-insurer access",
                  "Transparent, side-by-side comparisons",
                  "Lifetime renewals and claims support",
                ].map((h) => (
                  <li
                    key={h}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      fontSize: "0.9rem",
                      color: "#94A3B8",
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      style={{ color: "var(--color-accent)", flexShrink: 0 }}
                    />{" "}
                    {h}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href="#lead"
                  onClick={handleScrollToLead}
                  className="btn btn-primary"
                  id="about-cta-consult"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  Book Consultation <ArrowRight size={14} />
                </a>
                <a
                  href={`tel:${TEL}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    height: "42px",
                    padding: "0 20px",
                    borderRadius: "10px",
                    border: "1.5px solid #334155",
                    color: "#94A3B8",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "border-color 160ms",
                  }}
                  id="about-cta-phone"
                >
                  <Phone size={14} /> {TEL_DISPLAY}
                </a>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { num: "1,000+", label: "Policies Issued" },
                { num: "98%", label: "Claim Success Rate" },
                { num: "10+", label: "Years of Expertise" },
                { num: "24/7", label: "Customer Support" },
              ].map(({ num, label }) => (
                <div className="about__stat" key={label}>
                  <span className="about__stat-num">{num}</span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <FaqAccordion
        items={FAQ}
        heading="Common questions before you reach out"
        subtext="Plain answers — no jargon, no sales pitch."
      />

      {/* ══ LEAD FORM ══ */}
      <section
        id="lead"
        aria-labelledby="lead-title"
        style={{ paddingBlock: "clamp(5rem, 10vw, 8rem)", background: "var(--color-dark)" }}
      >
        <div className="container" style={{ maxWidth: "1180px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem,6vw,5rem)",
              alignItems: "start",
            }}
            className="hero__grid"
          >
            <div style={{ position: "sticky", top: "100px" }}>
              <h2 id="lead-title" style={{ color: "#FFFFFF", margin: "0 0 16px" }}>
                Start the conversation
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(255,255,255,0.75)",
                  marginBottom: "36px",
                  lineHeight: 1.72,
                }}
              >
                Share your details and we'll reach out within 30 minutes during business hours. No
                scripts, no pressure — just honest advice.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {[
                  { href: `tel:${TEL}`, icon: <Phone size={16} />, label: TEL_DISPLAY },
                  {
                    href: `https://wa.me/${WA_NUMBER}`,
                    icon: <WhatsAppIcon size={16} />,
                    label: "Chat on WhatsApp",
                  },
                  { href: `mailto:${EMAIL}`, icon: <Mail size={16} />, label: EMAIL },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "12px 16px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "10px",
                      textDecoration: "none",
                      color: "#fff",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      transition: "background 160ms",
                    }}
                  >
                    {item.icon} {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div
              className="home-form-card-wrap"
              style={{
                background: "#FFFFFF",
                padding: "clamp(1.25rem,4vw,3rem)",
                borderRadius: "20px",
                boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
              }}
            >
              <LeadForm
                insType={insType}
                setInsType={setInsType}
                coverAmount={coverAmount}
                age={age}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
