import CountryWheelClient from './country-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("country-wheel");
}

export default function CountryWheelPage() {
  return <CountryWheelClient />
}
