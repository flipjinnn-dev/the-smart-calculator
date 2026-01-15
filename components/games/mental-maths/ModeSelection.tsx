import React from 'react';
import { Clock, Heart, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface ModeSelectionProps {
    onSelectMode: (mode: 'CLASSIC' | 'SURVIVAL') => void;
    onBack: () => void;
}

export const ModeSelection: React.FC<ModeSelectionProps> = ({ onSelectMode, onBack }) => {
    return (
        <div className="flex flex-col space-y-8">
            <button
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white transition-colors w-fit"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Menu
            </button>

            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">Choose Your Challenge</h2>
                <p className="text-gray-400">Select a game mode to begin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Classic Mode */}
                <motion.button
                    onClick={() => onSelectMode('CLASSIC')}
                    whileHover={{ y: -5 }}
                    className="relative p-8 bg-gradient-to-br from-indigo-900/40 to-gray-900/40 border border-indigo-500/30 rounded-3xl hover:border-indigo-500 transition-all group text-left"
                >
                    <div className="mb-6 p-4 bg-indigo-500/20 rounded-2xl w-fit group-hover:bg-indigo-500 group-hover:text-white text-indigo-400 transition-colors">
                        <Clock className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Classic Sprint</h3>
                    <p className="text-gray-400 mb-6">Race against the clock in a 2-minute blitz. How many can you solve?</p>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            120 Seconds Time Limit
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            Standard Difficulty
                        </li>
                    </ul>
                </motion.button>

                {/* Survival Mode */}
                <motion.button
                    onClick={() => onSelectMode('SURVIVAL')}
                    whileHover={{ y: -5 }}
                    className="relative p-8 bg-gradient-to-br from-rose-900/40 to-gray-900/40 border border-rose-500/30 rounded-3xl hover:border-rose-500 transition-all group text-left"
                >
                    <div className="mb-6 p-4 bg-rose-500/20 rounded-2xl w-fit group-hover:bg-rose-500 group-hover:text-white text-rose-400 transition-colors">
                        <Heart className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Survival</h3>
                    <p className="text-gray-400 mb-6">3 Lives. Endless questions. One mistake and you lose a heart.</p>
                    <ul className="space-y-2 text-sm text-gray-500">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            No Time Limit
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            Increasing Difficulty
                        </li>
                    </ul>
                </motion.button>
            </div>
        </div>
    );
};
