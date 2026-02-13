export interface CustomerOrder {
  productIds: string[]
  totalAmount: number
  paymentType: "cash" | "card" | "mixed"
  cashAmount?: number
  cardAmount?: number
  couponDiscount?: number
}

export interface LevelConfig {
  level: number
  difficulty: "easy" | "medium" | "hard" | "expert" | "master"
  timeLimit: number
  customersCount: number
  minItems: number
  maxItems: number
  starThresholds: {
    three: number
    two: number
    one: number
  }
  hasDiscounts: boolean
  hasCoupons: boolean
  allowMixedPayment: boolean
  rushHour: boolean
  customerPatience: number
  unlockMessage?: string
}

const generateLevels = (): LevelConfig[] => {
  const levels: LevelConfig[] = []
  
  for (let i = 1; i <= 160; i++) {
    let difficulty: LevelConfig["difficulty"]
    let timeLimit: number
    let customersCount: number
    let minItems: number
    let maxItems: number
    let hasDiscounts: boolean
    let hasCoupons: boolean
    let allowMixedPayment: boolean
    let rushHour: boolean
    let customerPatience: number
    let starThresholds: { three: number; two: number; one: number }
    
    if (i <= 20) {
      difficulty = "easy"
      timeLimit = 180
      customersCount = 3
      minItems = 2
      maxItems = 4
      hasDiscounts = false
      hasCoupons = false
      allowMixedPayment = false
      rushHour = false
      customerPatience = 60
      starThresholds = { three: 160, two: 140, one: 100 }
    } else if (i <= 50) {
      difficulty = "easy"
      timeLimit = 150
      customersCount = 4
      minItems = 3
      maxItems = 5
      hasDiscounts = i > 30
      hasCoupons = false
      allowMixedPayment = false
      rushHour = false
      customerPatience = 50
      starThresholds = { three: 130, two: 110, one: 80 }
    } else if (i <= 80) {
      difficulty = "medium"
      timeLimit = 120
      customersCount = 5
      minItems = 4
      maxItems = 7
      hasDiscounts = true
      hasCoupons = i > 60
      allowMixedPayment = false
      rushHour = i % 10 === 0
      customerPatience = 45
      starThresholds = { three: 110, two: 90, one: 60 }
    } else if (i <= 120) {
      difficulty = "hard"
      timeLimit = 100
      customersCount = 6
      minItems = 5
      maxItems = 9
      hasDiscounts = true
      hasCoupons = true
      allowMixedPayment = i > 100
      rushHour = i % 5 === 0
      customerPatience = 40
      starThresholds = { three: 95, two: 75, one: 50 }
    } else if (i <= 150) {
      difficulty = "expert"
      timeLimit = 90
      customersCount = 7
      minItems = 6
      maxItems = 11
      hasDiscounts = true
      hasCoupons = true
      allowMixedPayment = true
      rushHour = i % 3 === 0
      customerPatience = 35
      starThresholds = { three: 85, two: 65, one: 40 }
    } else {
      difficulty = "master"
      timeLimit = 75
      customersCount = 8
      minItems = 7
      maxItems = 13
      hasDiscounts = true
      hasCoupons = true
      allowMixedPayment = true
      rushHour = true
      customerPatience = 30
      starThresholds = { three: 70, two: 55, one: 35 }
    }
    
    const unlockMessage = 
      i === 1 ? "Welcome to Cashier Simulator!" :
      i === 21 ? "🎉 New Item Categories Unlocked!" :
      i === 51 ? "💰 Discount System Available!" :
      i === 81 ? "🎫 Coupons Now Active!" :
      i === 101 ? "💳 Mixed Payment Methods Enabled!" :
      i === 121 ? "🚀 Expert Mode Unlocked!" :
      i === 151 ? "👑 Master Cashier Levels!" :
      undefined
    
    levels.push({
      level: i,
      difficulty,
      timeLimit,
      customersCount,
      minItems,
      maxItems,
      starThresholds,
      hasDiscounts,
      hasCoupons,
      allowMixedPayment,
      rushHour,
      customerPatience,
      unlockMessage
    })
  }
  
  return levels
}

export const LEVELS = generateLevels()

export const getLevelConfig = (level: number): LevelConfig | undefined => {
  return LEVELS.find(l => l.level === level)
}

export const CUSTOMER_NAMES = [
  "Emma", "Liam", "Olivia", "Noah", "Ava", "Ethan", "Sophia", "Mason",
  "Isabella", "William", "Mia", "James", "Charlotte", "Benjamin", "Amelia",
  "Lucas", "Harper", "Henry", "Evelyn", "Alexander", "Abigail", "Michael",
  "Emily", "Daniel", "Elizabeth", "Matthew", "Sofia", "Jackson", "Avery",
  "Sebastian", "Ella", "Jack", "Scarlett", "Aiden", "Grace", "Owen", "Chloe",
  "Samuel", "Victoria", "Joseph", "Riley", "John", "Aria", "David", "Lily",
  "Wyatt", "Aubrey", "Carter", "Zoey", "Julian", "Penelope", "Luke", "Layla",
  "Grayson", "Nora", "Isaac", "Hannah", "Jayden", "Lillian", "Theodore",
  "Addison", "Gabriel", "Eleanor", "Anthony", "Natalie", "Dylan", "Luna"
]

export const CUSTOMER_MOODS = [
  { mood: "happy", emoji: "😊", patienceBonus: 10, tipChance: 0.3 },
  { mood: "neutral", emoji: "😐", patienceBonus: 0, tipChance: 0.1 },
  { mood: "impatient", emoji: "😤", patienceBonus: -10, tipChance: 0 },
  { mood: "angry", emoji: "😠", patienceBonus: -20, tipChance: 0 },
  { mood: "cheerful", emoji: "😄", patienceBonus: 15, tipChance: 0.5 }
]

export interface Customer {
  id: string
  name: string
  mood: typeof CUSTOMER_MOODS[number]
  order: CustomerOrder
  patience: number
  maxPatience: number
  served: boolean
}

export const generateCustomer = (
  levelConfig: LevelConfig,
  productIds: string[]
): Customer => {
  const itemCount = Math.floor(
    Math.random() * (levelConfig.maxItems - levelConfig.minItems + 1)
  ) + levelConfig.minItems
  
  const selectedProducts = []
  for (let i = 0; i < itemCount; i++) {
    const randomProduct = productIds[Math.floor(Math.random() * productIds.length)]
    selectedProducts.push(randomProduct)
  }
  
  const totalAmount = 0
  const paymentTypes: ("cash" | "card" | "mixed")[] = ["cash", "card"]
  if (levelConfig.allowMixedPayment) {
    paymentTypes.push("mixed")
  }
  
  const paymentType = paymentTypes[Math.floor(Math.random() * paymentTypes.length)]
  
  const moodIndex = levelConfig.rushHour 
    ? Math.floor(Math.random() * 3)
    : Math.floor(Math.random() * CUSTOMER_MOODS.length)
  
  const mood = CUSTOMER_MOODS[moodIndex]
  const maxPatience = levelConfig.customerPatience + mood.patienceBonus
  
  const discount = levelConfig.hasDiscounts && Math.random() > 0.7 
    ? Math.random() * 0.2 + 0.05
    : 0
  
  return {
    id: `customer_${Date.now()}_${Math.random()}`,
    name: CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)],
    mood,
    order: {
      productIds: selectedProducts,
      totalAmount,
      paymentType,
      couponDiscount: discount
    },
    patience: maxPatience,
    maxPatience,
    served: false
  }
}
