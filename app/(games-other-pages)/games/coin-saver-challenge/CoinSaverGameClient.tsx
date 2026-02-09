"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Timer, Play, RotateCcw, Volume2, VolumeX, Maximize, Minimize, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

type GameState = "splash" | "difficulty" | "playing" | "gameOver"
type CoinType = "penny" | "nickel" | "dime" | "quarter"
type Difficulty = "easy" | "medium" | "hard"

interface Coin {
  id: string
  type: CoinType
  value: number
  x: number
  y: number
  isDragging: boolean
}

interface LeaderboardEntry {
  name: string
  score: number
  time: number
  date: string
}

const COIN_CONFIG = {
  penny: { 
    value: 1, 
    label: "1¢", 
    size: 75, 
    bgGradient: "from-amber-600 via-orange-500 to-amber-700", 
    borderColor: "border-amber-800",
    shine: "from-amber-300 via-yellow-200 to-transparent"
  },
  nickel: { 
    value: 5, 
    label: "5¢", 
    size: 85, 
    bgGradient: "from-gray-400 via-slate-300 to-gray-500", 
    borderColor: "border-gray-700",
    shine: "from-white via-gray-100 to-transparent"
  },
  dime: { 
    value: 10, 
    label: "10¢", 
    size: 80, 
    bgGradient: "from-slate-400 via-gray-300 to-slate-500", 
    borderColor: "border-slate-700",
    shine: "from-slate-200 via-white to-transparent"
  },
  quarter: { 
    value: 25, 
    label: "25¢", 
    size: 90, 
    bgGradient: "from-zinc-300 via-gray-200 to-zinc-400", 
    borderColor: "border-zinc-600",
    shine: "from-white via-zinc-100 to-transparent"
  }
}

const DIFFICULTY_CONFIG = {
  easy: { coinsToWin: 10, spawnInterval: 3000, timeLimit: 180, label: "Easy", emoji: "😊" },
  medium: { coinsToWin: 15, spawnInterval: 2000, timeLimit: 120, label: "Medium", emoji: "😐" },
  hard: { coinsToWin: 20, spawnInterval: 1500, timeLimit: 90, label: "Hard", emoji: "😤" }
}

const COIN_TYPES: CoinType[] = ["penny", "nickel", "dime", "quarter"]

