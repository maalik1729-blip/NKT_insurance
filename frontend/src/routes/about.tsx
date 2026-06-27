import { createFileRoute } from "@tanstack/react-router";
import { AboutLayout } from "../components/AboutLayout";

const TITLE = "About NKT Insurance Solutions — IRDAI Licensed Advisor";
const DESC =
  "Meet the team behind NKT Insurance Solutions. 10+ years of independent insurance advice for Indian families across Life, Health and Motor. IRDAI licensed, LIC authorised.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPageShell,
});

function AboutPageShell() {
  return <AboutLayout />;
}
