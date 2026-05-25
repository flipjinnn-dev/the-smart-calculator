import ChaturbateClient from "./chaturbate-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalculatorMetadata("chaturbate-token-calculator");
}


export default function ChaturbateTokenCalculatorPage() {
  return <ChaturbateClient />
}
