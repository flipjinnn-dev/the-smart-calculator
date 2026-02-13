"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ShoppingCart, Timer, Play, RotateCcw, Volume2, VolumeX, 
  Star, Trophy, TrendingUp, DollarSign, CreditCard, 
  Scan, CheckCircle2, XCircle, Users, Zap, Award,
  Clock, Target, Sparkles, ChevronRight, Home, Settings,
  Info, AlertCircle, Gift, Percent, BarChart3, X, Maximize2, Minimize2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import confetti from "canvas-confetti"
import { PRODUCTS, Product, getProductByBarcode } from "@/lib/games/cashier-products"
import { 
  LEVELS, 
  getLevelConfig, 
  LevelConfig, 
  Customer, 
  generateCustomer,
  CUSTOMER_NAMES 
} from "@/lib/games/cashier-levels"

type GameState = "splash" | "tutorial" | "playing" | "levelComplete" | "gameOver" | "paused"

interface CartItem {
  product: Product
  quantity: number
}

interface GameProgress {
  currentLevel: number
  levelsCompleted: number[]
  totalStars: number
  totalMoney: number
  achievements: string[]
  stats: {
    totalCustomersServed: number
    perfectCheckouts: number
    averageSpeed: number
    accuracy: number
  }
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  requirement: number
  progress: number
}

const INITIAL_PROGRESS: GameProgress = {
  currentLevel: 1,
  levelsCompleted: [],
  totalStars: 0,
  totalMoney: 0,
  achievements: [],
  stats: {
    totalCustomersServed: 0,
    perfectCheckouts: 0,
    averageSpeed: 0,
    accuracy: 0
  }
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first_customer", title: "First Sale!", description: "Serve your first customer", icon: "🎯", unlocked: false, requirement: 1, progress: 0 },
  { id: "speed_demon", title: "Speed Demon", description: "Complete a checkout in under 10 seconds", icon: "⚡", unlocked: false, requirement: 1, progress: 0 },
  { id: "perfect_10", title: "Perfect 10", description: "Get 10 perfect checkouts", icon: "💯", unlocked: false, requirement: 10, progress: 0 },
  { id: "master_cashier", title: "Master Cashier", description: "Reach level 50", icon: "👑", unlocked: false, requirement: 50, progress: 0 },
  { id: "millionaire", title: "Millionaire", description: "Earn $1,000,000 total", icon: "💰", unlocked: false, requirement: 1000000, progress: 0 },
  { id: "star_collector", title: "Star Collector", description: "Collect 100 stars", icon: "⭐", unlocked: false, requirement: 100, progress: 0 },
  { id: "customer_hero", title: "Customer Hero", description: "Serve 500 customers", icon: "🦸", unlocked: false, requirement: 500, progress: 0 },
  { id: "accuracy_master", title: "Accuracy Master", description: "Maintain 95% accuracy over 50 checkouts", icon: "🎯", unlocked: false, requirement: 50, progress: 0 }
]

const MONEY_DENOMINATIONS = [
  { value: 100, label: "$100", color: "bg-blue-500" },
  { value: 50, label: "$50", color: "bg-pink-500" },
  { value: 20, label: "$20", color: "bg-green-500" },
  { value: 10, label: "$10", color: "bg-yellow-500" },
  { value: 5, label: "$5", color: "bg-purple-500" },
  { value: 1, label: "$1", color: "bg-gray-500" },
  { value: 0.25, label: "25¢", color: "bg-zinc-400" },
  { value: 0.10, label: "10¢", color: "bg-slate-400" },
  { value: 0.05, label: "5¢", color: "bg-gray-400" },
  { value: 0.01, label: "1¢", color: "bg-amber-600" }
]

