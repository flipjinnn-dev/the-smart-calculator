import NewbornClient from "./newborn-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function NewbornWeightLossCalculatorPage() {
  return <NewbornClient />
}
