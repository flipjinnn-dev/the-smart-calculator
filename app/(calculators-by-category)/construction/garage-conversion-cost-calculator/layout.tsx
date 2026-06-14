import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "garage-conversion-cost-calculator";


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function GarageConversionCostCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
