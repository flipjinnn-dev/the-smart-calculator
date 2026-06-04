import LMTDClient from "./lmtd-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function LMTDCalculatorPage() {
  return <LMTDClient />
}
