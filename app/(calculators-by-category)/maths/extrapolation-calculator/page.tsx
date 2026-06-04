import ExtrapolationClient from "./extrapolation-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function ExtrapolationCalculatorPage() {
  return <ExtrapolationClient />
}
