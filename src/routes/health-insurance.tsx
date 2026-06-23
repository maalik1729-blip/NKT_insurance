import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Heart,
  CheckCircle2,
  BadgeCheck,
  Hospital,
  FileText,
  Users,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";
import healthSectionImg from "../assets/images/health_insurance_section.png";
import healthSectionWebp from "../assets/images/health_insurance_section.webp";
import healthSectionWebp2x from "../assets/images/health_insurance_section@2x.webp";

const TITLE = "Health Insurance — Family Floater, Critical Illness | NKT Insurance Solutions";
const DESC =
  "Cashless health insurance for individuals, families, and seniors. Compare Star Health, HDFC Ergo, Care, and more. Free advice from a licensed IRDAI advisor.";

export const Route = createFileRoute("/health-insurance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/health-insurance" }],
  }),
  component: HealthInsurancePage,
});

const PLAN_TYPES = [
  {
    name: "Individual Health Plan",
    icon: <Heart size={18} />,
    tag: "Single Cover",
    body: "Covers one person for hospitalisation, surgery, and medical expenses. Ideal for young singles or as a supplement to employer cover.",
    features: [
      "Hospitalisation + ICU cover",
      "Pre & post hospitalisation",
      "Day-care procedures",
      "Tax benefit 80D up to ₹25,000",
    ],
  },
  {
    name: "Family Floater Plan",
    icon: <Users size={18} />,
    tag: "Most Popular",
    body: "One policy covers your entire family — spouse, children, and sometimes parents. Premium is lower than individual plans combined.",
    features: [
      "Single sum insured shared by family",
      "Covers self + spouse + 2 children",
      "Add parents separately",
      "₹5–25L cover range",
    ],
  },
  {
    name: "Senior Citizen Plan",
    icon: <BadgeCheck size={18} />,
    tag: "60+ Years",
    body: "Designed for parents and seniors (60+). Higher premiums, but essential — senior citizens are not covered by most standard floater plans.",
    features: [
      "Entry age up to 80 years",
      "Covers pre-existing conditions",
      "Higher sum insured options",
      "80D deduction up to ₹50,000 for seniors",
    ],
  },
  {
    name: "Critical Illness Cover",
    icon: <AlertCircle size={18} />,
    tag: "Lump-Sum",
    body: "Lump-sum payout on diagnosis of 30+ critical illnesses (cancer, heart attack, kidney failure). Use the payout for treatment, income replacement, or EMIs.",
    features: [
      "₹10L–₹1Cr lump-sum payout",
      "30–40 critical illness covered",
      "No hospital stay required to claim",
      "Covers cancer, heart, stroke, kidney",
    ],
  },
  {
    name: "Top-Up & Super Top-Up",
    icon: <FileText size={18} />,
    tag: "Cost-Effective",
    body: "Affordable way to enhance your existing cover. Activates once your base plan is exhausted — cost-effective for high-value cover.",
    features: [
      "Supplements employer/existing cover",
      "Very low premium for ₹10–50L extra",
      "Super top-up: claims aggregate annually",
      "Ideal for IT employees with basic cover",
    ],
  },
  {
    name: "Group / Corporate Health",
    icon: <Hospital size={18} />,
    tag: "Business",
    body: "Employer-provided cover for businesses and organisations. We advise on the right group plan for your team's needs and negotiate better terms.",
    features: [
      "Covers all employees & dependants",
      "Lower premiums due to group size",
      "Maternity cover often included",
      "Customisable sum insured",
    ],
  },
];

const CASHLESS_STEPS = [
  {
    title: "Show your health card",
    body: "At admission, show your insurer's cashless health card or policy number to the hospital's insurance desk.",
  },
  {
    title: "Pre-authorisation is sent",
    body: "The hospital sends a pre-authorisation request to your insurer. For planned procedures, this happens 3–4 days before admission.",
  },
  {
    title: "Insurer approves",
    body: "The insurer approves the treatment amount — typically within 2–6 hours for emergencies and 24–48 hours for planned procedures.",
  },
  {
    title: "Treatment proceeds",
    body: "Your treatment continues. The hospital and insurer communicate directly. You pay only non-covered items (cosmetic, consumables, etc.).",
  },
  {
    title: "Discharge clearance",
    body: "At discharge, the insurer settles the bill directly with the hospital. You sign the discharge summary and leave.",
  },
];

