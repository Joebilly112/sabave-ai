"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export function UnlockButton({ id }: { id: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function pay() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { redirectUrl?: string; error?: string; alreadyPaid?: boolean };
      if (payload.alreadyPaid) {
        window.location.reload();
        return;
      }
      if (!response.ok || !payload.redirectUrl) {
        setError(payload.error || "Pembayaran belum bisa dibuka.");
        setPending(false);
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <div className="mt-5">
      <Button type="button" onClick={pay} disabled={pending}>
        {pending ? "Membuka pembayaran…" : `Buka laporan lengkap · ${formatRupiah(UNLOCK_PRICE_IDR)}`}
      </Button>
      {error ? <p className="mt-3 text-sm font-semibold text-clay">{error}</p> : null}
    </div>
  );
}
