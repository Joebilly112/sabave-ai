"use client";

import { useEffect } from "react";

export function AnalyticsBeacon() {
  useEffect(() => {
    const path = window.location.pathname;
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "page_view", path }),
    }).catch(() => undefined);
  }, []);
  return null;
}
