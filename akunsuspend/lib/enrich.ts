import type { CekInput, CekResult } from "@/lib/types";

const BLOCKED = /akun kedua|akun baru|ktp teman|gps palsu|fake gps|sogok|jaminan pulih|pasti nyala|pasti aktif|password|kata sandi/i;

export async function enrichDraft(input: CekInput, result: CekResult): Promise<CekResult> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return result;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Kamu merapikan satu naskah banding singkat bahasa Indonesia dari mitra ojek ke pusat bantuan resmi. Jangan menyarankan akun kedua, GPS palsu, menyogok, atau menjamin akun pulih. Jangan meminta kata sandi atau data pelanggan. Jangan mengaku sebagai pihak platform. Balas hanya isi naskah.",
          },
          {
            role: "user",
            content: JSON.stringify({
              platform: input.platform,
              suspendType: input.suspendType,
              warnings: input.warnings,
              daysLeft: input.daysLeft,
              draft: result.appealDraft,
            }),
          },
        ],
      }),
    });
    if (!response.ok) return result;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = payload.choices?.[0]?.message?.content?.trim().replace(/^["“]|["”]$/g, "");
    if (!text || text.length < 80 || text.length > 700) return result;
    if (!/banding/i.test(text)) return result;
    if (BLOCKED.test(text)) return result;
    return { ...result, appealDraft: text };
  } catch {
    return result;
  } finally {
    clearTimeout(timer);
  }
}
