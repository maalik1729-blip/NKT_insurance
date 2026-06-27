import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { FaqAccordion } from "../../components/FaqAccordion";

const ITEMS = [
  {
    q: "What is term insurance?",
    a: "Term insurance provides a death benefit for a fixed period.",
  },
  {
    q: "Is health insurance mandatory?",
    a: "It is not legally mandatory but strongly recommended.",
  },
  {
    q: "How do I file a claim?",
    a: "Contact your insurer or NKT within 24 hours of the incident.",
  },
];

describe("FaqAccordion", () => {
  it("renders the default heading", () => {
    render(<FaqAccordion items={ITEMS} />);
    expect(
      screen.getByRole("heading", { name: /frequently asked questions/i }),
    ).toBeInTheDocument();
  });

  it("renders a custom heading and subtext", () => {
    render(<FaqAccordion items={ITEMS} heading="Motor FAQ" subtext="All about motor insurance" />);
    expect(screen.getByRole("heading", { name: /motor faq/i })).toBeInTheDocument();
    expect(screen.getByText(/all about motor insurance/i)).toBeInTheDocument();
  });

  it("renders all question buttons", () => {
    render(<FaqAccordion items={ITEMS} />);
    ITEMS.forEach(({ q }) => {
      expect(screen.getByRole("button", { name: new RegExp(q, "i") })).toBeInTheDocument();
    });
  });

  it("hides all answers by default", () => {
    render(<FaqAccordion items={ITEMS} />);
    ITEMS.forEach(({ a }) => {
      const el = screen.getByText(a);
      expect(el.parentElement?.parentElement?.style.gridTemplateRows).toBe("0fr");
    });
  });

  it("shows the answer when a question is clicked", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: /what is term insurance/i }));
    const el = screen.getByText(/term insurance provides a death benefit/i);
    expect(el.parentElement?.parentElement?.style.gridTemplateRows).toBe("1fr");
  });

  it("sets aria-expanded=true on an open item and false on others", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={ITEMS} />);
    const firstBtn = screen.getByRole("button", { name: /what is term insurance/i });
    await user.click(firstBtn);
    expect(firstBtn).toHaveAttribute("aria-expanded", "true");
    // Other buttons should be collapsed
    expect(screen.getByRole("button", { name: /is health insurance mandatory/i })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("closes an open item when clicked again", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={ITEMS} />);
    const btn = screen.getByRole("button", { name: /what is term insurance/i });
    await user.click(btn); // open
    const el = screen.getByText(/term insurance provides a death benefit/i);
    expect(el.parentElement?.parentElement?.style.gridTemplateRows).toBe("1fr");
    await user.click(btn); // close
    expect(el.parentElement?.parentElement?.style.gridTemplateRows).toBe("0fr");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("switches between items — opening one closes the previous", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={ITEMS} />);
    await user.click(screen.getByRole("button", { name: /what is term insurance/i }));
    const firstEl = screen.getByText(/term insurance provides a death benefit/i);
    expect(firstEl.parentElement?.parentElement?.style.gridTemplateRows).toBe("1fr");

    await user.click(screen.getByRole("button", { name: /is health insurance mandatory/i }));
    expect(firstEl.parentElement?.parentElement?.style.gridTemplateRows).toBe("0fr");
    const secondEl = screen.getByText(/not legally mandatory/i);
    expect(secondEl.parentElement?.parentElement?.style.gridTemplateRows).toBe("1fr");
  });
});
