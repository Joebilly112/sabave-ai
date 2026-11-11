"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "page_view", path: pathname }),
      signal: controller.signal,
    }).catch(() => undefined);
    return () => controller.abort();
  }, [pathname]);

  return null;
}
