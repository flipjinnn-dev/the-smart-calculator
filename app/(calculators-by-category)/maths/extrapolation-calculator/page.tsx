import ExtrapolationClient from "./extrapolation-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("extrapolation-calculator");
}

export default function ExtrapolationCalculatorPage() {
  return <ExtrapolationClient />
}
