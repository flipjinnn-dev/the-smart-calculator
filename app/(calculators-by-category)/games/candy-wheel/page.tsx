import CandyWheelClient from './candy-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function CandyWheelPage() {
  return <CandyWheelClient />
}
