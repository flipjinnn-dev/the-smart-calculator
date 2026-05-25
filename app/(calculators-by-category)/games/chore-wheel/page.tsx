import ChoreWheelClient from './chore-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("chore-wheel");
}

export default function ChoreWheelPage() {
  return <ChoreWheelClient />
}
