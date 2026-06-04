import SoffitClient from "./soffit-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function SoffitCalculatorPage() {
  return <SoffitClient />
}
