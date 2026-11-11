import Link from "next/link";
import { helpChannels } from "@/lib/help";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-sea text-sand">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">BertahanGak</p>
          <p className="mt-2 text-sm leading-6 text-sand/80">
            Pita situasi untuk pekerja migran. Bukan nasihat hukum, bukan layanan KP2MI, dan bukan pengganti telepon darurat.
          </p>
        </div>
        <div className="text-sm leading-6">
          <p className="font-semibold">Bantuan resmi</p>
          <a className="mt-2 block text-sand/80" href={helpChannels.whatsappHref}>
            WhatsApp {helpChannels.whatsappDisplay}
          </a>
          <a className="block text-sand/80" href={helpChannels.abroadHref}>
            Luar negeri {helpChannels.abroadDisplay}
          </a>
          <a className="block text-sand/80" href={helpChannels.kp2miUrl}>
            Migran Aman
          </a>
        </div>
        <div className="text-sm leading-6">
          <Link className="block text-sand/80" href="/tentang">
            Tentang
          </Link>
          <Link className="block text-sand/80" href="/artikel">
            Artikel
          </Link>
          <Link className="block text-sand/80" href="/privasi">
            Privasi
          </Link>
          <Link className="block text-sand/80" href="/syarat">
            Syarat
          </Link>
          <Link className="block text-sand/80" href="/disclaimer">
            Disclaimer
          </Link>
          <Link className="block text-sand/80" href="/cookie">
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
}
