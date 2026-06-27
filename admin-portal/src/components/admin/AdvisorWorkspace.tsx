import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Plus,
  LogOut,
  Search,
  Filter,
  Download,
  X,
  MessageCircle,
  Phone,
  Heart,
  Car,
  ChevronRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import logoImg from "../../assets/images/logo.png";
import type { Lead, TimelineEvent, LeadStatus } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface AdvisorWorkspaceProps {
  advisorEmail: string;
  advisorName: string;
  leads: Lead[];
  setLeads: (leads: Lead[]) => void;
  onLogout: () => void;
}



export function AdvisorWorkspace({
  advisorEmail,
  advisorName,
  leads,
  setLeads,
  onLogout,
}: AdvisorWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "leads" | "analytics" | "settings">(
    "overview",
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTimelineNote, setNewTimelineNote] = useState("");
  const [newTimelineType, setNewTimelineType] = useState<TimelineEvent["type"]>("note");
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const [newInterest, setNewInterest] = useState("life");
  const [newPremium, setNewPremium] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Prevent background scrolling when "Add Lead" modal or "Lead Detail" sidebar is open
  useEffect(() => {
    const isModalOpen = isAddOpen || selectedLead !== null;
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("modal-open");
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [isAddOpen, selectedLead]);

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const entry: TimelineEvent = {
      id: `te_${Date.now()}`,
      type: "status",
      message: `Status changed to ${newStatus}.`,
      timestamp: new Date().toISOString(),
      actor: advisorEmail,
    };
    const updatedTimeline = [...(targetLead.timeline || []), entry];

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, timeline: updatedTimeline }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedLead = data.lead;
        setLeads(leads.map((l) => (l.id === leadId ? updatedLead : l)));
        if (selectedLead?.id === leadId) setSelectedLead(updatedLead);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleFollowUpChange = async (leadId: string, date: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followUpDate: date }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedLead = data.lead;
        setLeads(leads.map((l) => (l.id === leadId ? updatedLead : l)));
        if (selectedLead?.id === leadId) setSelectedLead(updatedLead);
      }
    } catch (err) {
      console.error("Error updating follow-up date:", err);
    }
  };

  const handleAddTimelineNote = async (leadId: string, message: string, type: TimelineEvent["type"]) => {
    if (!message.trim()) return;
    const targetLead = leads.find((l) => l.id === leadId);
    if (!targetLead) return;

    const entry: TimelineEvent = {
      id: `te_${Date.now()}`,
      type,
      message: message.trim(),
      timestamp: new Date().toISOString(),
      actor: advisorEmail,
    };
    const updatedTimeline = [...(targetLead.timeline || []), entry];

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeline: updatedTimeline }),
      });
      if (response.ok) {
        const data = await response.json();
        const updatedLead = data.lead;
        setLeads(leads.map((l) => (l.id === leadId ? updatedLead : l)));
        if (selectedLead?.id === leadId) setSelectedLead(updatedLead);
        setNewTimelineNote("");
      }
    } catch (err) {
      console.error("Error adding timeline note:", err);
    }
  };

  const handleAddNewLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPhone) return;

    const rawLeadData = {
      name: newName,
      phone: newPhone,

      interest: newInterest,
      premium: newPremium ? parseFloat(newPremium) : undefined,
      notes: newNotes || "Manually added via advisor dashboard.",
      assignedAdvisor: advisorName,
      source: "manual",
      timeline: [
        {
          id: `te_${Date.now()}`,
          type: "system",
          message: "Lead manually added by advisor.",
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rawLeadData),
      });
      if (response.ok) {
        const data = await response.json();
        const createdLead = data.lead;
        setLeads([createdLead, ...leads]);
        setNewName("");
        setNewPhone("");

        setNewInterest("life");
        setNewPremium("");
        setNewNotes("");
        setIsAddOpen(false);
      }
    } catch (err) {
      console.error("Error creating manual lead:", err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm("Delete this lead?")) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/${leadId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setLeads(leads.filter((l) => l.id !== leadId));
        setSelectedLead(null);
      }
    } catch (err) {
      console.error("Error deleting lead:", err);
    }
  };

  const handleExportCSV = () => {
    const h = "Date,Name,Phone,Product,Status,Notes\r\n";
    const r = filteredLeads
      .map(
        (l) =>
          `"${new Date(l.createdAt).toLocaleDateString()}","${l.name}","${l.phone}","${l.interest}","${l.status}","${l.notes.replace(/"/g, '""')}"`,
      )
      .join("\r\n");
    const blob = new Blob([h + r], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nkt_leads_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const filteredLeads = leads.filter((lead) => {
    const q = search.toLowerCase();
    const ms =
      !q ||
      lead.name.toLowerCase().includes(q) ||
      lead.phone.includes(q);
    return (
      ms &&
      (statusFilter === "all" || lead.status === statusFilter) &&
      (typeFilter === "all" || lead.interest === typeFilter)
    );
  });

  const todayStr = new Date().toISOString().split("T")[0];
  const convertedLeads = leads.filter((l) => l.status === "converted");
  const convRate = leads.length > 0 ? Math.round((convertedLeads.length / leads.length) * 100) : 0;
  const overdueCount = leads.filter((l) => l.followUpDate && l.followUpDate < todayStr).length;
  const todayCount = leads.filter((l) => l.followUpDate === todayStr).length;

  const monthlyData = Array.from({ length: 12 }, (_, idx) => ({
    month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][
      idx
    ],
    leads: leads.filter((l) => new Date(l.createdAt).getMonth() === idx).length,
    converted: leads.filter(
      (l) => new Date(l.createdAt).getMonth() === idx && l.status === "converted",
    ).length,
    premium:
      leads
        .filter((l) => new Date(l.createdAt).getMonth() === idx)
        .reduce((s, l) => s + l.premium, 0) / 1000,
  }));

  const sourceData = [
    { name: "Website", value: leads.filter((l) => l.source === "website").length },
    { name: "Referral", value: leads.filter((l) => l.source === "referral").length },
    { name: "Instagram", value: leads.filter((l) => l.source === "instagram").length },
    { name: "Ads", value: leads.filter((l) => l.source === "google-ads").length },
    { name: "Manual", value: leads.filter((l) => !l.source || l.source === "manual").length },
  ].filter((d) => d.value > 0);

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "leads", label: "Leads CRM", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  const sc: Record<string, { bg: string; text: string; border: string }> = {
    new: { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A" },
    contacted: {
      bg: "var(--color-accent-bg)",
      text: "var(--color-accent)",
      border: "var(--color-accent-line)",
    },
    "in-progress": {
      bg: "var(--color-secondary-bg)",
      text: "var(--color-secondary)",
      border: "var(--color-secondary-line)",
    },
    converted: { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0" },
    rejected: { bg: "#FEF2F2", text: "#991B1B", border: "#FCA5A5" },
  };

  return (
    <div className="advisor-root">
      {/* SIDEBAR */}
      <aside className="advisor-sidebar">
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={logoImg}
              alt="NKT Logo"
              style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
            />
            <div>
              <div
                style={{ fontSize: "0.92rem", fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}
              >
                NKT Insurance
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#64748B",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Advisor Panel
              </div>
            </div>
          </div>
        </div>
        <nav style={{ padding: "12px 10px", flex: 1 }}>
          <div
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px 8px",
            }}
          >
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive ? "var(--color-accent-bg)" : "transparent",
                  color: isActive ? "var(--color-accent)" : "#94A3B8",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  fontWeight: isActive ? 600 : 500,
                  marginBottom: "2px",
                  textAlign: "left",
                }}
                className={`advisor-nav-item ${isActive ? "active" : ""}`}
              >
                <Icon size={17} />
                {item.label}
                {item.id === "leads" && overdueCount > 0 && (
                  <span
                    style={{
                      marginLeft: "auto",
                      minWidth: "18px",
                      height: "18px",
                      background: "#EF4444",
                      borderRadius: "99px",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                    }}
                  >
                    {overdueCount}
                  </span>
                )}
              </button>
            );
          })}
          <div style={{ margin: "12px 0", borderTop: "1px solid #F1F5F9" }} />
          <div
            style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              padding: "4px 10px 8px",
            }}
          >
            Quick Actions
          </div>
          <button
            type="button"
            onClick={() => setIsAddOpen(true)}
            className="advisor-nav-add-lead-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(16,185,129,0.12)",
              color: "#34D399",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
              marginBottom: "6px",
            }}
          >
            <Plus size={16} /> Add Lead
          </button>
          <a
            href="http://localhost:8080/insurance-dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "none",
              background: "rgba(20,83,45,0.08)",
              color: "var(--color-accent)",
              cursor: "pointer",
              fontSize: "0.82rem",
              fontWeight: 600,
              textDecoration: "none",
              boxSizing: "border-box",
            }}
            className="advisor-nav-dashboard-link"
          >
            <LayoutDashboard size={16} /> View Stats
          </a>
        </nav>
        <div style={{ padding: "14px 16px", borderTop: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "50%",
                background: "var(--color-accent-bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: "var(--color-accent)",
                flexShrink: 0,
              }}
            >
              {advisorName.charAt(0)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#1E293B",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {advisorName}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#64748B",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {advisorEmail}
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              style={{
                background: "none",
                border: "none",
                color: "#64748B",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "6px",
              }}
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div className="advisor-main-container">
        {/* HEADER */}
        <header className="advisor-header">
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
              {activeTab === "overview"
                ? "Overview"
                : activeTab === "leads"
                  ? "Leads CRM"
                  : activeTab === "analytics"
                    ? "Analytics"
                    : "Settings"}
            </h1>
          </div>
          {activeTab === "leads" && (
            <div style={{ position: "relative" }}>
              <Search
                size={14}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94A3B8",
                }}
              />
              <input
                type="text"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  paddingLeft: "30px",
                  height: "34px",
                  border: "1px solid #E2E8F0",
                  borderRadius: "8px",
                  fontSize: "0.82rem",
                  outline: "none",
                  width: "220px",
                  background: "#F8FAFC",
                }}
              />
            </div>
          )}
          {(overdueCount > 0 || todayCount > 0) && (
            <div style={{ display: "flex", gap: "6px" }}>
              {overdueCount > 0 && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "99px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: "#FEF2F2",
                    color: "#DC2626",
                    border: "1px solid #FECACA",
                  }}
                >
                  🔴 {overdueCount} overdue
                </span>
              )}
              {todayCount > 0 && (
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: "99px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    background: "#FFFBEB",
                    color: "#92400E",
                    border: "1px solid #FDE68A",
                  }}
                >
                  ⏰ {todayCount} today
                </span>
              )}
            </div>
          )}
          <div style={{ fontSize: "0.75rem", color: "#94A3B8" }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {/* OVERVIEW */}
          {mounted && activeTab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Welcoming Header Banner */}
              <div
                className="advisor-banner"
                style={{
                  background: "linear-gradient(135deg, #3B0712 0%, #1A050B 100%)",
                  borderRadius: "16px",
                  padding: "28px 32px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 10px 30px rgba(136, 19, 55, 0.15)",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.6)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      marginBottom: "6px",
                    }}
                  >
                    Good{" "}
                    {new Date().getHours() < 12
                      ? "Morning"
                      : new Date().getHours() < 17
                        ? "Afternoon"
                        : "Evening"}{" "}
                    👋
                  </div>
                  <h2
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "#FFFFFF",
                      margin: 0,
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {advisorName}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "rgba(255,255,255,0.7)",
                      margin: "8px 0 0",
                    }}
                  >
                    <strong style={{ color: "#FCA5A5" }}>{leads.length} leads</strong> total ·{" "}
                    <strong style={{ color: "#34D399" }}>{convertedLeads.length} converted</strong>{" "}
                    · <strong style={{ color: "#FCD34D" }}>{convRate}%</strong> conversion rate
                  </p>
                </div>
                <div className="advisor-banner-actions" style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setIsAddOpen(true)}
                    className="banner-btn-secondary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "10px",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                    }}
                  >
                    <Plus size={16} /> Add Lead
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("leads")}
                    className="banner-btn-primary"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 18px",
                      background: "#FFFFFF",
                      borderRadius: "10px",
                      color: "#0F172A",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      border: "none",
                    }}
                  >
                    View All <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="advisor-kpi-grid">
                {[
                  {
                    label: "Total Leads",
                    value: leads.length,
                    icon: Users,
                    color: "var(--color-accent)",
                    bg: "var(--color-accent-bg)",
                    trend: `${leads.filter((l) => l.status === "new").length} new`,
                  },
                  {
                    label: "Converted",
                    value: convertedLeads.length,
                    icon: CheckCircle2,
                    color: "#10B981",
                    bg: "#ECFDF5",
                    trend: `${convRate}% rate`,
                  },
                  {
                    label: "Conversion Rate",
                    value: convRate + "%",
                    icon: TrendingUp,
                    color: "#3B82F6",
                    bg: "#EFF6FF",
                    trend: "Overall rate",
                  },
                  {
                    label: "Pending Follow-ups",
                    value: todayCount + overdueCount,
                    icon: Clock,
                    color: "#F59E0B",
                    bg: "#FFFBEB",
                    trend: "Action needed",
                  },
                ].map((card) => {
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.label}
                      className="kpi-card"
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "16px",
                        padding: "20px",
                        border: "1px solid #E2E8F0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "0.72rem",
                            color: "#64748B",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                          }}
                        >
                          {card.label}
                        </span>
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "10px",
                            background: card.bg,
                            color: card.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Icon size={17} />
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "1.8rem",
                            fontWeight: 800,
                            color: "#0F172A",
                            lineHeight: 1.1,
                          }}
                        >
                          {card.value}
                        </div>
                        <div
                          style={{
                            fontSize: "0.72rem",
                            color: card.color,
                            fontWeight: 600,
                            marginTop: "4px",
                          }}
                        >
                          {card.trend}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Insurance Services Catalogue */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "4px" }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: 0,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Insurance Services Catalogue
                  </h3>
                  <p style={{ fontSize: "0.78rem", color: "#94A3B8", margin: "4px 0 0" }}>
                    All products offered by NKT Insurance Solutions
                  </p>
                </div>
                <div className="advisor-services-grid">
                  {[
                    {
                      key: "life",
                      title: "Life Insurance (LIC)",
                      subtitle: "LIC Term & Endowment Plans",
                      features: [
                        "LIC Jeevan Anand",
                        "LIC Tech Term",
                        "LIC New Endowment Plan",
                        "LIC Money Back Policy",
                        "LIC Jeevan Labh",
                      ],
                      tag: "Most Popular",
                    },
                    {
                      key: "health",
                      title: "Health Insurance",
                      subtitle: "Mediclaim & Top-up Plans",
                      features: [
                        "Individual Mediclaim",
                        "Family Floater Plan",
                        "Senior Citizen Cover",
                        "Critical Illness Cover",
                        "Super Top-up Plans",
                      ],
                      tag: "High Demand",
                    },
                    {
                      key: "motor",
                      title: "Motor Insurance",
                      subtitle: "Car & Two-Wheeler Policies",
                      features: [
                        "Third Party Cover",
                        "Comprehensive Cover",
                        "Zero Depreciation Add-on",
                        "Roadside Assistance",
                        "Engine Protection",
                      ],
                      tag: null,
                    },
                  ].map((product) => {
                    const pLeads = leads.filter((l) => l.interest === product.key);
                    const conv = pLeads.filter((l) => l.status === "converted").length;
                    const convRatePercent =
                      pLeads.length > 0 ? Math.round((conv / pLeads.length) * 100) : 0;

                    const pConfigs: Record<
                      string,
                      {
                        icon: React.ComponentType<any>;
                        iconColor: string;
                        iconBg: string;
                        badgeColor: string;
                        badgeBg: string;
                        buttonBg: string;
                        buttonColor: string;
                        borderColor: string;
                      }
                    > = {
                      life: {
                        icon: ShieldCheck,
                        iconColor: "#E11D48",
                        iconBg: "#FFE4E6",
                        badgeColor: "#9F1239",
                        badgeBg: "#FFE4E6",
                        buttonBg: "#FFF1F2",
                        buttonColor: "#E11D48",
                        borderColor: "#FFE4E6",
                      },
                      health: {
                        icon: Heart,
                        iconColor: "#0284C7",
                        iconBg: "#E0F2FE",
                        badgeColor: "#0369A1",
                        badgeBg: "#E0F2FE",
                        buttonBg: "#F0F9FF",
                        buttonColor: "#0284C7",
                        borderColor: "#E0F2FE",
                      },
                      motor: {
                        icon: Car,
                        iconColor: "#059669",
                        iconBg: "#D1FAE5",
                        badgeColor: "#065F46",
                        badgeBg: "#D1FAE5",
                        buttonBg: "#ECFDF5",
                        buttonColor: "#059669",
                        borderColor: "#D1FAE5",
                      },
                    };
                    const cfg = pConfigs[product.key];
                    const ProductIcon = cfg.icon;

                    return (
                      <div
                        key={product.key}
                        className="product-card"
                        style={{
                          background: "#FFFFFF",
                          borderRadius: "16px",
                          border: "1px solid #E2E8F0",
                          overflow: "hidden",
                          display: "flex",
                          flexDirection: "column",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)",
                          transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                        }}
                      >
                        <div
                          style={{
                            padding: "24px 24px 16px 24px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            position: "relative",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                width: "44px",
                                height: "44px",
                                borderRadius: "12px",
                                background: cfg.iconBg,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "transform 300ms var(--ease-out)",
                              }}
                              className="product-card-icon"
                            >
                              <ProductIcon size={22} color={cfg.iconColor} />
                            </div>
                            {product.tag && (
                              <span
                                style={{
                                  padding: "4px 10px",
                                  borderRadius: "99px",
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  background: cfg.badgeBg,
                                  color: cfg.badgeColor,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                }}
                              >
                                {product.tag}
                              </span>
                            )}
                          </div>
                          <div>
                            <h3
                              style={{
                                fontSize: "1rem",
                                fontWeight: 800,
                                color: "#0F172A",
                                margin: "0 0 2px 0",
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              {product.title}
                            </h3>
                            <p
                              style={{
                                fontSize: "0.76rem",
                                color: "#64748B",
                                margin: 0,
                              }}
                            >
                              {product.subtitle}
                            </p>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr 1fr",
                            borderTop: "1px solid #F1F5F9",
                            borderBottom: "1px solid #F1F5F9",
                            background: "#F8FAFC",
                          }}
                        >
                          {[
                            { label: "Leads", value: pLeads.length },
                            { label: "Converted", value: conv },
                            { label: "Conv. Rate", value: convRatePercent + "%" },
                          ].map((s, i) => (
                            <div
                              key={s.label}
                              style={{
                                padding: "12px 10px",
                                borderRight: i < 2 ? "1px solid #F1F5F9" : "none",
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0F172A" }}
                              >
                                {s.value}
                              </div>
                              <div
                                style={{
                                  fontSize: "0.62rem",
                                  color: "#94A3B8",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  marginTop: "2px",
                                }}
                              >
                                {s.label}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div
                          style={{
                            padding: "18px 24px",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          {product.features.map((f) => (
                            <div
                              key={f}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                fontSize: "0.78rem",
                                color: "#475569",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  background: cfg.iconBg,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                <CheckCircle2 size={10} color={cfg.iconColor} />
                              </div>
                              <span style={{ fontWeight: 500 }}>{f}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ padding: "14px 24px", borderTop: "1px solid #F1F5F9" }}>
                          <button
                            type="button"
                            onClick={() => {
                              setTypeFilter(product.key);
                              setActiveTab("leads");
                            }}
                            className={`product-card-button product-card-button-${product.key}`}
                            style={{
                              width: "100%",
                              height: "38px",
                              background: cfg.buttonBg,
                              color: cfg.buttonColor,
                              border: `1px solid ${cfg.borderColor}`,
                              borderRadius: "8px",
                              fontWeight: 700,
                              fontSize: "0.82rem",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "6px",
                              transition: "all 200ms ease",
                            }}
                          >
                            View {product.title.split(" ")[0]} Leads
                            <ChevronRight
                              size={13}
                              className="chevron-icon"
                              style={{ transition: "transform 200ms ease" }}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart & Follow-ups Section */}
              <div className="advisor-charts-grid">
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                    padding: "20px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: "0 0 16px",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Monthly Lead Activity
                  </h3>
                  <div style={{ height: 200 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData} barSize={14}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            fontSize: "0.78rem",
                          }}
                        />
                        <Bar dataKey="leads" fill="#E2E8F0" name="Leads" radius={[4, 4, 0, 0]} />
                        <Bar
                          dataKey="converted"
                          fill="var(--color-secondary)"
                          name="Converted"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "16px",
                    border: "1px solid #E2E8F0",
                    overflow: "hidden",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #F1F5F9",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        margin: 0,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Follow-ups
                    </h3>
                    <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                      {todayCount + overdueCount} pending
                    </span>
                  </div>
                  <div style={{ maxHeight: "220px", overflowY: "auto", flex: 1 }}>
                    {leads.filter(
                      (l) =>
                        l.followUpDate &&
                        (l.followUpDate === todayStr || l.followUpDate < todayStr),
                    ).length === 0 ? (
                      <div
                        style={{
                          padding: "32px",
                          textAlign: "center",
                          color: "#94A3B8",
                          fontSize: "0.82rem",
                        }}
                      >
                        🎉 No pending follow-ups!
                      </div>
                    ) : (
                      leads
                        .filter(
                          (l) =>
                            l.followUpDate &&
                            (l.followUpDate === todayStr || l.followUpDate < todayStr),
                        )
                        .map((lead) => (
                          <div
                            key={lead.id}
                            onClick={() => {
                              setSelectedLead(lead);
                              setActiveTab("leads");
                            }}
                            style={{
                              padding: "12px 20px",
                              borderBottom: "1px solid #F8FAFC",
                              cursor: "pointer",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              transition: "background 150ms ease",
                            }}
                            className="tbl-row"
                          >
                            <div>
                              <div
                                style={{ fontSize: "0.82rem", fontWeight: 700, color: "#0F172A" }}
                              >
                                {lead.name}
                              </div>
                              <div style={{ fontSize: "0.68rem", color: "#94A3B8" }}>
                                {lead.followUpDate! < todayStr ? "⚠️ Overdue" : "📅 Today"} ·{" "}
                                {lead.interest}
                              </div>
                            </div>
                            <ChevronRight size={14} color="#CBD5E1" />
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>

              {/* Recent Leads */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.01)",
                }}
              >
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #F1F5F9" }}>
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: 0,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Recent Leads
                  </h3>
                </div>
                {leads.slice(0, 5).map((lead, i) => {
                  const s = sc[lead.status] || sc.new;
                  return (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setActiveTab("leads");
                      }}
                      style={{
                        padding: "14px 20px",
                        borderBottom: i < 4 ? "1px solid #F8FAFC" : "none",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        cursor: "pointer",
                        transition: "background 150ms ease",
                      }}
                      className="tbl-row"
                    >
                      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: "var(--color-accent-bg)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.82rem",
                            fontWeight: 700,
                            color: "var(--color-accent)",
                          }}
                        >
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
                            {lead.name}
                          </div>
                          <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                            {lead.interest} ·{" "}
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </div>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span
                          style={{
                            fontSize: "0.68rem",
                            fontWeight: 700,
                            padding: "3px 10px",
                            borderRadius: "99px",
                            background: s.bg,
                            color: s.text,
                            border: `1px solid ${s.border}`,
                          }}
                        >
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LEADS CRM */}
          {activeTab === "leads" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div className="advisor-leads-kpi-grid">
                {[
                  { label: "Total Leads", value: leads.length, color: "var(--color-accent)" },
                  {
                    label: "New Leads",
                    value: leads.filter((l) => l.status === "new").length,
                    color: "#D97706",
                  },
                  {
                    label: "In Progress",
                    value: leads.filter((l) => l.status === "in-progress").length,
                    color: "#0284C7",
                  },
                  {
                    label: "Converted",
                    value: leads.filter((l) => l.status === "converted").length,
                    color: "#059669",
                  },
                  {
                    label: "Rejected",
                    value: leads.filter((l) => l.status === "rejected").length,
                    color: "#DC2626",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="kpi-card"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "12px",
                      padding: "16px",
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        background: s.color,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.68rem",
                        color: "#64748B",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {s.label}
                    </span>
                    <span
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 800,
                        color: "#0F172A",
                        lineHeight: 1.1,
                      }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  background: "#FFFFFF",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "1px solid #E2E8F0",
                  flexWrap: "wrap",
                }}
              >
                <Filter size={13} color="#94A3B8" />
                {["all", "new", "contacted", "in-progress", "converted", "rejected"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatusFilter(s)}
                    className={`filter-pill-btn ${statusFilter === s ? "active" : ""}`}
                    style={{
                      padding: "5px 14px",
                      borderRadius: "99px",
                      fontSize: "0.74rem",
                      fontWeight: 600,
                      border: "1px solid transparent",
                      cursor: "pointer",
                      background: statusFilter === s ? "var(--color-accent)" : "#F1F5F9",
                      color: statusFilter === s ? "#FFFFFF" : "#475569",
                      transition: "all 150ms ease",
                    }}
                  >
                    {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  style={{
                    marginLeft: "auto",
                    height: "32px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    paddingInline: "10px",
                    outline: "none",
                    background: "#F8FAFC",
                    fontWeight: 600,
                    color: "#475569",
                    cursor: "pointer",
                    transition: "all 150ms ease",
                  }}
                  className="filter-select"
                >
                  <option value="all">All Products</option>
                  <option value="life">🛡️ Life Insurance</option>
                  <option value="health">🏥 Health Insurance</option>
                  <option value="motor">🚗 Motor Insurance</option>
                </select>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  style={{
                    height: "32px",
                    border: "1.5px solid var(--color-accent-line)",
                    borderRadius: "8px",
                    fontSize: "0.76rem",
                    paddingInline: "14px",
                    background: "var(--color-accent-bg)",
                    fontWeight: 700,
                    color: "var(--color-accent)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    transition: "all 150ms ease",
                  }}
                  className="filter-pill-btn"
                >
                  <Download size={13} /> Export CSV
                </button>
              </div>

              <div
                className="leads-table-container"
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  border: "1px solid #E2E8F0",
                  overflowX: "auto",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "#F8FAFC" }}>
                      {[
                        "Name & Contact",
                        "Product",
                        "Status",
                        "Follow-up",
                        "Source",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "12px 14px",
                            textAlign: "left",
                            fontSize: "0.67rem",
                            fontWeight: 700,
                            color: "#64748B",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            borderBottom: "1px solid #E2E8F0",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          style={{ padding: "48px", textAlign: "center", color: "#94A3B8" }}
                        >
                          No leads found.{" "}
                          <button
                            type="button"
                            onClick={() => setIsAddOpen(true)}
                            style={{
                              color: "var(--color-accent)",
                              fontWeight: 700,
                              background: "none",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Add one?
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => {
                        const s = sc[lead.status] || sc.new;
                        const isOverdue = lead.followUpDate && lead.followUpDate < todayStr;
                        const isToday = lead.followUpDate === todayStr;
                        return (
                          <tr
                            key={lead.id}
                            onClick={() => setSelectedLead(lead)}
                            style={{ cursor: "pointer", borderBottom: "1px solid #F8FAFC" }}
                            className="tbl-row"
                          >
                            <td style={{ padding: "12px 14px" }}>
                              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <div
                                  style={{
                                    width: "32px",
                                    height: "32px",
                                    borderRadius: "50%",
                                    background: "var(--color-accent-bg)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "0.78rem",
                                    fontWeight: 700,
                                    color: "var(--color-accent)",
                                    flexShrink: 0,
                                  }}
                                >
                                  {lead.name.charAt(0)}
                                </div>
                                <div>
                                  <div
                                    style={{
                                      fontSize: "0.85rem",
                                      fontWeight: 700,
                                      color: "#0F172A",
                                    }}
                                  >
                                    {lead.name}
                                  </div>
                                  <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>
                                    {lead.phone}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <span
                                style={{ fontSize: "0.78rem", fontWeight: 600, color: "#475569" }}
                              >
                                {lead.interest === "life"
                                  ? "🛡️"
                                  : lead.interest === "health"
                                    ? "🏥"
                                    : "🚗"}{" "}
                                {lead.interest.charAt(0).toUpperCase() + lead.interest.slice(1)}
                              </span>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <span
                                style={{
                                  fontSize: "0.68rem",
                                  fontWeight: 700,
                                  padding: "3px 10px",
                                  borderRadius: "99px",
                                  background: s.bg,
                                  color: s.text,
                                  border: `1px solid ${s.border}`,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                {lead.status}
                              </span>
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              {lead.followUpDate ? (
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    fontWeight: 600,
                                    color: isOverdue ? "#DC2626" : isToday ? "#D97706" : "#10B981",
                                  }}
                                >
                                  {isOverdue ? "⚠️ " : isToday ? "⏰ " : "✅ "}
                                  {lead.followUpDate}
                                </span>
                              ) : (
                                <span style={{ fontSize: "0.72rem", color: "#CBD5E1" }}>—</span>
                              )}
                            </td>
                            <td style={{ padding: "12px 14px" }}>
                              <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                                {lead.source || "—"}
                              </span>
                            </td>
                            <td
                              style={{ padding: "12px 14px" }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div style={{ display: "flex", gap: "6px" }}>
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="table-action-btn action-wa"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    background: "#ECFDF5",
                                    border: "1px solid #A7F3D0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                  }}
                                >
                                  <MessageCircle size={13} color="#10B981" />
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="table-action-btn action-phone"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    background: "var(--color-accent-bg)",
                                    border: "1px solid var(--color-accent-line)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textDecoration: "none",
                                  }}
                                >
                                  <Phone size={13} color="var(--color-accent)" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="table-action-btn action-delete"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    background: "#FEF2F2",
                                    border: "1px solid #FECACA",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                  }}
                                >
                                  <X size={13} color="#EF4444" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card List */}
              <div className="leads-cards-container">
                {filteredLeads.length === 0 ? (
                  <div
                    style={{
                      padding: "48px 24px",
                      textAlign: "center",
                      color: "#94A3B8",
                      background: "#FFFFFF",
                      borderRadius: "12px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    No leads found.{" "}
                    <button
                      type="button"
                      onClick={() => setIsAddOpen(true)}
                      style={{
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Add one?
                    </button>
                  </div>
                ) : (
                  filteredLeads.map((lead) => {
                    const s = sc[lead.status] || sc.new;
                    const isOverdue = lead.followUpDate && lead.followUpDate < todayStr;
                    const isToday = lead.followUpDate === todayStr;
                    return (
                      <div
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="lead-mobile-card"
                        style={{
                          background: "#FFFFFF",
                          borderRadius: "12px",
                          border: "1px solid #E2E8F0",
                          padding: "16px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                          cursor: "pointer",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                          position: "relative",
                        }}
                      >
                        {/* Top Section: Name and Status */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "50%",
                                background: "var(--color-accent-bg)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "0.85rem",
                                fontWeight: 700,
                                color: "var(--color-accent)",
                                flexShrink: 0,
                              }}
                            >
                              {lead.name.charAt(0)}
                            </div>
                            <div>
                              <div
                                style={{
                                  fontSize: "0.9rem",
                                  fontWeight: 700,
                                  color: "#0F172A",
                                }}
                              >
                                {lead.name}
                              </div>
                              <div
                                style={{ fontSize: "0.75rem", color: "#64748B", marginTop: "1px" }}
                              >
                                {lead.phone}
                              </div>
                            </div>
                          </div>
                          <span
                            style={{
                              fontSize: "0.68rem",
                              fontWeight: 700,
                              padding: "3px 10px",
                              borderRadius: "99px",
                              background: s.bg,
                              color: s.text,
                              border: `1px solid ${s.border}`,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {lead.status}
                          </span>
                        </div>

                        {/* Middle Section: Product and Follow-up */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop: "10px",
                            borderTop: "1px dashed #F1F5F9",
                            fontSize: "0.8rem",
                          }}
                        >
                          <span style={{ fontWeight: 600, color: "#475569" }}>
                            {lead.interest === "life"
                              ? "🛡️"
                              : lead.interest === "health"
                                ? "🏥"
                                : "🚗"}{" "}
                            {lead.interest.charAt(0).toUpperCase() + lead.interest.slice(1)}
                          </span>
                          <div>
                            {lead.followUpDate ? (
                              <span
                                style={{
                                  fontWeight: 600,
                                  color: isOverdue ? "#DC2626" : isToday ? "#D97706" : "#10B981",
                                }}
                              >
                                {isOverdue
                                  ? "⚠️ Overdue: "
                                  : isToday
                                    ? "⏰ Today: "
                                    : "✅ Follow-up: "}
                                {lead.followUpDate}
                              </span>
                            ) : (
                              <span style={{ color: "#CBD5E1" }}>No follow-up</span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section: Source and Actions */}
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingTop: "10px",
                            borderTop: "1px dashed #F1F5F9",
                          }}
                        >
                          <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>
                            Source:{" "}
                            <strong style={{ color: "#64748B", textTransform: "capitalize" }}>
                              {lead.source || "—"}
                            </strong>
                          </span>
                          <div
                            style={{ display: "flex", gap: "8px" }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <a
                              href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}`}
                              target="_blank"
                              rel="noreferrer"
                              className="table-action-btn action-wa"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "#ECFDF5",
                                border: "1px solid #A7F3D0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                              }}
                            >
                              <MessageCircle size={14} color="#10B981" />
                            </a>
                            <a
                              href={`tel:${lead.phone}`}
                              className="table-action-btn action-phone"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "var(--color-accent-bg)",
                                border: "1px solid var(--color-accent-line)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textDecoration: "none",
                              }}
                            >
                              <Phone size={14} color="var(--color-accent)" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleDeleteLead(lead.id)}
                              className="table-action-btn action-delete"
                              style={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "8px",
                                background: "#FEF2F2",
                                border: "1px solid #FCA5A5",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                              }}
                            >
                              <X size={14} color="#EF4444" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {mounted && activeTab === "analytics" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div className="advisor-kpi-grid" style={{ gap: "16px" }}>
                {[
                  { label: "Total Leads", value: leads.length, color: "var(--color-accent)" },
                  { label: "Conversion Rate", value: convRate + "%", color: "#10B981" },
                  { label: "Converted Leads", value: convertedLeads.length, color: "#3B82F6" },
                  {
                    label: "Pending Follow-ups",
                    value: todayCount + overdueCount,
                    color: "#F59E0B",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="kpi-card"
                    style={{
                      background: "#FFFFFF",
                      borderRadius: "14px",
                      padding: "20px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: s.color }}>
                      {s.value}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: "#94A3B8",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        marginTop: "4px",
                      }}
                    >
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="advisor-charts-grid" style={{ gap: "20px" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    padding: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: "0 0 16px",
                    }}
                  >
                    Monthly Leads Intake Volume
                  </h3>
                  <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="pgGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop
                              offset="5%"
                              stopColor="var(--color-secondary)"
                              stopOpacity={0.18}
                            />
                            <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                        <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94A3B8" }} />
                        <YAxis tick={{ fontSize: 11, fill: "#94A3B8" }} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            fontSize: "0.78rem",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="leads"
                          stroke="var(--color-secondary)"
                          fill="url(#pgGrad)"
                          strokeWidth={2}
                          name="Leads Intake"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "14px",
                    border: "1px solid #E2E8F0",
                    padding: "20px",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      color: "#0F172A",
                      margin: "0 0 16px",
                    }}
                  >
                    Lead Source Attribution
                  </h3>
                  <div style={{ height: 220 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={78}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {sourceData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={
                                [
                                  "var(--color-secondary)",
                                  "var(--color-accent)",
                                  "#F59E0B",
                                  "#475569",
                                  "#CBD5E1",
                                ][i % 5]
                              }
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                            fontSize: "0.78rem",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "var(--color-dark)",
                  borderRadius: "14px",
                  padding: "24px 28px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: "#64748B",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Advisor Performance
                  </div>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "#F8FAFC",
                      marginTop: "4px",
                    }}
                  >
                    {advisorName}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "#94A3B8", marginTop: "4px" }}>
                    NKT Insurance Solutions · Licensed Advisor
                  </div>
                </div>
                <div className="advisor-services-grid" style={{ gap: "24px" }}>
                  {[
                    { label: "Total Leads", value: leads.length },
                    { label: "Closed", value: convertedLeads.length },
                    { label: "Conv. Rate", value: convRate + "%" },
                  ].map((s) => (
                    <div key={s.label} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontSize: "1.6rem",
                          fontWeight: 800,
                          color: "var(--color-accent-line)",
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontSize: "0.68rem",
                          color: "#64748B",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          marginTop: "2px",
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "680px" }}
            >
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Account & Settings
              </h2>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  padding: "24px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "var(--color-accent-bg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "var(--color-accent)",
                    }}
                  >
                    {advisorName.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A" }}>
                      {advisorName}
                    </div>
                    <div style={{ fontSize: "0.82rem", color: "#64748B" }}>{advisorEmail}</div>
                    <span
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        padding: "2px 8px",
                        borderRadius: "99px",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        background: "#ECFDF5",
                        color: "#059669",
                      }}
                    >
                      ● Active Advisor
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "14px",
                  border: "1px solid #E2E8F0",
                  padding: "24px",
                }}
              >
                <h3
                  style={{
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    margin: "0 0 14px",
                  }}
                >
                  Notifications
                </h3>
                {[
                  "New lead notifications",
                  "Follow-up reminders",
                  "WhatsApp alerts",
                  "Weekly summary email",
                ].map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                      borderBottom: "1px solid #F8FAFC",
                    }}
                  >
                    <span style={{ fontSize: "0.82rem", color: "#374151" }}>{item}</span>
                    <div
                      style={{
                        width: "36px",
                        height: "20px",
                        borderRadius: "10px",
                        background: "var(--color-accent)",
                        position: "relative",
                        cursor: "pointer",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: "#fff",
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: "#FEF2F2",
                  borderRadius: "14px",
                  border: "1px solid #FECACA",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#DC2626" }}>
                    Sign Out
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#EF4444", marginTop: "2px" }}>
                    Log out of the advisor workspace
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 16px",
                    background: "#DC2626",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                  }}
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* LEAD DETAIL SIDEBAR */}
      {selectedLead && (
        <div
          className="portal-modal-overlay"
          onClick={() => setSelectedLead(null)}
          style={{ justifyContent: "flex-end", alignItems: "stretch" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "460px",
              background: "#FFFFFF",
              height: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              animation: "sidebarSlide 240ms ease",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid #F1F5F9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                  {selectedLead.name}
                </h3>
                <span style={{ fontSize: "0.72rem", color: "#94A3B8" }}>{selectedLead.phone}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                style={{
                  background: "#F1F5F9",
                  border: "none",
                  borderRadius: "8px",
                  padding: "6px",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                {[
                  { label: "Phone", value: selectedLead.phone },
                  { label: "Product", value: selectedLead.interest },
                  { label: "Status", value: selectedLead.status },
                  { label: "Source", value: selectedLead.source || "—" },
                ].map((d) => (
                  <div
                    key={d.label}
                    style={{ padding: "10px 12px", background: "#F8FAFC", borderRadius: "8px" }}
                  >
                    <div
                      style={{
                        fontSize: "0.62rem",
                        color: "#94A3B8",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {d.label}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "#0F172A",
                        marginTop: "2px",
                        textTransform:
                          d.label === "Status" || d.label === "Product" ? "capitalize" : "none",
                      }}
                    >
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    handleAddTimelineNote(selectedLead.id, "WhatsApp message sent.", "whatsapp")
                  }
                  style={{
                    flex: 1,
                    height: "36px",
                    background: "#ECFDF5",
                    color: "#10B981",
                    border: "1px solid #A7F3D0",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                  }}
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  onClick={() => handleAddTimelineNote(selectedLead.id, "Phone call made.", "call")}
                  style={{
                    flex: 1,
                    height: "36px",
                    background: "var(--color-accent-bg)",
                    color: "var(--color-accent)",
                    border: "1px solid var(--color-accent-line)",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    textDecoration: "none",
                  }}
                >
                  <Phone size={13} /> Call
                </a>

              </div>
              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Status
                </label>
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(selectedLead.id, e.target.value as LeadStatus)
                  }
                  style={{
                    width: "100%",
                    height: "38px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    paddingInline: "10px",
                    outline: "none",
                  }}
                >
                  {["new", "contacted", "in-progress", "converted", "rejected"].map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: "14px" }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={selectedLead.followUpDate || ""}
                  onChange={(e) => handleFollowUpChange(selectedLead.id, e.target.value)}
                  style={{
                    width: "100%",
                    height: "38px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    paddingInline: "10px",
                    outline: "none",
                  }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Log Activity
                </label>
                <div style={{ display: "flex", gap: "6px" }}>
                  <select
                    value={newTimelineType}
                    onChange={(e) => setNewTimelineType(e.target.value as TimelineEvent["type"])}
                    style={{
                      height: "36px",
                      border: "1px solid #E2E8F0",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      paddingInline: "6px",
                      outline: "none",
                    }}
                  >
                    {(["note", "call", "whatsapp", "email", "status"] as const).map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Add note or log..."
                    value={newTimelineNote}
                    onChange={(e) => setNewTimelineNote(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        handleAddTimelineNote(selectedLead.id, newTimelineNote, newTimelineType);
                    }}
                    style={{
                      flex: 1,
                      height: "36px",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "0.82rem",
                      paddingInline: "10px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleAddTimelineNote(selectedLead.id, newTimelineNote, newTimelineType)
                    }
                    style={{
                      height: "36px",
                      padding: "0 14px",
                      background: "var(--color-accent)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    Log
                  </button>
                </div>
              </div>
              <div>
                <label
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  Activity Timeline
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {(selectedLead.timeline || [])
                    .slice()
                    .reverse()
                    .map((event) => {
                      const ic: Record<string, string> = {
                        call: "📞",
                        whatsapp: "💬",
                        email: "✉️",
                        note: "📝",
                        status: "🔄",
                        system: "⚙️",
                      };
                      return (
                        <div
                          key={event.id}
                          style={{
                            padding: "10px 12px",
                            background: "#F8FAFC",
                            borderRadius: "8px",
                            border: "1px solid #E2E8F0",
                          }}
                        >
                          <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                            <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>
                              {ic[event.type] || "📌"}
                            </span>
                            <div>
                              <div
                                style={{ fontSize: "0.78rem", color: "#374151", lineHeight: 1.5 }}
                              >
                                {event.message}
                              </div>
                              <div
                                style={{ fontSize: "0.65rem", color: "#94A3B8", marginTop: "2px" }}
                              >
                                {new Date(event.timestamp).toLocaleString("en-IN")}{" "}
                                {event.actor ? `· ${event.actor}` : ""}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {(!selectedLead.timeline || selectedLead.timeline.length === 0) && (
                    <div
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        color: "#94A3B8",
                        fontSize: "0.78rem",
                      }}
                    >
                      No activity logged yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar bottom Export CSV */}
              <div
                style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid #F1F5F9" }}
              >
                <button
                  type="button"
                  onClick={handleExportCSV}
                  style={{
                    width: "100%",
                    height: "38px",
                    background: "var(--color-accent-bg)",
                    color: "var(--color-accent)",
                    border: "1px solid var(--color-accent-line)",
                    borderRadius: "8px",
                    fontWeight: 700,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 200ms ease",
                  }}
                >
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD LEAD MODAL */}
      {isAddOpen && (
        <div className="portal-modal-overlay" onClick={() => setIsAddOpen(false)}>
          <div
            className="portal-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "460px", maxHeight: "90vh", overflowY: "auto" }}
          >
            <button
              type="button"
              className="portal-modal__close"
              onClick={() => setIsAddOpen(false)}
            >
              <X size={18} />
            </button>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#0F172A", margin: "0 0 16px" }}>
              Add New Lead
            </h3>
            <form
              onSubmit={handleAddNewLead}
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {[
                {
                  id: "nl-name",
                  label: "Full Name *",
                  type: "text",
                  val: newName,
                  set: setNewName,
                  ph: "e.g. Rahul Sharma",
                },
                {
                  id: "nl-phone",
                  label: "Phone *",
                  type: "tel",
                  val: newPhone,
                  set: setNewPhone,
                  ph: "+91 XXXXX XXXXX",
                },

              ].map((f) => (
                <div key={f.id}>
                  <label
                    htmlFor={f.id}
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#64748B",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "4px",
                    }}
                  >
                    {f.label}
                  </label>
                  <input
                    id={f.id}
                    type={f.type}
                    placeholder={f.ph}
                    value={f.val}
                    onChange={(e) => f.set(e.target.value)}
                    style={{
                      width: "100%",
                      height: "38px",
                      border: "1px solid #E2E8F0",
                      borderRadius: "8px",
                      fontSize: "0.85rem",
                      paddingInline: "10px",
                      outline: "none",
                    }}
                  />
                </div>
              ))}
              <div>
                <label
                  htmlFor="nl-int"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Product Interest
                </label>
                <select
                  id="nl-int"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  style={{
                    width: "100%",
                    height: "38px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                    paddingInline: "10px",
                    outline: "none",
                  }}
                >
                  <option value="life">🛡️ Life Insurance</option>
                  <option value="health">🏥 Health Insurance</option>
                  <option value="motor">🚗 Motor Insurance</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="nl-notes"
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Notes
                </label>
                <textarea
                  id="nl-notes"
                  placeholder="Any requirements or context..."
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  style={{
                    width: "100%",
                    height: "70px",
                    border: "1px solid #E2E8F0",
                    borderRadius: "8px",
                    fontSize: "0.82rem",
                    padding: "10px",
                    resize: "none",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  height: "42px",
                  background: "var(--color-accent)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                }}
              >
                Add Lead to CRM
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .advisor-nav-item:hover { background: var(--color-accent-bg) !important; color: var(--color-accent) !important; }
        .tbl-row:hover { background: #F8FAFC !important; }
        .kpi-card { transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1); }
        .kpi-card:hover { box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05) !important; transform: translateY(-3px); border-color: #CBD5E1 !important; }
        @keyframes sidebarSlide { from { transform: translateX(100%); } to { transform: translateX(0); } }
        body { overflow: hidden; }
        body.modal-open {
          overflow: hidden !important;
        }
        body.modal-open .advisor-root {
          overflow: hidden !important;
          height: 100vh !important;
        }
        body.modal-open .advisor-main-container > main {
          overflow: hidden !important;
        }

        /* Login Portal Sleek Styles */
        .nkt-input { transition: all 200ms ease !important; }
        .nkt-input:focus {
          background: #FFFFFF !important;
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 3px var(--color-accent-bg) !important;
        }
        .login-btn { transition: all 250ms cubic-bezier(0.16, 1, 0.3, 1) !important; }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(136, 19, 55, 0.38) !important;
          filter: brightness(1.05);
        }
        .login-btn:active:not(:disabled) {
          transform: translateY(0) scale(0.98) !important;
        }

        /* Banner Button Micro-animations */
        .banner-btn-secondary { transition: all 200ms ease !important; }
        .banner-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
          transform: translateY(-1px);
        }
        .banner-btn-secondary:active {
          transform: translateY(0) scale(0.98) !important;
        }
        .banner-btn-primary { transition: all 200ms ease !important; }
        .banner-btn-primary:hover {
          background: #F8FAFC !important;
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
        }
        .banner-btn-primary:active {
          transform: translateY(0) scale(0.98) !important;
        }

        /* Product Card Animations */
        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08) !important;
          border-color: #CBD5E1 !important;
        }
        .product-card:hover .product-card-icon {
          transform: scale(1.05);
        }
        .product-card-button { transition: all 200ms ease !important; }
        .product-card-button-life:hover {
          background: #E11D48 !important;
          color: #FFFFFF !important;
          border-color: #E11D48 !important;
          box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25) !important;
        }
        .product-card-button-health:hover {
          background: #0284C7 !important;
          color: #FFFFFF !important;
          border-color: #0284C7 !important;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25) !important;
        }
        .product-card-button-motor:hover {
          background: #059669 !important;
          color: #FFFFFF !important;
          border-color: #059669 !important;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25) !important;
        }
        .product-card-button:hover .chevron-icon {
          transform: translateX(3px);
        }

        /* CRM Table Action Buttons & Filters */
        .filter-pill-btn { transition: all 150ms ease !important; }
        .filter-pill-btn:hover:not(.active) {
          background: #E2E8F0 !important;
          color: #0F172A !important;
        }
        .filter-pill-btn:active {
          transform: scale(0.97) !important;
        }
        .filter-select:hover {
          border-color: #CBD5E1 !important;
          background: #F1F5F9 !important;
        }
        .filter-select:focus {
          border-color: var(--color-accent) !important;
          box-shadow: 0 0 0 2px var(--color-accent-bg) !important;
        }

        .table-action-btn { transition: all 200ms cubic-bezier(0.16, 1, 0.3, 1) !important; }
        .table-action-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 4px 8px rgba(0,0,0,0.06) !important;
        }
        .action-wa:hover {
          background: #10B981 !important;
          border-color: #10B981 !important;
        }
        .action-wa:hover svg {
          color: #FFFFFF !important;
        }
        .action-phone:hover {
          background: var(--color-accent) !important;
          border-color: var(--color-accent) !important;
        }
        .action-phone:hover svg {
          color: #FFFFFF !important;
        }
        .action-delete:hover {
          background: #EF4444 !important;
          border-color: #EF4444 !important;
        }
        .action-delete:hover svg {
          color: #FFFFFF !important;
        }

        /* Responsive Mobile Layout adjustments */
        .leads-cards-container {
          display: none;
        }

        @media (max-width: 768px) {
          .leads-table-container {
            display: none !important;
          }
          .leads-cards-container {
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .lead-mobile-card {
            transition: transform 150ms ease, border-color 150ms ease;
          }
          .lead-mobile-card:active {
            transform: scale(0.99);
            border-color: var(--color-accent-line) !important;
          }

          /* Banner Mobile Layout */
          .advisor-banner {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 20px !important;
            gap: 16px !important;
            text-align: center !important;
          }
          .advisor-banner-actions {
            width: 100% !important;
            display: flex !important;
            gap: 10px !important;
          }
          .advisor-banner-actions > button {
            flex: 1 !important;
            justify-content: center !important;
            padding-inline: 8px !important;
          }

          /* Bottom sheet drawer for selected lead detail */
          .portal-modal-overlay {
            justify-content: center !important;
            align-items: flex-end !important;
          }
          .portal-modal-overlay > div {
            max-width: 100% !important;
            height: 82% !important;
            border-top-left-radius: 20px !important;
            border-top-right-radius: 20px !important;
            animation: bottomSheetSlide 280ms cubic-bezier(0.16, 1, 0.3, 1) !important;
          }
        }

        @keyframes bottomSheetSlide {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
