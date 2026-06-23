import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  ShieldCheck,
  CheckCircle2,
  BadgeCheck,
  TrendingUp,
  FileText,
  ArrowRight,
  Users,
  Star,
} from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";
import { IRDAIClaimsSection } from "../components/IRDAIClaimsSection";
import { IndiaInsuranceMarketSection } from "../components/IndiaInsuranceMarketSection";
import { LICPlansDetailSection } from "../components/LICPlansDetailSection";
import { StateWiseLapseSection } from "../components/StateWiseLapseSection";
import "../styles/market-section.css";
import "../styles/plans-state-sections.css";

import lifeSectionImg from "../assets/images/life_insurance_section.png";
import lifeSectionWebp from "../assets/images/life_insurance_section.webp";
import lifeSectionWebp2x from "../assets/images/life_insurance_section@2x.webp";

const TITLE = "Life Insurance Plans — LIC & Private | NKT Insurance Solutions";
const DESC =
  "Term life, endowment, ULIPs, child plans — compared honestly from LIC and top private insurers. Free consultation from a certified LIC advisor.";

export const Route = createFileRoute("/life-insurance")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/life-insurance" }],
  }),
  component: LifeInsurancePage,
});

const PLAN_TYPES = [
  {
    name: "Term Life Insurance",
    claimType: "Individual Death Claims",
    icon: <ShieldCheck size={18} />,
    body: "Pure protection providing high coverage at low premium rates. Replaces income for dependants in case of demise.",
    tag: "98.15% CSR",
    features: [
      "₹1Cr cover from ~₹500/month",
      "Death benefit is tax-free under Sec 10(10D)",
      "Pure cover with no survival return",
      "LIC Jeevan Amar & Tech Term",
    ],
  },
  {
    name: "Endowment & Savings",
    claimType: "Maturity Benefits",
    icon: <TrendingUp size={18} />,
    body: "Traditional savings combined with life cover. Returns a lump sum payout + accrued bonuses at plan maturity.",
    tag: "94.10% CSR",
    features: [
      "Life cover + guaranteed maturity returns",
      "Tax benefits under Sec 80C & Sec 10(10D)",
      "Simple reversionary bonus additions",
      "LIC Jeevan Labh & Jeevan Anand",
    ],
  },
  {
    name: "Money-Back Plans",
    claimType: "Survival Benefits",
    icon: <BadgeCheck size={18} />,
    body: "Provides periodic survival payouts during the policy term, with full sum assured returned at maturity.",
    tag: "98.25% CSR",
    features: [
      "Regular cash payouts every 5 years",
      "Maturity lump sum returned with bonuses",
      "Continuous life protection cover",
      "LIC Jeevan Umang (8% cash back)",
    ],
  },
  {
    name: "Pension & Annuity",
    claimType: "Annuity Claims",
    icon: <BadgeCheck size={18} />,
    body: "Guaranteed lifetime regular income post-retirement. Immediate or deferred annuity options available.",
    tag: "99.93% CSR",
    features: [
      "Guaranteed lifetime pension income",
      "Deferred options up to 12 years",
      "Joint-life pension options for spouse",
      "LIC New Jeevan Shanti & Akshay VII",
    ],
  },
  {
    name: "Group Life Insurance",
    claimType: "Group Death Claims",
    icon: <Users size={18} />,
    body: "Master life insurance policies managed for employer-employee groups, offering uniform protection.",
    tag: "98.20% CSR",
    features: [
      "Extremely low group premium rates",
      "Easy group-based onboarding",
      "Covers bank loans & employee benefits",
      "LIC Group Term & Group Credit Life",
    ],
  },
  {
    name: "Micro-Insurance Plans",
    claimType: "Micro Death Claims",
    icon: <Star size={18} />,
    body: "Affordable low-cover plans designed for low-income families and rural protection campaigns.",
    tag: "97.20% CSR",
    features: [
      "Very low starting premium rates",
      "Government-subsidized options available",
      "No complex medical test requirements",
      "PMJJBY (LIC managed scheme)",
    ],
  },
];

const WHY_LIC = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Income replacement",
    body: "If you're the primary earner, life insurance replaces your income so your family maintains their standard of living.",
  },
  {
    icon: <BadgeCheck size={20} />,
    title: "Loan repayment",
    body: "Outstanding home, car, or personal loans become a family's burden. A term plan clears these at claim.",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Child's education",
    body: "Education costs are rising 10% annually. Child plans ensure education funds are available regardless of your health.",
  },
  {
    icon: <FileText size={20} />,
    title: "Tax efficiency",
    body: "Premiums qualify for 80C deduction (up to ₹1.5L/year) and the death benefit is fully tax-free under 10(10D).",
  },
];

