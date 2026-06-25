import { useState, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ShieldCheck,
  TrendingUp,
  Users,
  BarChart2,
  Heart,
  MapPin,
  RefreshCw,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  ArrowLeft,
  Car,
} from "lucide-react";
import logoImg from "@/assets/images/logo.png";
import "@/styles/dashboard.css";
import { IndiaInsuranceMarketSection } from "../IndiaInsuranceMarketSection";
import { LICPlansDetailSection } from "../LICPlansDetailSection";
import { IRDAIClaimsSection } from "../IRDAIClaimsSection";
import { StateWiseLapseSection } from "../StateWiseLapseSection";
import "@/styles/market-section.css";
import "@/styles/plans-state-sections.css";
import {
  CSR_TREND,
  DEATH_AMT_TREND,
  CLAIMS_VOLUME,
  PREMIUM_SEGMENT,
  POLICIES_ISSUED,
  MARKET_SHARE,
  INSURER_CSR,
  LAPSE_DATA,
  TOP_STATES,
  KPI_CARDS,
  COLORS_CSR,
  HEALTH_MARKET_SHARE_ALL,
  HEALTH_CSR_ALL,
  HEALTH_CLAIM_CATEGORIES,
  HEALTH_REJECTION_REASONS,
  MOTOR_MARKET_SHARE_ALL,
  MOTOR_CSR_ALL,
  MOTOR_CLAIM_CATEGORIES,
  MOTOR_REJECTION_REASONS,
  HEALTH_CSR_TREND,
  MOTOR_CSR_TREND,
  KPIS_BY_YEAR,
} from "./DashboardData";

// ── Custom Tooltip ─────────────────────────────────────────────────
interface TooltipPayloadItem {
  name: string;
  value: number | string;
  color?: string;
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="db-tooltip">
      <p className="db-tooltip-label">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }}>
          {p.name}:{" "}
          <strong>
            {typeof p.value === "number" && p.value > 100 ? p.value.toLocaleString() : p.value}
          </strong>
        </p>
      ))}
    </div>
  );
};

// ── KPI Icon ───────────────────────────────────────────────────────
function KPIIcon({ type, size = 18 }: { type: string; size?: number }) {
  const props = { size };
  if (type === "bar") return <BarChart2 {...props} />;
  if (type === "pie") return <Activity {...props} />;
  if (type === "shield") return <ShieldCheck {...props} />;
  if (type === "heart") return <Heart {...props} />;
  if (type === "users") return <Users {...props} />;
  if (type === "globe") return <Globe {...props} />;
  if (type === "file") return <FileText {...props} />;
  return <RefreshCw {...props} />;
}

