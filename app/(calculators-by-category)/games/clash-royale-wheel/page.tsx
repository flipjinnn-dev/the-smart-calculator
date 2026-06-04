import ClashRoyaleWheelClient from './clash-royale-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function ClashRoyaleWheelPage() {
  return <ClashRoyaleWheelClient />
}
