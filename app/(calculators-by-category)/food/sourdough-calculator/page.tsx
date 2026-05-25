import SourdoughClient from "./sourdough-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("sourdough-calculator");
}

export default function SourdoughCalculatorPage() {
  return <SourdoughClient />
}
