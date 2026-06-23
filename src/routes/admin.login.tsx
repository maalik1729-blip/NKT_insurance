import { createFileRoute, redirect } from "@tanstack/react-router";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

const TITLE = "Advisor Workspace & Lead Panel | NKT Insurance Solutions";
const DESC =
  "Secure advisor workspace to manage, audit, and follow up on client insurance callback requests.";

type AdminSearch = {
  portal?: string;
};

export const Route = createFileRoute("/admin/login")({
  validateSearch: (search: Record<string, unknown>): AdminSearch => {
    return {
      portal: search.portal as string | undefined,
    };
  },
  beforeLoad: ({ search }) => {
    if (search.portal) {
      throw redirect({
        to: "/admin/login",
        replace: true,
      });
    }
  },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminDashboard,
});
