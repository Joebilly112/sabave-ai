export const PRODUCT = {
  domain: "pelatihanmana.id",
  folder: "pelatihanmana",
  name: "Pelatihan Mana",
  url: "https://pelatihanmana.web.app",
  priceIdr: 19900,
  priceLabel: "Rp19.900",
  question: "Pelatihan kompetensi mana yang berikutnya, kalau waktu dan uangmu terbatas?",
  emotion:
    "FOMO sertifikat — ICU, BTCLS, perawatan luka — tanpa tahu mana yang benar-benar menggeser karier.",
  firebaseProjectId: "skoolnow-ea6ff",
  hostingSiteId: "pelatihanmana",
  firestoreDatabaseId: "pelatihanmana",
  region: "asia-southeast1",
} as const;

export function formatIdr(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
