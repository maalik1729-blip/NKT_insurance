import { createFileRoute } from "@tanstack/react-router";
import { HomeLayout } from "../components/HomeLayout";

export const Route = createFileRoute("/")({
  component: HomePageShell,
});

function HomePageShell() {
  return <HomeLayout />;
}