const COMPARE_ROWS = [
  {
    feature: "Primary purpose",
    term: "Income replacement",
    endowment: "Savings + protection",
    ulip: "Wealth creation",
  },
  { feature: "Sum assured", term: "₹50L–₹10Cr", endowment: "₹5L–₹50L", ulip: "₹5L–₹50L" },
  {
    feature: "Premium (₹50L cover, age 30)",
    term: "~₹500–700/mo",
    endowment: "~₹4,000–6,000/mo",
    ulip: "~₹5,000+/mo",
  },
  {
    feature: "Returns",
    term: "None (pure protection)",
    endowment: "4–6% (guaranteed)",
    ulip: "8–14% (market-linked)",
  },
  { feature: "Maturity benefit", term: "None", endowment: "Yes", ulip: "Yes (fund value)" },
  { feature: "80C tax benefit", term: "Yes", endowment: "Yes", ulip: "Yes" },
  {
    feature: "Recommended for",
    term: "Most families",
    endowment: "Conservative savers",
    ulip: "Long-term investors",
  },
];

const FAQ = [
  {
    q: "How much term insurance cover do I need?",
    a: "A common formula is 10–15× your annual income, plus outstanding loans (home, car, personal). For example, if you earn ₹10L/year with a ₹30L home loan, you'd want ₹1.3–1.8Cr of cover. We calculate this precisely based on your situation.",
  },
  {
    q: "Term or endowment — which is better?",
    a: "For pure protection, term wins every time — same cover at 5–10× lower premiums. Endowment is better if you want a forced savings component and guaranteed returns. Most financial advisors recommend term + separate investments over endowment for disciplined investors.",
  },
  {
    q: "At what age should I buy life insurance?",
    a: "The earlier the better — premiums are lowest in your 20s and early 30s. Waiting until 40 can double or triple your premium for the same cover. If you have dependants, buy today.",
  },
  {
    q: "Is LIC better than private life insurance?",
    a: "LIC has an unmatched track record, government backing, and a 98.7% claim settlement ratio. Private insurers often offer competitive premiums for term plans and faster digital processing. We compare both and recommend based on your priority.",
  },
  {
    q: "What is a nominee, and why does it matter?",
    a: "A nominee is the person who receives the death benefit if you pass away. Choosing the right nominee and updating it after major life events (marriage, children) is critical. We help you set this up correctly from day one.",
  },
  {
    q: "Can I have multiple life insurance policies?",
    a: "Yes — there's no limit on the number of policies. You can supplement an existing LIC policy with a term plan from a private insurer. We'll check if your total cover is adequate relative to your income and liabilities.",
  },
  {
    q: "What documents do I need to buy life insurance?",
    a: "Typically: identity proof (Aadhaar/PAN), age proof, income proof (salary slips or ITR), and a recent passport photo. Some plans require a medical checkup for higher sums assured above ₹50L.",
  },
  {
    q: "Is the death benefit tax-free?",
    a: "Yes — death benefits received under life insurance are fully tax-free under Section 10(10D) of the Income Tax Act. Maturity proceeds are also tax-free if the annual premium is ≤10% of the sum assured.",
  },
];

