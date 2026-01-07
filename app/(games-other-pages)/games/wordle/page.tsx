"use client"

import { useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { useWordle } from "@/hooks/useWordle"
import { getTodayWordleNumber } from "@/lib/games/wordle-data"
import { getWordleAnswer } from "@/lib/games/wordle-words"
import { toast } from "sonner"
import { Info, BarChart3, Settings, RotateCcw, ChevronLeft, X, Infinity } from "lucide-react"

export default function WordlePage() {
  const [mounted, setMounted] = useState(false)
  const [todayWordleNumber, setTodayWordleNumber] = useState(0)
  const [solution, setSolution] = useState("")
  const [invalidGuess, setInvalidGuess] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [revealingRow, setRevealingRow] = useState<number | null>(null)

  useEffect(() => {
    const number = getTodayWordleNumber()
    const answer = getWordleAnswer(number)
    setTodayWordleNumber(number)
    setSolution(answer)
    setMounted(true)
  }, [])

  const { gameState, submitGuess, addLetter, deleteLetter, resetGame, MAX_GUESSES, WORD_LENGTH } = useWordle(solution, todayWordleNumber)


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

        {/* Action Buttons (Game Over) */}
        {gameState.gameStatus !== 'playing' && (
          <div className="w-full max-w-[350px] mb-6 animate-fade-in z-20">
            <div 
              className="backdrop-blur-md rounded-xl p-6 text-center shadow-2xl mb-6"
              style={{ backgroundColor: 'rgba(24, 24, 27, 0.8)', border: '1px solid #27272a' }}
            >
              {gameState.gameStatus === 'won' ? (
                <>
                  <div className="text-4xl mb-2">🎉</div>
                  <h3 className="text-2xl font-bold text-emerald-400 mb-2">Splendid!</h3>
                  <p className="mb-6" style={{ color: '#a1a1aa' }}>
                    You solved it in <span className="text-white font-bold">{gameState.guesses.length}</span> guesses.
                  </p>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-2">😔</div>
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#e4e4e7' }}>Next time!</h3>
                  <p className="mb-6" style={{ color: '#a1a1aa' }}>
                    The word was <span className="font-bold tracking-widest px-2 py-1 rounded" style={{ backgroundColor: '#27272a', color: '#ffffff' }}>{solution.toUpperCase()}</span>
                  </p>
                </>
              )}
              
              <div className="grid gap-3">
                <Link href="/games/what-is-the-wordle-today">
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:shadow-[0_0_25px_rgba(5,150,105,0.5)] transform hover:-translate-y-0.5">
                    See Stats & Details
                  </button>
                </Link>
                <Link href="/games/wordle-archive">
                  <button 
                    className="w-full font-semibold py-3 px-6 rounded-lg transition-colors"
                    style={{ backgroundColor: '#27272a', color: '#ffffff', border: '1px solid #3f3f46' }}
                  >
                    Play Archive
                  </button>
                </Link>
                <button 
                  onClick={resetGame}
                  className="w-full flex items-center justify-center gap-2 transition-colors py-2 hover:text-white"
                  style={{ color: '#a1a1aa' }}
                >
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
              </div>
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

      {/* Instructions Modal */}
      {showInstructions && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 p-4 animate-fade-in" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
          onClick={() => setShowInstructions(false)}
        >
          <div 
            className="max-w-md w-full p-8 shadow-2xl transform transition-all" 
            style={{ backgroundColor: '#1a1a1a', maxHeight: '85vh', overflowY: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold" style={{ color: '#ffffff' }}>How to Play</h2>
              <button 
                onClick={() => setShowInstructions(false)} 
                className="transition-colors hover:opacity-80" 
                style={{ color: '#ffffff' }}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-5 text-base" style={{ color: '#ffffff' }}>
              <p>Guess the hidden word in 6 tries.</p>
              
              <p>Each guess must be a valid 5 letter word. Hit the enter button to submit.</p>
              
              <p>After your submission, the color of the tiles will change as in the examples below.</p>

              <div className="border-t pt-6 space-y-6" style={{ borderColor: '#3a3a3c' }}>
                <div>
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#10b981' }}>G</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>A</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>M</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>E</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>S</div>
                  </div>
                  <p className="text-sm" style={{ color: '#ffffff' }}>The letter <strong>G</strong> is in the word and in the correct spot.</p>
                </div>
                
                <div>
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>H</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>O</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#d97706' }}>T</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>E</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>L</div>
                  </div>
                  <p className="text-sm" style={{ color: '#ffffff' }}>The letter <strong>T</strong> is in the word but in the wrong spot.</p>
                </div>
                
                <div>
                  <div className="flex gap-1.5 mb-3">
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>C</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>L</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>I</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-white text-xl" style={{ backgroundColor: '#1a1a1a', border: '2px solid #3a3a3c' }}>C</div>
                    <div className="w-12 h-12 flex items-center justify-center font-bold text-xl" style={{ backgroundColor: '#4a4a4a', color: '#ffffff' }}>K</div>
                  </div>
                  <p className="text-sm" style={{ color: '#ffffff' }}>The letter <strong>K</strong> is not in the word in any spot.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
