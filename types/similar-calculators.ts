// Type definitions for Similar Calculators Component

export interface SimilarCalculator {
  calculatorName: string
  calculatorHref: string
  calculatorDescription?: string
}

export interface SimilarCalculatorsProps {
  calculators: SimilarCalculator[]
  color?: 'green' | 'blue' | 'red' | 'orange' | 'purple' | 'gray' | 'pink' | 'yellow' | 'teal'
  title?: string
  className?: string
}

export type CalculatorColor = 'green' | 'blue' | 'red' | 'orange' | 'purple' | 'gray' | 'pink' | 'yellow' | 'teal'

export interface ColorVariants {
  icon: string
  border: string
  hover: string
  gradient: string
}

// Helper type for calculator categories and their default colors
export interface CategoryColorMap {
  financial: 'green'
  health: 'red'
  maths: 'blue'
  physics: 'yellow'
  construction: 'orange'
  food: 'orange'
  sports: 'blue'
  other: 'gray'
}

// Utility types for calculator data integration
export interface CalculatorDataItem {
  id: string
  name: string
  description: string
  href: string
  category: string
  popular?: boolean
}

export interface SimilarCalculatorFromData {
  calculatorName: CalculatorDataItem['name']
  calculatorHref: CalculatorDataItem['href']
  calculatorDescription?: CalculatorDataItem['description']
}