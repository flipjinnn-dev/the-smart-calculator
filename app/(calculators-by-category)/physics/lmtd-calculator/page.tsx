import LMTDClient from "./lmtd-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("lmtd-calculator");
}

export default function LMTDCalculatorPage() {
  return <LMTDClient />
}
