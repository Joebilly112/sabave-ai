"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    const payload = JSON.stringify({ name: "page_view", path: pathname });
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
  }, [pathname]);

  return null;
}
