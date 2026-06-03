export const INCHES_PER_FOOT = 12;

export type TenthsDirection = "feet-to-inches" | "inches-to-feet";

export interface TenthsConversionInput {
  value: number;
  direction: TenthsDirection;
  precision: number;
}

export interface TenthsConversionResult {
  inputValue: number;
  inputUnit: "ft" | "in";
  outputValue: number;
  outputUnit: "in" | "ft";
  formula: string;
  precision: number;
}

export const TENTHS_TO_INCHES_CHART: { feet: number; inches: number }[] = [
  { feet: 0.1, inches: 1.2 },
  { feet: 0.2, inches: 2.4 },
  { feet: 0.3, inches: 3.6 },
  { feet: 0.4, inches: 4.8 },
  { feet: 0.5, inches: 6.0 },
  { feet: 0.6, inches: 7.2 },
  { feet: 0.7, inches: 8.4 },
  { feet: 0.8, inches: 9.6 },
  { feet: 0.9, inches: 10.8 },
  { feet: 1.0, inches: 12.0 },
];

export function convertTenthsToInches(
  input: TenthsConversionInput
): TenthsConversionResult | null {
  const { value, direction, precision } = input;
  if (!Number.isFinite(value) || value < 0) return null;

  const p = Math.min(4, Math.max(0, precision));

  if (direction === "feet-to-inches") {
    const output = value * INCHES_PER_FOOT;
    return {
      inputValue: value,
      inputUnit: "ft",
      outputValue: Number(output.toFixed(p)),
      outputUnit: "in",
      formula: `${value} ft × ${INCHES_PER_FOOT} = ${output.toFixed(p)} in`,
      precision: p,
    };
  }

  const output = value / INCHES_PER_FOOT;
  return {
    inputValue: value,
    inputUnit: "in",
    outputValue: Number(output.toFixed(p)),
    outputUnit: "ft",
    formula: `${value} in ÷ ${INCHES_PER_FOOT} = ${output.toFixed(p)} ft`,
    precision: p,
  };
}
