import CelebrityWheelClient from './celebrity-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function CelebrityWheelPage() {
  return <CelebrityWheelClient />
}
