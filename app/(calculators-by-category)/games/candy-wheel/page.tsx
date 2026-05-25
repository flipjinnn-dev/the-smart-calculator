import CandyWheelClient from './candy-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("candy-wheel");
}

export default function CandyWheelPage() {
  return <CandyWheelClient />
}
