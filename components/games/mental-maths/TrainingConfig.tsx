import React, { useState } from 'react';
import { ArrowLeft, Play, Settings, Plus, Minus, X, Divide } from 'lucide-react';
import { GameConfig, Operation } from './types';

interface TrainingConfigProps {
    onStart: (config: GameConfig) => void;
    onBack: () => void;
}

export const TrainingConfig: React.FC<TrainingConfigProps> = ({ onStart, onBack }) => {
    const [operations, setOperations] = useState<Operation[]>(['ADD', 'SUBTRACT']);
    const [range1, setRange1] = useState({ min: 2, max: 20 });
    const [range2, setRange2] = useState({ min: 2, max: 20 });
    const [timeLimit, setTimeLimit] = useState<number | null>(60);

    const toggleOp = (op: Operation) => {
        setOperations(prev =>
            prev.includes(op)
                ? prev.filter(o => o !== op)
                : [...prev, op]
        );
    };

    const handleStart = () => {
        if (operations.length === 0) return;
        onStart({
            mode: 'TRAINING',
            operations,
            range1,
            range2,
            timeLimit
        });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <button
                onClick={onBack}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Menu
            </button>

            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 space-y-8">
                <div className="flex items-center gap-4 border-b border-gray-800 pb-6">
                    <div className="p-3 bg-purple-500/20 rounded-xl text-purple-400">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Training Setup</h2>
                        <p className="text-gray-400">Customize your practice session</p>
                    </div>
                </div>

                {/* Operations */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Operations</label>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { id: 'ADD', icon: Plus, label: 'Add' },
                            { id: 'SUBTRACT', icon: Minus, label: 'Sub' },
                            { id: 'MULTIPLY', icon: X, label: 'Mult' },
                            { id: 'DIVIDE', icon: Divide, label: 'Div' },
                        ].map(({ id, icon: Icon, label }) => {
                            const isActive = operations.includes(id as Operation);
                            return (
                                <button
                                    key={id}
                                    onClick={() => toggleOp(id as Operation)}
                                    className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${isActive
                                            ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                                            : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800'
                                        }`}
                                >
                                    <Icon className="w-6 h-6 mb-2" />
                                    <span className="text-xs font-bold">{label}</span>
                                </button>
                            );
                        })}
                    </div>
                    {operations.length === 0 && (
                        <p className="text-red-400 text-sm">Select at least one operation</p>
                    )}
                </div>

                {/* Number Ranges */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">First Number Range</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={range1.min}
                                onChange={(e) => setRange1(r => ({ ...r, min: parseInt(e.target.value) || 0 }))}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-center"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="number"
                                value={range1.max}
                                onChange={(e) => setRange1(r => ({ ...r, max: parseInt(e.target.value) || 0 }))}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-center"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Second Number Range</label>
                        <div className="flex items-center gap-4">
                            <input
                                type="number"
                                value={range2.min}
                                onChange={(e) => setRange2(r => ({ ...r, min: parseInt(e.target.value) || 0 }))}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-center"
                            />
                            <span className="text-gray-500">to</span>
                            <input
                                type="number"
                                value={range2.max}
                                onChange={(e) => setRange2(r => ({ ...r, max: parseInt(e.target.value) || 0 }))}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none text-center"
                            />
                        </div>
                    </div>
                </div>

                {/* Time Limit */}
                <div className="space-y-4">
                    <label className="text-sm font-medium text-gray-400 uppercase tracking-wider">Time Limit</label>
                    <div className="flex flex-wrap gap-3">
                        {[30, 60, 120, null].map((time) => (
                            <button
                                key={String(time)}
                                onClick={() => setTimeLimit(time)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timeLimit === time
                                        ? 'bg-purple-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {time ? `${time}s` : 'Unlimited'}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleStart}
                    disabled={operations.length === 0}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    <Play className="w-5 h-5 fill-current" />
                    Start Training
                </button>
            </div>
        </div>
    );
};
