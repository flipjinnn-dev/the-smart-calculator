import GarageClient from "./garage-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function GarageConversionCostCalculatorPage() {
  return <GarageClient />
}
