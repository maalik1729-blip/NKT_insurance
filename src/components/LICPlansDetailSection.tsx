import { useState } from "react";

// =====================================================================
// ALL LIC PLANS — Complete Data
// Source: LIC Official Website + IRDAI Handbook 2024-25
// licindia.in/web/guest/products | irdai.gov.in
// =====================================================================

const PLAN_CATEGORIES = [
  { key: "term", label: "Term Plans", color: "#4f8ef7", icon: "shield" },
  { key: "endowment", label: "Endowment Plans", color: "#10b981", icon: "trending" },
  { key: "moneyback", label: "Money Back Plans", color: "#f59e0b", icon: "refresh" },
  { key: "ulip", label: "ULIP Plans", color: "#0ea5e9", icon: "zap" },
  { key: "pension", label: "Pension / Annuity", color: "#0f766e", icon: "building" },
  { key: "child", label: "Child Plans", color: "#f97316", icon: "baby" },
  { key: "group", label: "Group Plans", color: "#06b6d4", icon: "users" },
  { key: "health", label: "Health & Riders", color: "#84cc16", icon: "heart" },
  { key: "micro", label: "Micro-Insurance", color: "#475569", icon: "star" },
];

const ALL_PLANS: {
  category: string;
  name: string;
  planNo: string;
  claimType: string;
  sumAssured: string;
  policyTerm: string;
  entryAge: string;
  premium: string;
  keyFeatures: string[];
  claimCSR: string;
  badge?: string;
}[] = [
  // ── TERM PLANS ──────────────────────────────────────────────────────
  {
    category: "term",
    name: "LIC Jeevan Amar",
    planNo: "Plan 855",
    claimType: "Individual Death Claims",
    sumAssured: "₹25L – No Limit",
    policyTerm: "10–40 years",
    entryAge: "18–65 years",
    premium: "₹4,000–25,000/yr (₹1Cr cover)",
    keyFeatures: [
      "Pure term protection",
      "Level or increasing SA",
      "Accidental death rider option",
      "Online + offline",
    ],
    claimCSR: "98.15%",
    badge: "Best Value",
  },
  {
    category: "term",
    name: "LIC New Tech Term",
    planNo: "Plan 854",
    claimType: "Individual Death Claims",
    sumAssured: "₹50L – No Limit",
    policyTerm: "10–40 years",
    entryAge: "18–65 years",
    premium: "₹3,500–20,000/yr (₹1Cr cover)",
    keyFeatures: [
      "Online-only plan",
      "Lower premiums",
      "Single/regular pay option",
      "Return of premium option",
    ],
    claimCSR: "98.15%",
    badge: "Online Plan",
  },
  {
    category: "term",
    name: "PMJJBY",
    planNo: "Govt Scheme",
    claimType: "Group Death Claims",
    sumAssured: "₹2 Lakhs",
    policyTerm: "1 year (renewable)",
    entryAge: "18–50 years",
    premium: "₹436/yr",
    keyFeatures: [
      "Government scheme",
      "Bank account linked",
      "₹436/yr fixed premium",
      "Auto-renew via bank",
    ],
    claimCSR: "97.5%+",
    badge: "Jan Kalyan",
  },

  // ── ENDOWMENT PLANS ─────────────────────────────────────────────────
  {
    category: "endowment",
    name: "LIC New Jeevan Anand",
    planNo: "Plan 915",
    claimType: "Individual Death + Maturity",
    sumAssured: "₹1L – No Limit",
    policyTerm: "15–35 years",
    entryAge: "18–50 years",
    premium: "₹15,000–60,000/yr",
    keyFeatures: [
      "Death + maturity benefit",
      "Participating (bonus)",
      "Whole life coverage after term",
      "Loyalty addition",
    ],
    claimCSR: "98.52% (Death) / 93.48% (Maturity)",
    badge: "Most Popular",
  },
  {
    category: "endowment",
    name: "LIC Jeevan Labh",
    planNo: "Plan 936",
    claimType: "Individual Death + Maturity",
    sumAssured: "₹2L – No Limit",
    policyTerm: "16, 21, 25 years",
    entryAge: "8–59 years",
    premium: "₹10,000–50,000/yr",
    keyFeatures: [
      "Limited premium payment",
      "Death + maturity both",
      "Simple reversionary bonus",
      "Ideal for children goals",
    ],
    claimCSR: "98.52% (Death)",
    badge: "Limited Pay",
  },
  {
    category: "endowment",
    name: "LIC Bima Jyoti",
    planNo: "Plan 860",
    claimType: "Individual Death + Maturity",
    sumAssured: "₹1L – No Limit",
    policyTerm: "15–20 years",
    entryAge: "90 days–60 years",
    premium: "₹12,000–45,000/yr",
    keyFeatures: [
      "Guaranteed additions",
      "Non-participating plan",
      "Flexible premium terms",
      "Death + maturity",
    ],
    claimCSR: "98.52% (Death)",
  },
  {
    category: "endowment",
    name: "LIC Jeevan Utsav",
    planNo: "Plan 871",
    claimType: "Individual Death + Maturity",
    sumAssured: "₹5L – No Limit",
    policyTerm: "Whole Life",
    entryAge: "90 days–65 years",
    premium: "₹20,000–1,00,000/yr",
    keyFeatures: [
      "Whole life cover",
      "Guaranteed income after premium term",
      "Loyalty additions",
      "Flexible payout",
    ],
    claimCSR: "98.52%",
    badge: "Whole Life",
  },
  {
    category: "endowment",
    name: "LIC Amritbaal",
    planNo: "Plan 874",
    claimType: "Individual Death + Maturity",
    sumAssured: "₹2L – No Limit",
    policyTerm: "15–25 years",
    entryAge: "0–13 years (child)",
    premium: "₹10,000–40,000/yr",
    keyFeatures: [
      "Child-specific endowment",
      "Waiver of premium on parent death",
      "Guaranteed maturity",
      "Education-focused",
    ],
    claimCSR: "98.52%",
    badge: "Child Focused",
  },

  // ── MONEY BACK PLANS ────────────────────────────────────────────────
  {
    category: "moneyback",
    name: "LIC New Money Back - 20 Years",
    planNo: "Plan 920",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹1L – No Limit",
    policyTerm: "20 years",
    entryAge: "13–50 years",
    premium: "₹15,000–70,000/yr",
    keyFeatures: [
      "20% SA at years 5,10,15",
      "100% SA at maturity",
      "Bonus accrual",
      "Death cover throughout",
    ],
    claimCSR: "98.25%",
    badge: "Periodic Payout",
  },
  {
    category: "moneyback",
    name: "LIC New Money Back - 25 Years",
    planNo: "Plan 921",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹1L – No Limit",
    policyTerm: "25 years",
    entryAge: "13–45 years",
    premium: "₹18,000–80,000/yr",
    keyFeatures: [
      "15% SA at years 5,10,15,20",
      "40% SA at maturity",
      "Bonus + loyalty addition",
      "Death cover",
    ],
    claimCSR: "98.25%",
  },
  {
    category: "moneyback",
    name: "LIC Jeevan Umang",
    planNo: "Plan 945",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹2L – No Limit",
    policyTerm: "Till age 100",
    entryAge: "90 days–55 years",
    premium: "₹20,000–1,20,000/yr",
    keyFeatures: [
      "8% SA every year after premium term",
      "Whole life death cover",
      "Lump sum on survival to 100",
      "Highest survival benefit",
    ],
    claimCSR: "98.25%",
    badge: "Whole Life + SB",
  },
  {
    category: "moneyback",
    name: "LIC Bima Shree",
    planNo: "Plan 848",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹10L – No Limit",
    policyTerm: "14, 16, 18, 20 years",
    entryAge: "8–55 years",
    premium: "₹30,000–1,50,000/yr",
    keyFeatures: [
      "Guaranteed additions",
      "Periodic survival benefits",
      "High sum assured",
      "Limited pay option",
    ],
    claimCSR: "98.25%",
    badge: "High Net Worth",
  },

  // ── ULIP PLANS ──────────────────────────────────────────────────────
  {
    category: "ulip",
    name: "LIC SIIP",
    planNo: "Plan 852",
    claimType: "Individual Death + Maturity",
    sumAssured: "7x Annual Premium",
    policyTerm: "10–25 years",
    entryAge: "90 days–65 years",
    premium: "₹40,000/yr minimum",
    keyFeatures: [
      "4 fund options (Equity/Debt/Mix)",
      "NAV-based returns",
      "5 year lock-in",
      "Partial withdrawals after lock-in",
    ],
    claimCSR: "98.24% (Death)",
    badge: "Market Linked",
  },
  {
    category: "ulip",
    name: "LIC Index Plus",
    planNo: "Plan 873",
    claimType: "Individual Death + Maturity",
    sumAssured: "7x Annual Premium",
    policyTerm: "10–25 years",
    entryAge: "90 days–60 years",
    premium: "₹40,000/yr minimum",
    keyFeatures: [
      "Nifty 50 index tracking",
      "Lower charges vs SIIP",
      "Guaranteed additions after 5yr",
      "Online plan",
    ],
    claimCSR: "98.24% (Death)",
    badge: "Index Tracking",
  },

  // ── PENSION / ANNUITY PLANS ─────────────────────────────────────────
  {
    category: "pension",
    name: "LIC Jeevan Akshay - VII",
    planNo: "Plan 857",
    claimType: "Annuity / Pension Claims",
    sumAssured: "Based on purchase price",
    policyTerm: "Lifetime",
    entryAge: "30–85 years",
    premium: "₹1L+ (single premium)",
    keyFeatures: [
      "Immediate annuity",
      "10 payout options",
      "Joint life option",
      "Guaranteed lifetime pension",
    ],
    claimCSR: "99.92%",
    badge: "Immediate Pension",
  },
  {
    category: "pension",
    name: "LIC New Jeevan Shanti",
    planNo: "Plan 858",
    claimType: "Annuity / Pension Claims",
    sumAssured: "Based on purchase price",
    policyTerm: "Deferred or immediate",
    entryAge: "30–79 years",
    premium: "₹1.5L+ (single premium)",
    keyFeatures: [
      "Deferred annuity option",
      "Higher annuity rates",
      "Return of purchase price",
      "Joint life available",
    ],
    claimCSR: "99.92%",
    badge: "Deferred Pension",
  },
  {
    category: "pension",
    name: "LIC Saral Pension",
    planNo: "Plan 862",
    claimType: "Annuity / Pension Claims",
    sumAssured: "Based on purchase price",
    policyTerm: "Lifetime",
    entryAge: "40–80 years",
    premium: "₹1L+ (single premium)",
    keyFeatures: [
      "IRDAI standard product",
      "Simple 2 options only",
      "Return of purchase price on death",
      "Easy to understand",
    ],
    claimCSR: "99.92%",
    badge: "IRDAI Standard",
  },
  {
    category: "pension",
    name: "PMVVY",
    planNo: "Govt Scheme",
    claimType: "Annuity / Pension Claims",
    sumAssured: "₹15L maximum",
    policyTerm: "10 years",
    entryAge: "60+ years (Senior Citizens)",
    premium: "₹1.5L–15L (one-time)",
    keyFeatures: [
      "Government guaranteed 7.4% return",
      "Monthly/quarterly/yearly pension",
      "Senior citizens only",
      "LIC manages scheme",
    ],
    claimCSR: "99.99%",
    badge: "Govt Guaranteed",
  },

  // ── CHILD PLANS ─────────────────────────────────────────────────────
  {
    category: "child",
    name: "LIC New Children's Money Back",
    planNo: "Plan 932",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹1L – No Limit",
    policyTerm: "Till child turns 25",
    entryAge: "0–12 years (child)",
    premium: "₹10,000–50,000/yr",
    keyFeatures: [
      "Payouts at age 18, 20, 22",
      "Maturity at age 25",
      "Waiver of premium if parent dies",
      "Child still gets all benefits",
    ],
    claimCSR: "98.25%",
    badge: "Education Plan",
  },
  {
    category: "child",
    name: "LIC Jeevan Tarun",
    planNo: "Plan 934",
    claimType: "Individual Survival Benefit + Death",
    sumAssured: "₹75K – No Limit",
    policyTerm: "Till child turns 25",
    entryAge: "0–12 years (child)",
    premium: "₹8,000–40,000/yr",
    keyFeatures: [
      "Flexible SB payout (0–40% of SA)",
      "Maturity at age 25",
      "Waiver of premium rider",
      "LIC manages till maturity",
    ],
    claimCSR: "98.25%",
  },

  // ── GROUP PLANS ─────────────────────────────────────────────────────
  {
    category: "group",
    name: "LIC Group Term Insurance",
    planNo: "Plan G-47",
    claimType: "Group Death Claims",
    sumAssured: "As per employer",
    policyTerm: "1 year (renewable)",
    entryAge: "18–79 years",
    premium: "₹300–2,000/person/yr",
    keyFeatures: [
      "Employer-employee scheme",
      "Low group premium rates",
      "Flexible cover amounts",
      "Annual renewal",
    ],
    claimCSR: "98.20%",
    badge: "Employer Scheme",
  },
  {
    category: "group",
    name: "LIC Group Credit Life",
    planNo: "Plan G-48",
    claimType: "Group Death Claims",
    sumAssured: "Equals loan outstanding",
    policyTerm: "Loan tenure",
    entryAge: "18–65 years",
    premium: "Single premium (bank deducts)",
    keyFeatures: [
      "Covers bank/housing loans",
      "Decreasing cover = loan balance",
      "Bank is nominee",
      "Family protected from EMI",
    ],
    claimCSR: "98.20%",
    badge: "Loan Protection",
  },
  {
    category: "group",
    name: "LIC Gratuity Plus",
    planNo: "Plan G-03",
    claimType: "Group Death Claims",
    sumAssured: "As per gratuity rules",
    policyTerm: "Till retirement",
    entryAge: "18–60 years",
    premium: "Employer contribution",
    keyFeatures: [
      "Employer gratuity fund",
      "Tax-efficient structure",
      "Death + retirement benefit",
      "IRDAI-compliant",
    ],
    claimCSR: "98.20%",
    badge: "Corporate Plan",
  },

  // ── HEALTH & RIDERS ─────────────────────────────────────────────────
  {
    category: "health",
    name: "LIC New Jeevan Arogya",
    planNo: "Plan 904",
    claimType: "Health Claims (Hospitalization)",
    sumAssured: "₹1L–8L (HCB)",
    policyTerm: "1–5 years (renewable)",
    entryAge: "18–65 years",
    premium: "₹5,000–25,000/yr",
    keyFeatures: [
      "Hospital Cash Benefit daily",
      "Major surgical benefit",
      "Ambulance charges covered",
      "No medical test up to 45yr",
    ],
    claimCSR: "95%+",
    badge: "Health Plan",
  },
  {
    category: "health",
    name: "Accidental Death & Disability Rider",
    planNo: "UIN 512B209V02",
    claimType: "Individual Death Claims",
    sumAssured: "Up to base SA",
    policyTerm: "With base plan",
    entryAge: "18–65 years",
    premium: "₹1/1000 SA/yr (very low)",
    keyFeatures: [
      "Extra SA on accident death",
      "Disability income benefit",
      "Add-on to any LIC plan",
      "Very low extra premium",
    ],
    claimCSR: "98%+",
    badge: "Add-on Rider",
  },
  {
    category: "health",
    name: "Critical Illness Rider",
    planNo: "UIN 512B210V02",
    claimType: "Health Claims (Critical Illness)",
    sumAssured: "Up to ₹25L",
    policyTerm: "With base plan",
    entryAge: "18–65 years",
    premium: "₹500–3,000/yr",
    keyFeatures: [
      "15 critical illness covered",
      "Lump sum on diagnosis",
      "Cancer, Heart, Kidney etc.",
      "Waiver of future premiums",
    ],
    claimCSR: "90%+",
    badge: "Critical Illness",
  },
  {
    category: "health",
    name: "Waiver of Premium Rider",
    planNo: "UIN 512B208V01",
    claimType: "Rider Benefit",
    sumAssured: "Waiver of future premiums",
    policyTerm: "With base plan",
    entryAge: "18–60 years",
    premium: "₹300–1,500/yr",
    keyFeatures: [
      "Premiums waived on disability",
      "Policy continues fully",
      "Life cover maintained",
      "Ideal for sole earner",
    ],
    claimCSR: "95%+",
    badge: "WOP Rider",
  },

  // ── MICRO-INSURANCE ─────────────────────────────────────────────────
  {
    category: "micro",
    name: "PMJJBY (LIC Manages)",
    planNo: "Govt Scheme",
    claimType: "Micro-Insurance Death Claims",
    sumAssured: "₹2 Lakhs",
    policyTerm: "1 year (auto-renew)",
    entryAge: "18–50 years",
    premium: "₹436/yr",
    keyFeatures: [
      "Lowest premium in India",
      "Government-backed",
      "Bank account linked",
      "Death cover only",
    ],
    claimCSR: "97.20%",
    badge: "#1 Govt Scheme",
  },
  {
    category: "micro",
    name: "LIC Micro Bachat",
    planNo: "Plan 951",
    claimType: "Micro-Insurance Death Claims",
    sumAssured: "₹50K–2L",
    policyTerm: "10–15 years",
    entryAge: "18–55 years",
    premium: "₹1,000–5,000/yr",
    keyFeatures: [
      "Rural & urban low income",
      "Small SA, affordable premium",
      "Death + maturity benefit",
      "LIC micro segment",
    ],
    claimCSR: "97.20%",
    badge: "Rural Plan",
  },
  {
    category: "micro",
    name: "Aam Aadmi Bima Yojana",
    planNo: "Govt Scheme",
    claimType: "Micro-Insurance Death Claims",
    sumAssured: "₹30K–75K",
    policyTerm: "Annual",
    entryAge: "18–59 years (head of family)",
    premium: "₹200/yr (govt subsidized)",
    keyFeatures: [
      "BPL families only",
      "Accidental disability cover",
      "Child scholarship included",
      "State govt co-payment",
    ],
    claimCSR: "97%+",
    badge: "BPL Scheme",
  },
];