// ── Main Dashboard Component ───────────────────────────────────────
export function InsuranceDashboard() {
  const [activeTab, setActiveTab] = useState<
    "claims" | "plans" | "market" | "state" | "health" | "motor"
  >("claims");
  const [selectedYear, setSelectedYear] = useState<string>("2024-25");
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      if (w < 800) setSidebarOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const YEARS = ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25", "2025-26"];

  const NAV_TABS = [
    { key: "claims", label: "Claims",  icon: ShieldCheck },
    { key: "plans",  label: "Market",  icon: BarChart2   },
    { key: "market", label: "Compare", icon: TrendingUp  },
    { key: "state",  label: "State",   icon: MapPin      },
    { key: "health", label: "Health",  icon: Heart       },
    { key: "motor",  label: "Motor",   icon: Car         },
  ] as const;

  return (
    <div className="db-root">
      {/* ── Sidebar ── */}
      <aside className={`db-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Toggle chevron button */}
        <button
          className="db-sidebar-toggle"
          onClick={() => setSidebarOpen((v) => !v)}
          title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M6.5 1.5L3 5l3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M3.5 1.5L7 5l-3.5 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>

        {/* Logo */}
        <div className="db-logo">
          <img
            src={logoImg}
            alt="NKT Logo"
            style={{ width: "32px", height: "32px", objectFit: "contain", flexShrink: 0 }}
          />
          <div className="db-logo-text">
            <span className="db-logo-name">NKT Insurance</span>
            <span className="db-logo-sub">LIC · IRDAI Data</span>
          </div>
        </div>

        {/* Analytics nav */}
        <div className="db-nav-section db-nav-section--tabs">
          <div className="db-nav-section-label">Analytics</div>
          <nav className="db-nav">
            {NAV_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`db-nav-btn ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
                title={label}
              >
                <Icon size={16} />
                <span>{label}</span>
                <span className="db-nav-btn-dot" />
              </button>
            ))}
          </nav>
        </div>

        <div className="db-sidebar-divider" />

        {/* Navigation back */}
        <div className="db-nav-section db-nav-section--nav">
          <div className="db-nav-section-label">Navigation</div>
          <nav className="db-nav">
            <a href="/admin/login" className="db-nav-btn back-btn" title="Back">
              <ArrowLeft size={16} />
              <span>Back</span>
            </a>
          </nav>
        </div>

        <div className="db-sidebar-divider" />

        {/* Footer */}
        <div className="db-sidebar-footer">
          <p>Data Sources:</p>
          <p>
            <a href="https://irdai.gov.in/en/handbook-of-indian-insurance" target="_blank" rel="noopener noreferrer">
              IRDAI Handbook 2024-25
            </a>
          </p>
          <p>
            <a href="https://licindia.in/web/guest/annual-report" target="_blank" rel="noopener noreferrer">
              LIC Annual Report 2023-24
            </a>
          </p>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="db-main">
        {/* Top bar */}
        <div className="db-topbar">
          <div>
            <h1 className="db-page-title">Insurance Analytics</h1>
            <p className="db-page-sub">Official IRDAI data · LIC Annual Reports · 2020–2026</p>
          </div>
          <div className="db-topbar-right">
            {/* Year pill selector */}
            <div className="db-year-pills">
              {YEARS.map((y) => (
                <button
                  key={y}
                  className={`db-year-pill ${selectedYear === y ? "active" : ""}`}
                  onClick={() => setSelectedYear(y)}
                >
                  {y === "2025-26" ? "2025-26★" : y}
                </button>
              ))}
            </div>
            <span className="db-live-badge">
              <span className="db-live-dot" />
              Live
            </span>
            <span className="db-updated hide-mobile">Jun 2026</span>
          </div>
        </div>

        {/* Inner scrollable area */}
        <div className="db-inner">
          {/* Global KPI Cards */}
          <div className="db-kpi-grid">
            {KPI_CARDS.map((k) => (
              <div
                key={k.label}
                className="db-kpi-card"
                style={{ "--kpi-clr": k.color } as React.CSSProperties}
              >
                <div className="db-kpi-icon" style={{ background: `${k.color}18`, color: k.color }}>
                  <KPIIcon type={k.icon} size={18} />
                </div>
                <div className="db-kpi-body">
                  <span className="db-kpi-label">{k.label}</span>
                  <span className="db-kpi-value">{k.value}</span>
                  <span className={`db-kpi-delta ${k.up ? "up" : "down"}`}>
                    {k.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {k.delta} vs prev yr
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Horizontal tab bar */}
          <div className="db-tab-nav">
            {NAV_TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`db-tab-btn ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={14} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Tab content */}
          {mounted ? (
            <>
              {activeTab === "claims" && <ClaimsTab selectedYear={selectedYear} isMobile={isMobile} />}
              {activeTab === "plans"  && <MarketTab selectedYear={selectedYear} isMobile={isMobile} />}
              {activeTab === "market" && <InsurerTab selectedYear={selectedYear} isMobile={isMobile} />}
              {activeTab === "state"  && <StateTab selectedYear={selectedYear} isMobile={isMobile} />}
              {activeTab === "health" && <HealthTab selectedYear={selectedYear} isMobile={isMobile} />}
              {activeTab === "motor"  && <MotorTab selectedYear={selectedYear} isMobile={isMobile} />}
            </>
          ) : (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              height: "400px", fontSize: "0.9rem", color: "var(--tx-3)"
            }}>
              Loading analytics…
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


// ── CSR Line Legend Labels ─────────────────────────────────────────
const CSR_LINES = [
  { key: "indlDeath", name: "Indl Death", color: COLORS_CSR.indlDeath },
  { key: "groupDeath", name: "Group Death", color: COLORS_CSR.groupDeath },
  { key: "maturity", name: "Maturity", color: COLORS_CSR.maturity },
  { key: "survival", name: "Survival Benf", color: COLORS_CSR.survival },
  { key: "annuity", name: "Annuity", color: COLORS_CSR.annuity },
  { key: "industry", name: "Industry Avg", color: COLORS_CSR.industry, dashed: true },
] as const;

// ── TAB: CLAIMS ────────────────────────────────────────────────────
function ClaimsTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  const [activeLine, setActiveLine] = useState<string | null>(null);

  const handleLegendClick = useCallback((key: string) => {
    setActiveLine((prev) => (prev === key ? null : key));
  }, []);

  return (
    <div className="db-tab-content">
      {/* Row 1: High-Level Overview Trends */}
      <div className="db-charts-row">
        {/* CSR Trend Line Chart — with click-to-highlight */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Claim Settlement Ratio Trend — All Types (2019-2025)</h3>
            <span className="db-chart-src">IRDAI Handbook 2024-25 + LIC Annual Report</span>
          </div>
          {/* Custom interactive legend */}
          <div className="db-csr-legend">
            {CSR_LINES.map((l) => {
              const isActive = activeLine === null || activeLine === l.key;
              return (
                <button
                  key={l.key}
                  className={`db-csr-leg-btn ${!isActive ? "faded" : ""} ${activeLine === l.key ? "selected" : ""}`}
                  onClick={() => handleLegendClick(l.key)}
                  title={`Click to highlight ${l.name}`}
                >
                  <span
                    className="db-csr-leg-swatch"
                    style={{
                      background: l.color,
                      opacity: isActive ? 1 : 0.3,
                      ...("dashed" in l && l.dashed ? { backgroundImage: `repeating-linear-gradient(90deg,${l.color} 0,${l.color} 6px,transparent 6px,transparent 10px)`, background: "none" } : {}),
                    }}
                  />
                  <span style={{ opacity: isActive ? 1 : 0.45 }}>{l.name}</span>
                </button>
              );
            })}
            {activeLine && (
              <button className="db-csr-leg-clear" onClick={() => setActiveLine(null)}>✕ Show all</button>
            )}
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="99%" height="100%">
              <LineChart
                data={CSR_TREND}
                margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis
                  domain={[85, 100]}
                  tick={{ fill: "#374151", fontSize: 11 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                {CSR_LINES.map((l) => {
                  const isActive = activeLine === null || activeLine === l.key;
                  return (
                    <Line
                      key={l.key}
                      type="monotone"
                      dataKey={l.key}
                      name={l.name}
                      stroke={l.color}
                      strokeWidth={activeLine === l.key ? 3 : activeLine ? 1 : 2}
                      strokeOpacity={isActive ? 1 : 0.15}
                      dot={isActive ? { r: activeLine === l.key ? 5 : 3 } : false}
                      strokeDasharray={"dashed" in l && l.dashed ? "4 2" : undefined}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="db-chart-hint">💡 Click a label above to highlight a single line</p>
        </div>

        {/* Death Claims Amount Trend — Verified LIC AR Data */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>LIC Death Claims Paid Trend</h3>
            <span className="db-chart-src">LIC AR (₹ Crore)</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart
                data={DEATH_AMT_TREND}
                margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="deathGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f8ef7" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis
                  tick={{ fill: "#374151", fontSize: 11 }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K Cr`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amtCr"
                  name="Death Claims (₹Cr)"
                  stroke="#4f8ef7"
                  fill="url(#deathGrad)"
                  strokeWidth={2.5}
                  dot={{ r: 5, fill: "#4f8ef7" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="db-chart-hint">📈 COVID-19 peak: ₹36,578 Cr in 2021-22</p>
        </div>
      </div>


      <div style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid rgba(15,23,42,0.09)",
        boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
        overflow: "hidden",
        marginTop: "16px",
        color: "#0f172a",
      }}>
        <IRDAIClaimsSection selectedYear={selectedYear} />
      </div>

    </div>
  );
}

// ── TAB: MARKET & PLANS ────────────────────────────────────────────
function MarketTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  const cardStyle: React.CSSProperties = {
    background: "#ffffff",
    borderRadius: "16px",
    border: "1px solid rgba(15,23,42,0.09)",
    boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
    overflow: "visible",
    color: "#0f172a",
    position: "relative",
  };
  return (
    <div className="db-tab-content">
      <div style={cardStyle}>
        <IndiaInsuranceMarketSection selectedYear={selectedYear} />
      </div>
      <div style={{ ...cardStyle, marginTop: 0 }}>
        <LICPlansDetailSection selectedYear={selectedYear} />
      </div>
    </div>
  );
}

// ── TAB: INSURER COMPARE ───────────────────────────────────────────
function InsurerTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  // CSR-based color: green for ≥99%, blue for ≥98%, amber for ≥97%, slate below
  const getBarColor = (csr: number) => {
    if (csr >= 99) return "#10b981";
    if (csr >= 98.5) return "#4f8ef7";
    if (csr >= 98) return "#0ea5e9";
    if (csr >= 97) return "#f59e0b";
    return "#94a3b8";
  };

  return (
    <div className="db-tab-content">
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Claim Settlement Ratio — All Major Life Insurers FY 2024-25</h3>
            <span className="db-chart-src">
              Individual Death Claims · IRDAI Handbook 2024-25, Table 15
            </span>
          </div>
          {/* Axis transparency note */}
          <div className="db-axis-note">
            <span className="db-axis-note-icon">⚠️</span>
            X-axis starts at 95% for clarity — actual range is 96.9% to 99.71%. All insurers perform well.
          </div>
          <div style={{ height: 340 }}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                data={INSURER_CSR}
                layout="vertical"
                margin={{ top: 5, right: 60, left: isMobile ? 75 : 110, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[95, 100]}
                  tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fill: "#374151", fontSize: isMobile ? 10 : 12 }}
                  width={isMobile ? 85 : 110}
                />
                <Tooltip formatter={(v: number | string) => [`${v}%`, "CSR"]} />
                <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}
                  label={{
                    position: "right",
                    formatter: (v: number) => `${v}%`,
                    fill: "#374151",
                    fontSize: isMobile ? 10 : 11,
                    fontWeight: 600,
                  }}
                >
                  {INSURER_CSR.map((i) => (
                    <Cell key={i.name} fill={getBarColor(i.csr)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Color legend */}
          <div className="db-bar-color-legend">
            <span><span className="db-bar-leg-dot" style={{ background: "#10b981" }} />≥ 99% Excellent</span>
            <span><span className="db-bar-leg-dot" style={{ background: "#4f8ef7" }} />≥ 98.5% Very Good</span>
            <span><span className="db-bar-leg-dot" style={{ background: "#0ea5e9" }} />≥ 98% Good</span>
            <span><span className="db-bar-leg-dot" style={{ background: "#f59e0b" }} />≥ 97% Fair</span>
          </div>
        </div>
      </div>

      {/* Radial for LIC vs Industry */}
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>LIC vs Industry CSR — All Claim Types</h3>
            <span className="db-chart-src">FY 2024-25</span>
          </div>
          <div className="db-radial-list">
            {[
              { label: "Indl Death", lic: 98.15, ind: 97.82 },
              { label: "Group Death", lic: 98.2, ind: 97.93 },
              { label: "Maturity", lic: 94.1, ind: 97.4 },
              { label: "Survival Benf", lic: 98.25, ind: 98.5 },
              { label: "Annuity", lic: 99.93, ind: 99.92 },
              { label: "Micro DC", lic: 97.2, ind: 97.8 },
            ].map((r) => (
              <div key={r.label} className="db-radial-row">
                <span className="db-radial-label">{r.label}</span>
                <div className="db-radial-bars">
                  <div className="db-radial-bar-wrap">
                    <span className="db-radial-who">LIC</span>
                    <div className="db-radial-track">
                      <div
                        className="db-radial-fill lic"
                        style={{ width: `${((r.lic - 90) / 10) * 100}%` }}
                      />
                    </div>
                    <span className="db-radial-pct" style={{ color: "#4f8ef7" }}>
                      {r.lic}%
                    </span>
                  </div>
                  <div className="db-radial-bar-wrap">
                    <span className="db-radial-who">Ind</span>
                    <div className="db-radial-track">
                      <div
                        className="db-radial-fill ind"
                        style={{ width: `${((r.ind - 90) / 10) * 100}%` }}
                      />
                    </div>
                    <span className="db-radial-pct" style={{ color: "#64748b" }}>
                      {r.ind}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>LIC Death CSR vs Industry — 6 Year Trend</h3>
            <span className="db-chart-src">IRDAI Handbook 2024-25</span>
          </div>
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="99%" height="100%">
              <LineChart
                data={CSR_TREND}
                margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 10 }} />
                <YAxis
                  domain={[95, 100]}
                  tick={{ fill: "#374151", fontSize: 11 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Line
                  type="monotone"
                  dataKey="indlDeath"
                  name="LIC Indl DC"
                  stroke="#4f8ef7"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="industry"
                  name="Industry Avg"
                  stroke="#64748b"
                  strokeWidth={1.5}
                  strokeDasharray="4 2"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB: STATE & LAPSE ─────────────────────────────────────────────
function StateTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  return (
    <div className="db-tab-content">
      <div className="db-charts-row">
        {/* Top States */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Top States by Insurance Premium (₹ Crore)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 5 · FY 2022-23</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                data={TOP_STATES}
                layout="vertical"
                margin={{ top: 5, right: 15, left: isMobile ? 55 : 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}K`}
                />
                <YAxis
                  dataKey="state"
                  type="category"
                  tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                  width={isMobile ? 65 : 90}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="premium" name="Premium (₹Cr)" fill="#4f8ef7" radius={[0, 6, 6, 0]}>
                  {TOP_STATES.map((_, i) => (
                    <Cell key={i} fill={`hsl(${220 - i * 4}, 75%, ${55 - i * 2}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lapse trend */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>Lapsed Policies (Thousands)</h3>
            <span className="db-chart-src">IRDAI Table 27 · LIC vs Private</span>
          </div>
          <div style={{ height: 280 }}>
            <ResponsiveContainer width="99%" height="100%">
              <BarChart
                data={LAPSE_DATA}
                margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis tick={{ fill: "#374151", fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Bar dataKey="lic" name="LIC" stackId="a" fill="#4f8ef7" radius={[0, 0, 0, 0]} />
                <Bar
                  dataKey="private"
                  name="Private"
                  stackId="a"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Lapse insight */}
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Policy Lapse Trend — LIC vs Industry (2019-2023)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 27 · Improving year-on-year</span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart
                data={LAPSE_DATA}
                margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="licLapse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pvtLapse" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}K`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                <Area
                  type="monotone"
                  dataKey="lic"
                  name="LIC Lapsed (K)"
                  stroke="#ef4444"
                  fill="url(#licLapse)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="private"
                  name="Private Lapsed (K)"
                  stroke="#f97316"
                  fill="url(#pvtLapse)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <StateWiseLapseSection selectedYear={selectedYear} />
      </div>
    </div>
  );
}

// ── TAB: HEALTH INSURANCE ──────────────────────────────────────────
function getPrevYear(year: string): string {
  const ORDER = ["2020-21", "2021-22", "2022-23", "2023-24", "2024-25", "2025-26"];
  const idx = ORDER.indexOf(year);
  return idx > 0 ? ORDER[idx - 1] : ORDER[0];
}

function HealthTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  const [subTab, setSubTab] = useState<"overview" | "market" | "claims">("overview");
  const currentKpis = KPIS_BY_YEAR?.[selectedYear] || KPIS_BY_YEAR?.["2024-25"] || {
    health_premium_cr: 0,
    health_premium_growth_pct: 0,
    health_claims_lakh: 0,
    health_claims_growth_pct: 0,
    health_industry_csr_pct: 0,
    motor_premium_cr: 0,
    motor_premium_growth_pct: 0,
    motor_industry_icr_pct: 0,
  };
  const prevKpis = KPIS_BY_YEAR?.[getPrevYear(selectedYear)] || KPIS_BY_YEAR?.["2023-24"] || {
    health_premium_cr: 0,
    health_premium_growth_pct: 0,
    health_claims_lakh: 0,
    health_claims_growth_pct: 0,
    health_industry_csr_pct: 0,
    motor_premium_cr: 0,
    motor_premium_growth_pct: 0,
    motor_industry_icr_pct: 0,
  };
  const healthMktShare = HEALTH_MARKET_SHARE_ALL?.[selectedYear] || HEALTH_MARKET_SHARE_ALL?.["2024-25"] || [];
  const healthCsr = HEALTH_CSR_ALL?.[selectedYear] || HEALTH_CSR_ALL?.["2024-25"] || [];

  const csrDelta = +(currentKpis.health_industry_csr_pct - prevKpis.health_industry_csr_pct).toFixed(2);

  const HEALTH_KPI_CARDS = [
    {
      label: `Total Health Premiums ${selectedYear}`,
      value: `₹${(currentKpis.health_premium_cr / 10000).toFixed(2)}L Cr`,
      delta: `${currentKpis.health_premium_growth_pct >= 0 ? "+" : ""}${currentKpis.health_premium_growth_pct}%`,
      up: currentKpis.health_premium_growth_pct >= 0,
      color: "#10b981",
      icon: "bar",
    },
    {
      label: `Claims Processed ${selectedYear}`,
      value: `${currentKpis.health_claims_lakh.toFixed(1)} Lakhs`,
      delta: `${currentKpis.health_claims_growth_pct >= 0 ? "+" : ""}${currentKpis.health_claims_growth_pct}%`,
      up: currentKpis.health_claims_growth_pct >= 0,
      color: "#4f8ef7",
      icon: "users",
    },
    {
      label: "Overall Industry CSR",
      value: `${currentKpis.health_industry_csr_pct.toFixed(1)}%`,
      delta: selectedYear === "2020-21" ? "Baseline" : `${csrDelta >= 0 ? "+" : ""}${csrDelta}%`,
      up: csrDelta >= 0,
      color: "#0ea5e9",
      icon: "shield",
    },
    {
      label: "Average Cashless Settled",
      value: "82.4%",
      delta: "+3.6%",
      up: true,
      color: "#10b981",
      icon: "heart",
    },
  ];

  return (
    <div className="db-tab-content">
      {/* Mini KPI Cards row for health */}
      <div className="db-kpi-grid" style={{ marginBottom: "20px" }}>
        {HEALTH_KPI_CARDS.map((k) => (
          <div
            key={k.label}
            className="db-kpi-card"
            style={{ "--kpi-clr": k.color, minHeight: "auto", padding: "16px" } as React.CSSProperties}
          >
            <div className="db-kpi-icon" style={{ background: `${k.color}20`, color: k.color }}>
              <KPIIcon type={k.icon} />
            </div>
            <div className="db-kpi-body">
              <span className="db-kpi-label" style={{ fontSize: "0.75rem" }}>{k.label}</span>
              <span className="db-kpi-value" style={{ fontSize: "1.3rem" }}>{k.value}</span>
              <span className={`db-kpi-delta ${k.up ? "up" : "down"}`} style={{ fontSize: "0.68rem" }}>
                {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {k.delta} vs prev yr
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sub-tab navigation */}
      <div className="db-subtab-nav">
        {(["overview", "market", "claims"] as const).map((t) => (
          <button
            key={t}
            className={`db-subtab-btn ${subTab === t ? "active" : ""}`}
            onClick={() => setSubTab(t)}
          >
            {t === "overview" && "📊 Overview & ICR Trend"}
            {t === "market" && "🏪 Market Share & CSR"}
            {t === "claims" && "📋 Claims Detail"}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW sub-tab ── */}
      {subTab === "overview" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          <div className="db-chart-card db-chart-full">
            <div className="db-chart-header">
              <h3>Health Insurance Incurred Claims Ratio (ICR) Trend (2020-2026)</h3>
              <span className="db-chart-src">IRDAI Annual Reports &amp; Standalone Disclosures</span>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="99%" height="100%">
                <LineChart
                  data={HEALTH_CSR_TREND}
                  margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                  <YAxis
                    domain={[60, 110]}
                    tick={{ fill: "#374151", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                  <Line type="monotone" dataKey="standaloneAvg" name="Standalone Health Avg" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="pvtGeneralAvg" name="Private General Avg" stroke="#ea580c" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="industryAvg" name="Industry Avg" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="db-chart-hint">📌 ICR &gt; 100% means the insurer paid more in claims than it collected in premiums (e.g. COVID spike in 2021-22)</p>
          </div>
        </div>
      )}

      {/* ── MARKET SHARE sub-tab ── */}
      {subTab === "market" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          {/* Market Share — horizontal bar for readability */}
          <div className="db-chart-card db-chart-lg">
            <div className="db-chart-header">
              <h3>Health Insurance Market Share ({selectedYear})</h3>
              <span className="db-chart-src">IRDAI Annual Report (Based on Premium)</span>
            </div>
            <div style={{ height: 340 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={[...healthMktShare].sort((a, b) => b.value - a.value)}
                  layout="vertical"
                  margin={{ top: 5, right: 55, left: isMobile ? 90 : 130, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} width={isMobile ? 95 : 130} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Market Share"]} />
                  <Bar dataKey="value" name="Market Share %" radius={[0, 6, 6, 0]}
                    label={{ position: "right", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 11, fontWeight: 600 }}
                  >
                    {[...healthMktShare].sort((a, b) => b.value - a.value).map((h, i) => (
                      <Cell key={i} fill={h.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CSR Horizontal Bar */}
          <div className="db-chart-card db-chart-sm">
            <div className="db-chart-header">
              <h3>Top Health Insurers CSR ({selectedYear})</h3>
              <span className="db-chart-src">IRDAI Disclosures · Settled by Volume</span>
            </div>
            <div style={{ height: 340 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={healthCsr}
                  layout="vertical"
                  margin={{ top: 5, right: 50, left: isMobile ? 65 : 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" domain={[85, 100]} tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} width={isMobile ? 65 : 80} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "CSR"]} />
                  <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}
                    label={{ position: "right", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 10, fontWeight: 600 }}
                  >
                    {healthCsr.map((h, i) => (
                      <Cell key={i} fill={h.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ── CLAIMS DETAIL sub-tab ── */}
      {subTab === "claims" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          {/* Claims Volume by Category */}
          <div className="db-chart-card db-chart-md">
            <div className="db-chart-header">
              <h3>Health Claims Volume by Category</h3>
              <span className="db-chart-src">Industry Claims Distribution</span>
            </div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={HEALTH_CLAIM_CATEGORIES}
                  margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 65 : 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="type" tick={{ fill: "#374151", fontSize: isMobile ? 8 : 11 }} angle={isMobile ? -35 : 0} textAnchor={isMobile ? "end" : "middle"} interval={0} />
                  <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Volume"]} />
                  <Bar dataKey="volume" name="Claims Volume %" radius={[6, 6, 0, 0]}
                    label={{ position: "top", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 11, fontWeight: 700 }}
                  >
                    {HEALTH_CLAIM_CATEGORIES.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rejection Reasons — enlarged pie */}
          <div className="db-chart-card db-chart-md">
            <div className="db-chart-header">
              <h3>Common Claim Rejection Reasons</h3>
              <span className="db-chart-src">IRDAI Grievance &amp; Rejection Reports</span>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={HEALTH_REJECTION_REASONS}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={52}
                    dataKey="percentage"
                    nameKey="name"
                    label={({ name, percentage }) => `${percentage}%`}
                    labelLine={true}
                  >
                    {HEALTH_REJECTION_REASONS.map((r, i) => (
                      <Cell key={i} fill={r.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="db-pie-legend" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginTop: "8px" }}>
              {HEALTH_REJECTION_REASONS.map((r) => (
                <div key={r.name} className="db-pie-leg-item" style={{ fontSize: "0.72rem" }}>
                  <span className="db-pie-dot" style={{ background: r.color }} />
                  <span>{r.name}</span>
                  <strong style={{ color: r.color }}>{r.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className="db-insight-bar"
        style={{ marginTop: "16px", background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}
      >
        <span className="db-insight-chip good" style={{ background: "#3b82f6", color: "#fff" }}>
          💡 Cashless Settlement Mandate
        </span>
        <span>
          As of recent IRDAI directives, health claims pre-authorization must be completed in 1 hour
          and final discharge approval in 3 hours to enhance cashless settlement speeds.
        </span>
      </div>
    </div>
  );
}

// ── TAB: MOTOR INSURANCE ──────────────────────────────────────────
function MotorTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  const [subTab, setSubTab] = useState<"overview" | "market" | "claims">("overview");
  const currentKpis = KPIS_BY_YEAR?.[selectedYear] || KPIS_BY_YEAR?.["2024-25"] || {
    health_premium_cr: 0,
    health_premium_growth_pct: 0,
    health_claims_lakh: 0,
    health_claims_growth_pct: 0,
    health_industry_csr_pct: 0,
    motor_premium_cr: 0,
    motor_premium_growth_pct: 0,
    motor_industry_icr_pct: 0,
  };
  const prevKpis = KPIS_BY_YEAR?.[getPrevYear(selectedYear)] || KPIS_BY_YEAR?.["2023-24"] || {
    health_premium_cr: 0,
    health_premium_growth_pct: 0,
    health_claims_lakh: 0,
    health_claims_growth_pct: 0,
    health_industry_csr_pct: 0,
    motor_premium_cr: 0,
    motor_premium_growth_pct: 0,
    motor_industry_icr_pct: 0,
  };
  const motorMktShare = MOTOR_MARKET_SHARE_ALL?.[selectedYear] || MOTOR_MARKET_SHARE_ALL?.["2024-25"] || [];
  const motorCsr = MOTOR_CSR_ALL?.[selectedYear] || MOTOR_CSR_ALL?.["2024-25"] || [];

  const icrDelta = +(currentKpis.motor_industry_icr_pct - prevKpis.motor_industry_icr_pct).toFixed(2);

  const MOTOR_KPI_CARDS = [
    {
      label: `Total Motor Premiums ${selectedYear}`,
      value: `₹${currentKpis.motor_premium_cr.toLocaleString()} Cr`,
      delta: `${currentKpis.motor_premium_growth_pct >= 0 ? "+" : ""}${currentKpis.motor_premium_growth_pct}%`,
      up: currentKpis.motor_premium_growth_pct >= 0,
      color: "#0284c7",
      icon: "bar",
    },
    {
      label: "Grievances Share in Non-Life",
      value: "24.8%",
      delta: "-2.3%",
      up: true,
      color: "#f59e0b",
      icon: "file",
    },
    {
      label: "Average Industry ICR",
      value: `${currentKpis.motor_industry_icr_pct.toFixed(1)}%`,
      delta: selectedYear === "2020-21" ? "Baseline" : `${icrDelta >= 0 ? "+" : ""}${icrDelta}%`,
      up: icrDelta >= 0,
      color: "#10b981",
      icon: "shield",
    },
    {
      label: "Digital Claim Settled",
      value: "71.4%",
      delta: "+12.6%",
      up: true,
      color: "#0ea5e9",
      icon: "heart",
    },
  ];

  return (
    <div className="db-tab-content">
      {/* Mini KPI Cards row for motor */}
      <div className="db-kpi-grid" style={{ marginBottom: "20px" }}>
        {MOTOR_KPI_CARDS.map((k) => (
          <div
            key={k.label}
            className="db-kpi-card"
            style={{ "--kpi-clr": k.color, minHeight: "auto", padding: "16px" } as React.CSSProperties}
          >
            <div className="db-kpi-icon" style={{ background: `${k.color}20`, color: k.color }}>
              <KPIIcon type={k.icon} />
            </div>
            <div className="db-kpi-body">
              <span className="db-kpi-label" style={{ fontSize: "0.75rem" }}>{k.label}</span>
              <span className="db-kpi-value" style={{ fontSize: "1.3rem" }}>{k.value}</span>
              <span className={`db-kpi-delta ${k.up ? "up" : "down"}`} style={{ fontSize: "0.68rem" }}>
                {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {k.delta} vs prev yr
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Sub-tab navigation */}
      <div className="db-subtab-nav">
        {(["overview", "market", "claims"] as const).map((t) => (
          <button
            key={t}
            className={`db-subtab-btn ${subTab === t ? "active" : ""}`}
            onClick={() => setSubTab(t)}
          >
            {t === "overview" && "📊 Overview & ICR Trend"}
            {t === "market" && "🏪 Market Share & CSR"}
            {t === "claims" && "📋 Claims Detail"}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW sub-tab ── */}
      {subTab === "overview" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          <div className="db-chart-card db-chart-full">
            <div className="db-chart-header">
              <h3>Motor Insurance Incurred Claims Ratio (ICR) Trend (2020-2026)</h3>
              <span className="db-chart-src">IRDAI General Insurance Annual Reports</span>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="99%" height="100%">
                <LineChart
                  data={MOTOR_CSR_TREND}
                  margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
                  <YAxis
                    domain={[70, 115]}
                    tick={{ fill: "#374151", fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
                  <Line type="monotone" dataKey="pvtGeneralAvg" name="Private General Avg" stroke="#0284c7" strokeWidth={2.5} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="psuAvg" name="PSU Insurer Avg" stroke="#ea580c" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="industryAvg" name="Industry Avg" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 2" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="db-chart-hint">⚠️ PSU insurers show ICR &gt;100% due to legacy portfolio losses — indicates pricing and underwriting challenges</p>
          </div>
        </div>
      )}

      {/* ── MARKET SHARE sub-tab ── */}
      {subTab === "market" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          {/* Market Share — horizontal bar */}
          <div className="db-chart-card db-chart-lg">
            <div className="db-chart-header">
              <h3>Motor Insurance Market Share ({selectedYear})</h3>
              <span className="db-chart-src">GIC Flash Reports (Based on Premium)</span>
            </div>
            <div style={{ height: 360 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={[...motorMktShare].sort((a, b) => b.value - a.value)}
                  layout="vertical"
                  margin={{ top: 5, right: 55, left: isMobile ? 90 : 130, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} width={isMobile ? 95 : 130} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Market Share"]} />
                  <Bar dataKey="value" name="Market Share %" radius={[0, 6, 6, 0]}
                    label={{ position: "right", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 11, fontWeight: 600 }}
                  >
                    {[...motorMktShare].sort((a, b) => b.value - a.value).map((h, i) => (
                      <Cell key={i} fill={h.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* CSR Horizontal Bar */}
          <div className="db-chart-card db-chart-sm">
            <div className="db-chart-header">
              <h3>Top Motor Insurers CSR ({selectedYear})</h3>
              <span className="db-chart-src">IRDAI General Insurance Filings</span>
            </div>
            <div style={{ height: 360 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={motorCsr}
                  layout="vertical"
                  margin={{ top: 5, right: 50, left: isMobile ? 65 : 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" domain={[70, 100]} tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} tickFormatter={(v) => `${v}%`} />
                  <YAxis dataKey="name" type="category" tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} width={isMobile ? 65 : 80} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "CSR"]} />
                  <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}
                    label={{ position: "right", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 10, fontWeight: 600 }}
                  >
                    {motorCsr.map((h, i) => (
                      <Cell key={i} fill={h.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* ── CLAIMS DETAIL sub-tab ── */}
      {subTab === "claims" && (
        <div className="db-charts-row" style={{ marginTop: "16px" }}>
          {/* Own-Damage Claims Volume by Category */}
          <div className="db-chart-card db-chart-md">
            <div className="db-chart-header">
              <h3>Own-Damage Claims by Cause</h3>
              <span className="db-chart-src">General Insurance Claim Portals</span>
            </div>
            <div style={{ height: 280 }}>
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  data={MOTOR_CLAIM_CATEGORIES}
                  margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 65 : 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="type" tick={{ fill: "#374151", fontSize: isMobile ? 8 : 11 }} angle={isMobile ? -35 : 0} textAnchor={isMobile ? "end" : "middle"} interval={0} />
                  <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Volume"]} />
                  <Bar dataKey="volume" name="Claims Volume %" radius={[6, 6, 0, 0]}
                    label={{ position: "top", formatter: (v: number) => `${v}%`, fill: "#374151", fontSize: 11, fontWeight: 700 }}
                  >
                    {MOTOR_CLAIM_CATEGORIES.map((c, i) => (
                      <Cell key={i} fill={c.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Rejection Reasons Pie — enlarged */}
          <div className="db-chart-card db-chart-md">
            <div className="db-chart-header">
              <h3>Common Motor Rejection Reasons</h3>
              <span className="db-chart-src">IRDAI Grievance Reports</span>
            </div>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="99%" height="100%">
                <PieChart>
                  <Pie
                    data={MOTOR_REJECTION_REASONS}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    innerRadius={52}
                    dataKey="percentage"
                    nameKey="reason"
                    label={({ percentage }) => `${percentage}%`}
                    labelLine={true}
                  >
                    {MOTOR_REJECTION_REASONS.map((r, i) => (
                      <Cell key={i} fill={r.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v: number | string) => [`${v}%`, "Share"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="db-pie-legend" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px", marginTop: "8px" }}>
              {MOTOR_REJECTION_REASONS.map((r) => (
                <div key={r.name} className="db-pie-leg-item" style={{ fontSize: "0.72rem" }}>
                  <span className="db-pie-dot" style={{ background: r.color }} />
                  <span>{r.name}</span>
                  <strong style={{ color: r.color }}>{r.percentage}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div
        className="db-insight-bar"
        style={{ marginTop: "16px", background: "#EFF6FF", border: "1px solid #BFDBFE", color: "#1E40AF" }}
      >
        <span className="db-insight-chip good" style={{ background: "#3b82f6", color: "#fff" }}>
          💡 AI &amp; Small Claims Ease
        </span>
        <span>
          Under IRDAI guidelines, claims below ₹50,000 are increasingly processed using AI/app-based
          video assessments, bypassing the need for physical surveyors to expedite settlements.
        </span>
      </div>
    </div>
  );
}
