import { WA_NUMBER } from "./icons";

export function CtaBanner({ heading, sub }: { heading: string; sub: string }) {
  return (
    <section
      aria-labelledby="cta-banner-heading"
      style={{
        paddingBlock: "clamp(5rem, 10vw, 8rem)",
        background: "var(--color-accent)",
        position: "relative",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "clamp(2rem, 4vw, 3rem)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 400px" }}>
            <h2
              id="cta-banner-heading"
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                color: "var(--color-white)",
                marginBottom: "1rem",
                fontFamily: "var(--font-display)",
              }}
            >
              {heading}
            </h2>
            <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.7 }}>
              {sub}
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <a
              href="/contact"
              className="btn"
              id="cta-banner-consult"
              style={{
                background: "var(--color-white)",
                color: "var(--color-accent)",
                borderColor: "var(--color-white)",
                height: "52px",
                paddingInline: "28px",
                fontSize: "1rem",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              Get Free Consultation <i className="fa-solid fa-arrow-right" style={{ fontSize: "16px" }}></i>
            </a>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=Hi%20NKT%2C%20I%20need%20insurance%20advice.`}
              className="btn"
              id="cta-banner-wa"
              aria-label="WhatsApp NKT Insurance"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "var(--color-white)",
                borderColor: "rgba(255,255,255,0.3)",
                height: "52px",
                paddingInline: "24px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <i className="fa-brands fa-whatsapp" style={{ fontSize: "16px" }}></i> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
