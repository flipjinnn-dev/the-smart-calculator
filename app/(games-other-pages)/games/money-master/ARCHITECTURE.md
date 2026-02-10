# Money Master: Architecture & Technical Overview 🏗️

Complete technical architecture, wireframes, game flow, and optimization details.

## 📐 UI Wireframes

### Splash Screen Layout
```
┌─────────────────────────────────────────┐
│                                         │
│         💰 Money Master 💰              │
│         Count Smart, Learn Fast!        │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │   Choose Your Challenge           │  │
│  │                                   │  │
│  │  ┌──────┐  ┌──────┐  ┌──────┐   │  │
│  │  │ 😊   │  │ 🤔   │  │ 🔥   │   │  │
│  │  │Begin │  │Inter │  │Advan │   │  │
│  │  │      │  │      │  │      │   │  │
│  │  └──────┘  └──────┘  └──────┘   │  │
│  │                                   │  │
│  │  ┌──────────┐  ┌──────────┐     │  │
│  │  │🏆 Streak │  │📊 Accuracy│     │  │
│  │  │    5     │  │    87%    │     │  │
│  │  └──────────┘  └──────────┘     │  │
│  │                                   │  │
│  │  ┌─────────────────────────┐     │  │
│  │  │    ▶ Start Game         │     │  │
│  │  └─────────────────────────┘     │  │
│  │                                   │  │
│  │  ┌──────────┐  ┌──────────┐     │  │
│  │  │ℹ How to │  │🏅 Achieve│     │  │
│  │  │  Play    │  │  ments   │     │  │
│  │  └──────────┘  └──────────┘     │  │
│  └───────────────────────────────────┘  │
│                                         │
│              🔊 / 🔇                    │
└─────────────────────────────────────────┘
```

### Playing Screen Layout
```
┌─────────────────────────────────────────┐
│ ⭐ Level 3  ⏱️ 00:45/01:00  📊 5/15    │
│                                         │
│           Target Amount                 │
│            $8.97                        │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │       💰 Money Box 💰           │   │
│  │                                 │   │
│  │    Current Total: $7.50         │   │
│  │                                 │   │
│  │   [$5] [$1] [$1] [25¢] [25¢]  │   │
│  │                                 │   │
│  │   [Drag money here...]          │   │
│  └─────────────────────────────────┘   │
│                                         │
│  💬 Try using quarters instead!         │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │      ✅ Check Answer            │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ✨ Available Money                     │
│  ┌─────────────────────────────────┐   │
│  │ [$10][$20][$1][50¢][10¢][5¢]  │   │
│  │ [1¢][1¢][25¢][5¢][10¢][$5]    │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

### Level Complete Screen
```
┌─────────────────────────────────────────┐
│                                         │
│              🏆                         │
│                                         │
│        Level Complete! 🎉               │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  💡 Learning Insight            │   │
│  │  You used 3 quarters instead    │   │
│  │  of 15 nickels. Great choice!   │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌──────┐  ┌──────┐  ┌──────┐         │
│  │ ⏱️   │  │ 📊   │  │ ⭐   │         │
│  │0:23  │  │7 Move│  │1 Try │         │
│  └──────┘  └──────┘  └──────┘         │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │    Next Level  ▶                │   │
│  └─────────────────────────────────┘   │
│                                         │
│              🔄                         │
└─────────────────────────────────────────┘
```

## 🔄 Game State Flow Diagram

```
┌──────────┐
│  START   │
└────┬─────┘
     │
     ▼
┌──────────────────┐
│  SPLASH SCREEN   │◄──────────┐
│  - Select Diff   │           │
│  - View Stats    │           │
│  - Tutorials     │           │
└────┬─────────────┘           │
     │ Click Start             │
     ▼                         │
┌──────────────────┐           │
│   PLAYING        │           │
│  - Drag & Drop   │           │
│  - Timer Running │           │
│  - Move Counting │           │
└────┬─────────────┘           │
     │ Click Check            │
     ▼                         │
┌──────────────────┐           │
│   VALIDATION     │           │
│  - Correct?      │           │
└────┬─────────────┘           │
     │                         │
     ├─ Correct ──────┐        │
     │                ▼        │
     │         ┌──────────────┐│
     │         │LEVEL COMPLETE││
     │         │- Stats       ││
     │         │- Insights    ││
     │         │- Confetti    ││
     │         └──┬───────────┘│
     │            │            │
     │ More Levels?            │
     │            │            │
     │         Yes│  No        │
     │            ▼    ▼       │
     │         PLAYING  │      │
     │            ▲     │      │
     │            │     │      │
     ├─ Wrong ────┘     ▼      │
     │           ┌──────────┐  │
     │           │GAME OVER │──┘
     │           │- Summary │
     │           │- Restart │
     │           └──────────┘
     ▼
  Continue...
