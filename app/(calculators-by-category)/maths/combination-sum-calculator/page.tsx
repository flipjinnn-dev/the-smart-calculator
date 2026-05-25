import CombinationClient from "./combination-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("combination-sum-calculator");
}

export default function CombinationSumCalculatorPage() {
  return <CombinationClient />
}
