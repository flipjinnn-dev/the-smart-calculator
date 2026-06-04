import ERAClient from "./era-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function ERACalculatorPage() {
  return <ERAClient />
}
