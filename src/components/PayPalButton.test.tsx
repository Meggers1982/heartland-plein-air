import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useEffect } from "react";
import { render, screen, act } from "@testing-library/react";
import PayPalButton from "./PayPalButton";

const { scriptShouldLoad } = vi.hoisted(() => ({ scriptShouldLoad: { value: true } }));

vi.mock("next/script", () => ({
  default: function MockScript({ onLoad }: { onLoad?: () => void }) {
    useEffect(() => {
      if (scriptShouldLoad.value) onLoad?.();
    }, [onLoad]);
    return null;
  },
}));

describe("PayPalButton", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID = "test-client-id";
    scriptShouldLoad.value = true;
    window.paypal = { Buttons: () => ({ render: () => {} }) };
  });

  afterEach(() => {
    vi.useRealTimers();
    delete window.paypal;
  });

  it("shows a fallback message if the PayPal SDK script never loads (e.g. blocked by an ad blocker)", () => {
    scriptShouldLoad.value = false;

    render(<PayPalButton amount="30.00" description="Test registration" />);
    expect(screen.queryByText(/something went wrong with paypal/i)).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.getByText(/something went wrong with paypal/i)).toBeInTheDocument();
  });

  it("does not show the fallback message once the SDK loads successfully", () => {
    render(<PayPalButton amount="30.00" description="Test registration" />);

    act(() => {
      vi.advanceTimersByTime(6000);
    });

    expect(screen.queryByText(/something went wrong with paypal/i)).not.toBeInTheDocument();
  });
});
