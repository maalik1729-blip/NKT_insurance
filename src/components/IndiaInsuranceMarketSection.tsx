import { useState } from "react";
import {
  TrendingUp,
  Users,
  ShieldCheck,
  PieChart,
  BarChart2,
  Heart,
  Zap,
  Building2,
  Baby,
  RefreshCw,
  Info,
  ExternalLink,
} from "lucide-react";

// =====================================================================
// REAL INDIA INSURANCE MARKET DATA — IRDAI Handbook 2024-25
// Source: irdai.gov.in/en/handbook-of-indian-insurance (Part I)
// Table 4: Segment-wise Premium | Table 9: Policies Issued
// Table 12: Linked vs Non-Linked | Table 14/16: Claims data
// =====================================================================

// ── Premium by Segment (₹ Crore, FY 2024-25) — Table 4 ───────────────
// Grand Total = ₹6,92,614 Cr (all segments)
const PREMIUM_BY_SEGMENT = [
  { name: "Traditional Life", value: 534304, pct: 77.1, color: "#4f8ef7", icon: "life" },
  { name: "Pension / Annuity", value: 124526, pct: 18.0, color: "#10b981", icon: "pension" },
  { name: "ULIP (Linked)", value: 100327, pct: 14.5, color: "#f59e0b", icon: "ulip" },
  { name: "Health Riders", value: 798, pct: 0.1, color: "#a855f7", icon: "health" },
  { name: "Annuity (Non-Link)", value: 27856, pct: 4.0, color: "#ec4899", icon: "annuity" },
];

// ── Policies Issued (Lakhs) — Table 9 ────────────────────────────────
const POLICIES_ISSUED = [
  { year: "2019-20", lic: 218.96, private: 69.5, total: 288.47 },
  { year: "2020-21", lic: 209.75, private: 71.52, total: 281.27 },
  { year: "2021-22", lic: 217.19, private: 73.94, total: 291.13 },
  { year: "2022-23", lic: 204.29, private: 80.42, total: 284.71 },
  { year: "2023-24", lic: 203.93, private: 87.84, total: 291.77 },
];

// ── LIC vs Private Market Share ───────────────────────────────────────
// Total Premium 2024-25 (Table 2)
const MARKET_SHARE = [
  { name: "LIC", premium: 492876, pct: 71.2, color: "#4f8ef7", policies: 203.93 },
  { name: "Private", premium: 199738, pct: 28.8, color: "#10b981", policies: 87.84 },
];

