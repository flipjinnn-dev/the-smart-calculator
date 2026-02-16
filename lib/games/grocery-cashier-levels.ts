export interface Item {
  id: string
  name: string
  price: number
  emoji: string
}

export interface Level {
  level: number
  difficulty: "easy" | "medium" | "hard" | "expert"
  timeLimit: number
  itemCount: number
  allowCents: boolean
  maxItemPrice: number
  minTotal: number
  maxTotal: number
  description: string
}

export interface Transaction {
  items: { name: string; price: number; emoji: string }[]
  total: number
  payment: number
  change: number
}

export const GROCERY_ITEMS: Item[] = [
  { id: "item_001", name: "Apple", price: 1.50, emoji: "🍎" },
  { id: "item_002", name: "Banana", price: 0.75, emoji: "🍌" },
  { id: "item_003", name: "Orange", price: 1.25, emoji: "🍊" },
  { id: "item_004", name: "Milk", price: 3.50, emoji: "🥛" },
  { id: "item_005", name: "Bread", price: 2.50, emoji: "🍞" },
  { id: "item_006", name: "Eggs", price: 4.00, emoji: "🥚" },
  { id: "item_007", name: "Cheese", price: 5.50, emoji: "🧀" },
  { id: "item_008", name: "Chicken", price: 8.00, emoji: "🍗" },
  { id: "item_009", name: "Tomato", price: 1.00, emoji: "🍅" },
  { id: "item_010", name: "Potato", price: 0.50, emoji: "🥔" },
  { id: "item_011", name: "Carrot", price: 0.75, emoji: "🥕" },
  { id: "item_012", name: "Broccoli", price: 2.00, emoji: "🥦" },
  { id: "item_013", name: "Lettuce", price: 1.75, emoji: "🥬" },
  { id: "item_014", name: "Cucumber", price: 1.25, emoji: "🥒" },
  { id: "item_015", name: "Onion", price: 0.60, emoji: "🧅" },
  { id: "item_016", name: "Grapes", price: 3.00, emoji: "🍇" },
  { id: "item_017", name: "Strawberry", price: 4.50, emoji: "🍓" },
  { id: "item_018", name: "Watermelon", price: 6.00, emoji: "🍉" },
  { id: "item_019", name: "Pineapple", price: 5.00, emoji: "🍍" },
  { id: "item_020", name: "Lemon", price: 0.50, emoji: "🍋" },
  { id: "item_021", name: "Avocado", price: 2.50, emoji: "🥑" },
  { id: "item_022", name: "Corn", price: 1.00, emoji: "🌽" },
  { id: "item_023", name: "Mushroom", price: 3.50, emoji: "🍄" },
  { id: "item_024", name: "Pepper", price: 1.50, emoji: "🌶️" },
  { id: "item_025", name: "Rice", price: 5.00, emoji: "🍚" },
  { id: "item_026", name: "Pasta", price: 3.00, emoji: "🍝" },
  { id: "item_027", name: "Cereal", price: 4.50, emoji: "🥣" },
  { id: "item_028", name: "Juice", price: 3.50, emoji: "🧃" },
  { id: "item_029", name: "Coffee", price: 6.00, emoji: "☕" },
  { id: "item_030", name: "Tea", price: 4.00, emoji: "🍵" },
]

