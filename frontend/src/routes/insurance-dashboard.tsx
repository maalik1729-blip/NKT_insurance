import { createFileRoute } from "@tanstack/react-router";
import { InsuranceDashboard } from "@/components/dashboard/InsuranceDashboard";

export const Route = createFileRoute("/insurance-dashboard")({
  component: InsuranceDashboard,
});
