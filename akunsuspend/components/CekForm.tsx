"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Field, Panel, TextArea } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { PlatformId, SuspendType } from "@/lib/types";

const PLATFORMS: { id: PlatformId; label: string }[] = [
  { id: "gojek", label: "Gojek" },
  { id: "grab", label: "Grab" },
  { id: "lain", label: "Platform lain" },
];

const TYPES: { id: SuspendType; label: string; hint: string }[] = [
  { id: "sementara", label: "Sementara", hint: "Ada jangka waktu atau tombol banding" },
  { id: "permanen", label: "Permanen", hint: "Layar menulis permanen, tidak otomatis nyala" },
  { id: "putus", label: "Putus mitra", hint: "Status putus, bukan sekadar jeda" },
];

export function CekForm() {
  const router = useRouter();
  const [platform, setPlatform] = useState<PlatformId>("gojek");
  const [suspendType, setSuspendType] = useState<SuspendType>("sementara");
  const [reason, setReason] = useState("");
  const [daysLeft, setDaysLeft] = useState("2");
  const [daysUnknown, setDaysUnknown] = useState(false);
  const [warnings, setWarnings] = useState("0");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          suspendType,
          reason,
          daysUnknown,
          daysLeft: daysUnknown ? null : Number(daysLeft),
          warnings: Number(warnings),
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa disusun.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/api/cek" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-6 sm:p-8">
      <form id="cek" onSubmit={onSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-night">Ceritakan layar suspend-mu</h2>
          <p className="mt-2 text-sm leading-6 text-mist">
            Sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)}. Yang terbuka: pita keparahan, daftar bukti, timeline 24–48
            jam, hal yang jangan dilakukan, dan naskah banding singkat. Keputusan akhir tetap di platform.
          </p>
        </div>

        <Field label="Platform">
          <div className="grid grid-cols-3 gap-2">
            {PLATFORMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPlatform(item.id)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold ${
                  platform === item.id ? "border-night bg-night text-hazard" : "border-line bg-foam text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Jenis yang tertulis di layar">
          <div className="space-y-2">
            {TYPES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSuspendType(item.id)}
                className={`flex w-full items-start justify-between rounded-2xl border px-4 py-3 text-left ${
                  suspendType === item.id ? "border-hazard bg-amber-50" : "border-line bg-foam"
                }`}
              >
                <span>
                  <span className="block text-sm font-semibold">{item.label}</span>
                  <span className="mt-1 block text-xs text-mist">{item.hint}</span>
                </span>
              </button>
            ))}
          </div>
        </Field>

        <Field label="Alasan di layar" hint="Salin singkat. Kosongkan kalau memang tidak tertulis. Maksimal 400 karakter.">
          <TextArea
            rows={4}
            maxLength={400}
            value={reason}
            onChange={(event) => setReason(event.target.value)}
            placeholder="Contoh: pelanggaran operasional, atau gangguan sistem"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Sisa hari banding" hint="Angka yang terlihat di aplikasi, 0 sampai 30.">
            <input
              type="number"
              min={0}
              max={30}
              disabled={daysUnknown}
              value={daysLeft}
              onChange={(event) => setDaysLeft(event.target.value)}
              className="w-full rounded-2xl border border-line bg-foam px-4 py-3 text-sm disabled:opacity-50"
            />
            <label className="mt-2 flex items-center gap-2 text-xs text-mist">
              <input
                type="checkbox"
                checked={daysUnknown}
                onChange={(event) => setDaysUnknown(event.target.checked)}
              />
              Tidak tertulis
            </label>
          </Field>
          <Field label="Peringatan sebelumnya" hint="Yang kamu ingat, 0 sampai 12.">
            <input
              type="number"
              min={0}
              max={12}
              required
              value={warnings}
              onChange={(event) => setWarnings(event.target.value)}
              className="w-full rounded-2xl border border-line bg-foam px-4 py-3 text-sm"
            />
          </Field>
        </div>

        {error ? <p className="text-sm text-flare">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Menyusun…" : `Kunci berkas · ${formatRupiah(UNLOCK_PRICE_IDR)}`}
        </Button>
      </form>
    </Panel>
  );
}
