import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Heart, Trophy, RefreshCw, LogOut, Check, X } from 'lucide-react';
import { GameState, Question } from './types';

interface GameSessionProps {
    state: GameState;
    onSubmitAnswer: (answer: string, manualSubmit: boolean) => boolean;
    onMiss?: (id: string) => void;
    onQuit: () => void;
    onRestart: () => void;
}

export const GameSession: React.FC<GameSessionProps> = ({ state, onSubmitAnswer, onMiss, onQuit, onRestart }) => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [feedback, setFeedback] = useState<'CORRECT' | 'WRONG' | null>(null);

    // Focus input
    useEffect(() => {
        if (state.status !== 'GAME_OVER') {
            inputRef.current?.focus();
        }
    }, [state.status, state.activeQuestions]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setInputValue(val);

        // Auto-submit check (optimistic or real)
        // We pass manualSubmit = false
        if (val) {
            const success = onSubmitAnswer(val, false);
            if (success) {
                setInputValue('');
                setFeedback('CORRECT');
                setTimeout(() => setFeedback(null), 500);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (!inputValue) return;

            const success = onSubmitAnswer(inputValue, true); // Manual submit
            if (success) {
                setInputValue('');
                setFeedback('CORRECT');
                setTimeout(() => setFeedback(null), 500);
            } else {
                setFeedback('WRONG');
                setTimeout(() => setFeedback(null), 500);
                setInputValue(''); // Clear on wrong? Prompt implies "Heart reduce... Shake"
            }
        }
    };

    const getFallDuration = (diff?: string) => {
        switch (diff) {
            case 'HARD': return 7;
            case 'EASY': return 15;
            default: return 10;
        }
    };

    if (state.status === 'GAME_OVER') {
        return (
            <div className="flex flex-col items-center justify-center space-y-8 py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <h2 className="text-5xl font-bold text-white">Game Over!</h2>
                    <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        {state.score}
                    </div>
                    <p className="text-gray-400 text-xl">Final Score</p>
                </motion.div>

                <div className="bg-gray-800/50 p-6 rounded-2xl w-full max-w-md border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400">High Score</span>
                        <span className="text-yellow-500 font-bold flex items-center gap-2">
                            <Trophy className="w-4 h-4" /> {state.highScore}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Questions Solved</span>
                        <span className="text-white font-bold">{state.history.filter(h => h.isCorrect).length}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onRestart}
                        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <RefreshCw className="w-5 h-5" /> Play Again
                    </button>
                    <button
                        onClick={onQuit}
                        className="px-8 py-3 bg-gray-800 text-white font-bold rounded-xl hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <LogOut className="w-5 h-5" /> Menu
                    </button>
                </div>
            </div>
        );
    }

    const isSurvival = state.config.mode === 'SURVIVAL';

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[600px] flex flex-col">

            {/* SURVIVAL ARENA */}
            {isSurvival ? (
                <div className="relative flex-1 bg-slate-900/50 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden mb-6">
                    {/* HUD */}
                    <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
                        <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`w-8 h-8 drop-shadow-lg transition-colors ${i < state.lives ? 'fill-rose-500 text-rose-500' : 'text-gray-800 fill-gray-800'}`}
                                />
                            ))}
                        </div>
                        <div className="text-2xl font-bold font-mono text-white drop-shadow-lg">
                            Score: <span className="text-purple-400">{state.score}</span>
                        </div>
                    </div>

                    {/* Question Area */}
                    <div className="absolute inset-0 z-10 pointer-events-none">
                        <AnimatePresence>
                            {state.activeQuestions.map((q) => (
                                <motion.div
                                    key={q.id}
                                    initial={{
                                        opacity: 0,
                                        scale: 0.8,
                                        top: '-10%',
                                        left: `${q.position?.left ?? 50}%`
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        top: '110%'
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0,
                                        transition: { duration: 0.2 }
                                    }}
                                    transition={{
                                        top: {
                                            duration: getFallDuration(state.config.difficulty),
                                            ease: "linear",
                                        },
                                        opacity: { duration: 0.5 },
                                        scale: { duration: 0.3 }
                                    }}
                                    onAnimationComplete={(definition) => {
                                        // Only trigger miss if we completed the 'animate' phase (falling)
                                        // definition returns the target variant/object.
                                        // We can just rely on the fact that if it finished falling, it's a miss.
                                        // Note: Framer Motion onAnimationComplete fires for *every* animation completion if not specific?
                                        // Actually it fires once per variant completion.
                                        // We need to be careful not to trigger on 'exit' or entry only.
                                        // The 'animate' target includes top:'110%'.
                                        if (onMiss) onMiss(q.id);
                                    }}
                                    className="absolute px-6 py-3 bg-slate-800/90 backdrop-blur-md border border-slate-700 rounded-full shadow-xl"
                                    style={{ transform: 'translateX(-50%)' }}
                                >
                                    <span className="text-xl font-bold text-blue-100 whitespace-nowrap">{q.text}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            ) : (
                /* CLASSIC / TRAINING LAYOUT */
                <div className="flex-1 flex flex-col items-center justify-center relative mb-6">
                    <div className="flex justify-between items-start w-full mb-12">
                        <div className="flex items-center gap-2 text-gray-400">
                            <Timer className="w-6 h-6" />
                            <span className={`text-2xl font-bold font-mono ${state.timeLeft <= 10 && state.config.timeLimit ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                                {state.config.timeLimit ? state.timeLeft : '∞'}
                            </span>
                        </div>
                        <div className="text-4xl font-bold text-white font-mono">{state.score}</div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {state.activeQuestions[0] && (
                            <motion.div
                                key={state.activeQuestions[0].id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                className="text-center"
                            >
                                <h2 className="text-8xl font-bold text-white mb-8 tracking-tight">
                                    {state.activeQuestions[0].text}
                                </h2>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* INPUT AREA (Shared) */}
            <div className="flex justify-center relative z-30">
                <div className={`relative ${isSurvival ? 'w-48' : 'w-full max-w-sm'}`}>
                    <input
                        ref={inputRef}
                        type="number"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        className={`w-full bg-slate-800/80 border-2 ${feedback === 'WRONG' ? 'border-rose-500 animate-shake' : feedback === 'CORRECT' ? 'border-green-500' : 'border-slate-700 focus:border-purple-500'} text-center text-3xl font-bold text-white py-3 rounded-xl focus:outline-none transition-all shadow-lg backdrop-blur placeholder-slate-600`}
                        placeholder=""
                        autoFocus
                    />
                    {/* Feedback Icons */}
                    <AnimatePresence>
                        {feedback === 'CORRECT' && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -right-12 top-1/2 -translate-y-1/2 text-green-500"
                            >
                                <Check className="w-8 h-8" />
                            </motion.div>
                        )}
                        {feedback === 'WRONG' && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                className="absolute -right-12 top-1/2 -translate-y-1/2 text-rose-500"
                            >
                                <X className="w-8 h-8" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-between items-center mt-4 opacity-50 hover:opacity-100 transition-opacity">
                <button onClick={onQuit} className="text-sm text-gray-400 hover:text-white flex items-center gap-2">
                    <LogOut className="w-4 h-4" /> Leave Game
                </button>
            </div>

        </div>
    );
};
