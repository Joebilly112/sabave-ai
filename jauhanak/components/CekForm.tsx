"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, Panel, SelectInput, TextInput } from "@/components/ui";
import type { CaregiverId, FrequencyId, LengthId, SignId, TopicId } from "@/lib/types";

const caregivers: { id: CaregiverId; label: string }[] = [
  { id: "pasangan", label: "Pasangan" },
  { id: "nenek", label: "Nenek atau kakek" },
  { id: "saudara", label: "Saudara" },
];

const frequencies: { id: FrequencyId; label: string }[] = [
  { id: "hampir-tiap-hari", label: "Hampir tiap hari" },
  { id: "beberapa-kali", label: "Beberapa kali seminggu" },
  { id: "seminggu-sekali", label: "Sekitar seminggu sekali" },
  { id: "jarang", label: "Jarang, atau sering batal" },
];

const lengths: { id: LengthId; label: string }[] = [
  { id: "di-bawah-5", label: "Di bawah 5 menit" },
  { id: "5-sampai-15", label: "5–15 menit" },
  { id: "15-sampai-30", label: "15–30 menit" },
  { id: "lebih-30", label: "Lebih dari 30 menit" },
];

const topics: { id: TopicId; label: string }[] = [
  { id: "kabar-ringan", label: "Kabar ringan: sudah makan, sudah tidur" },
  { id: "cerita-hari", label: "Cerita hari anak" },
  { id: "sekolah-saja", label: "Hampir selalu sekolah dan nilai" },
  { id: "nasihat-uang", label: "Nasihat, atau pembicaraan uang" },
];

const signOptions: { id: SignId; label: string }[] = [
  { id: "tidak-ada", label: "Belum ada tanda itu" },
  { id: "menolak-telepon", label: "Menolak telepon" },
  { id: "nilai-turun", label: "Nilai turun" },
  { id: "marah", label: "Mudah marah saat dihubungi" },
  { id: "menarik-diri", label: "Menarik diri" },
];

export function CekForm() {
  const router = useRouter();
  const [childAge, setChildAge] = useState("8");
  const [yearsApart, setYearsApart] = useState("3");
  const [monthsLeft, setMonthsLeft] = useState("8");
  const [caregiver, setCaregiver] = useState<CaregiverId>("nenek");
  const [frequency, setFrequency] = useState<FrequencyId>("seminggu-sekali");
  const [length, setLength] = useState<LengthId>("5-sampai-15");
  const [topic, setTopic] = useState<TopicId>("sekolah-saja");
  const [signs, setSigns] = useState<SignId[]>(["menolak-telepon"]);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function toggleSign(id: SignId) {
    setSigns((current) => {
      if (id === "tidak-ada") return ["tidak-ada"];
      const withoutNone = current.filter((item) => item !== "tidak-ada");
      if (withoutNone.includes(id)) {
        const next = withoutNone.filter((item) => item !== id);
        return next.length ? next : ["tidak-ada"];
      }
      return [...withoutNone, id];
    });
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const age = Number(childAge);
    const years = Number(yearsApart);
    const months = Number(monthsLeft);
    if (!Number.isInteger(age) || age < 0 || age > 17) {
      setError("Usia anak diisi 0 sampai 17 tahun.");
      return;
    }
    if (!Number.isInteger(years) || years < 0 || years > age) {
      setError("Lama terpisah tidak bisa lebih panjang dari usia anak.");
      return;
    }
    if (!Number.isInteger(months) || months < 0 || months > 60) {
      setError("Sisa kontrak diisi 0 sampai 60 bulan.");
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childAge: age,
          yearsApart: years,
          caregiver,
          frequency,
          length,
          topic,
          signs,
          monthsLeft: months,
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Isian belum bisa disimpan.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/hasil" }),
      });
      router.push(`/hasil/${payload.id}`);
    } catch {
      setError("Koneksi terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <Panel className="p-5 sm:p-7">
      <form className="space-y-5" onSubmit={onSubmit}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Usia anak" hint="Tahun, 0–17">
            <TextInput inputMode="numeric" value={childAge} onChange={(event) => setChildAge(event.target.value)} />
          </Field>
          <Field label="Sudah terpisah" hint="Tahun, tidak lebih dari usia">
            <TextInput inputMode="numeric" value={yearsApart} onChange={(event) => setYearsApart(event.target.value)} />
          </Field>
          <Field label="Sisa kontrak" hint="Bulan, 0 jika tidak terikat">
            <TextInput inputMode="numeric" value={monthsLeft} onChange={(event) => setMonthsLeft(event.target.value)} />
          </Field>
        </div>
        <Field label="Siapa yang sehari-hari bersama anak">
          <SelectInput value={caregiver} onChange={(event) => setCaregiver(event.target.value as CaregiverId)}>
            {caregivers.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Seberapa sering kalian bicara">
            <SelectInput value={frequency} onChange={(event) => setFrequency(event.target.value as FrequencyId)}>
              {frequencies.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Lama panggilan yang biasa">
            <SelectInput value={length} onChange={(event) => setLength(event.target.value as LengthId)}>
              {lengths.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <Field label="Panggilan biasanya tentang apa">
          <SelectInput value={topic} onChange={(event) => setTopic(event.target.value as TopicId)}>
            {topics.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Tanda beberapa bulan terakhir</legend>
          <p className="mt-1 text-xs leading-5 text-mute">Boleh lebih dari satu. Jangan tulis nama anak.</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {signOptions.map((item) => (
              <label key={item.id} className="flex items-center gap-2 rounded-2xl border border-line bg-mist/40 px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  checked={signs.includes(item.id)}
                  onChange={() => toggleSign(item.id)}
                  className="accent-dusk"
                />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
        {error ? <p className="text-sm text-rose">{error}</p> : null}
        <Button type="submit" disabled={pending} className="w-full sm:w-auto">
          {pending ? "Menyimpan…" : "Simpan dan lihat kunci laporan"}
        </Button>
      </form>
    </Panel>
  );
}
