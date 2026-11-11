import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-8 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
        <p>SipbHabis menghitung sisa hari. Izin tetap diputuskan dinas dan konsil.</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/privasi">Privasi</Link>
          <Link href="/syarat">Syarat</Link>
          <Link href="/disclaimer">Disclaimer</Link>
          <Link href="/cookie">Cookie</Link>
        </nav>
      </div>
    </footer>
  );
}
