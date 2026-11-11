"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PRODUCT } from "@/lib/config";
import { openSnap } from "@/components/snap";
import { Button } from "@/components/ui";

type StatusResponse = { status?: string; message?: string; error?: string };
type TokenResponse = { token?: string | null; clientKey?: string; isProduction?: boolean; error?: string };

export function PayPanel({ orderId, status }: { orderId: string; status: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function refresh() {
    const response = await fetch("/api/midtrans/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId }),
    });
    const payload = (await response.json()) as StatusResponse;
    if (payload.status === "paid") {
      router.refresh();
      return;
    }
    setMessage(payload.message ?? payload.error ?? "Pembayaran belum masuk.");
  }

  async function pay() {
    setPending(true);
    setMessage("");
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const payload = (await response.json()) as TokenResponse;
      if (!response.ok || !payload.token || !payload.clientKey) {
        setMessage(payload.error ?? "Token pembayaran belum tersedia.");
        return;
      }
      await openSnap({
        token: payload.token,
        clientKey: payload.clientKey,
        isProduction: Boolean(payload.isProduction),
        onDone: () => {
          void refresh();
        },
      });
    } catch {
      setMessage("Jendela pembayaran tidak terbuka. Coba lagi.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-5">
      <p className="text-sm font-semibold text-ink">Lembar ini masih terkunci</p>
      <p className="mt-2 text-sm leading-relaxed text-mist">
        Status pembayaran: {status}. Buka skor, daftar berkas yang bolong, dan rencana 30 hari dengan {PRODUCT.priceLabel}.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button type="button" onClick={() => void pay()} disabled={pending}>
          {pending ? "Membuka pembayaran…" : `Bayar ${PRODUCT.priceLabel}`}
        </Button>
        <Button type="button" tone="ghost" onClick={() => void refresh()}>
          Saya sudah bayar
        </Button>
      </div>
      {message ? <p className="mt-3 text-sm text-stamp">{message}</p> : null}
    </div>
  );
}
