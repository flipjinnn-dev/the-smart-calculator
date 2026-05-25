import ERAClient from "./era-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("era-calculator");
}

export default function ERACalculatorPage() {
  return <ERAClient />
}
