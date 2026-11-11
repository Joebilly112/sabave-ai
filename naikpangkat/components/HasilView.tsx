"use client";

import { useEffect, useState } from "react";
import type { PublicHasil } from "@/lib/hasil";
import { SITE } from "@/lib/site";
import { BerkasReport } from "./BerkasReport";
import { Button } from "./ui";

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options: { onSuccess?: () => void; onPending?: () => void; onError?: () => void; onClose?: () => void }) => void;
    };
  }
}

export function HasilView({ id, initial }: { id: string; initial: PublicHasil }) {
  const [data, setData] = useState(initial);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const waiting = data.configured && data.found && data.status !== "paid";

  useEffect(() => {
    if (!waiting) return;
    let stopped = false;
    const timer = window.setInterval(async () => {
      const response = await fetch(`/api/hasil/${id}`);
      const next = (await response.json()) as PublicHasil;
      if (!stopped) setData(next);
    }, 4000);
    return () => {
      stopped = true;
      window.clearInterval(timer);
    };
  }, [id, waiting]);

  async function payAgain() {
    setError("");
    setPending(true);
    try {
      if (!data.configured || !data.found) return;
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.input),
      });
      const payload = (await response.json()) as {
        error?: string;
        snapToken?: string;
        snapScript?: string;
        clientKey?: string;
        id?: string;
      };
      if (!response.ok || !payload.snapToken || !payload.snapScript || !payload.clientKey || !payload.id) {
        throw new Error(payload.error || "Pembayaran belum bisa dibuat.");
      }
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = payload.snapScript || "";
        script.dataset.clientKey = payload.clientKey || "";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Skrip pembayaran gagal dimuat."));
        document.body.appendChild(script);
      });
      window.snap?.pay(payload.snapToken, {
        onSuccess: () => {
          window.location.href = `/hasil/${payload.id}`;
        },
        onPending: () => {
          window.location.href = `/hasil/${payload.id}`;
        },
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Terjadi kendala.");
    } finally {
      setPending(false);
    }
  }

  if (!data.configured) {
    return (
      <p className="rounded-3xl bg-white p-6 text-sm leading-6 text-ink/70">
        Penyimpanan hasil belum dikonfigurasi di server. Pembayaran dan halaman ini menyala setelah Firestore
        database {SITE.firestoreDatabase} dan kunci layanan terpasang.
      </p>
    );
  }

  if (!data.found) {
    return <p className="rounded-3xl bg-white p-6 text-sm text-ink/70">Daftar ini tidak ditemukan.</p>;
  }

  if (data.status === "paid" && data.unlock) {
    return (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-pine">Terbuka · {data.profileLabel}</p>
        <BerkasReport unlock={data.unlock} />
        <p className="text-xs leading-5 text-ink/50">
          Simpan halaman ini. Isinya disusun dari data yang Anda kirim, bukan dari berkas resmi instansi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-white p-5">
        <p className="text-sm font-semibold text-stamp">
          {data.status === "failed" ? "Pembayaran belum berhasil." : "Menunggu pembayaran."}
        </p>
        <p className="mt-2 text-sm leading-6 text-ink/70">
          {data.profileLabel}. {data.visibleTitles.join(", ")} dan {Math.max(data.itemCount - 3, 0)} berkas lain
          terbuka setelah {SITE.priceLabel} terbayar.
        </p>
        <Button type="button" className="mt-4" onClick={payAgain} disabled={pending}>
          {pending ? "Menyiapkan…" : `Bayar ${SITE.priceLabel}`}
        </Button>
        {error ? <p className="mt-3 text-sm text-stamp">{error}</p> : null}
      </div>
    </div>
  );
}
