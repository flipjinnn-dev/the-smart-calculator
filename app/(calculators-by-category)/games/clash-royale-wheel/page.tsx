import ClashRoyaleWheelClient from './clash-royale-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("clash-royale-wheel");
}

export default function ClashRoyaleWheelPage() {
  return <ClashRoyaleWheelClient />
}
