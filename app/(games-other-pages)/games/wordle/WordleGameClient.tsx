"use client"
import { useEffect, useState, useCallback } from "react"
import { useWordle } from "@/hooks/useWordle"
import { toast } from "sonner"
import { Info, BarChart3, Settings, RotateCcw, X, Infinity, Share2, Award, Twitter, Facebook, Copy, HelpCircle, Calendar, Clock, Globe, BookOpen } from "lucide-react"
import confetti from 'canvas-confetti'

interface WordleGameClientProps {
    solution: string
    wordleNumber: number
}

export default function WordleGameClient({ solution, wordleNumber }: WordleGameClientProps) {
    const [mounted, setMounted] = useState(false)
    const [invalidGuess, setInvalidGuess] = useState(false)
    const [showInstructions, setShowInstructions] = useState(false)
    const [showStats, setShowStats] = useState(false)
    const [showWinModal, setShowWinModal] = useState(false)
    const [revealingRow, setRevealingRow] = useState<number | null>(null)

    const { gameState, submitGuess, addLetter, deleteLetter, resetGame, MAX_GUESSES, WORD_LENGTH } = useWordle(solution, wordleNumber)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Handle Win State
    useEffect(() => {
        if (gameState?.gameStatus === 'won') {
            // Trigger confetti
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);

            // Show modal after a short delay for flip animation
            setTimeout(() => {
                setShowWinModal(true);
            }, 1500);
        }
    }, [gameState?.gameStatus])

    useEffect(() => {
        if (!mounted) return

        const handleKeyboard = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                handleSubmit()
            } else if (e.key === 'Backspace') {
                handleDelete()
            } else if (/^[a-zA-Z]$/.test(e.key)) {
                handleKeyPress(e.key.toUpperCase())
            }
        }

        window.addEventListener('keydown', handleKeyboard)
        return () => window.removeEventListener('keydown', handleKeyboard)
    }, [gameState?.currentGuess, gameState?.gameStatus, mounted])

    const handleKeyPress = (key: string) => {
        if (gameState?.gameStatus !== 'playing') return
        addLetter(key)
    }

    const handleDelete = () => {
        if (gameState?.gameStatus !== 'playing') return
        deleteLetter()
    }

    const handleSubmit = useCallback(() => {
        if (gameState?.gameStatus !== 'playing') return

        // Get the row index before submission (this will be the new guess row)
        const rowToReveal = gameState.guesses.length

        const result = submitGuess()
        if (result === 'INVALID_WORD') {
            toast.error('Not in word list', {
                className: "bg-zinc-900 border-zinc-800 text-white"
            })
            setInvalidGuess(true)
            setTimeout(() => setInvalidGuess(false), 600)
        } else if (result === 'TOO_SHORT') {
            toast.error('Not enough letters', {
                className: "bg-zinc-900 border-zinc-800 text-white"
            })
            setInvalidGuess(true)
            setTimeout(() => setInvalidGuess(false), 600)
        } else if (result === 'SUCCESS') {
            // Trigger flip animation for the row that was just submitted
            setRevealingRow(rowToReveal)
            setTimeout(() => setRevealingRow(null), 2000)
            setInvalidGuess(false)
        }
    }, [gameState?.gameStatus, gameState?.guesses.length, submitGuess])

    const shareResult = () => {
        const grid = gameState.guesses.map(g =>
            g.states.map(s =>
                s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬜'
            ).join('')
        ).join('\n');

        const text = `I just solved Wordle #${wordleNumber} in ${gameState.guesses.length}/6!\n\n${grid}\n\nCan you beat my streak?\nhttps://www.thesmartcalculator.com/games/wordle`;

        if (navigator.share) {
            navigator.share({
                title: 'Wordle Result',
                text: text,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        }
    };

    if (!mounted || !gameState) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#09090b', color: '#ffffff' }}>
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="font-medium tracking-wide" style={{ color: '#a1a1aa' }}>LOADING WORDLE</div>
                </div>
            </div>
        )
    }

    return (
        <div className="selection:bg-green-500/30" style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh' }}>
            {/* Header */}
            <header
                className="sticky z-40 border-b"
                style={{ top: '64px', backgroundColor: '#121212', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            >
                <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => setShowInstructions(true)}
                        className="p-2 rounded-full border-2 transition-colors hover:bg-white/10"
                        style={{ borderColor: '#ffffff', color: '#ffffff' }}
                        aria-label="How to play"
                    >
                        <Info className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-2">
                        <Infinity className="w-6 h-6" style={{ color: '#00d4aa' }} />
                        <h1 className="text-2xl md:text-3xl font-black tracking-wider" style={{ color: '#ffffff' }}>
                            WORDLE
                        </h1>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowStats(true)}
                            className="p-2 transition-colors hover:bg-white/10 rounded"
                            style={{ color: '#ffffff' }}
                            aria-label="Statistics"
                        >
                            <BarChart3 className="w-5 h-5" />
                        </button>
                        <button
                            className="p-2 transition-colors hover:bg-white/10 rounded"
                            style={{ color: '#ffffff' }}
                        >
                            <Settings className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Game Area */}
            <main className="relative max-w-lg mx-auto px-4 py-6 flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 160px)' }}>

                {/* Wordle Grid */}
                <div className="flex flex-col justify-center w-full max-w-[350px] mb-6">
                    <div className="grid gap-1.5">
                        {/* Previous guesses */}
                        {gameState.guesses.map((guess, rowIndex) => (
                            <div key={rowIndex} className="grid grid-cols-5 gap-1.5">
                                {guess.word.split('').map((letter, colIndex) => {
                                    const state = guess.states[colIndex]
                                    const isRevealing = revealingRow === rowIndex
                                    const delay = isRevealing ? colIndex * 300 : 0

                                    let tileStyle: React.CSSProperties = { border: '2px solid #565758', backgroundColor: '#121212', color: '#ffffff' }

                                    if (state === 'correct') {
                                        tileStyle = { border: '2px solid #10b981', backgroundColor: '#10b981', color: '#ffffff' }
                                    } else if (state === 'present') {
                                        tileStyle = { border: '2px solid #d97706', backgroundColor: '#d97706', color: '#ffffff' }
                                    } else if (state === 'absent') {
                                        tileStyle = { border: '2px solid #4a4a4a', backgroundColor: '#4a4a4a', color: '#ffffff' }
                                    }

                                    return (
                                        <div
                                            key={colIndex}
                                            className={`
                        aspect-square flex items-center justify-center 
                        text-2xl font-bold uppercase 
                        transition-all duration-500
                        ${isRevealing ? 'animate-flip' : ''}
                      `}
                                            style={{ ...tileStyle, animationDelay: `${delay}ms` }}
                                        >
                                            {letter}
                                        </div>
                                    )
                                })}
                            </div>
                        ))}

                        {/* Current guess row */}
                        {gameState.gameStatus === 'playing' && (
                            <div className={`grid grid-cols-5 gap-1.5 ${invalidGuess ? 'animate-shake' : ''}`}>
                                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => {
                                    const hasLetter = colIndex < gameState.currentGuess.length
                                    const isCurrentPosition = colIndex === gameState.currentGuess.length

                                    let tileStyle: React.CSSProperties
                                    if (hasLetter) {
                                        tileStyle = { border: '2px solid #ffffff', backgroundColor: '#121212', color: '#ffffff' }
                                    } else if (isCurrentPosition) {
                                        tileStyle = { border: '2px dashed #565758', backgroundColor: '#121212', color: 'transparent' }
                                    } else {
                                        tileStyle = { border: '2px solid #3a3a3c', backgroundColor: '#121212', color: 'transparent' }
                                    }

                                    return (
                                        <div
                                            key={colIndex}
                                            className="aspect-square flex items-center justify-center text-2xl font-bold uppercase transition-all duration-200"
                                            style={tileStyle}
                                        >
                                            {gameState.currentGuess[colIndex] || ''}
                                        </div>
                                    )
                                })}
                            </div>
                        )}

                        {/* Empty rows */}
                        {Array.from({ length: Math.max(0, MAX_GUESSES - gameState.guesses.length - (gameState.gameStatus === 'playing' ? 1 : 0)) }).map((_, rowIndex) => (
                            <div key={`empty-${rowIndex}`} className="grid grid-cols-5 gap-1.5">
                                {Array.from({ length: WORD_LENGTH }).map((_, colIndex) => (
                                    <div
                                        key={colIndex}
                                        className="aspect-square"
                                        style={{ border: '2px solid #3a3a3c', backgroundColor: '#121212' }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons (Game Over - Compact) */}
                {gameState.gameStatus !== 'playing' && !showWinModal && (
                    <div className="w-full max-w-[350px] mb-6 animate-fade-in z-20">
                        <div
                            className="backdrop-blur-md rounded-xl p-4 text-center shadow-2xl"
                            style={{ backgroundColor: 'rgba(24, 24, 27, 0.8)', border: '1px solid #27272a' }}
                        >
                            <p className="mb-4" style={{ color: '#a1a1aa' }}>
                                The word was <span className="font-bold tracking-widest px-2 py-1 rounded" style={{ backgroundColor: '#27272a', color: '#ffffff' }}>{solution.toUpperCase()}</span>
                            </p>
                            <button
                                onClick={resetGame}
                                className="w-full flex items-center justify-center gap-2 transition-colors py-2 hover:text-white"
                                style={{ color: '#a1a1aa' }}
                            >
                                <RotateCcw className="w-4 h-4" /> Play Again
                            </button>
                        </div>
                    </div>
                )}

                {/* On-screen Keyboard */}
                <div className="w-full max-w-[630px] select-none">
                    <div className="flex flex-col gap-2">
                        {/* Row 1 */}
                        <div className="flex gap-1.5 justify-center">
                            {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((key) => {
                                const state = gameState.keyboardState[key.toLowerCase()]
                                let btnStyle: React.CSSProperties = { backgroundColor: '#565758', color: '#ffffff' }

                                if (state === 'correct') btnStyle = { backgroundColor: '#10b981', color: '#ffffff' }
                                else if (state === 'present') btnStyle = { backgroundColor: '#d97706', color: '#ffffff' }
                                else if (state === 'absent') btnStyle = { backgroundColor: '#3a3a3c', color: '#ffffff' }

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyPress(key)}
                                        disabled={gameState.gameStatus !== 'playing'}
                                        className="font-bold w-12 h-14 rounded text-base transition-all transform active:scale-95 disabled:cursor-not-allowed"
                                        style={btnStyle}
                                    >
                                        {key}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Row 2 */}
                        <div className="flex gap-1.5 justify-center px-4">
                            {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((key) => {
                                const state = gameState.keyboardState[key.toLowerCase()]
                                let btnStyle: React.CSSProperties = { backgroundColor: '#565758', color: '#ffffff' }

                                if (state === 'correct') btnStyle = { backgroundColor: '#10b981', color: '#ffffff' }
                                else if (state === 'present') btnStyle = { backgroundColor: '#d97706', color: '#ffffff' }
                                else if (state === 'absent') btnStyle = { backgroundColor: '#3a3a3c', color: '#ffffff' }

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyPress(key)}
                                        disabled={gameState.gameStatus !== 'playing'}
                                        className="font-bold w-12 h-14 rounded text-base transition-all transform active:scale-95 disabled:cursor-not-allowed"
                                        style={btnStyle}
                                    >
                                        {key}
                                    </button>
                                )
                            })}
                        </div>

                        {/* Row 3 */}
                        <div className="flex gap-1.5 justify-center">
                            <button
                                onClick={handleSubmit}
                                disabled={gameState.gameStatus !== 'playing'}
                                className="font-bold px-4 h-14 rounded text-xs transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: '#565758', color: '#ffffff' }}
                            >
                                ENTER
                            </button>
                            {['Z', 'X', 'C', 'V', 'B', 'N', 'M'].map((key) => {
                                const state = gameState.keyboardState[key.toLowerCase()]
                                let btnStyle: React.CSSProperties = { backgroundColor: '#565758', color: '#ffffff' }

                                if (state === 'correct') btnStyle = { backgroundColor: '#10b981', color: '#ffffff' }
                                else if (state === 'present') btnStyle = { backgroundColor: '#d97706', color: '#ffffff' }
                                else if (state === 'absent') btnStyle = { backgroundColor: '#3a3a3c', color: '#ffffff' }

                                return (
                                    <button
                                        key={key}
                                        onClick={() => handleKeyPress(key)}
                                        disabled={gameState.gameStatus !== 'playing'}
                                        className="font-bold w-12 h-14 rounded text-base transition-all transform active:scale-95 disabled:cursor-not-allowed"
                                        style={btnStyle}
                                    >
                                        {key}
                                    </button>
                                )
                            })}
                            <button
                                onClick={handleDelete}
                                disabled={gameState.gameStatus !== 'playing'}
                                className="font-bold px-4 h-14 rounded text-xs transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ backgroundColor: '#565758', color: '#ffffff' }}
                            >
                                ⌫
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Wordle Game Guide Section */}
            <section className="w-full max-w-3xl mx-auto px-6 py-16 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                <div className="flex items-center justify-center gap-3 mb-12">
                    <BookOpen className="w-8 h-8 text-emerald-500" />
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center" style={{ color: '#ffffff' }}>Wordle Game Guide</h2>
                </div>

                <div className="grid gap-8">
                    {/* How to Play */}
                    <div className="rounded-2xl p-8 transition-all hover:bg-white/5" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#ffffff' }}>
                            <HelpCircle className="w-5 h-5 text-emerald-500" />
                            How to Play Wordle?
                        </h3>
                        <p className="mb-4 leading-relaxed" style={{ color: '#a1a1aa' }}>
                            Playing Wordle is simple. You need to guess a 5-letter word in 6 tries. After each guess, the letters change color:
                        </p>
                        <ul className="space-y-3 mb-6" style={{ color: '#d4d4d8' }}>
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                                <span><strong>Green:</strong> Letter is in the correct position</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-yellow-600 shadow-[0_0_10px_rgba(202,138,4,0.5)]"></span>
                                <span><strong>Yellow:</strong> Letter is in the word but wrong position</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-zinc-600"></span>
                                <span><strong>Gray:</strong> Letter is not in the word</span>
                            </li>
                        </ul>
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                            <p className="text-sm font-medium text-emerald-400">
                                <strong>Tip:</strong> Start by guessing common vowels and consonants. Pay attention to repeated letters and word patterns.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* What is Wordle */}
                        <div className="rounded-2xl p-6 hover:bg-white/5 transition-colors" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <h3 className="text-lg font-bold mb-3 text-white">What Is The Wordle Today?</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#a1a1aa' }}>
                                Wordle is a popular online word puzzle game where players try to guess a 5-letter word every day. “Wordle Today” refers to the puzzle word for the current day. Every day, there is a unique word that is the same for all players worldwide.
                            </p>
                        </div>

                        {/* How it Works */}
                        <div className="rounded-2xl p-6 hover:bg-white/5 transition-colors" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <h3 className="text-lg font-bold mb-3 text-white">How Does Wordle Work?</h3>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: '#a1a1aa' }}>
                                Wordle works using an algorithm that selects a daily word from a word list. The word is the same for every player, which allows tracking streaks and leaderboards.
                            </p>
                            <p className="text-sm" style={{ color: '#a1a1aa' }}>The game is browser-based and works on any device.</p>
                        </div>
                    </div>

                    {/* History & Facts */}
                    <div className="rounded-2xl p-8 hover:bg-white/5 transition-colors" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            <div>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                                    <Globe className="w-5 h-5 text-blue-500" />
                                    When Did Wordle Start?
                                </h3>
                                <p className="text-sm leading-relaxed mb-4" style={{ color: '#a1a1aa' }}>
                                    Wordle was created by Josh Wardle in 2021. Originally made for his partner, it went viral in November 2021 and was acquired by The New York Times in January 2022.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                                    <Calendar className="w-5 h-5 text-purple-500" />
                                    When Does Wordle Reset?
                                </h3>
                                <ul className="text-sm space-y-2" style={{ color: '#a1a1aa' }}>
                                    <li>• Resets daily at midnight local time.</li>
                                    <li>• New word every 24 hours.</li>
                                    <li>• Previous words are archived.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Vowels & Where to Play */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="rounded-2xl p-6 hover:bg-white/5 transition-colors" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <h3 className="text-lg font-bold mb-3 text-white">How Many Vowels?</h3>
                            <p className="text-sm leading-relaxed mb-3" style={{ color: '#a1a1aa' }}>
                                The number of vowels (A, E, I, O, U) in each day’s Wordle can vary. Focusing on vowels while guessing can be very helpful as most words contain at least one.
                            </p>
                        </div>

                        <div className="rounded-2xl p-6 hover:bg-white/5 transition-colors relative overflow-hidden group" style={{ backgroundColor: 'rgba(24, 24, 27, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-white">
                                <Clock className="w-5 h-5 text-emerald-500" />
                                Where to Play?
                            </h3>
                            <p className="text-sm mb-3" style={{ color: '#a1a1aa' }}>
                                You are playing on the official Smart Calculator Wordle game!
                            </p>
                            <a href="https://www.thesmartcalculator.com/games/wordle" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1">
                                thesmartcalculator.com/games/wordle
                            </a>
                        </div>
                    </div>

                </div>
            </section>

            {/* Instructions Modal */}
            {showInstructions && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                    onClick={() => setShowInstructions(false)}
                >
                    <div
                        className="max-w-md w-full p-8 shadow-2xl transform transition-all rounded-2xl"
                        style={{ backgroundColor: '#18181b', border: '1px solid #27272a', maxHeight: '85vh', overflowY: 'auto' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-bold" style={{ color: '#ffffff' }}>How to Play</h2>
                            <button
                                onClick={() => setShowInstructions(false)}
                                className="transition-colors hover:opacity-80"
                                style={{ color: '#ffffff' }}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="space-y-5 text-base" style={{ color: '#a1a1aa' }}>
                            <p>Guess the hidden word in 6 tries.</p>

                            <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>

                            <p>After your submission, the color of the tiles will change as in the examples below.</p>

                            <div className="border-t pt-6 space-y-6" style={{ borderColor: '#27272a' }}>
                                <div>
                                    <div className="flex gap-1.5 mb-3">
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#10b981' }}>G</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>A</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>M</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>E</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>S</div>
                                    </div>
                                    <p className="text-sm">The letter <strong>G</strong> is in the word and in the correct spot. so its background color of the block will change to green.</p>
                                </div>

                                <div>
                                    <div className="flex gap-1.5 mb-3">
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>H</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>O</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#d97706' }}>T</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>E</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>L</div>
                                    </div>
                                    <p className="text-sm">The letter <strong>T</strong> is in the word but in the wrong spot. so its background color of the block will change to orange.</p>
                                </div>

                                <div>
                                    <div className="flex gap-1.5 mb-3">
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>C</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>L</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>I</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl rounded" style={{ backgroundColor: '#18181b', border: '2px solid #3f3f46' }}>C</div>
                                        <div className="w-12 h-12 flex items-center justify-center font-bold text-xl rounded" style={{ backgroundColor: '#4a4a4a', color: '#ffffff' }}>K</div>
                                    </div>
                                    <p className="text-sm">The letter <strong>K</strong> is not in the word in any spot. so its background color of the block will change to gray.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Congratulations / Game Over Modal */}
            {showWinModal && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }}
                >
                    <div
                        className="max-w-sm w-full p-8 shadow-2xl transform transition-all rounded-3xl text-center relative overflow-hidden"
                        style={{ backgroundColor: '#18181b', border: '1px solid #27272a' }}
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/20 rounded-full blur-[50px] pointer-events-none" />

                        <button
                            onClick={() => setShowWinModal(false)}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/5 transition-colors"
                            style={{ color: '#a1a1aa' }}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="mb-6 relative">
                            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                                <Award className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-black mb-1 bg-gradient-to-br from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                Splendid!
                            </h2>
                            <p style={{ color: '#a1a1aa' }}>Puzzle #{wordleNumber}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-3xl font-bold mb-1">{gameState.guesses.length}</div>
                                <div className="text-xs uppercase tracking-wider opacity-60">Guesses</div>
                            </div>
                            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="text-3xl font-bold mb-1">1</div>
                                <div className="text-xs uppercase tracking-wider opacity-60">Streak</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-4 gap-2">
                                <button
                                    onClick={() => {
                                        const grid = gameState.guesses.map(g =>
                                            g.states.map(s =>
                                                s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬜'
                                            ).join('')
                                        ).join('\n');
                                        const text = `I just solved Wordle #${wordleNumber} in ${gameState.guesses.length}/6!\n\n${grid}\n\nCan you beat my streak?\nhttps://www.thesmartcalculator.com/games/wordle`;
                                        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    title="Share on Twitter"
                                >
                                    <Twitter className="w-5 h-5 text-blue-400" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">X</span>
                                </button>

                                <button
                                    onClick={() => {
                                        const url = "https://www.thesmartcalculator.com/games/wordle";
                                        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                                    }}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    title="Share on Facebook"
                                >
                                    <Facebook className="w-5 h-5 text-blue-600" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Fb</span>
                                </button>

                                <button
                                    onClick={() => {
                                        const grid = gameState.guesses.map(g =>
                                            g.states.map(s =>
                                                s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬜'
                                            ).join('')
                                        ).join('\n');
                                        const text = `I just solved Wordle #${wordleNumber} in ${gameState.guesses.length}/6!\n\n${grid}\n\nCan you beat my streak?\nhttps://www.thesmartcalculator.com/games/wordle`;
                                        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                    }}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                                    title="Share on WhatsApp"
                                >
                                    <div className="w-5 h-5 flex items-center justify-center rounded-full bg-green-500">
                                        <Share2 className="w-3 h-3 text-black" />
                                    </div>
                                    <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">WA</span>
                                </button>

                                <button
                                    onClick={shareResult}
                                    className="flex flex-col items-center gap-1 p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-lg hover:shadow-emerald-500/25"
                                    title="Copy Result"
                                >
                                    <Copy className="w-5 h-5" />
                                    <span className="text-[10px] uppercase font-bold tracking-wider">Copy</span>
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-xs text-zinc-500">Share your victory with friends!</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
