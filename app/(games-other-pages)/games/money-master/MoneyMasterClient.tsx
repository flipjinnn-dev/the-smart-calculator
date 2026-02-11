"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Trophy, Timer, Play, RotateCcw, Volume2, VolumeX, 
  Info, Star, Award, TrendingUp, Lightbulb, CheckCircle2,
  XCircle, Target, ArrowRight, Sparkles, Brain, X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"

type GameState = "splash" | "tutorial" | "playing" | "levelComplete" | "gameOver"
type Difficulty = "beginner" | "intermediate" | "advanced"
type CurrencyType = "penny" | "nickel" | "dime" | "quarter" | "dollar1" | "dollar5" | "dollar10" | "dollar20" | "dollar50" | "dollar100"

interface Currency {
  id: string
  type: CurrencyType
  value: number
  inBox: boolean
}

interface Level {
  level: number
  target: number
  timeLimit: number | null
  moveLimit: number | null
  hint: boolean
  difficulty: Difficulty
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
}

interface GameStats {
  totalPlayed: number
  perfectScores: number
  averageTime: number
  bestStreak: number
  accuracy: number
}

const CURRENCY_CONFIG: Record<CurrencyType, {
  value: number
  label: string
  type: "coin" | "bill"
  color: string
  gradient: string
  borderColor: string
}> = {
  penny: { value: 0.01, label: "1¢", type: "coin", color: "bg-amber-600", gradient: "from-amber-600 via-orange-500 to-amber-700", borderColor: "border-amber-800" },
  nickel: { value: 0.05, label: "5¢", type: "coin", color: "bg-gray-400", gradient: "from-gray-400 via-slate-300 to-gray-500", borderColor: "border-gray-700" },
  dime: { value: 0.10, label: "10¢", type: "coin", color: "bg-slate-400", gradient: "from-slate-400 via-gray-300 to-slate-500", borderColor: "border-slate-700" },
  quarter: { value: 0.25, label: "25¢", type: "coin", color: "bg-zinc-300", gradient: "from-zinc-300 via-gray-200 to-zinc-400", borderColor: "border-zinc-600" },
  dollar1: { value: 1.00, label: "$1", type: "bill", color: "bg-green-100", gradient: "from-green-100 via-emerald-50 to-green-200", borderColor: "border-green-600" },
  dollar5: { value: 5.00, label: "$5", type: "bill", color: "bg-purple-100", gradient: "from-purple-100 via-violet-50 to-purple-200", borderColor: "border-purple-600" },
  dollar10: { value: 10.00, label: "$10", type: "bill", color: "bg-yellow-100", gradient: "from-yellow-100 via-amber-50 to-yellow-200", borderColor: "border-yellow-600" },
  dollar20: { value: 20.00, label: "$20", type: "bill", color: "bg-lime-100", gradient: "from-lime-100 via-green-50 to-lime-200", borderColor: "border-lime-700" },
  dollar50: { value: 50.00, label: "$50", type: "bill", color: "bg-pink-100", gradient: "from-pink-100 via-rose-50 to-pink-200", borderColor: "border-pink-600" },
  dollar100: { value: 100.00, label: "$100", type: "bill", color: "bg-blue-100", gradient: "from-blue-100 via-sky-50 to-blue-200", borderColor: "border-blue-600" },
}

const LEVEL_CONFIGS: Record<Difficulty, { levels: Partial<Level>[] }> = {
  beginner: {
    levels: [
      { target: 0.26, timeLimit: null, moveLimit: null, hint: true },
      { target: 0.50, timeLimit: null, moveLimit: null, hint: true },
      { target: 1.00, timeLimit: null, moveLimit: null, hint: true },
      { target: 1.25, timeLimit: null, moveLimit: null, hint: true },
      { target: 2.75, timeLimit: null, moveLimit: null, hint: true },
    ]
  },
  intermediate: {
    levels: [
      { target: 3.47, timeLimit: 60, moveLimit: null, hint: false },
      { target: 5.82, timeLimit: 60, moveLimit: null, hint: false },
      { target: 8.99, timeLimit: 50, moveLimit: null, hint: false },
      { target: 12.65, timeLimit: 50, moveLimit: null, hint: false },
      { target: 18.43, timeLimit: 45, moveLimit: null, hint: false },
    ]
  },
  advanced: {
    levels: [
      { target: 23.78, timeLimit: 45, moveLimit: 15, hint: false },
      { target: 47.91, timeLimit: 40, moveLimit: 12, hint: false },
      { target: 83.42, timeLimit: 35, moveLimit: 10, hint: false },
      { target: 125.67, timeLimit: 30, moveLimit: 8, hint: false },
      { target: 199.99, timeLimit: 25, moveLimit: 7, hint: false },
    ]
  }
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_win", title: "First Victory!", description: "Complete your first level", icon: "🎯", unlocked: false },
  { id: "perfect_score", title: "Perfect!", description: "Complete a level on first try", icon: "⭐", unlocked: false },
  { id: "speed_demon", title: "Speed Demon", description: "Complete a level in under 10 seconds", icon: "⚡", unlocked: false },
  { id: "efficient", title: "Efficiency Expert", description: "Use minimum moves", icon: "🎓", unlocked: false },
  { id: "streak_5", title: "Hot Streak", description: "Complete 5 levels in a row", icon: "🔥", unlocked: false },
  { id: "master", title: "Money Master", description: "Complete all difficulty levels", icon: "👑", unlocked: false },
]

