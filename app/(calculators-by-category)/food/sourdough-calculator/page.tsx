import SourdoughClient from "./sourdough-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function SourdoughCalculatorPage() {
  return <SourdoughClient />
}
