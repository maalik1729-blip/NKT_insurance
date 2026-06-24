import { Link } from "@tanstack/react-router";
import { TEL, TEL_DISPLAY, WA_NUMBER, EMAIL } from "./icons";
import logoImg from "../assets/images/logo.png";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ background: "#0F172A", color: "#F1F5F9", fontFamily: "'Inter', sans-serif" }}
      role="contentinfo"
    >
      <div
        style={{ maxWidth: "1180px", margin: "0 auto", padding: "64px clamp(1rem, 4vw, 2rem) 0" }}
      >
        {/* Main grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: "48px",
            paddingBottom: "48px",
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}
            >
              <img
                src={logoImg}
                alt=""
                style={{ width: "36px", height: "36px", objectFit: "contain", flexShrink: 0 }}
              />
              <div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#F1F5F9",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  NKT Insurance
                </div>
                <div
                  style={{
                    fontSize: "0.6rem",
                    color: "#475569",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Solutions Platform
                </div>
              </div>
            </div>
            <p
              style={{
                fontSize: "0.875rem",
                color: "#64748B",
                lineHeight: 1.7,
                margin: "0 0 24px",
                maxWidth: "280px",
              }}
            >
              Your trusted partner for Life, Health & Motor Insurance. Expert advice, transparent
              recommendations, and lifelong support for Indian families.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { href: `tel:${TEL}`, icon: <i className="fa-solid fa-phone" style={{ fontSize: "13px" }}></i>, label: TEL_DISPLAY },
                {
                  href: `https://wa.me/${WA_NUMBER}`,
                  icon: <i className="fa-brands fa-whatsapp" style={{ fontSize: "13px" }}></i>,
                  label: "WhatsApp Chat",
                },
                { href: `mailto:${EMAIL}`, icon: <i className="fa-solid fa-envelope" style={{ fontSize: "13px" }}></i>, label: EMAIL },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "0.82rem",
                    color: "#64748B",
                    textDecoration: "none",
                    transition: "color 160ms",
                  }}
                  className="footer-contact-link"
                >
                  <span style={{ color: "var(--color-accent)" }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--color-dark-ink-2)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              Insurance Plans
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Life Insurance (LIC)", to: "/life-insurance" },
                { label: "Health Insurance", to: "/health-insurance" },
                { label: "Motor Insurance", to: "/motor-insurance" },
                { label: "All Plans", to: "/services" },
                { label: "Claims Support", to: "/claims" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#64748B",
                    textDecoration: "none",
                    transition: "color 160ms",
                    display: "block",
                  }}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--color-dark-ink-2)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              Company
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "About NKT", to: "/about" },
                { label: "Our Services", to: "/services" },
                { label: "Claims Support", to: "/claims" },
                { label: "Contact Us", to: "/contact" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    fontSize: "0.875rem",
                    color: "#64748B",
                    textDecoration: "none",
                    transition: "color 160ms",
                    display: "block",
                  }}
                  className="footer-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact / CTA */}
          <div>
            <div
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                color: "var(--color-dark-ink-2)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "16px",
              }}
            >
              Get Started
            </div>
            <div
              style={{
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "16px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#F1F5F9",
                  marginBottom: "8px",
                  fontFamily: "var(--font-display)",
                }}
              >
                Free Insurance Consultation
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#64748B",
                  lineHeight: 1.6,
                  margin: "0 0 16px",
                }}
              >
                Get expert advice tailored to your family's needs.
              </p>
              <Link
                to="/contact"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "var(--color-accent)",
                  textDecoration: "none",
                  transition: "gap 160ms",
                }}
              >
                Talk to an Advisor <i className="fa-solid fa-arrow-up-right" style={{ fontSize: "14px" }}></i>
              </Link>
            </div>
            <div
              style={{
                marginTop: "16px",
                padding: "12px 16px",
                background: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  fontSize: "0.7rem",
                  color: "var(--color-dark-ink-2)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "4px",
                }}
              >
                Hours
              </div>
              <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Mon–Sat · 9 AM – 8 PM</div>
              <div style={{ fontSize: "0.78rem", color: "#64748B" }}>Sunday by appointment</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid #1E293B",
            padding: "20px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "0.78rem", color: "var(--color-dark-ink-2)" }}>
            © {currentYear} NKT Insurance Solutions Private Limited · All rights reserved
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["IRDAI Licensed", "Secure Platform", "ISO Compliant"].map((badge) => (
              <span
                key={badge}
                style={{ fontSize: "0.7rem", color: "var(--color-dark-ink-2)", fontWeight: 600 }}
              >
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .footer-link:hover { color: #F1F5F9 !important; }
        .footer-contact-link:hover { color: #F1F5F9 !important; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
