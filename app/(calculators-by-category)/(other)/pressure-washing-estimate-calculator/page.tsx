import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import PressureWashingEstimateCalculatorClient from "./pressure-washing-estimate-calculator-client";



export default function PressureWashingEstimateCalculatorPage() {
  return <PressureWashingEstimateCalculatorClient />;
}
