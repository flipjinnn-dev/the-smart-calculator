import CombinationClient from "./combination-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function CombinationSumCalculatorPage() {
  return <CombinationClient />
}
