import React, { useState } from 'react';
import { Play, Brain, Trophy, ChevronRight, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Difficulty } from './types';

interface LandingViewProps {
    onPlay: (difficulty: Difficulty) => void;
    onTraining: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onPlay, onTraining }) => {
    const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');

    return (
        <div className="flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-4">
                <motion.h1
                    className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Mental Maths
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    Train your brain. Beat the clock. Master the numbers.
                </motion.p>
            </div>

            {/* Difficulty Tabs */}
            <div className="flex bg-gray-900/50 p-1 rounded-xl border border-gray-800">
                {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((level) => (
                    <button
                        key={level}
                        onClick={() => setDifficulty(level)}
                        className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${difficulty === level
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20'
                                : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        {level}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onPlay(difficulty)}
                    className="group relative p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl hover:border-purple-500/50 transition-all shadow-2xl hover:shadow-purple-500/20 text-left overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-purple-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-purple-500/20 transition-all" />

                    <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                        <div className="p-3 bg-gray-800 rounded-2xl w-fit group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Play className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Play Now</h3>
                            <p className="text-gray-400 group-hover:text-gray-200">
                                Start {difficulty.toLowerCase()} challenge.
                            </p>
                        </div>
                    </div>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onTraining}
                    className="group relative p-8 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl hover:border-pink-500/50 transition-all shadow-2xl hover:shadow-pink-500/20 text-left overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-32 bg-pink-500/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-pink-500/20 transition-all" />

                    <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
                        <div className="p-3 bg-gray-800 rounded-2xl w-fit group-hover:bg-pink-500 group-hover:text-white transition-colors">
                            <Brain className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">Training</h3>
                            <p className="text-gray-400 group-hover:text-gray-200">Practice specific skills with custom settings.</p>
                        </div>
                    </div>
                </motion.button>
            </div>

            {/* Leaderboard Placeholder */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
            >
                <div className="px-6 py-2 rounded-full bg-gray-900/30 border border-gray-800 flex items-center gap-2 text-sm text-gray-400">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>Global Leaderboard Coming Soon</span>
                </div>
            </motion.div>
        </div>
    );
};
