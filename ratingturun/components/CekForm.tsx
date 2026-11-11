"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";
import type { CancelId, ComplaintId, PlatformId } from "@/lib/types";

const COMPLAINTS: { id: ComplaintId; label: string }[] = [
  { id: "kasar", label: "Nada dianggap kasar" },
  { id: "rute", label: "Rute atau tujuan" },
  { id: "helm", label: "Helm" },
  { id: "telat", label: "Telat jemput" },
];

export function CekForm() {
  const router = useRouter();
  const [platform, setPlatform] = useState<PlatformId>("gojek");
  const [rating, setRating] = useState("4.80");
  const [cancel, setCancel] = useState<CancelId>("sedikit");
  const [complaints, setComplaints] = useState<ComplaintId[]>([]);
  const [trips, setTrips] = useState("28");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggle(id: ComplaintId) {
    setComplaints((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform,
          rating: Number(rating.replace(",", ".")),
          cancel,
          complaints,
          trips: Number(trips),
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa dibaca.");
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
    <Panel className="p-5 sm:p-7">
      <form className="grid gap-5" onSubmit={onSubmit}>
        <Field label="Platform" hint="Pilih tempat kamu paling sering narik minggu ini.">
          <SelectInput value={platform} onChange={(event) => setPlatform(event.target.value as PlatformId)}>
            <option value="gojek">Gojek</option>
            <option value="grab">Grab</option>
            <option value="maxim">Maxim</option>
            <option value="indrive">inDrive</option>
            <option value="lain">Platform lain</option>
          </SelectInput>
        </Field>
        <Field label="Rating saat ini" hint="Angka di aplikasi, dari 1,00 sampai 5,00.">
          <TextInput
            inputMode="decimal"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            required
          />
        </Field>
        <Field label="Pola batal atau skip seminggu terakhir">
          <SelectInput value={cancel} onChange={(event) => setCancel(event.target.value as CancelId)}>
            <option value="tidak">Hampir tidak ada</option>
            <option value="sedikit">1–3 kali</option>
            <option value="sering">4 kali atau lebih</option>
          </SelectInput>
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Keluhan penumpang yang sering muncul</legend>
          <p className="mt-1 text-xs leading-5 text-mute">Centang yang berulang. Kosongkan kalau tidak ada.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {COMPLAINTS.map((item) => (
              <label key={item.id} className="flex items-center gap-2 rounded-2xl border border-line bg-sand px-3 py-3 text-sm">
                <input
                  type="checkbox"
                  checked={complaints.includes(item.id)}
                  onChange={() => toggle(item.id)}
                  className="accent-asphalt"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
        <Field label="Order selesai 7 hari terakhir" hint="Hitungan kasar, 0 sampai 400.">
          <TextInput inputMode="numeric" value={trips} onChange={(event) => setTrips(event.target.value)} required />
        </Field>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mute">Buka hasil sekali {formatRupiah(UNLOCK_PRICE_IDR)} · QRIS</p>
          <Button type="submit" disabled={pending}>
            {pending ? "Menyusun pita..." : "Susun pita risiko"}
          </Button>
        </div>
        {error ? <p className="text-sm text-ember">{error}</p> : null}
      </form>
    </Panel>
  );
}
