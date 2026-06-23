import { createFileRoute, Link } from "@tanstack/react-router";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { BadgeCheck, Award, Users, Clock, Heart, ShieldCheck, ArrowRight } from "lucide-react";
import { FaqAccordion } from "../components/FaqAccordion";
import { CtaBanner } from "../components/CtaBanner";

const TITLE = "About NKT Insurance Solutions — IRDAI Licensed Advisor";
const DESC =
  "Meet the team behind NKT Insurance Solutions. 10+ years of independent insurance advice for Indian families across Life, Health and Motor. IRDAI licensed, LIC authorised.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const MILESTONES = [
  {
    year: "2014",
    title: "NKT Insurance Solutions founded",
    body: "Started with a simple goal: give families honest insurance advice, not just policies.",
  },
  {
    year: "2017",
    title: "500 families served",
    body: "Expanded to Health and Motor insurance alongside our core LIC offering.",
  },
  {
    year: "2020",
    title: "Digital claim support launched",
    body: "Added online claim tracking and WhatsApp-based claim assistance — clients could follow up without visiting an office.",
  },
  {
    year: "2022",
    title: "1,000+ policies issued",
    body: "Crossed 1,000 active policies. Over ₹30Cr in life cover secured for Indian families.",
  },
  {
    year: "2024",
    title: "₹50Cr+ cover managed",
    body: "Today we manage ₹50Cr+ in aggregate cover across life, health, and motor policies. 98% claim success rate.",
  },
];

const VALUES = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Honesty first",
    body: "We tell you when a plan isn't right for you — even if it means we don't earn a commission. That's the only way to build a 10-year relationship.",
  },
  {
    icon: <Users size={20} />,
    title: "Independence",
    body: "We're not employed by any insurer. We compare LIC + 8 private insurers and recommend what's genuinely best for your situation.",
  },
  {
    icon: <Heart size={20} />,
    title: "Family-first",
    body: "We treat clients like family — not policy numbers. Most of our new clients come from referrals by existing clients.",
  },
  {
    icon: <Clock size={20} />,
    title: "Lifelong support",
    body: "The sale is just the start. Renewals, nominees, claims, additions — we're there through every stage of your policy's life.",
  },
];

const FAQ = [
  {
    q: "Is NKT Insurance a company or an individual advisor?",
    a: "NKT Insurance Solutions is an independent insurance advisory firm run by a certified LIC agent and IRDAI-licensed insurance advisor. We're a small, dedicated team — not a large call centre. You deal with the same advisor from consultation to claim.",
  },
  {
    q: "Are you affiliated with any specific insurer?",
    a: "We are an authorised LIC agent (which is required to sell LIC products) but we're not exclusive to LIC. We independently compare LIC and 8+ private insurers for health and motor, always recommending what's best for the client.",
  },
  {
    q: "How do you make money if advice is free?",
    a: "We earn a commission from the insurer when a policy is issued — this is built into the premium and doesn't cost you anything extra. The commission rate is the same regardless of which insurer we recommend, so we have no financial incentive to push one insurer over another.",
  },
  {
    q: "What areas do you serve?",
    a: "We serve clients across India. Most consultations happen over phone, WhatsApp, or video call. For clients in our city, we also offer in-person meetings at our office or at your location.",
  },
  {
    q: "How do I know I can trust your recommendations?",
    a: "Every recommendation comes with a full comparison — plan features, premiums, claim settlement ratios, and exclusions. We show you the data and explain the logic. You make the final decision.",
  },
];

const W = { maxWidth: "1180px", margin: "0 auto", padding: "0 32px" };

