import { createHash } from "node:crypto";
import { UNLOCK_PRICE_IDR } from "@/lib/price";
import { site } from "@/lib/seo";

export function midtransConfigured(): boolean {
  return Boolean(process.env.MIDTRANS_SERVER_KEY);
}

function production(): boolean {
  return process.env.MIDTRANS_IS_PRODUCTION === "true";
}

function serverKey(): string {
  return process.env.MIDTRANS_SERVER_KEY || "";
}

function authHeader(): string {
  return `Basic ${Buffer.from(`${serverKey()}:`).toString("base64")}`;
}

export function snapBase(): string {
  return production() ? "https://app.midtrans.com" : "https://app.sandbox.midtrans.com";
}

export function apiBase(): string {
  return production() ? "https://api.midtrans.com" : "https://api.sandbox.midtrans.com";
}

export type SnapCharge = {
  token: string;
  redirectUrl: string;
};

export async function createSnapCharge(input: { orderId: string; cekId: string }): Promise<SnapCharge> {
  const finish = `${process.env.NEXT_PUBLIC_SITE_URL || site.url}/hasil/${input.cekId}`;
  const response = await fetch(`${snapBase()}/snap/v1/transactions`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: input.orderId,
        gross_amount: UNLOCK_PRICE_IDR,
      },
      item_details: [
        {
          id: "ps-unlock",
          price: UNLOCK_PRICE_IDR,
          quantity: 1,
          name: "Kesiapan praktik mandiri bidan",
        },
      ],
      callbacks: { finish },
      enabled_payments: ["gopay", "qris", "shopeepay", "other_qris"],
    }),
  });
  const payload = (await response.json()) as { token?: string; redirect_url?: string; error_messages?: string[] };
  if (!response.ok || !payload.token || !payload.redirect_url) {
    throw new Error(payload.error_messages?.join(", ") || "Midtrans menolak transaksi.");
  }
  return { token: payload.token, redirectUrl: payload.redirect_url };
}

export type TransactionState = {
  transactionStatus: string;
  paid: boolean;
  grossAmount: number;
};

export async function fetchTransaction(orderId: string): Promise<TransactionState | null> {
  const response = await fetch(`${apiBase()}/v2/${encodeURIComponent(orderId)}/status`, {
    headers: { Authorization: authHeader(), Accept: "application/json" },
    cache: "no-store",
  });
  if (response.status === 404) return null;
  const payload = (await response.json()) as {
    transaction_status?: string;
    fraud_status?: string;
    gross_amount?: string;
  };
  if (!response.ok || !payload.transaction_status) return null;
  const status = payload.transaction_status;
  const grossAmount = Number(payload.gross_amount || 0);
  const paid =
    grossAmount === UNLOCK_PRICE_IDR &&
    (status === "settlement" || (status === "capture" && payload.fraud_status !== "deny"));
  return { transactionStatus: status, paid, grossAmount };
}

export function notificationSignature(input: { orderId: string; statusCode: string; grossAmount: string }): string {
  return createHash("sha512")
    .update(`${input.orderId}${input.statusCode}${input.grossAmount}${serverKey()}`)
    .digest("hex");
}
