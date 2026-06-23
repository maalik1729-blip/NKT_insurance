import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({
  items,
  heading = "Frequently Asked Questions",
  subtext,
}: {
  items: FaqItem[];
  heading?: string;
  subtext?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      className="faq-section"
      aria-labelledby="faq-heading"
      style={{ paddingBlock: "clamp(5rem, 10vw, 8rem)", background: "var(--color-bg)" }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "42ch", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <h2 id="faq-heading" style={{ marginBottom: "1rem" }}>
            {heading}
          </h2>
          {subtext && (
            <p style={{ fontSize: "1.0625rem", color: "var(--color-ink-2)", lineHeight: 1.75 }}>
              {subtext}
            </p>
          )}
        </div>
        <div role="list" style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          {items.map((item, i) => (
            <div
              key={i}
              role="listitem"
              style={{
                borderBottom: "1px solid var(--color-border)",
                ...(i === 0 ? { borderTop: "1px solid var(--color-border)" } : {}),
              }}
            >
              <button
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "1.5rem",
                  paddingBlock: "1.5rem",
                  textAlign: "left",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.0625rem",
                  fontWeight: 600,
                  color: open === i ? "var(--color-accent)" : "var(--color-ink)",
                  transition: "color 200ms",
                }}
                aria-expanded={open === i}
                aria-controls={`faq-answer-${i}`}
                id={`faq-btn-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <ChevronDown
                  size={18}
                  style={{
                    flexShrink: 0,
                    color: open === i ? "var(--color-accent)" : "var(--color-ink-3)",
                    transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 250ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms",
                  }}
                  aria-hidden="true"
                />
              </button>
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: open === i ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                  overflow: "hidden",
                }}
              >
                <div style={{ minHeight: "0px", overflow: "hidden" }}>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--color-ink-2)",
                      lineHeight: 1.75,
                      paddingBottom: "1.5rem",
                    }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
