import { useState, useEffect, useCallback, useRef } from 'react';
import { GameConfig, GameState, GameStatus, Question } from './types';
import { generateQuestion, getDefaultConfig } from './lib';

export const useMentalMaths = () => {
    const [state, setState] = useState<GameState>({
        status: 'MENU',
        config: getDefaultConfig(),
        score: 0,
        lives: 3,
        timeLeft: 0,
        activeQuestions: [],
        history: [],
        highScore: 0,
    });

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const spawnerRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem('mental-maths-highscore');
        if (saved) {
            setState(s => ({ ...s, highScore: parseInt(saved, 10) }));
        }
    }, []);

    const cleanup = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (spawnerRef.current) clearInterval(spawnerRef.current);
    }, []);

    const startGame = useCallback((config: GameConfig) => {
        cleanup();

        let initialStatus: GameStatus = 'PRACTICE_PLAYING';
        if (config.mode === 'CLASSIC') initialStatus = 'CLASSIC_PLAYING';
        if (config.mode === 'SURVIVAL') initialStatus = 'SURVIVAL_PLAYING';

        const firstQuestion = generateQuestion(config);

        setState(prev => ({
            ...prev,
            status: initialStatus,
            config,
            score: 0,
            lives: 3,
            timeLeft: config.timeLimit || 0,
            activeQuestions: [firstQuestion],
            history: [],
        }));

        // Game Loop Timer (Decrement Time or Tick)
        if (config.timeLimit !== null || config.mode === 'CLASSIC') {
            timerRef.current = setInterval(() => {
                setState(prev => {
                    if (prev.timeLeft <= 1) {
                        cleanup();
                        return { ...prev, status: 'GAME_OVER', timeLeft: 0 };
                    }
                    return { ...prev, timeLeft: prev.timeLeft - 1 };
                });
            }, 1000);
        }

        // Survival Spawner
        if (config.mode === 'SURVIVAL') {
            const spawnInterval = config.difficulty === 'HARD' ? 2000 : config.difficulty === 'EASY' ? 4000 : 3000;

            spawnerRef.current = setInterval(() => {
                setState(prev => {
                    if (prev.status !== 'SURVIVAL_PLAYING') return prev;
                    // Cap active questions to avoid crash/lag
                    if (prev.activeQuestions.length >= 15) return prev;

                    return {
                        ...prev,
                        activeQuestions: [...prev.activeQuestions, generateQuestion(prev.config)]
                    };
                });
            }, spawnInterval);
        }
    }, [cleanup]);

    const checkAnswer = useCallback((answerStr: string, manualSubmit: boolean = false) => {
        const answer = parseFloat(answerStr);

        setState(prev => {
            // Find matching question
            // In multiple questions scenario (Survival), find ANY match.
            // If multiple have same answer, remove oldest (first in array).
            const matchIndex = prev.activeQuestions.findIndex(q => Math.abs(q.answer - answer) < 0.001);

            const isCorrect = matchIndex !== -1;

            if (isCorrect) {
                // CORRECT ANSWER
                const matchedQuestion = prev.activeQuestions[matchIndex];
                const newHistory = [...prev.history, {
                    question: matchedQuestion,
                    userAnswer: answerStr,
                    isCorrect: true,
                    timestamp: Date.now()
                }];

                const newScore = prev.score + 10;
                let newHighScore = prev.highScore;
                if (newScore > prev.highScore) {
                    newHighScore = newScore;
                    localStorage.setItem('mental-maths-highscore', newHighScore.toString());
                }

                // Remove matched question
                const remainingQuestions = prev.activeQuestions.filter((_, idx) => idx !== matchIndex);

                // If Classic/Training, immediately replace.
                if (prev.config.mode !== 'SURVIVAL') {
                    remainingQuestions.push(generateQuestion(prev.config));
                }

                return {
                    ...prev,
                    score: newScore,
                    highScore: newHighScore,
                    history: newHistory,
                    activeQuestions: remainingQuestions
                };
            } else {
                // WRONG ANSWER
                // Only penalize if manual submit (ENTER key)
                if (manualSubmit && prev.config.mode === 'SURVIVAL') {
                    const newLives = prev.lives - 1;
                    if (newLives <= 0) {
                        cleanup();
                        return { ...prev, lives: 0, status: 'GAME_OVER' };
                    }
                    return { ...prev, lives: newLives };
                }
                // For Classic, maybe nothing happens on wrong answer? Or negative score? 
                // Prompt didn't specify auto-submit for wrong. 
                // Let's assume just ignored if auto, penalized if manual.
                return prev;
            }
        });

        // Return true if correct so UI can clear input
        // We can't return value from setState, checking state is hard async.
        // Rely on effect or make this pure?
        // Actually, we can just perform the check here for the Return Value
        // But we need the 'prev' state.
        // Since we are inside component, we can access 'state' but it might be stale in closure?
        // 'state' in useMentalMaths scope is updated on render.
        // But if we type fast, we might need functional check.
        // Ideally we return whether it was a success to clear input.
        // Let's modify logic: The UI computes 'isCorrect' optimistically?
        // Or we just expect the UI to pass the check.

        // Better: UI calls check(val), if we consumed it, we return true?
        // This function can't return based on setState calculation.
        // We will trust the logic: If Logic finds match, it updates state. 
        // The UI should listen to activeQuestions change or use a callback?
        // Simpler: The UI clears input if it was a manual submit. 
        // If auto-submit, the UI clears input ONLY if it was correct.
        // But UI doesn't know if it was correct inside this function.
        // SOLUTION: We'll pass the *current state* from UI to this function? No.
        // We'll rely on the UI checking the validity against the props it has *before* calling this,
        // OR we return a boolean. To return boolean, we must read state ref.
        // Let's stick to standard flow:
        // UI: onChange -> valid? -> submit(val) -> clear input.
        // But UI needs to know which questions are active.

    }, [cleanup]);

    // Hack to return correctness for UI clearing
    const submitAnswer = useCallback((answerStr: string, manualSubmit: boolean = false): boolean => {
        let result = false;
        setState(prev => {
            const answer = parseFloat(answerStr);
            const matchIndex = prev.activeQuestions.findIndex(q => Math.abs(q.answer - answer) < 0.001);
            const isCorrect = matchIndex !== -1;

            if (isCorrect) {
                result = true;
                // ... copy logic from above ...
                const matchedQuestion = prev.activeQuestions[matchIndex];
                const newHistory = [...prev.history, {
                    question: matchedQuestion,
                    userAnswer: answerStr,
                    isCorrect: true,
                    timestamp: Date.now()
                }];

                const newScore = prev.score + 10;
                let newHighScore = prev.highScore;
                if (newScore > prev.highScore) {
                    newHighScore = newScore;
                    localStorage.setItem('mental-maths-highscore', newHighScore.toString());
                }

                const remainingQuestions = prev.activeQuestions.filter((_, idx) => idx !== matchIndex);
                if (prev.config.mode !== 'SURVIVAL') {
                    remainingQuestions.push(generateQuestion(prev.config));
                }

                return {
                    ...prev,
                    score: newScore,
                    highScore: newHighScore,
                    history: newHistory,
                    activeQuestions: remainingQuestions
                };
            } else {
                if (manualSubmit && prev.config.mode === 'SURVIVAL') {
                    const newLives = prev.lives - 1;
                    if (newLives <= 0) {
                        cleanup(); // Side effect in setState updater? Risky but works for refs.
                        return { ...prev, lives: 0, status: 'GAME_OVER' };
                    }
                    return { ...prev, lives: newLives };
                }
                return prev;
            }
        });
        return result; // limitation: this result is always false because it runs before setState callback?
        // Actually setState callback is synchronous logic body, but result assignment? 
        // setState assumes functional update. The function runs later.
        // So we CANNOT return result this way.

        // ALTERNATIVE: Use a Ref to track activeQuestions for synchronous checks.
    }, [cleanup]);

    // Ref for synchronous state access
    const stateRef = useRef(state);
    useEffect(() => { stateRef.current = state; }, [state]);

    const submitAnswerSynch = useCallback((answerStr: string, manualSubmit: boolean = false): boolean => {
        const prev = stateRef.current;
        const answer = parseFloat(answerStr);
        const matchIndex = prev.activeQuestions.findIndex(q => Math.abs(q.answer - answer) < 0.001);
        const isCorrect = matchIndex !== -1;

        if (isCorrect) {
            // Perform Update
            setState(current => {
                // Re-calculate to be safe against race conditions? 
                // Or just use the index if we assume single-threaded event loop?
                // Safest: exact same logic as above.
                const idx = current.activeQuestions.findIndex(q => Math.abs(q.answer - answer) < 0.001);
                if (idx === -1) return current; // Already handled?

                const matchedQuestion = current.activeQuestions[idx];
                const remaining = current.activeQuestions.filter((_, i) => i !== idx);
                // Gen new if not Survival
                if (current.config.mode !== 'SURVIVAL') {
                    remaining.push(generateQuestion(current.config));
                }

                // High Score
                const newScore = current.score + 10;
                let hScore = current.highScore;
                if (newScore > hScore) {
                    hScore = newScore;
                    localStorage.setItem('mental-maths-highscore', hScore.toString());
                }

                return {
                    ...current,
                    score: newScore,
                    highScore: hScore,
                    activeQuestions: remaining
                };
            });
            return true;
        } else {
            if (manualSubmit && prev.config.mode === 'SURVIVAL') {
                setState(current => {
                    const newLives = current.lives - 1;
                    if (newLives <= 0) {
                        cleanup();
                        return { ...current, lives: 0, status: 'GAME_OVER' };
                    }
                    return { ...current, lives: newLives };
                });
            }
            return false;
        }
    }, [cleanup]);

    const quitGame = useCallback(() => {
        cleanup();
        setState(prev => ({ ...prev, status: 'MENU', activeQuestions: [] }));
    }, [cleanup]);

    const missQuestion = useCallback((questionId: string) => {
        setState(prev => {
            if (prev.status !== 'SURVIVAL_PLAYING') return prev;

            // Check validity
            if (!prev.activeQuestions.find(q => q.id === questionId)) return prev;

            const newLives = prev.lives - 1;
            if (newLives <= 0) {
                cleanup();
                return { ...prev, lives: 0, status: 'GAME_OVER' };
            }

            return {
                ...prev,
                lives: newLives,
                activeQuestions: prev.activeQuestions.filter(q => q.id !== questionId)
            };
        });
    }, [cleanup]);

    // Cleanup on unmount
    useEffect(() => {
        return cleanup;
    }, [cleanup]);

    return {
        state,
        actions: {
            startGame,
            submitAnswer: submitAnswerSynch,
            missQuestion,
            quitGame,
            setLinkConfig: (config: GameConfig) => setState(s => ({ ...s, config })),
            setStatus: (status: GameStatus) => setState(s => ({ ...s, status }))
        }
    };
};
