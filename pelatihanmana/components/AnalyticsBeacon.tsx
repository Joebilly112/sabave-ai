"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsBeacon() {
  const path = usePathname() || "/";
  useEffect(() => {
    const payload = JSON.stringify({ name: "page_view", path });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", new Blob([payload], { type: "application/json" }));
      return;
    }
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    });
  }, [path]);

  return null;
}
