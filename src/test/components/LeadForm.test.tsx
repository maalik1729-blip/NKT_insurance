import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { LeadForm } from "../../components/LeadForm";

// ─── Mocks ────────────────────────────────────────────────────────────────────

// Prevent real navigation during tests
const assignMock = vi.fn();
Object.defineProperty(window, "location", {
  value: { href: "", assign: assignMock },
  writable: true,
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("LeadForm", () => {
  beforeEach(() => {
    localStorageMock.clear();
    window.location.href = "";
  });

  it("renders with the default heading", () => {
    render(<LeadForm />);
    expect(screen.getByRole("heading", { name: /request a callback/i })).toBeInTheDocument();
  });

  it("renders with a custom heading", () => {
    render(<LeadForm heading="Get a Free Quote" />);
    expect(screen.getByRole("heading", { name: /get a free quote/i })).toBeInTheDocument();
  });

  it("shows a name validation error when name is empty on submit", async () => {
    render(<LeadForm />);
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    });
  });

  it("shows a phone validation error when phone is too short", async () => {
    render(<LeadForm />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Ramesh Kumar");
    await userEvent.type(screen.getByLabelText(/whatsapp/i), "12345");
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid 10-digit number/i)).toBeInTheDocument();
    });
  });

  it("does not show errors when both name and a 10-digit phone are provided", async () => {
    render(<LeadForm />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Ramesh Kumar");
    await userEvent.type(screen.getByLabelText(/whatsapp/i), "9876543210");
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));
    await waitFor(() => {
      expect(screen.queryByText(/please enter your name/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/please enter a valid 10-digit number/i)).not.toBeInTheDocument();
    });
  });

  it("saves a new lead to localStorage on valid submit", async () => {
    render(<LeadForm />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Priya Sharma");
    await userEvent.type(screen.getByLabelText(/whatsapp/i), "9988776655");
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));

    await waitFor(() => {
      const saved = JSON.parse(localStorageMock.getItem("nkt_leads") ?? "[]");
      expect(saved).toHaveLength(1);
      expect(saved[0].name).toBe("Priya Sharma");
      expect(saved[0].phone).toBe("9988776655");
      expect(saved[0].status).toBe("new");
    });
  });

  it("shows a thank you screen on valid submit", async () => {
    render(<LeadForm />);
    await userEvent.type(screen.getByLabelText(/your name/i), "Arjun");
    await userEvent.type(screen.getByLabelText(/whatsapp/i), "9000000001");
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /thank you, Arjun!/i })).toBeInTheDocument();
      expect(screen.getByText(/we've received your request/i)).toBeInTheDocument();
    });
  });

  it("accumulates multiple leads in localStorage", async () => {
    localStorageMock.setItem("nkt_leads", JSON.stringify([{ id: "existing_1", name: "Old Lead" }]));

    render(<LeadForm />);
    await userEvent.type(screen.getByLabelText(/your name/i), "New Lead");
    await userEvent.type(screen.getByLabelText(/whatsapp/i), "9123456789");
    fireEvent.submit(screen.getByRole("form", { name: /consultation request form/i }));

    await waitFor(() => {
      const saved = JSON.parse(localStorageMock.getItem("nkt_leads") ?? "[]");
      expect(saved).toHaveLength(2);
      // New lead is prepended
      expect(saved[0].name).toBe("New Lead");
      expect(saved[1].name).toBe("Old Lead");
    });
  });
});
