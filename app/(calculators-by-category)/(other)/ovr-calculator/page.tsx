import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";
import OVRCalculatorClient from "./OVRCalculatorClient";



export default function OVRCalculatorPage() {
  return <OVRCalculatorClient />
}
