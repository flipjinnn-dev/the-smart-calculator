"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Sparkles } from "lucide-react"

const FRUITS = [
  "Spike", "Chop", "Spring", "Bomb", "Smoke", "Falcon", "Flame", "Ice", "Sand", "Dark",
  "Diamond", "Rubber", "Barrier", "Light", "Magma", "Quake", "Buddha", "Rumble", "Blizzard",
  "Phoenix", "Shadow", "Venom", "Control", "Gravity", "Love", "Spider", "Dough", "Pain",
  "Portal", "Spirit", "Sound", "Dragon", "Mammoth", "Kitsune", "Leopard"
]

const SWORDS = [
  "Katana", "Cutlass", "Dual Katana", "Iron Mace", "Pipe", "Bisento", "Triple Katana",
  "Saber", "Pole", "Trident", "Soul Cane", "Wando", "Shisui", "Saddi", "Canvander",
  "Buddy Sword", "True Triple Katana", "Cursed Dual Katana", "Dark Blade", "Hallow Scythe",
  "Tushita", "Yama", "Rengoku", "Dragon Trident", "Shark Anchor"
]

const GUNS = [
  "Flintlock", "Musket", "Slingshot", "Cannon", "Kabucha", "Bizarre Rifle", "Acidum Rifle",
  "Soul Guitar"
]

const RACES = ["Human", "Mink", "Fishman", "Skypian", "Ghoul", "Cyborg"]

const FIGHTING_STYLES = [
  "Combat", "Black Leg", "Electro", "Fishman Karate", "Dragon Claw", "Superhuman",
  "Death Step", "Sharkman Karate", "Electric Claw", "Dragon Talon", "Godhuman", "Sanguine Art"
]

const CATEGORIES = {
  fruits: { name: "Fruits", items: FRUITS, color: "from-purple-500 to-pink-500" },
  swords: { name: "Swords", items: SWORDS, color: "from-blue-500 to-cyan-500" },
  guns: { name: "Guns", items: GUNS, color: "from-red-500 to-orange-500" },
  races: { name: "Races", items: RACES, color: "from-green-500 to-emerald-500" },
  fightingStyles: { name: "Fighting Styles", items: FIGHTING_STYLES, color: "from-yellow-500 to-amber-500" }
}

