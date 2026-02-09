# Coin Saver Challenge - UI/UX Design Guide

## 🎨 Design Philosophy

Modern, playful, and intuitive. The game uses vibrant gradients, smooth animations, and clear visual hierarchy to create an engaging experience that works beautifully across all devices.

## 🌈 Color System

### Primary Gradients
```css
Splash Screen:     from-purple-500 via-pink-500 to-orange-400
Tutorial:          from-blue-500 via-purple-500 to-pink-500
Game Screen:       from-indigo-500 via-purple-500 to-pink-500
Level Up:          from-green-500 via-emerald-500 to-teal-500
Game Over:         from-gray-800 via-gray-900 to-black
```

### Coin Colors
```css
Penny:             from-amber-400 to-amber-600      (Bronze)
Nickel:            from-gray-300 to-gray-500        (Silver)
Dime:              from-blue-300 to-blue-500        (Blue)
Quarter:           from-green-300 to-green-500      (Green)
Bonus:             from-yellow-300 to-yellow-500    (Gold)
Penalty:           from-red-400 to-red-600          (Red)
Multiplier:        from-purple-400 to-purple-600    (Purple)
```

### UI Elements
```css
Cards:             bg-white/20 backdrop-blur-lg
Buttons:           from-green-400 to-green-600 hover:from-green-500 to-green-700
Progress Bar:      bg-white/20 with gradient fill
Timer (low):       text-red-300 with pulse animation
```

## 📐 Layout Wireframes

### Splash Screen Layout
```
┌─────────────────────────────────────┐
│                                     │
│           🪙 Coin Saver            │
│              Challenge              │
│                                     │
│     ┌─────────────────────┐        │
│     │   High Score: 500   │        │
│     │   Levels: 5         │        │
│     │                     │        │
│     │  [Player Name]      │        │
│     │  [Start Game]       │        │
│     │  [Leaderboard]      │        │
│     └─────────────────────┘        │
│                                     │
│            🔊 Sound                 │
└─────────────────────────────────────┘
```

### Tutorial Screen Layout
```
┌─────────────────────────────────────┐
│                                     │
│         How to Play                 │
│                                     │
│  🪙 Drag & Drop Coins               │
│     Click/touch and drag into bank  │
│                                     │
│  ⏱️  Beat the Clock                 │
│     Collect coins before time ends  │
│                                     │
│  ✨ Special Coins                   │
│     • Bonus: +50 points             │
│     • Multiplier: 2x for 5s         │
│     • Penalty: -20 points           │
│                                     │
│  ⚡ Level Up                        │
│     Complete 5 levels to win        │
│                                     │
│        [Let's Go!]                  │
└─────────────────────────────────────┘
```

### Game Screen Layout
```
┌─────────────────────────────────────┐
│ ⏱️ 25s  Level: 2    Score: 150  🔊│
│ ━━━━━━━━━━ 60% Progress            │
│                                     │
│    🪙     🪙        🪙             │
│        🪙      🪙                  │
│  🪙               🪙     🪙        │
│         🪙                         │
│                                     │
│             🐷                      │
│          [Piggy Bank]               │
│                                     │
└─────────────────────────────────────┘
```

### Level Up Screen
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│              ⭐                     │
│                                     │
│       Level 2 Complete!             │
│                                     │
│          Score: 250                 │
│                                     │
│   Ready for the next challenge?     │
│                                     │
│         [Next Level]                │
│                                     │
└─────────────────────────────────────┘
```

### Game Over Screen
```
┌─────────────────────────────────────┐
│                                     │
│              🏆                     │
│                                     │
│          Game Over!                 │
│                                     │
│      ┌─────────────────┐           │
│      │ Final Score: 450│           │
│      ├─────────────────┤           │
│      │ Level: 3        │           │
│      │ High Score: 500 │           │
│      └─────────────────┘           │
│                                     │
│      🎉 New High Score! 🎉         │
│                                     │
│      [Play Again]                   │
│      [Leaderboard]                  │
└─────────────────────────────────────┘
```

## 🎭 Animation Specifications

### Entry Animations
```typescript
Splash Screen:
  - Scale: 0.5 → 1
  - Rotate: -10deg → 0deg
  - Duration: 0.8s spring

