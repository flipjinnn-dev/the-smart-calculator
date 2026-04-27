'use client'

import { useState, useRef } from 'react'
import { Settings, X, Plus, RotateCcw } from 'lucide-react'

const DEFAULT_COUNTRIES = [
  'USA', 'China', 'India', 'Brazil', 'Russia', 'Japan', 'Germany', 'UK', 'France', 'Italy',
  'Canada', 'S.Korea', 'Spain', 'Australia', 'Mexico', 'Indonesia', 'Netherlands', 'S.Arabia', 'Turkey', 'Switzerland',
  'Poland', 'Sweden', 'Belgium', 'Argentina', 'Ireland', 'Norway', 'Israel', 'UAE', 'Egypt', 'S.Africa',
  'Thailand', 'Singapore', 'Malaysia', 'Philippines', 'Vietnam', 'Pakistan', 'Bangladesh', 'Chile', 'Finland', 'Denmark',
  'Austria', 'N.Zealand', 'Portugal', 'Greece', 'Czech Rep', 'Romania', 'Hungary', 'Ukraine', 'Nigeria', 'Kenya',
  'Morocco', 'Ethiopia', 'Ghana', 'Tanzania', 'Uganda', 'Peru', 'Colombia', 'Venezuela', 'Ecuador', 'Bolivia',
  'Paraguay', 'Uruguay', 'Guatemala', 'Cuba', 'Costa Rica', 'Panama', 'Jamaica', 'Trinidad', 'Honduras', 'Nicaragua',
  'El Salvador', 'Dom.Rep', 'Haiti', 'Iceland', 'Luxembourg', 'Belarus', 'Moldova', 'Georgia', 'Armenia', 'Jordan',
  'Lebanon', 'Syria', 'Iraq', 'Iran', 'Afghanistan', 'Nepal', 'Sri Lanka', 'Myanmar', 'Cambodia', 'Mongolia',
  'Fiji', 'Zimbabwe', 'Botswana', 'Namibia', 'Angola', 'Mozambique', 'Zambia', 'Malawi', 'Mauritius', 'Madagascar',
  'Somalia', 'Chad', 'Niger', 'Mali', 'Senegal', 'Gambia', 'Guinea', 'Sierra L', 'Liberia', 'Togo',
  'Benin', 'Burundi', 'Rwanda', 'Congo', 'Gabon', 'Mauritania', 'Lesotho', 'Eswatini'
]

const COLORS = [
  '#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#6B2D5C',
  '#4A90A4', '#7B68EE', '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
  '#F8B739', '#52B788', '#FF8FAB', '#6C5CE7', '#FD79A8',
  '#A29BFE', '#74B9FF', '#55EFC4', '#FFEAA7', '#DFE6E9',
  '#FF7675', '#FDCB6E', '#E17055', '#00B894', '#00CEC9',
  '#0984E3', '#6C5CE7', '#A29BFE', '#74B9FF', '#55EFC4',
  '#FFEAA7', '#DFE6E9', '#FF7675', '#FDCB6E', '#E17055',
  '#00B894', '#00CEC9', '#0984E3', '#6C5CE7', '#A29BFE',
  '#74B9FF', '#55EFC4', '#FFEAA7', '#DFE6E9', '#FF7675',
  '#FDCB6E', '#E17055', '#00B894', '#00CEC9', '#0984E3',
  '#6C5CE7', '#A29BFE', '#74B9FF', '#55EFC4', '#FFEAA7',
  '#DFE6E9', '#FF7675', '#FDCB6E', '#E17055', '#00B894'
]

