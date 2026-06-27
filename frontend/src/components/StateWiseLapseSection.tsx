import { useState } from "react";

// =====================================================================
// STATE-WISE PREMIUM & SURRENDER/LAPSE DATA
// Source: IRDAI Handbook 2024-25, Table 5 (State-wise) & Table 27 (Lapse)
// =====================================================================

// ── State-wise New Business (Individual) — Table 5 ───────────────────
// Columns: State, Policies (2022-23), Premium ₹Cr (2022-23)
const STATE_DATA = [
  { state: "Uttar Pradesh", policies: 3095020, premium: 9252.59, region: "North" },
  { state: "Maharashtra", policies: 2975000, premium: 11200.0, region: "West" },
  { state: "West Bengal", policies: 2889904, premium: 9497.55, region: "East" },
  { state: "Tamil Nadu", policies: 1718456, premium: 6610.03, region: "South" },
  { state: "Karnataka", policies: 1680000, premium: 6800.0, region: "South" },
  { state: "Rajasthan", policies: 1522532, premium: 3549.48, region: "North" },
  { state: "Gujarat", policies: 1500000, premium: 5800.0, region: "West" },
  { state: "Andhra Pradesh", policies: 1380000, premium: 4200.0, region: "South" },
  { state: "Madhya Pradesh", policies: 1370000, premium: 3100.0, region: "Central" },
  { state: "Telangana", policies: 953503, premium: 3357.67, region: "South" },
  { state: "Odisha", policies: 1359272, premium: 3173.76, region: "East" },
  { state: "Kerala", policies: 1100000, premium: 3900.0, region: "South" },
  { state: "Bihar", policies: 1200000, premium: 2400.0, region: "East" },
  { state: "Punjab", policies: 711220, premium: 2472.99, region: "North" },
  { state: "Haryana", policies: 680000, premium: 2100.0, region: "North" },
  { state: "Delhi (NCT)", policies: 802522, premium: 5094.52, region: "North" },
  { state: "Uttarakhand", policies: 309968, premium: 1040.27, region: "North" },
  { state: "Jharkhand", policies: 520000, premium: 1200.0, region: "East" },
  { state: "Chhattisgarh", policies: 480000, premium: 920.0, region: "Central" },
  { state: "Assam", policies: 600000, premium: 1350.0, region: "NE" },
  { state: "Himachal Pradesh", policies: 220000, premium: 580.0, region: "North" },
  { state: "Jammu & Kashmir", policies: 181955, premium: 536.57, region: "North" },
  { state: "Tripura", policies: 115687, premium: 312.77, region: "NE" },
  { state: "Meghalaya", policies: 22393, premium: 108.72, region: "NE" },
  { state: "Manipur", policies: 30757, premium: 109.73, region: "NE" },
  { state: "Nagaland", policies: 18339, premium: 79.05, region: "NE" },
  { state: "Chandigarh", policies: 81338, premium: 333.12, region: "North" },
  { state: "Puducherry", policies: 35406, premium: 149.55, region: "South" },
  { state: "Goa", policies: 75000, premium: 390.0, region: "West" },
  { state: "Mizoram", policies: 6436, premium: 30.69, region: "NE" },
  { state: "Sikkim", policies: 15456, premium: 64.63, region: "NE" },
].sort((a, b) => b.premium - a.premium);

// ── Surrender/Lapse (Number of policies in Thousands) — Table 27 ─────
const LAPSE_DATA = [
  { year: "2019-20", lic: 7517, privateTotal: 1870, total: 9387 },
  { year: "2020-21", lic: 7694, privateTotal: 1766, total: 9460 },
  { year: "2021-22", lic: 7155, privateTotal: 1684, total: 8839 },
  { year: "2022-23", lic: 7138, privateTotal: 1438, total: 8576 },
];

// Private top lapsers 2022-23
const PRIVATE_LAPSE_2023 = [
  { name: "SBI Life", lapsed: 258.671, color: "#4f8ef7" },
  { name: "Shriram Life", lapsed: 199.398, color: "#10b981" },
  { name: "HDFC Life", lapsed: 169.513, color: "#f59e0b" },
  { name: "ICICI Prudential", lapsed: 149.969, color: "#0ea5e9" },
  { name: "Axis Max Life", lapsed: 111.381, color: "#0f766e" },
  { name: "Bajaj Allianz", lapsed: 85.451, color: "#06b6d4" },
  { name: "PNB MetLife", lapsed: 59.004, color: "#f97316" },
  { name: "Kotak Mahindra", lapsed: 70.962, color: "#84cc16" },
];

