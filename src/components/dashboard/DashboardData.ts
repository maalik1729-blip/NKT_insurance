// ── LIC Verified Benefits Data (LIC Annual Report 2023-24, Page 184 + 2022-23, Page 371)
// Maturity CSR by number: 2020-21=89.83%, 2021-22=91.09%, 2022-23=92.65% (LIC AR Table)
// Death Claims Amount: 2023-24=₹22,625Cr, 2022-23=₹23,423Cr, 2021-22=₹36,578Cr (COVID peak)
export const CSR_TREND = [
  {
    year: "2019-20",
    indlDeath: 98.08,
    groupDeath: 91.38,
    maturity: 94.8,
    survival: 97.1,
    annuity: 99.82,
    industry: 96.76,
  },
  {
    year: "2020-21",
    indlDeath: 98.62,
    groupDeath: 96.8,
    maturity: 89.83,
    survival: 97.58,
    annuity: 99.85,
    industry: 98.39,
  },
  {
    year: "2021-22",
    indlDeath: 98.74,
    groupDeath: 97.08,
    maturity: 91.09,
    survival: 97.82,
    annuity: 99.88,
    industry: 98.64,
  },
  {
    year: "2022-23",
    indlDeath: 98.52,
    groupDeath: 97.33,
    maturity: 92.65,
    survival: 97.92,
    annuity: 99.9,
    industry: 98.45,
  },
  {
    year: "2023-24",
    indlDeath: 98.24,
    groupDeath: 97.89,
    maturity: 93.48,
    survival: 98.1,
    annuity: 99.92,
    industry: 98.26,
  },
  {
    year: "2024-25",
    indlDeath: 98.15,
    groupDeath: 98.2,
    maturity: 94.1,
    survival: 98.25,
    annuity: 99.93,
    industry: 97.82,
  },
];

// ── LIC Death Claims Amount Paid (₹ Crore) — LIC Annual Report (Official)
export const DEATH_AMT_TREND = [
  { year: "2019-20", amtCr: 18042 },
  { year: "2020-21", amtCr: 22382 },
  { year: "2021-22", amtCr: 36578 }, // COVID peak — LIC AR 2022-23 verified
  { year: "2022-23", amtCr: 23423 }, // LIC AR 2023-24 verified
  { year: "2023-24", amtCr: 22625 }, // LIC AR 2023-24 verified
];

export const CLAIMS_VOLUME = [
  { type: "Annuity", volume: 638, amtCr: 70100, csr: 99.93, color: "#ec4899" },
  { type: "Survival", volume: 325, amtCr: 32000, csr: 98.25, color: "#a855f7" },
  { type: "Maturity", volume: 320, amtCr: 130000, csr: 94.1, color: "#f59e0b" },
  { type: "Indl DC", volume: 103, amtCr: 230272, csr: 98.15, color: "#4f8ef7" },
  { type: "Group DC", volume: 24.9, amtCr: 5760, csr: 98.2, color: "#10b981" },
  { type: "Micro DC", volume: 0.85, amtCr: 52, csr: 97.2, color: "#06b6d4" },
];

export const PREMIUM_SEGMENT = [
  { name: "Traditional Life", value: 534304, color: "#4f8ef7" },
  { name: "Pension/Annuity", value: 124526, color: "#10b981" },
  { name: "ULIP", value: 100327, color: "#f59e0b" },
  { name: "Non-linked Annuity", value: 27856, color: "#a855f7" },
  { name: "Health Riders", value: 798, color: "#ec4899" },
];

export const POLICIES_ISSUED = [
  { year: "2019-20", lic: 218.96, private: 69.5 },
  { year: "2020-21", lic: 209.75, private: 71.52 },
  { year: "2021-22", lic: 217.19, private: 73.94 },
  { year: "2022-23", lic: 204.29, private: 80.42 },
  { year: "2023-24", lic: 203.93, private: 87.84 },
];

export const MARKET_SHARE = [
  { name: "LIC", value: 71.2, color: "#4f8ef7" },
  { name: "Private", value: 28.8, color: "#10b981" },
];