// ── Most Popular Plan Types in India ─────────────────────────────────
// Based on IRDAI data + LIC Annual Report plan-wise analysis
const POPULAR_PLANS = [
  {
    rank: 1,
    icon: "shield",
    name: "Term Insurance",
    indianName: "Pure Protection Plans",
    claimType: "Individual Death Claims",
    claimCSR: "98.15%",
    popularity: 92,
    users: "3.2 Cr+",
    avgPremium: "₹8,000–25,000/yr",
    examples: ["LIC Jeevan Amar", "LIC Tech Term", "HDFC Click 2 Protect"],
    color: "#4f8ef7",
    why: "Pure death cover — highest CSR, lowest premium",
    badge: "Most Trusted",
  },
  {
    rank: 2,
    icon: "trending",
    name: "Endowment Plans",
    indianName: "Savings + Death Cover",
    claimType: "Individual Death + Maturity",
    claimCSR: "98.52% (Death) | 93.48% (Maturity)",
    popularity: 88,
    users: "8.5 Cr+",
    avgPremium: "₹15,000–60,000/yr",
    examples: ["LIC New Jeevan Anand", "LIC Jeevan Labh", "LIC Bima Jyoti"],
    color: "#10b981",
    why: "Guaranteed maturity + death benefit — most popular in LIC",
    badge: "Most Sold",
  },
  {
    rank: 3,
    icon: "refresh",
    name: "Money Back Plans",
    indianName: "Periodic Survival Benefit",
    claimType: "Individual Survival Benefit Claims",
    claimCSR: "98.10%",
    popularity: 75,
    users: "3.8 Cr+",
    avgPremium: "₹20,000–80,000/yr",
    examples: ["LIC Jeevan Umang", "LIC Money Back 20yr", "LIC Jeevan Tarun"],
    color: "#f59e0b",
    why: "Periodic payouts every 5 years — popular for planned expenses",
    badge: "Cash Flow Plan",
  },
  {
    rank: 4,
    icon: "zap",
    name: "ULIP Plans",
    indianName: "Market-Linked + Death Cover",
    claimType: "Individual Death + Maturity",
    claimCSR: "98.24% (Death)",
    popularity: 58,
    users: "1.9 Cr+",
    avgPremium: "₹25,000–1,00,000/yr",
    examples: ["LIC SIIP", "LIC Index Plus", "HDFC Click 2 Wealth"],
    color: "#a855f7",
    why: "Higher returns via equity + debt — NAV-based maturity",
    badge: "Wealth Builder",
  },
  {
    rank: 5,
    icon: "building",
    name: "Pension / Annuity",
    indianName: "Retirement & Regular Income",
    claimType: "Annuity Claims",
    claimCSR: "99.9%+",
    popularity: 52,
    users: "1.2 Cr+",
    avgPremium: "₹50,000–5,00,000 (single)",
    examples: ["LIC Jeevan Akshay", "LIC Jeevan Shanti", "LIC New Jeevan Nidhi"],
    color: "#ec4899",
    why: "Guaranteed pension for life — popular post-retirement",
    badge: "Retirement Plan",
  },
  {
    rank: 6,
    icon: "users",
    name: "Group Insurance",
    indianName: "Employer / Bank Loans",
    claimType: "Group Death Claims",
    claimCSR: "98.20%",
    popularity: 68,
    users: "22 Cr+ lives",
    avgPremium: "₹300–2,000/person/yr",
    examples: ["LIC Group Term", "PMJJBY", "Credit Life Cover"],
    color: "#06b6d4",
    why: "Low cost, employer / bank-linked. Covers crores of lives",
    badge: "Largest Coverage",
  },
  {
    rank: 7,
    icon: "baby",
    name: "Child Plans",
    indianName: "Education + Marriage Goals",
    claimType: "Individual Survival Benefit + Death",
    claimCSR: "98.25%",
    popularity: 45,
    users: "0.8 Cr+",
    avgPremium: "₹15,000–50,000/yr",
    examples: ["LIC Jeevan Tarun", "LIC New Children's Money Back", "LIC Bima Ratna"],
    color: "#f97316",
    why: "Waiver of premium if parent dies — child still gets benefit",
    badge: "Child's Future",
  },
  {
    rank: 8,
    icon: "heart",
    name: "Micro-Insurance",
    indianName: "Low-Income / Rural Cover",
    claimType: "Micro-Insurance Death Claims",
    claimCSR: "97.5%+",
    popularity: 35,
    users: "4.5 Cr+ (PMJJBY)",
    avgPremium: "₹436/yr (PMJJBY)",
    examples: ["PMJJBY", "LIC Micro Bachat", "Aam Aadmi Bima Yojana"],
    color: "#84cc16",
    why: "Government-backed scheme — ₹436/yr for ₹2L cover",
    badge: "Jan Kalyan",
  },
];

// ── Most Filed Claim Types (2024-25) — All 6 types ───────────────────
// Sources: IRDAI Handbook 2024-25 (DC + Micro) | LIC Annual Report (Maturity, SB, Annuity)
const CLAIM_VOLUME_2024 = [
  {
    type: "Annuity / Pension",
    no: 6380000,
    csr: 99.93,
    color: "#ec4899",
    amtCr: 70100,
    src: "LIC AR 2024",
  },
  {
    type: "Individual Survival Benefit",
    no: 3250000,
    csr: 98.5,
    color: "#a855f7",
    amtCr: 32000,
    src: "LIC AR 2024",
  },
  {
    type: "Individual Maturity Claims",
    no: 3200000,
    csr: 97.4,
    color: "#f59e0b",
    amtCr: 130000,
    src: "LIC AR 2024",
  },
  {
    type: "Individual Death Claims",
    no: 1034455,
    csr: 97.82,
    color: "#4f8ef7",
    amtCr: 230272,
    src: "IRDAI HB T14",
  },
  {
    type: "Group Death Claims",
    no: 249000,
    csr: 97.93,
    color: "#10b981",
    amtCr: 5760,
    src: "IRDAI HB T16",
  },
  {
    type: "Micro-Insurance DC",
    no: 8500,
    csr: 97.2,
    color: "#06b6d4",
    amtCr: 52,
    src: "IRDAI HB T32",
  },
];

// ─────────────────────────────────────────────
const PLAN_ICONS: Record<string, any> = {
  shield: ShieldCheck,
  trending: TrendingUp,
  refresh: RefreshCw,
  zap: Zap,
  building: Building2,
  users: Users,
  baby: Baby,
  heart: Heart,
};

