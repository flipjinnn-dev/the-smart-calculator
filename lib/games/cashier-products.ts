export interface Product {
  id: string
  name: string
  price: number
  category: "produce" | "dairy" | "bakery" | "meat" | "snacks" | "beverages" | "household" | "frozen"
  barcode: string
  emoji: string
  weight?: number
}

export const PRODUCTS: Product[] = [
  { id: "prod_001", name: "Apple", price: 1.29, category: "produce", barcode: "4131", emoji: "🍎" },
  { id: "prod_002", name: "Banana", price: 0.59, category: "produce", barcode: "4011", emoji: "🍌" },
  { id: "prod_003", name: "Orange", price: 0.99, category: "produce", barcode: "3107", emoji: "🍊" },
  { id: "prod_004", name: "Grapes", price: 3.49, category: "produce", barcode: "4023", emoji: "🍇" },
  { id: "prod_005", name: "Strawberry", price: 4.99, category: "produce", barcode: "4308", emoji: "🍓" },
  { id: "prod_006", name: "Watermelon", price: 5.99, category: "produce", barcode: "4032", emoji: "🍉" },
  { id: "prod_007", name: "Tomato", price: 2.49, category: "produce", barcode: "4664", emoji: "🍅" },
  { id: "prod_008", name: "Lettuce", price: 1.99, category: "produce", barcode: "4061", emoji: "🥬" },
  { id: "prod_009", name: "Carrot", price: 1.29, category: "produce", barcode: "4562", emoji: "🥕" },
  { id: "prod_010", name: "Broccoli", price: 2.99, category: "produce", barcode: "4548", emoji: "🥦" },
  
  { id: "prod_011", name: "Milk", price: 3.99, category: "dairy", barcode: "0111", emoji: "🥛" },
  { id: "prod_012", name: "Cheese", price: 5.49, category: "dairy", barcode: "0112", emoji: "🧀" },
  { id: "prod_013", name: "Yogurt", price: 4.29, category: "dairy", barcode: "0113", emoji: "🥣" },
  { id: "prod_014", name: "Butter", price: 4.99, category: "dairy", barcode: "0114", emoji: "🧈" },
  { id: "prod_015", name: "Eggs", price: 3.49, category: "dairy", barcode: "0115", emoji: "🥚" },
  
  { id: "prod_016", name: "Bread", price: 2.99, category: "bakery", barcode: "0201", emoji: "🍞" },
  { id: "prod_017", name: "Croissant", price: 3.49, category: "bakery", barcode: "0202", emoji: "🥐" },
  { id: "prod_018", name: "Bagel", price: 1.99, category: "bakery", barcode: "0203", emoji: "🥯" },
  { id: "prod_019", name: "Donut", price: 1.49, category: "bakery", barcode: "0204", emoji: "🍩" },
  { id: "prod_020", name: "Cake", price: 12.99, category: "bakery", barcode: "0205", emoji: "🍰" },
  
  { id: "prod_021", name: "Steak", price: 15.99, category: "meat", barcode: "0301", emoji: "🥩" },
  { id: "prod_022", name: "Chicken", price: 8.99, category: "meat", barcode: "0302", emoji: "🍗" },
  { id: "prod_023", name: "Bacon", price: 6.49, category: "meat", barcode: "0303", emoji: "🥓" },
  { id: "prod_024", name: "Hot Dog", price: 4.99, category: "meat", barcode: "0304", emoji: "🌭" },
  { id: "prod_025", name: "Hamburger", price: 9.99, category: "meat", barcode: "0305", emoji: "🍔" },
  
  { id: "prod_026", name: "Chips", price: 3.99, category: "snacks", barcode: "0401", emoji: "🍟" },
  { id: "prod_027", name: "Popcorn", price: 2.99, category: "snacks", barcode: "0402", emoji: "🍿" },
  { id: "prod_028", name: "Candy Bar", price: 1.49, category: "snacks", barcode: "0403", emoji: "🍫" },
  { id: "prod_029", name: "Cookies", price: 4.49, category: "snacks", barcode: "0404", emoji: "🍪" },
  { id: "prod_030", name: "Pretzels", price: 3.49, category: "snacks", barcode: "0405", emoji: "🥨" },
  
  { id: "prod_031", name: "Water", price: 1.99, category: "beverages", barcode: "0501", emoji: "💧" },
  { id: "prod_032", name: "Soda", price: 2.49, category: "beverages", barcode: "0502", emoji: "🥤" },
  { id: "prod_033", name: "Coffee", price: 4.99, category: "beverages", barcode: "0503", emoji: "☕" },
  { id: "prod_034", name: "Beer", price: 7.99, category: "beverages", barcode: "0504", emoji: "🍺" },
  { id: "prod_035", name: "Wine", price: 14.99, category: "beverages", barcode: "0505", emoji: "🍷" },
  { id: "prod_036", name: "Juice", price: 3.99, category: "beverages", barcode: "0506", emoji: "🧃" },
  
  { id: "prod_037", name: "Soap", price: 2.99, category: "household", barcode: "0601", emoji: "🧼" },
  { id: "prod_038", name: "Paper Towels", price: 8.99, category: "household", barcode: "0602", emoji: "🧻" },
  { id: "prod_039", name: "Detergent", price: 11.99, category: "household", barcode: "0603", emoji: "🧴" },
  { id: "prod_040", name: "Candle", price: 6.99, category: "household", barcode: "0604", emoji: "🕯️" },
  
  { id: "prod_041", name: "Ice Cream", price: 5.99, category: "frozen", barcode: "0701", emoji: "🍦" },
  { id: "prod_042", name: "Pizza", price: 8.99, category: "frozen", barcode: "0702", emoji: "🍕" },
  { id: "prod_043", name: "Burrito", price: 4.49, category: "frozen", barcode: "0703", emoji: "🌯" },
  { id: "prod_044", name: "Popsicle", price: 2.99, category: "frozen", barcode: "0704", emoji: "🍡" },
  
  { id: "prod_045", name: "Avocado", price: 2.99, category: "produce", barcode: "4225", emoji: "🥑" },
  { id: "prod_046", name: "Potato", price: 0.79, category: "produce", barcode: "4072", emoji: "🥔" },
  { id: "prod_047", name: "Onion", price: 0.89, category: "produce", barcode: "4663", emoji: "🧅" },
  { id: "prod_048", name: "Garlic", price: 1.99, category: "produce", barcode: "4608", emoji: "🧄" },
  { id: "prod_049", name: "Lemon", price: 0.69, category: "produce", barcode: "4053", emoji: "🍋" },
  { id: "prod_050", name: "Pineapple", price: 4.49, category: "produce", barcode: "4030", emoji: "🍍" },
]

export const getProductByBarcode = (barcode: string): Product | undefined => {
  return PRODUCTS.find(p => p.barcode === barcode)
}

export const getRandomProducts = (count: number, excludeIds: string[] = []): Product[] => {
  const available = PRODUCTS.filter(p => !excludeIds.includes(p.id))
  const shuffled = [...available].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export const getProductsByCategory = (category: Product["category"]): Product[] => {
  return PRODUCTS.filter(p => p.category === category)
}
