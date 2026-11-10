"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Copy, Lock } from "lucide-react";
import { Button, Panel, Stamp } from "@/components/ui";
import { flagLabels, foundLabels, paymentLabels, revisionLabels } from "@/lib/labels";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { KasusInput, KasusResult } from "@/lib/types";

export function ResultView({
  id,
  status,
  input,
  unlock,
}: {
  id: string;
  status: "pending" | "paid";
  input: KasusInput;
  unlock: KasusResult | null;
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (status === "paid") return;
    let ignore = false;
    void fetch("/api/midtrans/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((payload: { status?: string }) => {
        if (!ignore && payload.status === "paid") router.refresh();
      })
      .catch(() => undefined);
    return () => {
      ignore = true;
    };
  }, [id, router, status]);

  async function pay() {
    setPending(true);
    setError("");
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
      setError("Jaringan bermasalah. Coba sekali lagi.");
      setPending(false);
    }
  }

  async function copyMessage() {
    if (!unlock) return;
    await navigator.clipboard.writeText(unlock.message);
    setCopied(true);
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <Panel className="p-6">
        <Stamp>Brief yang kamu masukkan</Stamp>
        <dl className="mt-5 space-y-3 text-sm">
          <Row label="Sumber" value={foundLabels[input.foundVia]} />
          <Row label="DP" value={`${input.dpPercent}%`} />
          <Row label="Kontrak" value={input.hasContract ? "Sudah ada" : "Belum ada"} />
          <Row label="Revisi" value={revisionLabels[input.revision]} />
          <Row label="Bayar" value={paymentLabels[input.payment]} />
          <Row
            label="Tanda"
            value={input.flags.length ? input.flags.map((flag) => flagLabels[flag]).join(", ") : "Tidak ada yang dicentang"}
          />
        </dl>
      </Panel>

      {status === "paid" && unlock ? (
        <div className="space-y-6">
          <Panel className="overflow-hidden">
            <div className="bg-night px-6 py-7 text-fog">
              <p className="text-[11px] uppercase tracking-[0.16em] text-fog/50">Skor hantu</p>
              <p className="mt-2 text-7xl font-semibold tracking-tight">{unlock.score}</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-fog/80">{unlock.headline}</p>
            </div>
            <ul className="space-y-3 px-6 py-5 text-sm leading-6 text-ink">
              {unlock.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6">
            <h2 className="text-lg font-semibold text-night">Checklist kontrak minimum</h2>
            <ul className="mt-4 space-y-4">
              {unlock.checklist.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check className="mt-0.5 shrink-0 text-tide" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-night">
                      {item.title}{" "}
                      <span className="font-medium uppercase tracking-wide text-mute">· {item.state}</span>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-mute">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel className="p-6">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-lg font-semibold text-night">Pesan minta DP sebelum kickoff</h2>
              <Button type="button" variant="ghost" onClick={() => void copyMessage()}>
                <Copy size={16} />
                {copied ? "Tersalin" : "Salin"}
              </Button>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-ink">{unlock.message}</p>
            <p className="mt-4 text-xs leading-5 text-mute">
              Ini kehati-hatian kerja, bukan nasihat hukum. Sesuaikan nama proyek sebelum kamu kirim.
            </p>
          </Panel>
        </div>
      ) : (
        <Panel className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-flare">
            <Lock size={18} />
            <p className="text-sm font-semibold">Hasil sudah dihitung</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-night">Buka skor, checklist, dan pesan DP.</h2>
          <ul className="mt-5 space-y-2 text-sm leading-6 text-mute">
            <li>Skor risiko klien menghilang sebelum bayar.</li>
            <li>Checklist kontrak minimum yang masih bolong.</li>
            <li>Pesan sopan untuk minta DP sebelum kickoff.</li>
          </ul>
          <p className="mt-6 text-2xl font-semibold text-night">{formatRupiah(UNLOCK_PRICE_IDR)}</p>
          <p className="text-sm text-mute">Sekali bayar. QRIS, GoPay, atau ShopeePay.</p>
          {error ? <p className="mt-4 text-sm text-flare">{error}</p> : null}
          <Button type="button" className="mt-5" disabled={pending} onClick={() => void pay()}>
            {pending ? "Membuka pembayaran…" : `Bayar ${formatRupiah(UNLOCK_PRICE_IDR)}`}
          </Button>
        </Panel>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line pb-3 sm:flex-row sm:justify-between">
      <dt className="text-mute">{label}</dt>
      <dd className="font-medium text-night sm:max-w-[16rem] sm:text-right">{value}</dd>
    </div>
  );
}