Tutorial Cards:
  - Slide from left
  - Stagger delay: 0.1s per item
  - Duration: 0.3s ease-out

Game Elements:
  - Fade in: opacity 0 → 1
  - Duration: 0.5s
```

### Interactive Animations
```typescript
Coin Drag:
  - Scale: 1 → 1.2
  - Rotate: 0 → 10deg
  - Shadow: elevation increase
  - Cursor: grab → grabbing

Coin Spawn:
  - Scale: 0 → 1
  - Rotate: random
  - Type: spring (stiffness: 300, damping: 20)

Coin Collect:
  - Scale: 1 → 0
  - Opacity: 1 → 0
  - Duration: 0.1s

Piggy Bank Shake:
  - Rotate: [0, -5, 5, -5, 5, 0]
  - Duration: 0.3s
  - Trigger: on coin collection
```

### Feedback Animations
```typescript
Low Time Warning (≤5s):
  - Scale pulse: [1, 1.1, 1]
  - Duration: 0.5s
  - Repeat: infinite
  - Color: white → red-300

Level Complete:
  - Confetti explosion
  - Star rotation: 360deg continuous
  - Duration: 2s

Score Update:
  - Number count-up animation
  - Duration: 0.3s
  - Easing: ease-out
```

## 📱 Responsive Design Breakpoints

### Mobile (< 768px)
- Coin size: 64px (w-16 h-16)
- Piggy bank: 128px (w-32 h-32)
- Font sizes: text-xl → text-4xl
- Touch targets: minimum 44px
- Stack layout for header info

### Tablet (768px - 1024px)
- Coin size: 72px (w-18 h-18)
- Piggy bank: 144px (w-36 h-36)
- Two-column layouts
- Increased spacing

### Desktop (> 1024px)
- Coin size: 80px (w-20 h-20)
- Piggy bank: 160px (w-40 h-40)
- Multi-column layouts
- Enhanced hover effects
- Larger game area

## 🖼️ Component Hierarchy

```
CoinSaverGameClient
├── SplashScreen
│   ├── Logo & Title
│   ├── Stats Cards (High Score, Levels)
│   ├── Player Name Input
│   ├── Action Buttons (Start, Leaderboard)
│   └── Sound Toggle
│
├── Tutorial
│   ├── Header
│   ├── Instruction Cards
│   │   ├── Icon
│   │   ├── Title
│   │   └── Description
│   └── Start Button
│
├── GameScreen
│   ├── Header Bar
│   │   ├── Timer
│   │   ├── Level Display
│   │   ├── Score Display
│   │   ├── Multiplier Badge
│   │   └── Sound Toggle
│   ├── Progress Bar
│   ├── Game Area
│   │   ├── Coins (dynamic)
│   │   └── Piggy Bank
│   └── Drop Hint
│
├── LevelUpScreen
│   ├── Star Icon (rotating)
│   ├── Level Complete Message
│   ├── Score Display
│   ├── Motivational Text
│   └── Next Level Button
│
├── GameOverScreen
│   ├── Trophy Icon
│   ├── Final Stats
│   │   ├── Final Score
│   │   ├── Level Reached
│   │   └── High Score
│   ├── New High Score Badge (conditional)
│   └── Action Buttons (Play Again, Leaderboard)
│
└── Leaderboard Modal
    ├── Header with Close
    ├── Ranking List
    │   └── Entry Card (Top 10)
    │       ├── Rank Badge
    │       ├── Player Name
    │       ├── Stats (Level, Date)
    │       └── Score
    └── Empty State
