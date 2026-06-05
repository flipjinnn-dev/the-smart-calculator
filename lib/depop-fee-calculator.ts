export type SellerRegion = "us" | "uk" | "au" | "international";
export type PaymentMethod = "depop" | "stripe" | "paypal";
export type Currency = "USD" | "GBP" | "AUD" | "EUR";

export interface DepopFeeInput {
  currency: Currency;
  region: SellerRegion;
  paymentMethod: PaymentMethod;
  salePrice: number;
  buyerShipping: number;
  itemCost?: number;
}

export interface DepopFeeResult {
  salePrice: number;
  buyerShipping: number;
  feeBase: number;
  depopFee: number;
  processingFee: number;
  totalFees: number;
  netPayout: number;
  profit: number | null;
  depopRateLabel: string;
  processingRateLabel: string;
  summary: string;
}

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: "$",
  GBP: "£",
  AUD: "A$",
  EUR: "€",
};

export function getFeeRates(region: SellerRegion, paymentMethod: PaymentMethod) {
  const depopRate = region === "us" || region === "uk" ? 0 : 0.1;
  const depopRateLabel =
    region === "us" || region === "uk" ? "0% (US/UK sellers)" : "10%";

  if (region === "us") {
    if (paymentMethod === "paypal") {
      return {
        depopRate,
        depopRateLabel,
        processingPercent: 0.0349,
        processingFixed: 0.49,
        processingRateLabel: "3.49% + $0.49 (PayPal)",
      };
    }
    return {
      depopRate,
      depopRateLabel,
      processingPercent: 0.033,
      processingFixed: 0.45,
      processingRateLabel:
        paymentMethod === "stripe"
          ? "3.3% + $0.45 (Stripe / card)"
          : "3.3% + $0.45 (Depop Payments)",
    };
  }

  if (region === "uk") {
    if (paymentMethod === "paypal") {
      return {
        depopRate,
        depopRateLabel,
        processingPercent: 0.034,
        processingFixed: 0.3,
        processingRateLabel: "3.4% + £0.30 (PayPal)",
      };
    }
    return {
      depopRate,
      depopRateLabel,
      processingPercent: 0.029,
      processingFixed: 0.3,
      processingRateLabel:
        paymentMethod === "stripe"
          ? "2.9% + £0.30 (Stripe / card)"
          : "2.9% + £0.30 (Depop Payments)",
    };
  }

  if (region === "au") {
    return {
      depopRate,
      depopRateLabel: "10%",
      processingPercent: 0.026,
      processingFixed: 0.3,
      processingRateLabel:
        paymentMethod === "paypal"
          ? "2.6% + A$0.30 (PayPal)"
          : paymentMethod === "stripe"
            ? "2.6% + A$0.30 (Stripe / card)"
            : "2.6% + A$0.30 (Depop Payments)",
    };
  }

  return {
    depopRate,
    depopRateLabel: "10%",
    processingPercent: paymentMethod === "paypal" ? 0.039 : 0.034,
    processingFixed: 0.3,
    processingRateLabel:
      paymentMethod === "paypal"
        ? "3.9% + $0.30 (PayPal)"
        : paymentMethod === "stripe"
          ? "3.4% + $0.30 (Stripe / card)"
          : "3% + $0.30 (Depop Payments)",
  };
}

export function formatMoney(value: number, symbol: string) {
  return `${symbol}${value.toFixed(2)}`;
}

export function calculateDepopFees(input: DepopFeeInput): DepopFeeResult | null {
  const { salePrice, buyerShipping, itemCost, region, paymentMethod } = input;

  if (!Number.isFinite(salePrice) || salePrice <= 0) return null;

  const shipping = Number.isFinite(buyerShipping) ? buyerShipping : 0;
  const cost = itemCost !== undefined && Number.isFinite(itemCost) ? itemCost : undefined;
  const symbol = CURRENCY_SYMBOL[input.currency];

  const feeBase = salePrice + shipping;
  const rates = getFeeRates(region, paymentMethod);
  const depopFee = feeBase * rates.depopRate;
  const processingFee = feeBase * rates.processingPercent + rates.processingFixed;
  const totalFees = depopFee + processingFee;
  const netPayout = feeBase - totalFees;
  const profit = cost !== undefined ? netPayout - cost : null;

  const summary = `If you sell an item for ${formatMoney(salePrice, symbol)}${
    shipping > 0 ? ` plus ${formatMoney(shipping, symbol)} shipping` : ""
  }, your estimated net payout is ${formatMoney(Math.round(netPayout * 100) / 100, symbol)} after Depop and payment fees.`;

  return {
    salePrice,
    buyerShipping: shipping,
    feeBase,
    depopFee: Math.round(depopFee * 100) / 100,
    processingFee: Math.round(processingFee * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    netPayout: Math.round(netPayout * 100) / 100,
    profit: profit !== null ? Math.round(profit * 100) / 100 : null,
    depopRateLabel: rates.depopRateLabel,
    processingRateLabel: rates.processingRateLabel,
    summary,
  };
}

export function currencyForRegion(region: SellerRegion): Currency {
  const map: Record<SellerRegion, Currency> = {
    us: "USD",
    uk: "GBP",
    au: "AUD",
    international: "USD",
  };
  return map[region];
}
