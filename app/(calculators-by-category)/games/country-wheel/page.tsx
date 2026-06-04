import CountryWheelClient from './country-client'
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function CountryWheelPage() {
  return <CountryWheelClient />
}
