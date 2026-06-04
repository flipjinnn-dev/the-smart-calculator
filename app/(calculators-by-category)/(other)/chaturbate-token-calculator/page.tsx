import ChaturbateClient from "./chaturbate-client"
import type { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/calculator-page-runtime";




export default function ChaturbateTokenCalculatorPage() {
  return <ChaturbateClient />
}
