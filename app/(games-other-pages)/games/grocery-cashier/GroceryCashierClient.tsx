"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingCart, DollarSign, Calculator, CreditCard, Wallet,
  Clock, Star, Trophy, Play, Home, Volume2, VolumeX, 
  Plus, Minus, Check, X, ChevronRight, RotateCcw, Target,
  Zap, Award, TrendingUp, Timer, CheckCircle2, XCircle, Maximize2, Minimize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { getLevelConfig, generateTransaction, LEVELS, Transaction, Level } from "@/lib/games/grocery-cashier-levels"
import { CURRENCY, isValidChange, formatCurrency, calculateMinimumChange, CurrencyDenomination } from "@/lib/games/grocery-cashier-currency"
import GroceryCashierContent from "./content"

type GameState = "menu" | "shopping" | "payment" | "change" | "levelComplete" | "gameOver"

interface GameProgress {
  currentLevel: number
  highestLevel: number
  totalScore: number
  totalStars: number
}

const INITIAL_PROGRESS: GameProgress = {
  currentLevel: 1,
  highestLevel: 1,
  totalScore: 0,
  totalStars: 0
}

export default function GroceryCashierClient() {
  const [gameState, setGameState] = useState<GameState>("menu")
  const [progress, setProgress] = useState<GameProgress>(INITIAL_PROGRESS)
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null)
  const [transaction, setTransaction] = useState<Transaction | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  
  // Shopping cart state
  const [cartItems, setCartItems] = useState<{ name: string; price: number; emoji: string }[]>([])
  const [currentInput, setCurrentInput] = useState("")
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)
  
  // Payment state
  const [paymentInput, setPaymentInput] = useState("")
  const [customerPayment, setCustomerPayment] = useState(0)
  const [changeRequired, setChangeRequired] = useState(0)
  
  // Change making state
  const [selectedChange, setSelectedChange] = useState<Map<number, number>>(new Map())
  const [changeTotal, setChangeTotal] = useState(0)
  
  // Game state
  const [timeLeft, setTimeLeft] = useState(0)
  const [score, setScore] = useState(0)
  const [levelStars, setLevelStars] = useState(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("grocery-cashier-progress")
    if (saved) {
      try {
        setProgress(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to load progress")
      }
    }
  }, [])

  useEffect(() => {
    if (gameState === "shopping" || gameState === "payment" || gameState === "change") {
      localStorage.setItem("grocery-cashier-progress", JSON.stringify(progress))
    }
  }, [progress, gameState])

  const playSound = useCallback((type: "beep" | "success" | "error" | "coin" | "drawer") => {
    if (!soundEnabled) return
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      switch (type) {
        case "beep":
          oscillator.frequency.value = 800
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.1)
          break
        case "success":
          oscillator.frequency.value = 523.25
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.2)
          break
        case "error":
          oscillator.frequency.value = 200
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.3)
          break
        case "coin":
          oscillator.frequency.value = 1000
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.1)
          break
        case "drawer":
          oscillator.frequency.value = 300
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.4)
          break
      }
    } catch (error) {
      console.log("Audio playback failed:", error)
    }
  }, [soundEnabled])

  const startLevel = useCallback((levelNum: number) => {
    const level = getLevelConfig(levelNum)
    if (!level) return
    
    setCurrentLevel(level)
    const trans = generateTransaction(level)
    setTransaction(trans)
    setCartItems([])
    setCurrentInput("")
    setCurrentItemIndex(0)
    setCartTotal(0)
    setPaymentInput("")
    setCustomerPayment(trans.payment)
    setChangeRequired(trans.change)
    setSelectedChange(new Map())
    setChangeTotal(0)
    setTimeLeft(level.timeLimit)
    setScore(0)
    setErrorMessage("")
    setSuccessMessage("")
    setGameState("shopping")
    startTimeRef.current = Date.now()
    
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setGameState("gameOver")
          playSound("error")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [playSound])

  const handleNumberInput = (num: string) => {
    setCurrentInput(prev => prev + num)
    playSound("beep")
  }

  const handleDecimalInput = () => {
    if (!currentInput.includes(".")) {
      setCurrentInput(prev => prev + ".")
      playSound("beep")
    }
  }

  const handleClearInput = () => {
    setCurrentInput("")
    playSound("beep")
  }

  const handleAddItem = () => {
    if (!transaction || !currentInput) return
    
    const price = parseFloat(currentInput)
    if (isNaN(price) || price <= 0) {
      setErrorMessage("Invalid price!")
      playSound("error")
      setTimeout(() => setErrorMessage(""), 2000)
      return
    }
    
    if (currentItemIndex >= transaction.items.length) {
      setErrorMessage("All items added!")
      playSound("error")
      setTimeout(() => setErrorMessage(""), 2000)
      return
    }
    
    const actualItem = transaction.items[currentItemIndex]
    
    // Validate entered price matches actual item price
    const priceDifference = Math.abs(price - actualItem.price)
    if (priceDifference > 0.01) {
      setErrorMessage(`Wrong price! ${actualItem.name} costs ${formatCurrency(actualItem.price)}`)
      playSound("error")
      setScore(prev => Math.max(0, prev - 5))
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    
    cartItems.push({
      name: actualItem.name,
      price: actualItem.price,
      emoji: actualItem.emoji
    })
    
    setCartItems([...cartItems])
    setCartTotal(prev => Math.round((prev + actualItem.price) * 100) / 100)
    setCurrentInput("")
    setCurrentItemIndex(prev => prev + 1)
    playSound("beep")
    setScore(prev => prev + 10)
    setSuccessMessage("Correct price!")
    setTimeout(() => setSuccessMessage(""), 1000)
  }

  const handleCalculateTotal = () => {
    if (!transaction) return
    
    if (cartItems.length !== transaction.items.length) {
      setErrorMessage("Add all items first!")
      playSound("error")
      setTimeout(() => setErrorMessage(""), 2000)
      return
    }
    
    const accuracy = Math.abs(cartTotal - transaction.total)
    if (accuracy > 0.01) {
      setErrorMessage(`Incorrect total! Should be ${formatCurrency(transaction.total)}`)
      playSound("error")
      setScore(prev => Math.max(0, prev - 20))
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    
    playSound("success")
    setSuccessMessage("Correct total!")
    setScore(prev => prev + 50)
    setTimeout(() => {
      setSuccessMessage("")
      setGameState("payment")
    }, 1500)
  }

  const handlePaymentInput = (num: string) => {
    setPaymentInput(prev => prev + num)
    playSound("beep")
  }

  const handlePaymentDecimal = () => {
    if (!paymentInput.includes(".")) {
      setPaymentInput(prev => prev + ".")
      playSound("beep")
    }
  }

  const handleClearPayment = () => {
    setPaymentInput("")
    playSound("beep")
  }

  const handleAcceptPayment = () => {
    if (!transaction) return
    
    const payment = parseFloat(paymentInput)
    if (isNaN(payment) || payment < transaction.total) {
      setErrorMessage("Insufficient payment!")
      playSound("error")
      setTimeout(() => setErrorMessage(""), 2000)
      return
    }
    
    if (Math.abs(payment - customerPayment) > 0.01) {
      setErrorMessage(`Customer gave ${formatCurrency(customerPayment)}!`)
      playSound("error")
      setScore(prev => Math.max(0, prev - 15))
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    
    playSound("drawer")
    setSuccessMessage("Payment accepted!")
    setScore(prev => prev + 30)
    setTimeout(() => {
      setSuccessMessage("")
      setGameState("change")
    }, 1500)
  }

  const handleSelectCurrency = (value: number) => {
    const current = selectedChange.get(value) || 0
    const newMap = new Map(selectedChange)
    newMap.set(value, current + 1)
    setSelectedChange(newMap)
    
    let total = 0
    newMap.forEach((count, val) => {
      total += count * val
    })
    setChangeTotal(Math.round(total * 100) / 100)
    playSound("coin")
  }

  const handleDeselectCurrency = (value: number) => {
    const current = selectedChange.get(value) || 0
    if (current === 0) return
    
    const newMap = new Map(selectedChange)
    if (current === 1) {
      newMap.delete(value)
    } else {
      newMap.set(value, current - 1)
    }
    setSelectedChange(newMap)
    
    let total = 0
    newMap.forEach((count, val) => {
      total += count * val
    })
    setChangeTotal(Math.round(total * 100) / 100)
    playSound("beep")
  }

  const handleSubmitChange = () => {
    if (!transaction) return
    
    if (!isValidChange(selectedChange, changeRequired)) {
      setErrorMessage(`Wrong change! Need ${formatCurrency(changeRequired)}`)
      playSound("error")
      setScore(prev => Math.max(0, prev - 25))
      setTimeout(() => setErrorMessage(""), 3000)
      return
    }
    
    if (timerRef.current) clearInterval(timerRef.current)
    
    const timeBonus = Math.max(0, timeLeft * 2)
    const finalScore = score + 100 + timeBonus
    setScore(finalScore)
    
    const stars = finalScore >= 300 ? 3 : finalScore >= 200 ? 2 : 1
    setLevelStars(stars)
    
    playSound("success")
    confetti({
      particleCount: stars * 30,
      spread: 70,
      origin: { y: 0.6 }
    })
    
    setProgress(prev => ({
      currentLevel: Math.min(prev.currentLevel + 1, LEVELS.length),
      highestLevel: Math.max(prev.highestLevel, prev.currentLevel + 1),
      totalScore: prev.totalScore + finalScore,
      totalStars: prev.totalStars + stars
    }))
    
    setGameState("levelComplete")
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    setGameState("menu")
    setCurrentLevel(null)
    setTransaction(null)
    setCartItems([])
    setCurrentInput("")
    setCurrentItemIndex(0)
    setCartTotal(0)
    setScore(0)
  }

  return (
    <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-7xl mx-auto">
        
        {gameState === "menu" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 overflow-y-auto"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <ShoppingCart className="w-24 h-24 text-green-600 mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Grocery Cashier
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Master the cash register! Ring up items, accept payments, and give correct change in this fun simulation game.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <Trophy className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600">{progress.currentLevel}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <Star className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-yellow-600">{progress.totalStars}</div>
                  <div className="text-sm text-gray-600">Total Stars</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                  <Award className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-600">{progress.totalScore}</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
              </div>
              
              <Button
                onClick={() => startLevel(progress.currentLevel)}
                className="w-full py-8 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg"
                size="lg"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Level {progress.currentLevel}
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                Sound {soundEnabled ? "On" : "Off"}
              </button>
            </div>

            {/* SEO Content Section */}
            <GroceryCashierContent />
          </motion.div>
        )}

        {(gameState === "shopping" || gameState === "payment" || gameState === "change") && currentLevel && transaction && (
          <div className="h-[90vh] flex flex-col gap-2 overflow-hidden">
            {/* Customer Section */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 shadow-xl border-2 border-purple-300 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  {gameState === "shopping" ? "🧑" : gameState === "payment" ? "💰" : "😊"}
                </motion.div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-purple-700">Customer</div>
                  <div className="text-sm font-bold text-purple-900">
                    {gameState === "shopping" && "Waiting for items to be scanned..."}
                    {gameState === "payment" && `Paying ${formatCurrency(customerPayment)}`}
                    {gameState === "change" && "Waiting for change..."}
                  </div>
                </div>
                <div className="text-3xl">
                  {gameState === "shopping" && "🛒"}
                  {gameState === "payment" && "💳"}
                  {gameState === "change" && "💵"}
                </div>
              </div>
            </motion.div>

            <div className="bg-white rounded-lg p-2 shadow-lg flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Level {currentLevel.level}</span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {currentLevel.difficulty.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <span className={`font-semibold ${timeLeft < 10 ? "text-red-600" : "text-blue-600"}`}>
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-600">{score}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                >
                  <Home className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Cashier Desk Background */}
            <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl p-2 shadow-2xl border-2 border-amber-300 flex-1 min-h-0 flex flex-col">
              {/* Counter Top */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-xl"></div>
              
              {/* Top Row: Food Items + Calculator */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0 pt-2">
                {/* Food Items Section - Left 50% */}
                <div className="min-h-0 overflow-hidden flex flex-col">
                {gameState === "shopping" && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-2 shadow-lg h-full flex flex-col min-h-0"
                  >
                    <h3 className="text-xs font-bold mb-2 flex items-center gap-1 flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                      Items to Ring Up ({transaction.items.length})
                    </h3>
                    
                    <div className="space-y-1 flex-1 min-h-0 overflow-y-auto">
                      {transaction.items.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-2 rounded transition-all relative ${
                            idx === currentItemIndex
                              ? "bg-blue-100 border-2 border-blue-400 shadow-md"
                              : idx < currentItemIndex
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-200"
                          }`}
                        >
                          {idx === currentItemIndex && (
                            <div className="absolute top-1 right-1 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                              CURRENT
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.emoji}</span>
                            <div className="flex-1">
                              <div className="text-xs font-semibold text-gray-800">{item.name}</div>
                              <div className="text-sm font-bold text-green-600">{formatCurrency(item.price)}</div>
                            </div>
                            {idx < currentItemIndex && (
                              <Check className="w-4 h-4 text-green-600" />
                            )}
                            {idx === currentItemIndex && (
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="text-xl"
                              >
                                👈
                              </motion.div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                </div>

                {/* Calculator Section - Right 50% */}
                <div className="min-h-0 overflow-hidden flex flex-col">
                {gameState === "shopping" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-2 shadow-lg h-full flex flex-col min-h-0"
                  >
                    <h3 className="text-xs font-bold mb-2 flex items-center gap-1 flex-shrink-0">
                      <Calculator className="w-4 h-4 text-green-600" />
                      Cash Register
                    </h3>
                    
                    <div className="mb-2 p-2 bg-gray-900 text-green-400 rounded font-mono text-base text-right flex-shrink-0">
                      {currentInput || "0.00"}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1 flex-1 min-h-0 overflow-auto">
                      {["7", "8", "9", "÷"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => btn !== "÷" && handleNumberInput(btn)}
                          disabled={btn === "÷"}
                          className={`${btn === "÷" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"} h-10`}
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["4", "5", "6", "×"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => btn !== "×" && handleNumberInput(btn)}
                          disabled={btn === "×"}
                          className={`${btn === "×" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"} h-10`}
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      {["1", "2", "3", "-"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => btn !== "-" && handleNumberInput(btn)}
                          disabled={btn === "-"}
                          className={`${btn === "-" ? "bg-gray-200" : "bg-blue-500 hover:bg-blue-600"} h-10`}
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button
                        onClick={() => handleNumberInput("0")}
                        className="bg-blue-500 hover:bg-blue-600 h-10"
                        size="sm"
                      >
                        0
                      </Button>
                      <Button
                        onClick={handleDecimalInput}
                        className="bg-blue-500 hover:bg-blue-600 h-10"
                        size="sm"
                      >
                        .
                      </Button>
                      <Button
                        onClick={handleClearInput}
                        variant="destructive"
                        size="sm"
                        className="h-10"
                      >
                        C
                      </Button>
                      <Button
                        onClick={handleAddItem}
                        className="bg-green-600 hover:bg-green-700 h-10"
                        size="sm"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <Button
                      onClick={handleCalculateTotal}
                      disabled={currentItemIndex < transaction.items.length}
                      className="w-full mt-2 py-2 text-xs bg-gradient-to-r from-green-600 to-blue-600 flex-shrink-0"
                      size="sm"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Calculate Total
                    </Button>
                  </motion.div>
                )}
                </div>
              </div>

              {/* Bottom Row: Shopping Cart + Register Display */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 flex-1 min-h-0 mt-2">
                {/* Shopping Cart - Left 50% */}
                <div className="min-h-0 overflow-hidden flex flex-col">
                  <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 h-full flex flex-col min-h-0">
                    <div className="flex items-center justify-between mb-2 flex-shrink-0">
                      <h3 className="text-xs font-bold flex items-center gap-1">
                        <ShoppingCart className="w-4 h-4 text-green-600" />
                        Cart
                      </h3>
                      <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded px-2 py-1">
                        <div className="text-green-400 font-mono text-sm">{formatCurrency(cartTotal)}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1 flex-1 min-h-0 overflow-y-auto">
                      {cartItems.length === 0 ? (
                        <div className="text-center text-gray-400 py-4 text-xs">
                          No items yet
                        </div>
                      ) : (
                        cartItems.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{item.emoji}</span>
                              <span className="font-semibold text-xs">{item.name}</span>
                            </div>
                            <span className="font-bold text-green-600 text-sm">{formatCurrency(item.price)}</span>
                          </div>
                        ))
                      )}
                    </div>
                    
                    <div className="border-t border-gray-200 pt-1 mt-1 flex-shrink-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm">Total:</span>
                        <span className="font-bold text-base text-green-600">{formatCurrency(cartTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Items List Summary - Right 50% */}
                <div className="min-h-0 overflow-hidden flex flex-col">
                  <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 h-full flex flex-col min-h-0">
                    <h3 className="text-xs font-bold mb-1 flex items-center gap-1 flex-shrink-0">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      Transaction Summary
                    </h3>
                    <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
                      <div className="bg-blue-50 p-2 rounded">
                        <div className="text-[10px] text-gray-600">Items to Scan</div>
                        <div className="text-lg font-bold text-blue-600">{transaction.items.length}</div>
                      </div>
                      <div className="bg-green-50 p-2 rounded">
                        <div className="text-[10px] text-gray-600">Scanned</div>
                        <div className="text-lg font-bold text-green-600">{currentItemIndex}</div>
                      </div>
                      <div className="bg-purple-50 p-2 rounded">
                        <div className="text-[10px] text-gray-600">Expected Total</div>
                        <div className="text-base font-bold text-purple-600">{formatCurrency(transaction.total)}</div>
                      </div>
                      <div className="bg-yellow-50 p-2 rounded">
                        <div className="text-[10px] text-gray-600">Current Total</div>
                        <div className="text-base font-bold text-yellow-600">{formatCurrency(cartTotal)}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === "payment" && currentLevel && transaction && (
          <div className="h-full flex flex-col gap-2 overflow-hidden">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 shadow-xl border-2 border-purple-300 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  💰
                </motion.div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-purple-700">Customer</div>
                  <div className="text-sm font-bold text-purple-900">Paying {formatCurrency(customerPayment)}</div>
                </div>
                <div className="text-3xl">💳</div>
              </div>
            </motion.div>

            <div className="bg-white rounded-lg p-2 shadow-lg flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Level {currentLevel.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-600">{score}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                >
                  <Home className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl p-2 shadow-2xl border-2 border-amber-300 flex-1 min-h-0">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-xl"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full pt-2">
                {/* Payment Calculator - Left 50% */}
                <div className="flex flex-col overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-lg p-2 shadow-lg h-full flex flex-col"
                    >
                    <h3 className="text-xs font-bold mb-1 flex items-center gap-1">
                      <Wallet className="w-4 h-4 text-purple-600" />
                      Accept Payment
                    </h3>
                    
                    <div className="mb-1 p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded border border-purple-300">
                      <div className="text-center">
                        <div className="text-[9px] text-purple-700 font-semibold">Customer Paying:</div>
                        <div className="text-sm font-bold text-purple-900">{formatCurrency(customerPayment)}</div>
                      </div>
                    </div>
                    
                    <div className="mb-1 p-1 bg-gray-900 text-green-400 rounded font-mono text-sm text-right">
                      {paymentInput || "0.00"}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-1 flex-1 min-h-0 overflow-auto">
                      {["7", "8", "9"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => handlePaymentInput(btn)}
                          className="bg-purple-500 hover:bg-purple-600 h-8"
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button className="bg-gray-200 h-8" size="sm" disabled>÷</Button>
                      {["4", "5", "6"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => handlePaymentInput(btn)}
                          className="bg-purple-500 hover:bg-purple-600 h-8"
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button className="bg-gray-200 h-8" size="sm" disabled>×</Button>
                      {["1", "2", "3"].map((btn) => (
                        <Button
                          key={btn}
                          onClick={() => handlePaymentInput(btn)}
                          className="bg-purple-500 hover:bg-purple-600 h-8"
                          size="sm"
                        >
                          {btn}
                        </Button>
                      ))}
                      <Button className="bg-gray-200 h-8" size="sm" disabled>-</Button>
                      <Button
                        onClick={() => handlePaymentInput("0")}
                        className="bg-purple-500 hover:bg-purple-600 h-8"
                        size="sm"
                      >
                        0
                      </Button>
                      <Button
                        onClick={handlePaymentDecimal}
                        className="bg-purple-500 hover:bg-purple-600 h-8"
                        size="sm"
                      >
                        .
                      </Button>
                      <Button
                        onClick={handleClearPayment}
                        variant="destructive"
                        size="sm"
                        className="h-8"
                      >
                        C
                      </Button>
                      <Button className="bg-gray-200 h-8" size="sm" disabled>+</Button>
                    </div>
                    
                    <Button
                      onClick={handleAcceptPayment}
                      className="w-full mt-1 py-2 text-xs bg-gradient-to-r from-purple-600 to-blue-600"
                      size="sm"
                    >
                      <CreditCard className="w-3 h-3 mr-1" />
                      Accept Payment
                    </Button>
                  </motion.div>
                </div>

                {/* Transaction Summary - Right 50% */}
                <div className="flex flex-col overflow-hidden">
                  <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 h-full flex flex-col">
                    <h3 className="text-xs font-bold mb-1 flex items-center gap-1">
                      <ShoppingCart className="w-4 h-4 text-green-600" />
                      Cart Summary
                    </h3>
                    <div className="flex-1 overflow-y-auto space-y-1">
                      {cartItems.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{item.emoji}</span>
                            <span className="font-semibold text-xs">{item.name}</span>
                          </div>
                          <span className="font-bold text-green-600 text-sm">{formatCurrency(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm">Total:</span>
                        <span className="font-bold text-base text-green-600">{formatCurrency(cartTotal)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-purple-700">Customer Paying:</span>
                        <span className="text-sm font-bold text-purple-600">{formatCurrency(customerPayment)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === "change" && currentLevel && transaction && (
          <div className="h-full flex flex-col gap-2 overflow-hidden">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-r from-green-100 to-blue-100 rounded-lg p-3 shadow-xl border-2 border-green-300 flex-shrink-0"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl"
                >
                  💵
                </motion.div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-green-700">Make Change</div>
                  <div className="text-sm font-bold text-green-900">Give {formatCurrency(changeRequired)}</div>
                </div>
                <div className="text-3xl">🪙</div>
              </div>
            </motion.div>

            <div className="bg-white rounded-lg p-2 shadow-lg flex items-center justify-between flex-wrap gap-2 flex-shrink-0">
              <div className="flex items-center gap-2 flex-wrap text-sm">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">Level {currentLevel.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-600">{score}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="sm"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={resetGame}
                  variant="outline"
                  size="sm"
                >
                  <Home className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="relative bg-gradient-to-b from-amber-100 to-amber-200 rounded-xl p-2 shadow-2xl border-2 border-amber-300 flex-1 min-h-0">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-t-xl"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full pt-2">
                {/* Change Required Info - Left 50% */}
                <div className="flex flex-col overflow-hidden">
                  <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 h-full flex flex-col">
                    <h3 className="text-xs font-bold mb-1 flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      Change Required
                    </h3>
                    
                    <div className="mb-2 p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded border border-green-300">
                      <div className="text-center mb-2">
                        <div className="text-[10px] text-green-700 font-semibold">Change Required:</div>
                        <div className="text-xl font-bold text-green-900">{formatCurrency(changeRequired)}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] text-blue-700 font-semibold">Your Change:</div>
                        <div className="text-lg font-bold text-blue-900">{formatCurrency(changeTotal)}</div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSubmitChange}
                      disabled={Math.abs(changeTotal - changeRequired) > 0.01}
                      className="w-full mt-2 py-2 text-xs bg-gradient-to-r from-green-600 to-blue-600 disabled:opacity-50"
                      size="sm"
                    >
                      <Check className="w-3 h-3 mr-1" />
                      Give Change ({formatCurrency(changeTotal)})
                    </Button>
                  </div>
                </div>

                {/* Currency Selection - Right 50% */}
                <div className="flex flex-col overflow-hidden">
                  <div className="bg-white rounded-lg p-2 shadow-lg border border-gray-200 h-full flex flex-col">
                    <h3 className="text-xs font-bold mb-1 flex items-center gap-1">
                      <Wallet className="w-4 h-4 text-purple-600" />
                      Select Bills & Coins
                    </h3>
                    <div className="flex-1 overflow-y-auto">
                      <div className="grid grid-cols-2 gap-1">
                        {CURRENCY.map((curr) => {
                          const count = selectedChange.get(curr.value) || 0
                          return (
                            <div key={curr.value} className="relative">
                              <button
                                onClick={() => handleSelectCurrency(curr.value)}
                                className={`w-full p-2 rounded border-2 ${curr.color} hover:scale-105 transition-transform`}
                              >
                                <div className="text-xl mb-1">{curr.emoji}</div>
                                <div className="text-xs font-bold">{curr.label}</div>
                              </button>
                              {count > 0 && (
                                <button
                                  onClick={() => handleDeselectCurrency(curr.value)}
                                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold hover:bg-red-600"
                                >
                                  {count}
                                </button>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {gameState === "levelComplete" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-6" />
              
              <h2 className="text-4xl font-bold mb-4 text-green-600">Level Complete!</h2>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3].map((s) => (
                  <motion.div
                    key={s}
                    initial={{ scale: 0 }}
                    animate={{ scale: levelStars >= s ? 1 : 0.5 }}
                    transition={{ delay: s * 0.2 }}
                  >
                    <Star
                      className={`w-16 h-16 ${
                        levelStars >= s ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{progress.currentLevel}</div>
                  <div className="text-sm text-gray-600">Next Level</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {progress.currentLevel <= 30 && (
                  <Button
                    onClick={() => startLevel(progress.currentLevel)}
                    className="w-full py-6 text-lg bg-gradient-to-r from-green-600 to-blue-600"
                    size="lg"
                  >
                    <ChevronRight className="w-6 h-6 mr-2" />
                    Next Level
                  </Button>
                )}
                
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="w-full py-4"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Main Menu
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "gameOver" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto">
              <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
              
              <h2 className="text-4xl font-bold mb-4 text-red-600">Time's Up!</h2>
              <p className="text-xl text-gray-600 mb-8">
                Try again to beat this level!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{currentLevel?.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button
                  onClick={() => currentLevel && startLevel(currentLevel.level)}
                  className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600"
                  size="lg"
                >
                  <RotateCcw className="w-6 h-6 mr-2" />
                  Try Again
                </Button>
                
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="w-full py-4"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Main Menu
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
