import AshtakavargaClient from "./ashtakavarga-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function AshtakavargaCalculatorPage() {
  return <AshtakavargaClient />
}
