import { render, fireEvent } from "@testing-library/react";
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

  it("renders plans tab without crashing", () => {
    // Import variables directly to print their values in the test
    import("../../components/dashboard/DashboardData").then((data) => {
      console.log("HEALTH_MARKET_SHARE_ALL:", typeof data.HEALTH_MARKET_SHARE_ALL, data.HEALTH_MARKET_SHARE_ALL ? Object.keys(data.HEALTH_MARKET_SHARE_ALL) : null);
      console.log("HEALTH_CSR_ALL:", typeof data.HEALTH_CSR_ALL, data.HEALTH_CSR_ALL ? Object.keys(data.HEALTH_CSR_ALL) : null);
      console.log("MOTOR_MARKET_SHARE_ALL:", typeof data.MOTOR_MARKET_SHARE_ALL, data.MOTOR_MARKET_SHARE_ALL ? Object.keys(data.MOTOR_MARKET_SHARE_ALL) : null);
      console.log("MOTOR_CSR_ALL:", typeof data.MOTOR_CSR_ALL, data.MOTOR_CSR_ALL ? Object.keys(data.MOTOR_CSR_ALL) : null);
      console.log("KPIS_BY_YEAR:", typeof data.KPIS_BY_YEAR, data.KPIS_BY_YEAR ? Object.keys(data.KPIS_BY_YEAR) : null);
    });

    const { getAllByText } = render(<InsuranceDashboard />);
    const marketTabButtons = getAllByText("Market");
    fireEvent.click(marketTabButtons[0]);
    console.log("SUCCESSFULLY SWITCHED TO PLANS TAB IN UNIT TEST");
  });
});
