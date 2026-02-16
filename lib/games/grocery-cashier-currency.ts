export interface CurrencyDenomination {
  value: number
  type: "bill" | "coin"
  label: string
  color: string
  emoji: string
}

export const CURRENCY: CurrencyDenomination[] = [
  // Bills
  { value: 100, type: "bill", label: "$100", color: "bg-green-100 border-green-400", emoji: "💵" },
  { value: 50, type: "bill", label: "$50", color: "bg-purple-100 border-purple-400", emoji: "💵" },
  { value: 20, type: "bill", label: "$20", color: "bg-yellow-100 border-yellow-400", emoji: "💵" },
  { value: 10, type: "bill", label: "$10", color: "bg-orange-100 border-orange-400", emoji: "💵" },
  { value: 5, type: "bill", label: "$5", color: "bg-blue-100 border-blue-400", emoji: "💵" },
  { value: 1, type: "bill", label: "$1", color: "bg-gray-100 border-gray-400", emoji: "💵" },
  
  // Coins
  { value: 0.25, type: "coin", label: "25¢", color: "bg-slate-200 border-slate-400", emoji: "🪙" },
  { value: 0.10, type: "coin", label: "10¢", color: "bg-amber-200 border-amber-400", emoji: "🪙" },
  { value: 0.05, type: "coin", label: "5¢", color: "bg-zinc-200 border-zinc-400", emoji: "🪙" },
  { value: 0.01, type: "coin", label: "1¢", color: "bg-red-200 border-red-400", emoji: "🪙" },
]

export function calculateMinimumChange(amount: number): Map<number, number> {
  const change = new Map<number, number>()
  let remaining = Math.round(amount * 100) / 100
  
  const denominations = [...CURRENCY].sort((a, b) => b.value - a.value)
  
  for (const denom of denominations) {
    if (remaining >= denom.value - 0.001) {
      const count = Math.floor(remaining / denom.value)
      if (count > 0) {
        change.set(denom.value, count)
        remaining = Math.round((remaining - count * denom.value) * 100) / 100
      }
    }
  }
  
  return change
}

export function isValidChange(selectedChange: Map<number, number>, requiredAmount: number): boolean {
  let total = 0
  selectedChange.forEach((count, value) => {
    total += count * value
  })
  
  const difference = Math.abs(total - requiredAmount)
  return difference < 0.01 // Allow for floating point errors
}

export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}
