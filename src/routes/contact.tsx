import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WA_NUMBER, TEL, TEL_DISPLAY, EMAIL } from "../components/icons";
import { LeadForm } from "../components/LeadForm";
import { FaqAccordion } from "../components/FaqAccordion";

const TITLE = "Contact NKT Insurance — Free 30-Minute Consultation";
const DESC =
  "Call, WhatsApp, or request a callback. A certified insurance advisor will respond within 30 minutes during business hours. No cost, no obligation.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const FAQ = [
  {
    q: "How quickly will you respond?",
    a: "Within 30 minutes during business hours (Mon–Sat, 9 AM–8 PM). For WhatsApp messages, typically within 15 minutes. On Sundays and public holidays, we respond the next business day.",
  },
  {
    q: "Do I need to prepare anything for the consultation?",
    a: "No preparation needed — just your basic details (age, family size, any existing policies). We'll guide the conversation. If you have existing policy documents handy, they're helpful but not required for the first call.",
  },
  {
    q: "Is the consultation really free?",
    a: "Yes, completely. We're paid a commission by the insurer only if you buy a policy — the commission is built into the premium and doesn't increase your cost. The consultation itself is free regardless of whether you buy anything.",
  },
  {
    q: "Can I meet in person?",
    a: "Yes — we welcome in-person meetings at our office. Call or WhatsApp to schedule a convenient time. We also visit clients at their home or office for senior citizens or those who prefer it.",
  },
  {
    q: "What if I already have insurance — can you review my existing policies?",
    a: "Absolutely. A policy review is one of the most valuable things we do. Many clients discover they're over-insured in one area and under-insured in another. We check your coverage, identify gaps, and recommend adjustments — all free.",
  },
];

