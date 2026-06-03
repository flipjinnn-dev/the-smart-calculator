export const NM_TO_FT_LBS = 0.737562;
export const FT_LBS_TO_NM = 1.355818;

export type ConversionDirection = "nm-to-ft-lbs" | "ft-lbs-to-nm";

export interface TorqueConversionInput {
  value: number;
  direction: ConversionDirection;
  precision: number;
}

export interface TorqueConversionResult {
  inputValue: number;
  inputUnit: "Nm" | "ft-lbs";
  outputValue: number;
  outputUnit: "Nm" | "ft-lbs";
  formula: string;
  precision: number;
}

export function convertTorque(
  input: TorqueConversionInput
): TorqueConversionResult | null {
  const { value, direction, precision } = input;
  if (!Number.isFinite(value) || value < 0) return null;

  const p = Math.min(4, Math.max(0, precision));

  if (direction === "nm-to-ft-lbs") {
    const output = value * NM_TO_FT_LBS;
    return {
      inputValue: value,
      inputUnit: "Nm",
      outputValue: Number(output.toFixed(p)),
      outputUnit: "ft-lbs",
      formula: `${value} Nm × ${NM_TO_FT_LBS} = ${output.toFixed(p)} ft-lbs`,
      precision: p,
    };
  }

  const output = value * FT_LBS_TO_NM;
  return {
    inputValue: value,
    inputUnit: "ft-lbs",
    outputValue: Number(output.toFixed(p)),
    outputUnit: "Nm",
    formula: `${value} ft-lbs × ${FT_LBS_TO_NM} = ${output.toFixed(p)} Nm`,
    precision: p,
  };
}

export const NM_TO_FT_LBS_TABLE: { nm: number; ftLbs: number }[] = [
  { nm: 10, ftLbs: 7.38 },
  { nm: 20, ftLbs: 14.75 },
  { nm: 50, ftLbs: 36.88 },
  { nm: 100, ftLbs: 73.76 },
  { nm: 150, ftLbs: 110.63 },
  { nm: 200, ftLbs: 147.51 },
  { nm: 250, ftLbs: 184.39 },
  { nm: 300, ftLbs: 221.27 },
];

export const FT_LBS_TO_NM_TABLE: { ftLbs: number; nm: number }[] = [
  { ftLbs: 10, nm: 13.56 },
  { ftLbs: 25, nm: 33.9 },
  { ftLbs: 50, nm: 67.79 },
  { ftLbs: 100, nm: 135.58 },
  { ftLbs: 150, nm: 203.37 },
  { ftLbs: 200, nm: 271.16 },
  { ftLbs: 250, nm: 338.95 },
];
