"use client"
import { useEffect, useState, useCallback } from "react"
import { useWordle } from "@/hooks/useWordle"
import { toast } from "sonner"
import { Info, BarChart3, Settings, RotateCcw, X, Infinity, Share2, Award, Twitter, Facebook, Copy, HelpCircle, Calendar, Clock, Globe, BookOpen } from "lucide-react"
import confetti from 'canvas-confetti'
import Link from "next/link"

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

                    <div className="flex gap-2 opacity-0">
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

            {/* Content Section - Dark Theme */}
            <div className="w-full" style={{ backgroundColor: '#0a0a0b' }}>
                <div className="max-w-6xl mx-auto px-4 py-16 space-y-16">
                    
                    {/* Hero Section */}
                    <section className="text-center space-y-6">
                        <h2 className="text-5xl font-black tracking-tight" style={{ color: '#ffffff' }}>
                            Wordle Game Online – Play Free Daily Word Puzzle
                        </h2>
                        <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#a1a1aa' }}>
                            Play Wordle online free directly in your browser. No signup. No download. Just start guessing and solve the daily five-letter word challenge instantly.
                        </p>
                    </section>

                    {/* What is Wordle */}
                    <section className="rounded-3xl p-10 space-y-8 border" style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                                <HelpCircle className="w-8 h-8" style={{ color: '#10b981' }} />
                            </div>
                            <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>What Is Wordle?</h2>
                        </div>
                        <p className="text-lg leading-relaxed" style={{ color: '#d4d4d8' }}>
                            Wordle is a daily word guessing game where you try to solve a hidden five-letter English word in six attempts. After each guess, the tiles change color to guide you:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="rounded-2xl p-8 space-y-4 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#10b981' }}>A</div>
                                    <span className="text-2xl font-bold" style={{ color: '#10b981' }}>Green</span>
                                </div>
                                <p style={{ color: '#a1a1aa' }}>Correct letter in the correct position</p>
                            </div>
                            <div className="rounded-2xl p-8 space-y-4 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#d97706' }}>B</div>
                                    <span className="text-2xl font-bold" style={{ color: '#d97706' }}>Yellow</span>
                                </div>
                                <p style={{ color: '#a1a1aa' }}>Correct letter in the wrong position</p>
                            </div>
                            <div className="rounded-2xl p-8 space-y-4 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#565758' }}>C</div>
                                    <span className="text-2xl font-bold" style={{ color: '#9ca3af' }}>Gray</span>
                                </div>
                                <p style={{ color: '#a1a1aa' }}>Letter does not appear in the word</p>
                            </div>
                        </div>
                        <p className="text-lg" style={{ color: '#d4d4d8' }}>
                            It's simple to learn but challenging to master. Millions of players return daily to test vocabulary, logic, and pattern recognition skills.
                        </p>
                    </section>

                    {/* How to Play */}
                    <section className="space-y-8">
                        <h2 className="text-4xl font-black text-center" style={{ color: '#ffffff' }}>How to Play Wordle Online</h2>
                        <p className="text-xl text-center max-w-3xl mx-auto" style={{ color: '#a1a1aa' }}>Playing is quick and straightforward:</p>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="rounded-2xl p-8 space-y-4 border hover:border-blue-500/50 transition-all" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#3b82f6' }}>1</div>
                                    <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Enter a Five-Letter Word</h3>
                                </div>
                                <p className="text-lg pl-20" style={{ color: '#a1a1aa' }}>Type any valid English word.</p>
                            </div>
                            <div className="rounded-2xl p-8 space-y-4 border hover:border-purple-500/50 transition-all" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#8b5cf6' }}>2</div>
                                    <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Review the Color Feedback</h3>
                                </div>
                                <p className="text-lg pl-20" style={{ color: '#a1a1aa' }}>The board instantly shows which letters are correct.</p>
                            </div>
                            <div className="rounded-2xl p-8 space-y-4 border hover:border-green-500/50 transition-all" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#10b981' }}>3</div>
                                    <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Refine Your Guess</h3>
                                </div>
                                <p className="text-lg pl-20" style={{ color: '#a1a1aa' }}>Use the clues to eliminate letters and reposition correct ones.</p>
                            </div>
                            <div className="rounded-2xl p-8 space-y-4 border hover:border-orange-500/50 transition-all" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl" style={{ backgroundColor: '#f97316' }}>4</div>
                                    <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Solve Within Six Attempts</h3>
                                </div>
                                <p className="text-lg pl-20" style={{ color: '#a1a1aa' }}>Turn all five tiles green to win the round.</p>
                            </div>
                        </div>
                        <p className="text-center text-lg italic" style={{ color: '#71717a' }}>You can play unlimited rounds here to practice and improve your average guess count.</p>
                    </section>

                    {/* Daily Wordle Puzzle */}
                    <section className="rounded-3xl p-10 space-y-6 border" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                        <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>Daily Wordle Puzzle & Hints</h2>
                        <p className="text-lg" style={{ color: '#d4d4d8' }}>
                            Each day features a new daily five-letter challenge that resets every 24 hours.
                        </p>
                        <p className="text-lg" style={{ color: '#d4d4d8' }}>
                            If you're looking for hints, clues, or today's answer, visit our dedicated daily page:
                        </p>
                        <Link 
                            href="/games/what-is-the-wordle-today"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg text-white transition-all hover:scale-105 shadow-lg"
                            style={{ backgroundColor: '#6366f1' }}
                        >
                            👉 Get Today's Wordle Hints & Answer
                        </Link>
                        <div className="grid md:grid-cols-2 gap-4 mt-8">
                            {[
                                'Structured hints (without instant spoilers)',
                                'Letter clues & strategy breakdown',
                                'Full solution (optional)',
                                'Pattern explanation'
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-center gap-3 rounded-xl p-5 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                                        <span style={{ color: '#10b981' }}>✓</span>
                                    </div>
                                    <p style={{ color: '#d4d4d8' }}>{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-center italic" style={{ color: '#71717a' }}>We recommend solving first before checking the answer.</p>
                    </section>

                    {/* Wordle Unlimited */}
                    <section className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>
                                <Infinity className="inline w-10 h-10 mr-3" style={{ color: '#eab308' }} />
                                Wordle Unlimited – Practice Without Limits
                            </h2>
                            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#a1a1aa' }}>
                                The original daily version allows only one puzzle per day. Our platform lets you:
                            </p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { emoji: '♾️', text: 'Play multiple rounds' },
                                { emoji: '🎯', text: 'Test different starting words' },
                                { emoji: '⚡', text: 'Improve solving speed' },
                                { emoji: '📈', text: 'Build consistent strategy' }
                            ].map((item, idx) => (
                                <div key={idx} className="rounded-2xl p-8 text-center space-y-4 border hover:border-yellow-500/50 transition-all" style={{ backgroundColor: 'rgba(234, 179, 8, 0.05)', borderColor: 'rgba(234, 179, 8, 0.2)' }}>
                                    <div className="text-5xl">{item.emoji}</div>
                                    <p className="font-bold text-lg" style={{ color: '#ffffff' }}>{item.text}</p>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl p-6 border-l-4" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: '#10b981' }}>
                            <p className="text-xl font-bold" style={{ color: '#10b981' }}>
                                💡 Improve your win rate by 23% in 2 weeks using performance tracking.
                            </p>
                        </div>
                        <p className="text-lg text-center" style={{ color: '#a1a1aa' }}>
                            Unlimited practice leads to better logical elimination and faster recognition of common patterns.
                        </p>
                    </section>

                    {/* Stats Calculator */}
                    <section className="rounded-3xl p-10 space-y-8 border" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                        <div className="flex items-center gap-4">
                            <BarChart3 className="w-12 h-12" style={{ color: '#3b82f6' }} />
                            <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>Wordle Stats Calculator – Improve Your Win Rate</h2>
                        </div>
                        <p className="text-xl" style={{ color: '#d4d4d8' }}>
                            Most websites only let you play. <strong style={{ color: '#3b82f6' }}>We help you improve.</strong>
                        </p>
                        <p className="text-lg" style={{ color: '#d4d4d8' }}>
                            Our Wordle performance calculator allows you to analyze:
                        </p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { icon: '📊', text: 'Average guesses per game', color: '#3b82f6' },
                                { icon: '🏆', text: 'Win percentage Calculator', color: '#10b981' },
                                { icon: '✅', text: 'Success ratio', color: '#8b5cf6' },
                                { icon: '🔤', text: 'Letter efficiency', color: '#eab308' },
                                { icon: '🎯', text: 'Best starting word performance', color: '#ef4444' }
                            ].map((item, idx) => (
                                <div key={idx} className="rounded-xl p-5 border-l-4 font-bold" style={{ backgroundColor: '#18181b', borderColor: item.color, color: '#ffffff' }}>
                                    <span className="mr-2">{item.icon}</span>
                                    {item.text}
                                </div>
                            ))}
                        </div>
                        <p className="text-lg" style={{ color: '#d4d4d8' }}>
                            Tracking your results helps you identify weaknesses and refine your strategy over time. Players who monitor their statistics typically reduce their average attempts within weeks.
                        </p>
                    </section>

                    {/* Best Starting Words */}
                    <section className="space-y-8">
                        <div className="text-center space-y-4">
                            <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>
                                <Award className="inline w-10 h-10 mr-3" style={{ color: '#a855f7' }} />
                                Best Wordle Starting Words
                            </h2>
                            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#a1a1aa' }}>
                                Strong starting words increase early information gain. High-efficiency starters include:
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                            {['SLATE', 'CRANE', 'STARE', 'AUDIO', 'ROAST'].map((word) => (
                                <div key={word} className="rounded-2xl p-8 text-center shadow-2xl transform hover:scale-105 transition-all" style={{ background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)' }}>
                                    <p className="text-3xl font-black text-white tracking-wider">{word}</p>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-2xl p-8 space-y-5 border" style={{ backgroundColor: 'rgba(168, 85, 247, 0.05)', borderColor: 'rgba(168, 85, 247, 0.2)' }}>
                            <h3 className="text-2xl font-bold" style={{ color: '#ffffff' }}>Why they work:</h3>
                            <div className="space-y-3">
                                {[
                                    'Contain common vowels',
                                    'Include high-frequency consonants',
                                    'Eliminate large letter groups early'
                                ].map((text, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(168, 85, 247, 0.2)' }}>
                                            <span style={{ color: '#a855f7' }}>✓</span>
                                        </div>
                                        <span className="text-lg" style={{ color: '#d4d4d8' }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                            <p className="italic" style={{ color: '#71717a' }}>
                                Avoid rare letters like Q, X, or Z in your first guess unless strategically necessary.
                            </p>
                        </div>
                    </section>

                    {/* Strategy Tips */}
                    <section className="rounded-3xl p-10 space-y-8 border" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)', borderColor: 'rgba(249, 115, 22, 0.2)' }}>
                        <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>Proven Wordle Strategy Tips</h2>
                        <p className="text-xl" style={{ color: '#d4d4d8' }}>Improve your success rate with these techniques:</p>
                        <div className="space-y-5">
                            {[
                                { title: '1. Use Vowel-Heavy First Guesses', desc: 'Identify vowel placement early.' },
                                { title: '2. Never Reuse Gray Letters', desc: 'Gray means eliminate permanently.' },
                                { title: '3. Reposition Yellow Letters', desc: 'They belong in the word — just not that spot.' },
                                { title: '4. Think in Word Families', desc: 'Common endings: ER, ED, ING, LY' },
                                { title: '5. Stay Logical', desc: 'Every guess should eliminate possibilities, not create randomness.' }
                            ].map((tip, idx) => (
                                <div key={idx} className="rounded-2xl p-6 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                    <h3 className="text-xl font-bold mb-2" style={{ color: '#ffffff' }}>{tip.title}</h3>
                                    <p className="text-lg" style={{ color: '#a1a1aa' }}>{tip.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Solver & Analysis */}
                    <section className="space-y-8">
                        <h2 className="text-4xl font-black text-center" style={{ color: '#ffffff' }}>Wordle Solver & Analysis Tools</h2>
                        <p className="text-xl text-center max-w-3xl mx-auto" style={{ color: '#a1a1aa' }}>
                            Advanced players use logical filtering tools that process:
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { emoji: '🟢', title: 'Confirmed green letters', color: '#10b981' },
                                { emoji: '🟡', title: 'Yellow position exclusions', color: '#eab308' },
                                { emoji: '⚫', title: 'Removed gray letters', color: '#71717a' }
                            ].map((item, idx) => (
                                <div key={idx} className="rounded-2xl p-8 text-center space-y-4 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                    <div className="text-6xl">{item.emoji}</div>
                                    <p className="font-bold text-xl" style={{ color: item.color }}>{item.title}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-lg text-center max-w-4xl mx-auto" style={{ color: '#a1a1aa' }}>
                            Our platform focuses on strategy improvement rather than instant solving, helping you build long-term pattern recognition skills.
                        </p>
                    </section>

                    {/* Why Play Here */}
                    <section className="rounded-3xl p-10 space-y-8 border" style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)', borderColor: 'rgba(168, 85, 247, 0.3)' }}>
                        <h2 className="text-4xl font-black text-center" style={{ color: '#ffffff' }}>Why Play Wordle on Our Platform?</h2>
                        <div className="grid md:grid-cols-2 gap-5">
                            {[
                                'Clean, distraction-free interface',
                                'Fast browser loading',
                                'Mobile-optimized experience',
                                'Unlimited gameplay',
                                'Built-in statistics tracking',
                                'Dedicated daily hints page',
                                'Performance improvement tools'
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-center gap-4 rounded-xl p-5 border" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)' }}>
                                        <span className="text-2xl" style={{ color: '#10b981' }}>✔</span>
                                    </div>
                                    <p className="font-semibold text-lg" style={{ color: '#ffffff' }}>{text}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-xl text-center italic" style={{ color: '#a1a1aa' }}>
                            This page is designed for players who want both fun and measurable progress.
                        </p>
                    </section>

                    {/* Cognitive Benefits */}
                    <section className="space-y-8">
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgba(236, 72, 153, 0.2)' }}>
                                <span className="text-4xl">🧠</span>
                            </div>
                            <h2 className="text-4xl font-black" style={{ color: '#ffffff' }}>Cognitive Benefits of Daily Word Puzzles</h2>
                        </div>
                        <p className="text-xl text-center" style={{ color: '#a1a1aa' }}>Regular word puzzle play improves:</p>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { emoji: '📚', title: 'Vocabulary expansion' },
                                { emoji: '🧩', title: 'Pattern recognition' },
                                { emoji: '🧠', title: 'Logical reasoning' },
                                { emoji: '💭', title: 'Memory recall' },
                                { emoji: '🎯', title: 'Focus and concentration' }
                            ].map((benefit, idx) => (
                                <div key={idx} className="rounded-2xl p-8 text-center space-y-4 border hover:border-pink-500/50 transition-all" style={{ backgroundColor: 'rgba(236, 72, 153, 0.05)', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
                                    <div className="text-6xl">{benefit.emoji}</div>
                                    <p className="font-bold text-xl" style={{ color: '#ffffff' }}>{benefit.title}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-lg text-center max-w-3xl mx-auto" style={{ color: '#a1a1aa' }}>
                            Consistent daily practice strengthens mental agility over time.
                        </p>
                    </section>

                    {/* FAQ Section */}
                    <section className="space-y-10">
                        <h2 className="text-5xl font-black text-center" style={{ color: '#ffffff' }}>Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    q: "What is today's Wordle?",
                                    a: "Today's Wordle is the popular daily five-letter puzzle available for players worldwide. The puzzle resets every day, and you get six attempts to guess the correct word. If you need hints or the exact answer, you can check our dedicated Wordle Today page."
                                },
                                {
                                    q: "What is the Wordle today answer?",
                                    a: "The Wordle answer today refers to the correct five-letter word for the current daily puzzle. Many players search for today's Wordle answer after using all six attempts. We recommend solving it yourself first before checking the solution."
                                },
                                {
                                    q: "What was yesterday's Wordle?",
                                    a: "Yesterday's Wordle was the previous daily puzzle that reset at midnight. If you missed it or want to track past Wordle answers, you can visit our archive section for previous Wordle words."
                                },
                                {
                                    q: "What is the Wordle of the day?",
                                    a: "The Wordle of the day is the popular daily puzzle that changes every 24 hours. Every player worldwide receives the same word for that specific day."
                                },
                                {
                                    q: "What letter does today's Wordle start with?",
                                    a: "The starting letter of today's Wordle changes daily. Many players search for the first letter as a hint before guessing. Instead of revealing it immediately, we recommend checking structured hints to improve your solving skills."
                                },
                                {
                                    q: "What does today's Wordle start with?",
                                    a: "Today's Wordle begins with a specific letter that varies each day. If you are looking for clues like the starting letter or vowel count, check our hint breakdown page."
                                },
                                {
                                    q: "What is the first letter of today's Wordle?",
                                    a: "The first letter of today's Wordle depends on the current daily puzzle. We provide optional hints if you prefer guided solving instead of seeing the full answer."
                                },
                                {
                                    q: "What is today's Wordle word?",
                                    a: "Today's Wordle word is the hidden five-letter English word you must guess within six attempts. Every puzzle follows the same color feedback system: green, yellow, and gray."
                                },
                                {
                                    q: "What is Wordle?",
                                    a: "Wordle is a daily word puzzle game where players guess a hidden five-letter word in six tries. After each guess, colored tiles show whether letters are correct, misplaced, or incorrect."
                                },
                                {
                                    q: "How do you play Wordle?",
                                    a: "To play Wordle: Enter a valid five-letter English word. Submit your guess. Analyze the color feedback. Adjust your next guess using logic. Solve within six attempts. You can play Wordle online free directly in your browser."
                                }
                            ].map((faq, idx) => (
                                <details key={idx} className="group rounded-2xl p-6 border hover:border-emerald-500/50 transition-all" style={{ backgroundColor: '#18181b', borderColor: '#27272a' }}>
                                    <summary className="font-bold text-xl cursor-pointer list-none flex items-center justify-between" style={{ color: '#ffffff' }}>
                                        {faq.q}
                                        <span className="text-3xl transition-transform group-open:rotate-180" style={{ color: '#71717a' }}>›</span>
                                    </summary>
                                    <p className="mt-4 text-lg leading-relaxed" style={{ color: '#a1a1aa' }}>{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

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
