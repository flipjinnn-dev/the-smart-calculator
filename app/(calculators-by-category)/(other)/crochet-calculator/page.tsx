import CrochetClient from "./crochet-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function CrochetCalculatorPage() {
  return <CrochetClient />
}