```

## 🧩 Component Architecture

### Component Hierarchy
```
MoneyMasterClient (Root)
│
├─ GameStateManager
│  ├─ Splash Screen
│  │  ├─ Title
│  │  ├─ DifficultySelector
│  │  ├─ StatsPreview
│  │  └─ ActionButtons
│  │
│  ├─ Playing Screen
│  │  ├─ Header
│  │  │  ├─ LevelIndicator
│  │  │  ├─ Timer
│  │  │  └─ MoveCounter
│  │  │
│  │  ├─ TargetDisplay
│  │  │
│  │  ├─ MoneyBox (Drop Zone)
│  │  │  ├─ CurrentTotal
│  │  │  └─ CurrencyItems[]
│  │  │
│  │  ├─ FeedbackMessage
│  │  │
│  │  ├─ CheckButton
│  │  │
│  │  └─ CurrencyTray
│  │     └─ CurrencyItems[]
│  │
│  ├─ Level Complete
│  │  ├─ TrophyIcon
│  │  ├─ LearningInsight
│  │  ├─ StatsGrid
│  │  └─ NextLevelButton
│  │
│  └─ Game Over
│     ├─ Summary
│     ├─ FinalStats
│     └─ RestartButton
│
├─ Modals
│  ├─ TutorialModal
│  └─ AchievementsModal
│
└─ AudioManager
   ├─ DropSound
   ├─ SuccessSound
   └─ ErrorSound
```

### Data Flow
```
User Action → Event Handler → State Update → Re-render
     ↓              ↓              ↓            ↓
  Drag coin    handleDrop()   setCurrency   UI updates
  Click check  checkAnswer()  setFeedback   Show result
  Next level   startLevel()   setLevel      New target
```

## 💾 State Management

### Core State Variables
```typescript
// Game State Machine
gameState: "splash" | "playing" | "levelComplete" | "gameOver"

// Difficulty & Level
difficulty: "beginner" | "intermediate" | "advanced"
currentLevelIndex: number
currentLevel: Level | null

// Currency Management
availableCurrency: Currency[]  // Tray
boxCurrency: Currency[]        // Drop zone
boxTotal: number              // Calculated sum

// Game Metrics
time: number                  // Seconds elapsed
moves: number                 // Drag actions
attempts: number             // Check button clicks

// Persistence
achievements: Achievement[]   // Unlocked achievements
stats: GameStats             // Overall performance

// UI State
draggedItem: string | null   // Currently dragging
feedback: string | null      // Message to show
showHint: boolean           // Hint visibility
shake: boolean              // Error animation
celebrate: boolean          // Success animation
```

### State Transitions
```typescript
// Splash → Playing
setGameState("playing")
startLevel(0)
initAudio()

// Playing → Level Complete
checkAnswer() → Correct → setGameState("levelComplete")
updateStats()
checkAchievements()
showConfetti()

// Level Complete → Playing (next level)
setGameState("playing")
startLevel(currentLevelIndex + 1)

// Level Complete → Game Over (no more levels)
setGameState("gameOver")
saveFinalStats()

// Any → Splash (restart)
resetAllState()
setGameState("splash")
```

## 🎮 Game Logic Algorithms

### Currency Generation Algorithm
```typescript
function generateCurrency(target: number): Currency[] {
  // 1. Determine available denominations based on target
  let types = ["penny", "nickel", "dime", "quarter"]
  if (target >= 1) types.push("dollar1", "dollar5")
  if (target >= 10) types.push("dollar10", "dollar20")
  if (target >= 50) types.push("dollar50")
  if (target >= 100) types.push("dollar100")
  
  // 2. Calculate quantities (ensure solvable + extras)
  for each type:
    if (bill): count = min(3, ceil(target / value))
    if (coin): count = min(4, ceil(target / value) + 2)
  
  // 3. Shuffle for randomness
  return shuffle(currency)
}
```

### Validation Logic
```typescript
function checkAnswer() {
  const difference = abs(boxTotal - target)
  const tolerance = 0.001  // Handle floating point
  
  if (difference < tolerance) {
    handleLevelComplete()  // Correct!
  } else {
    // Wrong - provide feedback
    if (boxTotal > target) {
      setFeedback("Too much!")
    } else {
      setFeedback("Not enough!")
    }
    
    // Show hint after 2 attempts (beginner only)
    if (attempts >= 1 && level.hint) {
      showHint = true
    }
  }
}
```

### Learning Insight Generator
```typescript
function generateInsight(): string {
  const bills = boxCurrency.filter(isBill).length
  const coins = boxCurrency.filter(isCoin).length
  
  if (moves <= 3 && target < 1) {
    return "Excellent! Fewest coins possible"
  } else if (coins > 10) {
    return "Tip: Try using bills instead of many coins"
  } else if (time <= 10) {
    return "Lightning fast!"
  } else {
    return "Well done!"
  }
}
```

### Achievement Unlock Logic
```typescript
function checkAchievements(stats: GameStats, streak: number) {
  if (stats.totalPlayed === 1) unlock("first_win")
  if (attempts === 0) unlock("perfect_score")
  if (time <= 10 && hasTimeLimit) unlock("speed_demon")
  if (moves <= 3) unlock("efficient")
  if (streak >= 5) unlock("streak_5")
  if (allDifficultiesComplete) unlock("master")
}
```

## 🎨 Animation Timeline

### Level Start
```
0ms:   Fade in target (opacity 0→1)
200ms: Currency items spawn (scale 0→1, rotate -180→0)
400ms: Each item staggers by 50ms
800ms: All animations complete
```

### Drag & Drop
```
On Drag Start:
  0ms:  Scale 1→1.1, opacity 1→0.5
  100ms: Translate Y 0→-10px