const HOURS = [
  ["Monday", "9:00 AM – 8:00 PM"],
  ["Tuesday", "9:00 AM – 8:00 PM"],
  ["Wednesday", "9:00 AM – 8:00 PM"],
  ["Thursday", "9:00 AM – 8:00 PM"],
  ["Friday", "9:00 AM – 8:00 PM"],
  ["Saturday", "9:00 AM – 6:00 PM"],
  ["Sunday", "By appointment only"],
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" };

function ContactPage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="contact-h1"
        style={{
          padding: "clamp(5rem,10vw,8rem) 0 clamp(3rem,6vw,4rem)",
          background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ ...W, maxWidth: "860px", textAlign: "center" }}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontSize: "0.8rem",
              color: "#94A3B8",
              marginBottom: "28px",
            }}
            aria-label="Breadcrumb"
          >
            <Link to="/" style={{ color: "#94A3B8", textDecoration: "none" }} className="bc-link">
              Home
            </Link>
            <span>/</span>
            <span style={{ color: "#0F172A", fontWeight: 500 }}>Contact</span>
          </nav>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "5px 14px",
              borderRadius: "99px",
              background: "var(--color-accent-bg)",
              border: "1px solid var(--color-accent-line)",
              fontSize: "0.72rem",
              fontWeight: 700,
              color: "var(--color-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "20px",
            }}
          >
            <i className="fa-solid fa-phone" style={{ fontSize: "11px" }}></i> Get in Touch
          </div>
          <h1
            id="contact-h1"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem,5vw,3.8rem)",
              fontWeight: 900,
              color: "#0F172A",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: "20px",
            }}
          >
            Talk to a real advisor{" "}
            <span style={{ color: "var(--color-accent)" }}>within 30 minutes</span>
          </h1>
          <p
            className="justify-text-mobile"
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              lineHeight: 1.75,
              maxWidth: "52ch",
              margin: "0 auto 36px",
            }}
          >
            Three ways to reach us — call, WhatsApp, or fill the form. A certified insurance advisor
            will respond personally. No bots, no scripts, no call centres.
          </p>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── CONTACT METHODS ── */}
      <section
        aria-labelledby="contact-methods-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,4rem)" }}>
            <div className="section-label">How to Reach Us</div>
            <h2 id="contact-methods-heading" style={{ margin: "0", maxWidth: "24ch" }}>
              Three ways to get in touch
            </h2>
          </div>

          {/* Contact method cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "clamp(4rem,8vw,6rem)",
            }}
            className="grid-3"
          >
            <a
              href={`tel:${TEL}`}
              id="contact-phone-card"
              aria-label={`Call ${TEL_DISPLAY}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "clamp(1.5rem,3vw,2rem)",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                textDecoration: "none",
                transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
              }}
              className="card"
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--color-accent-bg)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <i className="fa-solid fa-phone" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  Phone
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "4px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {TEL_DISPLAY}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748B" }}>Mon–Sat, 9 AM–8 PM</div>
              </div>
            </a>

            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hi%20NKT%2C%20I%20need%20insurance%20advice.`}
              id="contact-wa-card"
              aria-label="Chat on WhatsApp"
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "clamp(1.5rem,3vw,2rem)",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                textDecoration: "none",
                transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
              }}
              className="card"
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--color-secondary-bg)",
                  color: "var(--color-secondary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "var(--color-secondary)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  WhatsApp
                </div>
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "4px",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  {TEL_DISPLAY}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748B" }}>Reply within 15 minutes</div>
              </div>
            </a>

            <a
              href={`mailto:${EMAIL}`}
              id="contact-email-card"
              aria-label={`Email ${EMAIL}`}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "16px",
                padding: "clamp(1.5rem,3vw,2rem)",
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                textDecoration: "none",
                transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
              }}
              className="card"
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "var(--color-accent-bg)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                <i className="fa-solid fa-envelope" style={{ fontSize: "20px" }}></i>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    color: "var(--color-accent)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "6px",
                  }}
                >
                  Email
                </div>
                <div
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "#0F172A",
                    marginBottom: "4px",
                    fontFamily: "var(--font-display)",
                    wordBreak: "break-word",
                  }}
                >
                  {EMAIL}
                </div>
                <div style={{ fontSize: "0.82rem", color: "#64748B" }}>Reply within 4 hours</div>
              </div>
            </a>
          </div>

          {/* Form + Hours */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(4rem,8vw,6rem)",
              alignItems: "start",
            }}
            className="hero__grid"
          >
            <div>
              <div className="section-label">Request a Callback</div>
              <h2 style={{ margin: "0 0 12px", maxWidth: "24ch" }}>Request a free callback</h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#475569",
                  lineHeight: 1.72,
                  marginBottom: "28px",
                }}
              >
                Fill in 3 fields. We call you back within 30 minutes during business hours.
              </p>
              <div
                className="contact-form-card-wrap"
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
                  padding: "clamp(1.5rem,3vw,2rem)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <LeadForm />
              </div>
            </div>

            <div>
              <div className="section-label">Office Hours</div>
              <h2 style={{ margin: "0 0 24px", maxWidth: "20ch" }}>When we're available</h2>
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  overflow: "hidden",
                  maxWidth: "100%",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
              >
                <table
                  style={{ width: "100%", fontSize: "0.875rem", borderCollapse: "collapse" }}
                  aria-label="Office hours"
                >
                  <tbody>
                    {HOURS.map(([day, hours], i) => (
                      <tr
                        key={day}
                        style={{
                          borderBottom: i < HOURS.length - 1 ? "1px solid #F1F5F9" : "none",
                        }}
                      >
                        <td style={{ padding: "12px 20px", fontWeight: 600, color: "#0F172A" }}>
                          {day}
                        </td>
                        <td
                          style={{
                            padding: "12px 20px",
                            color: day === "Sunday" ? "#94A3B8" : "#475569",
                            textAlign: "right",
                          }}
                        >
                          {hours}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div
                  style={{
                    padding: "20px",
                    borderTop: "1px solid #F1F5F9",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ fontSize: "16px", color: "var(--color-accent)", marginTop: "2px", flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: "0.875rem",
                          color: "#0F172A",
                          marginBottom: "4px",
                        }}
                      >
                        Office location
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.6 }}>
                        25/293 A M G Street
                        <br />
                        Newtown, Vaniyambadi
                        <br />
                        Tirupathur District
                        <br />
                        Tamil Nadu – 635752
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <i
                      className="fa-solid fa-clock"
                      style={{ fontSize: "16px", color: "var(--color-accent)", flexShrink: 0 }}
                      aria-hidden="true"
                    />
                    <div style={{ fontSize: "0.82rem", color: "#64748B" }}>
                      Claim support available 24/7 via WhatsApp
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={`https://wa.me/${WA_NUMBER}?text=Hi%20NKT%2C%20I%20need%20insurance%20advice.`}
                className="btn btn-wa"
                style={{
                  width: "100%",
                  marginTop: "16px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                id="contact-page-wa"
              >
                <i className="fa-brands fa-whatsapp" style={{ fontSize: "16px" }}></i> WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Before you contact us"
        subtext="Quick answers to the most common questions about getting in touch."
      />
    </>
  );
}
