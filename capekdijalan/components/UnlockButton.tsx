"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export function UnlockButton({ id }: { id: string }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function unlock() {
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { redirectUrl?: string; alreadyPaid?: boolean; error?: string };
      if (payload.alreadyPaid) {
        router.refresh();
        return;
      }
      if (!response.ok || !payload.redirectUrl) {
        setError(payload.error || "Pembayaran belum bisa dibuka.");
        setPending(false);
        return;
      }
      window.location.href = payload.redirectUrl;
    } catch {
      setError("Koneksi terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <div>
      <Button type="button" onClick={unlock} disabled={pending}>
        {pending ? "Membuka pembayaran…" : `Buka hasil · ${formatRupiah(UNLOCK_PRICE_IDR)}`}
      </Button>
      {error ? <p className="mt-3 text-sm text-coral">{error}</p> : null}
    </div>
  );
}
