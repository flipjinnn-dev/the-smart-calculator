import BreakEvenRoasCalculatorClient from './break-even-roas-calculator-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";




export default function BreakEvenRoasCalculatorPage() {
  return <BreakEvenRoasCalculatorClient />
}
