import FixFlipClient from "./fix-flip-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("fix-and-flip-calculator");
}

export default function FixAndFlipCalculatorPage() {
  return <FixFlipClient />
}
