'use client';
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Check } from "lucide-react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: {
        style?: Record<string, string | number>;
        createOrder: (data: unknown, actions: PayPalActions) => Promise<string>;
        onApprove: (data: unknown, actions: PayPalActions) => Promise<void>;
        onError?: (err: unknown) => void;
      }) => { render: (container: HTMLElement) => void };
    };
  }
}

type PayPalActions = {
  order: {
    create: (options: {
      purchase_units: { description: string; amount: { value: string; currency_code: string } }[];
    }) => Promise<string>;
    capture: () => Promise<void>;
  };
};

type PayPalButtonProps = {
  amount: string;
  description: string;
};

const PayPalButton = ({ amount, description }: PayPalButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

  useEffect(() => {
    if (!sdkReady || !window.paypal || !containerRef.current) return;
    containerRef.current.innerHTML = "";
    window.paypal
      .Buttons({
        style: { layout: "horizontal", color: "gold", shape: "pill", label: "pay", height: 45 },
        createOrder: (_data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                description,
                amount: { value: amount, currency_code: "USD" },
              },
            ],
          }),
        onApprove: async (_data, actions) => {
          await actions.order.capture();
          setStatus("success");
        },
        onError: () => setStatus("error"),
      })
      .render(containerRef.current);
  }, [sdkReady, amount, description]);

  if (!clientId) return null;

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-3 text-center"
      >
        <Check className="h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" />
        <p className="font-body text-sm font-semibold text-foreground">
          Payment received — thank you!
        </p>
      </div>
    );
  }

  return (
    <div>
      <Script
        src={`https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`}
        strategy="afterInteractive"
        onLoad={() => setSdkReady(true)}
      />
      <div ref={containerRef} className="mx-auto max-w-xs" />
      {status === "error" && (
        <p className="mt-2 text-center font-body text-xs" style={{ color: "hsl(var(--destructive))" }}>
          Something went wrong with PayPal. Please try again or email ralstoncreativedistrict@gmail.com.
        </p>
      )}
    </div>
  );
};

export default PayPalButton;
