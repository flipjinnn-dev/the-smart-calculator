import wordleHistoryData from './wordle-history.json';


// Define the shape of the history items from the JSON file
export interface WordleHistoryItem {
  number: number;
  date: string; // Format: "Jun 19 2021"
  word: string;
}

const HISTORY: WordleHistoryItem[] = wordleHistoryData as WordleHistoryItem[];

// Create a Set of valid words for O(1) lookup
const VALID_WORDS = new Set(HISTORY.map(h => h.word.toLowerCase()));

// Kept for reference or fallback math if absolutely needed
export const WORDLE_START_DATE = new Date('2021-06-19');

// Helper to format date to match JSON format "MMM D YYYY" (e.g., "Jun 19 2021")
function formatDateForLookup(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const d = date.getDate();
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  return `${m} ${d} ${y}`;
}

export function getTodayWordleNumber(): number {
  const todayStr = formatDateForLookup(new Date());
  const found = HISTORY.find(h => h.date === todayStr);

  if (found) {
    return found.number;
  }

  // Fallback: return the last available number in the history
  return HISTORY.length > 0 ? HISTORY[HISTORY.length - 1].number : 0;
}

/**
 * Get today's Wordle answer from local history
 */
export async function getTodaysWordleAnswer(): Promise<string> {
  // Use local history JSON
  const todayStr = formatDateForLookup(new Date());
  const found = HISTORY.find(h => h.date === todayStr);

  if (found) {
    return found.word.toLowerCase();
  }

  // Fallback to last word if today not found
  return HISTORY.length > 0 ? HISTORY[HISTORY.length - 1].word.toLowerCase() : 'start';
}

export function getWordleAnswer(number: number): string {
  const found = HISTORY.find(h => h.number === number);
  return found ? found.word.toLowerCase() : '';
}

export function getDateForWordleNumber(number: number): Date {
  const found = HISTORY.find(h => h.number === number);
  if (found) {
    return new Date(found.date);
  }
  // Fallback calculation if not in JSON (shouldn't happen with full history)
  const date = new Date(WORDLE_START_DATE);
  date.setDate(date.getDate() + number);
  return date;
}

export function isValidGuess(word: string): boolean {
  return VALID_WORDS.has(word.toLowerCase());
}

export function getAllWordleHistory(): WordleHistoryItem[] {
  // Return the history array directly
  return HISTORY;
}

export function checkGuess(guess: string, solution: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = new Array(guess.length).fill('absent');
  const solutionArray = solution.toLowerCase().split('');
  const guessArray = guess.toLowerCase().split('');

  // Count frequency of letters in solution
  const solutionLetterCount: Record<string, number> = {};
  solutionArray.forEach(letter => {
    solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
  });

  // First pass: Find exact matches (Green)
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      result[i] = 'correct';
      solutionLetterCount[guessArray[i]]--;
    }
  }

  // Second pass: Find partial matches (Yellow)
  for (let i = 0; i < guessArray.length; i++) {
    if (result[i] === 'correct') continue; // Skip already marked green

    const letter = guessArray[i];
    if (solutionLetterCount[letter] > 0) {
      result[i] = 'present';
      solutionLetterCount[letter]--;
    } else {
      result[i] = 'absent';
    }
  }

  return result;
}
