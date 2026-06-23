import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  ShieldCheck,
  Heart,
  Car,
  AlertCircle,
  CheckCircle2,
  FileText,
  Phone,
  Coins,
  Globe,
  ArrowRight,
} from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";
import { WhatsAppIcon, WA_NUMBER, TEL, TEL_DISPLAY } from "../components/icons";

const TITLE = "Claims Support — Life, Health & Motor | NKT Insurance Solutions";
const DESC =
  "We handle insurance claims so you don't have to fight call centres. Step-by-step claim guidance for life, health, and motor insurance. Call us first.";

export const Route = createFileRoute("/claims")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/claims" }],
  }),
  component: ClaimsPage,
});

const FIRST_24H = [
  {
    icon: <Phone size={18} />,
    title: "Call NKT first",
    body: "Before calling the insurer, call or WhatsApp us. We'll guide you through the exact process for your specific policy and insurer.",
  },
  {
    icon: <ShieldCheck size={18} />,
    title: "Gather documents immediately",
    body: "Collect the policy number, death/hospital/FIR certificate, and ID proof. Don't wait — many documents have short windows for submission.",
  },
  {
    icon: <FileText size={18} />,
    title: "Intimate the insurer formally",
    body: "We help you submit the formal claim intimation in writing within the required time window (usually 24–48 hours for motor, 7–30 days for life and health).",
  },
  {
    icon: <AlertCircle size={18} />,
    title: "Don't admit liability or sign anything",
    body: "For motor and third-party claims: don't sign any document or admit fault at the accident scene. Let the insurer's legal team handle liability.",
  },
];

const CLAIM_CATEGORIES = [
  {
    title: "Life Insurance Claims",
    icon: <ShieldCheck size={18} />,
    tag: "Death Benefits",
    desc: "Dedicated assistance for death benefit settlements and maturity payouts under LIC and private policies.",
  },
  {
    title: "Health Insurance Claims",
    icon: <Heart size={18} />,
    tag: "Cashless",
    desc: "Instant pre-authorisation handling for cashless treatment or seamless reimbursement file assembly.",
  },
  {
    title: "Loan Protection Policy",
    icon: <Coins size={18} />,
    tag: "Debt Cover",
    desc: "Settling outstanding home or personal loans directly through policies, keeping your family asset-safe.",
  },
  {
    title: "Overseas / Travel Claims",
    icon: <Globe size={18} />,
    tag: "International",
    desc: "Liaising with international TPAs for medical emergencies, luggage losses, or delays while abroad.",
  },
  {
    title: "Motor Insurance Claims",
    icon: <Car size={18} />,
    tag: "Cashless Repair",
    desc: "Fast surveyor coordination, cashless garage routing, and zero-depreciation coverage verification.",
  },
  {
    title: "Term Insurance",
    icon: <FileText size={18} />,
    tag: "Income Replace",
    desc: "Critical support during the income-replacement filing process, ensuring maximum transparency for nominees.",
  },
  {
    title: "Accidental Claims",
    icon: <AlertCircle size={18} />,
    tag: "Emergency",
    desc: "Filing personal accident benefit covers, permanent disability riders, and emergency cash claims.",
  },
  {
    title: "General Insurance",
    icon: <ShieldCheck size={18} />,
    tag: "Commercial",
    desc: "Assistance with commercial fire, marine, cargo, liability, and shopkeeper package policy settlements.",
  },
];

const LIFE_STEPS = [
  {
    title: "Inform NKT and the insurer",
    body: "Contact us immediately. We'll file the formal death claim intimation on your behalf within the required window.",
  },
  {
    title: "Gather required documents",
    body: "Original policy document, death certificate (attested), nominee's identity proof, relationship proof, and bank account details.",
  },
  {
    title: "Submit the claim form",
    body: "We help you fill the insurer's claim form accurately. Incorrect forms are the #1 reason for claim delays.",
  },
  {
    title: "Insurer investigation",
    body: "For claims within the first 3 years of a policy, insurers may conduct a brief investigation. We liaise with them throughout.",
  },
  {
    title: "Claim settlement",
    body: "Typically settled in 7–30 days after all documents are received. Proceeds are deposited directly to the nominee's bank account.",
  },
];