const MAJOR_LIC_PLANS = [
  {
    name: "LIC New Tech Term",
    planNo: "Plan 854",
    type: "Term Insurance (Pure Cover)",
    bestFor: "High protection, lowest premium",
    sumAssured: "₹50 Lakhs – No Limit",
    claimCSR: "98.15%",
    features: [
      "Online-only plan (lower premium than offline)",
      "Accidental death benefit rider option",
      "Flexible single/regular premium options",
      "Maturity: Pure protection (no survival return)",
    ],
    accent: "#881337",
  },
  {
    name: "LIC New Jeevan Anand",
    planNo: "Plan 915",
    type: "Traditional Endowment",
    bestFor: "Guaranteed savings with lifelong cover",
    sumAssured: "₹1 Lakh – No Limit",
    claimCSR: "98.52%",
    features: [
      "Lump sum returned at maturity + bonuses",
      "Life cover continues even after maturity payment",
      "Loan facility available after 2 years",
      "Most popular traditional plan in India",
    ],
    accent: "#059669",
  },
  {
    name: "LIC Jeevan Labh",
    planNo: "Plan 936",
    type: "Limited Pay Savings",
    bestFor: "Tax-free savings for children's goals",
    sumAssured: "₹2 Lakhs – No Limit",
    claimCSR: "98.52%",
    features: [
      "Pay premium for limited term (e.g. 10 yrs for 16 yr policy)",
      "High guaranteed bonus additions",
      "Tax benefits under Sec 80C & Sec 10(10D)",
      "Best returns among traditional plans",
    ],
    accent: "#d97706",
  },
  {
    name: "LIC Jeevan Umang",
    planNo: "Plan 945",
    type: "Whole Life Income Plan",
    bestFor: "Guaranteed lifelong regular income",
    sumAssured: "₹2 Lakhs – No Limit",
    claimCSR: "98.25%",
    features: [
      "8% of Sum Assured paid as annual survival benefit for life",
      "Lifelong protection cover till age 100",
      "Tax-free annual payouts under 10(10D)",
      "Maturity lump sum returned at age 100",
    ],
    accent: "#7c3aed",
  },
  {
    name: "LIC Children's Money Back",
    planNo: "Plan 932",
    type: "Child Education & Security",
    bestFor: "Securing funding for children's milestones",
    sumAssured: "₹1 Lakh – No Limit",
    claimCSR: "98.25%",
    features: [
      "Payouts at age 18, 20, and 22 (20% of Sum Assured each)",
      "Remaining 40% + accrued bonuses at maturity (age 25)",
      "Premium Waiver Benefit rider covers parent's untimely death",
      "Ensures child's education funding is uninterrupted",
    ],
    accent: "#db2777",
  },
  {
    name: "LIC New Jeevan Shanti",
    planNo: "Plan 858",
    type: "Deferred Pension (Retirement)",
    bestFor: "Guaranteed regular income post-retirement",
    sumAssured: "Based on purchase price",
    claimCSR: "99.92%",
    features: [
      "Single premium deferment (1 to 12 years before pension starts)",
      "Guaranteed annuity rates from day one of purchase",
      "Joint-life option with spouse/parents",
      "Full return of purchase price to nominee on death",
    ],
    accent: "#0891b2",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" };

function LifeInsurancePage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="life-h1"
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
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Life Insurance</span>
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
                <ShieldCheck size={11} /> LIC Life Insurance
              </div>
              <h1
                id="life-h1"
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
                Protect your family's future with{" "}
                <span style={{ color: "var(--color-accent)" }}>life insurance</span>
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
                A term plan can give your family ₹1 Crore of protection for less than ₹20 per day.
                We compare LIC and leading private insurers to help you choose with complete
                confidence.
              </p>
              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link
                  to="/contact"
                  className="btn btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
                >
                  Get Free Quote <ArrowRight size={15} />
                </Link>
                <a href="#life-plans" className="btn btn-outline">
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
                  srcSet={`${lifeSectionWebp} 640w, ${lifeSectionWebp2x} 1280w`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  type="image/webp"
                />
                <img
                  src={lifeSectionImg}
                  alt="Life Insurance"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </picture>
            </div>
          </div>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── STATS STRIP ── */}
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
            { num: "₹1Cr+", label: "Cover from ~₹500/month" },
            { num: "98.7%", label: "LIC claim settlement ratio" },
            { num: "80C", label: "Tax deduction on premium" },
            { num: "10(10D)", label: "Tax-free death benefit" },
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

      {/* ── WHY LIFE INSURANCE ── */}
      <section
        id="life-plans"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Why It Matters</div>
            <h2 style={{ margin: "0 0 16px", maxWidth: "24ch" }}>
              Why every family needs life insurance
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Life insurance isn't about death — it's about ensuring your family's financial
              security regardless of what happens to you.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="grid-2"
          >
            {WHY_LIC.map(({ icon, title, body }) => (
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
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLAN TYPES ── */}
      <section
        id="plan-types"
        aria-labelledby="plan-types-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">All Plan Types</div>
            <h2 id="plan-types-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Types of life insurance plans
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              Each type serves a different goal. We help you pick the right one — or combine them
              for comprehensive coverage.
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
                  style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "12px" }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "var(--color-accent)",
                      background: "var(--color-accent-bg)",
                      border: "1px solid var(--color-accent-line)",
                      padding: "3px 10px",
                      borderRadius: "99px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.tag}
                  </span>
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#64748B",
                      background: "#F1F5F9",
                      border: "1px solid #E2E8F0",
                      padding: "3px 10px",
                      borderRadius: "99px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {p.claimType}
                  </span>
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
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR LIC PLANS GRID ── */}
      <section
        id="major-lic-plans"
        aria-labelledby="major-plans-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Best-Selling Products</div>
            <h2 id="major-plans-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Major LIC Plans &amp; Key Benefits
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              These are the most popular, trusted, and high-performance LIC products selected by our
              clients.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
              gap: "24px",
            }}
            className="major-plans-grid"
          >
            {MAJOR_LIC_PLANS.map((plan) => (
              <div
                key={plan.planNo}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  transition: "all 200ms ease",
                }}
                className="major-plan-card"
              >
                <span
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    background: plan.accent + "15",
                    color: plan.accent,
                    padding: "4px 10px",
                    borderRadius: "99px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {plan.planNo}
                </span>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: plan.accent,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {plan.type}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "1.15rem",
                    marginBottom: "6px",
                    fontWeight: 700,
                    color: "#0F172A",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {plan.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "#64748B",
                    fontStyle: "italic",
                    marginBottom: "16px",
                  }}
                >
                  Best For: {plan.bestFor}
                </p>
                <div
                  style={{
                    padding: "10px 14px",
                    background: "#F8FAFC",
                    borderRadius: "10px",
                    border: "1px solid #F1F5F9",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Sum Assured
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
                      {plan.sumAssured}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        fontWeight: 600,
                      }}
                    >
                      Claim Settled
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#10B981" }}>
                      {plan.claimCSR}
                    </div>
                  </div>
                </div>
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    marginTop: "auto",
                  }}
                >
                  {plan.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "8px",
                        fontSize: "0.82rem",
                        color: "#475569",
                        lineHeight: 1.4,
                      }}
                    >
                      <CheckCircle2
                        size={13}
                        style={{ color: "#10B981", flexShrink: 0, marginTop: "2px" }}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .major-plan-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.06); border-color: rgba(136,19,55,0.15) !important; }
        `}</style>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section
        aria-labelledby="compare-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">Plan Comparison</div>
            <h2 id="compare-heading" style={{ margin: "0 0 16px", maxWidth: "28ch" }}>
              Term vs Endowment vs ULIP
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75 }}>
              The most common question we get. Here's the honest comparison to help you decide.
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
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "2px solid #E2E8F0" }}>
                  <th
                    style={{
                      padding: "16px 20px",
                      textAlign: "left",
                      fontWeight: 700,
                      color: "#0F172A",
                      whiteSpace: "nowrap",
                      minWidth: "180px",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Feature
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
                    Term Life
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
                    Endowment
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
                    ULIP
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row, i) => (
                  <tr
                    key={row.feature}
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
                    <td style={{ padding: "14px 20px", color: "#475569", fontSize: "0.875rem" }}>
                      {row.term}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569", fontSize: "0.875rem" }}>
                      {row.endowment}
                    </td>
                    <td style={{ padding: "14px 20px", color: "#475569", fontSize: "0.875rem" }}>
                      {row.ulip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section
        aria-label="Client testimonial"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={{ ...W, maxWidth: "860px" }}>
          <div
            style={{
              background: "#FFFFFF",
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
                fontSize: "clamp(1.1rem,2vw,1.25rem)",
                lineHeight: 1.65,
                color: "#0F172A",
                fontStyle: "italic",
                marginBottom: "24px",
                margin: "0 0 24px",
              }}
            >
              "NKT explained the difference between term and endowment in plain Hindi. I took a ₹1Cr
              term plan at ₹650/month — the best financial decision I've made. They even helped
              update my nominee details after my daughter was born."
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
                R
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A" }}>
                  Ravi S.
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  LIC Term Plan · ₹1Cr Cover · Pune
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INDIA MARKET USAGE SECTION ── */}
      <IndiaInsuranceMarketSection />

      {/* ── ALL LIC PLANS DETAIL ── */}
      <LICPlansDetailSection />

      {/* ── IRDAI CLAIMS DATA SECTION ── */}
      <IRDAIClaimsSection />

      {/* ── STATE-WISE + LAPSE DATA ── */}
      <StateWiseLapseSection />

      <FaqAccordion
        items={FAQ}
        heading="Life insurance questions answered"
        subtext="Everything you need to know before buying a life insurance plan."
      />
      <CtaBanner
        heading="Ready to secure your family's future?"
        sub="Get a free quote comparison across LIC and top private insurers. No obligation, no pressure."
      />
    </>
  );
}
