# Grocery Cashier Simulation Game

A browser-based cash register simulation game built with Next.js and React that teaches money handling and arithmetic skills through engaging gameplay.

## 🎮 Game Overview

Master the art of being a grocery store cashier! Ring up customer purchases, process payments, and give exact change in this educational and fun simulation game.

## ✨ Core Features

### 💰 Cash Register Mechanics
- **Manual Price Entry**: Enter item prices using an on-screen calculator
- **Running Total**: Track items as you scan them
- **Total Calculation**: Calculate the final purchase amount
- **Accuracy Checking**: Get instant feedback on correct/incorrect totals

### 💵 Payment Processing
- **Multiple Payment Types**: Accept cash payments from customers
- **Payment Validation**: Verify customer payment amounts
- **Change Calculation**: Calculate exact change required

### 🪙 Change Making System
- **Interactive Currency Selection**: Tap bills and coins to make change
- **Visual Currency**: Color-coded bills ($100, $50, $20, $10, $5, $1) and coins (25¢, 10¢, 5¢, 1¢)
- **Flexible Solutions**: Multiple correct change combinations accepted
- **Real-time Validation**: See your change total update as you select currency

### 📊 Progression System
- **30 Challenging Levels**: Progress from easy to expert difficulty
- **Difficulty Tiers**:
  - **Easy (Levels 1-5)**: Whole dollar amounts, 2-4 items
  - **Medium (Levels 6-15)**: Introduce cents, 3-6 items, faster pace
  - **Hard (Levels 16-25)**: More items, tighter time limits, larger totals
  - **Expert (Levels 26-30)**: Ultimate challenge with 12-20 items

### ⏱️ Time Challenges
- **Countdown Timer**: Race against the clock (90s to 25s depending on level)
- **Time Bonuses**: Earn extra points for speedy service
- **Pressure Building**: Time limits decrease as difficulty increases

### 🏆 Scoring & Stars
- **Point System**:
  - +10 points per item added
  - +50 points for correct total
  - +30 points for accepting payment
  - +100 points for correct change
  - Time bonus: 2 points per second remaining
- **Star Ratings**:
  - ⭐ 1 Star: 100+ points
  - ⭐⭐ 2 Stars: 200+ points
  - ⭐⭐⭐ 3 Stars: 300+ points

### 🎨 UI/UX Features
- **Calculator-Style Interface**: Familiar numpad layout
- **Color-Coded Feedback**: Green for success, red for errors
- **Animated Transitions**: Smooth state changes
- **Visual Progress**: See completed items marked
- **Shopping Cart Display**: Track all scanned items
- **Real-time Totals**: Running cart total visible

### 🔊 Audio Feedback
- **Beep Sound**: Key presses and item additions
- **Success Chime**: Correct calculations and completions
- **Error Buzz**: Wrong amounts or invalid actions
- **Coin Sounds**: Currency selection
- **Drawer Sound**: Cash register opening

### 💾 Progress Tracking
- **LocalStorage Persistence**: Save game progress automatically
- **Statistics Tracking**:
  - Current level progress
  - Highest level reached
  - Total score accumulated
  - Total stars earned

## 🎯 Educational Benefits

This game helps players develop:
- **Addition Skills**: Summing purchase totals
- **Subtraction Skills**: Calculating change
- **Decimal Math**: Working with cents and dollars
- **Money Recognition**: Identifying bill and coin values
- **Mental Math**: Quick calculations under time pressure
- **Problem Solving**: Finding optimal change combinations
- **Attention to Detail**: Accuracy in data entry

## 🎲 Gameplay Flow

### 1️⃣ Shopping Phase
1. View the current item to ring up
2. Enter the price using the calculator
3. Press the **+** button to add to cart
4. Repeat for all items
5. Press **Calculate Total** when complete

### 2️⃣ Payment Phase
1. See the customer's payment amount
2. Enter the exact payment amount shown
3. Press **Accept Payment** to proceed

### 3️⃣ Change Phase
1. View the required change amount
2. Select bills and coins to make exact change
3. Tap currency to add, tap badges to remove
4. Press **Give Change** when correct

