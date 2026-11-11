"use client";

import { useEffect } from "react";

export function TrackView({ path }: { path: string }) {
  useEffect(() => {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event: "page_view", path }),
    });
  }, [path]);
  return null;
}
