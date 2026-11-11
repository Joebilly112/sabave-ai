import { MessageCircle, Phone } from "lucide-react";
import { helpChannels } from "@/lib/help";

export function HelpPanel({ compact = false }: { compact?: boolean }) {
  return (
    <section id="bantuan" className="rounded-3xl border border-line bg-white p-5 shadow-card">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">Selalu gratis</p>
      <h2 className={compact ? "mt-2 text-xl font-semibold text-sea" : "mt-2 text-2xl font-semibold text-sea"}>
        Bantuan resmi, tidak menunggu pembayaran
      </h2>
      <p className="mt-2 text-sm leading-6 text-mute">
        Jika kamu dalam bahaya sekarang, hubungi nomor ini dulu. BertahanGak bukan layanan negara dan tidak menerima laporan darurat.
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        <li>
          <a className="flex items-start gap-3 rounded-2xl bg-foam px-4 py-3 font-semibold text-sea" href={helpChannels.whatsappHref}>
            <MessageCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              WhatsApp pengaduan KP2MI
              <span className="mt-1 block font-normal text-ink">{helpChannels.whatsappDisplay}</span>
            </span>
          </a>
        </li>
        <li>
          <a className="flex items-start gap-3 rounded-2xl bg-sand px-4 py-3 font-semibold text-sea" href={helpChannels.abroadHref}>
            <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              Telepon dari luar negeri
              <span className="mt-1 block font-normal text-ink">{helpChannels.abroadDisplay}</span>
            </span>
          </a>
        </li>
        <li>
          <a className="flex items-start gap-3 rounded-2xl bg-sand px-4 py-3 font-semibold text-sea" href={helpChannels.domesticHref}>
            <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>
              Telepon dari dalam negeri
              <span className="mt-1 block font-normal text-ink">{helpChannels.domesticDisplay}</span>
            </span>
          </a>
        </li>
      </ul>
      <p className="mt-4 text-sm leading-6 text-ink">
        Juga hubungi KBRI atau KJRI di negara tempat kamu bekerja. Daftar perwakilan ada di{" "}
        <a className="font-semibold text-tide underline" href={helpChannels.kemluUrl}>
          situs Kementerian Luar Negeri
        </a>
        . Kanal Migran Aman:{" "}
        <a className="font-semibold text-tide underline" href={helpChannels.kp2miUrl}>
          kp2mi.go.id/migran-aman
        </a>
        . Surel pengaduan: {helpChannels.email}.
      </p>
    </section>
  );
}
