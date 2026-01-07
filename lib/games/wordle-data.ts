export interface WordleData {
  number: number;
  date: string;
  solution: string;
}

export const WORDLE_START_DATE = new Date('2021-06-19');

export function getTodayWordleNumber(): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(WORDLE_START_DATE);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(today.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays + 1;
}

export function getWordleNumberForDate(date: Date): number {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  const start = new Date(WORDLE_START_DATE);
  start.setHours(0, 0, 0, 0);
  
  const diffTime = Math.abs(targetDate.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays + 1;
}

export function getDateForWordleNumber(number: number): Date {
  const date = new Date(WORDLE_START_DATE);
  date.setDate(date.getDate() + (number - 1));
  return date;
}

export function isValidWord(word: string, validWords: string[]): boolean {
  return validWords.includes(word.toLowerCase());
}

export function checkGuess(guess: string, solution: string): ('correct' | 'present' | 'absent')[] {
  const result: ('correct' | 'present' | 'absent')[] = [];
  const solutionArray = solution.toLowerCase().split('');
  const guessArray = guess.toLowerCase().split('');
  
  const solutionLetterCount: Record<string, number> = {};
  solutionArray.forEach(letter => {
    solutionLetterCount[letter] = (solutionLetterCount[letter] || 0) + 1;
  });
  
  const tempCounts = { ...solutionLetterCount };
  
  for (let i = 0; i < guessArray.length; i++) {
    if (guessArray[i] === solutionArray[i]) {
      result[i] = 'correct';
      tempCounts[guessArray[i]]--;
    }
  }
  
  for (let i = 0; i < guessArray.length; i++) {
    if (result[i] === 'correct') continue;
    
    if (solutionArray.includes(guessArray[i]) && tempCounts[guessArray[i]] > 0) {
      result[i] = 'present';
      tempCounts[guessArray[i]]--;
    } else {
      result[i] = 'absent';
    }
  }
  
  return result;
}
