"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import { BACKUP_LABEL, SYMPTOM_LABEL, type BackupId, type SymptomId } from "@/lib/types";
import { formatRupiah, UNLOCK_PRICE_IDR } from "@/lib/price";

const backupOptions = Object.entries(BACKUP_LABEL) as [BackupId, string][];
const symptomOptions = Object.entries(SYMPTOM_LABEL) as [SymptomId, string][];

export function CekForm() {
  const router = useRouter();
  const [nightsOnCall, setNightsOnCall] = useState("6");
  const [birthsAfterMidnight, setBirthsAfterMidnight] = useState("2");
  const [sleepHours, setSleepHours] = useState("5");
  const [backup, setBackup] = useState<BackupId>("kadang");
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggle(id: SymptomId) {
    setSymptoms((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nightsOnCall, birthsAfterMidnight, sleepHours, backup, symptoms }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa diproses.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/cek" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-6 md:p-8">
      <form onSubmit={onSubmit} className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-3">
          <Field label="Malam on-call, 14 hari terakhir" hint="Hitung malam kamu siaga, meski tidak ada panggilan.">
            <TextInput
              inputMode="numeric"
              min={0}
              max={14}
              required
              value={nightsOnCall}
              onChange={(event) => setNightsOnCall(event.target.value)}
            />
          </Field>
          <Field label="Persalinan lewat tengah malam" hint="Yang kamu hadiri setelah pukul 00.00 dalam 14 hari itu.">
            <TextInput
              inputMode="numeric"
              min={0}
              max={40}
              required
              value={birthsAfterMidnight}
              onChange={(event) => setBirthsAfterMidnight(event.target.value)}
            />
          </Field>
          <Field label="Rata-rata jam tidur" hint="Perkiraan jam utuh, boleh pakai koma. Bukan dari jam tangan.">
            <TextInput
              inputMode="decimal"
              min={0}
              max={12}
              step="0.5"
              required
              value={sleepHours}
              onChange={(event) => setSleepHours(event.target.value)}
            />
          </Field>
        </div>
        <Field label="Bidan cadangan" hint="Hanya hitung orang yang benar-benar bisa menggantikan malammu.">
          <SelectInput value={backup} onChange={(event) => setBackup(event.target.value as BackupId)}>
            {backupOptions.map(([id, label]) => (
              <option key={id} value={id}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-night">Yang terasa dua minggu ini</legend>
          <p className="mt-1 text-xs leading-5 text-mist">Centang yang sering, bukan yang hanya sekali. Boleh kosong.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {symptomOptions.map(([id, label]) => (
              <label key={id} className="flex items-start gap-2 rounded-2xl border border-line bg-linen px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1 accent-night"
                  checked={symptoms.includes(id)}
                  onChange={() => toggle(id)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-rose">{error}</p> : null}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button type="submit" disabled={pending}>
            {pending ? "Menyusun pita…" : "Susun pita beban"}
          </Button>
          <p className="text-xs leading-5 text-mist">Hasil lengkap terbuka sekali bayar {formatRupiah(UNLOCK_PRICE_IDR)}.</p>
        </div>
      </form>
    </Panel>
  );
}
