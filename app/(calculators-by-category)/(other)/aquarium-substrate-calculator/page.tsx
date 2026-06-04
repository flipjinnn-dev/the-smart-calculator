import AquariumClient from "./aquarium-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function AquariumSubstrateCalculatorPage() {
  return <AquariumClient />
}
