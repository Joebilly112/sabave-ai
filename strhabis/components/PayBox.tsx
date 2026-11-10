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
    <div className="rounded-[28px] border border-dashed border-stamp/40 bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stamp">Terkunci</p>
      <h2 className="mt-2 text-2xl font-semibold text-seal">Buka hitungan, daftar dokumen, dan rencana minggu</h2>
      <p className="mt-3 text-sm leading-6 text-mute">
        Sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)} lewat QRIS atau dompet digital. Tidak ada langganan. Isi halaman ini
        tetap informasi persiapan, bukan surat dari Konsil.
      </p>
      <Button className="mt-5" type="button" onClick={pay} disabled={pending}>
        {pending ? "Membuka pembayaran…" : `Bayar ${formatRupiah(UNLOCK_PRICE_IDR)}`}
      </Button>
      {error ? <p className="mt-3 text-sm text-stamp">{error}</p> : null}
    </div>
  );
}