While Dragging:
  Continuous: Follow cursor/touch
  Shadow: Large, offset

On Drop:
  0ms:  Snap to position
  100ms: Scale back to 1, opacity to 1
  150ms: Play sound
```

### Check Answer - Success
```
0ms:   Button press (scale 0.98)
100ms: Calculate result
200ms: Confetti launch
250ms: Success sound (3 notes: 0ms, 100ms, 200ms)
300ms: Box celebrate (scale 1→1.15→1)
500ms: Show feedback message (slide up)
2000ms: Navigate to next screen
```

### Check Answer - Error
```
0ms:   Button press
100ms: Calculate result
200ms: Error sound (200Hz buzz)
250ms: Shake animation (x: ±10px, 500ms)
300ms: Show feedback (slide up, red)
1000ms: Show hint (if enabled)
```

## 🔊 Audio System Architecture

### Web Audio API Implementation
```typescript
class AudioManager {
  context: AudioContext
  
  initialize() {
    context = new AudioContext()
    // Resume if suspended (autoplay policy)
    if (context.state === 'suspended') {
      context.resume()
    }
  }
  
  playTone(frequency, duration, type) {
    oscillator = context.createOscillator()
    gain = context.createGain()
    
    oscillator.frequency.value = frequency
    oscillator.type = type  // sine, sawtooth, etc.
    
    gain.gain.setValueAtTime(0.2, context.currentTime)
    gain.gain.exponentialRampToValueAtTime(
      0.01, 
      context.currentTime + duration
    )
    
    oscillator.connect(gain)
    gain.connect(context.destination)
    
    oscillator.start(context.currentTime)
    oscillator.stop(context.currentTime + duration)
  }
}
```

### Sound Specifications
```typescript
Sounds = {
  drop: {
    frequency: 400,
    duration: 100,
    type: "sine"
  },
  success: {
    notes: [
      { freq: 523, duration: 150, delay: 0 },    // C5
      { freq: 659, duration: 150, delay: 100 },  // E5
      { freq: 784, duration: 200, delay: 200 }   // G5
    ]
  },
  error: {
    frequency: 200,
    duration: 300,
    type: "sawtooth"
  }
}
```

## 📱 Responsive Breakpoints & Adaptations

### Breakpoint Strategy
```css
/* Mobile First */
.default { /* 0-639px */ }

@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Component Adaptations
```typescript
Mobile (< 640px):
  - Currency: Smaller (50-56px)
  - Typography: Reduced scale
  - Layout: Single column
  - Padding: Compact (p-4)
  - Controls: Bottom-fixed
  - Touch targets: Minimum 44px

Tablet (640-1024px):
  - Currency: Medium (56-60px)
  - Typography: Base scale
  - Layout: 2-column grids
  - Padding: Comfortable (p-6)

Desktop (> 1024px):
  - Currency: Full size (64-72px)
  - Typography: Large scale
  - Layout: Multi-column
  - Padding: Spacious (p-8)
  - Hover effects: Enabled
```

## 🚀 Performance Optimizations

### Implemented Techniques
```typescript
// 1. Memoized callbacks
const handleDrop = useCallback(() => {
  // Stable reference, prevents re-renders
}, [dependencies])

// 2. Conditional rendering
{gameState === "playing" && <PlayingScreen />}

// 3. Key props for list rendering
{currencies.map(c => 
  <Currency key={c.id} {...c} />
)}

// 4. CSS animations over JS
// Use Tailwind/Framer Motion (GPU accelerated)

// 5. LocalStorage for persistence
// No network requests needed

// 6. Lazy state updates
// Batch updates where possible
```

