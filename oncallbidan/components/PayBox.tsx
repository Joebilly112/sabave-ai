"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export function PayBox({ id }: { id: string }) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function pay() {
    setError("");
    setPending(true);
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
      setError("Jaringan terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <div className="rounded-[28px] border border-dashed border-lamp bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Terkunci</p>
      <h2 className="mt-2 text-2xl font-semibold text-night">Buka pita, malam yang dilindungi, dan naskah batas</h2>
      <p className="mt-3 text-sm leading-6 text-mist">
        Sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)} lewat QRIS atau dompet digital. Tidak ada langganan. Ini jeda jaga,
        bukan nasihat medis dan bukan surat istirahat.
      </p>
      <Button className="mt-5" type="button" onClick={pay} disabled={pending}>
        {pending ? "Membuka pembayaran…" : `Bayar ${formatRupiah(UNLOCK_PRICE_IDR)}`}
      </Button>
      {error ? <p className="mt-3 text-sm text-rose">{error}</p> : null}
    </div>
  );
}
