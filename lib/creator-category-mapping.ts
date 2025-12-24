/**
 * Maps creator slugs to their respective calculator categories
 * This allows calculators to automatically appear on their category creator's profile
 */

export const CREATOR_CATEGORY_MAPPING: Record<string, string> = {
  'jessica-adam': 'food',
  'neo-nicholas': 'financial',
  'antonio-ares': 'sports',
  'realynn-reed': 'physics',
  'hudson-hale': 'construction',
  'simon-stephen': 'health',
  'felix-yacoub': 'maths',
  'aiden-asher': 'other-calculators',
};

/**
 * Reverse mapping: category to creator slug
 */
export const CATEGORY_TO_CREATOR: Record<string, string> = {
  'food': 'jessica-adam',
  'financial': 'neo-nicholas',
  'sports': 'antonio-ares',
  'physics': 'realynn-reed',
  'construction': 'hudson-hale',
  'health': 'simon-stephen',
  'maths': 'felix-yacoub',
  'other-calculators': 'aiden-asher',
};

/**
 * Get the creator slug for a given category
 */
export function getCreatorForCategory(category: string): string | undefined {
  return CATEGORY_TO_CREATOR[category];
}

/**
 * Get the category for a given creator slug
 */
export function getCategoryForCreator(creatorSlug: string): string | undefined {
  return CREATOR_CATEGORY_MAPPING[creatorSlug];
}
