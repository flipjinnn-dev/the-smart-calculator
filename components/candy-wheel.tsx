'use client'

import { useState, useRef } from 'react'
import { Settings, X, Plus, RotateCcw } from 'lucide-react'

const DEFAULT_CANDIES = [
  'Gummy Bears', 'Chocolate Bar', 'Lollipop', 'Sour Candy', 'Caramel Chews',
  'Candy Cane', 'Jelly Beans', 'Hard Candy', 'Toffee', 'Licorice',
  'Peppermint', 'Butterscotch', 'Rock Candy', 'Cotton Candy', 'Marshmallow',
  'Fudge', 'Taffy', 'Gumdrops', 'Jawbreaker', 'Candy Corn'
]

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FAB', '#6C5CE7', '#FD79A8', '#A29BFE', '#74B9FF',
  '#55EFC4', '#FFEAA7', '#DFE6E9', '#FF7675', '#FDCB6E'
]

export default function CandyWheel() {
  const [candies, setCandies] = useState<string[]>(DEFAULT_CANDIES)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showCustomize, setShowCustomize] = useState(false)
  const [newCandy, setNewCandy] = useState('')
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    const spins = 5 + Math.random() * 3
    const randomDegrees = Math.random() * 360
    const totalRotation = spins * 360 + randomDegrees
    
    const finalRotation = rotation + totalRotation
    setRotation(finalRotation)

    setTimeout(() => {
      const normalizedRotation = ((finalRotation % 360) + 360) % 360
      const sliceAngle = 360 / candies.length
      const targetAngle = (270 - normalizedRotation + 360) % 360
      const angleFromStart = (targetAngle - 270 + 360) % 360
      const winningIndex = Math.floor(angleFromStart / sliceAngle)
      const winner = candies[winningIndex]
      
      setResult(winner)
      setIsSpinning(false)
    }, 4000)
  }

  const addCandy = () => {
    if (newCandy.trim() && !candies.includes(newCandy.trim())) {
      setCandies([...candies, newCandy.trim()])
      setNewCandy('')
    }
  }

  const removeCandy = (name: string) => {
    if (candies.length > 3) {
      setCandies(candies.filter(c => c !== name))
    }
  }

  const resetToDefault = () => {
    setCandies(DEFAULT_CANDIES)
    setResult(null)
    setRotation(0)
  }

  const reset = () => {
    setResult(null)
    setRotation(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Candy Wheel
        </h2>

        {/* Wheel Container */}
        <div className="relative mx-auto mb-8" style={{ width: "min(500px, 90vw)", height: "min(500px, 90vw)" }}>
          {/* Pointer - Red Triangle Arrow */}
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

          {/* Wheel */}
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
                <filter id="candyShadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.5"/>
                </filter>
              </defs>
              {candies.map((candy, index) => {
                const sliceAngle = 360 / candies.length
                const startAngle = index * sliceAngle - 90
                const endAngle = (index + 1) * sliceAngle - 90
                const midAngle = startAngle + sliceAngle / 2
                
                const startRad = (startAngle * Math.PI) / 180
                const endRad = (endAngle * Math.PI) / 180
                
                const x1 = 250 + 250 * Math.cos(startRad)
                const y1 = 250 + 250 * Math.sin(startRad)
                const x2 = 250 + 250 * Math.cos(endRad)
                const y2 = 250 + 250 * Math.sin(endRad)
                
                const largeArcFlag = sliceAngle > 180 ? 1 : 0
                const pathData = `M 250 250 L ${x1} ${y1} A 250 250 0 ${largeArcFlag} 1 ${x2} ${y2} Z`
                
                const color = COLORS[index % COLORS.length]
                
                const textRadius = 160
                const textX = 250 + textRadius * Math.cos((midAngle * Math.PI) / 180)
                const textY = 250 + textRadius * Math.sin((midAngle * Math.PI) / 180)
                
                let fontSize = 24
                if (candies.length > 30) fontSize = 14
                else if (candies.length > 20) fontSize = 16
                else if (candies.length > 12) fontSize = 18
                else if (candies.length > 8) fontSize = 20
                
                if (candy.length > 18) fontSize = Math.min(fontSize, 11)
                else if (candy.length > 15) fontSize = Math.min(fontSize, 13)
                else if (candy.length > 12) fontSize = Math.min(fontSize, 15)
                
                return (
                  <g key={index}>
                    <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="3" />
                    
                    <text
                      x={textX}
                      y={textY}
                      fill="#ffffff"
                      fontSize={fontSize}
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle} ${textX} ${textY})`}
                      filter="url(#candyShadow)"
                      style={{ 
                        fontFamily: "Arial, sans-serif",
                        letterSpacing: "0.3px"
                      }}
                    >
                      {candy}
                    </text>
                  </g>
                )
              })}
              
              <circle cx="250" cy="250" r="40" fill="white" stroke="#333" strokeWidth="4" />
              <circle cx="250" cy="250" r="15" fill="#333" />
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="px-8 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold rounded-xl hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isSpinning ? '▶ SPINNING...' : '▶ SPIN WHEEL'}
          </button>
          
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            disabled={isSpinning}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Customize
          </button>
          
          <button
            onClick={reset}
            disabled={isSpinning}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            🔄 Reset
          </button>
        </div>

        {/* Customize Panel */}
        {showCustomize && (
          <div className="mb-6 p-6 bg-white rounded-xl shadow-lg border-2 border-blue-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Customize Candies</h3>
              <button
                onClick={() => setShowCustomize(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Add Candy */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add New Candy
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCandy}
                  onChange={(e) => setNewCandy(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCandy()}
                  placeholder="Enter candy name..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <button
                  onClick={addCandy}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>

            {/* Candy List */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Candies ({candies.length})
                </label>
                <button
                  onClick={resetToDefault}
                  className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {candies.map((candy, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200"
                    >
                      <span className="text-sm font-medium text-gray-700">{candy}</span>
                      <button
                        onClick={() => removeCandy(candy)}
                        disabled={candies.length <= 3}
                        className="text-red-600 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={candies.length <= 3 ? "Minimum 3 candies required" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Minimum 3 candies required to spin the wheel
              </p>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl border-2 border-pink-300 animate-bounce-in">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">🍬 You Got:</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                {result}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
