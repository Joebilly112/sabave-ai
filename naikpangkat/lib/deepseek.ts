import type { Unlock } from "./berkas";

export async function softenNote(unlock: Unlock): Promise<string> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return unlock.note;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        temperature: 0.4,
        max_tokens: 120,
        messages: [
          {
            role: "system",
            content:
              "Tulis satu paragraf Bahasa Indonesia, paling banyak 45 kata. Nada tenang untuk ASN yang bingung soal berkas pangkat. Jangan menjanjikan pangkat naik. Jangan menyebut gaji, harga, atau situs lain. Jangan mengarang peraturan.",
          },
          {
            role: "user",
            content: `Profil: ${unlock.profileLabel}. Judul: ${unlock.headline}. Catatan awal: ${unlock.note}. Alasan balik pertama: ${unlock.rejections[0]?.title ?? "-"}.`,
          },
        ],
      }),
    });
    if (!response.ok) return unlock.note;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = payload.choices?.[0]?.message?.content?.trim().replace(/\s+/g, " ");
    if (!text || text.length > 320) return unlock.note;
    if (/gaji|rupiah|rp\s?\d/i.test(text)) return unlock.note;
    return text;
  } catch {
    return unlock.note;
  } finally {
    clearTimeout(timer);
  }
}
