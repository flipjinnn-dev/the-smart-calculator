import CelebrityWheelClient from './celebrity-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("celebrity-wheel");
}

export default function CelebrityWheelPage() {
  return <CelebrityWheelClient />
}