const COVERED_NOT = [
  { covered: "Hospitalisation (>24 hrs)", notCovered: "OPD consultations (usually)" },
  { covered: "ICU and surgery charges", notCovered: "Dental treatment (unless accidental)" },
  {
    covered: "Pre & post hospitalisation (30/60 days)",
    notCovered: "Cosmetic/aesthetic procedures",
  },
  { covered: "Ambulance charges", notCovered: "Self-inflicted injuries" },
  { covered: "Organ donor expenses", notCovered: "Pregnancy (1st year usually excluded)" },
  { covered: "Day-care procedures", notCovered: "Non-allopathic treatment (some plans)" },
  { covered: "Ayush treatment (many plans)", notCovered: "Experimental treatment" },
];

const FAQ = [
  {
    q: "How much health insurance cover is enough?",
    a: "For a family of 4 in a metro city, ₹10–15L is the minimum recommended today. Medical inflation is running at 12–15% annually — a 5-day hospital stay in a private hospital can cost ₹3–8L. For families with senior parents, ₹25L+ is advisable.",
  },
  {
    q: "Should I get a family floater or individual plans for each person?",
    a: "Family floater is more cost-effective for young families where all members are unlikely to claim in the same year. For senior parents, get separate senior citizen plans — adding them to your floater significantly increases premiums and may reduce cover.",
  },
  {
    q: "What is waiting period for pre-existing conditions?",
    a: "Most standard health plans have a 2–4 year waiting period before pre-existing conditions (like diabetes, BP, thyroid) are covered. Some premium plans offer 1-year waiting period. We help you find plans with the shortest waiting period if you have pre-existing conditions.",
  },
  {
    q: "Can I claim from multiple health insurance policies?",
    a: "Yes — if your claim exceeds one policy's limit, you can claim from a second policy for the remaining amount. This is called contribution. Each insurer pays proportionally to their policy's share.",
  },
  {
    q: "What is no-claim bonus?",
    a: "If you don't make any claims during a policy year, many insurers increase your sum insured by 5–50% at no extra cost (no-claim bonus). After a few claim-free years, your ₹5L cover can grow to ₹7–10L.",
  },
  {
    q: "Is AYUSH (Ayurveda, Yoga, Unani) treatment covered?",
    a: "Yes, most modern health plans now cover AYUSH treatment at government or government-recognised hospitals. Private Ayurveda or Naturopathy centres may not qualify. We check this in every plan we recommend.",
  },
  {
    q: "What is the difference between cashless and reimbursement claims?",
    a: "Cashless: The insurer pays the hospital directly — you don't pay anything upfront (except non-covered items). Reimbursement: You pay the hospital and submit bills to the insurer for repayment. Cashless is more convenient. It's only available at network hospitals.",
  },
  {
    q: "When should I port my health insurance?",
    a: "Port when: your current insurer raises premiums significantly, claim settlements are slow or disputed, or another insurer offers better cover at the same price. You retain your waiting period benefits when porting. We help you port without losing any accumulated benefits.",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 32px" };

function HealthInsurancePage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="health-h1"
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
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Health Insurance</span>
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
                <Heart size={11} /> Health Insurance Plans
              </div>
              <h1
                id="health-h1"
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
                Cashless hospitalisation for your{" "}
                <span style={{ color: "var(--color-accent)" }}>whole family</span>
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
                Medical inflation runs at 12–15% annually. A single hospital stay can cost ₹3–8L.
                The right health insurance means zero out-of-pocket cost at 7,000+ network
                hospitals.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/contact"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  Get Free Quote <ArrowRight size={15} />
                </Link>
                <a href="#health-plans" className="btn btn-outline">
                  Explore Plans
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
                  srcSet={`${healthSectionWebp} 640w, ${healthSectionWebp2x} 1280w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src={healthSectionImg}
                  alt="Health Insurance"
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
            { num: "7,000+", label: "Cashless network hospitals" },
            { num: "12–15%", label: "Annual medical inflation" },
            { num: "₹3–8L", label: "Average 5-day hospital stay" },
            { num: "80D", label: "Tax benefit on premium" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem,3vw,2.4rem)",
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

      {/* ── PLAN TYPES ── */}
      <section
        id="health-plans"
        aria-labelledby="plan-types-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">All Plan Types</div>
            <h2 id="plan-types-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Types of health insurance plans
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              The right plan depends on your age, family size, and existing coverage. We help you
              choose correctly.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
              gap: "20px",
            }}
          >
            {PLAN_TYPES.map((p) => (
              <article
                key={p.name}
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
                  {p.icon}
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
                  {p.tag}
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
                  {p.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.875rem",
                    color: "#475569",
                    marginBottom: "16px",
                    lineHeight: 1.7,
                  }}
                >
                  {p.body}
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    listStyle: "none",
                    marginTop: "auto",
                  }}
                >
                  {p.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "0.82rem",
                        color: "#475569",
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "2px" }}
                        aria-hidden="true"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW CASHLESS WORKS + COVERAGE TABLE ── */}
      <section
        aria-labelledby="cashless-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
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
              <div className="section-label">How It Works</div>
              <h2 id="cashless-heading" style={{ margin: "0 0 16px", maxWidth: "26ch" }}>
                How cashless hospitalisation works
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                }}
              >
                At a network hospital, you never open your wallet. Here's exactly how it works step
                by step.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {CASHLESS_STEPS.map((step, i) => (
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
              <div className="section-label">Coverage Guide</div>
              <h2 style={{ margin: "0 0 16px", maxWidth: "26ch" }}>
                What's covered — and what's not
              </h2>
              <p
                style={{
                  fontSize: "1.05rem",
                  color: "#475569",
                  lineHeight: 1.75,
                  marginBottom: "24px",
                }}
              >
                Most plans follow a similar pattern. Here's a quick reference.
              </p>
              <div
                style={{
                  overflow: "auto",
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
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "var(--color-accent)",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ✓ Covered
                      </th>
                      <th
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontWeight: 700,
                          color: "#DC2626",
                          fontFamily: "var(--font-display)",
                        }}
                      >
                        ✗ Not covered
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COVERED_NOT.map((row, i) => (
                      <tr
                        key={i}
                        style={{
                          background: i % 2 === 1 ? "#F8FAFC" : "transparent",
                          borderBottom: "1px solid #F1F5F9",
                        }}
                      >
                        <td style={{ padding: "10px 16px", color: "#475569", fontSize: "0.82rem" }}>
                          {row.covered}
                        </td>
                        <td style={{ padding: "10px 16px", color: "#94A3B8", fontSize: "0.82rem" }}>
                          {row.notCovered}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section
        aria-label="Client testimonial"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={{ ...W, maxWidth: "860px" }}>
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "clamp(2.5rem,5vw,4rem)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: "var(--color-secondary)", fontSize: "1.1rem" }}>
                  ★
                </span>
              ))}
            </div>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.05rem,2vw,1.2rem)",
                lineHeight: 1.65,
                color: "#0F172A",
                fontStyle: "italic",
                marginBottom: "24px",
                margin: "0 0 24px",
              }}
            >
              "My father needed a kidney procedure — ₹4.8L. NKT had helped us take a family floater
              plan with a senior citizen rider the year before. The entire amount was settled
              cashless. I didn't pay a single rupee to the hospital."
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
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
                P
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A" }}>
                  Priya M.
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Family Floater + Senior Rider · ₹10L Cover · Delhi
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Health insurance questions answered"
        subtext="Straightforward answers to India's most common health insurance questions."
      />
      <CtaBanner
        heading="Find the right health plan for your family"
        sub="We compare Star Health, HDFC Ergo, Care, Niva Bupa, and more — free, in one consultation."
      />
    </>
  );
}
