import { createHash, timingSafeEqual } from "crypto";
import { SITE } from "./site";

export function midtransConfigured(): boolean {
  return Boolean(process.env.MIDTRANS_SERVER_KEY && process.env.MIDTRANS_CLIENT_KEY);
}

export function midtransIsProduction(): boolean {
  return process.env.MIDTRANS_IS_PRODUCTION === "true";
}

export function midtransSnapScript(): string {
  return midtransIsProduction()
    ? "https://app.midtrans.com/snap/snap.js"
    : "https://app.sandbox.midtrans.com/snap/snap.js";
}

export function midtransClientKey(): string {
  return process.env.MIDTRANS_CLIENT_KEY || "";
}

function apiBase(): string {
  return midtransIsProduction()
    ? "https://app.midtrans.com"
    : "https://app.sandbox.midtrans.com";
}

export async function createSnapTransaction(opts: {
  orderId: string;
  hasilId: string;
}): Promise<{ token: string; redirectUrl: string }> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey || !process.env.MIDTRANS_CLIENT_KEY) {
    throw new Error("Midtrans belum dikonfigurasi.");
  }

  const auth = Buffer.from(`${serverKey}:`).toString("base64");
  const response = await fetch(`${apiBase()}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: opts.orderId,
        gross_amount: SITE.priceIdr,
      },
      item_details: [
        {
          id: "berkas-naikpangkat",
          price: SITE.priceIdr,
          quantity: 1,
          name: "Buka daftar berkas naik pangkat",
        },
      ],
      enabled_payments: ["qris", "gopay", "shopeepay"],
      callbacks: {
        finish: `${SITE.url}/hasil/${opts.hasilId}`,
      },
    }),
  });

  const payload = (await response.json().catch(() => null)) as
    | { token?: string; redirect_url?: string; error_messages?: string[] }
    | null;

  if (!response.ok || !payload?.token || !payload.redirect_url) {
    const message = payload?.error_messages?.join(" ") || "Pembayaran belum bisa dibuat.";
    throw new Error(message);
  }

  return { token: payload.token, redirectUrl: payload.redirect_url };
}

export function verifyMidtransSignature(input: {
  orderId: string;
  statusCode: string;
  grossAmount: string;
  signatureKey: string;
}): boolean {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return false;
  const expected = createHash("sha512")
    .update(`${input.orderId}${input.statusCode}${input.grossAmount}${serverKey}`)
    .digest("hex");
  const left = Buffer.from(expected);
  const right = Buffer.from(input.signatureKey);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}
