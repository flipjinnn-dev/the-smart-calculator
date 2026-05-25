import CrochetClient from "./crochet-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("crochet-calculator");
}

export default function CrochetCalculatorPage() {
  return <CrochetClient />
}