export default function BloxFruitsWheel() {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof CATEGORIES>("fruits")
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const currentCategory = CATEGORIES[selectedCategory]
  const items = currentCategory.items

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Calculate rotation - USING WORKING WHEEL GAME LOGIC
    const spins = 5 + Math.random() * 3 // 5-8 full rotations
    const randomDegrees = Math.random() * 360
    const totalRotation = spins * 360 + randomDegrees
    
    const finalRotation = rotation + totalRotation
    setRotation(finalRotation)

    // Calculate winning slice after animation
    setTimeout(() => {
      // SIMPLE DIRECT CALCULATION
      // After rotation, which segment is at the top (where arrow points)?
      
      const sliceAngle = 360 / items.length
      
      // Normalize the final rotation
      const normalizedRotation = ((finalRotation % 360) + 360) % 360
      
      // Arrow points at top. In our SVG, index 0 starts at -90° (top)
      // After rotating by normalizedRotation degrees clockwise,
      // the segment that is now at top was originally at position: -normalizedRotation
      // 
      // Since index 0 starts at -90° (or 270° in 0-360):
      // We need to find which segment is at: 270° - normalizedRotation
      // 
      // Each segment i covers angles from: (i * sliceAngle - 90) to ((i+1) * sliceAngle - 90)
      // Or in 0-360: (i * sliceAngle + 270) to ((i+1) * sliceAngle + 270)
      
      // The angle we're looking for (where arrow points after rotation):
      const targetAngle = (270 - normalizedRotation + 360) % 360
      
      // Which segment contains this angle?
      // Segment i starts at: (i * sliceAngle + 270) % 360
      // We need: targetAngle to be within segment i's range
      
      // Simple formula: which segment index does targetAngle fall into?
      // Since segments are evenly distributed starting from 270°:
      const angleFromStart = (targetAngle - 270 + 360) % 360
      const winningIndex = Math.floor(angleFromStart / sliceAngle) % items.length
      
      setResult(items[winningIndex])
      setIsSpinning(false)
    }, 4000) // 4 second spin duration
  }

  const reset = () => {
    setResult(null)
    setRotation(0)
  }

  const changeCategory = (category: keyof typeof CATEGORIES) => {
    if (!isSpinning) {
      setSelectedCategory(category)
      setResult(null)
      setRotation(0)
    }
  }

  return (
    <div className="space-y-8">
      {/* Category Selector */}
      <div className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button
              key={key}
              onClick={() => changeCategory(key as keyof typeof CATEGORIES)}
              disabled={isSpinning}
              className={`p-4 rounded-lg font-semibold transition-all ${
                selectedCategory === key
                  ? `bg-gradient-to-r ${cat.color} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              } ${isSpinning ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Wheel Container */}
      <div className={`bg-gradient-to-br ${currentCategory.color} p-8 rounded-2xl shadow-2xl`}>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white text-center mb-6">
            {currentCategory.name} Wheel
          </h3>

          {/* Wheel */}
          <div className="relative mx-auto" style={{ width: "min(500px, 90vw)", height: "min(500px, 90vw)" }}>
            {/* Pointer - Fixed Triangle Arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ marginTop: "-15px" }}>
              <div 
                className="drop-shadow-2xl"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "25px solid transparent",
                  borderRight: "25px solid transparent",
                  borderTop: "50px solid #DC2626",
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                }}
              ></div>
            </div>

            {/* Wheel Canvas - Competitor Style */}
            <div 
              ref={wheelRef}
              className="relative w-full h-full rounded-full shadow-2xl"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none"
              }}
            >
              <svg viewBox="0 0 500 500" className="w-full h-full" style={{ background: "white", borderRadius: "50%" }}>
                <defs>
                  <filter id="textShadow">
                    <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.5"/>
                  </filter>
                </defs>
                {items.map((item, index) => {
                  const sliceAngle = 360 / items.length
                  const startAngle = index * sliceAngle - 90
                  const endAngle = (index + 1) * sliceAngle - 90
                  const midAngle = startAngle + sliceAngle / 2
                  
                  const startRad = (startAngle * Math.PI) / 180
                  const endRad = (endAngle * Math.PI) / 180
                  
                  const x1 = 250 + 250 * Math.cos(startRad)
                  const y1 = 250 + 250 * Math.sin(startRad)
                  const x2 = 250 + 250 * Math.cos(endRad)
                  const y2 = 250 + 250 * Math.sin(endRad)
                  
                  const largeArc = sliceAngle > 180 ? 1 : 0
                  const pathData = `M 250 250 L ${x1} ${y1} A 250 250 0 ${largeArc} 1 ${x2} ${y2} Z`
                  
                  // Vibrant alternating colors
                  const colors = [
                    "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
                    "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B739", "#52B788",
                    "#E74C3C", "#3498DB", "#9B59B6", "#1ABC9C", "#F39C12"
                  ]
                  const color = colors[index % colors.length]
                  
                  // Calculate text position
                  const textRadius = 170
                  const textX = 250 + textRadius * Math.cos((midAngle * Math.PI) / 180)
                  const textY = 250 + textRadius * Math.sin((midAngle * Math.PI) / 180)
                  
                  // Dynamic font size based on BOTH item count AND name length - NO TRUNCATION
                  let fontSize = 24
                  if (items.length > 30) fontSize = 14
                  else if (items.length > 20) fontSize = 16
                  else if (items.length > 12) fontSize = 18
                  else if (items.length > 8) fontSize = 20
                  
                  // Further reduce font size for long names
                  if (item.length > 18) fontSize = Math.min(fontSize, 11)
                  else if (item.length > 15) fontSize = Math.min(fontSize, 13)
                  else if (item.length > 12) fontSize = Math.min(fontSize, 15)
                  
                  return (
                    <g key={index}>
                      {/* Slice */}
                      <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="3" />
                      
                      {/* Text - Vertical from top to bottom - FULL NAME VISIBLE */}
                      <text
                        x={textX}
                        y={textY}
                        fill="#ffffff"
                        fontSize={fontSize}
                        fontWeight="bold"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle} ${textX} ${textY})`}
                        filter="url(#textShadow)"
                        style={{ 
                          fontFamily: "Arial, sans-serif",
                          letterSpacing: "0.3px"
                        }}
                      >
                        {item}
                      </text>
                    </g>
                  )
                })}
                
                {/* Center circle */}
                <circle cx="250" cy="250" r="40" fill="#ffffff" stroke="#333333" strokeWidth="4" />
                <circle cx="250" cy="250" r="25" fill="#333333" />
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center mt-8">
            <Button
              onClick={spinWheel}
              disabled={isSpinning}
              className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-6 px-8 text-lg shadow-lg disabled:opacity-50"
            >
              <Play className="w-5 h-5 mr-2" />
              {isSpinning ? "Spinning..." : "SPIN WHEEL"}
            </Button>
            <Button
              onClick={reset}
              disabled={isSpinning}
              variant="outline"
              className="bg-white/20 text-white border-2 border-white hover:bg-white/30 font-bold py-6 px-8 text-lg disabled:opacity-50"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`bg-gradient-to-r ${currentCategory.color} p-8 rounded-2xl shadow-2xl animate-bounce-in`}>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <Sparkles className="w-16 h-16 text-yellow-300 mx-auto mb-4 animate-pulse" />
            <h3 className="text-3xl font-bold text-white mb-2">You Got:</h3>
            <p className="text-5xl font-black text-white drop-shadow-lg">{result}</p>
            <p className="text-xl text-white/80 mt-4">
              {currentCategory.name === "Fruits" && "Time to master this fruit!"}
              {currentCategory.name === "Swords" && "Wield this sword with pride!"}
              {currentCategory.name === "Guns" && "Lock and load!"}
              {currentCategory.name === "Races" && "Embrace your new race!"}
              {currentCategory.name === "Fighting Styles" && "Master this fighting style!"}
            </p>
          </div>
        </div>
      )}

      {/* Item Count */}
      <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200 text-center">
        <p className="text-sm text-gray-700">
          <strong>{items.length} {currentCategory.name}</strong> in this wheel • Equal chances for all
        </p>
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
