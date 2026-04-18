import ChaturbateClient from "./chaturbate-client"

export const metadata = {
  title: "Chaturbate Token Calculator – Convert Tokens to USD/EUR",
  description: "Free Chaturbate token calculator. Convert tokens to USD or EUR instantly. Models earn $0.05 per token. Check 100, 500, 1000 tokens value now.",
  alternates: {
    canonical: "https://www.thesmartcalculator.com/other/chaturbate-token-calculator"
  }
}

export default function ChaturbateTokenCalculatorPage() {
  return <ChaturbateClient />
}
