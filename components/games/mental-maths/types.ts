export type Operation = 'ADD' | 'SUBTRACT' | 'MULTIPLY' | 'DIVIDE';
export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export interface NumberRange {
    min: number;
    max: number;
}

export type GameMode = 'TRAINING' | 'CLASSIC' | 'SURVIVAL';

export interface GameConfig {
    mode: GameMode;
    difficulty?: Difficulty;
    operations: Operation[];
    range1: NumberRange;
    range2: NumberRange;
    timeLimit: number | null; // seconds, null for unlimited
}

export interface Question {
    id: string;
    text: string;
    answer: number;
    position?: { top: number; left: number }; // For Survival Mode
    createdAt?: number;
}

export interface QuestionHistoryItem {
    question: Question;
    userAnswer: string;
    isCorrect: boolean;
    timestamp: number;
}

export type GameStatus = 'MENU' | 'TRAINING_CONFIG' | 'MODE_SELECT' | 'PRACTICE_PLAYING' | 'CLASSIC_PLAYING' | 'SURVIVAL_PLAYING' | 'GAME_OVER';

export interface GameState {
    status: GameStatus;
    config: GameConfig;
    score: number;
    lives: number;
    timeLeft: number;
    activeQuestions: Question[]; // Changed from currentQuestion because Survival has multiple
    history: QuestionHistoryItem[];
    highScore: number;
}
