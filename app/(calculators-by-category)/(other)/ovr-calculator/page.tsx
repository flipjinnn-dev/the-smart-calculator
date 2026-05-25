import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import OVRCalculatorClient from "./OVRCalculatorClient";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("ovr-calculator");
}

export default function OVRCalculatorPage() {
  return <OVRCalculatorClient />
}
