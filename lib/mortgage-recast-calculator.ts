export type OriginalTermYears = 10 | 15 | 20 | 25 | 30;

export interface MortgageRecastInput {
  originalLoanAmount: number;
  currentBalance: number;
  annualRatePct: number;
  originalTermYears: OriginalTermYears;
  remainingYears: number;
  lumpSumPayment: number;
  recastFee?: number;
}

export interface MortgageRecastResult {
  currentMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  newLoanBalance: number;
  totalInterestSaved: number;
  interestRemainingBefore: number;
  interestRemainingAfter: number;
  recastFee: number;
  netSavingsAfterFee: number;
  remainingMonths: number;
  paymentReductionPct: number;
  summary: string;
}

export function formatCurrency(value: number, symbol = "$"): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return value < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function calculateMonthlyPayment(
  principal: number,
  annualRatePct: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function totalInterestRemaining(
  principal: number,
  monthlyPayment: number,
  months: number
): number {
  if (principal <= 0 || months <= 0) return 0;
  return Math.max(0, monthlyPayment * months - principal);
}

export function calculateMortgageRecast(
  input: MortgageRecastInput
): MortgageRecastResult | null {
  const {
    originalLoanAmount,
    currentBalance,
    annualRatePct,
    remainingYears,
    lumpSumPayment,
    recastFee = 0,
  } = input;

  if (
    !Number.isFinite(originalLoanAmount) ||
    originalLoanAmount <= 0 ||
    !Number.isFinite(currentBalance) ||
    currentBalance <= 0 ||
    !Number.isFinite(annualRatePct) ||
    annualRatePct < 0 ||
    !Number.isFinite(remainingYears) ||
    remainingYears <= 0 ||
    !Number.isFinite(lumpSumPayment) ||
    lumpSumPayment <= 0 ||
    lumpSumPayment >= currentBalance ||
    !Number.isFinite(recastFee) ||
    recastFee < 0
  ) {
    return null;
  }

  const remainingMonths = Math.round(remainingYears * 12);
  if (remainingMonths <= 0) return null;

  const currentMonthlyPayment = calculateMonthlyPayment(
    currentBalance,
    annualRatePct,
    remainingMonths
  );
  const newLoanBalance = currentBalance - lumpSumPayment;
  const newMonthlyPayment = calculateMonthlyPayment(
    newLoanBalance,
    annualRatePct,
    remainingMonths
  );

  const interestRemainingBefore = totalInterestRemaining(
    currentBalance,
    currentMonthlyPayment,
    remainingMonths
  );
  const interestRemainingAfter = totalInterestRemaining(
    newLoanBalance,
    newMonthlyPayment,
    remainingMonths
  );
  const totalInterestSaved = interestRemainingBefore - interestRemainingAfter;
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const paymentReductionPct =
    currentMonthlyPayment > 0 ? (monthlySavings / currentMonthlyPayment) * 100 : 0;
  const netSavingsAfterFee = totalInterestSaved - recastFee;

  const summary = `After a ${formatCurrency(lumpSumPayment)} lump-sum recast, your payment drops from ${formatCurrency(Math.round(currentMonthlyPayment))}/mo to ${formatCurrency(Math.round(newMonthlyPayment))}/mo — saving about ${formatCurrency(Math.round(monthlySavings))}/month and ${formatCurrency(Math.round(totalInterestSaved))} in remaining interest.`;

  return {
    currentMonthlyPayment,
    newMonthlyPayment,
    monthlySavings,
    newLoanBalance,
    totalInterestSaved,
    interestRemainingBefore,
    interestRemainingAfter,
    recastFee,
    netSavingsAfterFee,
    remainingMonths,
    paymentReductionPct,
    summary,
  };
}
