"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SyncPayment({ id, status }: { id: string; status: "pending" | "paid" }) {
  const router = useRouter();
  useEffect(() => {
    if (status === "paid") return;
    let stopped = false;
    let tries = 0;
    const tick = async () => {
      if (stopped || tries >= 6) return;
      tries += 1;
      const response = await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { status?: string };
      if (payload.status === "paid") {
        void fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
        });
        router.refresh();
      }
    };
    void tick();
    const timer = setInterval(() => void tick(), 4000);
    return () => {
      stopped = true;
      clearInterval(timer);
    };
  }, [id, router, status]);
  return null;
}
