import { Metadata } from 'next'
import BreakEvenRoasCalculatorClient from './break-even-roas-calculator-client'

export const metadata: Metadata = {
  title: 'Break-Even ROAS Calculator | Calculate Your Advertising Profitability',
  description: 'Calculate your Break-Even ROAS (Return on Ad Spend) and Target ROAS based on your Gross Margin. Stop losing money on ads with this tool.',
  alternates: {
    canonical: '/business/break-even-roas-calculator',
  },
}

export default function BreakEvenRoasCalculatorPage() {
  return <BreakEvenRoasCalculatorClient />
}
