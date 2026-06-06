export type CompoundingFrequency =
  | "yearly"
  | "semiannual"
  | "quarterly"
  | "monthly"
  | "daily";

export type WithdrawalFrequency = "monthly" | "annual" | "none";

export interface FutureValueInput {
  initialInvestment: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  compounding: CompoundingFrequency;
  inflationRate?: number;
  withdrawalAmount?: number;
  withdrawalFrequency?: WithdrawalFrequency;
}

export interface YearlyBreakdownRow {
  year: number;
  endingBalance: number;
  contributions: number;
  interestEarned: number;
}

export interface FutureValueResult {
  totalFutureValue: number;
  totalContributions: number;
  totalWithdrawals: number;
  totalInterestEarned: number;
  inflationAdjustedValue: number | null;
  averageMonthlyGrowth: number;
  yearlyBreakdown: YearlyBreakdownRow[];
  summary: string;
}

export function compoundingPeriodsPerYear(freq: CompoundingFrequency): number {
  const map: Record<CompoundingFrequency, number> = {
    yearly: 1,
    semiannual: 2,
    quarterly: 4,
    monthly: 12,
    daily: 365,
  };
  return map[freq];
}

export function formatCurrency(value: number, symbol = "$"): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return value < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function formatCompactCurrency(value: number, symbol = "$"): string {
  if (value >= 1_000_000) {
    return `${symbol}${(value / 1_000_000).toFixed(2)}M`;
  }
  if (value >= 1_000) {
    return `${symbol}${(value / 1_000).toFixed(1)}K`;
  }
  return formatCurrency(value, symbol);
}

export function calculateFutureValue(input: FutureValueInput): FutureValueResult | null {
  const {
    initialInvestment,
    monthlyContribution,
    annualRate,
    years,
    compounding,
    inflationRate,
    withdrawalAmount = 0,
    withdrawalFrequency = "none",
  } = input;

  if (
    !Number.isFinite(initialInvestment) ||
    initialInvestment < 0 ||
    !Number.isFinite(monthlyContribution) ||
    monthlyContribution < 0 ||
    !Number.isFinite(annualRate) ||
    annualRate < 0 ||
    !Number.isFinite(years) ||
    years <= 0
  ) {
    return null;
  }

  const r = annualRate / 100;
  const n = compoundingPeriodsPerYear(compounding);
  const monthlyGrowthFactor = Math.pow(1 + r / n, n / 12);
  const totalMonths = Math.max(1, Math.round(years * 12));

  let balance = initialInvestment;
  let totalContributions = initialInvestment;
  let totalWithdrawals = 0;
  let totalInterestEarned = 0;

  const yearlyBreakdown: YearlyBreakdownRow[] = [];
  let yearContributions = 0;
  let yearInterest = 0;

  for (let month = 1; month <= totalMonths; month++) {
    if (
      withdrawalFrequency === "annual" &&
      withdrawalAmount > 0 &&
      (month - 1) % 12 === 0
    ) {
      balance = Math.max(0, balance - withdrawalAmount);
      totalWithdrawals += withdrawalAmount;
    }

    balance += monthlyContribution;
    totalContributions += monthlyContribution;
    yearContributions += monthlyContribution;

    if (withdrawalFrequency === "monthly" && withdrawalAmount > 0) {
      balance = Math.max(0, balance - withdrawalAmount);
      totalWithdrawals += withdrawalAmount;
    }

    const beforeInterest = balance;
    balance *= monthlyGrowthFactor;
    const interestThisMonth = balance - beforeInterest;
    totalInterestEarned += interestThisMonth;
    yearInterest += interestThisMonth;

    if (month % 12 === 0 || month === totalMonths) {
      yearlyBreakdown.push({
        year: Math.ceil(month / 12),
        endingBalance: balance,
        contributions: yearContributions,
        interestEarned: yearInterest,
      });
      yearContributions = 0;
      yearInterest = 0;
    }
  }

  const totalFutureValue = balance;
  const inflationAdjustedValue =
    inflationRate != null && Number.isFinite(inflationRate) && inflationRate >= 0
      ? totalFutureValue / Math.pow(1 + inflationRate / 100, years)
      : null;

  const averageMonthlyGrowth =
    totalMonths > 0 ? (totalFutureValue - initialInvestment) / totalMonths : 0;

  const summary = buildSummary({
    initialInvestment,
    monthlyContribution,
    annualRate,
    years,
    totalFutureValue,
    inflationAdjustedValue,
  });

  return {
    totalFutureValue,
    totalContributions,
    totalWithdrawals,
    totalInterestEarned,
    inflationAdjustedValue,
    averageMonthlyGrowth,
    yearlyBreakdown,
    summary,
  };
}

function buildSummary(params: {
  initialInvestment: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  totalFutureValue: number;
  inflationAdjustedValue: number | null;
}): string {
  const {
    initialInvestment,
    monthlyContribution,
    annualRate,
    years,
    totalFutureValue,
    inflationAdjustedValue,
  } = params;

  const yearsLabel = Number.isInteger(years) ? `${years}` : years.toFixed(1);
  const fvLabel = formatCompactCurrency(totalFutureValue);

  let text = `With a ${formatCurrency(initialInvestment)} initial investment`;
  if (monthlyContribution > 0) {
    text += ` and ${formatCurrency(monthlyContribution)} monthly contributions`;
  }
  text += ` at ${annualRate.toFixed(2)}% annual return, your investment could grow to approximately ${fvLabel} in ${yearsLabel} years.`;

  if (inflationAdjustedValue != null) {
    text += ` Inflation-adjusted purchasing power: about ${formatCompactCurrency(inflationAdjustedValue)}.`;
  }

  return text;
}
