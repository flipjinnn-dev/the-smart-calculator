import { GameConfig, Operation, Question, Difficulty } from './types';

export const getDifficultyConfig = (diff: Difficulty): Partial<GameConfig> => {
    switch (diff) {
        case 'EASY':
            return {
                operations: ['ADD', 'SUBTRACT'],
                range1: { min: 2, max: 10 },
                range2: { min: 2, max: 10 },
            };
        case 'MEDIUM':
            return {
                operations: ['ADD', 'SUBTRACT', 'MULTIPLY'],
                range1: { min: 2, max: 20 },
                range2: { min: 2, max: 20 },
            };
        case 'HARD':
            return {
                operations: ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'],
                range1: { min: 10, max: 50 },
                range2: { min: 5, max: 20 },
            };
    }
};

export const generateQuestion = (config: GameConfig): Question => {
    const { operations, range1, range2, mode } = config;

    // Fallback
    const safeOps = operations.length > 0 ? operations : ['ADD'];
    const safeRange1 = range1 || { min: 2, max: 10 };
    const safeRange2 = range2 || { min: 2, max: 10 };

    const op = safeOps[Math.floor(Math.random() * safeOps.length)];
    let n1 = Math.floor(Math.random() * (safeRange1.max - safeRange1.min + 1)) + safeRange1.min;
    let n2 = Math.floor(Math.random() * (safeRange2.max - safeRange2.min + 1)) + safeRange2.min;

    // Adjustments for division to ensure integer results
    if (op === 'DIVIDE') {
        let attempts = 0;
        while (attempts < 50) {
            n1 = Math.floor(Math.random() * (safeRange1.max - safeRange1.min + 1)) + safeRange1.min;
            n2 = Math.floor(Math.random() * (safeRange2.max - safeRange2.min + 1)) + safeRange2.min;
            if (n2 !== 0 && n1 % n2 === 0) break;
            attempts++;
        }
        if (n1 % n2 !== 0) {
            // Fallback: simple mult to guarantee validity
            return {
                id: Date.now() + Math.random().toString(),
                text: `${n1} × ${n2}`,
                answer: n1 * n2,
                createdAt: Date.now()
            };
        }
    }

    // Handle Subtraction negatives (optional, can stay positive for easier flow)
    if (op === 'SUBTRACT') {
        if (n1 < n2) {
            const temp = n1;
            n1 = n2;
            n2 = temp;
        }
    }

    let text = '';
    let answer = 0;

    switch (op) {
        case 'ADD':
            text = `${n1} + ${n2}`;
            answer = n1 + n2;
            break;
        case 'SUBTRACT':
            text = `${n1} - ${n2}`;
            answer = n1 - n2;
            break;
        case 'MULTIPLY':
            text = `${n1} × ${n2}`;
            answer = n1 * n2;
            break;
        case 'DIVIDE':
            text = `${n1} ÷ ${n2}`;
            answer = n1 / n2;
            break;
    }

    // Position Logic for Survival
    let position;
    if (mode === 'SURVIVAL') {
        // Start from top (-10%) with random horizontal position
        position = {
            top: -10,
            left: Math.floor(Math.random() * 80) + 10 // 10% to 90%
        };
    }

    return {
        id: Date.now() + Math.random().toString(),
        text,
        answer,
        position,
        createdAt: Date.now()
    };
};

export const getDefaultConfig = (): GameConfig => ({
    mode: 'TRAINING',
    difficulty: 'MEDIUM',
    operations: ['ADD', 'SUBTRACT', 'MULTIPLY', 'DIVIDE'],
    range1: { min: 2, max: 20 },
    range2: { min: 2, max: 20 },
    timeLimit: 60,
});
