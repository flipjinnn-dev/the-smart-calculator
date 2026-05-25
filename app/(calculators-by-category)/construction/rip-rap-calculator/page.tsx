import RipRapClient from "./rip-rap-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("rip-rap-calculator");
}

export default function RipRapCalculatorPage() {
  return <RipRapClient />
}
