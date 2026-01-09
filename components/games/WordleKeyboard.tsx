'use client'

import { LetterState } from "@/hooks/useWordle";
import { Delete } from "lucide-react";

interface WordleKeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onSubmit: () => void;
  keyboardState: Record<string, LetterState>;
  disabled?: boolean;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

// Keyboard state priority: correct (green) > present (yellow) > absent (gray)
export function WordleKeyboard({ onKeyPress, onDelete, onSubmit, keyboardState, disabled }: WordleKeyboardProps) {
  // Function to get key class based on state priority
  const getKeyClass = (key: string) => {
    if (key === 'ENTER' || key === 'DELETE') {
      return 'bg-[#818384] hover:bg-[#939598] text-white font-bold';
    }

    const state = keyboardState[key.toLowerCase()];
    switch (state) {
      case 'correct':
        return 'bg-[#538d4e] hover:bg-[#6aaa64] text-white'; // Green - highest priority
      case 'present':
        return 'bg-[#b59f3b] hover:bg-[#c9b458] text-white'; // Yellow - medium priority
      case 'absent':
        return 'bg-[#3a3a3c] hover:bg-[#4a4a4c] text-white'; // Gray - lowest priority
      default:
        return 'bg-[#818384] hover:bg-[#939598] text-white'; // Default gray for unused keys
    }
  };

  const handleKeyClick = (key: string) => {
    if (disabled) return;
    
    if (key === 'ENTER') {
      onSubmit();
    } else if (key === 'DELETE') {
      onDelete();
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="space-y-1.5">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-1.5">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKeyClick(key)}
              disabled={disabled}
              className={`${getKeyClass(key)} ${
                key === 'ENTER' || key === 'DELETE' ? 'px-3 sm:px-4 text-xs sm:text-sm' : 'w-8 sm:w-10 h-12 sm:h-14'
              } rounded font-bold uppercase transition-all duration-150 flex items-center justify-center disabled:opacity-50`}
            >
              {key === 'DELETE' ? <Delete className="w-4 h-4" /> : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