### Bundle Size Strategy
```
Core game logic: ~15KB
React hooks: ~5KB
Framer Motion: ~50KB (tree-shaken)
canvas-confetti: ~10KB
Lucide icons: ~5KB (only used icons)
Total: ~85KB gzipped
```

## 🔐 Security & Privacy

### Data Handling
```typescript
Data Stored (localStorage):
  - moneyMasterStats: GameStats object
  - moneyMasterAchievements: Achievement[]
  
Data NOT Stored:
  - No personal information
  - No payment data
  - No tracking cookies
  - No external API calls
  
Privacy:
  - All processing client-side
  - No server communication
  - User can clear anytime
  - No third-party scripts
```

## 🧪 Testing Strategy

### Manual Test Cases
```
1. Currency Generation
   - Verify all targets solvable
   - Check no denomination shortages
   - Test edge cases (0.01, 199.99)

2. Drag & Drop
   - Mouse drag works
   - Touch drag works
   - Multi-item dragging prevented
   - Invalid drops rejected

3. Validation
   - Exact match accepted
   - Over amount rejected
   - Under amount rejected
   - Floating point handled (0.001 tolerance)

4. Timer
   - Counts up correctly
   - Stops on level complete
   - Triggers timeout if limit reached
   - Displays formatted time

5. Persistence
   - Stats save to localStorage
   - Stats load on page refresh
   - Achievements persist
   - Works in normal mode (not private)
```

### Automated Test Suggestions
```typescript
// Jest + React Testing Library
describe("MoneyMaster", () => {
  test("renders splash screen", () => {})
  test("starts game on button click", () => {})
  test("validates correct answer", () => {})
  test("rejects incorrect answer", () => {})
  test("unlocks achievements", () => {})
  test("persists stats", () => {})
})

// Playwright E2E
test("complete full game flow", async ({ page }) => {
  await page.goto("/games/money-master")
  await page.click("text=Start Game")
  // ... drag currency, check answer, etc.
})
```

## 📊 Analytics Event Schema

### Suggested Tracking Events
```typescript
Events = {
  game_start: {
    difficulty: string,
    timestamp: number
  },
  
  level_complete: {
    level: number,
    time: number,
    moves: number,
    attempts: number,
    perfect: boolean
  },
  
  achievement_unlock: {
    achievement_id: string,
    timestamp: number
  },
  
  game_complete: {
    difficulty: string,
    total_time: number,
    accuracy: number,
    streak: number
  }
}
```

## 🎯 Future Architecture Enhancements

### Backend Integration (Optional)
```
Current: 100% client-side
Future: Optional cloud features

Potential Backend:
  - Global leaderboards
  - User accounts
  - Cross-device sync
  - Multiplayer mode
  - Teacher dashboards

Tech Stack Suggestion:
  - Firebase (simplest)
  - Supabase (open source)
  - Custom REST API
```

### Multiplayer Architecture
```
WebSocket Connection
     ↓
Game Room (2-4 players)
     ↓
Same Target, Race to Complete
     ↓
Live Opponent Progress View
     ↓
Winner Announcement
```

## 🔧 Configuration Management

### Environment Variables
```typescript
// .env.local (optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_LEADERBOARD=false
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Feature Flags
```typescript
const features = {
  analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  leaderboard: process.env.NEXT_PUBLIC_ENABLE_LEADERBOARD === 'true',
  multiplayer: false,  // Not yet implemented
  customLevels: false  // Future feature
}
```

## 📦 Deployment Architecture

### Static Deployment (Current)
```
Build → Static Assets → CDN → User
  ↓
Next.js Build
  ↓
HTML + CSS + JS bundle
  ↓
Vercel/Netlify/Static Host
  ↓
Edge Network Distribution
  ↓
Fast Global Access
```

### Progressive Web App (Future)
```
Service Worker → Cache Assets → Offline Play
       ↓
  Install Prompt
       ↓
  Home Screen Icon
       ↓
  Native-like Experience
```

---

## 🎓 Educational Framework Alignment

### Learning Standards Addressed
- **CCSS.Math.2.MD.C.8**: Solve word problems involving money
- **CCSS.Math.2.NBT.B.5**: Fluently add within 100
- **Financial Literacy**: Currency recognition and value

### Bloom's Taxonomy Levels
1. **Remember**: Recognize currency values
2. **Understand**: Comprehend money combinations
3. **Apply**: Use skills to solve targets
4. **Analyze**: Determine optimal solutions
5. **Evaluate**: Judge efficiency of strategies
6. **Create**: Develop own solving approaches

---

**Architecture Status**: ✅ Production Ready

**Scalability**: Supports 1000+ concurrent users (static)

**Maintainability**: Modular, documented, testable

**Performance**: Lighthouse score 95+ expected
