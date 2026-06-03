export type HeightUnit = "imperial" | "metric";
export type WeightUnit = "lbs" | "kg";
export type SkierType = "adult" | "junior";
export type Gender = "male" | "female";
export type SkillLevel = "beginner" | "intermediate" | "advanced" | "expert";
export type SkiType =
  | "all-mountain"
  | "carving"
  | "slalom"
  | "powder"
  | "freestyle"
  | "touring"
  | "cross-country";

export interface SkiSizeInput {
  heightUnit: HeightUnit;
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  weight: number;
  weightUnit: WeightUnit;
  skierType: SkierType;
  gender: Gender;
  skillLevel: SkillLevel;
  skiType: SkiType;
}

export interface SkiSizeBreakdown {
  baseLength: number;
  skillAdjustment: number;
  weightAdjustment: number;
  skiTypeAdjustment: number;
}

export interface SkiSizeResult {
  heightCm: number;
  weightKg: number;
  recommendedCm: number;
  rangeMin: number;
  rangeMax: number;
  waistWidthMm: string;
  breakdown: SkiSizeBreakdown;
  summary: string;
  skillNote: string;
  skiTypeNote: string;
  widthNote: string;
  recommendation: string;
  quickTip: string;
}

function toCm(input: SkiSizeInput): number {
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

function skillAdjustment(level: SkillLevel): number {
  switch (level) {
    case "beginner":
      return -15;
    case "intermediate":
      return -7;
    case "advanced":
      return 0;
    case "expert":
      return 5;
  }
}

function weightAdjustment(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  if (heightM <= 0) return 0;
  const bmi = weightKg / (heightM * heightM);
  if (bmi > 27) return 5;
  if (bmi < 19) return -5;
  return 0;
}

function skiTypeAdjustment(type: SkiType): number {
  switch (type) {
    case "carving":
    case "slalom":
      return -5;
    case "freestyle":
      return -10;
    case "powder":
      return 8;
    case "touring":
      return 5;
    case "cross-country":
      return 12;
    case "all-mountain":
    default:
      return 0;
  }
}

function skiTypeLabel(type: SkiType): string {
  const labels: Record<SkiType, string> = {
    "all-mountain": "all-mountain",
    carving: "carving",
    slalom: "slalom",
    powder: "powder",
    freestyle: "freestyle/park",
    touring: "touring",
    "cross-country": "cross-country",
  };
  return labels[type];
}

function skiWidthRecommendation(type: SkiType): string {
  switch (type) {
    case "carving":
    case "slalom":
      return "65–80 mm underfoot (narrow — grip on hard-pack)";
    case "powder":
      return "100–130 mm underfoot (wide — float in deep snow)";
    case "freestyle":
      return "85–100 mm underfoot (balanced park width)";
    case "touring":
      return "85–100 mm underfoot (light for climbing, stable descending)";
    case "cross-country":
      return "44–48 mm classic / 40–45 mm skate (Nordic sizing — length uses separate rules)";
    case "all-mountain":
    default:
      return "85–95 mm underfoot (versatile all-mountain width)";
  }
}

function skillLabel(level: SkillLevel): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}

export function calculateSkiSize(input: SkiSizeInput): SkiSizeResult | null {
  const heightCm = toCm(input);
  const weightKg = toKg(input.weight, input.weightUnit);

  const minHeight = input.skierType === "junior" ? 100 : 130;
  const maxHeight = input.skierType === "junior" ? 180 : 230;
  if (!Number.isFinite(heightCm) || heightCm < minHeight || heightCm > maxHeight) {
    return null;
  }
  if (!Number.isFinite(weightKg) || weightKg < 15 || weightKg > 200) {
    return null;
  }

  const baseMultiplier = input.skierType === "junior" ? 0.75 : 0.875;
  const baseLength = Math.round(heightCm * baseMultiplier);
  const skillAdj = skillAdjustment(input.skillLevel);
  const weightAdj = weightAdjustment(weightKg, heightCm);
  const typeAdj = skiTypeAdjustment(input.skiType);

  let raw = baseLength + skillAdj + weightAdj + typeAdj;
  let recommendedCm = Math.round(raw / 5) * 5;

  if (input.skierType === "junior") {
    recommendedCm = Math.min(140, Math.max(70, recommendedCm));
  }

  const rangeMin = recommendedCm - 5;
  const rangeMax = recommendedCm + 5;

  const typeName = skiTypeLabel(input.skiType);
  const skillName = skillLabel(input.skillLevel);
  const waistWidthMm = skiWidthRecommendation(input.skiType);

  const skillNote =
    skillAdj === 0
      ? `${skillName}: standard length (no skill adjustment).`
      : `${skillName} skiers: ${skillAdj > 0 ? "+" : ""}${skillAdj} cm vs base length.`;

  const skiTypeNote =
    typeAdj === 0
      ? `${typeName} skis: standard length for this height.`
      : `${typeName} skis: ${typeAdj > 0 ? "+" : ""}${typeAdj} cm length adjustment.`;

  const widthNote = `Recommended waist width: ${waistWidthMm}.`;

  const recommendation = `Based on your height, weight, and skiing ability, a ${recommendedCm} cm ${typeName} ski is recommended. A ski length between ${rangeMin} cm and ${rangeMax} cm will provide optimal performance and control.`;

  const quickTip = `Your ideal ski length equals your height in cm minus about 10–25 cm, adjusted for skill, weight, and ski type. At ${Math.round(heightCm)} cm tall, ${recommendedCm} cm (${rangeMin}–${rangeMax} cm range) fits a ${skillName.toLowerCase()} ${typeName} profile.`;

  return {
    heightCm: Math.round(heightCm),
    weightKg: Math.round(weightKg * 10) / 10,
    recommendedCm,
    rangeMin,
    rangeMax,
    waistWidthMm,
    breakdown: {
      baseLength,
      skillAdjustment: skillAdj,
      weightAdjustment: weightAdj,
      skiTypeAdjustment: typeAdj,
    },
    summary: recommendation,
    skillNote,
    skiTypeNote,
    widthNote,
    recommendation,
    quickTip,
  };
}
