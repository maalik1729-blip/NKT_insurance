import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { CtaBanner } from "../../components/CtaBanner";
import { WA_NUMBER, TEL, TEL_DISPLAY } from "../../components/icons";

describe("CtaBanner", () => {
  const HEADING = "Ready to protect your family?";
  const SUB = "Get a free consultation from NKT Insurance.";

  it("renders the heading and subtext", () => {
    render(<CtaBanner heading={HEADING} sub={SUB} />);
    expect(screen.getByRole("heading", { name: HEADING })).toBeInTheDocument();
    expect(screen.getByText(SUB)).toBeInTheDocument();
  });

  it("renders a 'Get Free Consultation' link pointing to /contact", () => {
    render(<CtaBanner heading={HEADING} sub={SUB} />);
    const link = screen.getByRole("link", { name: /get free consultation/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders a WhatsApp link with the correct wa.me URL", () => {
    render(<CtaBanner heading={HEADING} sub={SUB} />);
    const waLink = screen.getByRole("link", { name: /whatsapp nkt insurance/i });
    expect(waLink).toHaveAttribute("href", expect.stringContaining(`wa.me/${WA_NUMBER}`));
  });
});
