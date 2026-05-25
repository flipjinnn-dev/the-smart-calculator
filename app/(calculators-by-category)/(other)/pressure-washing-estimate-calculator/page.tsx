import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import PressureWashingEstimateCalculatorClient from "./pressure-washing-estimate-calculator-client";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("pressure-washing-estimate-calculator");
}

export default function PressureWashingEstimateCalculatorPage() {
  return <PressureWashingEstimateCalculatorClient />;
}
