import KiteClient from "./kite-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function KiteSizeCalculatorPage() {
  return <KiteClient />
}
