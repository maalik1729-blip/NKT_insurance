import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/admin/login")({
  component: RedirectToAdminPortal,
});

function RedirectToAdminPortal() {
  const adminUrl = import.meta.env.VITE_ADMIN_PORTAL_URL || "http://localhost:8081";
  
  useEffect(() => {
    window.location.href = adminUrl;
  }, [adminUrl]);

  return (
    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2>Redirecting to NKT Insurance Advisor Platform...</h2>
      <p>If you are not redirected automatically, <a href={adminUrl}>click here</a>.</p>
    </div>
  );
}
