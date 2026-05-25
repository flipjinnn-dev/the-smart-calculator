import BreakEvenRoasCalculatorClient from './break-even-roas-calculator-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("break-even-roas-calculator");
}


export default function BreakEvenRoasCalculatorPage() {
  return <BreakEvenRoasCalculatorClient />
}