export default function MoneyMasterClient() {
  const [gameState, setGameState] = useState<GameState>("splash")
  const [difficulty, setDifficulty] = useState<Difficulty>("beginner")
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0)
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [availableCurrency, setAvailableCurrency] = useState<Currency[]>([])
  const [boxCurrency, setBoxCurrency] = useState<Currency[]>([])
  const [boxTotal, setBoxTotal] = useState(0)
  const [time, setTime] = useState(0)
  const [moves, setMoves] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showTutorial, setShowTutorial] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS)
  const [stats, setStats] = useState<GameStats>({
    totalPlayed: 0,
    perfectScores: 0,
    averageTime: 0,
    bestStreak: 0,
    accuracy: 0
  })
  const [currentStreak, setCurrentStreak] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [shake, setShake] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const savedStats = localStorage.getItem("moneyMasterStats")
    if (savedStats) setStats(JSON.parse(savedStats))
    
    const savedAchievements = localStorage.getItem("moneyMasterAchievements")
    if (savedAchievements) setAchievements(JSON.parse(savedAchievements))
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

  const playSound = useCallback((frequency: number, duration: number = 0.1, type: OscillatorType = "sine") => {
    if (!soundEnabled || !audioContextRef.current) return
    
    try {
      const ctx = audioContextRef.current
      if (ctx.state === 'suspended') ctx.resume()
      
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = type
      gainNode.gain.setValueAtTime(0.2, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + duration)
    } catch (error) {
      console.error('Sound error:', error)
    }
  }, [soundEnabled])

  const playDropSound = useCallback(() => playSound(400, 0.1), [playSound])
  const playSuccessSound = useCallback(() => {
    playSound(523, 0.15)
    setTimeout(() => playSound(659, 0.15), 100)
    setTimeout(() => playSound(784, 0.2), 200)
  }, [playSound])
  const playErrorSound = useCallback(() => playSound(200, 0.3, "sawtooth"), [playSound])

  const generateCurrency = useCallback((target: number): Currency[] => {
    const currency: Currency[] = []
    const types: CurrencyType[] = target >= 10 
      ? ["penny", "nickel", "dime", "quarter", "dollar1", "dollar5", "dollar10", "dollar20"]
      : target >= 1
      ? ["penny", "nickel", "dime", "quarter", "dollar1", "dollar5"]
      : ["penny", "nickel", "dime", "quarter"]
    
    if (target >= 50) types.push("dollar50")
    if (target >= 100) types.push("dollar100")

    types.forEach(type => {
      const count = type.includes("dollar") ? 
        (CURRENCY_CONFIG[type].value <= target ? Math.min(3, Math.ceil(target / CURRENCY_CONFIG[type].value)) : 1) :
        Math.min(4, Math.ceil(target / CURRENCY_CONFIG[type].value) + 2)
      
      for (let i = 0; i < count; i++) {
        currency.push({
          id: `${type}-${Date.now()}-${Math.random()}`,
          type,
          value: CURRENCY_CONFIG[type].value,
          inBox: false
        })
      }
    })

    return currency.sort(() => Math.random() - 0.5)
  }, [])

  const startLevel = useCallback((levelIndex: number) => {
    const levelConfig = LEVEL_CONFIGS[difficulty].levels[levelIndex]
    if (!levelConfig) return

    const level: Level = {
      level: levelIndex + 1,
      target: levelConfig.target!,
      timeLimit: levelConfig.timeLimit!,
      moveLimit: levelConfig.moveLimit!,
      hint: levelConfig.hint!,
      difficulty
    }

    setCurrentLevel(level)
    setCurrentLevelIndex(levelIndex)
    setAvailableCurrency(generateCurrency(level.target))
    setBoxCurrency([])
    setBoxTotal(0)
    setTime(0)
    setMoves(0)
    setAttempts(0)
    setFeedback(null)
    setShowHint(false)
    setGameState("playing")
    initAudio()

    if (level.timeLimit) {
      timerRef.current = setInterval(() => {
        setTime(t => {
          if (t + 1 >= level.timeLimit!) {
            handleTimeOut()
            return t
          }
          return t + 1
        })
      }, 1000)
    }
  }, [difficulty, generateCurrency, initAudio])

  const handleTimeOut = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    playErrorSound()
    setFeedback("Time's up! Try again.")
    setTimeout(() => setGameState("gameOver"), 2000)
  }, [playErrorSound])

  const handleDragStart = (currencyId: string, fromBox: boolean) => {
    setDraggedItem(currencyId)
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
  }

  const handleDrop = (toBox: boolean) => {
    if (!draggedItem) return

    const fromBox = boxCurrency.some(c => c.id === draggedItem)

    if (fromBox && !toBox) {
      const currency = boxCurrency.find(c => c.id === draggedItem)
      if (currency) {
        setBoxCurrency(prev => prev.filter(c => c.id !== draggedItem))
        setAvailableCurrency(prev => [...prev, { ...currency, inBox: false }])
        setBoxTotal(prev => prev - currency.value)
        setMoves(m => m + 1)
        playDropSound()
      }
    } else if (!fromBox && toBox) {
      const currency = availableCurrency.find(c => c.id === draggedItem)
      if (currency) {
        setAvailableCurrency(prev => prev.filter(c => c.id !== draggedItem))
        setBoxCurrency(prev => [...prev, { ...currency, inBox: true }])
        setBoxTotal(prev => prev + currency.value)
        setMoves(m => m + 1)
        playDropSound()
      }
    }

    setDraggedItem(null)
  }

  const checkAnswer = () => {
    if (!currentLevel) return

    setAttempts(a => a + 1)
    const difference = Math.abs(boxTotal - currentLevel.target)

    if (difference < 0.001) {
      handleLevelComplete()
    } else {
      playErrorSound()
      setShake(true)
      setTimeout(() => setShake(false), 500)
      
      if (boxTotal > currentLevel.target) {
        setFeedback(`Too much! You have $${boxTotal.toFixed(2)} but need $${currentLevel.target.toFixed(2)}`)
      } else {
        setFeedback(`Not enough! You have $${boxTotal.toFixed(2)} but need $${currentLevel.target.toFixed(2)}`)
      }

      if (currentLevel.hint && attempts >= 1) {
        setTimeout(() => setShowHint(true), 1000)
      }
    }
  }

  const handleLevelComplete = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    
    playSuccessSound()
    setCelebrate(true)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    const newStats = { ...stats }
    newStats.totalPlayed++
    if (attempts === 0) newStats.perfectScores++
    newStats.averageTime = ((newStats.averageTime * (newStats.totalPlayed - 1)) + time) / newStats.totalPlayed
    newStats.accuracy = (newStats.perfectScores / newStats.totalPlayed) * 100
    
    const newStreak = currentStreak + 1
    setCurrentStreak(newStreak)
    if (newStreak > newStats.bestStreak) newStats.bestStreak = newStreak

    setStats(newStats)
    localStorage.setItem("moneyMasterStats", JSON.stringify(newStats))

    checkAchievements(newStats, newStreak)

    const insight = generateInsight()
    setFeedback(insight)

    setTimeout(() => {
      setCelebrate(false)
      if (currentLevelIndex < LEVEL_CONFIGS[difficulty].levels.length - 1) {
        setGameState("levelComplete")
      } else {
        setGameState("gameOver")
      }
    }, 2000)
  }

  const generateInsight = (): string => {
    if (!currentLevel) return "Great job!"

    const billsUsed = boxCurrency.filter(c => CURRENCY_CONFIG[c.type].type === "bill").length
    const coinsUsed = boxCurrency.filter(c => CURRENCY_CONFIG[c.type].type === "coin").length

    if (moves <= 3 && currentLevel.target < 1) {
      return `💡 Excellent! You used the fewest coins possible (${coinsUsed} coins)`
    } else if (moves <= 5 && currentLevel.target >= 1) {
      return `💡 Smart choice! You used ${billsUsed} bills and ${coinsUsed} coins efficiently`
    } else if (coinsUsed > 10) {
      return `💡 Tip: Try using larger bills instead of many coins next time`
    } else if (time <= 10 && currentLevel.timeLimit) {
      return `⚡ Lightning fast! Completed in ${time} seconds!`
    } else {
      return `✨ Well done! You made it in ${moves} moves`
    }
  }

  const checkAchievements = (newStats: GameStats, streak: number) => {
    const newAchievements = [...achievements]
    let unlocked = false

    if (newStats.totalPlayed === 1 && !newAchievements[0].unlocked) {
      newAchievements[0].unlocked = true
      unlocked = true
    }
    if (attempts === 0 && !newAchievements[1].unlocked) {
      newAchievements[1].unlocked = true
      unlocked = true
    }
    if (time <= 10 && currentLevel?.timeLimit && !newAchievements[2].unlocked) {
      newAchievements[2].unlocked = true
      unlocked = true
    }
    if (moves <= 3 && !newAchievements[3].unlocked) {
      newAchievements[3].unlocked = true
      unlocked = true
    }
    if (streak >= 5 && !newAchievements[4].unlocked) {
      newAchievements[4].unlocked = true
      unlocked = true
    }

    if (unlocked) {
      setAchievements(newAchievements)
      localStorage.setItem("moneyMasterAchievements", JSON.stringify(newAchievements))
    }
  }

  const nextLevel = () => {
    startLevel(currentLevelIndex + 1)
  }

  const restartGame = () => {
    setCurrentLevelIndex(0)
    setCurrentStreak(0)
    setGameState("splash")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderCurrency = (currency: Currency, fromBox: boolean = false) => {
    const config = CURRENCY_CONFIG[currency.type]
    const isCoin = config.type === "coin"
    const isDragging = draggedItem === currency.id

    return (
      <motion.div
        key={currency.id}
        draggable
        onDragStart={() => handleDragStart(currency.id, fromBox)}
        onDragEnd={handleDragEnd}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ 
          scale: isDragging ? 1.1 : 1, 
          rotate: 0,
          opacity: isDragging ? 0.5 : 1,
          y: isDragging ? -10 : 0
        }}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className={`
          cursor-grab active:cursor-grabbing touch-none select-none
          ${isCoin ? 'w-14 h-14 sm:w-16 sm:h-16 rounded-full' : 'w-20 h-12 sm:w-24 sm:h-14 rounded-lg'}
          bg-gradient-to-br ${config.gradient}
          border-4 ${config.borderColor}
          shadow-lg hover:shadow-xl
          flex items-center justify-center
          transition-all duration-200
          relative overflow-hidden
        `}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none" />
        <span className={`
          font-bold ${isCoin ? 'text-sm sm:text-base' : 'text-lg sm:text-xl'}
          ${config.borderColor.replace('border', 'text')}
          relative z-10 drop-shadow-sm
        `}>
          {config.label}
        </span>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="p-2 sm:p-4">
      <AnimatePresence mode="wait">
        {gameState === "splash" && (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto py-8"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Money Master
              </div>
              <p className="text-xl sm:text-2xl text-gray-700 font-medium">
                Count Smart, Learn Fast!
              </p>
            </motion.div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-6 sm:p-8 shadow-2xl mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-purple-600" />
                Choose Your Challenge
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {(["beginner", "intermediate", "advanced"] as Difficulty[]).map((diff) => (
                  <motion.button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      p-6 rounded-2xl border-4 transition-all
                      ${difficulty === diff 
                        ? 'border-purple-600 bg-purple-50 shadow-lg' 
                        : 'border-gray-300 bg-white hover:border-purple-400'
                      }
                    `}
                  >
                    <div className="text-4xl mb-2">
                      {diff === "beginner" ? "😊" : diff === "intermediate" ? "🤔" : "🔥"}
                    </div>
                    <h3 className="text-xl font-bold capitalize mb-2">{diff}</h3>
                    <p className="text-sm text-gray-600">
                      {diff === "beginner" && "No time limit, hints enabled"}
                      {diff === "intermediate" && "Time pressure, no hints"}
                      {diff === "advanced" && "Limited time & moves"}
                    </p>
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-4 border-2 border-yellow-200">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">Best Streak</p>
                  <p className="text-2xl font-bold text-yellow-600 text-center">{stats.bestStreak}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-200">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 text-center">Accuracy</p>
                  <p className="text-2xl font-bold text-green-600 text-center">{stats.accuracy.toFixed(0)}%</p>
                </div>
              </div>

              <Button
                onClick={() => startLevel(0)}
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-xl py-6 rounded-2xl shadow-lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Game
              </Button>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button
                  onClick={() => setShowTutorial(true)}
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Info className="w-4 h-4 mr-2" />
                  How to Play
                </Button>
                <Button
                  onClick={() => setShowStats(true)}
                  variant="outline"
                  className="border-2 border-blue-300 text-blue-700 hover:bg-blue-50"
                >
                  <Award className="w-4 h-4 mr-2" />
                  Achievements
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "playing" && currentLevel && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-2xl mb-4">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-xl">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="font-bold text-purple-900">Level {currentLevel.level}</span>
                  </div>
                  {currentLevel.timeLimit && (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                      time > currentLevel.timeLimit * 0.75 ? 'bg-red-100' : 'bg-blue-100'
                    }`}>
                      <Timer className={`w-5 h-5 ${time > currentLevel.timeLimit * 0.75 ? 'text-red-600' : 'text-blue-600'}`} />
                      <span className={`font-bold ${time > currentLevel.timeLimit * 0.75 ? 'text-red-900' : 'text-blue-900'}`}>
                        {formatTime(time)} / {formatTime(currentLevel.timeLimit)}
                      </span>
                    </div>
                  )}
                  {currentLevel.moveLimit && (
                    <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="font-bold text-green-900">
                        {moves} / {currentLevel.moveLimit} moves
                      </span>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-sm text-gray-600 mb-2">Target Amount</p>
                <motion.div
                  animate={celebrate ? { scale: [1, 1.2, 1] } : {}}
                  className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
                >
                  ${currentLevel.target.toFixed(2)}
                </motion.div>
              </div>

              <motion.div
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(true)}
                animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                className={`
                  min-h-[200px] sm:min-h-[250px] bg-gradient-to-br from-purple-50 to-pink-50
                  border-4 border-dashed rounded-3xl p-6
                  flex flex-col items-center justify-center gap-4
                  transition-all duration-300
                  ${boxTotal === currentLevel.target ? 'border-green-500 bg-green-50' : 
                    boxTotal > currentLevel.target ? 'border-red-500' : 'border-purple-300'}
                `}
              >
                <div className="text-center mb-2">
                  <p className="text-sm text-gray-600 mb-1">Money Box</p>
                  <motion.div
                    animate={{ scale: celebrate ? [1, 1.15, 1] : 1 }}
                    className={`text-3xl sm:text-5xl font-bold ${
                      boxTotal === currentLevel.target ? 'text-green-600' :
                      boxTotal > currentLevel.target ? 'text-red-600' : 'text-purple-600'
                    }`}
                  >
                    ${boxTotal.toFixed(2)}
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center">
                  <AnimatePresence>
                    {boxCurrency.map(currency => renderCurrency(currency, true))}
                  </AnimatePresence>
                </div>

                {boxCurrency.length === 0 && (
                  <p className="text-gray-400 text-center">
                    Drag money here to reach ${currentLevel.target.toFixed(2)}
                  </p>
                )}
              </motion.div>

              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-4 p-4 rounded-2xl text-center font-medium ${
                    feedback.includes('💡') || feedback.includes('✨') || feedback.includes('⚡') ? 
                    'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {feedback}
                </motion.div>
              )}

              {showHint && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 p-4 bg-yellow-100 border-2 border-yellow-300 rounded-2xl"
                >
                  <div className="flex items-start gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-yellow-900 mb-1">Hint:</p>
                      <p className="text-sm text-yellow-800">
                        {currentLevel.target < 1 ? 
                          "Try using quarters (25¢) first, then add smaller coins" :
                          "Start with the largest bills, then add smaller denominations"
                        }
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6 flex gap-3">
                <Button
                  onClick={checkAnswer}
                  disabled={boxCurrency.length === 0}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg py-6 rounded-2xl disabled:opacity-50"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Check Answer
                </Button>
                <Button
                  onClick={() => setGameState("splash")}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(false)}
              className="bg-white/90 backdrop-blur rounded-3xl p-4 sm:p-6 shadow-xl"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Available Money
              </h3>
              <div className="flex flex-wrap gap-3 justify-center">
                <AnimatePresence>
                  {availableCurrency.map(currency => renderCurrency(currency, false))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "levelComplete" && (
          <motion.div
            key="levelComplete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto py-16 px-4"
          >
            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 360] }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl font-bold text-gray-800 mb-4">Level Complete! 🎉</h2>
              
              {feedback && (
                <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 mb-6">
                  <div className="flex items-start gap-3 text-left">
                    <Brain className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold text-blue-900 mb-1">Learning Insight</p>
                      <p className="text-blue-800">{feedback}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-purple-50 rounded-xl p-4">
                  <Timer className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="text-xl font-bold text-purple-900">{formatTime(time)}</p>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Moves</p>
                  <p className="text-xl font-bold text-green-900">{moves}</p>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4">
                  <Star className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Attempts</p>
                  <p className="text-xl font-bold text-yellow-900">{attempts + 1}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={nextLevel}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-2xl"
                >
                  Next Level
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={restartGame}
                  variant="outline"
                  size="lg"
                  className="border-2"
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "gameOver" && (
          <motion.div
            key="gameOver"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto py-16 px-4"
          >
            <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <span className="text-6xl">👑</span>
              </motion.div>

              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {currentLevelIndex >= LEVEL_CONFIGS[difficulty].levels.length - 1 ? 
                  "Difficulty Complete!" : "Game Over"}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                You completed {currentLevelIndex + 1} level{currentLevelIndex > 0 ? 's' : ''}!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200">
                  <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Streak</p>
                  <p className="text-2xl font-bold text-yellow-900">{currentStreak}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                  <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Accuracy</p>
                  <p className="text-2xl font-bold text-green-900">{stats.accuracy.toFixed(0)}%</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={restartGame}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-2xl"
                >
                  <RotateCcw className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-800">How to Play 🎮</h3>
                <button
                  onClick={() => setShowTutorial(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Match the Target</h4>
                    <p className="text-gray-600">Drag bills and coins into the money box to match the exact target amount.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">⏱️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Beat the Clock</h4>
                    <p className="text-gray-600">Higher difficulties have time limits. Complete levels before time runs out!</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Earn Achievements</h4>
                    <p className="text-gray-600">Complete challenges to unlock achievements and improve your stats.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Learn Smart Strategies</h4>
                    <p className="text-gray-600">Get helpful insights after each level to improve your money-counting skills!</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-3">💰 Currency Values</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span>Penny:</span>
                    <span className="font-bold">$0.01</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nickel:</span>
                    <span className="font-bold">$0.05</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dime:</span>
                    <span className="font-bold">$0.10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quarter:</span>
                    <span className="font-bold">$0.25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$1 Bill:</span>
                    <span className="font-bold">$1.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$5 Bill:</span>
                    <span className="font-bold">$5.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$10 Bill:</span>
                    <span className="font-bold">$10.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>$20 Bill:</span>
                    <span className="font-bold">$20.00</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showStats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={() => setShowStats(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold text-gray-800">Achievements 🏆</h3>
                <button
                  onClick={() => setShowStats(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid gap-4 mb-8">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-2xl border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-300'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`text-4xl ${achievement.unlocked ? '' : 'grayscale'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg">{achievement.title}</h4>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                      {achievement.unlocked && (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <h4 className="font-bold text-lg mb-4">📊 Your Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Games Played</p>
                    <p className="text-2xl font-bold text-purple-900">{stats.totalPlayed}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Perfect Scores</p>
                    <p className="text-2xl font-bold text-green-900">{stats.perfectScores}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Best Streak</p>
                    <p className="text-2xl font-bold text-yellow-900">{stats.bestStreak}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Accuracy</p>
                    <p className="text-2xl font-bold text-blue-900">{stats.accuracy.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      {/* SEO Content Section */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Main Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Counting Money Game: The Best Way for Kids to Learn Money Skills Through Play
            </h1>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
              A counting money game is an interactive learning activity digital or hands-on that helps children recognize coins and bills, understand their values, and practice real-world math skills like addition, subtraction, and making change. From counting money games for kids to counting money games online that are free and interactive, these tools make financial literacy fun, age-appropriate, and effective.
            </p>
          </div>

          {/* What Is Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎮</span>
              What Is a Counting Money Game?
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              A counting money game is an educational game designed to teach children how to identify, count, and use money correctly. These games typically focus on:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💰</span>
                  <h3 className="font-semibold text-gray-900">Currency Recognition</h3>
                </div>
                <p className="text-gray-700">Recognizing coins and bills (pennies, nickels, dimes, quarters, dollars)</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔢</span>
                  <h3 className="font-semibold text-gray-900">Monetary Value</h3>
                </div>
                <p className="text-gray-700">Understanding monetary value and equivalence</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">➕</span>
                  <h3 className="font-semibold text-gray-900">Math Operations</h3>
                </div>
                <p className="text-gray-700">Adding and subtracting money amounts</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border-2 border-yellow-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">💵</span>
                  <h3 className="font-semibold text-gray-900">Making Change</h3>
                </div>
                <p className="text-gray-700">Calculating change in real-world scenarios</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              Counting money games can be physical (using play coins) or digital, such as a counting money game online that simulates shopping, banking, or earning rewards. Educational experts and elementary teachers often recommend counting money practice games because they combine math skills with practical life learning.
            </p>
          </div>

          {/* Why Important Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">⭐</span>
              Why Counting Money Games Are Important for Kids
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Learning to count money is a foundational life skill. Using counting money games for kids helps children:
            </p>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl font-bold">•</span>
                  <span className="text-gray-700 text-lg">Build early financial literacy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl font-bold">•</span>
                  <span className="text-gray-700 text-lg">Strengthen math confidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl font-bold">•</span>
                  <span className="text-gray-700 text-lg">Improve number sense and problem-solving</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl font-bold">•</span>
                  <span className="text-gray-700 text-lg">Apply classroom learning to real-world situations</span>
                </li>
              </ul>
            </div>
            <p className="text-gray-700 text-lg italic bg-purple-50 p-4 rounded-xl">
              According to child development research, game-based learning increases engagement and retention especially for abstract concepts like money value. That&apos;s why money counting game kids activities are widely used in schools, homeschooling, and educational apps.
            </p>
          </div>

          {/* Types of Games Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎯</span>
              Types of Counting Money Games
            </h2>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">💻</span>
                  1. Counting Money Games Online
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A counting money game online allows kids to practice anytime using a computer, tablet, or phone. Many platforms offer:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">Drag-and-drop coins and bills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">Virtual shopping scenarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600">•</span>
                    <span className="text-gray-700">Timed challenges and quizzes</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 italic">
                  Best of all, many parents search specifically for a counting money game free, which makes online learning accessible without extra cost.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">🎲</span>
                  2. Counting Money Games for Kids (Offline & Hands-On)
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Offline counting money games for kids use physical materials like:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Plastic coins and bills</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Printable worksheets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span className="text-gray-700">Board games and card games</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 italic">
                  These tactile experiences are especially helpful for younger learners who benefit from hands-on interaction.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="text-3xl">📊</span>
                  3. Counting Money Practice Games
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A counting money practice game focuses on repetition and mastery. These are ideal for:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Test preparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Reinforcement after lessons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600">•</span>
                    <span className="text-gray-700">Extra practice at home</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4 italic">
                  They often include instant feedback, which helps kids quickly correct mistakes and build confidence.
                </p>
              </div>
            </div>
          </div>

          {/* Grade Level Activities Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">📚</span>
              Counting Money Activities for Different Grade Levels
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Counting Money Activities for Kindergarten</h3>
                <p className="text-gray-700 mb-3">At the kindergarten level, counting money activities for kindergarten focus on:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">👀</span>
                    <span className="text-gray-700 font-medium">Identifying coins</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">🎨</span>
                    <span className="text-gray-700 font-medium">Sorting by size and color</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">🔗</span>
                    <span className="text-gray-700 font-medium">Matching to values</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-3 italic">Games at this stage emphasize recognition rather than complex math.</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Counting Money Activities for 1st Grade</h3>
                <p className="text-gray-700 mb-3">Counting money activities for 1st grade introduce:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">🪙</span>
                    <span className="text-gray-700 font-medium">Counting mixed coins</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">➕</span>
                    <span className="text-gray-700 font-medium">Simple addition</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">⚖️</span>
                    <span className="text-gray-700 font-medium">Understanding more/less</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-3 italic">Interactive counting money games help first graders connect numbers to real value.</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Counting Money Activities for 2nd Grade</h3>
                <p className="text-gray-700 mb-3">By second grade, counting money activities for 2nd grade become more advanced:</p>
                <div className="grid md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">🧮</span>
                    <span className="text-gray-700 font-medium">Adding/subtracting money</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">💵</span>
                    <span className="text-gray-700 font-medium">Making change</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/50 p-3 rounded-lg">
                    <span className="text-2xl">📖</span>
                    <span className="text-gray-700 font-medium">Solving word problems</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-3 italic">
                  Many counting money games online are specifically designed for this level, combining math challenges with real-world scenarios like shopping.
                </p>
              </div>
            </div>
          </div>

          {/* What to Look For Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🔍</span>
              Counting Money Games Online for Kids: What to Look For
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              When choosing counting money games online for kids, look for:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Age-Appropriate Difficulty</h3>
                  <p className="text-gray-700">Matches your child&apos;s skill level</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-xl">
                <span className="text-3xl">👁️</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Clear Visuals</h3>
                  <p className="text-gray-700">Realistic coins and bills</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-green-50 p-4 rounded-xl">
                <span className="text-3xl">🔊</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Audio Instructions</h3>
                  <p className="text-gray-700">Helpful for early readers</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-yellow-50 p-4 rounded-xl">
                <span className="text-3xl">📈</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Progress Tracking</h3>
                  <p className="text-gray-700">Monitor improvement over time</p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-lg mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl italic">
              High-quality counting money games free often come from trusted educational platforms and are aligned with school math standards.
            </p>
          </div>

          {/* Beyond Games Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎪</span>
              Counting Money Activities for Kids Beyond Games
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              In addition to games, effective counting money activities for kids include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-xl p-5 border-2 border-pink-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🏪</span>
                  <h3 className="font-semibold text-gray-900">Pretend Stores</h3>
                </div>
                <p className="text-gray-700">Set up restaurants or shops at home</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border-2 border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">💰</span>
                  <h3 className="font-semibold text-gray-900">Allowance Tracking</h3>
                </div>
                <p className="text-gray-700">Teach budgeting with real money</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-5 border-2 border-green-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🛒</span>
                  <h3 className="font-semibold text-gray-900">Shopping Practice</h3>
                </div>
                <p className="text-gray-700">Involve kids in real purchases</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-5 border-2 border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🔢</span>
                  <h3 className="font-semibold text-gray-900">Coin Sorting</h3>
                </div>
                <p className="text-gray-700">Challenge kids to organize by value</p>
              </div>
            </div>
            <p className="text-gray-700 text-lg mt-6 italic bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              Combining these activities with a counting money practice game creates a well-rounded learning experience.
            </p>
          </div>

          {/* Educational Value Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎓</span>
              Educational Value and Perspective
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              From an Experience, Expertise, Authoritativeness, and Trust (E-E-A-T) standpoint:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">👩‍🏫</span>
                  <h3 className="font-bold text-gray-900">Teachers</h3>
                </div>
                <p className="text-gray-700">Use counting money games in classrooms to support math curricula</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🧠</span>
                  <h3 className="font-bold text-gray-900">Psychologists</h3>
                </div>
                <p className="text-gray-700">Support game-based learning for cognitive development</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">🏫</span>
                  <h3 className="font-bold text-gray-900">Educational Platforms</h3>
                </div>
                <p className="text-gray-700">Align counting money games online with national standards</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">✅</span>
                  <h3 className="font-bold text-gray-900">Result</h3>
                </div>
                <p className="text-gray-700">Makes money counting games both credible and effective learning tools</p>
              </div>
            </div>
          </div>

          {/* FAQs Section */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-4xl">❓</span>
              FAQs About Counting Money Games
            </h2>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-l-4 border-purple-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What is the best counting money game for kids?</h3>
                <p className="text-gray-700 leading-relaxed">
                  The best counting money game for kids depends on age and skill level. Younger children benefit from simple recognition games, while older kids need problem-solving and change-making challenges.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Are there counting money games online that are free?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. Many platforms offer a counting money game free, including interactive browser-based games and printable activities.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Can counting money games help with real-life math skills?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Absolutely. Counting money games improve addition, subtraction, and critical thinking, all while teaching practical life skills.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">What age should kids start using money counting games?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Kids can start money counting game kids activities as early as kindergarten, with age-appropriate counting money activities for kindergarten.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Are counting money games suitable for homeschooling?</h3>
                <p className="text-gray-700 leading-relaxed">
                  Yes. Counting money games online for kids and offline activities are widely used in homeschooling for flexible, engaging instruction.
                </p>
              </div>
            </div>
          </div>

          {/* Final Thoughts Section */}
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <span className="text-4xl">💭</span>
              Final Thoughts
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              A counting money game is more than just a math activity it&apos;s a bridge between classroom learning and real-world skills. Whether you choose counting money games online, hands-on activities, or a counting money practice game, these tools help children build confidence, independence, and financial awareness from an early age.
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
              <p className="text-xl font-semibold text-center">
                Start playing today and watch your child master money counting skills through fun, interactive learning! 💰✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
