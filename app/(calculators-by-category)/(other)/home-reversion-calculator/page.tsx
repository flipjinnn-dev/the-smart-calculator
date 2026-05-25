import HomeReversionClient from "./home-reversion-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("home-reversion-calculator");
}

export default function HomeReversionCalculatorPage() {
  return <HomeReversionClient />
}
