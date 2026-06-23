import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, UserCircle, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Spinner } from "@/components/Spinner";
import logoImg from "@/assets/images/logo.png";

interface UnifiedLoginPortalProps {
  onAdvisorLoginSuccess: (username: string) => void;
}

export function UnifiedLoginPortal({ onAdvisorLoginSuccess }: UnifiedLoginPortalProps) {
  // Advisor Form states
  const [advisorUsername, setAdvisorUsername] = useState("");
  const [advisorPassword, setAdvisorPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [advisorLoading, setAdvisorLoading] = useState(false);
  const [advisorMsg, setAdvisorMsg] = useState("");

  const handleAdvisorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdvisorLoading(true);
    setAdvisorMsg("");

    setTimeout(() => {
      setAdvisorLoading(false);
      const userClean = advisorUsername.trim();
      if (userClean === "admin" && advisorPassword === "admin123") {
        setAdvisorMsg("Accessing Advisor Workspace...");
        setTimeout(() => {
          onAdvisorLoginSuccess(userClean);
        }, 600);
      } else {
        setAdvisorMsg("Invalid credentials. Please use the staging details below.");
      }
    }, 800);
  };

  const accentColor = "var(--color-accent)";
  const accentBg = "var(--color-accent-bg)";
  const accentBorder = "var(--color-accent-line)";

  return (
    <div className="login-portal-root">
      {/* LEFT — Branding */}
      <div className="login-portal-brand brand-section-col">
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            width: "320px",
            height: "320px",
            borderRadius: "50%",
            background: "rgba(136, 19, 55, 0.08)",
            top: "-80px",
            right: "-80px",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(136, 19, 55, 0.06)",
            bottom: "60px",
            left: "-40px",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            position: "relative",
            zIndex: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <img
            src={logoImg}
            alt="NKT Logo"
            style={{ width: "44px", height: "44px", objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.02em",
              }}
            >
              NKT Insurance
            </div>
            <div
              style={{
                fontSize: "0.6rem",
                color: "#64748B",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Solutions Platform
            </div>
          </div>
        </Link>

        {/* Hero */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: "99px",
              marginBottom: "24px",
              background: "rgba(255,255,255,0.6)",
              border: `1px solid ${accentBorder}`,
              fontSize: "0.68rem",
              fontWeight: 700,
              color: accentColor,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <div
              style={{ width: "6px", height: "6px", borderRadius: "50%", background: accentColor }}
            />
            Advisor CRM
          </div>

          <h1
            style={{
              fontSize: "clamp(2rem, 3vw, 2.8rem)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.12,
              margin: "0 0 18px",
              letterSpacing: "-0.04em",
            }}
          >
            Grow Your
            <br />
            <span style={{ color: accentColor }}>Insurance</span>
            <br />
            Portfolio.
          </h1>

          <p
            style={{
              fontSize: "0.92rem",
              color: "#64748B",
              lineHeight: 1.7,
              margin: "0 0 36px",
              maxWidth: "380px",
            }}
          >
            Manage leads, track conversions, and deliver exceptional client experiences.
          </p>

          {/* Feature list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Full CRM with per-lead activity timeline",
              "Interactive leads & conversion analytics",
              "One-click WhatsApp, call & email actions",
              "CSV export & follow-up management",
            ].map((feat, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "6px",
                    background: "rgba(255,255,255,0.7)",
                    border: `1px solid ${accentBorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <CheckCircle2 size={12} color={accentColor} />
                </div>
                <span style={{ fontSize: "0.85rem", color: "#475569", fontWeight: 500 }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div style={{ display: "flex", gap: "20px", position: "relative", zIndex: 1 }}>
          {[
            { icon: "🔒", label: "256-bit SSL" },
            { icon: "🏛️", label: "IRDAI Compliant" },
            { icon: "⚡", label: "OAuth 2.0" },
          ].map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.85rem" }}>{b.icon}</span>
              <span
                style={{
                  fontSize: "0.62rem",
                  color: "#64748B",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Form */}
      <div className="login-portal-form-container">
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Card */}
          <div
            style={{
              background: "#FFFFFF",
              borderRadius: "20px",
              border: "1px solid #E2E8F0",
              padding: "42px 36px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {/* Heading */}
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: "#0F172A",
                  margin: "0 0 5px",
                  letterSpacing: "-0.03em",
                }}
              >
                Advisor Sign In
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#94A3B8", margin: 0 }}>
                Sign in with your advisor credentials.
              </p>
            </div>

            {/* Advisor status message */}
            {advisorMsg && (
              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "10px",
                  fontSize: "0.78rem",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: advisorMsg.includes("Accessing") ? "#ECFDF5" : "#FEF2F2",
                  border: `1px solid ${advisorMsg.includes("Accessing") ? "#A7F3D0" : "#FECACA"}`,
                  color: advisorMsg.includes("Accessing") ? "#059669" : "#DC2626",
                }}
              >
                {advisorLoading && <Spinner size={12} color="currentColor" />}
                <span>{advisorMsg}</span>
              </div>
            )}

            {/* ADVISOR FORM */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <form
                onSubmit={handleAdvisorLoginSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "18px" }}
              >
                <div>
                  <label
                    htmlFor="advisor-username-input"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      display: "block",
                      marginBottom: "7px",
                    }}
                  >
                    Username
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94A3B8",
                        display: "flex",
                      }}
                    >
                      <UserCircle size={15} />
                    </span>
                    <input
                      id="advisor-username-input"
                      type="text"
                      placeholder="e.g. admin"
                      value={advisorUsername}
                      onChange={(e) => setAdvisorUsername(e.target.value)}
                      required
                      style={{
                        paddingLeft: "38px",
                        height: "46px",
                        width: "100%",
                        fontSize: "0.88rem",
                        background: "#F8FAFC",
                        border: "1.5px solid #E2E8F0",
                        borderRadius: "10px",
                        color: "#0F172A",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      className="nkt-input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="advisor-pass-input"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: "#64748B",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      display: "block",
                      marginBottom: "7px",
                    }}
                  >
                    Password
                  </label>
                  <div style={{ position: "relative" }}>
                    <span
                      style={{
                        position: "absolute",
                        left: "13px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#94A3B8",
                        display: "flex",
                      }}
                    >
                      <Lock size={15} />
                    </span>
                    <input
                      id="advisor-pass-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={advisorPassword}
                      onChange={(e) => setAdvisorPassword(e.target.value)}
                      required
                      style={{
                        paddingLeft: "38px",
                        paddingRight: "42px",
                        height: "46px",
                        width: "100%",
                        fontSize: "0.88rem",
                        background: "#F8FAFC",
                        border: "1.5px solid #E2E8F0",
                        borderRadius: "10px",
                        color: "#0F172A",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      className="nkt-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((o) => !o)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        color: "#94A3B8",
                        cursor: "pointer",
                        display: "flex",
                        padding: "4px",
                      }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={advisorLoading}
                  className="login-btn"
                  style={{
                    height: "48px",
                    width: "100%",
                    background: accentColor,
                    color: "#fff",
                    border: "none",
                    borderRadius: "11px",
                    fontWeight: 800,
                    fontSize: "0.92rem",
                    cursor: advisorLoading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    opacity: advisorLoading ? 0.75 : 1,
                    transition: "opacity 200ms, transform 200ms",
                    boxShadow: "0 4px 16px rgba(136,19,55,0.28)",
                    marginTop: "8px",
                  }}
                >
                  {advisorLoading ? (
                    <Spinner size={16} color="#fff" />
                  ) : (
                    <>
                      <ArrowRight size={16} /> Access Advisor CRM
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