const HEALTH_STEPS = [
  {
    title: "At admission — show health card",
    body: "Show your insurer's cashless card or policy number to the hospital's insurance desk at the time of admission.",
  },
  {
    title: "Pre-authorisation request",
    body: "The hospital sends a pre-authorisation to your insurer. For emergencies, this happens simultaneously with treatment.",
  },
  {
    title: "Insurer approval",
    body: "Approval within 2–6 hours for emergencies, 24–48 hours for planned procedures. We follow up if there are delays.",
  },
  {
    title: "Treatment proceeds",
    body: "You receive care. The hospital and insurer communicate directly. You only pay excluded items (cosmetics, consumables if not covered).",
  },
  {
    title: "Discharge and settlement",
    body: "The insurer pays the hospital directly. You collect your discharge summary and leave. For reimbursement claims, submit bills within 15–30 days.",
  },
];

const MOTOR_STEPS = [
  {
    title: "Photograph everything at the scene",
    body: "Take photos of vehicle damage, position, third-party vehicles, road conditions, and registration plates before moving anything.",
  },
  {
    title: "File an FIR if required",
    body: "For theft, third-party injury, or major accidents — file a police FIR within 24 hours. Most insurers require it for these claim types.",
  },
  {
    title: "Intimate the insurer within 24 hours",
    body: "We file the formal claim intimation on your behalf. Most policies require this within 24–48 hours of the incident.",
  },
  {
    title: "Surveyor assessment",
    body: "For cashless repairs: take the vehicle to a network garage. The insurer's surveyor assesses damage there. Don't start repairs before approval.",
  },
  {
    title: "Repair and settlement",
    body: "Cashless: insurer pays the garage. Reimbursement: submit original bills and repair receipts within 30 days of repair completion.",
  },
];

const REJECTION_REASONS = [
  {
    reason: "Non-disclosure of pre-existing conditions",
    fix: "Always disclose all health conditions, even minor ones, at the time of buying health or life insurance.",
  },
  {
    reason: "Claim filed after intimation window expired",
    fix: "Inform us and your insurer immediately after any incident — don't wait days or weeks.",
  },
  {
    reason: "Policy lapsed at time of claim",
    fix: "We send renewal reminders 45, 30, and 15 days in advance so your cover never lapses.",
  },
  {
    reason: "Cause of claim is in the exclusion list",
    fix: "We explain all exclusions clearly before you buy so there are no surprises at claim time.",
  },
  {
    reason: "Wrong or incomplete claim forms",
    fix: "We fill and review all claim forms before submission to ensure accuracy.",
  },
  {
    reason: "Driving without licence (motor claims)",
    fix: "Ensure the driver held a valid licence at the time of the accident. Allow no unlicensed driver to operate your vehicle.",
  },
];

