export type TreatmentType = "lite" | "moderate" | "comprehensive";

export type FinancingTermMonths = 6 | 12 | 24 | 36;

export interface InvisalignCostInput {
  treatmentType: TreatmentType;
  totalCost: number;
  insuranceBenefit: number;
  downPayment: number;
  financingTermMonths: FinancingTermMonths;
  aprPct?: number;
}

export interface InvisalignCostResult {
  totalTreatmentCost: number;
  insuranceCoverageAmount: number;
  outOfPocketCost: number;
  amountFinanced: number;
  monthlyPayment: number;
  totalFinancingCost: number;
  totalInterestPaid: number;
  treatmentTypeLabel: string;
  summary: string;
}

export const DEFAULT_TOTAL_COST: Record<TreatmentType, number> = {
  lite: 3000,
  moderate: 4500,
  comprehensive: 6500,
};

export const DEFAULT_INSURANCE_BENEFIT = 1500;

export function formatCurrency(value: number, symbol = "$"): string {
  const abs = Math.abs(value);
  const formatted = abs.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return value < 0 ? `-${symbol}${formatted}` : `${symbol}${formatted}`;
}

export function treatmentTypeLabel(type: TreatmentType): string {
  const labels: Record<TreatmentType, string> = {
    lite: "Invisalign Lite",
    moderate: "Invisalign Moderate",
    comprehensive: "Invisalign Comprehensive",
  };
  return labels[type];
}

function calculateMonthlyPayment(principal: number, aprPct: number, months: number): number {
  if (principal <= 0) return 0;
  if (months <= 0) return 0;
  if (aprPct <= 0) return principal / months;

  const r = aprPct / 100 / 12;
  const factor = Math.pow(1 + r, months);
  return (principal * r * factor) / (factor - 1);
}

export function calculateInvisalignCost(input: InvisalignCostInput): InvisalignCostResult | null {
  const {
    totalCost,
    insuranceBenefit,
    downPayment,
    financingTermMonths,
    aprPct = 0,
    treatmentType,
  } = input;

  if (!Number.isFinite(totalCost) || totalCost < 0) return null;
  if (!Number.isFinite(insuranceBenefit) || insuranceBenefit < 0) return null;
  if (!Number.isFinite(downPayment) || downPayment < 0) return null;

  const insuranceCoverageAmount = Math.min(insuranceBenefit, totalCost);
  const outOfPocketCost = Math.max(0, totalCost - insuranceCoverageAmount);
  const amountFinanced = Math.max(0, outOfPocketCost - downPayment);
  const monthlyPayment = calculateMonthlyPayment(amountFinanced, aprPct, financingTermMonths);
  const totalFinancingCost = downPayment + monthlyPayment * financingTermMonths;
  const totalInterestPaid = Math.max(0, totalFinancingCost - outOfPocketCost);

  const label = treatmentTypeLabel(treatmentType);
  const summary = `Based on ${label} treatment at ${formatCurrency(totalCost)}, your out-of-pocket cost is ${formatCurrency(outOfPocketCost)} after ${formatCurrency(insuranceCoverageAmount)} insurance. Estimated monthly payment: ${formatCurrency(Math.round(monthlyPayment))}/month over ${financingTermMonths} months.`;

  return {
    totalTreatmentCost: totalCost,
    insuranceCoverageAmount,
    outOfPocketCost,
    amountFinanced,
    monthlyPayment,
    totalFinancingCost,
    totalInterestPaid,
    treatmentTypeLabel: label,
    summary,
  };
}
