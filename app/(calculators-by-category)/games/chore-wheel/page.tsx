import ChoreWheelClient from './chore-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function ChoreWheelPage() {
  return <ChoreWheelClient />
}
