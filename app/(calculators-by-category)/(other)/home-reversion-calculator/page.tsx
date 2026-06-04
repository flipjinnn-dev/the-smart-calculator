import HomeReversionClient from "./home-reversion-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";



export default function HomeReversionCalculatorPage() {
  return <HomeReversionClient />
}