export const LEVELS: Level[] = [
  // Easy levels (1-5): Whole dollars only
  { level: 1, difficulty: "easy", timeLimit: 90, itemCount: 2, allowCents: false, maxItemPrice: 5, minTotal: 3, maxTotal: 10, description: "Simple whole dollars" },
  { level: 2, difficulty: "easy", timeLimit: 90, itemCount: 3, allowCents: false, maxItemPrice: 5, minTotal: 5, maxTotal: 15, description: "Three items, whole dollars" },
  { level: 3, difficulty: "easy", timeLimit: 80, itemCount: 3, allowCents: false, maxItemPrice: 8, minTotal: 8, maxTotal: 20, description: "Larger amounts" },
  { level: 4, difficulty: "easy", timeLimit: 80, itemCount: 4, allowCents: false, maxItemPrice: 8, minTotal: 10, maxTotal: 25, description: "Four items" },
  { level: 5, difficulty: "easy", timeLimit: 70, itemCount: 4, allowCents: false, maxItemPrice: 10, minTotal: 15, maxTotal: 30, description: "Easy finale" },
  
  // Medium levels (6-15): Introduce cents
  { level: 6, difficulty: "medium", timeLimit: 75, itemCount: 3, allowCents: true, maxItemPrice: 5, minTotal: 5, maxTotal: 15, description: "First decimals" },
  { level: 7, difficulty: "medium", timeLimit: 75, itemCount: 3, allowCents: true, maxItemPrice: 6, minTotal: 7, maxTotal: 18, description: "More cents practice" },
  { level: 8, difficulty: "medium", timeLimit: 70, itemCount: 4, allowCents: true, maxItemPrice: 6, minTotal: 10, maxTotal: 22, description: "Four items with cents" },
  { level: 9, difficulty: "medium", timeLimit: 70, itemCount: 4, allowCents: true, maxItemPrice: 7, minTotal: 12, maxTotal: 25, description: "Tricky decimals" },
  { level: 10, difficulty: "medium", timeLimit: 65, itemCount: 5, allowCents: true, maxItemPrice: 7, minTotal: 15, maxTotal: 30, description: "Five items" },
  { level: 11, difficulty: "medium", timeLimit: 65, itemCount: 5, allowCents: true, maxItemPrice: 8, minTotal: 18, maxTotal: 35, description: "Speed challenge" },
  { level: 12, difficulty: "medium", timeLimit: 60, itemCount: 5, allowCents: true, maxItemPrice: 8, minTotal: 20, maxTotal: 38, description: "Quick thinking" },
  { level: 13, difficulty: "medium", timeLimit: 60, itemCount: 6, allowCents: true, maxItemPrice: 8, minTotal: 22, maxTotal: 40, description: "Six items rush" },
  { level: 14, difficulty: "medium", timeLimit: 55, itemCount: 6, allowCents: true, maxItemPrice: 9, minTotal: 25, maxTotal: 45, description: "Complex totals" },
  { level: 15, difficulty: "medium", timeLimit: 55, itemCount: 6, allowCents: true, maxItemPrice: 10, minTotal: 28, maxTotal: 50, description: "Medium master" },
  
  // Hard levels (16-25): Faster + more items
  { level: 16, difficulty: "hard", timeLimit: 50, itemCount: 6, allowCents: true, maxItemPrice: 10, minTotal: 30, maxTotal: 55, description: "Hard mode begins" },
  { level: 17, difficulty: "hard", timeLimit: 50, itemCount: 7, allowCents: true, maxItemPrice: 10, minTotal: 32, maxTotal: 60, description: "Seven items" },
  { level: 18, difficulty: "hard", timeLimit: 45, itemCount: 7, allowCents: true, maxItemPrice: 12, minTotal: 35, maxTotal: 65, description: "Speed demon" },
  { level: 19, difficulty: "hard", timeLimit: 45, itemCount: 8, allowCents: true, maxItemPrice: 12, minTotal: 40, maxTotal: 70, description: "Eight items rush" },
  { level: 20, difficulty: "hard", timeLimit: 40, itemCount: 8, allowCents: true, maxItemPrice: 15, minTotal: 45, maxTotal: 80, description: "Lightning fast" },
  { level: 21, difficulty: "hard", timeLimit: 40, itemCount: 9, allowCents: true, maxItemPrice: 15, minTotal: 50, maxTotal: 90, description: "Nine items" },
  { level: 22, difficulty: "hard", timeLimit: 38, itemCount: 9, allowCents: true, maxItemPrice: 18, minTotal: 55, maxTotal: 100, description: "Century mark" },
  { level: 23, difficulty: "hard", timeLimit: 38, itemCount: 10, allowCents: true, maxItemPrice: 18, minTotal: 60, maxTotal: 110, description: "Ten items" },
  { level: 24, difficulty: "hard", timeLimit: 35, itemCount: 10, allowCents: true, maxItemPrice: 20, minTotal: 70, maxTotal: 120, description: "Hard finale prep" },
  { level: 25, difficulty: "hard", timeLimit: 35, itemCount: 12, allowCents: true, maxItemPrice: 20, minTotal: 80, maxTotal: 150, description: "Hard champion" },
  
  // Expert levels (26-30): Extreme challenge
  { level: 26, difficulty: "expert", timeLimit: 30, itemCount: 12, allowCents: true, maxItemPrice: 25, minTotal: 100, maxTotal: 180, description: "Expert begins" },
  { level: 27, difficulty: "expert", timeLimit: 30, itemCount: 15, allowCents: true, maxItemPrice: 25, minTotal: 120, maxTotal: 200, description: "Massive cart" },
  { level: 28, difficulty: "expert", timeLimit: 28, itemCount: 15, allowCents: true, maxItemPrice: 30, minTotal: 140, maxTotal: 250, description: "Speed master" },
  { level: 29, difficulty: "expert", timeLimit: 25, itemCount: 18, allowCents: true, maxItemPrice: 30, minTotal: 160, maxTotal: 300, description: "Ultimate test" },
  { level: 30, difficulty: "expert", timeLimit: 25, itemCount: 20, allowCents: true, maxItemPrice: 35, minTotal: 200, maxTotal: 400, description: "Cashier legend" },
]

export function getLevelConfig(level: number): Level | undefined {
  return LEVELS.find(l => l.level === level)
}

export function generateTransaction(level: Level): Transaction {
  const items: { name: string; price: number; emoji: string }[] = []
  
  for (let i = 0; i < level.itemCount; i++) {
    const item = GROCERY_ITEMS[Math.floor(Math.random() * GROCERY_ITEMS.length)]
    let price = Math.random() * level.maxItemPrice + 0.5
    
    if (!level.allowCents) {
      price = Math.ceil(price)
    } else {
      price = Math.round(price * 4) / 4 // Round to quarters
    }
    
    items.push({
      name: item.name,
      price: price,
      emoji: item.emoji
    })
  }
  
  const total = items.reduce((sum, item) => sum + item.price, 0)
  const roundedTotal = Math.round(total * 100) / 100
  
  // Generate payment amount (slightly over total)
  const payment = Math.ceil(roundedTotal) + Math.floor(Math.random() * 5) * 5
  const change = Math.round((payment - roundedTotal) * 100) / 100
  
  return {
    items,
    total: roundedTotal,
    payment,
    change
  }
}
