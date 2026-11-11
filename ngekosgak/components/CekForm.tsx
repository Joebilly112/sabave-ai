"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button, Field, controlClass } from "@/components/ui";
import { PERKS, type Mode, type Perk } from "@/lib/types";
import { modeLabel, perkLabel } from "@/lib/labels";

const modes: Mode[] = ["krl", "motor", "mobil", "ojol", "bus"];

export function CekForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [perks, setPerks] = useState<Perk[]>([]);

  function toggle(perk: Perk) {
    setPerks((current) => (current.includes(perk) ? current.filter((item) => item !== perk) : [...current, perk]));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      homeArea: form.get("homeArea"),
      officeArea: form.get("officeArea"),
      mode: form.get("mode"),
      minutesOneWay: form.get("minutesOneWay"),
      dailyCost: form.get("dailyCost"),
      officeDays: form.get("officeDays"),
      takeHome: form.get("takeHome"),
      kosBudget: form.get("kosBudget"),
      perks,
    };
    try {
      const response = await fetch("/api/cek", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { id?: string; error?: string };
      if (!response.ok || !data.id) {
        setError(data.error || "Isian belum bisa dihitung.");
        setPending(false);
        return;
      }
      void fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "cek_submit", path: "/hasil/" + data.id }),
      });
      router.push(`/hasil/${data.id}`);
    } catch {
      setError("Jaringan terputus. Coba lagi.");
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-10 max-w-6xl px-5">
      <div className="rounded-[28px] border border-mist bg-white p-6 shadow-card sm:p-8">
        <h2 className="text-2xl font-semibold tracking-tight text-soot">Isi perjalanan yang sudah kamu jalani</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-mute">
          Gaji bersih hanya dipakai untuk patokan 20 persen ongkos jalan. Laporan ini tidak menilai gajimu.
        </p>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Daerah rumah" hint="Contoh: Cibinong, Depok, Tangerang Selatan">
            <input name="homeArea" required minLength={2} maxLength={60} className={controlClass} placeholder="Bogor" />
          </Field>
          <Field label="Daerah kantor" hint="Kawasan, bukan nama perusahaan">
            <input name="officeArea" required minLength={2} maxLength={60} className={controlClass} placeholder="Sudirman" />
          </Field>
          <Field label="Moda yang paling sering" hint="Pilih yang benar-benar kamu naiki di hari kerja">
            <select name="mode" required className={controlClass} defaultValue="krl">
              {modes.map((mode) => (
                <option key={mode} value={mode}>
                  {modeLabel[mode]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Menit sekali jalan, pintu ke pintu" hint="Dari rumah sampai meja, termasuk jalan kaki dan tunggu">
            <input name="minutesOneWay" required type="number" min={15} max={240} className={controlClass} placeholder="95" />
          </Field>
          <Field label="Ongkos pulang-pergi per hari kantor" hint="Tiket, bensin, tol, parkir, atau ojol. Rupiah, tanpa titik.">
            <input name="dailyCost" required type="number" min={0} max={500000} className={controlClass} placeholder="32000" />
          </Field>
          <Field label="Hari masuk kantor seminggu" hint="1 sampai 6">
            <input name="officeDays" required type="number" min={1} max={6} className={controlClass} placeholder="5" />
          </Field>
          <Field label="Gaji bersih sebulan" hint="Yang masuk rekening. Hanya untuk patokan 20 persen.">
            <input name="takeHome" required type="number" min={1000000} max={80000000} className={controlClass} placeholder="8500000" />
          </Field>
          <Field label="Anggaran sewa kos sebulan" hint="Harga kamar yang sedang kamu pertimbangkan">
            <input name="kosBudget" required type="number" min={0} max={15000000} className={controlClass} placeholder="2000000" />
          </Field>
        </div>
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-soot">Yang sekarang ditanggung rumah</legend>
          <p className="mt-1 text-xs leading-5 text-mute">Kosongkan kalau tidak ada. Boleh lebih dari satu.</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {PERKS.map((perk) => {
              const on = perks.includes(perk);
              return (
                <button
                  key={perk}
                  type="button"
                  onClick={() => toggle(perk)}
                  aria-pressed={on}
                  className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${on ? "bg-moss text-white ring-moss" : "bg-ticket text-ink ring-mist"}`}
                >
                  {perkLabel[perk]}
                </button>
              );
            })}
          </div>
        </fieldset>
        {error ? <p className="mt-5 text-sm font-semibold text-clay">{error}</p> : null}
        <div className="mt-6">
          <Button type="submit" disabled={pending}>
            {pending ? "Menghitung putusan…" : "Susun putusan"}
          </Button>
        </div>
      </div>
    </form>
  );
}
