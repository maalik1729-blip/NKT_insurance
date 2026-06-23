import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  ShieldCheck,
  Heart,
  Car,
  FileText,
  BadgeCheck,
  Award,
  Users,
  CheckCircle2,
  ArrowRight,
  Building2,
} from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";

const TITLE = "Insurance Plans — Life, Health & Motor | NKT Insurance Solutions";
const DESC =
  "Compare LIC and top-insurer plans for life, health, and motor coverage. Independent, IRDAI-licensed advice for Indian families — no pressure, just clarity.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

const PARTNERS = [
  { name: "LIC of India", abbr: "LIC" },
  { name: "Star Health", abbr: "Star" },
  { name: "HDFC Ergo", abbr: "HDFC" },
  { name: "Bajaj Allianz", abbr: "Bajaj" },
  { name: "Tata AIG", abbr: "TATA" },
  { name: "ICICI Lombard", abbr: "ICICI" },
  { name: "New India", abbr: "NIA" },
  { name: "Care Health", abbr: "Care" },
];

const PLANS = [
  {
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    name: "Life Insurance",
    body: "Protect your family's financial future. We compare LIC and top private term and endowment plans to find the right fit.",
    features: [
      "Term plans from ₹500/month",
      "LIC endowment & money-back",
      "Child education planning",
      "Tax savings under 80C",
    ],
    href: "/life-insurance",
    featured: true,
    badge: "Most Popular",
  },
  {
    icon: <Heart size={24} strokeWidth={1.5} />,
    name: "Health Insurance",
    body: "Cashless hospitalisation across 7,000+ hospitals. Family floater, critical illness, and top-up plans.",
    features: [
      "Cashless at 7,000+ hospitals",
      "Family floater plans",
      "Critical illness cover",
      "Pre-existing conditions covered",
    ],
    href: "/health-insurance",
    featured: false,
  },
  {
    icon: <Car size={24} strokeWidth={1.5} />,
    name: "Motor Insurance",
    body: "Car and two-wheeler insurance with genuine claim support — no call centre maze when you need help most.",
    features: [
      "Third-party & comprehensive",
      "Zero-depreciation add-on",
      "Roadside assistance",
      "Direct claim support",
    ],
    href: "/motor-insurance",
    featured: false,
  },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which insurance should I buy first?",
    a: "For most Indian families, term life insurance comes first — it provides the highest cover at the lowest premium. Follow it with health insurance for your family, then motor if you own a vehicle. We'll help you prioritise based on your income, dependants, and existing cover.",
  },
  {
    q: "How much life cover is enough?",
    a: "A standard rule of thumb is 10–15× your annual income. But the right number depends on your outstanding loans, number of dependants, their future expenses, and any existing assets. We calculate this for free in your first consultation.",
  },
  {
    q: "LIC vs private insurers — which is better?",
    a: "LIC has unmatched government backing and claim settlement history. Private insurers often offer more features, faster digital processing, and competitive premiums for term plans. The right answer depends on your goal — we compare both honestly and show you the data.",
  },
  {
    q: "What happens if I miss a premium payment?",
    a: "Most policies offer a 15–30 day grace period. After that, the policy lapses. We send you renewal reminders before the due date and help you revive lapsed policies without penalty in most cases.",
  },
  {
    q: "Can I buy insurance online without an advisor?",
    a: "Yes — but an advisor is useful for comparing across insurers, understanding exclusions, and getting claim support. Our service is free to you; we're paid by the insurer. You get expert guidance at no extra cost.",
  },
  {
    q: "How long does it take to get a policy issued?",
    a: "Term and health plans are typically issued in 24–72 hours online after document verification. Endowment or LIC plans may take 5–10 days. We walk you through the entire process.",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 32px" };

function ServicesPage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="services-h1"
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
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Insurance Plans</span>
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
            <FileText size={11} /> Plans & Coverage
          </div>
          <h1
            id="services-h1"
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
            Three pillars of protection,{" "}
            <span style={{ color: "var(--color-accent)" }}>compared honestly</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: "52ch",
              margin: "0 auto 36px",
            }}
          >
            We're independent — not tied to any single insurer. Every recommendation is shortlisted
            from LIC and 8 top private insurers based on your family's actual situation, not our
            commission.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              to="/contact"
              className="btn btn-primary"
              id="services-hero-cta"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              Get Free Advice <ArrowRight size={15} />
            </Link>
            <a href="#plans" className="btn btn-outline">
              See All Plans
            </a>
          </div>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── INSURER PARTNERS ── */}
      <div
        style={{
          background: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
          padding: "clamp(1.5rem,3vw,2rem) 0",
        }}
        aria-label="Insurance partners"
      >
        <div style={W}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              textAlign: "center",
              marginBottom: "16px",
            }}
          >
            Insurer partners we work with
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            {PARTNERS.map((p) => (
              <span
                key={p.name}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "6px 14px",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "99px",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "#475569",
                }}
                aria-label={p.name}
              >
                <Building2 size={12} aria-hidden="true" /> {p.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── PLAN CARDS ── */}
      <section
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
        id="plans"
        aria-labelledby="plans-heading"
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">All Insurance Plans</div>
            <h2 id="plans-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Choose your coverage
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Each plan type solves a different problem. We help you understand what you need before
              you buy.
            </p>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}
            className="grid-3"
          >
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                style={{
                  background: plan.featured
                    ? "linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-h) 100%)"
                    : "#FFFFFF",
                  border: plan.featured ? "none" : "1px solid #E2E8F0",
                  borderRadius: "20px",
                  padding: "clamp(1.5rem,3vw,2.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: plan.featured
                    ? "0 12px 40px rgba(79,70,229,0.25)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "transform 220ms ease, box-shadow 220ms ease",
                }}
                className="card"
              >
                {plan.featured && plan.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: "20px",
                      right: "20px",
                      background: "#FFFFFF",
                      color: "var(--color-accent)",
                      fontSize: "0.65rem",
                      fontWeight: 800,
                      padding: "4px 10px",
                      borderRadius: "99px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "14px",
                    background: plan.featured ? "rgba(255,255,255,0.15)" : "var(--color-accent-bg)",
                    color: plan.featured ? "#FFFFFF" : "var(--color-accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16px",
                  }}
                  aria-hidden="true"
                >
                  {plan.icon}
                </div>
                <div
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    fontFamily: "var(--font-display)",
                    color: plan.featured ? "#FFFFFF" : "#0F172A",
                    marginBottom: "10px",
                  }}
                >
                  {plan.name}
                </div>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: plan.featured ? "rgba(255,255,255,0.8)" : "#475569",
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    flexGrow: 1,
                  }}
                >
                  {plan.body}
                </p>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    listStyle: "none",
                    marginBottom: "24px",
                  }}
                  aria-label={`${plan.name} features`}
                >
                  {plan.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "0.82rem",
                        color: plan.featured ? "rgba(255,255,255,0.85)" : "#475569",
                      }}
                    >
                      <CheckCircle2
                        size={14}
                        style={{
                          color: plan.featured ? "var(--color-accent-line)" : "var(--color-accent)",
                          flexShrink: 0,
                          marginTop: "2px",
                        }}
                        aria-hidden="true"
                      />{" "}
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.href as any}
                  className={plan.featured ? "btn btn-outline" : "btn btn-primary"}
                  id={`plan-cta-${plan.name.replace(/\s/g, "-").toLowerCase()}`}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "center",
                    ...(plan.featured
                      ? { borderColor: "rgba(255,255,255,0.4)", color: "#FFFFFF" }
                      : {}),
                  }}
                >
                  Explore {plan.name} <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY INDEPENDENT ── */}
      <section
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
        aria-labelledby="why-independent"
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Why NKT</div>
            <h2 id="why-independent" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Why an independent advisor?
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Banks and insurer agents are paid to push one company's products. We compare all of
              them.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="grid-2"
          >
            {[
              {
                icon: <Users size={18} />,
                title: "Unbiased comparisons",
                body: "We compare plans from LIC + 8 private insurers side by side. You see the full picture — premiums, exclusions, claim ratios.",
              },
              {
                icon: <BadgeCheck size={18} />,
                title: "IRDAI licensed",
                body: "Fully licensed under IRDAI regulations. We're accountable to the regulator, not just our sales targets.",
              },
              {
                icon: <Award size={18} />,
                title: "10+ years experience",
                body: "We've seen which plans pay claims easily and which ones create complications. That experience is yours, free.",
              },
              {
                icon: <CheckCircle2 size={18} />,
                title: "Lifelong support",
                body: "We don't disappear after the sale. Renewals, claims, additions — we manage it all for the life of your policy.",
              },
            ].map(({ icon, title, body }) => (
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
                <div
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    color: "#0F172A",
                    marginBottom: "8px",
                  }}
                >
                  {title}
                </div>
                <p style={{ fontSize: "0.875rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Common insurance questions"
        subtext="Plain answers — no jargon, no sales pitch."
      />
      <CtaBanner
        heading="Not sure which plan is right for you?"
        sub="Book a free 30-minute consultation. We'll compare plans based on your actual situation."
      />
    </>
  );
}
