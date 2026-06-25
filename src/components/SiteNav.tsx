import { Link, useRouter } from "@tanstack/react-router";
import { WA_NUMBER, TEL, TEL_DISPLAY } from "./icons";
import { useState, useEffect, useRef } from "react";
import logoImg from "../assets/images/logo.png";
import { ChevronDown, Shield, Heart, Car, LayoutDashboard, Phone, ArrowRight, X, Menu, ChevronLeft } from "lucide-react";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isPlansActive = ["/life-insurance", "/health-insurance", "/motor-insurance"].includes(
    router.state.location.pathname
  );

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

  // Prevent background scroll when touching/scrolling inside the mobile navigation menu on mobile
  useEffect(() => {
    const el = mobileMenuRef.current;
    if (!el || !menuOpen) return;

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const scrollEl = el;
      const scrollTop = scrollEl.scrollTop;
      const scrollHeight = scrollEl.scrollHeight;
      const clientHeight = scrollEl.clientHeight;

      // If the content is not actually scrollable (it fits within the viewport), prevent scroll entirely
      if (scrollHeight <= clientHeight) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const touchY = e.touches[0].clientY;
      const direction = touchY - touchStartY; // positive: swipe down, negative: swipe up

      // Hitting top limit and swiping down (scrolling up)
      const hittingTop = scrollTop <= 0 && direction > 0;
      // Hitting bottom limit and swiping up (scrolling down)
      const hittingBottom = scrollTop + clientHeight >= scrollHeight && direction < 0;

      if (hittingTop || hittingBottom) {
        if (e.cancelable) e.preventDefault();
      }
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
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
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
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
          </a>

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
              className={`nav__dropdown-wrapper ${dropdownOpen ? "open" : ""}`}
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
                className={`nav__dropdown-toggle ${dropdownOpen || isPlansActive ? "active" : ""}`}
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
                      icon: <Shield size={15} />,
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
                  ].map((item) => {
                    const isActive = router.state.location.pathname === item.to;
                    return (
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
                          transition: "all 150ms ease",
                          background: isActive ? "#F1F5F9" : "transparent",
                          borderLeft: isActive ? "3px solid var(--color-accent)" : "3px solid transparent",
                          paddingLeft: isActive ? "9px" : "12px",
                        }}
                        className={`nav__dropdown-item ${isActive ? "active" : ""}`}
                      >
                        <div
                          className="nav__dropdown-icon-container"
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: isActive ? "var(--color-accent)" : "var(--color-accent-bg)",
                            border: isActive ? "1px solid var(--color-accent)" : "1px solid var(--color-accent-line)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: isActive ? "#FFFFFF" : "var(--color-accent)",
                            flexShrink: 0,
                            transition: "all 150ms ease",
                          }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div
                            className="nav__dropdown-title"
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: isActive ? "var(--color-accent)" : "#0F172A",
                              marginBottom: "2px",
                              transition: "color 150ms ease",
                            }}
                          >
                            {item.title}
                          </div>
                          <div style={{ fontSize: "0.72rem", color: "#94A3B8", lineHeight: 1.35 }}>
                            {item.desc}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
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
            {menuOpen ? (
              <X size={18} />
            ) : (
              <Menu size={18} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        ref={mobileMenuRef}
        style={{
          position: "fixed",
          inset: 0,
          top: 0,
          background: "#FFFFFF",
          zIndex: 1000,
          overflowY: "auto",
          overscrollBehavior: "contain",
          transition: "transform 320ms ease, opacity 240ms ease, visibility 240ms ease",
        }}
        className={`nav__mobile ${menuOpen ? "nav__mobile--open" : ""}`}
      >
        <div
          className="nav__mobile-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderBottom: "1px solid #E2E8F0",
            minHeight: "64px",
            background: "#FFFFFF",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          {/* Back button on the left */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              color: "#475569",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: "8px 10px",
              borderRadius: "8px",
              transition: "background 150ms",
            }}
            className="nav__mobile-back-btn"
          >
            <ChevronLeft size={16} /> Back
          </button>

          {/* Centered Brand / Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.location.href = "/";
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              textDecoration: "none",
            }}
          >
            <img
              src={logoImg}
              alt=""
              style={{ width: "32px", height: "32px", objectFit: "contain" }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "#0F172A",
                letterSpacing: "-0.01em",
              }}
            >
              NKT Insurance
            </span>
          </a>

          {/* Close button on the right */}
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              background: "#F8FAFC",
              cursor: "pointer",
              color: "#0F172A",
              transition: "background 160ms",
            }}
            aria-label="Close menu"
          >
            <X size={16} />
          </button>
        </div>

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
              icon: <Shield size={14} />,
              label: "Life Insurance (LIC)",
            },
            {
              to: "/health-insurance",
              icon: <Heart size={14} />,
              label: "Health Insurance",
            },
            {
              to: "/motor-insurance",
              icon: <Car size={14} />,
              label: "Motor Insurance",
            },
          ].map((item) => {
            const isActive = router.state.location.pathname === item.to;
            return (
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
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#0F172A" : "#475569",
                  background: isActive ? "#F1F5F9" : "transparent",
                  transition: "all 150ms ease",
                }}
                className={`nav__mobile-link ${isActive ? "active" : ""}`}
              >
                <span style={{ color: "var(--color-accent)" }}>{item.icon}</span> {item.label}
              </Link>
            );
          })}

          <div style={{ height: "1px", background: "#F1F5F9", margin: "8px 0" }} />

          {[
            { to: "/claims", label: "Claims" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((link) => {
            const isActive = router.state.location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                style={{
                  padding: "12px 10px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#0F172A" : "#475569",
                  background: isActive ? "#F1F5F9" : "transparent",
                  transition: "all 150ms ease",
                }}
                className={`nav__mobile-link ${isActive ? "active" : ""}`}
              >
                {link.label}
              </Link>
            );
          })}


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
        .nav__link:hover, .nav__dropdown-toggle:hover, .nav__dropdown-toggle.active {
          background: #F8FAFC !important;
          color: #0F172A !important;
        }
        .dashboard-btn:hover {
          background: var(--color-accent-line) !important;
          color: var(--color-accent) !important;
        }
        .nav__dropdown-wrapper::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 12px;
          background: transparent;
          z-index: 10;
          display: none;
        }
        .nav__dropdown-wrapper.open::after {
          display: block;
        }
        .nav__dropdown-item:hover {
          background: #F8FAFC !important;
        }
        .nav__dropdown-item:hover .nav__dropdown-icon-container {
          background: var(--color-accent) !important;
          color: #FFFFFF !important;
          border-color: var(--color-accent) !important;
          transform: scale(1.05);
        }
        .nav__dropdown-item:hover .nav__dropdown-title {
          color: var(--color-accent) !important;
        }
        .nav__mobile-link:hover {
          background: #F8FAFC !important;
          color: #0F172A !important;
        }
        @keyframes fadeSlideDown { from { opacity: 0; transform: translateX(-50%) translateY(-8px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </header>
  );
}