function AboutPage() {
  useScrollReveal();
  return (
    <>
      {/* ── HERO ── */}
      <section
        aria-labelledby="about-h1"
        style={{
          padding: "clamp(5rem,10vw,8rem) 0 clamp(3rem,6vw,5rem)",
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
            <span style={{ color: "#0F172A", fontWeight: 500 }}>About Us</span>
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
            <Users size={11} /> About NKT Insurance
          </div>
          <h1
            id="about-h1"
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
            A trusted advisor, not just an{" "}
            <span style={{ color: "var(--color-accent)" }}>insurance seller</span>
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#475569",
              marginBottom: "36px",
              lineHeight: 1.75,
              maxWidth: "55ch",
              margin: "0 auto 36px",
            }}
          >
            For over 10 years, NKT Insurance Solutions has helped Indian families protect what
            matters — with honest advice, transparent comparisons, and genuine support from first
            call to final claim.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
            <Link
              to="/contact"
              className="btn btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              Talk to Us <ArrowRight size={15} />
            </Link>
            <a href="#our-story" className="btn btn-outline">
              Our Story
            </a>
          </div>
        </div>
        <style>{`.bc-link:hover { color: var(--color-accent) !important; }`}</style>
      </section>

      {/* ── STATS ── */}
      <section
        style={{
          padding: "clamp(2rem,4vw,3rem) 0",
          background: "#F8FAFC",
          borderBottom: "1px solid #E2E8F0",
        }}
        aria-label="Key statistics"
      >
        <div
          style={{ ...W, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "32px" }}
          className="grid-4"
        >
          {[
            { num: "10+", label: "Years of experience" },
            { num: "1,000+", label: "Families protected" },
            { num: "₹50Cr+", label: "Total cover managed" },
            { num: "98%", label: "Claim success rate" },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem,3vw,2.4rem)",
                  fontWeight: 900,
                  color: "var(--color-accent)",
                  lineHeight: 1,
                  marginBottom: "6px",
                  letterSpacing: "-0.03em",
                }}
              >
                {num}
              </div>
              <div
                style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.4, fontWeight: 500 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY + MILESTONES ── */}
      <section
        id="our-story"
        aria-labelledby="story-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={W}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(4rem,8vw,6rem)",
              alignItems: "start",
            }}
            className="hero__grid"
          >
            {/* Left: Story + Credentials */}
            <div>
              <div className="section-label">Our Story</div>
              <h2 id="story-heading" style={{ margin: "0 0 24px", maxWidth: "24ch" }}>
                Why we started NKT Insurance
              </h2>
              <p
                className="justify-text-mobile"
                style={{
                  color: "#475569",
                  marginBottom: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                }}
              >
                I started NKT Insurance Solutions because I saw how many families were underinsured
                — not because they couldn't afford coverage, but because nobody explained it
                clearly.
              </p>
              <p
                className="justify-text-mobile"
                style={{
                  color: "#475569",
                  marginBottom: "20px",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                }}
              >
                Most insurance sellers push the product that earns the highest commission. We built
                our practice on the opposite: compare everything, explain honestly, and recommend
                what genuinely fits.
              </p>
              <p
                className="justify-text-mobile"
                style={{
                  color: "#475569",
                  marginBottom: "40px",
                  fontSize: "1.05rem",
                  lineHeight: 1.75,
                }}
              >
                Today, over 90% of our new clients come from referrals by existing clients. That
                keeps us accountable — and it's the only way we want to grow.
              </p>

              <h3
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "20px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  color: "#0F172A",
                }}
              >
                Credentials
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {[
                  {
                    icon: <Award size={16} />,
                    text: "LIC Authorised Agent",
                    sub: "Certified to sell all LIC products in India",
                  },
                  {
                    icon: <BadgeCheck size={16} />,
                    text: "IRDAI Licensed Advisor",
                    sub: "Registered with Insurance Regulatory Authority of India",
                  },
                  {
                    icon: <ShieldCheck size={16} />,
                    text: "Independent — not tied to any insurer",
                    sub: "We compare LIC + 8 private insurers",
                  },
                  {
                    icon: <Clock size={16} />,
                    text: "10+ years in practice",
                    sub: "Serving families since 2014",
                  },
                ].map(({ icon, text, sub }) => (
                  <div
                    key={text}
                    style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}
                  >
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "10px",
                        background: "var(--color-accent-bg)",
                        color: "var(--color-accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      {icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 700,
                          color: "#0F172A",
                          marginBottom: "2px",
                        }}
                      >
                        {text}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "#64748B" }}>{sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Milestones */}
            <div>
              <div className="section-label">Our Journey</div>
              <h2 style={{ margin: "0 0 32px", maxWidth: "22ch" }}>
                From one desk to ₹50Cr+ managed
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0",
                  position: "relative",
                  paddingLeft: "44px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "12px",
                    bottom: "12px",
                    width: "2px",
                    background: "#E2E8F0",
                  }}
                  aria-hidden="true"
                />
                {MILESTONES.map((m, i) => (
                  <div
                    key={m.year}
                    style={{
                      position: "relative",
                      paddingBottom: i < MILESTONES.length - 1 ? "28px" : "0",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        left: "-44px",
                        top: "2px",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "var(--color-accent)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        border: "3px solid #FFFFFF",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {m.year.slice(-2)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.7rem",
                        fontWeight: 800,
                        color: "var(--color-accent)",
                        marginBottom: "4px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {m.year}
                    </div>
                    <h3
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                        marginBottom: "6px",
                        color: "#0F172A",
                        fontFamily: "var(--font-display)",
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#475569",
                        lineHeight: 1.65,
                        margin: 0,
                      }}
                    >
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section
        aria-labelledby="values-heading"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#F8FAFC" }}
      >
        <div style={W}>
          <div style={{ marginBottom: "clamp(3rem,6vw,5rem)" }}>
            <div className="section-label">How We Work</div>
            <h2 id="values-heading" style={{ margin: "0 0 16px", maxWidth: "24ch" }}>
              Four principles that guide every recommendation
            </h2>
            <p
              style={{ fontSize: "1.05rem", color: "#475569", lineHeight: 1.75, maxWidth: "52ch" }}
            >
              These aren't just words — they shape every conversation we have with clients.
            </p>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}
            className="grid-2"
          >
            {VALUES.map(({ icon, title, body }) => (
              <div
                key={title}
                style={{
                  padding: "clamp(1.5rem,3vw,2rem)",
                  background: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  borderRadius: "16px",
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
                    marginBottom: "16px",
                  }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    marginBottom: "8px",
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    color: "#0F172A",
                  }}
                >
                  {title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#475569", lineHeight: 1.7, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section
        aria-label="Client testimonial"
        style={{ padding: "clamp(5rem,10vw,8rem) 0", background: "#FFFFFF" }}
      >
        <div style={{ ...W, maxWidth: "860px" }}>
          <div
            style={{
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "20px",
              padding: "clamp(2.5rem,5vw,4rem)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <div style={{ display: "flex", gap: "4px", marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} style={{ color: "var(--color-secondary)", fontSize: "1.1rem" }}>
                  ★
                </span>
              ))}
            </div>
            <blockquote
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.05rem,2vw,1.2rem)",
                lineHeight: 1.65,
                color: "#0F172A",
                fontStyle: "italic",
                margin: "0 0 24px",
              }}
            >
              "I've been with NKT for 7 years. They helped me choose my life insurance, added my
              wife to our health plan after marriage, and handled our first motor claim last year
              without me having to make a single call to the insurer. That's the kind of advisor
              every family needs."
            </blockquote>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--color-accent-bg)",
                  color: "var(--color-accent)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  flexShrink: 0,
                  fontFamily: "var(--font-display)",
                }}
              >
                S
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#0F172A" }}>
                  Suresh K.
                </div>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Life + Health + Motor Client · 7 Years · Hyderabad
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion
        items={FAQ}
        heading="Questions about working with us"
        subtext="How NKT Insurance works, how we're paid, and what to expect."
      />
      <CtaBanner
        heading="Ready to work with an advisor you can trust?"
        sub="Free consultation — no obligation, no pressure. Just honest advice."
      />
    </>
  );
}