// ─────────────────────────────────────────────
const ICONS: Record<string, string> = {
  shield: "fa-solid fa-shield-halved",
  trending: "fa-solid fa-arrow-trend-up",
  refresh: "fa-solid fa-rotate",
  zap: "fa-solid fa-bolt",
  building: "fa-solid fa-building",
  baby: "fa-solid fa-baby",
  users: "fa-solid fa-users",
  heart: "fa-solid fa-heart",
  star: "fa-solid fa-star",
};

interface LICPlansDetailSectionProps {
  selectedYear?: string;
}

export function LICPlansDetailSection({ selectedYear }: LICPlansDetailSectionProps) {
  const [selectedCat, setSelectedCat] = useState("term");
  const [expandedPlan, setExpandedPlan] = useState<string | null>(null);

  const catMeta = PLAN_CATEGORIES.find((c) => c.key === selectedCat)!;
  const filteredPlans = ALL_PLANS.filter((p) => p.category === selectedCat);

  return (
    <section className="licplans-section">
      {/* Header */}
      <div className="licplans-header">
        <div className="licplans-badge">
          <i className="fa-solid fa-star" style={{ fontSize: "13px" }}></i> All LIC Plans — Official Products
        </div>
        <h2 className="licplans-title">
          LIC Insurance Plans — <span>Complete List</span>
        </h2>
        <p className="licplans-subtitle">
          {ALL_PLANS.length} plans across 9 categories ·{" "}
          <a
            href="https://licindia.in/web/guest/products"
            target="_blank"
            rel="noopener noreferrer"
            className="licplans-link"
          >
            licindia.in <i className="fa-solid fa-up-right-from-square" style={{ fontSize: "11px" }}></i>
          </a>{" "}
          · With Claim Type &amp; CSR for each plan
        </p>
      </div>

      {/* Summary counts */}
      <div className="licplans-counts">
        {PLAN_CATEGORIES.map((c) => {
          const count = ALL_PLANS.filter((p) => p.category === c.key).length;
          const iconClass = ICONS[c.icon];
          return (
            <button
              key={c.key}
              className={`licplans-count-btn ${selectedCat === c.key ? "active" : ""}`}
              style={{ ["--cat-clr" as any]: c.color }}
              onClick={() => {
                setSelectedCat(c.key);
                setExpandedPlan(null);
              }}
            >
              <i className={iconClass} style={{ fontSize: "14px" }}></i>
              <span>{c.label}</span>
              <span className="licplans-count-num">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Plans list */}
      <div className="licplans-list">
        <div className="licplans-list-header" style={{ borderColor: catMeta.color }}>
          <div style={{ color: catMeta.color, display: "flex", alignItems: "center", gap: 8 }}>
            <i className={ICONS[catMeta.icon]} style={{ fontSize: "18px" }}></i>
            <strong>{catMeta.label}</strong>
          </div>
          <span style={{ fontSize: ".75rem", color: "#64748b" }}>{filteredPlans.length} plans</span>
        </div>

        {filteredPlans.map((plan) => {
          const isOpen = expandedPlan === plan.planNo;
          return (
            <div
              key={plan.planNo}
              className={`licplans-card ${isOpen ? "open" : ""}`}
              style={{ ["--plan-clr" as any]: catMeta.color }}
            >
              {/* Plan header row */}
              <button
                className="licplans-card-header"
                onClick={() => setExpandedPlan(isOpen ? null : plan.planNo)}
              >
                <div className="licplans-card-left">
                  <div className="licplans-card-name">
                    {plan.name}
                    {plan.badge && (
                      <span
                        className="licplans-badge"
                        style={{ background: `${catMeta.color}22`, color: catMeta.color }}
                      >
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <div className="licplans-card-meta">
                    <span className="licplans-plan-no">{plan.planNo}</span>
                    <span className="licplans-claim-type">{plan.claimType}</span>
                    <span className="licplans-csr" style={{ color: "#10b981" }}>
                      CSR: {plan.claimCSR}
                    </span>
                    <span className="licplans-sa-mobile">SA: {plan.sumAssured}</span>
                  </div>
                </div>
                <div className="licplans-card-right">
                  <div className="licplans-sa">{plan.sumAssured}</div>
                  <div className="licplans-sa-label">Sum Assured</div>
                  {isOpen ? (
                    <i className="fa-solid fa-chevron-up" style={{ fontSize: "16px", color: "#64748b" }}></i>
                  ) : (
                    <i className="fa-solid fa-chevron-down" style={{ fontSize: "16px", color: "#64748b" }}></i>
                  )}
                </div>
              </button>

              {/* Expanded detail */}
              {isOpen && (
                <div className="licplans-detail">
                  <div className="licplans-detail-grid">
                    <div className="licplans-detail-item">
                      <span className="licplans-detail-label">Policy Term</span>
                      <span className="licplans-detail-val">{plan.policyTerm}</span>
                    </div>
                    <div className="licplans-detail-item">
                      <span className="licplans-detail-label">Entry Age</span>
                      <span className="licplans-detail-val">{plan.entryAge}</span>
                    </div>
                    <div className="licplans-detail-item">
                      <span className="licplans-detail-label">Premium Range</span>
                      <span className="licplans-detail-val">{plan.premium}</span>
                    </div>
                    <div className="licplans-detail-item">
                      <span className="licplans-detail-label">Claim Settlement</span>
                      <span
                        className="licplans-detail-val"
                        style={{ color: "#10b981", fontWeight: 700 }}
                      >
                        {plan.claimCSR}
                      </span>
                    </div>
                  </div>
                  <div className="licplans-features">
                    {plan.keyFeatures.map((f) => (
                      <div key={f} className="licplans-feature">
                        <i className="fa-solid fa-circle-check" style={{ fontSize: "13px", color: catMeta.color }}></i>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://licindia.in/web/guest/products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="licplans-cta"
                    style={{ background: catMeta.color }}
                  >
                    View on LIC Official Site <i className="fa-solid fa-up-right-from-square" style={{ fontSize: "12px" }}></i>
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <p className="licplans-footer">
        <i className="fa-solid fa-circle-info" style={{ fontSize: "12px" }}></i> All plan details from{" "}
        <a href="https://licindia.in/web/guest/products" target="_blank" rel="noopener noreferrer">
          LIC Official Website
        </a>{" "}
        · CSR from{" "}
        <a
          href="https://irdai.gov.in/en/handbook-of-indian-insurance"
          target="_blank"
          rel="noopener noreferrer"
        >
          IRDAI Handbook 2024-25
        </a>{" "}
        · Data updated June 2025
      </p>
    </section>
  );
}
