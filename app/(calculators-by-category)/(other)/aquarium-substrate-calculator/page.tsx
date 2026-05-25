import AquariumClient from "./aquarium-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("aquarium-substrate-calculator");
}

export default function AquariumSubstrateCalculatorPage() {
  return <AquariumClient />
}
