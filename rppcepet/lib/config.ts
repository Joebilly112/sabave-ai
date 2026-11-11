export const PRODUCT = {
  domain: "rppcepet.id",
  folder: "rppcepet",
  name: "RPP Cepet",
  url: "https://rppcepet.web.app",
  priceIdr: 14900,
  priceLabel: "Rp14.900",
  question: "Besok mengajar, RPP-nya masih bisa selesai malam ini tanpa begadang sampai jam 2?",
  emotion: "Cemas Minggu malam — besok sudah di depan kelas, rencana pelajaran masih kosong.",
  firebaseProjectId: "skoolnow-ea6ff",
  hostingSiteId: "rppcepet",
  firestoreDatabaseId: "rppcepet",
  region: "asia-southeast1",
} as const;

export function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
