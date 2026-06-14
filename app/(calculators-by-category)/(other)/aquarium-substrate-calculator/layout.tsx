import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

const CALCULATOR_ID = "aquarium-substrate-calculator";


export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata(CALCULATOR_ID);
}

export default function AquariumSubstrateCalculatorLayout({
  children
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
