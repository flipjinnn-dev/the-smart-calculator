# 🛒 Cashier Simulator - Comprehensive Documentation

## 🎮 Game Overview

**Cashier Simulator** is a modern, browser-based grocery store checkout simulation game built with Next.js, React, and TypeScript. Players take on the role of a supermarket cashier, managing the complete checkout process from scanning items to processing payments and giving change.

### Key Features

- 🎯 **160 Progressive Levels** - From beginner to master cashier
- 👥 **Customer Queue System** - Manage multiple customers with patience meters
- 💳 **Dual Payment Systems** - Cash and card payments with change calculation
- ⭐ **3-Star Rating System** - Performance-based scoring
- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 🔊 **Audio Feedback** - Scanner beeps, success sounds, error alerts
- 💾 **Progress Saving** - LocalStorage persistence
- 🏆 **Achievement System** - Unlock rewards and track milestones
- 📊 **Statistics Tracking** - Monitor performance over time
- 🎫 **Discount & Coupon System** - Advanced features in higher levels

---

## 🎯 Core Gameplay Mechanics

### 1. Item Scanning
- **Barcode Input**: Enter product barcodes manually or click products to scan
- **Product Database**: 50+ unique grocery items across 8 categories
- **Visual Feedback**: Emoji-based product representation
- **Error Handling**: Wrong item detection and feedback

### 2. Cart Management
- **Add Items**: Scan products to add to cart
- **Remove Items**: Click X to remove incorrect items
- **Quantity Tracking**: Multiple quantities of same product
- **Real-time Total**: Automatic calculation with discounts

### 3. Payment Processing
- **Card Payment**: Instant approval, no change needed
- **Cash Payment**: Calculate and verify correct change
- **Mixed Payment**: Available in higher levels
- **Discount System**: Coupons applied automatically

### 4. Customer Management
- **Queue System**: Multiple customers waiting in line
- **Patience Meter**: Time-based customer satisfaction
- **Mood States**: Happy, neutral, impatient, angry, cheerful
- **Tip Chances**: Better service = better tips

### 5. Time Management
- **Level Timer**: Complete all customers before time expires
- **Rush Hour**: Special fast-paced levels
- **Checkout Speed**: Bonus points for quick service
- **Patience Countdown**: Individual customer timers

---

## 📊 Level Progression System

### Difficulty Tiers

| Tier | Levels | Time Limit | Customers | Items Range | Features |
|------|--------|------------|-----------|-------------|----------|
| **Easy** | 1-50 | 150-180s | 3-4 | 2-5 | Basic scanning |
| **Medium** | 51-80 | 120s | 5 | 4-7 | Discounts, Rush Hour |
| **Hard** | 81-120 | 100s | 6 | 5-9 | Coupons, Mixed Payment |
| **Expert** | 121-150 | 90s | 7 | 6-11 | Frequent Rush Hour |
| **Master** | 151-160 | 75s | 8 | 7-13 | Continuous Rush Hour |

### Star Requirements

Stars are awarded based on points earned:
- 🌟 **3 Stars**: Excellent performance (varies by difficulty)
- 🌟🌟 **2 Stars**: Good performance
- ⭐ **1 Star**: Minimum passing score

### Scoring System

| Action | Points |
|--------|--------|
| Scan correct item | +5 |
| Complete checkout | +30 |
| Speed bonus (< 15s) | +20 |
| Speed bonus (< 30s) | +10 |
| Accuracy bonus | +15 |
| Wrong item | -5 |
| Customer leaves angry | -20 |
| Incorrect payment | -10 |

---

## 🎨 Product Categories

### Available Products (50 Total)

1. **Produce** (10 items)
   - Apple, Banana, Orange, Grapes, Strawberry, Watermelon, Tomato, Lettuce, Carrot, Broccoli, Avocado, Potato, Onion, Garlic, Lemon, Pineapple

2. **Dairy** (5 items)
   - Milk, Cheese, Yogurt, Butter, Eggs

3. **Bakery** (5 items)
   - Bread, Croissant, Bagel, Donut, Cake

4. **Meat** (5 items)
   - Steak, Chicken, Bacon, Hot Dog, Hamburger

5. **Snacks** (5 items)
   - Chips, Popcorn, Candy Bar, Cookies, Pretzels

6. **Beverages** (6 items)
   - Water, Soda, Coffee, Beer, Wine, Juice

7. **Household** (4 items)
   - Soap, Paper Towels, Detergent, Candle

8. **Frozen** (4 items)
   - Ice Cream, Pizza, Burrito, Popsicle

---

## 🏆 Achievement System

### Available Achievements

1. **First Sale!** 🎯 - Serve your first customer
2. **Speed Demon** ⚡ - Complete checkout in under 10 seconds
3. **Perfect 10** 💯 - Get 10 perfect checkouts
4. **Master Cashier** 👑 - Reach level 50
5. **Millionaire** 💰 - Earn $1,000,000 total
6. **Star Collector** ⭐ - Collect 100 stars
7. **Customer Hero** 🦸 - Serve 500 customers
8. **Accuracy Master** 🎯 - Maintain 95% accuracy over 50 checkouts

---

## 🎵 Audio System

The game features procedural audio generation using Web Audio API:

- **Scan Sound**: 800Hz beep (0.1s)
- **Success Sound**: Two-tone melody (523Hz → 659Hz)
- **Error Sound**: Low 200Hz buzz (0.3s)
- **Complete Sound**: Four-note victory jingle
- **Coin Sound**: 1000Hz ding (0.15s)

Toggle sound on/off from the main menu.

---

## 💾 Data Persistence

### LocalStorage Structure

```json
{
  "currentLevel": 1,
  "levelsCompleted": [1, 2, 3],
  "totalStars": 8,
  "totalMoney": 1500,
  "achievements": ["first_customer", "speed_demon"],
  "stats": {
    "totalCustomersServed": 25,
    "perfectCheckouts": 3,
    "averageSpeed": 25.5,
    "accuracy": 0.95
  }
}
```

Progress is automatically saved after each level completion.

---

## 🎮 Controls & Interface

### Keyboard Shortcuts
- **Enter**: Submit barcode scan
- **Tab**: Navigate between inputs
- **Esc**: Pause/return to menu (planned feature)

### Mouse/Touch Controls
- **Click Products**: Quick scan items
- **Click Cart Items**: Remove from cart
- **Click Buttons**: All standard interactions

### Mobile Optimization
- Responsive grid layouts
- Touch-friendly buttons
- Optimized for portrait and landscape
- Reduced complexity for smaller screens

---

## 🔧 Technical Architecture

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **UI Library**: React 18+
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui
- **Effects**: Canvas Confetti
- **Type Safety**: TypeScript

### File Structure
```
app/(games-other-pages)/games/cashier-simulator/
├── CashierSimulatorClient.tsx  # Main game component
├── page.tsx                     # Route handler
├── layout.tsx                   # Metadata & SEO
└── README.md                    # This file

lib/games/
├── cashier-products.ts          # Product database & utilities
└── cashier-levels.ts            # Level configs & customer generation
```

### Key Components

1. **CashierSimulatorClient** - Main game container
   - State management for all game data
   - Timer and patience countdown logic
   - Audio generation system
   - LocalStorage integration

2. **Product Database** (`cashier-products.ts`)
   - 50 products with unique barcodes
   - Category-based organization
   - Helper functions for product lookup

3. **Level System** (`cashier-levels.ts`)
   - Procedural generation of 160 levels
   - Customer order generation
   - Difficulty scaling algorithms

---

## 🚀 Deployment

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Requirements
- Node.js 18.17 or later
- Modern browser with ES6+ support
- Web Audio API support
- LocalStorage enabled

### Performance Optimization
- Code splitting via Next.js
- Lazy loading of animations
- Memoized calculations
- Efficient re-render patterns

---

## 📈 Future Enhancements

### Planned Features
- 🌍 Multi-language support (Spanish, French, German)
- 🎨 Unlockable register skins and themes
- 👥 Multiplayer leaderboard
- 🏪 Store upgrade system
- 📱 Progressive Web App (PWA) support
- 🎓 Training mode with tooltips
- 🎁 Daily challenges and rewards
- 📊 Advanced analytics dashboard

### Possible Expansions
- Custom product categories
- Special event levels (holidays, sales)
- Manager role simulation
- Inventory management mechanics
- Employee training scenarios

---

## 🐛 Known Issues & Solutions

### Common Issues

1. **Audio not playing**
   - Solution: Click anywhere on page first (browser autoplay policy)
   - Check sound toggle in main menu

2. **Progress not saving**
   - Solution: Enable LocalStorage in browser settings
   - Check for private browsing mode

3. **Performance on mobile**
   - Solution: Reduce animation complexity
   - Close other browser tabs

4. **Barcode input not focusing**
   - Solution: Click the input field manually
   - Use product click shortcuts

---

## 📚 Educational Value

### Skills Developed
- ✅ **Math Skills**: Addition, subtraction, money calculations
- ✅ **Speed & Accuracy**: Quick mental arithmetic
- ✅ **Time Management**: Working under pressure
- ✅ **Customer Service**: Patience and efficiency
- ✅ **Problem Solving**: Error correction and adaptation
- ✅ **Attention to Detail**: Verifying orders

### Target Audience
- Students learning money math (ages 10+)
- Retail training programs
- Anyone interested in simulation games
- Educational institutions

---

## 🤝 Contributing

This game is part of a larger calculator and educational games website. For improvements:

1. Test thoroughly across devices
2. Maintain consistent code style
3. Document new features
4. Ensure accessibility standards
5. Optimize for performance

---

## 📝 License & Credits

Part of **The Smart Calculator** educational games collection.

### Technologies Used
- Next.js by Vercel
- React by Meta
- Framer Motion by Framer
- Lucide Icons
- Shadcn/ui components
- Canvas Confetti

---

## 📞 Support

For issues, suggestions, or feedback:
- Check the tutorial in-game (? button)
- Review this documentation
- Test in different browsers
- Clear cache and reload

---

## 🎉 Version History

### v1.0.0 (Current)
- ✅ 160 levels with progressive difficulty
- ✅ Full payment system (cash & card)
- ✅ Customer queue with patience mechanics
- ✅ Star rating system
- ✅ Achievement tracking
- ✅ Audio feedback
- ✅ Progress persistence
- ✅ Responsive design
- ✅ Complete product database
- ✅ Tutorial system

---

**Enjoy playing Cashier Simulator! 🛒✨**