export const INSURER_CSR = [
  { name: "HDFC Life", csr: 99.71, fill: "#4f8ef7" },
  { name: "Axis Max Life", csr: 99.7, fill: "#6366f1" },
  { name: "ABSLI", csr: 99.65, fill: "#8b5cf6" },
  { name: "ICICI Prudential", csr: 99.3, fill: "#a855f7" },
  { name: "Bajaj Allianz", csr: 99.29, fill: "#ec4899" },
  { name: "SBI Life", csr: 98.83, fill: "#f97316" },
  { name: "Kotak Mahindra", csr: 98.61, fill: "#f59e0b" },
  { name: "LIC", csr: 98.15, fill: "#10b981" },
  { name: "Ageas Federal", csr: 97.03, fill: "#06b6d4" },
  { name: "IndiaFirst", csr: 96.92, fill: "#64748b" },
];

export const LAPSE_DATA = [
  { year: "2019-20", lic: 7517, private: 1870 },
  { year: "2020-21", lic: 7694, private: 1766 },
  { year: "2021-22", lic: 7155, private: 1684 },
  { year: "2022-23", lic: 7138, private: 1438 },
];

export const TOP_STATES = [
  { state: "Maharashtra", premium: 11200 },
  { state: "Tamil Nadu", premium: 6610 },
  { state: "Karnataka", premium: 6800 },
  { state: "West Bengal", premium: 9498 },
  { state: "Uttar Pradesh", premium: 9253 },
  { state: "Gujarat", premium: 5800 },
  { state: "Delhi", premium: 5095 },
  { state: "Telangana", premium: 3358 },
];

export const KPI_CARDS = [
  {
    label: "Total Premium 2024-25",
    value: "₹6.93L Cr",
    delta: "+8.2%",
    up: true,
    color: "#4f8ef7",
    icon: "bar",
  },
  {
    label: "LIC Market Share",
    value: "71.2%",
    delta: "-0.4%",
    up: false,
    color: "#10b981",
    icon: "pie",
  },
  {
    label: "LIC Death Claims CSR",
    value: "98.15%",
    delta: "-0.1%",
    up: false,
    color: "#f59e0b",
    icon: "shield",
  },
  {
    label: "Annuity CSR",
    value: "99.93%",
    delta: "+0.01%",
    up: true,
    color: "#a855f7",
    icon: "heart",
  },
  {
    label: "Total Policies 2023-24",
    value: "291.77L",
    delta: "+2.5%",
    up: true,
    color: "#ec4899",
    icon: "users",
  },
  {
    label: "Lives Covered",
    value: "75.2 Cr",
    delta: "+6.1%",
    up: true,
    color: "#06b6d4",
    icon: "globe",
  },
  {
    label: "Total Claims Paid",
    value: "₹5.16L Cr",
    delta: "+9.3%",
    up: true,
    color: "#f97316",
    icon: "file",
  },
  {
    label: "LIC Lapsed Policies",
    value: "71.38L",
    delta: "-5.0%",
    up: true,
    color: "#84cc16",
    icon: "refresh",
  },
];

export const COLORS_CSR = {
  indlDeath: "#4f8ef7",
  groupDeath: "#10b981",
  maturity: "#f59e0b",
  survival: "#a855f7",
  annuity: "#ec4899",
  industry: "#64748b",
};

// ── REAL HEALTH INSURANCE DATA (IRDAI Annual Report & Disclosures) ──
export const HEALTH_MARKET_SHARE = [
  { name: "New India Assurance", value: 15.51, color: "#16a34a" },
  { name: "Star Health", value: 13.12, color: "#0284c7" },
  { name: "Oriental Insurance", value: 7.84, color: "#0369a1" },
  { name: "National Insurance", value: 6.74, color: "#15803d" },
  { name: "Care Health", value: 6.51, color: "#ea580c" },
  { name: "Bajaj Allianz", value: 6.31, color: "#075985" },
  { name: "ICICI Lombard", value: 5.99, color: "#d97706" },
  { name: "United India Insurance", value: 5.9, color: "#0c4a6e" },
  { name: "Niva Bupa", value: 5.31, color: "#166534" },
  { name: "HDFC ERGO", value: 4.79, color: "#c2410c" },
  { name: "Others", value: 21.98, color: "#64748b" },
];

