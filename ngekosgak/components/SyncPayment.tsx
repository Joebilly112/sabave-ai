"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function SyncPayment({ id }: { id: string }) {
  const router = useRouter();

  useEffect(() => {
    let gone = false;
    void (async () => {
      try {
        const response = await fetch("/api/midtrans/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const payload = (await response.json()) as { status?: string };
        if (!gone && payload.status === "paid") {
          void fetch("/api/analytics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
          });
          router.refresh();
        }
      } catch {
        /* Pembayaran bisa dicek ulang dengan memuat halaman lagi. */
      }
    })();
    return () => {
      gone = true;
    };
  }, [id, router]);

  return null;
}
