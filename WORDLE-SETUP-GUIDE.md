# Wordle Game Setup Guide

## How to Update Daily Wordle Words

The Wordle game automatically rotates words daily based on the word list. Here's how the system works:

### 📍 Word List Location
**File:** `lib/games/wordle-words.ts`

This file contains:
- `WORDLE_SOLUTIONS[]` - Array of all possible daily answers (currently 100 words)
- `VALID_WORDLE_WORDS[]` - Array of all valid guesses (includes solutions + additional valid words)

### 🔄 How It Works

1. **Start Date:** June 19, 2021 (configurable in `lib/games/wordle-data.ts`)
2. **Daily Rotation:** The system calculates days since start date
3. **Word Selection:** Uses modulo to cycle through the word list
4. **Automatic:** Resets at midnight local time

### ✏️ To Add More Words

**Option 1: Add to Existing Array**
```typescript
export const WORDLE_SOLUTIONS: string[] = [
  "cigar", "rebut", "sissy", // ... existing words
  "newword1", "newword2", "newword3" // Add new words here
];
```

**Option 2: Replace Entire List**
Replace the entire `WORDLE_SOLUTIONS` array with your own word list.

### ⚠️ Important Rules

1. **All words must be exactly 5 letters**
2. **Words should be lowercase in the array**
3. **Add new answer words to both:**
   - `WORDLE_SOLUTIONS` (daily answers)
   - `VALID_WORDLE_WORDS` (so they're accepted as guesses)

### 📅 Current Setup

- **Total Answer Words:** 100
- **Cycles every:** 100 days
- **Current Wordle #:** Calculated from June 19, 2021

### 🎯 Example: Adding 10 New Words

```typescript
export const WORDLE_SOLUTIONS: string[] = [
  // Existing 100 words...
  "cigar", "rebut", "sissy", "humph", "awake",
  
  // Your new 10 words
  "ocean", "beach", "storm", "cloud", "river",
  "mount", "valley", "forest", "desert", "island"
];
```

### 🔍 Word Validation

The game validates guesses against `VALID_WORDLE_WORDS`. Make sure valid words are included there:

```typescript
export const VALID_WORDLE_WORDS: string[] = [
  ...WORDLE_SOLUTIONS, // All solutions are automatically valid
  "about", "above", "abuse", // Additional valid guesses
  // Add more valid 5-letter words that can be guessed but aren't daily answers
];
```

### 🚀 Quick Update Process

1. Open `lib/games/wordle-words.ts`
2. Add words to `WORDLE_SOLUTIONS` array
3. Optionally add more valid guess words to `VALID_WORDLE_WORDS`
4. Save the file
5. Words automatically rotate daily!

### 📊 Wordle Number Calculation

Located in `lib/games/wordle-data.ts`:
```typescript
export const WORDLE_START_DATE = new Date('2021-06-19');

export function getTodayWordleNumber(): number {
  const today = new Date();
  const diffDays = Math.ceil((today - WORDLE_START_DATE) / (1000 * 60 * 60 * 24));
  return diffDays + 1;
}
```

To change the start date, modify `WORDLE_START_DATE`.

### ✅ Best Practices

1. **Use common 5-letter words** - Too obscure and players get frustrated
2. **Avoid proper nouns** - Keep to common nouns, verbs, adjectives
3. **Test new words** - Make sure they're in both arrays
4. **Keep it fair** - Balance easy and difficult words

### 🎮 Game Features

- ✅ Auto-updates at midnight
- ✅ Persistent stats tracking
- ✅ Share functionality
- ✅ Full keyboard support
- ✅ Dark theme UI
- ✅ Mobile responsive
- ✅ Complete word history at `/games/what-is-the-wordle-today`

---

**Need help?** The word rotation is fully automatic. Just maintain the word lists and the system handles the rest!
