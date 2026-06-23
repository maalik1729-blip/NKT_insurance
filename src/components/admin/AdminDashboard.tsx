import { useState, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";
import { X } from "lucide-react";
import { UnifiedLoginPortal } from "./UnifiedLoginPortal";
import { AdvisorWorkspace } from "./AdvisorWorkspace";
import { Lead, AdvisorToast } from "./types";

export function AdminDashboard() {
  const router = useRouter();

  const [advisorEmail, setAdvisorEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("nkt_advisor_email") || "";
    }
    return "";
  });
  const [advisorName, setAdvisorName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("nkt_advisor_name") || "Mohamed Jiyavutheen";
    }
    return "Mohamed Jiyavutheen";
  });
  const [toasts, setToasts] = useState<AdvisorToast[]>([]);

  const [leads, setLeads] = useState<Lead[]>(() => {
    try {
      const stored = localStorage.getItem("nkt_leads");
      const parsed = stored ? JSON.parse(stored) : [];
      // Clean up any old seed leads from localStorage
      const filtered = (parsed as Lead[]).filter((l) => !l.id.startsWith("lead_seed_"));
      localStorage.setItem("nkt_leads", JSON.stringify(filtered));
      return filtered;
    } catch {
      return [];
    }
  });

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

  // Cross-tab real-time sync with browser Audio notifies and custom toast slider pops
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "nkt_leads") {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : [];

          setLeads((prevLeads) => {
            const prevIds = new Set(prevLeads.map((l) => l.id));
            const newLeads = (newValue as Lead[]).filter((l) => !prevIds.has(l.id));

            if (newLeads.length > 0 && advisorEmail) {
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
            return newValue;
          });
        } catch (err) {}
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
      email === "advisor@nktinsurance.com" || email === "admin"
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
    router.navigate({ to: "/admin/login" });
  };

  if (advisorEmail) {
    return (
      <div className="admin-portal" style={{ display: "contents" }}>
        <AdvisorWorkspace
          advisorEmail={advisorEmail}
          advisorName={advisorName}
          leads={leads}
          setLeads={(updated: Lead[]) => {
            setLeads(updated);
            localStorage.setItem("nkt_leads", JSON.stringify(updated));
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