const FAQ = [
  {
    q: "How long does a claim take to settle?",
    a: "Life insurance: 7–30 days after all documents received. Health insurance (cashless): instant to 48 hours for authorisation, bill paid directly to hospital. Motor insurance: 5–15 days for repair approvals, 7–21 days for settlement. We track and follow up to ensure no unnecessary delays.",
  },
  {
    q: "Can I claim if my policy is less than a year old?",
    a: "Yes — for most accidental claims (motor, accidental death). For life insurance death claims in the first 3 years, insurers may conduct an investigation, but legitimate claims are always settled. For health insurance, check your specific waiting period clauses.",
  },
  {
    q: "What if my claim is rejected?",
    a: "Call us immediately. We review the rejection reason, check if it's valid under policy terms, and if not, we file a formal appeal with the insurer. If the appeal fails, we can escalate to the Insurance Ombudsman on your behalf — free of charge.",
  },
  {
    q: "Do I have to handle the claim process myself?",
    a: "No. That's exactly what we're here for. You notify us, we take it from there — filing intimation, following up with surveyors, checking documents, and ensuring timely settlement. You focus on your situation; we handle the insurer.",
  },
  {
    q: "What is the Insurance Ombudsman?",
    a: "The Insurance Ombudsman is a government-appointed authority that resolves disputes between policyholders and insurers for free. If an insurer wrongfully denies or delays a claim, the Ombudsman has the power to order the insurer to pay. We help you file a complaint if it reaches this stage.",
  },
  {
    q: "Is there a time limit for filing a claim?",
    a: "Yes — each policy has an intimation window: typically 24–48 hours for motor, 24–72 hours for health emergencies, and 7–30 days for life insurance death claims. Missing this window doesn't automatically mean rejection, but late claims require explanation. Call us as soon as an incident happens.",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 32px" };

function StepList({ steps }: { steps: { title: string; body: string }[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "var(--color-accent)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.72rem",
              fontWeight: 800,
              flexShrink: 0,
              fontFamily: "var(--font-display)",
            }}
          >
            {String(i + 1).padStart(2, "0")}
          </div>
          <div>
            <h4
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                marginBottom: "4px",
                color: "#0F172A",
                fontFamily: "var(--font-display)",
              }}
            >
              {s.title}
            </h4>
            <p style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
              {s.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ClaimsPage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="claims-h1"
        style={{
          padding: "clamp(5rem,10vw,8rem) 0 clamp(3rem,6vw,4rem)",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ ...W, maxWidth: "860px", textAlign: "center" }}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Claims Support</span>
          </nav>
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
            <ShieldCheck size={11} /> Claims Support
          </div>
          <h1
            id="claims-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem,5vw,3.8rem)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            We handle your claim so{" "}
            <span style={{ color: "var(--color-accent)" }}>you don't have to</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: "55ch",
              margin: "0 auto 36px",
            }}
          >
            The claim process is where most advisors disappear. We don't. From first notification to
            final settlement, we manage the entire process on your behalf.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href={`tel:${TEL}`}
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <Phone size={15} /> Call Us Now
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=I%20need%20help%20with%20a%20claim.`}
              className="btn btn-wa"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <WhatsAppIcon size={15} /> WhatsApp Help
            </a>
          </div>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── FIRST 24 HOURS ── */}
      <section
        aria-labelledby="first24-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Immediate Action</div>
            <h2 id="first24-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              What to do in the first 24 hours
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              The first steps after an incident are critical. Here's exactly what to do — in order.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="grid-2"
          >
            {FIRST_24H.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  padding: "clamp(1.5rem,3vw,2rem)",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
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
                    marginBottom: "16px",
                  }}
                  aria-hidden="true"
                >
                  {icon}
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
                  {title}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLAIM CATEGORIES ── */}
      <section
        aria-labelledby="categories-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">All Claim Types</div>
            <h2 id="categories-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Claims we handle & advise on
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              From individual terms to complex commercial coverage, we coordinate settlements across
              all key areas.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))",
              gap: "20px",
            }}
          >
            {CLAIM_CATEGORIES.map((cat) => (
              <article
                key={cat.title}
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
                  {cat.icon}
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
                  {cat.tag}
                </div>
                <h3
                  style={{
                    fontSize: "0.95rem",
                    marginBottom: "8px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  {cat.title}
                </h3>
                <p style={{ fontSize: "0.84rem", color: "#475569", lineHeight: 1.65, margin: 0 }}>
                  {cat.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLAIM PROCESS BY TYPE ── */}
      <section
        aria-labelledby="claim-types-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Step-by-Step Guides</div>
            <h2 id="claim-types-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Claim process by insurance type
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Different policies have different processes. Here's the step-by-step for each.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}
            className="grid-3"
          >
            {[
              {
                icon: <ShieldCheck size={20} />,
                title: "Life Insurance Claims",
                steps: LIFE_STEPS,
              },
              { icon: <Heart size={20} />, title: "Health Insurance Claims", steps: HEALTH_STEPS },
              { icon: <Car size={20} />, title: "Motor Insurance Claims", steps: MOTOR_STEPS },
            ].map(({ icon, title, steps }) => (
              <div
                key={title}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "clamp(1.5rem,3vw,2rem)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "24px",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #F1F5F9",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--color-accent-bg)",
                      color: "var(--color-accent)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: 0,
                    }}
                  >
                    {title}
                  </h3>
                </div>
                <StepList steps={steps} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REJECTION REASONS ── */}
      <section
        aria-labelledby="rejection-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Prevention Guide</div>
            <h2 id="rejection-heading" style={{ margin: "0 0 16px", maxWidth: "34ch" }}>
              Why claims get rejected — and how we prevent it
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Most claim rejections are preventable. Here's what to watch out for.
            </p>
          </div>
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
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#DC2626",
                      minWidth: "250px",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Common rejection reason
                  </th>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    How NKT prevents this
                  </th>
                </tr>
              </thead>
              <tbody>
                {REJECTION_REASONS.map((r, i) => (
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
                        color: "#DC2626",
                        fontSize: "0.875rem",
                      }}
                    >
                      {r.reason}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569", fontSize: "0.875rem" }}>
                      <span style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                        <CheckCircle2
                          size={14}
                          style={{ color: "var(--color-accent)", marginTop: "2px", flexShrink: 0 }}
                          aria-hidden="true"
                        />
                        {r.fix}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Claims questions answered"
        subtext="What to expect, how long it takes, and what to do if there's a dispute."
      />
      <CtaBanner
        heading="Need help with a claim right now?"
        sub="Call or WhatsApp us immediately. We pick up during business hours and reply to claim WhatsApps within the hour."
      />
    </>
  );
}
