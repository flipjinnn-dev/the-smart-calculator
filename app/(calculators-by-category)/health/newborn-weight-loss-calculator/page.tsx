import NewbornClient from "./newborn-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("newborn-weight-loss-calculator");
}

export default function NewbornWeightLossCalculatorPage() {
  return <NewbornClient />
}
