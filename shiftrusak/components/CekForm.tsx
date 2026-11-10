"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, TextInput } from "@/components/ui";
import { symptomLabel } from "@/lib/symptoms";
import { SYMPTOM_IDS, type ShiftId, type SymptomId } from "@/lib/types";

const DAY_LABELS = [
  "14 hari lalu",
  "13 hari lalu",
  "12 hari lalu",
  "11 hari lalu",
  "10 hari lalu",
  "9 hari lalu",
  "8 hari lalu",
  "7 hari lalu",
  "6 hari lalu",
  "5 hari lalu",
  "4 hari lalu",
  "3 hari lalu",
  "2 hari lalu",
  "Kemarin",
];

const SHIFT_OPTIONS: { id: ShiftId; label: string }[] = [
  { id: "pagi", label: "Pagi" },
  { id: "siang", label: "Siang" },
  { id: "malam", label: "Malam" },
  { id: "libur", label: "Libur" },
];

type DraftShift = ShiftId | "";

export function CekForm() {
  const router = useRouter();
  const [shifts, setShifts] = useState<DraftShift[]>(() => Array.from({ length: 14 }, () => ""));
  const [commuteMinutes, setCommuteMinutes] = useState("45");
  const [sleepHours, setSleepHours] = useState("5.5");
  const [caffeine, setCaffeine] = useState("3");
  const [symptoms, setSymptoms] = useState<SymptomId[]>([]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function setShift(index: number, value: ShiftId) {
    setShifts((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function toggleSymptom(id: SymptomId) {
    setSymptoms((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    if (shifts.some((shift) => shift === "")) {
      setError("Pilih dinas untuk setiap hari, termasuk libur.");
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          shifts,
          commuteMinutes,
          sleepHours,
          caffeine,
          symptoms,
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa dihitung.");
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
      setError("Koneksi terputus. Coba sekali lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-ward">14 hari dinas terakhir</h2>
          <p className="mt-2 text-sm leading-6 text-mute">
            Hari paling atas adalah yang paling lama. Pilih pagi, siang, malam, atau libur. Jangan mengarang gejala
            yang tidak kamu rasakan.
          </p>
        </div>
        <div className="space-y-3">
          {DAY_LABELS.map((label, index) => (
            <div key={label} className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:items-center">
              <span className="text-sm font-medium text-ink">{label}</span>
              <div className="grid grid-cols-4 gap-1">
                {SHIFT_OPTIONS.map((option) => {
                  const active = shifts[index] === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setShift(index, option.id)}
                      className={`rounded-xl px-2 py-2 text-xs font-semibold ${
                        active ? "bg-ward text-lamp" : "bg-mist text-night"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Commute sekali jalan" hint="Menit, 0–180.">
            <TextInput
              inputMode="numeric"
              value={commuteMinutes}
              onChange={(event) => setCommuteMinutes(event.target.value)}
            />
          </Field>
          <Field label="Tidur rata-rata" hint="Jam, kelipatan 0,5.">
            <TextInput inputMode="decimal" value={sleepHours} onChange={(event) => setSleepHours(event.target.value)} />
          </Field>
          <Field label="Kafein per dinas" hint="Gelas kopi atau minuman berkafein, 0–12.">
            <TextInput inputMode="numeric" value={caffeine} onChange={(event) => setCaffeine(event.target.value)} />
          </Field>
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Gejala dua minggu ini</legend>
          <p className="mt-1 text-xs leading-5 text-mute">Centang yang benar-benar terasa. Boleh kosong.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {SYMPTOM_IDS.map((id) => (
              <label key={id} className="flex items-start gap-2 rounded-2xl border border-line bg-mist px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={symptoms.includes(id)}
                  onChange={() => toggleSymptom(id)}
                />
                <span>{symptomLabel[id]}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-pulse">{error}</p> : null}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-mute">Bukan nasihat medis. Tidak menggantikan dokter atau kebijakan rumah sakit.</p>
          <Button type="submit" disabled={pending}>
            {pending ? "Menghitung..." : "Lihat kunci hasil"}
          </Button>
        </div>
      </form>
    </Panel>
  );
}
