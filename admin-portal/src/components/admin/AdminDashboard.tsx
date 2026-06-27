import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { UnifiedLoginPortal } from "./UnifiedLoginPortal";
import { AdvisorWorkspace } from "./AdvisorWorkspace";
import type { Lead, AdvisorToast } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export function AdminDashboard() {

  const [advisorEmail, setAdvisorEmail] = useState("");
  const [advisorName, setAdvisorName] = useState("Mohamed Jiyavutheen");
  const [toasts, setToasts] = useState<AdvisorToast[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load state from localStorage on mount and fetch leads from MongoDB
  useEffect(() => {
    const storedEmail = localStorage.getItem("nkt_advisor_email") || "";
    const storedName = localStorage.getItem("nkt_advisor_name") || "Mohamed Jiyavutheen";
    setAdvisorEmail(storedEmail);
    setAdvisorName(storedName);

    const fetchLeads = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leads`);
        if (response.ok) {
          const data = await response.json();
          setLeads(data);
        }
      } catch (err) {
        console.error("Error fetching initial leads:", err);
      }
    };

    fetchLeads();
    setMounted(true);
  }, []);

  // Intercept back button when advisor is logged in to stay in Admin panel
  useEffect(() => {
    if (!advisorEmail) return;

    // Push dummy history entry
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      // Push dummy entry again to counteract pop and prevent navigating back
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [advisorEmail]);

  // Poll Express API for real-time lead updates from MongoDB (replaces localStorage storage listener)
  useEffect(() => {
    if (!advisorEmail) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/leads`);
        if (!response.ok) return;
        const latestLeads = await response.json();

        setLeads((prevLeads) => {
          // If previous list is empty (e.g. during initial loading), load the new leads
          if (prevLeads.length === 0) return latestLeads;

          const prevIds = new Set(prevLeads.map((l) => l.id));
          const newLeads = (latestLeads as Lead[]).filter((l) => !prevIds.has(l.id));

          if (newLeads.length > 0) {
            newLeads.forEach((lead) => {
              const toastId = `toast_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
              setToasts((prevToasts) => [
                ...prevToasts,
                {
                  id: toastId,
                  message: `Product: ${lead.interest === "life" ? "Life Insurance 🛡️" : lead.interest === "health" ? "Health Insurance 🏥" : "Motor Insurance 🚗"}`,
                  leadName: lead.name,
                  interest: lead.interest,
                },
              ]);

              // Play a high-quality notification chime using Web Audio API
              try {
                const audioCtx = new (
                  window.AudioContext || (window as any).webkitAudioContext
                )();
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.type = "sine";
                osc.frequency.setValueAtTime(659.25, audioCtx.currentTime); // E5
                gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

                osc.start();
                osc.stop(audioCtx.currentTime + 0.4);
              } catch (err) {}
            });
          }
          return latestLeads;
        });
      } catch (err) {
        console.error("Error polling leads:", err);
      }
    }, 8000); // Poll every 8 seconds

    return () => clearInterval(pollInterval);
  }, [advisorEmail]);

  // Toast Auto-expiration timer
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const handleAdvisorLoginSuccess = (email: string) => {
    setAdvisorEmail(email);
    const name =
      email === "admin"
        ? "Mohamed Jiyavutheen"
        : email
            .split("@")[0]
            .replace(/\./g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase());
    setAdvisorName(name);
    localStorage.setItem("nkt_advisor_email", email);
    localStorage.setItem("nkt_advisor_name", name);
  };

  const handleLogout = () => {
    setAdvisorEmail("");
    localStorage.removeItem("nkt_advisor_email");
    localStorage.removeItem("nkt_advisor_name");
  };

  if (!mounted) {
    return (
      <div
        className="admin-portal-loading"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F8FAFC",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "3px solid #E2E8F0",
            borderTopColor: "#2563EB",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (advisorEmail) {
    return (
      <div className="admin-portal" style={{ display: "contents" }}>
        <AdvisorWorkspace
          advisorEmail={advisorEmail}
          advisorName={advisorName}
          leads={leads}
          setLeads={(updated: Lead[]) => {
            setLeads(updated);
            localStorage.setItem("nkt_leads", btoa(JSON.stringify(updated)));
          }}
          onLogout={handleLogout}
        />

        {/* Real-time Toasts Overlay */}
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            pointerEvents: "none",
          }}
        >
          {toasts.map((t) => (
            <div
              key={t.id}
              style={{
                pointerEvents: "auto",
                background: "#FFFFFF",
                borderLeft: "4px solid var(--color-accent)",
                padding: "16px 20px",
                borderRadius: "10px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)",
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                minWidth: "320px",
                maxWidth: "420px",
                animation: "toastSlideIn 320ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.4rem",
                  background: "var(--color-accent-bg)",
                  padding: "8px",
                  borderRadius: "8px",
                  color: "var(--color-accent)",
                  flexShrink: 0,
                }}
              >
                {t.interest === "life" ? "🛡️" : t.interest === "health" ? "🏥" : "🚗"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#0F172A" }}>
                  New Callback Request!
                </div>
                <div
                  style={{
                    fontSize: "0.78rem",
                    color: "#475569",
                    marginTop: "2px",
                    lineHeight: 1.4,
                  }}
                >
                  <strong>{t.leadName}</strong> has requested assistance.
                </div>
                <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "4px" }}>
                  {t.message}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                style={{
                  background: "none",
                  border: "none",
                  color: "#CBD5E1",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                }}
                className="toast-close-btn"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes toastSlideIn {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .toast-close-btn:hover { color: #64748B !important; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-portal" style={{ display: "contents" }}>
      <UnifiedLoginPortal onAdvisorLoginSuccess={handleAdvisorLoginSuccess} />
    </div>
  );
}
