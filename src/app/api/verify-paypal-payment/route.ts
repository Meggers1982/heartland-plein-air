import { NextRequest, NextResponse } from "next/server";
import { fetchAndCheckOrder } from "@/lib/paypalVerify";

export async function POST(request: NextRequest) {
  let body: { orderId?: unknown; expectedAmount?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { orderId, expectedAmount } = body;
  if (typeof orderId !== "string" || typeof expectedAmount !== "string") {
    return NextResponse.json({ error: "orderId and expectedAmount are required strings" }, { status: 400 });
  }

  try {
    const result = await fetchAndCheckOrder(orderId, expectedAmount);
    if (!result.verified) {
      console.error(
        `[paypal-verify] MISMATCH order=${orderId} expected=${expectedAmount} actual=${result.actualAmount ?? "unknown"} status=${result.status ?? "unknown"}`
      );
    }
    return NextResponse.json(result);
  } catch (err) {
    console.error("[paypal-verify] verification failed", err);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