export default function CoinSaverGameClient() {
  const [gameState, setGameState] = useState<GameState>("splash")
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [time, setTime] = useState(0)
  const [coins, setCoins] = useState<Coin[]>([])
  const [collectedCoins, setCollectedCoins] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState("")
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [draggedCoin, setDraggedCoin] = useState<string | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("medium")
  const [showHowToPlay, setShowHowToPlay] = useState(false)
  
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const jarRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const audioContextRef = useRef<AudioContext | null>(null)
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedHighScore = localStorage.getItem("coinSaverHighScore")
    if (savedHighScore) setHighScore(parseInt(savedHighScore))
    
    const savedLeaderboard = localStorage.getItem("coinSaverLeaderboard")
    if (savedLeaderboard) setLeaderboard(JSON.parse(savedLeaderboard))
    
    const savedName = localStorage.getItem("coinSaverPlayerName")
    if (savedName) setPlayerName(savedName)
  }, [])

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume()
        }
      } catch (error) {
        console.error('Audio init failed:', error)
      }
    }
  }, [])

  const playSound = useCallback((frequency: number, duration: number = 0.1) => {
    if (!soundEnabled || !audioContextRef.current) return
    
    try {
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') ctx.resume()
      
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = "sine"
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (error) {
      console.error('Sound error:', error)
    }
  }, [soundEnabled])

  const playCoinSound = useCallback(() => {
    playSound(800, 0.1)
    setTimeout(() => playSound(1000, 0.1), 50)
  }, [playSound])

  const playWinSound = useCallback(() => {
    playSound(523, 0.2)
    setTimeout(() => playSound(659, 0.2), 100)
    setTimeout(() => playSound(784, 0.3), 200)
  }, [playSound])

  const spawnCoin = useCallback(() => {
    if (!gameAreaRef.current) return

    const randomType = COIN_TYPES[Math.floor(Math.random() * COIN_TYPES.length)]
    const gameRect = gameAreaRef.current.getBoundingClientRect()
    
    const newCoin: Coin = {
      id: `coin-${Date.now()}-${Math.random()}`,
      type: randomType,
      value: COIN_CONFIG[randomType].value,
      x: Math.random() * (gameRect.width - 100) + 50,
      y: gameRect.height - 80,
      isDragging: false
    }

    setCoins(prev => [...prev, newCoin])
  }, [])

  const startGame = useCallback(() => {
    initAudio()
    setGameState("playing")
    setScore(0)
    setTime(0)
    setCollectedCoins(0)
    setCoins([])
    
    const config = DIFFICULTY_CONFIG[difficulty]
    
    spawnCoin()
    
    spawnIntervalRef.current = setInterval(() => {
      spawnCoin()
    }, config.spawnInterval)
    
    timerIntervalRef.current = setInterval(() => {
      setTime(t => {
        if (t + 1 >= config.timeLimit) {
          endGame()
          return t
        }
        return t + 1
      })
    }, 1000)
  }, [spawnCoin, initAudio, difficulty])

  const endGame = useCallback(() => {
    if (spawnIntervalRef.current) clearInterval(spawnIntervalRef.current)
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current)
    
    setGameState("gameOver")
    
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem("coinSaverHighScore", score.toString())
    }
    
    if (score > 0) {
      const newEntry: LeaderboardEntry = {
        name: playerName || "Anonymous",
        score,
        time,
        date: new Date().toLocaleDateString()
      }
      
      const updatedLeaderboard = [...leaderboard, newEntry]
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
      
      setLeaderboard(updatedLeaderboard)
      localStorage.setItem("coinSaverLeaderboard", JSON.stringify(updatedLeaderboard))
    }
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
    playWinSound()
  }, [score, highScore, time, playerName, leaderboard, playWinSound])

  useEffect(() => {
    if (gameState === "playing" && collectedCoins >= DIFFICULTY_CONFIG[difficulty].coinsToWin) {
      endGame()
    }
  }, [collectedCoins, gameState, endGame, difficulty])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent, coinId: string) => {
    e.preventDefault()
    initAudio()
    setDraggedCoin(coinId)
    setCoins(prev => prev.map(c => 
      c.id === coinId ? { ...c, isDragging: true } : c
    ))
  }

  const handleDragMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggedCoin || !gameAreaRef.current) return

    const gameRect = gameAreaRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const x = clientX - gameRect.left
    const y = clientY - gameRect.top

    setCoins(prev => prev.map(c => 
      c.id === draggedCoin ? { ...c, x, y } : c
    ))
  }, [draggedCoin])

  const handleDragEnd = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!draggedCoin) return

    const coin = coins.find(c => c.id === draggedCoin)
    if (!coin) return

    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX
    const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as React.MouseEvent).clientY

    let collected = false

    COIN_TYPES.forEach(type => {
      const jarRef = jarRefs.current[type]
      if (jarRef) {
        const jarRect = jarRef.getBoundingClientRect()
        if (
          clientX >= jarRect.left &&
          clientX <= jarRect.right &&
          clientY >= jarRect.top &&
          clientY <= jarRect.bottom &&
          coin.type === type
        ) {
          setScore(s => s + coin.value)
          setCollectedCoins(c => c + 1)
          setCoins(prev => prev.filter(c => c.id !== draggedCoin))
          playCoinSound()
          collected = true
        }
      }
    })

    if (!collected) {
      setCoins(prev => prev.map(c => 
        c.id === draggedCoin ? { ...c, isDragging: false } : c
      ))
    }

    setDraggedCoin(null)
  }, [draggedCoin, coins, playCoinSound])

  const toggleFullscreen = useCallback(() => {
    if (!gameContainerRef.current) return

    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().catch(err => console.error(err))
    } else {
      document.exitFullscreen()
    }
  }, [])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const renderSplashScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
          Coin Saver
        </h1>
        <p className="text-xl text-white/90 mb-8">
          Drag coins into the correct jars!
        </p>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 mb-8">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 rounded-xl p-4">
              <Trophy className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <p className="text-white font-semibold">High Score</p>
              <p className="text-2xl text-yellow-300 font-bold">${(highScore / 100).toFixed(2)}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <Timer className="w-8 h-8 text-white mx-auto mb-2" />
              <p className="text-white font-semibold">Goal</p>
              <p className="text-2xl text-white font-bold">15 Coins</p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Enter your name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value)
              localStorage.setItem("coinSaverPlayerName", e.target.value)
            }}
            className="w-full px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder-white/60 mb-4 focus:outline-none focus:border-white/60"
          />

          <Button
            onClick={() => setGameState("difficulty")}
            size="lg"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold text-xl py-6 rounded-xl"
          >
            <Play className="w-6 h-6 mr-2" />
            Start Game
          </Button>

          <Button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            variant="outline"
            size="lg"
            className="w-full mt-4 bg-white/10 border-2 border-white/30 text-white hover:bg-white/20"
          >
            <Trophy className="w-5 h-5 mr-2" />
            Leaderboard
          </Button>
        </div>

      </motion.div>

      <AnimatePresence>
        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowLeaderboard(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-auto"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Trophy className="w-8 h-8 text-yellow-500" />
                Leaderboard
              </h2>

              {leaderboard.length === 0 ? (
                <p className="text-center text-gray-500 py-8">No scores yet. Be the first!</p>
              ) : (
                <div className="space-y-3">
                  {leaderboard.map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        index === 0 ? "bg-gradient-to-r from-yellow-100 to-yellow-200" :
                        index === 1 ? "bg-gradient-to-r from-gray-100 to-gray-200" :
                        index === 2 ? "bg-gradient-to-r from-orange-100 to-orange-200" :
                        "bg-gray-50"
                      }`}
                    >
                      <div className={`text-2xl font-bold ${
                        index === 0 ? "text-yellow-600" :
                        index === 1 ? "text-gray-600" :
                        index === 2 ? "text-orange-600" :
                        "text-gray-400"
                      }`}>
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{entry.name}</p>
                        <p className="text-sm text-gray-500">{formatTime(entry.time)} • {entry.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">${(entry.score / 100).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  const renderDifficultyScreen = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-3xl p-8 md:p-12 max-w-2xl w-full"
      >
        <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Select Difficulty</h2>
        <p className="text-gray-600 text-center mb-8">Choose your challenge level</p>
        
        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setDifficulty("easy")
              startGame()
            }}
            className="w-full p-6 rounded-2xl border-4 bg-gradient-to-r from-green-100 to-green-200 border-green-500 hover:from-green-200 hover:to-green-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{DIFFICULTY_CONFIG.easy.emoji} {DIFFICULTY_CONFIG.easy.label}</h3>
                <p className="text-gray-600 mb-1">Collect {DIFFICULTY_CONFIG.easy.coinsToWin} coins</p>
                <p className="text-sm text-gray-500">Time: {DIFFICULTY_CONFIG.easy.timeLimit}s • Slower spawn</p>
              </div>
              <div className="text-green-600 text-4xl">⭐</div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setDifficulty("medium")
              startGame()
            }}
            className="w-full p-6 rounded-2xl border-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-500 hover:from-yellow-200 hover:to-yellow-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{DIFFICULTY_CONFIG.medium.emoji} {DIFFICULTY_CONFIG.medium.label}</h3>
                <p className="text-gray-600 mb-1">Collect {DIFFICULTY_CONFIG.medium.coinsToWin} coins</p>
                <p className="text-sm text-gray-500">Time: {DIFFICULTY_CONFIG.medium.timeLimit}s • Medium spawn</p>
              </div>
              <div className="text-yellow-600 text-4xl">⭐⭐</div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setDifficulty("hard")
              startGame()
            }}
            className="w-full p-6 rounded-2xl border-4 bg-gradient-to-r from-red-100 to-red-200 border-red-500 hover:from-red-200 hover:to-red-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{DIFFICULTY_CONFIG.hard.emoji} {DIFFICULTY_CONFIG.hard.label}</h3>
                <p className="text-gray-600 mb-1">Collect {DIFFICULTY_CONFIG.hard.coinsToWin} coins</p>
                <p className="text-sm text-gray-500">Time: {DIFFICULTY_CONFIG.hard.timeLimit}s • Fast spawn</p>
              </div>
              <div className="text-red-600 text-4xl">⭐⭐⭐</div>
            </div>
          </motion.button>
        </div>

        <Button
          onClick={() => setGameState("splash")}
          variant="outline"
          size="lg"
          className="w-full mt-6"
        >
          Back
        </Button>
      </motion.div>
    </motion.div>
  )

  const renderGameScreen = () => (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4"
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-4">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3">
              <div className="flex items-center gap-2">
                <Timer className="w-6 h-6 text-white" />
                <span className="text-2xl font-bold text-white">{formatTime(time)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3">
              <p className="text-white/80 text-sm">Score</p>
              <p className="text-2xl font-bold text-yellow-300">${(score / 100).toFixed(2)}</p>
            </div>

            <button
              onClick={() => setShowHowToPlay(true)}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-3 text-white hover:bg-white/30 transition-colors"
              title="How to Play"
            >
              <Info className="w-6 h-6" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="bg-white/20 backdrop-blur-lg rounded-2xl p-3 text-white hover:bg-white/30"
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Maximize className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">
              Progress: {collectedCoins} / {DIFFICULTY_CONFIG[difficulty].coinsToWin}
            </span>
            <span className="text-white/80">
              {Math.round((collectedCoins / DIFFICULTY_CONFIG[difficulty].coinsToWin) * 100)}%
            </span>
          </div>
          <div className="mt-2 h-3 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-400 to-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${(collectedCoins / DIFFICULTY_CONFIG[difficulty].coinsToWin) * 100}%` }}
            />
          </div>
        </div>

        <div
          ref={gameAreaRef}
          className="relative bg-white/10 backdrop-blur-sm rounded-3xl min-h-[600px] overflow-hidden border-4 border-white/20"
        >
          <div className="absolute top-0 left-0 right-0 flex justify-around p-4 bg-gradient-to-b from-black/20 to-transparent">
            {COIN_TYPES.map((type) => (
              <div
                key={type}
                ref={(el) => { jarRefs.current[type] = el }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-28 h-36 bg-gradient-to-b from-slate-300 via-gray-300 to-slate-400 rounded-t-full rounded-b-2xl border-4 border-slate-600 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden"
                >
                  {/* Glass reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-t-full"></div>
                  
                  {/* Jar opening darkness */}
                  <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-black/40 to-transparent rounded-t-full"></div>
                  
                  {/* Label */}
                  <div className="text-3xl font-black text-gray-900 drop-shadow-md z-10">{COIN_CONFIG[type].label}</div>
                  
                  {/* Jar opening rim */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-slate-500 rounded-full"></div>
                  
                  {/* Bottom reflection */}
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-white/20 to-transparent rounded-b-2xl"></div>
                </motion.div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {coins.map((coin) => (
              <motion.div
                key={coin.id}
                initial={{ scale: 0, y: 100 }}
                animate={{
                  scale: coin.isDragging ? 1.2 : 1,
                  x: coin.x - COIN_CONFIG[coin.type].size / 2,
                  y: coin.y - COIN_CONFIG[coin.type].size / 2,
                }}
                exit={{ scale: 0, opacity: 0 }}
                className={`absolute cursor-grab active:cursor-grabbing ${coin.isDragging ? 'z-50' : 'z-10'}`}
                style={{
                  width: COIN_CONFIG[coin.type].size,
                  height: COIN_CONFIG[coin.type].size,
                  touchAction: 'none'
                }}
                onMouseDown={(e) => handleDragStart(e, coin.id)}
                onTouchStart={(e) => handleDragStart(e, coin.id)}
              >
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${COIN_CONFIG[coin.type].bgGradient} border-4 ${COIN_CONFIG[coin.type].borderColor} shadow-2xl flex items-center justify-center relative overflow-hidden`}>
                  {/* Outer ring highlight */}
                  <div className="absolute inset-0 rounded-full border-2 border-white/40"></div>
                  
                  {/* Top-left shine effect */}
                  <div className={`absolute top-0 left-0 w-1/2 h-1/2 rounded-full bg-gradient-to-br ${COIN_CONFIG[coin.type].shine} opacity-60`}></div>
                  
                  {/* Small highlight dot */}
                  <div className="absolute top-3 left-3 w-4 h-4 bg-white/60 rounded-full blur-[2px]"></div>
                  
                  {/* Coin value label */}
                  <div className="text-2xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] z-10">{COIN_CONFIG[coin.type].label}</div>
                  
                  {/* Bottom shadow for depth */}
                  <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent rounded-b-full"></div>
                  
                  {/* Ridged edge effect */}
                  <div className="absolute inset-2 rounded-full border border-white/20"></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* How to Play Popup */}
      <AnimatePresence>
        {showHowToPlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowHowToPlay(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">How to Play</h2>
                <button
                  onClick={() => setShowHowToPlay(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Info className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🎯</span>
                    Goal
                  </h3>
                  <p className="text-gray-700">Collect {DIFFICULTY_CONFIG[difficulty].coinsToWin} coins before time runs out!</p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">🪙</span>
                    Drag Coins
                  </h3>
                  <p className="text-gray-700">Coins appear at the bottom. Drag each coin to its matching jar at the top.</p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">💰</span>
                    Match Values
                  </h3>
                  <p className="text-gray-700">1¢ → 1¢ jar, 5¢ → 5¢ jar, 10¢ → 10¢ jar, 25¢ → 25¢ jar</p>
                </div>

                <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-4">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <span className="text-2xl">⏱️</span>
                    Beat the Clock
                  </h3>
                  <p className="text-gray-700">You have {DIFFICULTY_CONFIG[difficulty].timeLimit} seconds to complete the challenge!</p>
                </div>
              </div>

              <Button
                onClick={() => setShowHowToPlay(false)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Got it!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )

  const renderGameOver = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-12 text-center max-w-md"
      >
        <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
        
        <h2 className="text-5xl font-bold text-gray-800 mb-4">Congratulations!</h2>
        
        <div className="space-y-4 mb-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-4">
            <p className="text-gray-600 text-sm mb-1">Final Score</p>
            <p className="text-4xl font-bold text-purple-600">${(score / 100).toFixed(2)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">Time</p>
              <p className="text-2xl font-bold text-blue-600">{formatTime(time)}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1">High Score</p>
              <p className="text-2xl font-bold text-yellow-600">${(highScore / 100).toFixed(2)}</p>
            </div>
          </div>

          {score === highScore && score > 0 && (
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4">
              <p className="text-white font-bold text-lg">🎉 New High Score! 🎉</p>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={() => {
              setGameState("splash")
              setScore(0)
              setTime(0)
              setCoins([])
              setCollectedCoins(0)
            }}
            size="lg"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold text-lg py-6 rounded-xl"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Play Again
          </Button>

          <Button
            onClick={() => {
              setShowLeaderboard(true)
            }}
            variant="outline"
            size="lg"
            className="w-full"
          >
            <Trophy className="w-5 h-5 mr-2" />
            View Leaderboard
          </Button>
        </div>

        {/* Leaderboard Modal on Game Over */}
        <AnimatePresence>
          {showLeaderboard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setShowLeaderboard(false)}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl p-8 max-w-md w-full max-h-[80vh] overflow-auto"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    Leaderboard
                  </h2>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                {leaderboard.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No scores yet. Be the first!</p>
                ) : (
                  <div className="space-y-3">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-4 p-4 rounded-xl ${
                          index === 0 ? "bg-gradient-to-r from-yellow-100 to-yellow-200" :
                          index === 1 ? "bg-gradient-to-r from-gray-100 to-gray-200" :
                          index === 2 ? "bg-gradient-to-r from-orange-100 to-orange-200" :
                          "bg-gray-50"
                        }`}
                      >
                        <div className={`text-2xl font-bold ${
                          index === 0 ? "text-yellow-600" :
                          index === 1 ? "text-gray-600" :
                          index === 2 ? "text-orange-600" :
                          "text-gray-400"
                        }`}>
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{entry.name}</p>
                          <p className="text-sm text-gray-500">{formatTime(entry.time)} • {entry.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-800">${(entry.score / 100).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )

  return (
    <>
      <div ref={gameContainerRef} className="relative">
        <AnimatePresence mode="wait">
          {gameState === "splash" && renderSplashScreen()}
          {gameState === "difficulty" && renderDifficultyScreen()}
          {gameState === "playing" && renderGameScreen()}
          {gameState === "gameOver" && renderGameOver()}
        </AnimatePresence>
      </div>

      {/* Informational Content Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Coin Challenge Saving: A Simple, Proven Way to Save Money at Home
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Coin Challenge Saving is a practical money-saving method where you regularly save coins daily, weekly, or by rule-based challenges to build consistent savings over time. Using tools like a coin saving chart, coin saving challenge tracker, or a coin saving challenge printable, you can turn spare change into a meaningful fund with minimal effort.
            </p>
          </div>

          {/* What Is Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">💰</span>
              What Is Coin Challenge Saving?
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Coin Challenge Saving is a structured yet flexible coin saving method that encourages people to save loose change intentionally rather than spending it unknowingly. Instead of random saving, you follow coin challenge rules such as saving one coin per day, increasing amounts weekly, or collecting specific denominations.
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">This approach works because it:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Removes pressure from saving large amounts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Builds consistency and financial discipline</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-500 text-2xl">✓</span>
                  <span className="text-gray-700">Turns saving into a habit (and even a game)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How to Save Coins Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🏠</span>
              How to Save Coins at Home Effectively
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              If you're wondering how to save coins at home without feeling restricted, the key is visibility and simplicity.
            </p>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Practical Steps:</h3>
              <ol className="space-y-3 list-decimal list-inside">
                <li className="text-gray-700 text-lg">Choose a dedicated container (jar, box, or piggy bank)</li>
                <li className="text-gray-700 text-lg">Set a clear rule (daily, weekly, or challenge-based)</li>
                <li className="text-gray-700 text-lg">Track progress using a coin saving chart or printable</li>
                <li className="text-gray-700 text-lg">Avoid breaking the jar unless it's an emergency</li>
              </ol>
            </div>
          </div>

          {/* Popular Challenges Section with Image */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Popular Coin Saving Challenge Ideas
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              There's no one-size-fits-all approach. Here are proven coin saving challenge ideas based on experience and real-world usage:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Easy Coin Saving Challenge</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-gray-700">Save one coin per day</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-gray-700">Best for beginners or kids</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600">•</span>
                    <span className="text-gray-700">Builds habit without stress</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">2. 52 Week Coin Saving Challenge</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Save increasing amounts weekly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Example: Week 1 = 1 coin, Week 52 = 52 coins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Ideal for long-term discipline</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Pound Coin Saving Challenge</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Save only pound coins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Simple, fast, and surprisingly powerful</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Popular in the UK</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">4. Coin Savings Challenge for Families</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">Everyone contributes spare change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">Great for teaching kids financial responsibility</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/coin-savings-challenge.png" 
                alt="Coin Savings Challenge Examples" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Coin Challenge Rules Section with Image */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">📋</span>
              Coin Challenge Rules That Actually Work
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Clear coin challenge rules are essential for success. Without structure, most people quit early.
            </p>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Effective rules include:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🔒</span>
                  <span className="text-gray-700 font-medium">Never remove coins once added</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📅</span>
                  <span className="text-gray-700 font-medium">Save on a fixed schedule</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <span className="text-gray-700 font-medium">Track every deposit</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📈</span>
                  <span className="text-gray-700 font-medium">Increase difficulty gradually</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4 italic">Rules create commitment, and commitment creates results.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/coin-challenge-rules.png" 
                alt="Coin Challenge Rules" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Chart and Tracker Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">📈</span>
              Using a Coin Saving Chart and Tracker
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Visual tools dramatically increase saving success.
            </p>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Use a Coin Saving Chart?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-2xl">✓</span>
                  <span className="text-gray-700">Shows progress clearly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-2xl">✓</span>
                  <span className="text-gray-700">Increases motivation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 text-2xl">✓</span>
                  <span className="text-gray-700">Reduces the chance of quitting</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-4">A coin saving challenge tracker allows you to tick off saved coins or amounts, giving a sense of achievement.</p>
            </div>
          </div>

          {/* Printable Section with Image */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🖨️</span>
              Coin Saving Challenge Printable (Free & Paid Options)
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              A coin saving challenge printable helps you stay organized and focused. Many people prefer a coin saving challenge printable free version to start.
            </p>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">What a Good Printable Includes:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎯</span>
                  <span className="text-gray-700">Clear saving goals</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📆</span>
                  <span className="text-gray-700">Weekly or daily sections</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💯</span>
                  <span className="text-gray-700">Space for totals</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💪</span>
                  <span className="text-gray-700">Motivational prompts</span>
                </div>
              </div>
              <p className="text-gray-700 mt-4">You can also use a coin savings challenge template digitally or print it for fridge display.</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/images/coin-saving-challenge-date.png" 
                alt="Coin Saving Challenge Date Tracker" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Template Selection Table */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎨</span>
              Choosing the Right Coin Saving Challenge Template
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              A coin saving challenge template should match your lifestyle.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                    <th className="px-6 py-4 text-left text-gray-800 font-semibold rounded-tl-xl">Lifestyle</th>
                    <th className="px-6 py-4 text-left text-gray-800 font-semibold rounded-tr-xl">Recommended Template</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-700 font-medium">Busy professionals</td>
                    <td className="px-6 py-4 text-gray-700">Weekly coin tracker</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 font-medium">Families</td>
                    <td className="px-6 py-4 text-gray-700">Shared savings chart</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-gray-700 font-medium">Beginners</td>
                    <td className="px-6 py-4 text-gray-700">Easy coin saving challenge</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-gray-700 font-medium">Long-term planners</td>
                    <td className="px-6 py-4 text-gray-700">52 week coin saving challenge</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 mt-6 text-lg italic">Templates reduce friction making saving feel automatic rather than forced.</p>
          </div>

          {/* Psychology Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🧠</span>
              Coin Saving Method: Why It Works Psychologically
            </h2>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">The coin saving method works because:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-2xl">•</span>
                  <span className="text-gray-700 text-lg">Coins feel "small" and painless to save</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-2xl">•</span>
                  <span className="text-gray-700 text-lg">Physical action reinforces habit formation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-500 text-2xl">•</span>
                  <span className="text-gray-700 text-lg">Progress is visible and tangible</span>
                </li>
              </ul>
              <p className="text-gray-700 mt-6 bg-white/50 p-4 rounded-xl">Behavioral finance studies show people save more when money is physically separated and visually tracked.</p>
            </div>
          </div>

          {/* Common Mistakes */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">⚠️</span>
              Common Mistakes to Avoid
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Even simple challenges can fail if done incorrectly.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">❌</span>
                  <span className="text-gray-800 font-semibold text-lg">No clear goal</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">❌</span>
                  <span className="text-gray-800 font-semibold text-lg">Breaking the jar early</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">❌</span>
                  <span className="text-gray-800 font-semibold text-lg">Choosing unrealistic rules</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">❌</span>
                  <span className="text-gray-800 font-semibold text-lg">Not tracking progress</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mt-6 text-lg">Using a coin saving chart or coin saving challenge tracker eliminates most of these problems.</p>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-4xl">❓</span>
              FAQs: Coin Challenge Saving
            </h2>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is Coin Challenge Saving suitable for beginners?</h3>
                <p className="text-gray-700 text-lg">Yes. An easy coin saving challenge is one of the best entry-level saving methods available.</p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">How much can I realistically save?</h3>
                <p className="text-gray-700 text-lg">Depending on the challenge, anywhere from small emergency funds to hundreds of pounds or dollars annually.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Do I need a printable to start?</h3>
                <p className="text-gray-700 text-lg">No, but a coin saving challenge printable free version improves consistency and motivation.</p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can kids participate?</h3>
                <p className="text-gray-700 text-lg">Absolutely. Coin challenges are excellent tools for teaching children money habits.</p>
              </div>
              
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Is this better than digital saving apps?</h3>
                <p className="text-gray-700 text-lg">It complements them. Physical saving builds discipline, while apps track larger financial goals.</p>
              </div>
            </div>
          </div>

          {/* Final Thoughts */}
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 md:p-12 shadow-2xl text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Final Thoughts</h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-6">
              Coin Challenge Saving is more than just collecting spare change — it's a mindset shift.
            </p>
            <p className="text-lg leading-relaxed">
              Whether you use a coin saving challenge template, a pound coin saving challenge, or a 52 week coin saving challenge, the key is consistency, clarity, and commitment. With simple tools like a coin saving chart and realistic coin challenge rules, anyone can turn loose coins into meaningful savings right at home.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
