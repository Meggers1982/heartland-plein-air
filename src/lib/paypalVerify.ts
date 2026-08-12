const PAYPAL_API_BASE = "https://api-m.paypal.com";

export function amountsMatch(expected: string, actual: string): boolean {
  const expectedNum = Number(expected);
  const actualNum = Number(actual);
  if (!Number.isFinite(expectedNum) || !Number.isFinite(actualNum)) return false;
  return expectedNum.toFixed(2) === actualNum.toFixed(2);
}

async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
  const res = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("Failed to authenticate with PayPal");
  const data = (await res.json()) as { access_token: string };
  return data.access_token;
}

export type PayPalOrderCheck = {
  verified: boolean;
  actualAmount: string | null;
  status: string | null;
};

export async function fetchAndCheckOrder(orderId: string, expectedAmount: string): Promise<PayPalOrderCheck> {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("PayPal server credentials are not configured (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)");
  }

  const accessToken = await getAccessToken(clientId, clientSecret);
  const orderRes = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!orderRes.ok) {
    throw new Error(`Could not fetch order ${orderId} from PayPal (status ${orderRes.status})`);
  }

  const order = await orderRes.json();
  const capture = order?.purchase_units?.[0]?.payments?.captures?.[0];
  const actualAmount: string | null = capture?.amount?.value ?? null;
  const status: string | null = capture?.status ?? order?.status ?? null;

  return {
    verified: actualAmount !== null && amountsMatch(expectedAmount, actualAmount),
    actualAmount,
    status,
  };
}
