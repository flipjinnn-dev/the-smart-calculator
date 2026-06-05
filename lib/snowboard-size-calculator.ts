export type HeightUnit = "imperial" | "metric";
export type WeightUnit = "lbs" | "kg";
export type BootSizeSystem = "us" | "uk" | "eu";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type RidingStyle = "all-mountain" | "freestyle" | "powder" | "freeride";
export type GenderOption = "male" | "female" | "unisex";

export interface SnowboardSizeInput {
  heightUnit: HeightUnit;
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  weight: number;
  weightUnit: WeightUnit;
  bootSize: number;
  bootSystem: BootSizeSystem;
  skillLevel: SkillLevel;
  ridingStyle: RidingStyle;
  gender: GenderOption;
}

export interface SnowboardSizeBreakdown {
  baseLength: number;
  weightAdjustment: number;
  skillAdjustment: number;
  styleAdjustment: number;
  genderAdjustment: number;
}

export type BoardWidth = "Narrow" | "Standard" | "Wide";

export interface SnowboardSizeResult {
  heightCm: number;
  weightKg: number;
  bootSizeUs: number;
  recommendedCm: number;
  rangeMin: number;
  rangeMax: number;
  width: BoardWidth;
  breakdown: SnowboardSizeBreakdown;
  skillNote: string;
  styleNote: string;
  recommendation: string;
  widthNote: string;
}

function toCm(input: SnowboardSizeInput): number {
  if (input.heightUnit === "metric") {
    return input.heightCm ?? 0;
  }
  const ft = input.heightFt ?? 0;
  const inches = input.heightIn ?? 0;
  return ft * 30.48 + inches * 2.54;
}

function toKg(weight: number, unit: WeightUnit): number {
  return unit === "kg" ? weight : weight * 0.453592;
}

function bootToUsMen(boot: number, system: BootSizeSystem): number {
  if (system === "us") return boot;
  if (system === "uk") return boot + 1;
  return boot - 33;
}

function skillAdjustment(level: SkillLevel): number {
  switch (level) {
    case "beginner":
      return -4;
    case "intermediate":
      return 0;
    case "advanced":
      return 3;
    case "expert":
      return 5;
  }
}

function ridingStyleAdjustment(style: RidingStyle): number {
  switch (style) {
    case "freestyle":
      return -4;
    case "all-mountain":
      return 0;
    case "powder":
      return 5;
    case "freeride":
      return 4;
  }
}

function weightAdjustment(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  if (heightM <= 0) return 0;
  const bmi = weightKg / (heightM * heightM);
  if (bmi >= 28) return 5;
  if (bmi >= 25) return 3;
  if (bmi <= 18) return -3;
  if (bmi <= 20) return -2;
  return 0;
}

function genderAdjustment(gender: GenderOption): number {
  if (gender === "female") return -2;
  return 0;
}

function widthFromBoot(usMen: number): BoardWidth {
  if (usMen >= 11) return "Wide";
  if (usMen <= 7.5) return "Narrow";
  return "Standard";
}

function skillLabel(level: SkillLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

function styleLabel(style: RidingStyle): string {
  const labels: Record<RidingStyle, string> = {
    "all-mountain": "all-mountain",
    freestyle: "freestyle (park)",
    powder: "powder",
    freeride: "freeride",
  };
  return labels[style];
}

export function calculateSnowboardSize(
  input: SnowboardSizeInput
): SnowboardSizeResult | null {
  const heightCm = toCm(input);
  const weightKg = toKg(input.weight, input.weightUnit);

  if (!Number.isFinite(heightCm) || heightCm < 120 || heightCm > 220) {
    return null;
  }
  if (!Number.isFinite(weightKg) || weightKg < 25 || weightKg > 150) {
    return null;
  }
  if (!Number.isFinite(input.bootSize) || input.bootSize <= 0) {
    return null;
  }

  const baseLength = Math.round(heightCm * 0.85);
  const weightAdj = weightAdjustment(weightKg, heightCm);
  const skillAdj = skillAdjustment(input.skillLevel);
  const styleAdj = ridingStyleAdjustment(input.ridingStyle);
  const genderAdj = genderAdjustment(input.gender);

  const raw = baseLength + weightAdj + skillAdj + styleAdj + genderAdj;
  const recommendedCm = Math.max(120, Math.min(170, Math.round(raw)));

  const rangeMin = Math.max(120, recommendedCm - 3);
  const rangeMax = Math.min(170, recommendedCm + 3);

  const bootSizeUs = Math.round(bootToUsMen(input.bootSize, input.bootSystem) * 2) / 2;
  const width = widthFromBoot(bootSizeUs);

  const skillName = skillLabel(input.skillLevel);
  const styleName = styleLabel(input.ridingStyle);

  const skillNote =
    skillAdj === 0
      ? `${skillName}: baseline length (0 cm adjustment).`
      : `${skillName}: ${skillAdj > 0 ? "+" : ""}${skillAdj} cm applied to base length.`;

  const styleNote =
    styleAdj === 0
      ? `${styleName.charAt(0).toUpperCase() + styleName.slice(1)}: no riding-style adjustment.`
      : `${styleName.charAt(0).toUpperCase() + styleName.slice(1)} riding: ${styleAdj > 0 ? "+" : ""}${styleAdj} cm applied.`;

  const widthNote =
    width === "Wide"
      ? `Wide board recommended for US men's boot size ${bootSizeUs}+ to prevent toe and heel drag.`
      : width === "Narrow"
        ? `Narrow board suits US men's boot size ${bootSizeUs} or smaller for quicker edge-to-edge control.`
        : `Standard width fits US men's boot size ${bootSizeUs} — the most common snowboard width.`;

  let recommendation = `Based on your height, weight, and riding style, a ${rangeMin}–${rangeMax} cm snowboard is recommended. Your ideal target length is ${recommendedCm} cm with a ${width.toLowerCase()} board width.`;

  if (input.ridingStyle === "freestyle") {
    recommendation += ` A freestyle rider may prefer the shorter end of this range (${rangeMin} cm) for better control in the park.`;
  } else if (input.ridingStyle === "powder") {
    recommendation += ` Powder riders often size toward the longer end (${rangeMax} cm) for better float in deep snow.`;
  } else if (input.skillLevel === "beginner") {
    recommendation += ` Beginners should start at the shorter end of the range for easier turning and balance.`;
  }

  return {
    heightCm: Math.round(heightCm),
    weightKg: Math.round(weightKg * 10) / 10,
    bootSizeUs,
    recommendedCm,
    rangeMin,
    rangeMax,
    width,
    breakdown: {
      baseLength,
      weightAdjustment: weightAdj,
      skillAdjustment: skillAdj,
      styleAdjustment: styleAdj,
      genderAdjustment: genderAdj,
    },
    skillNote,
    styleNote,
    recommendation,
    widthNote,
  };
}
