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

vi.mock("recharts", async () => {
  const original = await vi.importActual<any>("recharts");
  return {
    ...original,
    ResponsiveContainer: ({ children }: any) => <div>{children}</div>,
  };
});

describe("Debug Dashboard DOM", () => {
  it("prints DOM for market tab", () => {
    const { getAllByText, container } = render(<InsuranceDashboard />);
    const marketTabButtons = getAllByText("Market");
    // Click the tab button to switch to Market tab
    fireEvent.click(marketTabButtons[0]);
    console.log("AFTER SWITCHING TO MARKET TAB INNER HTML:", container.querySelector('.db-tab-content')?.innerHTML);
  });
});