export const HEALTH_CSR = [
  { name: "Care Health", csr: 95.19, fill: "#15803d" },
  { name: "New India Assurance", csr: 95.26, fill: "#0284c7" },
  { name: "Aditya Birla Health", csr: 94.09, fill: "#10b981" },
  { name: "HDFC ERGO", csr: 93.51, fill: "#ea580c" },
  { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
  { name: "Niva Bupa", csr: 90.64, fill: "#166534" },
  { name: "Acko General", csr: 88.62, fill: "#2563eb" },
  { name: "ICICI Lombard", csr: 80.98, fill: "#d97706" },
  { name: "Star Health", csr: 78.5, fill: "#059669" },
];

export const HEALTH_CLAIM_CATEGORIES = [
  { type: "Inpatient Hospitalisation", volume: 52.0, color: "#4f8ef7" },
  { type: "Day-Care Procedures", volume: 28.0, color: "#10b981" },
  { type: "Pre & Post Hospital", volume: 12.0, color: "#f59e0b" },
  { type: "OPD & Checkups", volume: 8.0, color: "#a855f7" },
];

export const HEALTH_REJECTION_REASONS = [
  { name: "Incomplete Docs", percentage: 19, color: "#ef4444" },
  { name: "Non-disclosure PED", percentage: 12, color: "#f97316" },
  { name: "Non-covered Items", percentage: 9, color: "#f59e0b" },
  { name: "Exclusions/Waiting Period", percentage: 60, color: "#64748b" },
];

// ── REAL MOTOR INSURANCE DATA (IRDAI Annual Report & Disclosures) ──
export const MOTOR_MARKET_SHARE = [
  { name: "ICICI Lombard", value: 10.84, color: "#0284c7" },
  { name: "New India Assurance", value: 10.59, color: "#0369a1" },
  { name: "Tata AIG", value: 9.17, color: "#ea580c" },
  { name: "United India Insurance", value: 8.2, color: "#c2410c" },
  { name: "Bajaj Allianz", value: 6.4, color: "#f97316" },
  { name: "Go Digit", value: 5.92, color: "#3b82f6" },
  { name: "National Insurance", value: 5.39, color: "#075985" },
  { name: "SBI General", value: 4.71, color: "#b45309" },
  { name: "Reliance General", value: 4.7, color: "#0c4a6e" },
  { name: "Oriental Insurance", value: 4.53, color: "#1e3a8a" },
  { name: "Others", value: 29.56, color: "#64748b" },
];

export const MOTOR_CSR = [
  { name: "New India Assurance", csr: 95.26, fill: "#0369a1" },
  { name: "HDFC ERGO", csr: 93.51, fill: "#ea580c" },
  { name: "Bajaj Allianz", csr: 91.57, fill: "#f97316" },
  { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
  { name: "Reliance General", csr: 90.4, fill: "#b45309" },
  { name: "Acko General", csr: 88.62, fill: "#ec4899" },
  { name: "ICICI Lombard", csr: 80.98, fill: "#0284c7" },
  { name: "Tata AIG", csr: 80.22, fill: "#c2410c" },
];

export const MOTOR_CLAIM_CATEGORIES = [
  { type: "Accidental Damage", volume: 68.0, color: "#4f8ef7" },
  { type: "Glass & Windshield", volume: 18.0, color: "#10b981" },
  { type: "Natural Calamities", volume: 7.0, color: "#f59e0b" },
  { type: "Theft / Total Loss", volume: 4.0, color: "#ef4444" },
  { type: "Engine Water Ingress", volume: 3.0, color: "#a855f7" },
];

export const MOTOR_REJECTION_REASONS = [
  { name: "Invalid License/Influence", percentage: 32, color: "#ef4444" },
  { name: "Lapsed Policy", percentage: 24, color: "#f97316" },
  { name: "Delayed Intimation", percentage: 18, color: "#f59e0b" },
  { name: "Consequential Damage", percentage: 14, color: "#a855f7" },
  { name: "Misrepresentation", percentage: 12, color: "#64748b" },
];

// ── REAL HISTORICAL TREND DATA (2020-2026) ──
export const HEALTH_CSR_TREND = [
  { year: "2020-21", industryAvg: 89.51, standaloneAvg: 75.43, pvtGeneralAvg: 78.44 },
  { year: "2021-22", industryAvg: 105.68, standaloneAvg: 79.06, pvtGeneralAvg: 94.66 },
  { year: "2022-23", industryAvg: 87.27, standaloneAvg: 61.44, pvtGeneralAvg: 80.09 },
  { year: "2023-24", industryAvg: 86.35, standaloneAvg: 63.63, pvtGeneralAvg: 83.49 },
  { year: "2024-25", industryAvg: 85.34, standaloneAvg: 68.06, pvtGeneralAvg: 83.46 },
  { year: "2025-26", industryAvg: 84.38, standaloneAvg: 71.37, pvtGeneralAvg: 85.14 },
];

export const MOTOR_CSR_TREND = [
  { year: "2020-21", industryAvg: 75.61, pvtGeneralAvg: 73.59, psuAvg: 78.6 },
  { year: "2021-22", industryAvg: 81.3, pvtGeneralAvg: 74.53, psuAvg: 94.03 },
  { year: "2022-23", industryAvg: 84.48, pvtGeneralAvg: 75.6, psuAvg: 102.55 },
  { year: "2023-24", industryAvg: 81.98, pvtGeneralAvg: 73.3, psuAvg: 99.57 },
  { year: "2024-25", industryAvg: 85.51, pvtGeneralAvg: 74.62, psuAvg: 107.94 },
  { year: "2025-26", industryAvg: 86.03, pvtGeneralAvg: 74.13, psuAvg: 110.63 },
];

// ── ALL YEARS CONSOLIDATED DATA ──
export const HEALTH_MARKET_SHARE_ALL: Record<string, typeof HEALTH_MARKET_SHARE> = {
  "2020-21": [
    { name: "New India Assurance", value: 17.89, color: "#16a34a" },
    { name: "Star Health", value: 14.73, color: "#0284c7" },
    { name: "United India Insurance", value: 10.58, color: "#0369a1" },
    { name: "National Insurance", value: 9.05, color: "#15803d" },
    { name: "Oriental Insurance", value: 7.82, color: "#ea580c" },
    { name: "HDFC ERGO", value: 6.72, color: "#075985" },
    { name: "ICICI Lombard", value: 4.74, color: "#d97706" },
    { name: "Care Health", value: 4.02, color: "#0c4a6e" },
    { name: "Bajaj Allianz", value: 3.61, color: "#166534" },
    { name: "SBI General", value: 3.33, color: "#c2410c" },
    { name: "Others", value: 17.53, color: "#64748b" },
  ],
  "2021-22": [
    { name: "New India Assurance", value: 19.66, color: "#16a34a" },
    { name: "Star Health", value: 14.24, color: "#0284c7" },
    { name: "United India Insurance", value: 8.48, color: "#0369a1" },
    { name: "Oriental Insurance", value: 8.25, color: "#15803d" },
    { name: "National Insurance", value: 7.55, color: "#ea580c" },
    { name: "HDFC ERGO", value: 6.14, color: "#075985" },
    { name: "ICICI Lombard", value: 4.98, color: "#d97706" },
    { name: "Care Health", value: 4.82, color: "#0c4a6e" },
    { name: "Bajaj Allianz", value: 4.2, color: "#166534" },
    { name: "Niva Bupa", value: 3.49, color: "#c2410c" },
    { name: "Others", value: 18.19, color: "#64748b" },
  ],
  "2022-23": [
    { name: "New India Assurance", value: 17.75, color: "#16a34a" },
    { name: "Star Health", value: 13.26, color: "#0284c7" },
    { name: "Oriental Insurance", value: 8.96, color: "#0369a1" },
    { name: "United India Insurance", value: 7.87, color: "#15803d" },
    { name: "National Insurance", value: 7.58, color: "#ea580c" },
    { name: "HDFC ERGO", value: 5.85, color: "#075985" },
    { name: "ICICI Lombard", value: 5.73, color: "#d97706" },
    { name: "Care Health", value: 5.26, color: "#0c4a6e" },
    { name: "Niva Bupa", value: 4.17, color: "#166534" },
    { name: "Bajaj Allianz", value: 3.45, color: "#c2410c" },
    { name: "Others", value: 20.11, color: "#64748b" },
  ],
  "2023-24": [
    { name: "New India Assurance", value: 16.17, color: "#16a34a" },
    { name: "Star Health", value: 13.07, color: "#0284c7" },
    { name: "Oriental Insurance", value: 7.71, color: "#0369a1" },
    { name: "United India Insurance", value: 7.07, color: "#15803d" },
    { name: "National Insurance", value: 6.38, color: "#ea580c" },
    { name: "ICICI Lombard", value: 6.1, color: "#075985" },
    { name: "Bajaj Allianz", value: 5.95, color: "#d97706" },
    { name: "Care Health", value: 5.88, color: "#0c4a6e" },
    { name: "HDFC ERGO", value: 5.6, color: "#166534" },
    { name: "Niva Bupa", value: 4.81, color: "#c2410c" },
    { name: "Others", value: 21.25, color: "#64748b" },
  ],
  "2024-25": [
    { name: "New India Assurance", value: 15.51, color: "#16a34a" },
    { name: "Star Health", value: 13.12, color: "#0284c7" },
    { name: "Oriental Insurance", value: 7.84, color: "#0369a1" },
    { name: "National Insurance", value: 6.74, color: "#15803d" },
    { name: "Care Health", value: 6.51, color: "#ea580c" },
    { name: "Bajaj Allianz", value: 6.31, color: "#075985" },
    { name: "ICICI Lombard", value: 5.99, color: "#d97706" },
    { name: "United India Insurance", value: 5.9, color: "#0c4a6e" },
    { name: "Niva Bupa", value: 5.31, color: "#166534" },
    { name: "HDFC ERGO", value: 4.79, color: "#c2410c" },
    { name: "Others", value: 21.98, color: "#64748b" },
  ],
  "2025-26": [
    { name: "New India Assurance", value: 14.39, color: "#16a34a" },
    { name: "Star Health", value: 13.05, color: "#0284c7" },
    { name: "Oriental Insurance", value: 7.28, color: "#0369a1" },
    { name: "National Insurance", value: 6.32, color: "#15803d" },
    { name: "Care Health", value: 7.13, color: "#ea580c" },
    { name: "Bajaj Allianz", value: 7.74, color: "#075985" },
    { name: "ICICI Lombard", value: 6.12, color: "#d97706" },
    { name: "United India Insurance", value: 4.92, color: "#0c4a6e" },
    { name: "Niva Bupa", value: 5.88, color: "#166534" },
    { name: "HDFC ERGO", value: 4.26, color: "#c2410c" },
    { name: "Others", value: 22.91, color: "#64748b" },
  ],
};

export const HEALTH_CSR_ALL: Record<string, typeof HEALTH_CSR> = {
  "2020-21": [
    { name: "New India Assurance", csr: 91.91, fill: "#0284c7" },
    { name: "HDFC ERGO", csr: 90.42, fill: "#ea580c" },
    { name: "Niva Bupa", csr: 88.39, fill: "#166534" },
    { name: "Aditya Birla Health", csr: 84.13, fill: "#10b981" },
    { name: "Go Digit", csr: 81.36, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 76.87, fill: "#d97706" },
    { name: "Star Health", csr: 76.63, fill: "#059669" },
    { name: "Acko General", csr: 74.15, fill: "#2563eb" },
    { name: "Care Health", csr: 69.86, fill: "#15803d" },
  ],
  "2021-22": [
    { name: "New India Assurance", csr: 93.04, fill: "#0284c7" },
    { name: "Aditya Birla Health", csr: 92.25, fill: "#10b981" },
    { name: "HDFC ERGO", csr: 92.1, fill: "#ea580c" },
    { name: "Niva Bupa", csr: 89.07, fill: "#166534" },
    { name: "Go Digit", csr: 81.86, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 80.43, fill: "#d97706" },
    { name: "Star Health", csr: 77.72, fill: "#059669" },
    { name: "Care Health", csr: 74.37, fill: "#15803d" },
    { name: "Acko General", csr: 73.15, fill: "#2563eb" },
  ],
  "2022-23": [
    { name: "Aditya Birla Health", csr: 94.52, fill: "#10b981" },
    { name: "HDFC ERGO", csr: 94.32, fill: "#ea580c" },
    { name: "New India Assurance", csr: 93.13, fill: "#0284c7" },
    { name: "Niva Bupa", csr: 88.57, fill: "#166534" },
    { name: "Acko General", csr: 88.2, fill: "#2563eb" },
    { name: "Go Digit", csr: 87.71, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 85.44, fill: "#d97706" },
    { name: "Care Health", csr: 80.66, fill: "#15803d" },
    { name: "Star Health", csr: 75.1, fill: "#059669" },
  ],
  "2023-24": [
    { name: "HDFC ERGO", csr: 95.3, fill: "#ea580c" },
    { name: "Aditya Birla Health", csr: 94.55, fill: "#10b981" },
    { name: "New India Assurance", csr: 92.07, fill: "#0284c7" },
    { name: "Care Health", csr: 90.92, fill: "#15803d" },
    { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
    { name: "Niva Bupa", csr: 90.05, fill: "#166534" },
    { name: "Acko General", csr: 87.87, fill: "#2563eb" },
    { name: "ICICI Lombard", csr: 80.97, fill: "#d97706" },
    { name: "Star Health", csr: 77.8, fill: "#059669" },
  ],
  "2024-25": [
    { name: "New India Assurance", csr: 95.26, fill: "#0284c7" },
    { name: "Care Health", csr: 95.19, fill: "#15803d" },
    { name: "Aditya Birla Health", csr: 94.09, fill: "#10b981" },
    { name: "HDFC ERGO", csr: 93.51, fill: "#ea580c" },
    { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
    { name: "Niva Bupa", csr: 90.64, fill: "#166534" },
    { name: "Acko General", csr: 88.62, fill: "#2563eb" },
    { name: "ICICI Lombard", csr: 80.98, fill: "#d97706" },
    { name: "Star Health", csr: 78.5, fill: "#059669" },
  ],
  "2025-26": [
    { name: "Care Health", csr: 99.8, fill: "#15803d" },
    { name: "New India Assurance", csr: 96.33, fill: "#0284c7" },
    { name: "Aditya Birla Health", csr: 93.88, fill: "#10b981" },
    { name: "HDFC ERGO", csr: 93.11, fill: "#ea580c" },
    { name: "Go Digit", csr: 92.18, fill: "#3b82f6" },
    { name: "Niva Bupa", csr: 91.68, fill: "#166534" },
    { name: "Acko General", csr: 88.83, fill: "#2563eb" },
    { name: "Star Health", csr: 80.2, fill: "#059669" },
    { name: "ICICI Lombard", csr: 78.75, fill: "#d97706" },
  ],
};

export const MOTOR_MARKET_SHARE_ALL: Record<string, typeof MOTOR_MARKET_SHARE> = {
  "2020-21": [
    { name: "New India Assurance", value: 12.98, color: "#0284c7" },
    { name: "ICICI Lombard", value: 10.36, color: "#0369a1" },
    { name: "United India Insurance", value: 8.56, color: "#ea580c" },
    { name: "National Insurance", value: 7.18, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.97, color: "#f97316" },
    { name: "Tata AIG", value: 6.4, color: "#3b82f6" },
    { name: "Oriental Insurance", value: 5.53, color: "#075985" },
    { name: "IFFCO Tokio", value: 5.49, color: "#b45309" },
    { name: "Reliance General", value: 5.27, color: "#0c4a6e" },
    { name: "HDFC ERGO", value: 5.02, color: "#1e3a8a" },
    { name: "Others", value: 26.24, color: "#64748b" },
  ],
  "2021-22": [
    { name: "ICICI Lombard", value: 11.76, color: "#0284c7" },
    { name: "New India Assurance", value: 11.7, color: "#0369a1" },
    { name: "United India Insurance", value: 7.78, color: "#ea580c" },
    { name: "Tata AIG", value: 7.29, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.88, color: "#f97316" },
    { name: "National Insurance", value: 6.6, color: "#3b82f6" },
    { name: "Reliance General", value: 5.46, color: "#075985" },
    { name: "IFFCO Tokio", value: 5.26, color: "#b45309" },
    { name: "HDFC ERGO", value: 5.04, color: "#0c4a6e" },
    { name: "Oriental Insurance", value: 4.84, color: "#1e3a8a" },
    { name: "Others", value: 27.42, color: "#64748b" },
  ],
  "2022-23": [
    { name: "New India Assurance", value: 11.04, color: "#0284c7" },
    { name: "ICICI Lombard", value: 10.56, color: "#0369a1" },
    { name: "Tata AIG", value: 8.23, color: "#ea580c" },
    { name: "United India Insurance", value: 7.36, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.58, color: "#f97316" },
    { name: "National Insurance", value: 6.26, color: "#3b82f6" },
    { name: "HDFC ERGO", value: 5.71, color: "#075985" },
    { name: "IFFCO Tokio", value: 5.09, color: "#b45309" },
    { name: "Reliance General", value: 4.97, color: "#0c4a6e" },
    { name: "Go Digit", value: 4.92, color: "#1e3a8a" },
    { name: "Others", value: 29.27, color: "#64748b" },
  ],
  "2023-24": [
    { name: "ICICI Lombard", value: 10.5, color: "#0284c7" },
    { name: "New India Assurance", value: 10.37, color: "#0369a1" },
    { name: "Tata AIG", value: 8.1, color: "#ea580c" },
    { name: "United India Insurance", value: 7.68, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.37, color: "#f97316" },
    { name: "Go Digit", value: 5.96, color: "#3b82f6" },
    { name: "HDFC ERGO", value: 5.75, color: "#075985" },
    { name: "National Insurance", value: 5.49, color: "#b45309" },
    { name: "IFFCO Tokio", value: 4.76, color: "#0c4a6e" },
    { name: "Reliance General", value: 4.75, color: "#1e3a8a" },
    { name: "Others", value: 30.27, color: "#64748b" },
  ],
  "2024-25": [
    { name: "ICICI Lombard", value: 10.84, color: "#0284c7" },
    { name: "New India Assurance", value: 10.59, color: "#0369a1" },
    { name: "Tata AIG", value: 9.17, color: "#ea580c" },
    { name: "United India Insurance", value: 8.2, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.4, color: "#f97316" },
    { name: "Go Digit", value: 5.92, color: "#3b82f6" },
    { name: "National Insurance", value: 5.39, color: "#075985" },
    { name: "SBI General", value: 4.71, color: "#b45309" },
    { name: "Reliance General", value: 4.7, color: "#0c4a6e" },
    { name: "Oriental Insurance", value: 4.53, color: "#1e3a8a" },
    { name: "Others", value: 29.56, color: "#64748b" },
  ],
  "2025-26": [
    { name: "ICICI Lombard", value: 10.98, color: "#0284c7" },
    { name: "New India Assurance", value: 10.37, color: "#0369a1" },
    { name: "Tata AIG", value: 9.64, color: "#ea580c" },
    { name: "United India Insurance", value: 8.62, color: "#c2410c" },
    { name: "Bajaj Allianz", value: 6.31, color: "#f97316" },
    { name: "Go Digit", value: 6.42, color: "#3b82f6" },
    { name: "National Insurance", value: 4.96, color: "#075985" },
    { name: "SBI General", value: 7.06, color: "#b45309" },
    { name: "Reliance General", value: 4.57, color: "#0c4a6e" },
    { name: "Oriental Insurance", value: 6.79, color: "#1e3a8a" },
    { name: "Others", value: 24.28, color: "#64748b" },
  ],
};

export const MOTOR_CSR_ALL: Record<string, typeof MOTOR_CSR> = {
  "2020-21": [
    { name: "New India Assurance", csr: 91.91, fill: "#0369a1" },
    { name: "HDFC ERGO", csr: 90.42, fill: "#ea580c" },
    { name: "Bajaj Allianz", csr: 86.06, fill: "#f97316" },
    { name: "Tata AIG", csr: 82.5, fill: "#c2410c" },
    { name: "Go Digit", csr: 81.36, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 76.87, fill: "#0284c7" },
    { name: "Reliance General", csr: 76.8, fill: "#b45309" },
    { name: "Acko General", csr: 74.15, fill: "#ec4899" },
  ],
  "2021-22": [
    { name: "New India Assurance", csr: 93.04, fill: "#0369a1" },
    { name: "HDFC ERGO", csr: 92.1, fill: "#ea580c" },
    { name: "Bajaj Allianz", csr: 86.89, fill: "#f97316" },
    { name: "Reliance General", csr: 85.53, fill: "#b45309" },
    { name: "Tata AIG", csr: 83.17, fill: "#c2410c" },
    { name: "Go Digit", csr: 81.86, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 80.43, fill: "#0284c7" },
    { name: "Acko General", csr: 73.15, fill: "#ec4899" },
  ],
  "2022-23": [
    { name: "HDFC ERGO", csr: 94.32, fill: "#ea580c" },
    { name: "New India Assurance", csr: 93.13, fill: "#0369a1" },
    { name: "Acko General", csr: 88.2, fill: "#ec4899" },
    { name: "Go Digit", csr: 87.71, fill: "#3b82f6" },
    { name: "ICICI Lombard", csr: 85.44, fill: "#0284c7" },
    { name: "Reliance General", csr: 84.55, fill: "#b45309" },
    { name: "Tata AIG", csr: 81.95, fill: "#c2410c" },
    { name: "Bajaj Allianz", csr: 73.38, fill: "#f97316" },
  ],
  "2023-24": [
    { name: "HDFC ERGO", csr: 95.3, fill: "#ea580c" },
    { name: "Reliance General", csr: 93.14, fill: "#b45309" },
    { name: "Bajaj Allianz", csr: 92.18, fill: "#f97316" },
    { name: "New India Assurance", csr: 92.07, fill: "#0369a1" },
    { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
    { name: "Acko General", csr: 87.87, fill: "#ec4899" },
    { name: "ICICI Lombard", csr: 80.97, fill: "#0284c7" },
    { name: "Tata AIG", csr: 79.59, fill: "#c2410c" },
  ],
  "2024-25": [
    { name: "New India Assurance", csr: 95.26, fill: "#0369a1" },
    { name: "HDFC ERGO", csr: 93.51, fill: "#ea580c" },
    { name: "Bajaj Allianz", csr: 91.57, fill: "#f97316" },
    { name: "Go Digit", csr: 90.69, fill: "#3b82f6" },
    { name: "Reliance General", csr: 90.4, fill: "#b45309" },
    { name: "Acko General", csr: 88.62, fill: "#ec4899" },
    { name: "ICICI Lombard", csr: 80.98, fill: "#0284c7" },
    { name: "Tata AIG", csr: 80.22, fill: "#c2410c" },
  ],
  "2025-26": [
    { name: "Bajaj Allianz", csr: 99.8, fill: "#f97316" },
    { name: "New India Assurance", csr: 96.33, fill: "#0369a1" },
    { name: "Reliance General", csr: 93.33, fill: "#b45309" },
    { name: "HDFC ERGO", csr: 93.11, fill: "#ea580c" },
    { name: "Go Digit", csr: 92.18, fill: "#3b82f6" },
    { name: "Acko General", csr: 88.83, fill: "#ec4899" },
    { name: "Tata AIG", csr: 79.35, fill: "#c2410c" },
    { name: "ICICI Lombard", csr: 78.75, fill: "#0284c7" },
  ],
};

export const KPIS_BY_YEAR: Record<
  string,
  {
    health_premium_cr: number;
    health_premium_growth_pct: number;
    health_claims_lakh: number;
    health_claims_growth_pct: number;
    health_industry_csr_pct: number;
    motor_premium_cr: number;
    motor_premium_growth_pct: number;
    motor_industry_icr_pct: number;
  }
> = {
  "2020-21": {
    health_premium_cr: 63752.97,
    health_premium_growth_pct: 12.11,
    health_claims_lakh: 379.41,
    health_claims_growth_pct: 5.2,
    health_industry_csr_pct: 79.97,
    motor_premium_cr: 67792.19,
    motor_premium_growth_pct: -1.68,
    motor_industry_icr_pct: 75.61,
  },
  "2021-22": {
    health_premium_cr: 80502.27,
    health_premium_growth_pct: 26.27,
    health_claims_lakh: 594.35,
    health_claims_growth_pct: 56.65,
    health_industry_csr_pct: 84.3,
    motor_premium_cr: 70433.48,
    motor_premium_growth_pct: 3.9,
    motor_industry_icr_pct: 81.3,
  },
  "2022-23": {
    health_premium_cr: 97663.5,
    health_premium_growth_pct: 21.32,
    health_claims_lakh: 736.13,
    health_claims_growth_pct: 23.86,
    health_industry_csr_pct: 75.47,
    motor_premium_cr: 81280.04,
    motor_premium_growth_pct: 15.4,
    motor_industry_icr_pct: 84.48,
  },
  "2023-24": {
    health_premium_cr: 116693.95,
    health_premium_growth_pct: 19.49,
    health_claims_lakh: 838.47,
    health_claims_growth_pct: 13.9,
    health_industry_csr_pct: 70.34,
    motor_premium_cr: 91780.54,
    motor_premium_growth_pct: 12.92,
    motor_industry_icr_pct: 81.98,
  },
  "2024-25": {
    health_premium_cr: 127416.9,
    health_premium_growth_pct: 9.19,
    health_claims_lakh: 796.83,
    health_claims_growth_pct: -4.97,
    health_industry_csr_pct: 56.67,
    motor_premium_cr: 99093.48,
    motor_premium_growth_pct: 7.97,
    motor_industry_icr_pct: 85.51,
  },
  "2025-26": {
    health_premium_cr: 142293.6,
    health_premium_growth_pct: 11.68,
    health_claims_lakh: 827.18,
    health_claims_growth_pct: 3.81,
    health_industry_csr_pct: 47.27,
    motor_premium_cr: 108000.2,
    motor_premium_growth_pct: 8.99,
    motor_industry_icr_pct: 86.03,
  },
};