```

## 🎯 Visual Hierarchy

### Information Priority
1. **Critical**: Timer (when low), Score, Coins
2. **Important**: Level, Progress, Piggy Bank
3. **Secondary**: Sound toggle, Multiplier badge
4. **Tertiary**: Background elements

### Size Scaling
```
Headings:        text-4xl to text-8xl
Subheadings:     text-2xl to text-3xl
Body:            text-lg to text-xl
Captions:        text-sm to text-base
Buttons:         text-xl with py-6
Icons:           w-6 h-6 to w-24 h-24
```

## 🌟 Interactive States

### Button States
```css
Default:   bg-gradient + shadow-lg
Hover:     brightness-110 + scale-105
Active:    scale-95 + brightness-90
Disabled:  opacity-50 + cursor-not-allowed
```

### Coin States
```css
Default:   scale-1 + shadow-lg
Hover:     scale-1.05 + brightness-110
Dragging:  scale-1.2 + rotate-10 + shadow-2xl
Collected: scale-0 + opacity-0
```

### Piggy Bank States
```css
Idle:      scale-1 + no rotation
Active:    scale-1.1 + glow effect
Shake:     rotate-[0,-5,5,-5,5,0]
```

## 🔤 Typography

### Font Stack
```css
System Font Stack (Geist):
font-family: 'Geist', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', sans-serif;
```

### Font Weights
- Regular: 400 (body text)
- Semibold: 600 (labels, buttons)
- Bold: 700 (headings, scores)
- Extra Bold: 800 (hero text)

### Text Styles
```css
Hero:        text-6xl md:text-8xl font-bold
Heading:     text-4xl md:text-5xl font-bold
Subheading:  text-2xl md:text-3xl font-bold
Body:        text-lg font-normal
Caption:     text-sm text-gray-500
Button:      text-xl font-bold
Score:       text-2xl md:text-4xl font-bold
```

## 🎨 Glassmorphism Style

```css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## 🌊 Motion Principles

### Easing Functions
- **Entry**: ease-out (elements entering view)
- **Exit**: ease-in (elements leaving view)
- **Interactive**: ease-in-out (user interactions)
- **Bounce**: spring (playful feedback)

### Duration Guidelines
- Micro-interactions: 100-200ms
- Transitions: 300-500ms
- Page changes: 500-800ms
- Loading states: 1000ms+

### Animation Triggers
- **On Mount**: Splash screen, tutorial cards
- **On Interaction**: Button clicks, coin drags
- **On State Change**: Score updates, timer warnings
- **Continuous**: Rotating star, floating coins

## 📊 Accessibility

### Color Contrast
- All text: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: clear focus states

### Touch Targets
- Minimum size: 44x44px
- Spacing: 8px between targets
- Clear visual feedback

### Motion
- Respect `prefers-reduced-motion`
- Provide pause/play controls
- No auto-playing animations

### Keyboard Navigation
- Tab order: logical flow
- Enter/Space: activate buttons
- Escape: close modals
- Arrow keys: future enhancement

## 🎪 Particle Effects

### Confetti Configuration
```typescript
confetti({
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1']
})
```

### Coin Trail (Future)
- Small particle follow on drag
- Fade out over 0.5s
- Match coin color

## 🎵 Sound Design Notes

### Sound Effects
- **Coin Collect**: 800Hz → 1000Hz, 0.1s duration
- **Level Up**: 523Hz → 659Hz → 784Hz ascending
- **Game Over**: 400Hz → 350Hz → 300Hz descending
- **Multiplier**: 1200Hz, square wave, 0.2s
- **Timer Warning**: Low frequency pulse

### Audio Principles
- Keep volume at 30% (0.3 gain)
- Short durations (< 0.5s)
- Pleasant frequencies (500-1500Hz)
- Respect user preference (mute toggle)

## 🖌️ Icon Usage

### Lucide Icons Used
- `Coins`: Logo, piggy bank, category
- `Trophy`: High score, leaderboard, game over
- `Timer`: Time remaining
- `Play`: Start game
- `RotateCcw`: Restart game
- `Volume2/VolumeX`: Sound toggle
- `Sparkles`: Bonus effects
- `Zap`: Power-ups
- `Star`: Level complete, bonus coins
- `X`: Close modals, penalty coins
- `Brain`: Category (Mental Math)
- `Gamepad2`: Games category icon

### Icon Sizes
- Small: w-4 h-4 (16px)
- Medium: w-6 h-6 (24px)
- Large: w-8 h-8 (32px)
- XL: w-12 h-12 (48px)
- Hero: w-24 h-24 (96px)

---

**Design Version**: 1.0.0  
**Last Updated**: February 2026  
**Design System**: Based on TailwindCSS + Framer Motion  
**Inspiration**: Modern casual games, Material Design, iOS design patterns
