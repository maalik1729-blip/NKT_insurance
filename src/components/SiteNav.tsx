import { Link, useRouter } from "@tanstack/react-router";
import {
  ShieldCheck,
  Phone,
  ChevronDown,
  User,
  Heart,
  Car,
  ArrowRight,
  Menu,
  X,
  BarChart2,
} from "lucide-react";
import { WA_NUMBER, TEL, TEL_DISPLAY } from "./icons";
import { useState, useEffect } from "react";
import logoImg from "../assets/images/logo.png";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [router.state.location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header role="banner" style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <nav
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "#FFFFFF",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: scrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
          transition: "box-shadow 220ms ease, background 220ms ease",
          padding: "0 0",
        }}
        aria-label="Main navigation"
        className="nav__container"
      >
        <div
          style={{
            padding: "0 var(--space-6)",
            display: "flex",
            alignItems: "center",
            height: "64px",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* Brand */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              flexShrink: 0,
            }}
            aria-label="NKT Insurance Solutions — home"
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
                  color: "#0F172A",
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-display)",
                  lineHeight: 1.1,
                }}
              >
                NKT Insurance
              </div>
              <div
                style={{
                  fontSize: "0.58rem",
                  color: "#94A3B8",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                LIC · Health · Motor
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              flex: 1,
              justifyContent: "center",
            }}
            aria-label="Primary navigation"
            className="nav__links"
          >
            {/* Insurance Plans dropdown */}
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#475569",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  transition: "background 160ms, color 160ms",
                }}
                className="nav__dropdown-toggle"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen((o) => !o)}
              >
                Insurance Plans{" "}
                <ChevronDown
                  size={13}
                  style={{
                    transform: dropdownOpen ? "rotate(180deg)" : "none",
                    transition: "transform 200ms",
                  }}
                />
              </button>

              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "300px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "16px",
                    padding: "8px",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                    zIndex: 100,
                    animation: "fadeSlideDown 180ms ease",
                  }}
                >
                  {[
                    {
                      to: "/life-insurance",
                      icon: <ShieldCheck size={15} />,
                      title: "Life Insurance (LIC)",
                      desc: "Term cover, savings & retirement plans.",
                    },
                    {
                      to: "/health-insurance",
                      icon: <Heart size={15} />,
                      title: "Health Insurance",
                      desc: "Cashless treatment & family cover.",
                    },
                    {
                      to: "/motor-insurance",
                      icon: <Car size={15} />,
                      title: "Motor Insurance",
                      desc: "Quick policies for cars & bikes.",
                    },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        padding: "10px 12px",
                        borderRadius: "10px",
                        textDecoration: "none",
                        transition: "background 150ms",
                      }}
                      className="nav__dropdown-item"
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "8px",
                          background: "var(--color-accent-bg)",
                          border: "1px solid var(--color-accent-line)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--color-accent)",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#0F172A",
                            marginBottom: "2px",
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "#94A3B8", lineHeight: 1.35 }}>
                          {item.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { to: "/claims", label: "Claims" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#475569",
                  padding: "8px 12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  transition: "background 160ms, color 160ms",
                }}
                activeProps={{ style: { color: "#0F172A", fontWeight: 600 } }}
                className="nav__link"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/insurance-dashboard"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-accent)",
                padding: "7px 14px",
                borderRadius: "8px",
                textDecoration: "none",
                background: "var(--color-accent-bg)",
                border: "1px solid var(--color-accent-line)",
                transition: "all 160ms",
              }}
              className="nav__link dashboard-btn"
            >
              <BarChart2 size={13} /> Dashboard
            </Link>
          </nav>

          {/* Actions */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}
            className="nav__actions"
          >
            <a
              href={`tel:${TEL}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.82rem",
                fontWeight: 600,
                color: "#475569",
                padding: "8px 10px",
                borderRadius: "8px",
                textDecoration: "none",
                transition: "color 160ms",
              }}
              className="nav__phone"
            >
              <Phone size={13} /> {TEL_DISPLAY}
            </a>
            <Link
              to="/contact"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              Get a Quote <ArrowRight size={13} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            style={{
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              border: "1.5px solid #E2E8F0",
              borderRadius: "10px",
              background: "none",
              cursor: "pointer",
              color: "#0F172A",
              transition: "background 160ms",
              marginLeft: "auto",
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="nav__hamburger"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          top: "64px",
          background: "#FFFFFF",
          zIndex: 49,
          overflowY: "auto",
          borderTop: "1px solid #E2E8F0",
          transition: "transform 320ms ease, opacity 240ms ease, visibility 240ms ease",
        }}
        className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`}
      >
        <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "2px" }}>
          <div
            style={{
              fontSize: "0.67rem",
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "12px 8px 6px",
            }}
          >
            Insurance Plans
          </div>
          {[
            {
              to: "/life-insurance",
              icon: <ShieldCheck size={14} />,
              label: "Life Insurance (LIC)",
            },
            { to: "/health-insurance", icon: <Heart size={14} />, label: "Health Insurance" },
            { to: "/motor-insurance", icon: <Car size={14} />, label: "Motor Insurance" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 10px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#475569",
                transition: "background 150ms",
              }}
              className="nav__mobile-link"
            >
              <span style={{ color: "var(--color-accent)" }}>{item.icon}</span> {item.label}
            </Link>
          ))}

          <div style={{ height: "1px", background: "#F1F5F9", margin: "8px 0" }} />

          {[
            { to: "/claims", label: "Claims" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: "12px 10px",
                borderRadius: "10px",
                textDecoration: "none",
                fontSize: "0.95rem",
                fontWeight: 500,
                color: "#475569",
                transition: "background 150ms",
              }}
              className="nav__mobile-link"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/insurance-dashboard"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 10px",
              borderRadius: "10px",
              textDecoration: "none",
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--color-accent)",
              transition: "background 150ms",
            }}
            className="nav__mobile-link"
          >
            <BarChart2 size={14} /> Insurance Dashboard
          </Link>

          <div style={{ height: "1px", background: "#F1F5F9", margin: "8px 0" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "8px 0" }}>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn btn-primary"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: "46px",
              }}
            >
              Get a Free Quote <ArrowRight size={14} />
            </Link>
            <a
              href={`tel:${TEL}`}
              style={{
                textAlign: "center",
                fontSize: "0.85rem",
                color: "#64748B",
                fontWeight: 600,
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}
            >
              <Phone size={13} /> {TEL_DISPLAY}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .nav__links { display: none !important; }
          .nav__phone { display: none !important; }
          .nav__actions .btn-sm { display: none !important; }
          .nav__hamburger { display: flex !important; margin-left: auto !important; }
          .nav__container { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
        }
        .nav__link:hover, .nav__dropdown-toggle:hover { background: #F8FAFC !important; color: #0F172A !important; }
        .dashboard-btn:hover { background: var(--color-accent-line) !important; color: var(--color-accent) !important; }
        .nav__dropdown-item:hover { background: #F8FAFC !important; }
        .nav__mobile-link:hover { background: #F8FAFC !important; color: #0F172A !important; }
        @keyframes fadeSlideDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </header>
  );
}
