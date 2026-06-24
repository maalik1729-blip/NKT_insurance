import { render } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { InsuranceDashboard } from "../../components/dashboard/InsuranceDashboard";

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock Recharts to avoid DOM/ResizeObserver warnings in test
vi.mock("recharts", async () => {
  const original = await vi.importActual<any>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

describe("InsuranceDashboard rendering", () => {
  it("renders without crashing", () => {
    render(<InsuranceDashboard />);
    console.log("SUCCESSFULLY RENDERED DASHBOARD IN UNIT TEST");
  });
});
