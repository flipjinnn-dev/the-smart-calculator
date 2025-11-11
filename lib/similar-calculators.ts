import { calculators, type Calculator } from "@/lib/calculator-data"
import type { SimilarCalculator, SimilarCalculatorId, CategoryColorMap, CalculatorColor } from "@/types/similar-calculators"

// Category to color mapping
const categoryColors: CategoryColorMap = {
  financial: 'green',
  health: 'red', 
  maths: 'blue',
  physics: 'yellow',
  construction: 'orange',
  food: 'orange',
  sports: 'blue',
  other: 'gray'
}

/**
 * Get similar calculators from the same category
 * @param currentCalculatorId - ID of the current calculator to exclude
 * @param category - Category to filter by
 * @param limit - Maximum number of calculators to return (default: 3)
 * @returns Array of similar calculator ID objects (will be localized by component)
 */
export function getSimilarCalculatorsByCategory(
  currentCalculatorId: string,
  category: string,
  limit: number = 3
): SimilarCalculatorId[] {
  return calculators
    .filter(calc => calc.category === category && calc.id !== currentCalculatorId)
    .slice(0, limit)
    .map(calc => ({
      id: calc.id,
      category: calc.category
    }))
}

/**
 * Get popular calculators from the same category
 * @param currentCalculatorId - ID of the current calculator to exclude
 * @param category - Category to filter by  
 * @param limit - Maximum number of calculators to return (default: 3)
 * @returns Array of popular similar calculator ID objects (will be localized by component)
 */
export function getPopularSimilarCalculators(
  currentCalculatorId: string,
  category: string,
  limit: number = 3
): SimilarCalculatorId[] {
  return calculators
    .filter(calc => 
      calc.category === category && 
      calc.id !== currentCalculatorId && 
      calc.popular === true
    )
    .slice(0, limit)
    .map(calc => ({
      id: calc.id,
      category: calc.category
    }))
}

/**
 * Get calculators by specific IDs
 * @param calculatorIds - Array of calculator IDs to include
 * @returns Array of calculator ID objects (will be localized by component)
 */
export function getSimilarCalculatorsByIds(calculatorIds: string[]): SimilarCalculatorId[] {
  const foundCalculators = calculators.filter(calc => calculatorIds.includes(calc.id))
  return foundCalculators.map(calc => ({
    id: calc.id,
    category: calc.category
  }))
}

/**
 * Get cross-category similar calculators (e.g., health + financial for BMI + insurance)
 * @param currentCalculatorId - ID of the current calculator to exclude
 * @param categories - Array of categories to include
 * @param limit - Maximum number of calculators to return (default: 3)
 * @returns Array of similar calculator ID objects (will be localized by component)
 */
export function getCrossCategorySimilarCalculators(
  currentCalculatorId: string,
  categories: string[],
  limit: number = 3
): SimilarCalculatorId[] {
  return calculators
    .filter(calc => 
      categories.includes(calc.category) && 
      calc.id !== currentCalculatorId
    )
    .slice(0, limit)
    .map(calc => ({
      id: calc.id,
      category: calc.category
    }))
}

/**
 * Get the recommended color for a calculator category
 * @param category - Calculator category
 * @returns Recommended color theme
 */
export function getCategoryColor(category: string): CalculatorColor {
  return categoryColors[category as keyof CategoryColorMap] || 'blue'
}

/**
 * Generate curated similar calculators for specific calculator types
 * Returns calculator IDs that will be automatically localized by the component
 */
export const curatedSimilarCalculators = {
  // Financial calculator relationships
  mortgage: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'loan', 'house-affordability-calculator', 'mortgage-payoff-calculator'
  ]),
  
  loan: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'mortgage', 'auto-loan', 'payment'
  ]),
  
  investment: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'compound-interest', 'retirement', 'savings-calculator'
  ]),
  
  // Health calculator relationships  
  bmi: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'ideal-weight', 'body-fat', 'calorie'
  ]),
  
  calorie: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'bmr', 'macro', 'tdee-calculator'
  ]),
  
  pregnancy: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'due-date-calculator', 'ovulation-calculator', 'conception-calculator'
  ]),
  
  // Math calculator relationships
  percentage: (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'random-number-generator', 'scientific-calculator', 'volume-calculator'
  ]),
  
  // Construction calculator relationships
  'board-foot': (): SimilarCalculatorId[] => getSimilarCalculatorsByIds([
    'cubic-yard', 'square-feet-to-cubic-yards', 'size-to-weight-rectangular-cuboid'
  ]),
}

/**
 * Smart similar calculator suggestions based on calculator ID
 * @param calculatorId - Current calculator ID
 * @param fallbackCategory - Category to use if no curated list exists
 * @param limit - Maximum number to return
 * @returns Array of intelligently selected similar calculator IDs (will be localized by component)
 */
export function getSmartSimilarCalculators(
  calculatorId: string,
  fallbackCategory?: string,
  limit: number = 3
): SimilarCalculatorId[] {
  // Check if we have curated suggestions for this calculator
  const curatedFunction = curatedSimilarCalculators[calculatorId as keyof typeof curatedSimilarCalculators]
  
  if (curatedFunction) {
    return curatedFunction().slice(0, limit)
  }
  
  // Fallback to category-based suggestions
  if (fallbackCategory) {
    return getSimilarCalculatorsByCategory(calculatorId, fallbackCategory, limit)
  }
  
  // Find the calculator and use its category
  const calculator = calculators.find(calc => calc.id === calculatorId)
  if (calculator) {
    return getSimilarCalculatorsByCategory(calculatorId, calculator.category, limit)
  }
  
  return []
}