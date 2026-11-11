"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Field, controlClass } from "@/components/ui";
import { ABUSES, DAY_OFFS, DEBTS, MOODS, PASSPORTS, SECTORS, WAGES } from "@/lib/types";
import { abuseLabel, dayOffLabel, debtLabel, moodLabel, passportLabel, sectorLabel, wageLabel } from "@/lib/labels";

const empty = {
  country: "",
  sector: "prt",
  monthsWorked: "6",
  monthsLeft: "12",
  wage: "ya",
  dayOff: "1",
  passport: "ya",
  abuse: "tidak",
  mood: "stabil",
  debt: "masih",
};

export function CekForm() {
  const router = useRouter();
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  function set<K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) {
    setForm((current) => ({ ...current, [key]: value }));
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
          ...form,
          monthsWorked: Number(form.monthsWorked),
          monthsLeft: Number(form.monthsLeft),
        }),
      });
      const payload = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error || "Cek belum tersimpan.");
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
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[28px] border border-line bg-white p-5 shadow-card sm:p-7" id="cek">
      <h2 className="text-2xl font-semibold text-sea">Cek situasi hari ini</h2>
      <p className="mt-2 text-sm leading-6 text-mute">
        Jawab apa adanya. Jika kamu sedang dalam bahaya, lewati formulir dan pakai nomor bantuan di bawah. Formulir ini tidak mengirim petugas.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Negara tujuan" hint="Nama negara, bukan alamat rumah.">
          <input className={controlClass} value={form.country} maxLength={40} required onChange={(event) => set("country", event.target.value)} placeholder="Contoh: Malaysia" />
        </Field>
        <Field label="Sektor kerja">
          <select className={controlClass} value={form.sector} onChange={(event) => set("sector", event.target.value as typeof form.sector)}>
            {SECTORS.map((item) => (
              <option key={item} value={item}>
                {sectorLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Sudah berapa bulan bekerja">
          <input className={controlClass} inputMode="numeric" min={0} max={120} type="number" value={form.monthsWorked} onChange={(event) => set("monthsWorked", event.target.value)} />
        </Field>
        <Field label="Sisa bulan kontrak">
          <input className={controlClass} inputMode="numeric" min={0} max={48} type="number" value={form.monthsLeft} onChange={(event) => set("monthsLeft", event.target.value)} />
        </Field>
        <Field label="Gaji dibayar tepat waktu?">
          <select className={controlClass} value={form.wage} onChange={(event) => set("wage", event.target.value as typeof form.wage)}>
            {WAGES.map((item) => (
              <option key={item} value={item}>
                {wageLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Hari libur dalam seminggu">
          <select className={controlClass} value={form.dayOff} onChange={(event) => set("dayOff", event.target.value as typeof form.dayOff)}>
            {DAY_OFFS.map((item) => (
              <option key={item} value={item}>
                {dayOffLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Paspor ada di tanganmu?">
          <select className={controlClass} value={form.passport} onChange={(event) => set("passport", event.target.value as typeof form.passport)}>
            {PASSPORTS.map((item) => (
              <option key={item} value={item}>
                {passportLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Ada kekerasan?">
          <select className={controlClass} value={form.abuse} onChange={(event) => set("abuse", event.target.value as typeof form.abuse)}>
            {ABUSES.map((item) => (
              <option key={item} value={item}>
                {abuseLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tidur dan perasaan belakangan ini">
          <select className={controlClass} value={form.mood} onChange={(event) => set("mood", event.target.value as typeof form.mood)}>
            {MOODS.map((item) => (
              <option key={item} value={item}>
                {moodLabel[item]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Utang ke agensi">
          <select className={controlClass} value={form.debt} onChange={(event) => set("debt", event.target.value as typeof form.debt)}>
            {DEBTS.map((item) => (
              <option key={item} value={item}>
                {debtLabel[item]}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {error ? <p className="mt-4 text-sm font-semibold text-clay">{error}</p> : null}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyusun pita…" : "Lihat pita situasi"}
        </Button>
        <p className="text-xs leading-5 text-mute">Darurat langsung terbuka. Pita lain menampilkan ringkasannya setelah pembayaran.</p>
      </div>
    </form>
  );
}