export default function CashierSimulatorClient() {
  const [gameState, setGameState] = useState<GameState>("splash")
  const [progress, setProgress] = useState<GameProgress>(INITIAL_PROGRESS)
  const [currentLevel, setCurrentLevel] = useState<LevelConfig | null>(null)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null)
  const [cart, setCart] = useState<CartItem[]>([])
  const [barcodeInput, setBarcodeInput] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [score, setScore] = useState(0)
  const [stars, setStars] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [changeAmount, setChangeAmount] = useState(0)
  const [showPayment, setShowPayment] = useState(false)
  const [checkoutStartTime, setCheckoutStartTime] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [customersServed, setCustomersServed] = useState(0)
  const [showTutorial, setShowTutorial] = useState(false)
  const [levelStars, setLevelStars] = useState(0)
  const [achievements, setAchievements] = useState(ACHIEVEMENTS)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const contentSectionRef = useRef<HTMLDivElement>(null)
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const patienceTimerRef = useRef<NodeJS.Timeout | null>(null)
  const barcodeInputRef = useRef<HTMLInputElement>(null)
  const gameContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem("cashier-simulator-progress")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setProgress(parsed)
      } catch (e) {
        console.error("Failed to load progress")
      }
    }
  }, [])

  useEffect(() => {
    if (gameState === "playing" && currentLevel) {
      localStorage.setItem("cashier-simulator-progress", JSON.stringify(progress))
    }
  }, [progress, gameState])

  const playSound = useCallback((type: "scan" | "success" | "error" | "complete" | "coin") => {
    if (!soundEnabled) return
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)
      
      switch (type) {
        case "scan":
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
          setTimeout(() => {
            const osc2 = audioContext.createOscillator()
            const gain2 = audioContext.createGain()
            osc2.connect(gain2)
            gain2.connect(audioContext.destination)
            osc2.frequency.value = 659.25
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime)
            osc2.start()
            osc2.stop(audioContext.currentTime + 0.2)
          }, 100)
          break
        case "error":
          oscillator.frequency.value = 200
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.3)
          break
        case "complete":
          [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
            setTimeout(() => {
              const osc = audioContext.createOscillator()
              const gain = audioContext.createGain()
              osc.connect(gain)
              gain.connect(audioContext.destination)
              osc.frequency.value = freq
              gain.gain.setValueAtTime(0.2, audioContext.currentTime)
              osc.start()
              osc.stop(audioContext.currentTime + 0.2)
            }, i * 100)
          })
          break
        case "coin":
          oscillator.frequency.value = 1000
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime)
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15)
          oscillator.start()
          oscillator.stop(audioContext.currentTime + 0.15)
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
    setTimeLeft(level.timeLimit)
    setTotalTime(level.timeLimit)
    setScore(0)
    setCustomersServed(0)
    setCart([])
    setShowPayment(false)
    setErrorMessage("")
    setSuccessMessage("")
    setChangeAmount(0)
    
    const newCustomers: Customer[] = []
    for (let i = 0; i < level.customersCount; i++) {
      const customer = generateCustomer(level, PRODUCTS.map(p => p.id))
      newCustomers.push(customer)
    }
    setCustomers(newCustomers)
    setCurrentCustomer(newCustomers[0] || null)
    setCheckoutStartTime(Date.now())
    
    setGameState("playing")
    
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endLevel(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    
    if (patienceTimerRef.current) clearInterval(patienceTimerRef.current)
    patienceTimerRef.current = setInterval(() => {
      setCustomers(prev => prev.map((c, idx) => {
        if (idx === 0 && !c.served) {
          const newPatience = c.patience - 1
          if (newPatience <= 0) {
            setErrorMessage(`${c.name} left angry! 😠`)
            playSound("error")
            setScore(prev => Math.max(0, prev - 20))
            setTimeout(() => moveToNextCustomer(), 1000)
            return { ...c, served: true, patience: 0 }
          }
          return { ...c, patience: newPatience }
        }
        return c
      }))
    }, 1000)
  }, [playSound])

  const endLevel = useCallback((success: boolean) => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (patienceTimerRef.current) clearInterval(patienceTimerRef.current)
    
    if (success && currentLevel) {
      const earnedStars = 
        score >= currentLevel.starThresholds.three ? 3 :
        score >= currentLevel.starThresholds.two ? 2 :
        score >= currentLevel.starThresholds.one ? 1 : 0
      
      setLevelStars(earnedStars)
      
      if (earnedStars > 0) {
        playSound("complete")
        confetti({
          particleCount: earnedStars * 30,
          spread: 70,
          origin: { y: 0.6 }
        })
        
        setProgress(prev => ({
          ...prev,
          currentLevel: Math.max(prev.currentLevel, currentLevel.level + 1),
          levelsCompleted: [...new Set([...prev.levelsCompleted, currentLevel.level])],
          totalStars: prev.totalStars + earnedStars,
          totalMoney: prev.totalMoney + (score * 10),
          stats: {
            ...prev.stats,
            totalCustomersServed: prev.stats.totalCustomersServed + customersServed,
            perfectCheckouts: prev.stats.perfectCheckouts + (earnedStars === 3 ? 1 : 0)
          }
        }))
      }
      
      setGameState("levelComplete")
    } else {
      setGameState("gameOver")
    }
  }, [currentLevel, score, customersServed, playSound])

  const scanProduct = useCallback((product: Product) => {
    if (!currentCustomer || showPayment) return
    
    if (!currentCustomer.order.productIds.includes(product.id)) {
      setErrorMessage("Wrong item! This customer didn't order this.")
      playSound("error")
      setScore(prev => Math.max(0, prev - 5))
      return
    }
    
    const existingItem = cart.find(item => item.product.id === product.id)
    if (existingItem) {
      setCart(prev => prev.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart(prev => [...prev, { product, quantity: 1 }])
    }
    
    playSound("scan")
    setSuccessMessage(`Scanned: ${product.name}`)
    setScore(prev => prev + 5)
    setBarcodeInput("")
    
    setTimeout(() => setSuccessMessage(""), 2000)
  }, [cart, currentCustomer, showPayment, playSound])

  const scanBarcode = useCallback(() => {
    if (!currentCustomer || showPayment) return
    
    const product = getProductByBarcode(barcodeInput)
    
    if (!product) {
      setErrorMessage("Product not found!")
      playSound("error")
      setBarcodeInput("")
      return
    }
    
    scanProduct(product)
  }, [barcodeInput, currentCustomer, showPayment, playSound, scanProduct])

  const removeFromCart = (productId: string) => {
    setCart(prev => {
      const item = prev.find(i => i.product.id === productId)
      if (!item) return prev
      
      if (item.quantity > 1) {
        return prev.map(i => 
          i.product.id === productId 
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      } else {
        return prev.filter(i => i.product.id !== productId)
      }
    })
  }

  const calculateTotal = useCallback(() => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
    const discount = currentCustomer?.order.couponDiscount || 0
    return subtotal * (1 - discount)
  }, [cart, currentCustomer])

  const proceedToPayment = () => {
    if (!currentCustomer) return
    
    const cartProductIds = cart.flatMap(item => 
      Array(item.quantity).fill(item.product.id)
    )
    
    const orderProductIds = [...currentCustomer.order.productIds].sort()
    const scannedProductIds = [...cartProductIds].sort()
    
    if (JSON.stringify(orderProductIds) !== JSON.stringify(scannedProductIds)) {
      setErrorMessage("Cart doesn't match the order! Check items.")
      playSound("error")
      setScore(prev => Math.max(0, prev - 10))
      return
    }
    
    setShowPayment(true)
    setSuccessMessage("Ready for payment!")
  }

  const processPayment = (paymentType: "cash" | "card") => {
    if (!currentCustomer) return
    
    if (currentCustomer.order.paymentType !== paymentType) {
      setErrorMessage(`Customer wants to pay with ${currentCustomer.order.paymentType.toUpperCase()}!`)
      playSound("error")
      setScore(prev => Math.max(0, prev - 10))
      return
    }
    
    const total = calculateTotal()
    
    if (paymentType === "card") {
      playSound("success")
      setSuccessMessage(`Card payment successful! $${total.toFixed(2)}`)
      
      const checkoutTime = (Date.now() - checkoutStartTime) / 1000
      const timeBonus = checkoutTime < 15 ? 20 : checkoutTime < 30 ? 10 : 0
      const accuracyBonus = 15
      
      setScore(prev => prev + 30 + timeBonus + accuracyBonus)
      
      setTimeout(() => moveToNextCustomer(), 1500)
    } else {
      const paid = parseFloat(paymentAmount)
      if (isNaN(paid) || paid < total) {
        setErrorMessage(`Insufficient payment! Need $${total.toFixed(2)}`)
        playSound("error")
        return
      }
      
      const change = paid - total
      setChangeAmount(change)
      playSound("coin")
      setSuccessMessage(`Cash payment successful! Change: $${change.toFixed(2)}`)
      
      const checkoutTime = (Date.now() - checkoutStartTime) / 1000
      const timeBonus = checkoutTime < 15 ? 20 : checkoutTime < 30 ? 10 : 0
      const accuracyBonus = 15
      
      setScore(prev => prev + 30 + timeBonus + accuracyBonus)
      
      setTimeout(() => moveToNextCustomer(), 2000)
    }
  }

  const moveToNextCustomer = () => {
    setCart([])
    setShowPayment(false)
    setPaymentAmount("")
    setChangeAmount(0)
    setErrorMessage("")
    setSuccessMessage("")
    
    setCustomers(prev => {
      const remaining = prev.slice(1)
      if (remaining.length === 0) {
        endLevel(true)
        return []
      }
      setCurrentCustomer(remaining[0])
      setCheckoutStartTime(Date.now())
      return remaining
    })
    
    setCustomersServed(prev => prev + 1)
  }

  const calculateStars = (currentScore: number): number => {
    if (!currentLevel) return 0
    if (currentScore >= currentLevel.starThresholds.three) return 3
    if (currentScore >= currentLevel.starThresholds.two) return 2
    if (currentScore >= currentLevel.starThresholds.one) return 1
    return 0
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
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (patienceTimerRef.current) clearInterval(patienceTimerRef.current)
    setGameState("splash")
    setCurrentLevel(null)
    setCustomers([])
    setCurrentCustomer(null)
    setCart([])
    setScore(0)
  }

  const getCustomerAvatar = (name: string, mood: string) => {
    const avatars = [
      { skin: '👨', hair: '🟤', color: '#FFE4C4' },
      { skin: '👩', hair: '🟫', color: '#F4A460' },
      { skin: '🧑', hair: '🟨', color: '#DEB887' },
      { skin: '👴', hair: '⬜', color: '#D2B48C' },
      { skin: '👵', hair: '⬜', color: '#F5DEB3' },
    ]
    const avatar = avatars[name.length % avatars.length]
    return avatar.skin
  }

  return (
    <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {gameState === "splash" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block mb-6"
            >
              <ShoppingCart className="w-24 h-24 text-blue-600 mx-auto" />
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cashier Simulator
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Master the art of checkout! Scan items, process payments, and serve customers in this exciting cashier simulation game.
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-4xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                  <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-blue-600">{progress.currentLevel}</div>
                  <div className="text-sm text-gray-600">Current Level</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                  <Star className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-yellow-600">{progress.totalStars}</div>
                  <div className="text-sm text-gray-600">Total Stars</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                  <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-600">${(progress.totalMoney / 1000).toFixed(1)}K</div>
                  <div className="text-sm text-gray-600">Total Earned</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button
                  onClick={() => startLevel(progress.currentLevel)}
                  className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
                  size="lg"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Start Game
                </Button>
                
                <Button
                  onClick={() => setShowTutorial(true)}
                  variant="outline"
                  className="w-full py-4 border-2 border-purple-300 hover:bg-purple-50"
                  size="lg"
                >
                  <Info className="w-6 h-6 mr-2" />
                  Tutorial
                </Button>
              </div>
              
              <Button
                onClick={() => contentSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                variant="outline"
                className="w-full py-4 border-2 border-blue-300 hover:bg-blue-50"
              >
                <Info className="w-5 h-5 mr-2" />
                Learn About Cashier Simulator Games
              </Button>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
              <h3 className="text-xl font-bold mb-4 flex items-center justify-center gap-2">
                <Award className="w-6 h-6 text-purple-600" />
                Game Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold">160 Levels</div>
                  <div className="text-gray-600">Progressive difficulty</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold">Customer Queue</div>
                  <div className="text-gray-600">Manage patience</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold">Payment Systems</div>
                  <div className="text-gray-600">Cash & Card</div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="font-semibold">Star Ratings</div>
                  <div className="text-gray-600">3-star system</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "splash" && (
          <div ref={contentSectionRef} className="bg-white mt-8 rounded-2xl shadow-xl p-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">About Cashier Simulator Games</h2>
              <p className="text-gray-600 text-lg">Everything you need to know about cashier simulator gameplay</p>
            </div>
            
            <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A <strong>cashier simulator game</strong> lets players experience the day-to-day tasks of being a cashier, from scanning items and handling money to managing customers efficiently. The <strong>best cashier simulator game</strong> offers realistic supermarket environments, intuitive controls, and engaging gameplay. Options range from <strong>cashier simulator game free</strong> versions to premium releases on Steam and PC, including <strong>cashier game simulator</strong> titles playable online or on mobile devices.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Info className="w-6 h-6 text-purple-600" />
                    What Is a Cashier Simulator Game?
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong>cashier simulator game</strong> is a type of simulation game where players step into the role of a cashier. The objective is to manage transactions, interact with customers, and sometimes handle challenges like price checks, promotions, or impatient shoppers. Unlike arcade games, these simulators focus on realism, giving players a taste of <strong>cashier experience game</strong> mechanics in a controlled environment.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    These games are part of a broader genre of <strong>cashier simulator games online</strong> and offline, providing immersive experiences that mimic real-life retail work. They are available for various platforms, including <strong>cashier game PC</strong>, <strong>cashier simulator mobile</strong>, and web-based <strong>cashier simulator game online</strong> platforms.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-600" />
                    Top Features of Cashier Simulator Games
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                        <ShoppingCart className="w-5 h-5" />
                        Realistic Supermarket Environments
                      </h4>
                      <p className="text-sm text-gray-700">
                        The best titles, like a <strong>supermarket cashier simulator game</strong>, simulate realistic grocery store layouts, shelving, and product types. This enhances immersion and makes <strong>supermarket cashier simulator</strong> gameplay engaging.
                      </p>
                    </div>
                    <div className="bg-purple-50 p-5 rounded-xl border-2 border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Customer Interaction Mechanics
                      </h4>
                      <p className="text-sm text-gray-700">
                        Players deal with diverse customer behaviors, such as slow checkout, complaints, or multiple payment methods, which is a core part of <strong>cashier job simulator game</strong> design.
                      </p>
                    </div>
                    <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
                      <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Transaction Management
                      </h4>
                      <p className="text-sm text-gray-700">
                        Key tasks include scanning items, bagging groceries, handling coupons, and managing change. Advanced games may even include inventory and shift management.
                      </p>
                    </div>
                    <div className="bg-orange-50 p-5 rounded-xl border-2 border-orange-200">
                      <h4 className="font-bold text-orange-900 mb-2 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Platform Availability
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>PC/Steam:</strong> Detailed graphics and extended gameplay.<br/>
                        <strong>Mobile:</strong> Portability and shorter sessions.<br/>
                        <strong>Online:</strong> Browser-based experiences.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    Popular Types of Cashier Simulator Games
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-blue-900">Supermarket Cashier Simulator Game:</strong>
                        <span className="text-gray-700"> Focuses on grocery store scenarios, combining <strong>grocery cashier simulator game</strong> mechanics with inventory management.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-purple-900">Cashier Game Simulator:</strong>
                        <span className="text-gray-700"> Generic simulations that cover retail, convenience stores, or specialized shops.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-green-900">Cashier Experience Game:</strong>
                        <span className="text-gray-700"> Emphasizes roleplay and realism, sometimes adding stress-management or time pressure mechanics.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3 bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0" />
                      <div>
                        <strong className="text-orange-900">Online Cashier Simulator Games:</strong>
                        <span className="text-gray-700"> Browser-based games or multiplayer experiences allowing interaction with other players.</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-600" />
                    Best Cashier Simulator Game Titles
                  </h3>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200">
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <strong>Supermarket Cashier Simulator Game Online</strong> – Great for realistic gameplay
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-600" />
                        <strong>Cashier Simulator Game Steam</strong> – Enhanced graphics and complex mechanics
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        <strong>Cashier Simulator Game Free</strong> – Accessible for casual play
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-orange-600" />
                        <strong>Grocery Cashier Simulator Game</strong> – Detailed grocery store management
                      </li>
                      <li className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-pink-600" />
                        <strong>Cashier Job Simulator Game</strong> – Professional cashier skills focus
                      </li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                    Advantages of Playing Cashier Simulator Games
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <strong className="text-blue-900">Learn Retail Skills</strong>
                        <p className="text-sm text-gray-700">Understanding scanning, pricing, and customer interaction.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-1" />
                      <div>
                        <strong className="text-purple-900">Stress-Free Practice</strong>
                        <p className="text-sm text-gray-700">Experience cashier work without real-world pressure.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-1" />
                      <div>
                        <strong className="text-green-900">Fun & Addictive Gameplay</strong>
                        <p className="text-sm text-gray-700">Time-based challenges and score tracking.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-1" />
                      <div>
                        <strong className="text-orange-900">Cross-Platform</strong>
                        <p className="text-sm text-gray-700">Playable on PC, mobile, and online.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-6 h-6 text-blue-600" />
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-4">
                    <details className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 cursor-pointer">
                      <summary className="font-bold text-blue-900 cursor-pointer">Are there free cashier simulator games?</summary>
                      <p className="text-gray-700 mt-2 text-sm">Yes, several <strong>cashier simulator game free</strong> versions exist for PC and mobile, offering basic features without cost.</p>
                    </details>
                    <details className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200 cursor-pointer">
                      <summary className="font-bold text-purple-900 cursor-pointer">Can I play cashier simulator games online?</summary>
                      <p className="text-gray-700 mt-2 text-sm">Absolutely. Many <strong>cashier simulator games online</strong> let players experience the checkout process directly in a browser.</p>
                    </details>
                    <details className="bg-green-50 p-4 rounded-lg border-2 border-green-200 cursor-pointer">
                      <summary className="font-bold text-green-900 cursor-pointer">What is the best cashier simulator game for PC?</summary>
                      <p className="text-gray-700 mt-2 text-sm">The top-rated <strong>cashier game PC</strong> titles include <strong>Cashier Simulator Game Steam</strong> releases and detailed <strong>grocery cashier simulator game</strong> apps.</p>
                    </details>
                    <details className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200 cursor-pointer">
                      <summary className="font-bold text-orange-900 cursor-pointer">Are cashier simulator games realistic?</summary>
                      <p className="text-gray-700 mt-2 text-sm">Yes, especially <strong>cashier experience game</strong> and <strong>supermarket cashier simulator game</strong> titles, which replicate real-world retail mechanics, including customer behavior, payment methods, and inventory management.</p>
                    </details>
                    <details className="bg-pink-50 p-4 rounded-lg border-2 border-pink-200 cursor-pointer">
                      <summary className="font-bold text-pink-900 cursor-pointer">Are there mobile versions of cashier simulator games?</summary>
                      <p className="text-gray-700 mt-2 text-sm">Yes, <strong>cashier simulator mobile</strong> apps are widely available for Android and iOS, offering touch-friendly controls and casual gameplay.</p>
                    </details>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl border-2 border-purple-300">
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">Conclusion</h3>
                  <p className="text-gray-700 leading-relaxed">
                    A <strong>cashier simulator game</strong> is more than just a fun pastime—it's a window into the world of retail, letting players experience the <strong>cashier job simulator game</strong> role in realistic environments. Whether you're exploring <strong>cashier simulator games online</strong>, trying a <strong>supermarket cashier simulator game</strong>, or diving into a <strong>cashier game PC</strong> title on Steam, there's something for every type of gamer. Free versions, mobile apps, and online platforms ensure accessibility, while advanced titles provide immersive <strong>supermarket cashier simulator</strong> gameplay that is both challenging and rewarding.
                  </p>
                </div>

            <div className="text-center mt-8">
              <Button
                onClick={() => {
                  setGameState('splash')
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-6 text-lg"
                size="lg"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Playing Now!
              </Button>
            </div>
          </div>
        </div>
        )}

        {gameState === "playing" && currentLevel && currentCustomer && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-lg flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold">Level {currentLevel.level}</span>
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    {currentLevel.difficulty.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  <span className="font-mono text-lg font-bold">
                    {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">{score} pts</span>
                  <div className="flex gap-1 ml-2">
                    {[1, 2, 3].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          calculateStars(score) >= s ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold">{customers.length} left</span>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Scan className="w-5 h-5 text-blue-600" />
                      Scan Items
                    </h3>
                    <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-lg border-2 border-purple-200">
                      <div className="text-4xl">{getCustomerAvatar(currentCustomer.name, currentCustomer.mood.emoji)}</div>
                      <div>
                        <div className="font-bold text-purple-900">{currentCustomer.name}</div>
                        <div className="text-xs text-purple-600 flex items-center gap-1">
                          <span>Mood: {currentCustomer.mood.emoji}</span>
                          <span className="mx-1">•</span>
                          <span className="font-semibold">Pays: {currentCustomer.order.paymentType === 'card' ? '💳 Card' : '💵 Cash'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                      <span className="font-bold text-blue-900">Customer Wants:</span>
                      <span className="text-sm text-blue-600">({currentCustomer.order.productIds.length} items)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentCustomer.order.productIds.map((prodId, idx) => {
                        const product = PRODUCTS.find(p => p.id === prodId)
                        if (!product) return null
                        return (
                          <div
                            key={`${prodId}-${idx}`}
                            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border-2 border-blue-300 shadow-sm"
                          >
                            <span className="text-2xl">{product.emoji}</span>
                            <div>
                              <div className="text-xs font-semibold text-gray-800">{product.name}</div>
                              <div className="text-xs text-green-600">${product.price.toFixed(2)}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold">Customer Patience</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all ${
                          currentCustomer.patience / currentCustomer.maxPatience > 0.5 ? "bg-green-500" :
                          currentCustomer.patience / currentCustomer.maxPatience > 0.25 ? "bg-yellow-500" :
                          "bg-red-500"
                        }`}
                        style={{ width: `${(currentCustomer.patience / currentCustomer.maxPatience) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <input
                      ref={barcodeInputRef}
                      type="text"
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && scanBarcode()}
                      placeholder="Enter barcode or click product"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                      disabled={showPayment}
                    />
                    <Button
                      onClick={scanBarcode}
                      disabled={!barcodeInput || showPayment}
                      className="px-6"
                    >
                      <Scan className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-semibold mb-2">Available Products (Click to Scan) - All {PRODUCTS.length} Items:</div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto p-2 bg-gray-50 rounded-lg">
                      {PRODUCTS.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => scanProduct(product)}
                          disabled={showPayment}
                          className="p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <div className="text-3xl mb-1">{product.emoji}</div>
                          <div className="text-xs font-semibold truncate">{product.name}</div>
                          <div className="text-xs text-green-600">${product.price.toFixed(2)}</div>
                          <div className="text-xs font-mono text-gray-500 bg-gray-100 px-1 rounded mt-1">{product.barcode}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {(errorMessage || successMessage) && (
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-3 rounded-lg flex items-center gap-2 ${
                          errorMessage ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}
                      >
                        {errorMessage ? <XCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                        <span className="font-semibold">{errorMessage || successMessage}</span>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
                
                {showPayment && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPayment(false)}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white rounded-2xl p-8 shadow-2xl max-w-lg w-full border-2 border-purple-300"
                    >
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      Payment Required
                    </h3>
                    
                    <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg mb-4 border-2 border-purple-300">
                      <div className="text-center mb-2">
                        <div className="text-sm text-purple-700 font-semibold">Customer Payment Method:</div>
                        <div className="text-2xl font-bold text-purple-900 mt-1">
                          {currentCustomer.order.paymentType === 'card' ? '💳 CARD ONLY' : '💵 CASH ONLY'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-3xl font-bold text-center mb-6 text-green-600">
                      Total: ${calculateTotal().toFixed(2)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <Button
                        onClick={() => processPayment("card")}
                        className="py-6 bg-blue-600 hover:bg-blue-700"
                        size="lg"
                      >
                        <CreditCard className="w-5 h-5 mr-2" />
                        Card Payment
                      </Button>
                      
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={paymentAmount}
                          onChange={(e) => setPaymentAmount(e.target.value)}
                          placeholder="Cash amount"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none"
                          step="0.01"
                        />
                        <Button
                          onClick={() => processPayment("cash")}
                          disabled={!paymentAmount}
                          className="w-full bg-green-600 hover:bg-green-700"
                        >
                          <DollarSign className="w-5 h-5 mr-2" />
                          Cash Payment
                        </Button>
                      </div>
                    </div>
                    
                    {changeAmount > 0 && (
                      <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="p-4 bg-green-50 rounded-lg text-center"
                      >
                        <div className="text-sm text-gray-600 mb-1">Change to Return:</div>
                        <div className="text-2xl font-bold text-green-600">${changeAmount.toFixed(2)}</div>
                      </motion.div>
                    )}
                    
                    <Button
                      onClick={() => setShowPayment(false)}
                      variant="outline"
                      className="w-full mt-4 border-2 border-gray-300"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    </motion.div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-purple-600" />
                    Shopping Cart
                  </h3>
                  
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <div>Cart is empty</div>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{item.product.emoji}</span>
                              <div>
                                <div className="font-semibold text-sm">{item.product.name}</div>
                                <div className="text-xs text-gray-500">
                                  ${item.product.price.toFixed(2)} × {item.quantity}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-600">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="p-1 hover:bg-red-100 rounded text-red-500"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-semibold">
                            ${cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0).toFixed(2)}
                          </span>
                        </div>
                        {currentCustomer?.order.couponDiscount ? (
                          <div className="flex justify-between mb-2 text-green-600">
                            <span className="flex items-center gap-1">
                              <Percent className="w-4 h-4" />
                              Discount:
                            </span>
                            <span className="font-semibold">
                              -{(currentCustomer.order.couponDiscount * 100).toFixed(0)}%
                            </span>
                          </div>
                        ) : null}
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total:</span>
                          <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
                        </div>
                      </div>
                      
                      {!showPayment && (
                        <Button
                          onClick={proceedToPayment}
                          className="w-full mt-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Proceed to Payment
                        </Button>
                      )}
                    </>
                  )}
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Customer Queue ({customers.length})
                  </h3>
                  <div className="space-y-2">
                    {customers.slice(0, 4).map((customer, idx) => (
                      <div
                        key={customer.id}
                        className={`p-3 rounded-lg ${
                          idx === 0 ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400" : "bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-2xl">{getCustomerAvatar(customer.name, customer.mood.emoji)}</div>
                            <div>
                              <div className="text-sm font-semibold flex items-center gap-1">
                                {customer.name}
                                <span className="text-xs">{customer.mood.emoji}</span>
                              </div>
                              <div className="text-xs text-gray-600 flex items-center gap-1">
                                <span>{customer.order.productIds.length} items</span>
                                <span>•</span>
                                <span>{customer.order.paymentType === 'card' ? '💳' : '💵'}</span>
                              </div>
                            </div>
                          </div>
                          {idx === 0 && (
                            <div className="text-xs font-semibold text-blue-600 bg-blue-200 px-2 py-1 rounded">NOW</div>
                          )}
                        </div>
                      </div>
                    ))}
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
            <motion.div
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border-2 border-purple-200"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Cashier Simulator Game</h1>
                <p className="text-lg text-gray-600 mb-2">Play for Fun – Best Online & PC Experience</p>
                <p className="text-sm text-gray-500">Experience realistic checkout gameplay!</p>
              </div>
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
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{customersServed}</div>
                  <div className="text-sm text-gray-600">Served</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">${(score * 10).toFixed(0)}</div>
                  <div className="text-sm text-gray-600">Earned</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {progress.currentLevel <= 160 && (
                  <Button
                    onClick={() => startLevel(progress.currentLevel)}
                    className="w-full py-6 text-lg bg-gradient-to-r from-green-600 to-blue-600"
                    size="lg"
                  >
                    <ChevronRight className="w-6 h-6 mr-2" />
                    {progress.currentLevel === currentLevel?.level ? 'Retry Level' : `Next Level ${progress.currentLevel}`}
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
            </motion.div>
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
                Better luck next time!
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{score}</div>
                  <div className="text-sm text-gray-600">Points</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-700">{customersServed}</div>
                  <div className="text-sm text-gray-600">Served</div>
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

        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-8 max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="w-8 h-8 text-blue-600" />
                How to Play
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Scan className="w-5 h-5 text-blue-500" />
                    1. Scan Items
                  </h3>
                  <p className="text-gray-600">
                    Use the barcode input or click on products to scan items for the current customer. Make sure to scan all items in their order!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    2. Verify Cart
                  </h3>
                  <p className="text-gray-600">
                    Check that all items match the customer's order. Remove incorrect items by clicking the X button.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    3. Process Payment
                  </h3>
                  <p className="text-gray-600">
                    Accept card payment or calculate cash change. Make sure to give the correct change amount!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Timer className="w-5 h-5 text-orange-500" />
                    4. Watch the Timer
                  </h3>
                  <p className="text-gray-600">
                    Complete all customers before time runs out. Keep an eye on customer patience meters!
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    5. Earn Stars
                  </h3>
                  <p className="text-gray-600">
                    Earn up to 3 stars based on your score. Speed and accuracy give bonus points!
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => setShowTutorial(false)}
                className="w-full mt-6"
                size="lg"
              >
                Got It!
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
