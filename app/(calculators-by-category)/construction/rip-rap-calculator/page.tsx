import RipRapClient from "./rip-rap-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function RipRapCalculatorPage() {
  return <RipRapClient />
}
