import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { WhatsAppFab } from "../../components/WhatsAppFab";
import { WA_NUMBER } from "../../components/icons";

describe("WhatsAppFab", () => {
  it("renders the toggle button with correct aria-label", () => {
    render(<WhatsAppFab />);
    const btn = screen.getByRole("button", { name: /open whatsapp chat widget/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles the chat widget box on click", async () => {
    const user = userEvent.setup();
    render(<WhatsAppFab />);
    const btn = screen.getByRole("button", { name: /open whatsapp chat widget/i });

    // Default closed
    const widget = screen.getByRole("dialog", { name: /whatsapp chat widget/i });
    expect(widget).not.toHaveClass("wa-widget--open");

    // Click to open
    await user.click(btn);
    expect(widget).toHaveClass("wa-widget--open");
    expect(btn).toHaveAttribute("aria-expanded", "true");
    expect(btn).toHaveAttribute("aria-label", "Close WhatsApp chat widget");

    // Click to close
    await user.click(btn);
    expect(widget).not.toHaveClass("wa-widget--open");
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("updates message template when preset chips are clicked", async () => {
    const user = userEvent.setup();
    render(<WhatsAppFab />);

    // Open widget
    const toggleBtn = screen.getByRole("button", { name: /open whatsapp chat widget/i });
    await user.click(toggleBtn);

    const textarea = screen.getByLabelText(/whatsapp message text/i) as HTMLTextAreaElement;
    expect(textarea.value).toBe("Hi NKT, I'd like to get free insurance advice.");

    // Click preset chip
    const presetBtn = screen.getByRole("button", { name: /life cover query/i });
    await user.click(presetBtn);

    expect(textarea.value).toBe("Hi NKT, I'm interested in Life Insurance plans (LIC).");
  });

  it("opens wa.me URL with pre-filled message when send button is clicked", async () => {
    const user = userEvent.setup();
    // Spy on window.open
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null as any);

    render(<WhatsAppFab />);

    // Open widget
    const toggleBtn = screen.getByRole("button", { name: /open whatsapp chat widget/i });
    await user.click(toggleBtn);

    // Update message text
    const textarea = screen.getByLabelText(/whatsapp message text/i);
    await user.clear(textarea);
    await user.type(textarea, "Hello NKT! Test query");

    // Click send
    const sendBtn = screen.getByRole("button", { name: /send whatsapp message/i });
    await user.click(sendBtn);

    expect(openSpy).toHaveBeenCalledWith(
      `https://wa.me/${WA_NUMBER}?text=Hello%20NKT!%20Test%20query`,
      "_blank",
      "noopener,noreferrer",
    );

    openSpy.mockRestore();
  });
});
