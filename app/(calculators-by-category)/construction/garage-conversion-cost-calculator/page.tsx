import GarageClient from "./garage-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("garage-conversion-cost-calculator");
}

export default function GarageConversionCostCalculatorPage() {
  return <GarageClient />
}
