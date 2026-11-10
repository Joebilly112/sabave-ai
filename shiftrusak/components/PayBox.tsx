"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

export function PayBox({ id, paid }: { id: string; paid: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (paid) return;
    let cancelled = false;
    void (async () => {
      const response = await fetch("/api/midtrans/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const payload = (await response.json()) as { status?: string };
      if (!cancelled && payload.status === "paid") {
        void fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: "unlock_paid", path: `/hasil/${id}` }),
        });
        router.refresh();
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, paid, router]);

  async function pay() {
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
      setError("Koneksi ke pembayaran terputus.");
      setPending(false);
    }
  }

  if (paid) return null;

  return (
    <div className="rounded-3xl bg-ward p-5 text-mist">
      <p className="text-sm text-mist/70">Buka sekali</p>
      <p className="mt-1 text-3xl font-semibold text-lamp">{formatRupiah(UNLOCK_PRICE_IDR)}</p>
      <p className="mt-2 text-sm leading-6 text-mist/80">
        Skor ritme, daftar malam yang dilindungi, dan naskah ke kepala ruangan. Tidak ada langganan.
      </p>
      <Button className="mt-4" type="button" onClick={pay} disabled={pending}>
        {pending ? "Membuka pembayaran..." : "Bayar dengan QRIS"}
      </Button>
      {error ? <p className="mt-3 text-sm text-pulse">{error}</p> : null}
    </div>
  );
}
