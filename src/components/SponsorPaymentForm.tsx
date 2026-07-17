'use client';
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import PayPalButton from "@/components/PayPalButton";
import MailCheckOption from "@/components/MailCheckOption";
import { sponsorTiers } from "@/data/sponsorTiers";

const inputClass =
  "w-full rounded-sm border border-border bg-muted/60 px-4 py-3.5 font-body text-base text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary focus:bg-card focus:outline-none focus:ring-1 focus:ring-primary/20";
const labelClass =
  "block px-1 font-body text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground";

const defaultTier = sponsorTiers[sponsorTiers.length - 1];

const SponsorPaymentForm = () => {
  const [tierName, setTierName] = useState(defaultTier.name);
  const [amount, setAmount] = useState(String(defaultTier.min));

  const handleTierChange = (name: string) => {
    setTierName(name);
    const tier = sponsorTiers.find((t) => t.name === name);
    if (tier) setAmount(String(tier.min));
  };

  const numericAmount = Number(amount);
  const isValidAmount = Number.isFinite(numericAmount) && numericAmount > 0;

  return (
    <div>
      <div className="mb-8 grid gap-6 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="sponsor-tier" className={labelClass}>
            Sponsorship Level
          </label>
          <div className="relative">
            <select
              id="sponsor-tier"
              value={tierName}
              onChange={(e) => handleTierChange(e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
            >
              {sponsorTiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} ({tier.price})
                </option>
              ))}
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label htmlFor="sponsor-amount" className={labelClass}>
            Amount (USD)
          </label>
          <input
            id="sponsor-amount"
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {!isValidAmount ? (
        <p className="text-center font-body text-sm text-muted-foreground">
          Enter an amount above to pay online or by check.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="text-center">
            <p className="mb-3 font-body text-sm font-semibold text-foreground">
              Pay Online
            </p>
            <PayPalButton
              amount={numericAmount.toFixed(2)}
              description={`Heartland Plein Air Festival — ${tierName} Sponsorship`}
            />
          </div>
          <div className="border-t border-border pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
            <MailCheckOption amount={numericAmount.toLocaleString()} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SponsorPaymentForm;
