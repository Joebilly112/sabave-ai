export const PRODUCT = {
  domain: "ppgsiap.id",
  folder: "ppgsiap",
  name: "PPG Siap",
  url: "https://ppgsiap.web.app",
  priceIdr: 19900,
  priceLabel: "Rp19.900",
  question: "Slot PPG tahun ini benar-benar siap dipakai, atau masih akan terbuang?",
  emotion: "Harap-harap cemas menjelang Pendidikan Profesi Guru: berkas, uji kompetensi, dan jam mengajar yang harus dikosongkan.",
  firebaseProjectId: "skoolnow-ea6ff",
  hostingSiteId: "ppgsiap",
  firestoreDatabaseId: "ppgsiap",
  region: "asia-southeast1",
} as const;

export function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
