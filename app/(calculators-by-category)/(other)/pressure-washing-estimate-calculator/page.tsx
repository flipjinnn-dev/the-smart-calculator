import { Metadata } from "next";
import PressureWashingEstimateCalculatorClient from "./pressure-washing-estimate-calculator-client";

export const metadata: Metadata = {
  title: "Pressure Washing Estimate Calculator | Free & Instant",
  description: "Use our free pressure washing estimate calculator for instant costs per sq ft. Perfect for driveway, commercial & house washing. Try our cost estimator now!",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/pressure-washing-estimate-calculator"
  }
};

export default function PressureWashingEstimateCalculatorPage() {
  return <PressureWashingEstimateCalculatorClient />;
}
