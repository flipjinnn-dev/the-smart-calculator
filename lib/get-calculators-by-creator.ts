import { calculators, Calculator } from './calculator-data';
import { getCategoryForCreator } from './creator-category-mapping';

/**
 * Get all calculators for a specific creator based on their category
 * @param creatorSlug - The slug of the creator (e.g., 'neo-nicholas')
 * @returns Array of calculators belonging to the creator's category
 */
export function getCalculatorsByCreator(creatorSlug: string): Calculator[] {
  const category = getCategoryForCreator(creatorSlug);
  
  if (!category) {
    return [];
  }
  
  return calculators.filter((calc) => calc.category === category);
}

/**
 * Get calculator count for a specific creator
 * @param creatorSlug - The slug of the creator
 * @returns Number of calculators in the creator's category
 */
export function getCalculatorCountByCreator(creatorSlug: string): number {
  return getCalculatorsByCreator(creatorSlug).length;
}
