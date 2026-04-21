'use client'

import { useState, useRef } from 'react'

const CELEBRITIES = [
  'Zendaya', 'Millie Bobby Brown', 'Jennifer Lawrence', 'Timothee Chalamet',
  'Olivia Rodrigo', 'Tom Holland', 'Chris Evans', 'Robert Downey Jr.',
  'Kendall Jenner', 'Jenna Ortega', 'Florence Pugh', 'Noah Schnapp',
  'Gigi Hadid', 'Taylor Swift', 'Chris Pratt', 'Kim Kardashian',
  'Emma Watson', 'Daniel Radcliffe', 'Ariana Grande', 'Billie Eilish',
  'Justin Bieber', 'Harry Styles', 'Beyonce', 'Dwayne Johnson',
  'Zac Efron', 'Ryan Reynolds', 'Andrew Garfield'
]

const COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FAB', '#6C5CE7', '#FD79A8', '#A29BFE', '#74B9FF',
  '#55EFC4', '#FFEAA7', '#DFE6E9', '#FF7675', '#FDCB6E',
  '#6C5CE7', '#00B894', '#00CEC9', '#0984E3', '#B2BEC3',
  '#FD79A8', '#FDCB6E'
]

export default function CelebrityWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Calculate rotation - EXACT LOGIC FROM BLOX FRUITS WHEEL
    const spins = 5 + Math.random() * 3 // 5-8 full rotations
    const randomDegrees = Math.random() * 360
    const totalRotation = spins * 360 + randomDegrees
    
    const finalRotation = rotation + totalRotation
    setRotation(finalRotation)

    // Calculate winning celebrity after animation - EXACT LOGIC FROM WORKING GAME
    setTimeout(() => {
      // Normalize rotation to 0-360 range
      const normalizedRotation = ((finalRotation % 360) + 360) % 360
      
      const sliceAngle = 360 / CELEBRITIES.length
      
      // Arrow points at top. In our SVG, index 0 starts at -90° (top)
      // After rotating by normalizedRotation degrees clockwise,
      // the celebrity that is now at top was originally at position: -normalizedRotation
      // 
      // Since index 0 starts at -90° (or 270° in 0-360):
      // We need to find which celebrity is at: 270° - normalizedRotation
      // 
      // Each celebrity i covers angles from: (i * sliceAngle + 270) to ((i+1) * sliceAngle + 270)
      
      // The angle we're looking for (where arrow points after rotation):
      const targetAngle = (270 - normalizedRotation + 360) % 360
      
      // Which celebrity contains this angle?
      // Since celebrities are evenly distributed starting from 270°:
      const angleFromStart = (targetAngle - 270 + 360) % 360
      const winningIndex = Math.floor(angleFromStart / sliceAngle) % CELEBRITIES.length
      
      setResult(CELEBRITIES[winningIndex])
      setIsSpinning(false)
    }, 4000) // 4 second spin duration
  }

  const reset = () => {
    setResult(null)
    setRotation(0)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Celebrity Wheel
        </h2>

        {/* Wheel Container */}
        <div className="relative mx-auto mb-8" style={{ width: "min(500px, 90vw)", height: "min(500px, 90vw)" }}>
          {/* Pointer - Fixed Triangle Arrow - EXACT BLOX FRUITS STYLE */}
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
                <filter id="textShadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.5"/>
                </filter>
              </defs>
              {CELEBRITIES.map((celebrity, index) => {
                const sliceAngle = 360 / CELEBRITIES.length
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
                
                // Calculate text position - EXACT BLOX FRUITS STYLE
                const textRadius = 170
                const textX = 250 + textRadius * Math.cos((midAngle * Math.PI) / 180)
                const textY = 250 + textRadius * Math.sin((midAngle * Math.PI) / 180)
                
                // Dynamic font size based on name length - NO TRUNCATION
                let fontSize = 16
                if (celebrity.length > 18) fontSize = 11
                else if (celebrity.length > 15) fontSize = 12
                else if (celebrity.length > 12) fontSize = 14
                
                return (
                  <g key={index}>
                    <path
                      d={pathData}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth="3"
                    />
                    {/* Text - Rotated vertically like Blox Fruits - FULL NAME VISIBLE */}
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
                      {celebrity}
                    </text>
                  </g>
                )
              })}
              
              {/* Center Circle */}
              <circle cx="250" cy="250" r="40" fill="white" stroke="#333" strokeWidth="4" />
              <circle cx="250" cy="250" r="15" fill="#333" />
            </svg>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isSpinning ? '▶ SPINNING...' : '▶ SPIN WHEEL'}
          </button>
          
          <button
            onClick={reset}
            disabled={isSpinning}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            🔄 Reset
          </button>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-300 animate-bounce-in">
            <div className="text-center">
              <p className="text-lg text-gray-600 mb-2">✨ You Got:</p>
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
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
