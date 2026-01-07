import { useState, useEffect, useCallback } from 'react';
import { checkGuess } from '@/lib/games/wordle-data';
import { isValidGuess } from '@/lib/games/wordle-words';

export type LetterState = 'correct' | 'present' | 'absent' | 'empty';

export interface WordleGuess {
  word: string;
  states: LetterState[];
}

export interface WordleGameState {
  guesses: WordleGuess[];
  currentGuess: string;
  gameStatus: 'playing' | 'won' | 'lost';
  currentRow: number;
  solution: string;
  keyboardState: Record<string, LetterState>;
}

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export function useWordle(solution: string, wordleNumber: number) {
  const [gameState, setGameState] = useState<WordleGameState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`wordle-${wordleNumber}`);
      if (saved) {
        return JSON.parse(saved);
      }
    }
    
    return {
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      currentRow: 0,
      solution: solution,
      keyboardState: {},
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wordle-${wordleNumber}`, JSON.stringify(gameState));
    }
  }, [gameState, wordleNumber]);

  const addLetter = useCallback((letter: string) => {
    if (gameState.gameStatus !== 'playing') return;
    if (gameState.currentGuess.length >= WORD_LENGTH) return;

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter.toLowerCase(),
    }));
  }, [gameState.gameStatus, gameState.currentGuess.length]);

  const deleteLetter = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return;
    
    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1),
    }));
  }, [gameState.gameStatus]);

  const submitGuess = useCallback(() => {
    if (gameState.gameStatus !== 'playing') return null;
    if (gameState.currentGuess.length !== WORD_LENGTH) return 'TOO_SHORT';
    if (!isValidGuess(gameState.currentGuess)) return 'INVALID_WORD';

    const states = checkGuess(gameState.currentGuess, gameState.solution);
    const newGuess: WordleGuess = {
      word: gameState.currentGuess,
      states,
    };

    // Priority: correct (green) > present (yellow) > absent (gray)
    const newKeyboardState = { ...gameState.keyboardState };
    
    // First pass: apply 'correct' states to ensure they have highest priority
    for (let i = 0; i < gameState.currentGuess.length; i++) {
      const letter = gameState.currentGuess[i];
      if (states[i] === 'correct') {
        newKeyboardState[letter] = 'correct';
      }
    }
    
    // Second pass: apply 'present' and 'absent' states, respecting priority
    for (let i = 0; i < gameState.currentGuess.length; i++) {
      const letter = gameState.currentGuess[i];
      const currentState = newKeyboardState[letter];
      const newState = states[i];
      
      // Only update if:
      // 1. The key has no state yet, or
      // 2. Current state is 'absent' and new state is 'present'
      // Never overwrite 'correct' states
      if (!currentState || 
          (currentState === 'absent' && newState === 'present')) {
        newKeyboardState[letter] = newState;
      }
    }

    const isWin = gameState.currentGuess.toLowerCase() === gameState.solution.toLowerCase();
    const isGameOver = gameState.currentRow + 1 >= MAX_GUESSES;
    const newGameStatus = isWin ? 'won' : (isGameOver ? 'lost' : 'playing');

    setGameState(prev => ({
      ...prev,
      guesses: [...prev.guesses, newGuess],
      currentGuess: '',
      currentRow: prev.currentRow + 1,
      gameStatus: newGameStatus,
      keyboardState: newKeyboardState,
    }));

    return 'SUCCESS';
  }, [gameState]);

  const resetGame = useCallback(() => {
    setGameState({
      guesses: [],
      currentGuess: '',
      gameStatus: 'playing',
      currentRow: 0,
      solution: solution,
      keyboardState: {},
    });
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`wordle-${wordleNumber}`);
    }
  }, [solution, wordleNumber]);

  return {
    gameState,
    addLetter,
    deleteLetter,
    submitGuess,
    resetGame,
    MAX_GUESSES,
    WORD_LENGTH,
  };
}
