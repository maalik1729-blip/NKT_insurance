import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="db-root">
      {/* Sidebar */}
      <aside className="db-sidebar">
        <Link to="/" className="db-logo-link">
          <div className="db-logo">
            <img
              src={logoImg}
              alt="NKT Logo"
              style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
            />
            <div className="db-logo-text">
              <span className="db-logo-name">NKT Insurance</span>
              <span className="db-logo-sub">LIC · IRDAI Data</span>
            </div>
          </div>
        </Link>

        <div className="db-nav-section">
          <div className="db-nav-section-label">Analytics</div>
          <nav className="db-nav">
            {(
              [
                { key: "claims", label: "Claims Data", icon: ShieldCheck },
                { key: "plans", label: "Market & Plans", icon: BarChart2 },
                { key: "market", label: "Insurer Compare", icon: TrendingUp },
                { key: "state", label: "State & Lapse", icon: MapPin },
                { key: "health", label: "Health Claims", icon: Heart },
                { key: "motor", label: "Motor Claims", icon: Car },
              ] as const
            ).map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`db-nav-btn ${activeTab === key ? "active" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                <Icon size={15} />
                <span>{label}</span>
                <span className="db-nav-btn-dot" />
              </button>
            ))}
          </nav>
        </div>

        <div className="db-sidebar-divider" />

        <div className="db-nav-section">
          <div className="db-nav-section-label">Navigation</div>
          <nav className="db-nav">
            <Link to="/" className="db-nav-btn back-btn">
              <ArrowLeft size={15} />
              <span>Back to Home</span>
            </Link>
          </nav>
        </div>

        <div className="db-sidebar-divider" />

        <div className="db-sidebar-footer">
          <p>Data Sources:</p>
          <p>
            <a
              href="https://irdai.gov.in/en/handbook-of-indian-insurance"
              target="_blank"
              rel="noopener noreferrer"
            >
              IRDAI Handbook 2024-25
            </a>
          </p>
          <p>
            <a
              href="https://licindia.in/web/guest/annual-report"
              target="_blank"
              rel="noopener noreferrer"
            >
              LIC Annual Report 2023-24
            </a>
          </p>
        </div>
      </aside>

      {/* Main content */}
      <main className="db-main">
        {/* Top bar */}
        <div className="db-topbar">
          <div>
            <h1 className="db-page-title">Insurance Analytics Dashboard</h1>
            <p className="db-page-sub">
              Official IRDAI data · Health & Motor Claims · 2020 to 2026
            </p>
          </div>
          <div
            className="db-topbar-right"
          >
            <div
              className="db-year-selector"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              <span style={{ fontSize: "0.85rem", color: "#64748b" }}>Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  background: "#fff",
                  border: "1px solid #cbd5e1",
                  borderRadius: "6px",
                  padding: "4px 8px",
                  fontSize: "0.85rem",
                  color: "#1e293b",
                  outline: "none",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <option value="2020-21">2020-21</option>
                <option value="2021-22">2021-22</option>
                <option value="2022-23">2022-23</option>
                <option value="2023-24">2023-24</option>
                <option value="2024-25">2024-25</option>
                <option value="2025-26">2025-26 (Proj)</option>
              </select>
            </div>
            <span className="db-live-badge">
              <span className="db-live-dot" />
              Live Data
            </span>
            <span className="db-updated">Updated: June 2026</span>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="db-kpi-grid">
          {KPI_CARDS.map((k) => (
            <div
              key={k.label}
              className="db-kpi-card"
              style={{ "--kpi-clr": k.color } as React.CSSProperties}
            >
              <div className="db-kpi-icon" style={{ background: `${k.color}20`, color: k.color }}>
                <KPIIcon type={k.icon} />
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

        {/* Tab content */}
        {activeTab === "claims" && <ClaimsTab isMobile={isMobile} />}
        {activeTab === "plans" && <MarketTab isMobile={isMobile} />}
        {activeTab === "market" && <InsurerTab isMobile={isMobile} />}
        {activeTab === "state" && <StateTab isMobile={isMobile} />}
        {activeTab === "health" && <HealthTab selectedYear={selectedYear} isMobile={isMobile} />}
        {activeTab === "motor" && <MotorTab selectedYear={selectedYear} isMobile={isMobile} />}
      </main>
    </div>
  );
}

// ── TAB: CLAIMS ────────────────────────────────────────────────────
function ClaimsTab({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="db-tab-content">
      {/* Row 1: CSR Trend + Claim Volume */}
      <div className="db-charts-row">
        {/* CSR Trend Line Chart */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Claim Settlement Ratio Trend — All Types (2019-2025)</h3>
            <span className="db-chart-src">IRDAI Handbook 2024-25 + LIC Annual Report</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={CSR_TREND} margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
              <YAxis
                domain={[88, 100]}
                tick={{ fill: "#374151", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line
                type="monotone"
                dataKey="indlDeath"
                name="Indl Death"
                stroke={COLORS_CSR.indlDeath}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="groupDeath"
                name="Group Death"
                stroke={COLORS_CSR.groupDeath}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="maturity"
                name="Maturity"
                stroke={COLORS_CSR.maturity}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="survival"
                name="Survival Benf"
                stroke={COLORS_CSR.survival}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="annuity"
                name="Annuity"
                stroke={COLORS_CSR.annuity}
                strokeWidth={2}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="industry"
                name="Industry Avg"
                stroke={COLORS_CSR.industry}
                strokeWidth={1.5}
                strokeDasharray="4 2"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Volume Bars */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>Claims Volume FY 2024-25</h3>
            <span className="db-chart-src">In Lakhs of claims</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={CLAIMS_VOLUME}
              layout="vertical"
              margin={{ top: 0, right: 15, left: isMobile ? 35 : 50, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }} />
              <YAxis
                dataKey="type"
                type="category"
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                width={isMobile ? 42 : 55}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="volume" name="Volume (L)" radius={[0, 6, 6, 0]}>
                {CLAIMS_VOLUME.map((c) => (
                  <Cell key={c.type} fill={c.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Amount Paid + CSR cards */}
      <div className="db-charts-row">
        {/* Amount paid area chart */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>Claims Amount Paid (₹ Crore)</h3>
            <span className="db-chart-src">FY 2024-25 by Claim Type</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={CLAIMS_VOLUME} margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 20 : 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="type"
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                angle={isMobile ? -25 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                interval={0}
              />
              <YAxis
                tick={{ fill: "#374151", fontSize: 11 }}
                tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amtCr" name="Amount (₹Cr)" radius={[6, 6, 0, 0]}>
                {CLAIMS_VOLUME.map((c) => (
                  <Cell key={c.type} fill={c.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CSR stat cards */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>LIC CSR — All 6 Claim Types</h3>
            <span className="db-chart-src">FY 2024-25 · Official IRDAI Data</span>
          </div>
          <div className="db-csr-grid">
            {CLAIMS_VOLUME.map((c) => (
              <div key={c.type} className="db-csr-item">
                <div className="db-csr-ring-wrap">
                  <svg width="64" height="64" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke="rgba(255,255,255,0.07)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="14"
                      fill="none"
                      stroke={c.color}
                      strokeWidth="3"
                      strokeDasharray={`${c.csr - 88} ${12 + (100 - c.csr)}`}
                      strokeLinecap="round"
                      transform="rotate(-90 18 18)"
                    />
                  </svg>
                  <span className="db-csr-ring-val" style={{ color: c.color }}>
                    {c.csr}%
                  </span>
                </div>
                <span className="db-csr-label">{c.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Row 3: Death Claims Amount Trend — Verified LIC AR Data */}
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>LIC Death Claims Amount Paid — Year-wise (₹ Crore)</h3>
            <span className="db-chart-src">
              ✓ Verified · LIC Annual Report 2023-24, Page 184 · COVID spike visible in 2021-22
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={DEATH_AMT_TREND} margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}>
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
          <div className="db-insight-bar">
            <span className="db-insight-chip covid">
              ⚠ 2021-22: ₹36,578 Cr — COVID-19 peak (LIC AR 2022-23 verified)
            </span>
            <span className="db-insight-chip good">
              ↓ Normalizing: ₹22,625 Cr in 2023-24 (LIC AR 2023-24 verified)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TAB: MARKET & PLANS ────────────────────────────────────────────
function MarketTab({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="db-tab-content">
      <div className="db-charts-row">
        {/* Policies trend */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>New Policies Issued Per Year (Lakhs)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 9 · LIC vs Private</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={POLICIES_ISSUED} margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}>
              <defs>
                <linearGradient id="licGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4f8ef7" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4f8ef7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="pvtGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
              <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}L`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Area
                type="monotone"
                dataKey="lic"
                name="LIC Policies (L)"
                stroke="#4f8ef7"
                fill="url(#licGrad)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="private"
                name="Private Policies (L)"
                stroke="#10b981"
                fill="url(#pvtGrad)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Market Share Pie */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>LIC vs Private Market Share</h3>
            <span className="db-chart-src">By Premium · FY 2024-25</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={MARKET_SHARE}
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={45}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
                labelLine={false}
              >
                {MARKET_SHARE.map((m) => (
                  <Cell key={m.name} fill={m.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number | string) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="db-pie-legend">
            {MARKET_SHARE.map((m) => (
              <div key={m.name} className="db-pie-leg-item">
                <span className="db-pie-dot" style={{ background: m.color }} />
                <span>{m.name}</span>
                <strong style={{ color: m.color }}>{m.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Premium by segment */}
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Premium by Plan Segment — FY 2024-25 (₹ Crore)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 4 · Total: ₹6,92,614 Cr</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={PREMIUM_SEGMENT} margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 35 : 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#374151", fontSize: isMobile ? 8 : 11 }}
                interval={0}
                angle={isMobile ? -35 : 0}
                textAnchor={isMobile ? "end" : "middle"}
              />
              <YAxis
                tick={{ fill: "#374151", fontSize: 11 }}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K Cr`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Premium (₹Cr)" radius={[6, 6, 0, 0]}>
                {PREMIUM_SEGMENT.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── TAB: INSURER COMPARE ───────────────────────────────────────────
function InsurerTab({ isMobile }: { isMobile: boolean }) {
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
          <ResponsiveContainer width="100%" height={320}>
            <BarChart
              data={INSURER_CSR}
              layout="vertical"
              margin={{ top: 5, right: 15, left: isMobile ? 75 : 100, bottom: 5 }}
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
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}>
                {INSURER_CSR.map((i) => (
                  <Cell key={i.name} fill={i.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={CSR_TREND} margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}>
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
  );
}

// ── TAB: STATE & LAPSE ─────────────────────────────────────────────
function StateTab({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="db-tab-content">
      <div className="db-charts-row">
        {/* Top States */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Top States by Insurance Premium (₹ Crore)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 5 · FY 2022-23</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
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
                  <Cell key={i} fill={`hsl(${220 + i * 15}, 80%, ${60 - i * 3}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Lapse trend */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>Lapsed Policies (Thousands)</h3>
            <span className="db-chart-src">IRDAI Table 27 · LIC vs Private</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={LAPSE_DATA} margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}>
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

      {/* Lapse insight */}
      <div className="db-charts-row">
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Policy Lapse Trend — LIC vs Industry (2019-2023)</h3>
            <span className="db-chart-src">IRDAI Handbook Table 27 · Improving year-on-year</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={LAPSE_DATA} margin={{ top: 5, right: 20, left: isMobile ? -15 : 10, bottom: 5 }}>
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
  );
}

// ── TAB: HEALTH INSURANCE ──────────────────────────────────────────
function HealthTab({ selectedYear, isMobile }: { selectedYear: string; isMobile: boolean }) {
  const currentKpis = KPIS_BY_YEAR[selectedYear] || KPIS_BY_YEAR["2024-25"];
  const healthMktShare =
    HEALTH_MARKET_SHARE_ALL[selectedYear] || HEALTH_MARKET_SHARE_ALL["2024-25"];
  const healthCsr = HEALTH_CSR_ALL[selectedYear] || HEALTH_CSR_ALL["2024-25"];
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
      delta:
        selectedYear === "2020-21"
          ? "Stable"
          : `${currentKpis.health_industry_csr_pct - (KPIS_BY_YEAR[selectedYear === "2021-22" ? "2020-21" : selectedYear === "2022-23" ? "2021-22" : selectedYear === "2023-24" ? "2022-23" : selectedYear === "2024-25" ? "2023-24" : "2024-25"]?.health_industry_csr_pct || 0) >= 0 ? "+" : ""}${round_val(currentKpis.health_industry_csr_pct - (KPIS_BY_YEAR[selectedYear === "2021-22" ? "2020-21" : selectedYear === "2022-23" ? "2021-22" : selectedYear === "2023-24" ? "2022-23" : selectedYear === "2024-25" ? "2023-24" : "2024-25"]?.health_industry_csr_pct || 0))}%`,
      up:
        currentKpis.health_industry_csr_pct >=
        (KPIS_BY_YEAR[
          selectedYear === "2021-22"
            ? "2020-21"
            : selectedYear === "2022-23"
              ? "2021-22"
              : selectedYear === "2023-24"
                ? "2022-23"
                : selectedYear === "2024-25"
                  ? "2023-24"
                  : "2024-25"
        ]?.health_industry_csr_pct || 0),
      color: "#a855f7",
      icon: "shield",
    },
    {
      label: "Average Cashless Settled",
      value: "82.4%",
      delta: "+3.6%",
      up: true,
      color: "#ec4899",
      icon: "heart",
    },
  ];

  function round_val(v: number) {
    return Math.round(v * 100) / 100;
  }

  return (
    <div className="db-tab-content">
      {/* Mini KPI Cards row for health */}
      <div className="db-kpi-grid" style={{ marginBottom: "24px" }}>
        {HEALTH_KPI_CARDS.map((k) => (
          <div
            key={k.label}
            className="db-kpi-card"
            style={
              {
                "--kpi-clr": k.color,
                minHeight: "auto",
                padding: "16px",
              } as React.CSSProperties
            }
          >
            <div className="db-kpi-icon" style={{ background: `${k.color}20`, color: k.color }}>
              <KPIIcon type={k.icon} />
            </div>
            <div className="db-kpi-body">
              <span className="db-kpi-label" style={{ fontSize: "0.75rem" }}>
                {k.label}
              </span>
              <span className="db-kpi-value" style={{ fontSize: "1.3rem" }}>
                {k.value}
              </span>
              <span
                className={`db-kpi-delta ${k.up ? "up" : "down"}`}
                style={{ fontSize: "0.68rem" }}
              >
                {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {k.delta} vs prev yr
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Health Trend Line Chart ── */}
      <div className="db-charts-row" style={{ marginBottom: "24px" }}>
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Health Insurance Incurred Claims Ratio (ICR) Trend (2020-2026)</h3>
            <span className="db-chart-src">IRDAI Annual Reports & Standalone Disclosures</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={HEALTH_CSR_TREND} margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
              <YAxis
                domain={[60, 110]}
                tick={{ fill: "#374151", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line
                type="monotone"
                dataKey="standaloneAvg"
                name="Standalone Health Avg"
                stroke="#16a34a"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="pvtGeneralAvg"
                name="Private General Avg"
                stroke="#ea580c"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="industryAvg"
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

      <div className="db-charts-row">
        {/* Market Share of Health Insurance */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Health Insurance Market Share ({selectedYear})</h3>
            <span className="db-chart-src">IRDAI Annual Report (Based on Premium)</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={healthMktShare} margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 85 : 45 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#374151", fontSize: isMobile ? 8 : 10 }}
                angle={isMobile ? -45 : -25}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="value" name="Market Share %" radius={[6, 6, 0, 0]}>
                {healthMktShare.map((h, i) => (
                  <Cell key={i} fill={h.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Settlement Ratio (CSR) of Top Health Insurers */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>Top Health Insurers CSR ({selectedYear})</h3>
            <span className="db-chart-src">IRDAI Disclosures · Settled by Volume</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={healthCsr}
              layout="vertical"
              margin={{ top: 5, right: 15, left: isMobile ? 55 : 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis
                type="number"
                domain={[85, 100]}
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                width={isMobile ? 65 : 80}
              />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}>
                {healthCsr.map((h, i) => (
                  <Cell key={i} fill={h.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="db-charts-row">
        {/* Claims Volume by Category */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>Health Claims Volume by Category</h3>
            <span className="db-chart-src">Industry Claims Distribution</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={HEALTH_CLAIM_CATEGORIES}
              margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 65 : 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="type"
                tick={{ fill: "#374151", fontSize: isMobile ? 8 : 11 }}
                angle={isMobile ? -35 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                interval={0}
              />
              <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="volume" name="Claims Volume %" radius={[6, 6, 0, 0]}>
                {HEALTH_CLAIM_CATEGORIES.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Rejection Reasons Pie */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>Common Claim Rejection Reasons</h3>
            <span className="db-chart-src">IRDAI Grievance & Rejection Reports</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={HEALTH_REJECTION_REASONS}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                dataKey="percentage"
                nameKey="name"
              >
                {HEALTH_REJECTION_REASONS.map((r, i) => (
                  <Cell key={i} fill={r.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number | string) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div
            className="db-pie-legend"
            style={{ marginTop: "10px", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}
          >
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

      <div
        className="db-insight-bar"
        style={{
          marginTop: "16px",
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          color: "#1E40AF",
        }}
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
  const currentKpis = KPIS_BY_YEAR[selectedYear] || KPIS_BY_YEAR["2024-25"];
  const motorMktShare = MOTOR_MARKET_SHARE_ALL[selectedYear] || MOTOR_MARKET_SHARE_ALL["2024-25"];
  const motorCsr = MOTOR_CSR_ALL[selectedYear] || MOTOR_CSR_ALL["2024-25"];
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
      label: `Average Industry ICR`,
      value: `${currentKpis.motor_industry_icr_pct.toFixed(1)}%`,
      delta:
        selectedYear === "2020-21"
          ? "Stable"
          : `${currentKpis.motor_industry_icr_pct - (KPIS_BY_YEAR[selectedYear === "2021-22" ? "2020-21" : selectedYear === "2022-23" ? "2021-22" : selectedYear === "2023-24" ? "2022-23" : selectedYear === "2024-25" ? "2023-24" : "2024-25"]?.motor_industry_icr_pct || 0) >= 0 ? "+" : ""}${round_val(currentKpis.motor_industry_icr_pct - (KPIS_BY_YEAR[selectedYear === "2021-22" ? "2020-21" : selectedYear === "2022-23" ? "2021-22" : selectedYear === "2023-24" ? "2022-23" : selectedYear === "2024-25" ? "2023-24" : "2024-25"]?.motor_industry_icr_pct || 0))}%`,
      up:
        currentKpis.motor_industry_icr_pct >=
        (KPIS_BY_YEAR[
          selectedYear === "2021-22"
            ? "2020-21"
            : selectedYear === "2022-23"
              ? "2021-22"
              : selectedYear === "2023-24"
                ? "2022-23"
                : selectedYear === "2024-25"
                  ? "2023-24"
                  : "2024-25"
        ]?.motor_industry_icr_pct || 0),
      color: "#10b981",
      icon: "shield",
    },
    {
      label: "Digital Claim Settled",
      value: "71.4%",
      delta: "+12.6%",
      up: true,
      color: "#ec4899",
      icon: "heart",
    },
  ];

  function round_val(v: number) {
    return Math.round(v * 100) / 100;
  }

  return (
    <div className="db-tab-content">
      {/* Mini KPI Cards row for motor */}
      <div className="db-kpi-grid" style={{ marginBottom: "24px" }}>
        {MOTOR_KPI_CARDS.map((k) => (
          <div
            key={k.label}
            className="db-kpi-card"
            style={
              {
                "--kpi-clr": k.color,
                minHeight: "auto",
                padding: "16px",
              } as React.CSSProperties
            }
          >
            <div className="db-kpi-icon" style={{ background: `${k.color}20`, color: k.color }}>
              <KPIIcon type={k.icon} />
            </div>
            <div className="db-kpi-body">
              <span className="db-kpi-label" style={{ fontSize: "0.75rem" }}>
                {k.label}
              </span>
              <span className="db-kpi-value" style={{ fontSize: "1.3rem" }}>
                {k.value}
              </span>
              <span
                className={`db-kpi-delta ${k.up ? "up" : "down"}`}
                style={{ fontSize: "0.68rem" }}
              >
                {k.up ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                {k.delta} vs prev yr
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Motor Trend Line Chart ── */}
      <div className="db-charts-row" style={{ marginBottom: "24px" }}>
        <div className="db-chart-card db-chart-full">
          <div className="db-chart-header">
            <h3>Motor Insurance Incurred Claims Ratio (ICR) Trend (2020-2026)</h3>
            <span className="db-chart-src">IRDAI General Insurance Annual Reports</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={MOTOR_CSR_TREND} margin={{ top: 5, right: 20, left: isMobile ? -15 : 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis dataKey="year" tick={{ fill: "#374151", fontSize: 11 }} />
              <YAxis
                domain={[70, 115]}
                tick={{ fill: "#374151", fontSize: 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: "#94a3b8" }} />
              <Line
                type="monotone"
                dataKey="pvtGeneralAvg"
                name="Private General Avg"
                stroke="#0284c7"
                strokeWidth={2.5}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="psuAvg"
                name="PSU Insurer Avg"
                stroke="#ea580c"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="industryAvg"
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

      <div className="db-charts-row">
        {/* Market Share of Motor Insurance */}
        <div className="db-chart-card db-chart-lg">
          <div className="db-chart-header">
            <h3>Motor Insurance Market Share ({selectedYear})</h3>
            <span className="db-chart-src">GIC Flash Reports (Based on Premium)</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={motorMktShare} margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 85 : 45 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#374151", fontSize: isMobile ? 8 : 10 }}
                angle={isMobile ? -45 : -25}
                textAnchor="end"
                interval={0}
              />
              <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="value" name="Market Share %" radius={[6, 6, 0, 0]}>
                {motorMktShare.map((h, i) => (
                  <Cell key={i} fill={h.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Settlement Ratio (CSR) of Top Motor Insurers */}
        <div className="db-chart-card db-chart-sm">
          <div className="db-chart-header">
            <h3>Top Motor Insurers CSR ({selectedYear})</h3>
            <span className="db-chart-src">IRDAI General Insurance Filings</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={motorCsr}
              layout="vertical"
              margin={{ top: 5, right: 15, left: isMobile ? 55 : 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
              <XAxis
                type="number"
                domain={[90, 100]}
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                tickFormatter={(v) => `${v}%`}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fill: "#374151", fontSize: isMobile ? 9 : 11 }}
                width={isMobile ? 65 : 80}
              />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="csr" name="CSR %" radius={[0, 6, 6, 0]}>
                {motorCsr.map((h, i) => (
                  <Cell key={i} fill={h.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="db-charts-row">
        {/* Own-Damage Claims Volume by Category */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>Own-Damage Claims by Cause</h3>
            <span className="db-chart-src">General Insurance Claim Portals</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              data={MOTOR_CLAIM_CATEGORIES}
              margin={{ top: 5, right: 10, left: isMobile ? -15 : 10, bottom: isMobile ? 65 : 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
              <XAxis
                dataKey="type"
                tick={{ fill: "#374151", fontSize: isMobile ? 8 : 11 }}
                angle={isMobile ? -35 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                interval={0}
              />
              <YAxis tick={{ fill: "#374151", fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
              <Tooltip formatter={(v: number | string) => `${v}%`} />
              <Bar dataKey="volume" name="Claims Volume %" radius={[6, 6, 0, 0]}>
                {MOTOR_CLAIM_CATEGORIES.map((c, i) => (
                  <Cell key={i} fill={c.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Claim Rejection Reasons Pie */}
        <div className="db-chart-card db-chart-md">
          <div className="db-chart-header">
            <h3>Common Motor Rejection Reasons</h3>
            <span className="db-chart-src">IRDAI Grievance Reports</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={MOTOR_REJECTION_REASONS}
                cx="50%"
                cy="50%"
                outerRadius={70}
                innerRadius={40}
                dataKey="percentage"
                nameKey="reason"
              >
                {MOTOR_REJECTION_REASONS.map((r, i) => (
                  <Cell key={i} fill={r.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number | string) => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div
            className="db-pie-legend"
            style={{ marginTop: "10px", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}
          >
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

      <div
        className="db-insight-bar"
        style={{
          marginTop: "16px",
          background: "#EFF6FF",
          border: "1px solid #BFDBFE",
          color: "#1E40AF",
        }}
      >
        <span className="db-insight-chip good" style={{ background: "#3b82f6", color: "#fff" }}>
          💡 AI & Small Claims Ease
        </span>
        <span>
          Under IRDAI guidelines, claims below ₹50,000 are increasingly processed using AI/app-based
          video assessments, bypassing the need for physical surveyors to expedite settlements.
        </span>
      </div>
    </div>
  );
}
