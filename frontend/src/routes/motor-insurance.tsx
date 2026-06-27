import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Car, CheckCircle2, ShieldCheck, FileText, Wrench, Zap, ArrowRight } from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";
import motorSectionImg from "../assets/images/motor_insurance_section.png";
import motorSectionWebp from "../assets/images/motor_insurance_section.webp";
import motorSectionWebp2x from "../assets/images/motor_insurance_section@2x.webp";

const TITLE = "Motor Insurance — Car & Bike | NKT Insurance Solutions";
const DESC =
  "Car and two-wheeler insurance with real claim support. Compare comprehensive, third-party, and zero-dep plans. Renew in 15 minutes with NKT.";

export const Route = createFileRoute("/motor-insurance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/motor-insurance" }],
  }),
  component: MotorInsurancePage,
});

const COVERAGE_ROWS = [
  { feature: "Third-party injury/death liability", tp: "✓", comp: "✓", zeroDep: "✓" },
  { feature: "Third-party property damage", tp: "✓", comp: "✓", zeroDep: "✓" },
  { feature: "Own vehicle damage (accident)", tp: "✗", comp: "✓", zeroDep: "✓" },
  { feature: "Theft of vehicle", tp: "✗", comp: "✓", zeroDep: "✓" },
  { feature: "Natural calamity damage (flood, etc.)", tp: "✗", comp: "✓", zeroDep: "✓" },
  {
    feature: "Depreciation deducted at claim",
    tp: "N/A",
    comp: "Yes (10–50%)",
    zeroDep: "No — zero deduction",
  },
  {
    feature: "Personal accident cover (owner-driver)",
    tp: "✓ (₹15L)",
    comp: "✓ (₹15L)",
    zeroDep: "✓ (₹15L)",
  },
  {
    feature: "Annual premium (small car, example)",
    tp: "₹2,000–3,500",
    comp: "₹8,000–18,000",
    zeroDep: "₹10,000–22,000",
  },
];

const ADD_ONS = [
  {
    icon: <ShieldCheck size={18} />,
    tag: "Most Popular",
    name: "Zero Depreciation",
    body: "The most popular add-on. Ensures you get the full repair cost without any depreciation deduction — critical for new cars (first 3–5 years).",
  },
  {
    icon: <Wrench size={18} />,
    tag: "Essential",
    name: "Roadside Assistance",
    body: "24/7 support for breakdowns, flat tyres, fuel delivery, and towing. Invaluable on highways or late-night drives.",
  },
  {
    icon: <Zap size={18} />,
    tag: "Recommended",
    name: "Engine Protection",
    body: "Covers engine damage due to water ingression (flooding) or oil leakage — both typically excluded from standard comprehensive plans.",
  },
  {
    icon: <FileText size={18} />,
    tag: "New Cars",
    name: "Return to Invoice",
    body: "In case of total loss or theft, you get the original invoice value of the car — not the depreciated market value.",
  },
  {
    icon: <Car size={18} />,
    tag: "Value Add",
    name: "Consumables Cover",
    body: "Standard plans exclude nuts, bolts, oil, filter replacement. This add-on covers them — saves ₹2,000–8,000 per repair.",
  },
  {
    icon: <CheckCircle2 size={18} />,
    tag: "NCB Protection",
    name: "NCB Protection",
    body: "Your No-Claim Bonus (up to 50% discount) is protected even if you make one claim during the year.",
  },
];

const CLAIM_STEPS = [
  {
    title: "Inform us and your insurer immediately",
    body: "Call NKT or your insurer's helpline within 24 hours of the accident. We'll guide you through the exact steps for your policy.",
  },
  {
    title: "Do not move the vehicle",
    body: "For major accidents, don't move the vehicle until the surveyor arrives. Take photographs of the scene from multiple angles.",
  },
  {
    title: "File an FIR if required",
    body: "For theft, third-party injury, or accidents involving another party, file a police FIR. This is mandatory for most claims.",
  },
  {
    title: "Surveyor assessment",
    body: "The insurer sends a surveyor to assess damage. For cashless claims, take the vehicle to a network garage — the surveyor visits there.",
  },
  {
    title: "Claim settlement",
    body: "For cashless repairs: the insurer pays the garage directly. For reimbursement claims: submit bills within 30 days for repayment.",
  },
];

