"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Plus, Trash2, Music } from "lucide-react"

interface Track {
  id: string
  minutes: string
  seconds: string
}

export default function SongLengthCalculator() {
  const [calculatorType, setCalculatorType] = useState<string>("playlist")
  
  // Playlist Calculator
  const [tracks, setTracks] = useState<Track[]>([
    { id: "1", minutes: "", seconds: "" }
  ])
  
  // BPM Calculator
  const [bpm, setBpm] = useState<string>("120")
  const [totalBeats, setTotalBeats] = useState<string>("480")
  
  // Average Calculator
  const [avgTracks, setAvgTracks] = useState<Track[]>([
    { id: "1", minutes: "", seconds: "" }
  ])
  
  const [result, setResult] = useState<{
    totalMinutes?: number
    totalSeconds?: number
    formattedTime?: string
    averageTime?: string
    trackCount?: number
  } | null>(null)

  const addTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      minutes: "",
      seconds: ""
    }
    setTracks([...tracks, newTrack])
  }

  const removeTrack = (id: string) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(track => track.id !== id))
    }
  }

  const updateTrack = (id: string, field: 'minutes' | 'seconds', value: string) => {
    setTracks(tracks.map(track => 
      track.id === id ? { ...track, [field]: value } : track
    ))
  }

  const addAvgTrack = () => {
    const newTrack: Track = {
      id: Date.now().toString(),
      minutes: "",
      seconds: ""
    }
    setAvgTracks([...avgTracks, newTrack])
  }

  const removeAvgTrack = (id: string) => {
    if (avgTracks.length > 1) {
      setAvgTracks(avgTracks.filter(track => track.id !== id))
    }
  }

  const updateAvgTrack = (id: string, field: 'minutes' | 'seconds', value: string) => {
    setAvgTracks(avgTracks.map(track => 
      track.id === id ? { ...track, [field]: value } : track
    ))
  }

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const calculatePlaylist = () => {
    let totalSeconds = 0
    
    tracks.forEach(track => {
      const mins = parseInt(track.minutes) || 0
      const secs = parseInt(track.seconds) || 0
      totalSeconds += (mins * 60) + secs
    })

    const totalMinutes = Math.floor(totalSeconds / 60)
    const remainingSeconds = totalSeconds % 60

    setResult({
      totalMinutes,
      totalSeconds: remainingSeconds,
      formattedTime: formatTime(totalSeconds),
      trackCount: tracks.length
    })
  }

  const calculateBPM = () => {
    const bpmValue = parseFloat(bpm) || 120
    const beats = parseFloat(totalBeats) || 0

    // Song Length = Total Beats ÷ BPM (in minutes)
    const lengthInMinutes = beats / bpmValue
    const totalSeconds = Math.round(lengthInMinutes * 60)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    setResult({
      totalMinutes: minutes,
      totalSeconds: seconds,
      formattedTime: formatTime(totalSeconds)
    })
  }

  const calculateAverage = () => {
    let totalSeconds = 0
    
    avgTracks.forEach(track => {
      const mins = parseInt(track.minutes) || 0
      const secs = parseInt(track.seconds) || 0
      totalSeconds += (mins * 60) + secs
    })

    const averageSeconds = Math.round(totalSeconds / avgTracks.length)
    const avgMinutes = Math.floor(averageSeconds / 60)
    const avgSecs = averageSeconds % 60

    setResult({
      totalMinutes: avgMinutes,
      totalSeconds: avgSecs,
      formattedTime: formatTime(totalSeconds),
      averageTime: `${avgMinutes}:${avgSecs.toString().padStart(2, '0')}`,
      trackCount: avgTracks.length
    })
  }

  const handleCalculate = () => {
    if (calculatorType === "playlist") {
      calculatePlaylist()
    } else if (calculatorType === "bpm") {
      calculateBPM()
    } else if (calculatorType === "average") {
      calculateAverage()
    }
  }

  return (
    <div className="space-y-6">
      {/* Calculator Type Selector */}
      <div className="space-y-3">
        <Label htmlFor="calculatorType" className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Music className="w-5 h-5 text-purple-600" />
          Select Calculator Type
        </Label>
        <Select value={calculatorType} onValueChange={(value) => { setCalculatorType(value); setResult(null); }}>
          <SelectTrigger id="calculatorType" className="text-lg h-14 border-2 border-gray-300 hover:border-purple-500 transition-colors">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="playlist" className="text-base py-3">🎵 Playlist Duration Calculator</SelectItem>
            <SelectItem value="bpm" className="text-base py-3">⚡ BPM to Song Length</SelectItem>
            <SelectItem value="average" className="text-base py-3">📊 Average Song Length</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Playlist Calculator */}
      {calculatorType === "playlist" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
            <Label className="text-lg font-bold text-gray-900">🎵 Add Song Durations</Label>
            <Button 
              onClick={addTrack} 
              variant="outline" 
              size="sm"
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Track
            </Button>
          </div>
          
          <div className="space-y-3">
            {tracks.map((track, index) => (
              <div key={track.id} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-purple-300 transition-colors shadow-sm">
                <span className="text-base font-bold text-purple-600 w-20 bg-purple-50 px-3 py-2 rounded-md">#{index + 1}</span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={track.minutes}
                      onChange={(e) => updateTrack(track.id, 'minutes', e.target.value)}
                      placeholder="Minutes"
                      className="text-lg h-12 border-2 border-gray-300 focus:border-purple-500"
                      min="0"
                    />
                  </div>
                  <span className="text-2xl font-bold text-gray-400">:</span>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={track.seconds}
                      onChange={(e) => updateTrack(track.id, 'seconds', e.target.value)}
                      placeholder="Seconds"
                      className="text-lg h-12 border-2 border-gray-300 focus:border-purple-500"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>
                {tracks.length > 1 && (
                  <Button 
                    onClick={() => removeTrack(track.id)} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-200 hover:border-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BPM Calculator */}
      {calculatorType === "bpm" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="bpm" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                ⚡ BPM (Beats Per Minute)
              </Label>
              <Input
                id="bpm"
                type="number"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                placeholder="120"
                className="text-xl h-14 border-2 border-gray-300 focus:border-purple-500"
                min="1"
              />
              <p className="text-sm text-gray-600 font-medium">💡 Typical range: 60-180 BPM</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="totalBeats" className="text-lg font-bold text-gray-900 flex items-center gap-2">
                🎵 Total Beats
              </Label>
              <Input
                id="totalBeats"
                type="number"
                value={totalBeats}
                onChange={(e) => setTotalBeats(e.target.value)}
                placeholder="480"
                className="text-xl h-14 border-2 border-gray-300 focus:border-purple-500"
                min="1"
              />
              <p className="text-sm text-gray-600 font-medium">💡 Total number of beats in the song</p>
            </div>
          </div>

          <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-300 rounded-xl shadow-sm">
            <p className="text-base text-gray-800 font-semibold">
              📐 <strong>Formula:</strong> Song Length (minutes) = Total Beats ÷ BPM
            </p>
          </div>
        </div>
      )}

      {/* Average Calculator */}
      {calculatorType === "average" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border-2 border-green-200">
            <Label className="text-lg font-bold text-gray-900">📊 Add Song Durations</Label>
            <Button 
              onClick={addAvgTrack} 
              variant="outline" 
              size="sm"
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Track
            </Button>
          </div>
          
          <div className="space-y-3">
            {avgTracks.map((track, index) => (
              <div key={track.id} className="flex items-center gap-3 p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors shadow-sm">
                <span className="text-base font-bold text-green-600 w-20 bg-green-50 px-3 py-2 rounded-md">#{index + 1}</span>
                <div className="flex items-center gap-2 flex-1">
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={track.minutes}
                      onChange={(e) => updateAvgTrack(track.id, 'minutes', e.target.value)}
                      placeholder="Minutes"
                      className="text-lg h-12 border-2 border-gray-300 focus:border-green-500"
                      min="0"
                    />
                  </div>
                  <span className="text-2xl font-bold text-gray-400">:</span>
                  <div className="flex-1">
                    <Input
                      type="number"
                      value={track.seconds}
                      onChange={(e) => updateAvgTrack(track.id, 'seconds', e.target.value)}
                      placeholder="Seconds"
                      className="text-lg h-12 border-2 border-gray-300 focus:border-green-500"
                      min="0"
                      max="59"
                    />
                  </div>
                </div>
                {avgTracks.length > 1 && (
                  <Button 
                    onClick={() => removeAvgTrack(track.id)} 
                    variant="ghost" 
                    size="sm"
                    className="text-red-600 hover:text-white hover:bg-red-600 border-2 border-red-200 hover:border-red-600 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <Button 
        onClick={handleCalculate} 
        size="lg" 
        className="w-full text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
      >
        <Calculator className="w-5 h-5 mr-2" />
        Calculate Song Length
      </Button>

      {/* Results */}
      {result && (
        <div className="mt-8 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Music className="w-7 h-7 text-purple-600" />
            Your Results
          </h3>
          
          {calculatorType === "playlist" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-purple-200">
                <span className="text-lg text-gray-700">Total Tracks:</span>
                <span className="text-2xl font-bold text-gray-900">{result.trackCount} songs</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Total Duration:</span>
                <span className="text-4xl font-bold text-purple-600">{result.formattedTime}</span>
              </div>
              <p className="mt-4 text-sm text-gray-600 text-center">
                ({result.totalMinutes} minutes and {result.totalSeconds} seconds)
              </p>
            </div>
          )}

          {calculatorType === "bpm" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-purple-200">
                <span className="text-lg text-gray-700">BPM:</span>
                <span className="text-2xl font-bold text-gray-900">{bpm}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b-2 border-purple-200">
                <span className="text-lg text-gray-700">Total Beats:</span>
                <span className="text-2xl font-bold text-gray-900">{totalBeats}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Song Length:</span>
                <span className="text-4xl font-bold text-purple-600">{result.formattedTime}</span>
              </div>
            </div>
          )}

          {calculatorType === "average" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b-2 border-purple-200">
                <span className="text-lg text-gray-700">Total Tracks:</span>
                <span className="text-2xl font-bold text-gray-900">{result.trackCount} songs</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b-2 border-purple-200">
                <span className="text-lg text-gray-700">Total Duration:</span>
                <span className="text-2xl font-bold text-gray-900">{result.formattedTime}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-xl font-bold text-gray-900">Average Song Length:</span>
                <span className="text-4xl font-bold text-purple-600">{result.averageTime}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