export default function CountryWheel() {
  const [countries, setCountries] = useState<string[]>(DEFAULT_COUNTRIES)
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)
  const [showCustomize, setShowCustomize] = useState(false)
  const [newCountry, setNewCountry] = useState('')
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
      const sliceAngle = 360 / countries.length
      const targetAngle = (270 - normalizedRotation + 360) % 360
      const angleFromStart = (targetAngle - 270 + 360) % 360
      const winningIndex = Math.floor(angleFromStart / sliceAngle)
      const winner = countries[winningIndex]
      
      setResult(winner)
      setIsSpinning(false)
    }, 4000)
  }

  const addCountry = () => {
    if (newCountry.trim() && !countries.includes(newCountry.trim())) {
      setCountries([...countries, newCountry.trim()])
      setNewCountry('')
    }
  }

  const removeCountry = (name: string) => {
    if (countries.length > 3) {
      setCountries(countries.filter(c => c !== name))
    }
  }

  const resetToDefault = () => {
    setCountries(DEFAULT_COUNTRIES)
    setResult(null)
    setRotation(0)
  }

  const reset = () => {
    setResult(null)
    setRotation(0)
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl shadow-2xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Country Wheel
        </h2>

        {/* Horizontal Layout: Wheel + Result Panel */}
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
          
          {/* Wheel Container - Left Side */}
          <div className="relative flex-shrink-0" style={{ width: "min(450px, 85vw)", height: "min(450px, 85vw)" }}>
            {/* Pointer - Modern Red Triangle Arrow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20" style={{ marginTop: "-12px" }}>
              <div 
                className="drop-shadow-lg"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderTop: "40px solid #DC2626",
                  filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.4))"
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
                <filter id="countryShadow">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.5"/>
                </filter>
              </defs>
              {countries.map((country, index) => {
                const sliceAngle = 360 / countries.length
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
                
                // Position text further outward for better readability
                const textRadius = 210
                const textX = 250 + textRadius * Math.cos((midAngle * Math.PI) / 180)
                const textY = 250 + textRadius * Math.sin((midAngle * Math.PI) / 180)
                
                // Determine if segment is too small for text
                const segmentAngleThreshold = 3 // degrees
                const shouldShowText = sliceAngle >= segmentAngleThreshold
                
                let fontSize = 14 // Minimum 14px as requested
                if (countries.length > 100) fontSize = 14
                else if (countries.length > 80) fontSize = 14
                else if (countries.length > 60) fontSize = 15
                else if (countries.length > 40) fontSize = 16
                else if (countries.length > 30) fontSize = 18
                else if (countries.length > 20) fontSize = 20
                else if (countries.length > 15) fontSize = 22
                
                // Adjust for country name length
                if (country.length > 12) fontSize = Math.min(fontSize, 12)
                else if (country.length > 10) fontSize = Math.min(fontSize, 13)
                else if (country.length > 8) fontSize = Math.min(fontSize, 14)
                
                return (
                  <g key={index}>
                    <path d={pathData} fill={color} stroke="#ffffff" strokeWidth="2" />
                    
                    {shouldShowText && (
                      <text
                        x={textX}
                        y={textY}
                        fill="#ffffff"
                        fontSize={fontSize}
                        fontWeight="600"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        transform={`rotate(${midAngle} ${textX} ${textY})`}
                        filter="url(#countryShadow)"
                        style={{ 
                          fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                          letterSpacing: "0.3px",
                          textShadow: "2px 2px 4px rgba(0,0,0,0.9)",
                          userSelect: "none"
                        }}
                      >
                        {country}
                      </text>
                    )}
                  </g>
                )
              })}
              
              <circle cx="250" cy="250" r="80" fill="white" stroke="#e0e0e0" strokeWidth="2" />
              <circle cx="250" cy="250" r="25" fill="#333" />
            </svg>
          </div>
          </div>

          {/* Result Panel - Right Side */}
          <div className="flex flex-col gap-6 min-w-0 flex-1 max-w-md">
            
            {/* Result Display */}
            <div className={`bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 transition-all duration-300 ${result ? 'border-green-400 bg-gradient-to-br from-green-50 to-blue-50' : ''}`}>
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-600 mb-3">
                  {result ? '🌍 Your Country:' : '🎯 Ready to Spin!'}
                </p>
                <p className={`text-3xl md:text-4xl font-bold transition-all duration-300 ${result ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600' : 'text-gray-400'}`}>
                  {result || 'Spin the wheel!'}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={spinWheel}
                disabled={isSpinning}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {isSpinning ? '▶ SPINNING...' : '▶ SPIN WHEEL'}
              </button>
              
              <button
                onClick={() => setShowCustomize(!showCustomize)}
                disabled={isSpinning}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center gap-2"
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
          </div>
        </div>

        {/* Customize Panel */}
        {showCustomize && (
          <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border-2 border-green-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Customize Countries</h3>
              <button
                onClick={() => setShowCustomize(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Add Country */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Add New Country
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addCountry()}
                  placeholder="Enter country name..."
                  className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
                />
                <button
                  onClick={addCountry}
                  className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add
                </button>
              </div>
            </div>

            {/* Country List */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Current Countries ({countries.length})
                </label>
                <button
                  onClick={resetToDefault}
                  className="text-sm text-green-600 hover:text-green-700 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset to Default
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {countries.map((country, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-200"
                    >
                      <span className="text-sm font-medium text-gray-700">{country}</span>
                      <button
                        onClick={() => removeCountry(country)}
                        disabled={countries.length <= 3}
                        className="text-red-600 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={countries.length <= 3 ? "Minimum 3 countries required" : "Remove"}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Minimum 3 countries required to spin the wheel
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
