"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, TextInput } from "@/components/ui";
import { symptomLabel } from "@/lib/symptoms";
import { SYMPTOM_IDS, type SymptomId } from "@/lib/types";

export function CekForm() {
  const router = useRouter();
  const [hoursWeek, setHoursWeek] = useState("");
  const [activeClients, setActiveClients] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [daysOff, setDaysOff] = useState("");
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggle(id: SymptomId) {
    setSymptoms((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hoursWeek, activeClients, sleepHours, daysOff, symptoms }),
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
        body: JSON.stringify({ name: "cek_submit", path: "/" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Jam kerja seminggu terakhir" hint="Termasuk revisi malam dan weekend. Angka bulat, 1–112.">
            <TextInput
              inputMode="numeric"
              name="hoursWeek"
              placeholder="58"
              value={hoursWeek}
              onChange={(event) => setHoursWeek(event.target.value)}
              required
            />
          </Field>
          <Field label="Klien yang masih aktif" hint="Yang minggu ini masih mengirim brief atau revisi. 1–30.">
            <TextInput
              inputMode="numeric"
              name="activeClients"
              placeholder="5"
              value={activeClients}
              onChange={(event) => setActiveClients(event.target.value)}
              required
            />
          </Field>
          <Field label="Rata-rata jam tidur" hint="Boleh setengah jam, misalnya 5,5. Antara 0 dan 14.">
            <TextInput
              inputMode="decimal"
              name="sleepHours"
              placeholder="5,5"
              value={sleepHours}
              onChange={(event) => setSleepHours(event.target.value)}
              required
            />
          </Field>
          <Field label="Hari tanpa kerja, 30 hari terakhir" hint="Hari yang benar-benar tanpa revisi. 0–31.">
            <TextInput
              inputMode="numeric"
              name="daysOff"
              placeholder="1"
              value={daysOff}
              onChange={(event) => setDaysOff(event.target.value)}
              required
            />
          </Field>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Sinyal tubuh bulan ini</legend>
          <p className="mt-1 text-xs leading-5 text-mute">Centang yang terasa. Boleh tidak ada. Jangan menuliskan nama klien.</p>
          <div className="mt-3 grid gap-2">
            {SYMPTOM_IDS.map((id) => (
              <label key={id} className="flex items-start gap-3 rounded-2xl border border-line bg-cream px-3 py-3 text-sm text-ink">
                <input
                  type="checkbox"
                  className="mt-1 accent-ember"
                  checked={symptoms.includes(id)}
                  onChange={() => toggle(id)}
                />
                <span>{symptomLabel[id]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-clay">{error}</p> : null}
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan…" : "Simpan dan lihat halaman pita"}
        </Button>
      </form>
    </Panel>
  );
}
