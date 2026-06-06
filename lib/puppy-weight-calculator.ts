export type BreedSize = "toy" | "small" | "medium" | "large" | "giant";

export type AgeUnit = "weeks" | "months";

export type WeightUnit = "kg" | "lbs";

export type BreedType = "mixed" | "pure";

export type Gender = "male" | "female" | "none";

export interface PuppyWeightInput {
  breedSize: BreedSize;
  age: number;
  ageUnit: AgeUnit;
  currentWeight: number;
  weightUnit: WeightUnit;
  breedType?: BreedType;
  pureBreedName?: string;
  gender?: Gender;
}

export interface GrowthMilestone {
  label: string;
  weightKg: number;
}

export interface PuppyWeightResult {
  ageWeeks: number;
  currentWeightKg: number;
  growthFactor: number;
  estimatedAdultWeightKg: number;
  minWeightKg: number;
  maxWeightKg: number;
  growthCompletionPct: number;
  milestones: GrowthMilestone[];
  breedSizeCategory: string;
  predictedSizeClassification: string;
  fullGrowthMonths: string;
  summary: string;
  weightUnit: WeightUnit;
}

/** Standard veterinary ratio growth factors by breed size */
export const GROWTH_FACTORS: Record<BreedSize, number> = {
  toy: 52,
  small: 52,
  medium: 43,
  large: 36,
  giant: 30,
};

export const MIXED_GROWTH_FACTOR = 45;

export const FULL_GROWTH_MONTHS: Record<BreedSize, string> = {
  toy: "8–10 months",
  small: "10–12 months",
  medium: "12–15 months",
  large: "15–18 months",
  giant: "18–24 months",
};

const COMPLETION_CURVES: Record<BreedSize, [number, number][]> = {
  toy: [
    [8, 45],
    [12, 62],
    [16, 78],
    [24, 92],
    [52, 100],
  ],
  small: [
    [8, 38],
    [12, 52],
    [16, 68],
    [24, 85],
    [52, 100],
  ],
  medium: [
    [8, 25],
    [12, 35],
    [16, 45],
    [24, 62],
    [52, 100],
  ],
  large: [
    [8, 18],
    [12, 28],
    [16, 38],
    [24, 55],
    [52, 100],
  ],
  giant: [
    [8, 12],
    [12, 20],
    [16, 30],
    [24, 45],
    [52, 100],
  ],
};

const KG_PER_LB = 0.453592;

export function ageToWeeks(age: number, unit: AgeUnit): number {
  if (unit === "weeks") return age;
  return age * 4.345;
}

export function toKg(weight: number, unit: WeightUnit): number {
  return unit === "kg" ? weight : weight * KG_PER_LB;
}

export function fromKg(weightKg: number, unit: WeightUnit): number {
  return unit === "kg" ? weightKg : weightKg / KG_PER_LB;
}

export function formatWeight(valueKg: number, unit: WeightUnit = "kg"): string {
  const value = fromKg(valueKg, unit);
  const suffix = unit === "kg" ? "kg" : "lbs";
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} ${suffix}`;
}

export function breedSizeLabel(size: BreedSize): string {
  const labels: Record<BreedSize, string> = {
    toy: "Toy",
    small: "Small",
    medium: "Medium",
    large: "Large",
    giant: "Giant",
  };
  return labels[size];
}

export function growthCompletionPercent(breedSize: BreedSize, ageWeeks: number): number {
  const curve = COMPLETION_CURVES[breedSize];
  if (ageWeeks <= curve[0][0]) return curve[0][1];
  if (ageWeeks >= curve[curve.length - 1][0]) return 100;

  for (let i = 0; i < curve.length - 1; i++) {
    const [w0, p0] = curve[i];
    const [w1, p1] = curve[i + 1];
    if (ageWeeks >= w0 && ageWeeks <= w1) {
      const t = (ageWeeks - w0) / (w1 - w0);
      return p0 + t * (p1 - p0);
    }
  }

  return 100;
}

export function classifyAdultSize(weightKg: number): string {
  if (weightKg < 5) return "Toy";
  if (weightKg < 10) return "Small";
  if (weightKg < 25) return "Medium";
  if (weightKg < 45) return "Large";
  return "Giant";
}

function genderMultiplier(gender: Gender): number {
  if (gender === "male") return 1.02;
  if (gender === "female") return 0.98;
  return 1;
}

function resolveGrowthFactor(breedSize: BreedSize, breedType: BreedType): number {
  if (breedType === "mixed") return MIXED_GROWTH_FACTOR;
  return GROWTH_FACTORS[breedSize];
}

function buildMilestones(
  currentWeightKg: number,
  ageWeeks: number,
  estimatedAdultKg: number
): GrowthMilestone[] {
  const weeklyGain = currentWeightKg / ageWeeks;
  const futureWeeks = [ageWeeks + 4, ageWeeks + 8, ageWeeks + 12].filter((w) => w > ageWeeks);

  const rows: GrowthMilestone[] = futureWeeks.map((w) => ({
    label: `${Math.round(w)} weeks`,
    weightKg: Math.min(weeklyGain * w, estimatedAdultKg * 1.05),
  }));

  rows.push({
    label: "Estimated adult",
    weightKg: estimatedAdultKg,
  });

  return rows;
}

export function calculatePuppyWeight(input: PuppyWeightInput): PuppyWeightResult | null {
  const {
    breedSize,
    age,
    ageUnit,
    currentWeight,
    weightUnit,
    breedType = "pure",
    pureBreedName,
    gender = "none",
  } = input;

  if (!Number.isFinite(age) || age <= 0) return null;
  if (!Number.isFinite(currentWeight) || currentWeight <= 0) return null;

  const ageWeeks = ageToWeeks(age, ageUnit);
  if (ageWeeks < 4 || ageWeeks > 52) return null;

  const currentWeightKg = toKg(currentWeight, weightUnit);
  const growthFactor = resolveGrowthFactor(breedSize, breedType);
  const estimatedAdultWeightKg =
    (currentWeightKg / ageWeeks) * growthFactor * genderMultiplier(gender);

  const rangePct = breedType === "mixed" ? 0.2 : 0.15;
  const minWeightKg = estimatedAdultWeightKg * (1 - rangePct);
  const maxWeightKg = estimatedAdultWeightKg * (1 + rangePct);

  const growthCompletionPct = growthCompletionPercent(breedSize, ageWeeks);
  const milestones = buildMilestones(currentWeightKg, ageWeeks, estimatedAdultWeightKg);
  const predictedSizeClassification = classifyAdultSize(estimatedAdultWeightKg);

  const breedLabel =
    breedType === "mixed"
      ? "mixed breed"
      : pureBreedName?.trim()
        ? pureBreedName.trim()
        : `${breedSizeLabel(breedSize).toLowerCase()} breed`;

  const summary = `Based on a ${Math.round(ageWeeks)}-week-old ${breedLabel} weighing ${formatWeight(currentWeightKg, weightUnit)}, the estimated adult weight is ${formatWeight(estimatedAdultWeightKg, weightUnit)} (healthy range: ${formatWeight(minWeightKg, weightUnit)}–${formatWeight(maxWeightKg, weightUnit)}).`;

  return {
    ageWeeks,
    currentWeightKg,
    growthFactor,
    estimatedAdultWeightKg,
    minWeightKg,
    maxWeightKg,
    growthCompletionPct,
    milestones,
    breedSizeCategory: breedType === "mixed" ? "Mixed breed" : breedSizeLabel(breedSize),
    predictedSizeClassification,
    fullGrowthMonths: FULL_GROWTH_MONTHS[breedSize],
    summary,
    weightUnit,
  };
}
