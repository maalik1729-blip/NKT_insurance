// Trigger Vercel Production Deploy
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  component: RedirectToAdminPortal,
});

function RedirectToAdminPortal() {
  useEffect(() => {
    window.location.href = "/admin/login";
  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>Redirecting to NKT Insurance Advisor Platform...</h2>
      <p>If you are not redirected automatically, <a href="/admin/login">click here</a>.</p>
    </div>
  );
}
