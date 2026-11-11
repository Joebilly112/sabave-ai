import { PRODUCT } from "@/lib/config";
import { markOrderStatus } from "@/lib/orders";
import type { OrderStatus } from "@/lib/types";

export function midtransHost(isProduction: boolean): string {
  return isProduction ? "https://api.midtrans.com" : "https://api.sandbox.midtrans.com";
}

export function mapTransactionStatus(transactionStatus: string, fraudStatus?: string): OrderStatus | null {
  if (transactionStatus === "capture") {
    return fraudStatus === "challenge" ? null : "paid";
  }
  if (transactionStatus === "settlement") return "paid";
  if (transactionStatus === "expire") return "expire";
  if (transactionStatus === "cancel") return "cancel";
  if (transactionStatus === "deny") return "deny";
  if (transactionStatus === "pending") return "pending";
  return null;
}

export async function syncOrderFromGateway(orderId: string): Promise<OrderStatus | null> {
  const serverKey = process.env.MIDTRANS_SERVER_KEY;
  if (!serverKey) return null;
  const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";
  const auth = Buffer.from(`${serverKey}:`).toString("base64");
  const response = await fetch(`${midtransHost(isProduction)}/v2/${orderId}/status`, {
    headers: { Authorization: `Basic ${auth}`, Accept: "application/json" },
    cache: "no-store",
  });
  if (!response.ok) return null;
  const payload = (await response.json()) as {
    gross_amount?: string;
    transaction_status?: string;
    fraud_status?: string;
  };
  const amount = Number(payload.gross_amount ?? "");
  if (amount !== PRODUCT.priceIdr) return null;
  const next = mapTransactionStatus(payload.transaction_status ?? "", payload.fraud_status);
  if (!next) return null;
  if (next !== "pending") await markOrderStatus(orderId, next);
  return next;
}