const FAQ = [
  {
    q: "Is motor insurance mandatory in India?",
    a: "Yes — third-party (TP) motor insurance is mandatory under the Motor Vehicles Act 1988. Driving without valid TP insurance can result in fines up to ₹2,000 and/or imprisonment. Comprehensive cover is optional but highly recommended.",
  },
  {
    q: "What is IDV and how does it affect my premium?",
    a: "IDV (Insured Declared Value) is the current market value of your vehicle — it's the maximum amount you'd receive in a total loss claim. A higher IDV means higher premium but better protection. We help you set the right IDV — not too high (expensive) or too low (under-insured).",
  },
  {
    q: "What is No-Claim Bonus (NCB)?",
    a: "NCB is a discount on your renewal premium for every claim-free year. It starts at 20% in year 2 and goes up to 50% by year 6. A ₹15,000 premium can become ₹7,500 after 6 claim-free years. Your NCB is personal — it follows you when you switch insurers or buy a new car.",
  },
  {
    q: "Should I buy zero depreciation cover?",
    a: "For cars less than 3–5 years old, yes — absolutely. Without zero-dep, your insurer deducts 10–50% from the repair bill for depreciation. On a ₹1L repair, that's ₹10,000–50,000 out of your pocket. The add-on typically costs ₹2,000–5,000 per year.",
  },
  {
    q: "Can I transfer my NCB when I sell my car?",
    a: "Yes — NCB belongs to you, not the vehicle. When you sell your car, you can transfer your NCB discount to your new vehicle's policy. Request an NCB retention letter from your insurer before the sale.",
  },
  {
    q: "What happens if I don't renew on time?",
    a: "If your motor insurance lapses, you lose your NCB discount and the vehicle must be physically inspected before a new policy is issued. You're also legally driving uninsured (for TP coverage) during the lapse period. We send renewal reminders 45, 30, and 15 days in advance.",
  },
  {
    q: "How is the claim settled in an accident?",
    a: "For cashless: take the vehicle to a network garage. The insurer pays the garage directly. For reimbursement: get it repaired anywhere, submit bills to the insurer. We assist with both and follow up on your behalf.",
  },
  {
    q: "Can I insure a bike and a car under the same policy?",
    a: "No — each vehicle needs its own separate motor insurance policy. However, we manage all your policies together, send consolidated renewal reminders, and ensure none of them lapse.",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" };

function MotorInsurancePage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="motor-h1"
        style={{
          padding: "clamp(4rem,8vw,6rem) 0 clamp(3rem,6vw,5rem)",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={W}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "0.8rem",
              color: "#94A3B8",
              marginBottom: "28px",
            }}
            aria-label="Breadcrumb"
          >
            <Link to="/" style={{ color: "#94A3B8", textDecoration: "none" }} className="bc-link">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/services"
              style={{ color: "#94A3B8", textDecoration: "none" }}
              className="bc-link"
            >
              Insurance
            </Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Motor Insurance</span>
          </nav>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
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
                  background: "var(--color-accent-bg)",
                  border: "1px solid var(--color-accent-line)",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "20px",
                }}
              >
                <Car size={11} /> Motor Insurance Plans
              </div>
              <h1
                id="motor-h1"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.2rem,4.5vw,3.5rem)",
                  fontWeight: 900,
                  color: "#0F172A",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: "20px",
                }}
              >
                Renew in 15 minutes.{" "}
                <span style={{ color: "var(--color-accent)" }}>Protected in seconds.</span>
              </h1>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#475569",
                  marginBottom: "32px",
                  lineHeight: 1.75,
                  maxWidth: "52ch",
                }}
              >
                Car and two-wheeler insurance with real claim support — not a call-centre maze. We
                handle the process from first call to settlement.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/contact"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  Get Free Quote <ArrowRight size={15} />
                </Link>
                <a href="#motor-compare" className="btn btn-outline">
                  Compare Plans
                </a>
              </div>
            </div>

            <div
              style={{
                borderRadius: "20px",
                overflow: "hidden",
                border: "1px solid #E2E8F0",
                background: "#F8FAFC",
                aspectRatio: "1/1",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
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
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </picture>
            </div>
          </div>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          padding: "clamp(2rem,4vw,3rem) 0",
          background: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
        }}
        aria-label="Key statistics"
      >
        <div
          style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}
          className="grid-4"
        >
          {[
            { num: "Mandatory", label: "Third-party cover by law" },
            { num: "50%", label: "NCB discount (6 claim-free years)" },
            { num: "₹0", label: "Out-of-pocket with zero-dep" },
            { num: "24 hrs", label: "Claim intimation window" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem,3vw,2rem)",
                  fontWeight: 900,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  marginBottom: "6px",
                  letterSpacing: "-0.03em",
                }}
              >
                {num}
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.4, fontWeight: 500 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPARE TABLE ── */}
      <section
        id="motor-compare"
        aria-labelledby="motor-compare-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Plan Comparison</div>
            <h2 id="motor-compare-heading" style={{ margin: "0 0 16px", maxWidth: "34ch" }}>
              Third-Party vs Comprehensive vs Zero-Dep
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75 }}>
              Understanding the difference helps you avoid being under-insured when it matters most.
            </p>
          </div>
          <div
            style={{
              overflow: "auto",
              maxWidth: "100%",
              borderRadius: "16px",
              border: "1px solid #E2E8F0",
              background: "#FFFFFF",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      minWidth: "220px",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Coverage
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Third-Party Only
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Comprehensive
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Zero Depreciation
                  </th>
                </tr>
              </thead>
              <tbody>
                {COVERAGE_ROWS.map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      background: i % 2 === 1 ? "#F8FAFC" : "transparent",
                      borderBottom: "1px solid #F1F5F9",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 20px",
                        fontWeight: 600,
                        color: "#0F172A",
                        fontSize: "0.875rem",
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color:
                          row.tp === "✓"
                            ? "var(--color-accent)"
                            : row.tp === "✗"
                              ? "#DC2626"
                              : "#475569",
                        fontWeight: row.tp === "✓" || row.tp === "✗" ? 700 : 400,
                        fontSize: "0.875rem",
                      }}
                    >
                      {row.tp}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color:
                          row.comp === "✓"
                            ? "var(--color-accent)"
                            : row.comp === "✗"
                              ? "#DC2626"
                              : "#475569",
                        fontWeight: row.comp === "✓" || row.comp === "✗" ? 700 : 400,
                        fontSize: "0.875rem",
                      }}
                    >
                      {row.comp}
                    </td>
                    <td
                      style={{
                        padding: "14px 20px",
                        color:
                          row.zeroDep === "✓" || row.zeroDep.includes("zero")
                            ? "var(--color-accent)"
                            : row.zeroDep === "✗"
                              ? "#DC2626"
                              : "#475569",
                        fontWeight:
                          row.zeroDep === "✓" || row.zeroDep === "✗" || row.zeroDep.includes("zero")
                            ? 700
                            : 400,
                        fontSize: "0.875rem",
                      }}
                    >
                      {row.zeroDep}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section
        aria-labelledby="addons-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Recommended Add-ons</div>
            <h2 id="addons-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Key add-ons to consider
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Add-ons fill the gaps in standard comprehensive plans. Each one is worth evaluating
              for your situation.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
              gap: "20px",
            }}
          >
            {ADD_ONS.map((addon) => (
              <article
                key={addon.name}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "clamp(1.5rem,3vw,2rem)",
                  display: "flex",
                  flexDirection: "column",
                }}
                className="card"
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "var(--color-accent-bg)",
                    color: "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "12px",
                  }}
                  aria-hidden="true"
                >
                  {addon.icon}
                </div>
                <div
                  style={{
                    display: "inline-block",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    background: "var(--color-accent-bg)",
                    border: "1px solid var(--color-accent-line)",
                    padding: "3px 10px",
                    borderRadius: "99px",
                    marginBottom: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {addon.tag}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  {addon.name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {addon.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLAIM PROCESS + TESTIMONIAL ── */}
      <section
        aria-labelledby="motor-claim-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(4rem,8vw,6rem)",
              alignItems: "start",
            }}
            className="hero__grid"
          >
            <div>
              <div className="section-label">Claims Process</div>
              <h2 id="motor-claim-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
                How to file a motor insurance claim
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                }}
              >
                Follow these five steps — and call us first, we'll guide you through every one of
                them.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {CLAIM_STEPS.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        flexShrink: 0,
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          marginBottom: "6px",
                          color: "#0F172A",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "#475569",
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="section-label">Client Story</div>
              <h2 style={{ margin: "0 0 16px", maxWidth: "26ch" }}>
                Why clients trust us with claims
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: "28px",
                }}
              >
                The claim process is where most advisors disappear. We don't.
              </p>
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "clamp(1.25rem,4vw,2.5rem)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} style={{ color: "var(--color-secondary)", fontSize: "1rem" }}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    lineHeight: 1.65,
                    color: "#0F172A",
                    fontStyle: "italic",
                    marginBottom: "20px",
                    margin: "0 0 20px",
                  }}
                >
                  "My car was totalled in a flood. NKT filed the claim, followed up with the
                  surveyor, and got us ₹7.2L — the full IDV. From accident to settlement in 18 days.
                  I didn't make a single call to the insurer myself."
                </blockquote>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "var(--color-accent-bg)",
                      color: "var(--color-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      flexShrink: 0,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    A
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#0F172A" }}>
                      Amit V.
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#94A3B8" }}>
                      Comprehensive Car Insurance · Flood Claim · Bengaluru
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Motor insurance questions answered"
        subtext="Everything you need to know before renewing or buying motor insurance."
      />
      <CtaBanner
        heading="Renew or buy motor insurance in 15 minutes"
        sub="Get a quote for your car or bike. Compare, choose, and get covered — we handle the paperwork."
      />
    </>
  );
}
