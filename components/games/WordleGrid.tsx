'use client'
import { LetterState, WordleGuess } from "@/hooks/useWordle";
import { useState, useEffect } from "react";

interface WordleGridProps {
  guesses: WordleGuess[];
  currentGuess: string;
  currentRow: number;
  maxGuesses: number;
  wordLength: number;
  invalidGuess?: boolean;
}

export function WordleGrid({ guesses, currentGuess, currentRow, maxGuesses, wordLength, invalidGuess }: WordleGridProps) {
  const [flipAnimations, setFlipAnimations] = useState<boolean[][]>(Array(maxGuesses).fill(null).map(() => Array(wordLength).fill(false)));
  const [shakeAnimation, setShakeAnimation] = useState(false);
  
  useEffect(() => {
    // Reset animations when a new guess is submitted
    if (guesses.length > 0) {
      const lastGuessIndex = guesses.length - 1;
      
      // Trigger flip animations with delays for each letter
      const newFlipAnimations = [...flipAnimations];
      
      for (let i = 0; i < wordLength; i++) {
        setTimeout(() => {
          setFlipAnimations(prev => {
            const newState = [...prev];
            if (newState[lastGuessIndex]) {
              newState[lastGuessIndex][i] = true;
            }
            return newState;
          });
        }, i * 300); // 300ms delay between each letter
      }
    }
  }, [guesses.length]);
  
  useEffect(() => {
    // Trigger shake animation for invalid guesses
    if (invalidGuess) {
      setShakeAnimation(true);
      const timer = setTimeout(() => setShakeAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [invalidGuess]);
  
  if (!guesses) return null;
  
  const emptyRows = maxGuesses - guesses.length - (currentGuess ? 1 : 0);

  const getLetterClass = (state: LetterState) => {
    switch (state) {
      case 'correct':
        return 'bg-[#538d4e] border-[#538d4e] text-white';
      case 'present':
        return 'bg-[#b59f3b] border-[#b59f3b] text-white';
      case 'absent':
        return 'bg-[#3a3a3c] border-[#3a3a3c] text-white';
      default:
        return 'bg-transparent border-[#3a3a3c]';
    }
  };

  return (
    <div className="grid gap-1 mb-6">
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-1">
          {guess.word.split('').map((letter, colIndex) => (
            <div
              key={colIndex}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase transition-all ${flipAnimations[rowIndex] && flipAnimations[rowIndex][colIndex] ? 'flip-reveal' : ''} ${getLetterClass(guess.states[colIndex])}`}
            >
              {letter}
            </div>
          ))}
        </div>
      ))}

      {currentGuess && (
        <div className={`grid grid-cols-5 gap-1 ${shakeAnimation ? 'shake-animation' : ''}`}>
          {Array.from({ length: wordLength }).map((_, colIndex) => (
            <div
              key={colIndex}
              className={`w-14 h-14 sm:w-16 sm:h-16 border-2 flex items-center justify-center text-2xl sm:text-3xl font-bold uppercase transition-all text-white ${
                colIndex < currentGuess.length
                  ? 'border-[#565758] bg-transparent animate-pulse'
                  : 'border-[#3a3a3c] bg-transparent'
              }`}
            >
              {currentGuess[colIndex] || ''}
            </div>
          ))}
        </div>
      )}

      {Array.from({ length: emptyRows }).map((_, rowIndex) => (
        <div key={`empty-${rowIndex}`} className="grid grid-cols-5 gap-1">
          {Array.from({ length: wordLength }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-[#3a3a3c] bg-transparent flex items-center justify-center"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