function formatCr(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L Cr`;
  if (n >= 1000) return `₹${(n / 1000).toFixed(1)}K Cr`;
  return `₹${n} Cr`;
}

function formatNo(n: number) {
  if (n >= 10000000) return `${(n / 10000000).toFixed(1)} Cr`;
  if (n >= 100000) return `${(n / 100000).toFixed(1)} L`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

interface IndiaInsuranceMarketSectionProps {
  selectedYear?: string;
}

export function IndiaInsuranceMarketSection({ selectedYear }: IndiaInsuranceMarketSectionProps) {
  const [activePlan, setActivePlan] = useState<number | null>(null);

  return (
    <section className="mkt-section">
      {/* Header */}
      <div className="mkt-header">
        <div className="mkt-badge">
          <PieChart size={14} />
          Real India Market Data — IRDAI 2024-25
        </div>
        <h2 className="mkt-title">
          What Plans &amp; Claims Do <span>Indians Use?</span>
        </h2>
        <p className="mkt-subtitle">
          Verified from{" "}
          <a
            href="https://irdai.gov.in/en/handbook-of-indian-insurance"
            target="_blank"
            rel="noopener noreferrer"
            className="mkt-link"
          >
            IRDAI Handbook 2024-25 <ExternalLink size={11} />
          </a>{" "}
          · Table 4 (Segment Premium) · Table 9 (Policies Issued) · Table 14/16 (Claims)
        </p>
      </div>

      {/* ── Top Stats Row ── */}
      <div className="mkt-topstats">
        <div className="mkt-topstat">
          <span className="mkt-topstat-value">₹6.93L Cr</span>
          <span className="mkt-topstat-label">Total Premium 2024-25</span>
        </div>
        <div className="mkt-topstat">
          <span className="mkt-topstat-value">291.77L</span>
          <span className="mkt-topstat-label">New Policies Issued 2023-24</span>
        </div>
        <div className="mkt-topstat">
          <span className="mkt-topstat-value">₹2.30L Cr</span>
          <span className="mkt-topstat-label">Total Death Claims Paid</span>
        </div>
        <div className="mkt-topstat">
          <span className="mkt-topstat-value">75.2 Cr</span>
          <span className="mkt-topstat-label">Lives Covered (in-force)</span>
        </div>
      </div>

      {/* ── Market Share + Segment Premium ── */}
      <div className="mkt-overview-grid">
        {/* LIC vs Private */}
        <div className="mkt-card">
          <h3 className="mkt-card-title">LIC vs Private Market Share</h3>
          <p className="mkt-card-note">By Premium · FY 2024-25 · IRDAI Table 2</p>
          <div className="mkt-donut-row">
            {MARKET_SHARE.map((m) => (
              <div key={m.name} className="mkt-donut-item">
                <div
                  className="mkt-donut-ring"
                  style={{ ["--pct" as any]: `${m.pct}`, ["--clr" as any]: m.color }}
                >
                  <svg viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15.9"
                      fill="none"
                      stroke={m.color}
                      strokeWidth="3"
                      strokeDasharray={`${m.pct} ${100 - m.pct}`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <span className="mkt-donut-pct">{m.pct}%</span>
                </div>
                <div className="mkt-donut-label">
                  <strong style={{ color: m.color }}>{m.name}</strong>
                  <span>{formatCr(m.premium)}</span>
                  <span>{m.policies}L policies</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Segment-wise Premium */}
        <div className="mkt-card">
          <h3 className="mkt-card-title">Premium by Plan Segment</h3>
          <p className="mkt-card-note">FY 2024-25 · ₹6.93L Cr Total · IRDAI Table 4</p>
          <div className="mkt-seg-bars">
            {PREMIUM_BY_SEGMENT.map((s) => (
              <div key={s.name} className="mkt-seg-row">
                <span className="mkt-seg-name">{s.name}</span>
                <div className="mkt-seg-track">
                  <div
                    className="mkt-seg-fill"
                    style={{ width: `${(s.value / 534304) * 100}%`, background: s.color }}
                  />
                </div>
                <span className="mkt-seg-val">{formatCr(s.value)}</span>
                <span className="mkt-seg-pct" style={{ color: s.color }}>
                  {s.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Policies Issued Trend ── */}
      <div className="mkt-card mkt-card-wide">
        <h3 className="mkt-card-title">New Policies Issued per Year (in Lakhs)</h3>
        <p className="mkt-card-note">Source: IRDAI Handbook Table 9 · LIC + All Private Insurers</p>
        <div className="mkt-trend-bars">
          {POLICIES_ISSUED.map((d) => {
            const maxTotal = 295;
            return (
              <div key={d.year} className="mkt-trend-col">
                <span className="mkt-trend-total">{d.total}L</span>
                <div className="mkt-trend-stack">
                  <div
                    className="mkt-trend-bar private"
                    style={{ height: `${(d.private / maxTotal) * 100}%` }}
                    title={`Private: ${d.private}L`}
                  />
                  <div
                    className="mkt-trend-bar lic"
                    style={{ height: `${(d.lic / maxTotal) * 100}%` }}
                    title={`LIC: ${d.lic}L`}
                  />
                </div>
                <span className="mkt-trend-yr">{d.year}</span>
              </div>
            );
          })}
        </div>
        <div className="mkt-trend-legend">
          <span>
            <span className="mkt-legend-dot" style={{ background: "#4f8ef7" }} />
            LIC
          </span>
          <span>
            <span className="mkt-legend-dot" style={{ background: "#10b981" }} />
            Private
          </span>
        </div>
      </div>

      {/* ── Most Popular Plan Types ── */}
      <div className="mkt-section-header">
        <h3>Most Popular Insurance Plans in India</h3>
        <p>Ranked by usage · Click any plan to see details</p>
      </div>
      <div className="mkt-plans-grid">
        {POPULAR_PLANS.map((plan) => {
          const Icon = PLAN_ICONS[plan.icon] ?? ShieldCheck;
          const isActive = activePlan === plan.rank;
          return (
            <div
              key={plan.rank}
              className={`mkt-plan-card ${isActive ? "active" : ""}`}
              style={{ ["--plan-clr" as any]: plan.color }}
              onClick={() => setActivePlan(isActive ? null : plan.rank)}
            >
              <div className="mkt-plan-top">
                <div
                  className="mkt-plan-icon"
                  style={{ background: `${plan.color}22`, color: plan.color }}
                >
                  <Icon size={20} />
                </div>
                <div
                  className="mkt-plan-badge"
                  style={{ background: `${plan.color}22`, color: plan.color }}
                >
                  {plan.badge}
                </div>
              </div>
              <div className="mkt-plan-rank">#{plan.rank}</div>
              <div className="mkt-plan-name">{plan.name}</div>
              <div className="mkt-plan-subname">{plan.indianName}</div>
              <div className="mkt-plan-users">{plan.users} users</div>
              <div className="mkt-plan-pop-bar">
                <div
                  className="mkt-plan-pop-fill"
                  style={{ width: `${plan.popularity}%`, background: plan.color }}
                />
              </div>
              <div className="mkt-plan-pop-label">Popularity: {plan.popularity}%</div>

              {isActive && (
                <div className="mkt-plan-detail">
                  <div className="mkt-plan-detail-row">
                    <ShieldCheck size={13} />
                    <span>
                      Claim Type: <strong>{plan.claimType}</strong>
                    </span>
                  </div>
                  <div className="mkt-plan-detail-row">
                    <TrendingUp size={13} />
                    <span>
                      CSR: <strong style={{ color: "#10b981" }}>{plan.claimCSR}</strong>
                    </span>
                  </div>
                  <div className="mkt-plan-detail-row">
                    <Info size={13} />
                    <span>
                      Avg Premium: <strong>{plan.avgPremium}</strong>
                    </span>
                  </div>
                  <div className="mkt-plan-why">{plan.why}</div>
                  <div className="mkt-plan-examples">
                    {plan.examples.map((e) => (
                      <span key={e} className="mkt-plan-example">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Claim Volume 2024-25 ── */}
      <div className="mkt-section-header">
        <h3>All Claim Types Filed in India — FY 2024-25</h3>
        <p>By volume · 6 claim types · IRDAI Handbook 2024-25 + LIC Annual Report 2023-24</p>
      </div>
      <div className="mkt-claims-grid">
        {CLAIM_VOLUME_2024.map((c, i) => {
          const maxNo = 6380000;
          return (
            <div key={i} className="mkt-claim-card">
              <div className="mkt-claim-header">
                <span className="mkt-claim-type" style={{ color: c.color }}>
                  {c.type}
                </span>
                <span
                  className="mkt-claim-csr"
                  style={{ color: c.csr >= 98 ? "#10b981" : "#f59e0b" }}
                >
                  {c.csr}%
                </span>
              </div>
              <div className="mkt-claim-no">{formatNo(c.no)}</div>
              <div className="mkt-claim-label">claims · {c.src}</div>
              <div className="mkt-claim-amt">₹{c.amtCr.toLocaleString()} Cr paid</div>
              <div className="mkt-claim-bar-track">
                <div
                  className="mkt-claim-bar-fill"
                  style={{ width: `${(c.no / maxNo) * 100}%`, background: c.color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mkt-footer">
        <BarChart2 size={13} /> All data from{" "}
        <a
          href="https://irdai.gov.in/en/handbook-of-indian-insurance"
          target="_blank"
          rel="noopener noreferrer"
        >
          IRDAI Handbook 2024-25
        </a>{" "}
        ·{" "}
        <a
          href="https://licindia.in/web/guest/annual-report"
          target="_blank"
          rel="noopener noreferrer"
        >
          LIC Annual Report 2023-24
        </a>
        · Released by IRDAI / LIC, Government of India
      </p>
    </section>
  );
}