### 4️⃣ Completion
- Earn points based on speed and accuracy
- Receive 1-3 stars based on total score
- Progress to next level or retry

## 🛠️ Technical Implementation

### Technologies Used
- **Next.js 14+**: React framework with App Router
- **React 18+**: UI component library
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **Lucide React**: Icon library
- **Canvas Confetti**: Celebration effects

### File Structure
```
app/(games-other-pages)/games/grocery-cashier/
├── GroceryCashierClient.tsx    # Main game component
├── page.tsx                     # Next.js page route
├── layout.tsx                   # Metadata and SEO
└── README.md                    # Documentation

lib/games/
├── grocery-cashier-levels.ts    # Level configurations
└── grocery-cashier-currency.ts  # Currency system
```

### Data Structures

**Level Configuration:**
```typescript
interface Level {
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
```

**Transaction:**
```typescript
interface Transaction {
  items: { name: string; price: number; emoji: string }[]
  total: number
  payment: number
  change: number
}
```

**Currency Denomination:**
```typescript
interface CurrencyDenomination {
  value: number
  type: "bill" | "coin"
  label: string
  color: string
  emoji: string
}
```

## 🎓 Target Audience

- **Primary**: Kids learning money skills (ages 8-14)
- **Secondary**: Anyone wanting mental math practice
- **Tertiary**: Retail training and educational purposes

## 📱 Device Support

- **Desktop**: Full keyboard and mouse support
- **Tablet**: Touch-friendly interface
- **Mobile**: Responsive design with optimized layout
- **All Browsers**: Chrome, Firefox, Safari, Edge

## 🚀 Running the Game

### Development
```bash
npm run dev
```

Navigate to: `http://localhost:3000/games/grocery-cashier`

### Production Build
```bash
npm run build
npm start
```

## 🎨 Customization Options

### Difficulty Scaling
Adjust in `grocery-cashier-levels.ts`:
- Time limits per level
- Item counts
- Price ranges
- Cent inclusion

### Currency System
Modify in `grocery-cashier-currency.ts`:
- Add/remove denominations
- Change color schemes
- Adjust validation logic

### Scoring
Edit point values in `GroceryCashierClient.tsx`:
- Item addition points
- Correct total bonus
- Payment acceptance bonus
- Change making reward
- Time multipliers

## 🌟 Future Enhancements

Potential additions:
- **Voucher System**: Discount coupons and gift cards
- **Card Payments**: Credit/debit card processing
- **Store Themes**: Unlock different store environments
- **Register Skins**: Customize cash register appearance
- **Multiplayer Mode**: Compete with other players
- **Leaderboards**: Global high score tracking
- **Achievements**: Unlock badges and rewards
- **Tutorial Mode**: Step-by-step guided learning
- **Practice Mode**: No time limits, focus on accuracy
- **Challenge Mode**: Random difficulty spikes

## 📊 Game Statistics

- **Total Levels**: 30
- **Difficulty Tiers**: 4 (Easy, Medium, Hard, Expert)
- **Unique Items**: 30 grocery products
- **Currency Types**: 10 (6 bills + 4 coins)
- **Maximum Score**: 400+ points per level
- **Minimum Time**: 25 seconds (Expert levels)
- **Maximum Time**: 90 seconds (Easy levels)

## 🎯 Learning Outcomes

By completing this game, players will:
- Master basic arithmetic operations
- Develop money handling confidence
- Improve mental calculation speed
- Learn currency denominations
- Practice problem-solving under pressure
- Build attention to detail
- Enhance decision-making skills

## 🔧 Troubleshooting

**Sound not working?**
- Check browser sound permissions
- Toggle sound on/off in menu
- Verify browser audio is not muted

**Progress not saving?**
- Enable browser cookies/localStorage
- Check browser privacy settings
- Don't use incognito/private mode

**Game running slow?**
- Close other browser tabs
- Disable browser extensions
- Use modern browser version

## 📝 License & Credits

Built with ❤️ for educational purposes.

**Game Design Inspiration**: Based on Calculators.org's Grocery Cashier
**Framework**: Next.js + React
**Icons**: Lucide React
**Animations**: Framer Motion

---

🎮 **Ready to play?** Start your cashier journey today and master the art of the cash register!
