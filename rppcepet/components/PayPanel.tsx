"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { openSnap } from "@/components/snap";
import { PRODUCT } from "@/lib/config";

type TokenResponse = {
  token?: string | null;
  clientKey?: string;
  isProduction?: boolean;
  error?: string;
  status?: string;
  message?: string;
};

export function PayPanel({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  async function pay() {
    setBusy(true);
    setNote("");
    try {
      const response = await fetch("/api/midtrans/token", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = (await response.json()) as TokenResponse;
      if (!response.ok || !data.token || !data.clientKey) {
        setNote(data.error || "Token pembayaran belum ada.");
        setBusy(false);
        return;
      }
      await openSnap({
        token: data.token,
        clientKey: data.clientKey,
        isProduction: Boolean(data.isProduction),
        onDone: () => router.refresh(),
      });
    } catch {
      setNote("Jendela pembayaran belum terbuka.");
    }
    setBusy(false);
  }

  async function refreshStatus() {
    setBusy(true);
    setNote("");
    try {
      const response = await fetch("/api/midtrans/status", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ orderId }),
      });
      const data = (await response.json()) as TokenResponse;
      if (data.status === "paid") {
        router.refresh();
        return;
      }
      setNote(data.message || data.error || "Pembayaran belum masuk.");
    } catch {
      setNote("Status pembayaran belum terbaca.");
    }
    setBusy(false);
  }

  return (
    <div className="mt-6 flex flex-col gap-3">
      <div className="flex flex-wrap gap-3">
        <Button onClick={() => void pay()} disabled={busy}>
          {busy ? "Memeriksa…" : `Bayar ${PRODUCT.priceLabel}`}
        </Button>
        <Button tone="ghost" onClick={() => void refreshStatus()} disabled={busy}>
          Saya sudah bayar
        </Button>
      </div>
      {note ? <p className="text-sm text-clay">{note}</p> : null}
    </div>
  );
}