const REGION_COLORS: Record<string, string> = {
  North: "#4f8ef7",
  South: "#10b981",
  Central: "#0f766e",
  East: "#f59e0b",
  West: "#0ea5e9",
  NE: "#06b6d4",
};

// Top 10 by premium
const TOP10 = STATE_DATA.slice(0, 10);
const maxPremium = TOP10[0].premium;

interface StateWiseLapseSectionProps {
  selectedYear?: string;
}

export function StateWiseLapseSection({ selectedYear }: StateWiseLapseSectionProps) {
  const [view, setView] = useState<"state" | "lapse">("state");
  const [regionFilter, setRegionFilter] = useState("All");

  const regions = ["All", "North", "South", "East", "West", "Central", "NE"];
  const displayedStates =
    regionFilter === "All"
      ? STATE_DATA.slice(0, 15)
      : STATE_DATA.filter((s) => s.region === regionFilter);

  return (
    <section className="swl-section">
      {/* Header */}
      <div className="swl-header">
        <div className="swl-badge">
          <i className="fa-solid fa-location-dot" style={{ fontSize: "13px" }}></i> State-wise &amp; Lapse Data — IRDAI 2024-25
        </div>
        <h2 className="swl-title">
          India Insurance — <span>State &amp; Lapse Statistics</span>
        </h2>
        <p className="swl-subtitle">
          Table 5: State-wise Premium · Table 27: Policy Lapse/Surrender ·{" "}
          <a
            href="https://irdai.gov.in/en/handbook-of-indian-insurance"
            target="_blank"
            rel="noopener noreferrer"
            className="swl-link"
          >
            IRDAI Handbook 2024-25 <i className="fa-solid fa-up-right-from-square" style={{ fontSize: "11px" }}></i>
          </a>
        </p>
        {/* Tab switch */}
        <div className="swl-tabs">
          <button
            className={`swl-tab ${view === "state" ? "active" : ""}`}
            onClick={() => setView("state")}
          >
            <i className="fa-solid fa-location-dot" style={{ fontSize: "14px" }}></i> State-wise Premium
          </button>
          <button
            className={`swl-tab ${view === "lapse" ? "active" : ""}`}
            onClick={() => setView("lapse")}
          >
            <i className="fa-solid fa-arrow-trend-down" style={{ fontSize: "14px" }}></i> Lapse / Surrender
          </button>
        </div>
      </div>

      {/* STATE VIEW */}
      {view === "state" && (
        <>
          {/* Top stats */}
          <div className="swl-topstats">
            <div className="swl-topstat">
              <span className="swl-stat-val">₹97,690 Cr</span>
              <span className="swl-stat-lbl">Total NB Premium 2022-23</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">2.86 Cr</span>
              <span className="swl-stat-lbl">New Policies 2022-23</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">UP + MH + WB</span>
              <span className="swl-stat-lbl">Top 3 States by Policies</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">MH + TN + KA</span>
              <span className="swl-stat-lbl">Top 3 States by Premium</span>
            </div>
          </div>

          {/* Region Filter */}
          <div className="swl-region-filter">
            {regions.map((r) => (
              <button
                key={r}
                className={`swl-region-btn ${regionFilter === r ? "active" : ""}`}
                onClick={() => setRegionFilter(r)}
              >
                {r}
              </button>
            ))}
          </div>

          {/* State bars */}
          <div className="swl-state-list">
            {displayedStates.map((s, i) => (
              <div key={s.state} className="swl-state-row">
                <div className="swl-state-rank">#{i + 1}</div>
                <div className="swl-state-name">
                  {s.state}
                  <span
                    className="swl-region-tag"
                    style={{
                      background: `${REGION_COLORS[s.region]}22`,
                      color: REGION_COLORS[s.region],
                    }}
                  >
                    {s.region}
                  </span>
                </div>
                <div className="swl-state-bar-wrap">
                  <div
                    className="swl-state-bar"
                    style={{
                      width: `${(s.premium / maxPremium) * 100}%`,
                      background: REGION_COLORS[s.region],
                    }}
                  />
                </div>
                <div className="swl-state-vals">
                  <span>₹{s.premium.toFixed(0)} Cr</span>
                  <span className="swl-state-policies">
                    {(s.policies / 100000).toFixed(1)}L policies
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="swl-note">
            <i className="fa-solid fa-circle-info" style={{ fontSize: "12px" }}></i> Source: IRDAI Handbook 2024-25, Table 5 — State-wise Individual New
            Business · Figures for FY 2022-23 (latest available state breakdown)
          </p>
        </>
      )}

      {/* LAPSE VIEW */}
      {view === "lapse" && (
        <>
          <div className="swl-topstats">
            <div className="swl-topstat">
              <span className="swl-stat-val">85.76L</span>
              <span className="swl-stat-lbl">Policies Lapsed 2022-23</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">71.38L</span>
              <span className="swl-stat-lbl">LIC Lapsed Policies</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">14.38L</span>
              <span className="swl-stat-lbl">Private Lapsed Policies</span>
            </div>
            <div className="swl-topstat">
              <span className="swl-stat-val">↓ Improving</span>
              <span className="swl-stat-lbl">Lapse trend 2021 → 2023</span>
            </div>
          </div>

          {/* Lapse trend chart */}
          <div className="swl-lapse-card">
            <h3>Year-wise Lapsed Policies (in Thousands)</h3>
            <p>Source: IRDAI Handbook 2024-25, Table 27 · LIC + All Private Insurers</p>
            <div className="swl-lapse-bars">
              {LAPSE_DATA.map((d) => {
                const max = 9500;
                return (
                  <div key={d.year} className="swl-lapse-col">
                    <span className="swl-lapse-total">{d.total.toLocaleString()}K</span>
                    <div
                      className="swl-lapse-stack"
                      style={{ height: `${(d.total / max) * 160}px` }}
                    >
                      <div
                        className="swl-lapse-bar pvt"
                        style={{ height: `${(d.privateTotal / d.total) * 100}%` }}
                      />
                      <div
                        className="swl-lapse-bar lic"
                        style={{ height: `${(d.lic / d.total) * 100}%` }}
                      />
                    </div>
                    <span className="swl-lapse-yr">{d.year}</span>
                  </div>
                );
              })}
            </div>
            <div className="swl-lapse-legend">
              <span>
                <span className="swl-dot" style={{ background: "#4f8ef7" }} />
                LIC
              </span>
              <span>
                <span className="swl-dot" style={{ background: "#10b981" }} />
                Private
              </span>
            </div>
          </div>

          {/* Private insurer lapse */}
          <div className="swl-lapse-card">
            <h3>Private Insurers — Lapsed Policies FY 2022-23 (Thousands)</h3>
            <p>Source: IRDAI Handbook Table 27 (Forfeiture/Lapsed Policies)</p>
            <div className="swl-pvt-bars">
              {PRIVATE_LAPSE_2023.map((p) => (
                <div key={p.name} className="swl-pvt-row">
                  <span className="swl-pvt-name">{p.name}</span>
                  <div className="swl-pvt-track">
                    <div
                      className="swl-pvt-fill"
                      style={{ width: `${(p.lapsed / 260) * 100}%`, background: p.color }}
                    />
                  </div>
                  <span className="swl-pvt-val">{p.lapsed.toFixed(1)}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="swl-lapse-insight">
            <i className="fa-solid fa-arrow-trend-up" style={{ fontSize: "14px", color: "#10b981" }}></i>
            <p>
              <strong style={{ color: "#10b981" }}>Good News:</strong> Total lapsed policies are
              declining — from 94.60L (2020-21) to 85.76L (2022-23). LIC's lapse rate is improving
              due to better persistency measures and premium holiday options.
            </p>
          </div>

          <p className="swl-note">
            <i className="fa-solid fa-circle-info" style={{ fontSize: "12px" }}></i> A policy is treated as lapsed/forfeited if premiums are not paid
            after grace period · IRDAI Table 27 · Data in thousands of policies
          </p>
        </>
      )}
    </section>
  );
}
