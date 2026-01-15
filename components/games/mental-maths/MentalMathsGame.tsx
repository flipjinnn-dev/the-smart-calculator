'use client';

import React, { useState } from 'react';
import { useMentalMaths } from './useMentalMaths';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingView } from './LandingView';
import { TrainingConfig } from './TrainingConfig';
import { ModeSelection } from './ModeSelection';
import { GameSession } from './GameSession';
import { Difficulty, GameConfig } from './types';
import { getDifficultyConfig } from './lib';

export const MentalMathsGame = () => {
    const { state, actions } = useMentalMaths();
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('MEDIUM');

    return (
        <div className="min-h-screen bg-transparent text-white font-sans selection:bg-pink-500 selection:text-white">
            <div className="max-w-4xl mx-auto px-4 py-8">
                <AnimatePresence mode="wait">
                    {state.status === 'MENU' && (
                        <motion.div
                            key="menu"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LandingView
                                onPlay={(diff) => {
                                    setSelectedDifficulty(diff);
                                    actions.setStatus('MODE_SELECT');
                                }}
                                onTraining={() => actions.setStatus('TRAINING_CONFIG')}
                            />
                        </motion.div>
                    )}

                    {state.status === 'TRAINING_CONFIG' && (
                        <motion.div
                            key="training-config"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <TrainingConfig
                                onStart={(config) => actions.startGame(config)}
                                onBack={() => actions.setStatus('MENU')}
                            />
                        </motion.div>
                    )}

                    {state.status === 'MODE_SELECT' && (
                        <motion.div
                            key="mode-select"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                        >
                            <ModeSelection
                                onSelectMode={(mode) => {
                                    const diffConfig = getDifficultyConfig(selectedDifficulty);

                                    // Base Config
                                    const config: GameConfig = {
                                        mode: mode,
                                        difficulty: selectedDifficulty,
                                        operations: diffConfig.operations || ['ADD'],
                                        range1: diffConfig.range1 || { min: 2, max: 10 },
                                        range2: diffConfig.range2 || { min: 2, max: 10 },
                                        timeLimit: mode === 'CLASSIC' ? 120 : null
                                    };

                                    actions.startGame(config);
                                }}
                                onBack={() => actions.setStatus('MENU')}
                            />
                        </motion.div>
                    )}

                    {(state.status === 'PRACTICE_PLAYING' || state.status === 'CLASSIC_PLAYING' || state.status === 'SURVIVAL_PLAYING' || state.status === 'GAME_OVER') && (
                        <motion.div
                            key="game-session"
                            className="h-full"
                        >
                            <GameSession
                                state={state}
                                onSubmitAnswer={actions.submitAnswer}
                                onMiss={actions.missQuestion}
                                onQuit={actions.quitGame}
                                onRestart={() => actions.startGame(state.config)} // Quick restart
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
