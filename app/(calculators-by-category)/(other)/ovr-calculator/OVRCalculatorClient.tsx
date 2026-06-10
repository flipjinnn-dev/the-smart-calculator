"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, Trophy, Users, Info, ChevronDown, ChevronUp, Sparkles, BarChart3, User, Trash2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SimilarCalculators from "@/components/similar-calculators"
import CalculatorGuide, { type CalculatorGuideData } from "@/components/calculator-guide"
import { RatingProfileSection } from "@/components/rating-profile-section"

type PlayerPosition = "ST" | "CF" | "LW" | "RW" | "CAM" | "CM" | "CDM" | "LB" | "RB" | "CB" | "GK"

interface PlayerStats {
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
}

interface PositionWeights {
  pace: number
  shooting: number
  passing: number
  dribbling: number
  defending: number
  physical: number
}

const POSITION_WEIGHTS: Record<PlayerPosition, PositionWeights> = {
  ST: { pace: 0.25, shooting: 0.30, passing: 0.10, dribbling: 0.20, defending: 0.05, physical: 0.10 },
  CF: { pace: 0.25, shooting: 0.28, passing: 0.12, dribbling: 0.20, defending: 0.05, physical: 0.10 },
  LW: { pace: 0.28, shooting: 0.22, passing: 0.12, dribbling: 0.25, defending: 0.05, physical: 0.08 },
  RW: { pace: 0.28, shooting: 0.22, passing: 0.12, dribbling: 0.25, defending: 0.05, physical: 0.08 },
  CAM: { pace: 0.15, shooting: 0.20, passing: 0.25, dribbling: 0.25, defending: 0.05, physical: 0.10 },
  CM: { pace: 0.15, shooting: 0.15, passing: 0.25, dribbling: 0.20, defending: 0.15, physical: 0.10 },
  CDM: { pace: 0.12, shooting: 0.08, passing: 0.20, dribbling: 0.15, defending: 0.30, physical: 0.15 },
  LB: { pace: 0.20, shooting: 0.05, passing: 0.15, dribbling: 0.15, defending: 0.30, physical: 0.15 },
  RB: { pace: 0.20, shooting: 0.05, passing: 0.15, dribbling: 0.15, defending: 0.30, physical: 0.15 },
  CB: { pace: 0.15, shooting: 0.05, passing: 0.10, dribbling: 0.10, defending: 0.35, physical: 0.25 },
  GK: { pace: 0.05, shooting: 0.05, passing: 0.10, dribbling: 0.10, defending: 0.45, physical: 0.25 },
}

interface TeamPlayer {
  id: number
  ovr: number
  name: string
}

interface OVRCalculatorClientProps {
  content?: any
  guideContent?: CalculatorGuideData
}

export default function OVRCalculatorClient({
  content,
  guideContent,
}: OVRCalculatorClientProps) {
  const guideData = guideContent || { color: "blue", sections: [], faq: [] }
  const contentData = content || {}
  const [position, setPosition] = useState<PlayerPosition>("ST")
  const [stats, setStats] = useState<PlayerStats>({
    pace: 85,
    shooting: 88,
    passing: 75,
    dribbling: 82,
    defending: 35,
    physical: 78,
  })
  const [rankBoost, setRankBoost] = useState<number>(0)
  const [skillBoost, setSkillBoost] = useState<number>(0)
  const [ovr, setOvr] = useState<number | null>(null)
  const [showFormula, setShowFormula] = useState(false)
  const [teamPlayers, setTeamPlayers] = useState<TeamPlayer[]>([
    { id: 1, ovr: 0, name: "Player 1" },
    { id: 2, ovr: 0, name: "Player 2" },
    { id: 3, ovr: 0, name: "Player 3" },
    { id: 4, ovr: 0, name: "Player 4" },
    { id: 5, ovr: 0, name: "Player 5" },
    { id: 6, ovr: 0, name: "Player 6" },
    { id: 7, ovr: 0, name: "Player 7" },
    { id: 8, ovr: 0, name: "Player 8" },
    { id: 9, ovr: 0, name: "Player 9" },
    { id: 10, ovr: 0, name: "Player 10" },
    { id: 11, ovr: 0, name: "Player 11" },
  ])
  const [teamOvr, setTeamOvr] = useState<number | null>(null)

  const calculateOVR = () => {
    const weights = POSITION_WEIGHTS[position]
    const baseOVR =
      stats.pace * weights.pace +
      stats.shooting * weights.shooting +
      stats.passing * weights.passing +
      stats.dribbling * weights.dribbling +
      stats.defending * weights.defending +
      stats.physical * weights.physical

    const finalOVR = Math.round(baseOVR + rankBoost + skillBoost)
    setOvr(finalOVR)
  }

  const handleStatChange = (stat: keyof PlayerStats, value: string) => {
    const numValue = Math.min(99, Math.max(0, parseInt(value) || 0))
    setStats({ ...stats, [stat]: numValue })
  }

  const resetCalculator = () => {
    setStats({
      pace: 85,
      shooting: 88,
      passing: 75,
      dribbling: 82,
      defending: 35,
      physical: 78,
    })
    setPosition("ST")
    setRankBoost(0)
    setSkillBoost(0)
    setOvr(null)
  }

  const handleTeamPlayerChange = (id: number, value: string) => {
    const numValue = Math.min(120, Math.max(0, parseInt(value) || 0))
    setTeamPlayers(teamPlayers.map(player => 
      player.id === id ? { ...player, ovr: numValue } : player
    ))
  }

  const addTeamPlayer = () => {
    const newId = Math.max(...teamPlayers.map(p => p.id)) + 1
    setTeamPlayers([...teamPlayers, { id: newId, ovr: 0, name: `Player ${newId}` }])
  }

  const removeTeamPlayer = (id: number) => {
    if (teamPlayers.length > 1) {
      setTeamPlayers(teamPlayers.filter(player => player.id !== id))
    }
  }

  const calculateTeamOVR = () => {
    const validPlayers = teamPlayers.filter(p => p.ovr > 0)
    if (validPlayers.length === 0) {
      setTeamOvr(0)
      return
    }
    
    const totalOVR = validPlayers.reduce((sum, player) => sum + player.ovr, 0)
    const averageOVR = totalOVR / validPlayers.length
    setTeamOvr(Math.round(averageOVR))
  }

  const resetTeamCalculator = () => {
    setTeamPlayers([
      { id: 1, ovr: 0, name: "Player 1" },
      { id: 2, ovr: 0, name: "Player 2" },
      { id: 3, ovr: 0, name: "Player 3" },
      { id: 4, ovr: 0, name: "Player 4" },
      { id: 5, ovr: 0, name: "Player 5" },
      { id: 6, ovr: 0, name: "Player 6" },
      { id: 7, ovr: 0, name: "Player 7" },
      { id: 8, ovr: 0, name: "Player 8" },
      { id: 9, ovr: 0, name: "Player 9" },
      { id: 10, ovr: 0, name: "Player 10" },
      { id: 11, ovr: 0, name: "Player 11" },
    ])
    setTeamOvr(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
      <header className="text-center mb-10">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
            <Trophy className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
          {contentData.pageTitle || "OVR Calculator"}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {contentData.pageDescriptionBefore ?? ""}
          {contentData.pageDescriptionBold ? (
            <strong className="font-semibold text-gray-900">{contentData.pageDescriptionBold}</strong>
          ) : null}
          {contentData.pageDescriptionAfter ?? contentData.pageDescription ?? "Calculate Overall Rating (OVR) for FC and FIFA players using position-based weighted stats."}
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8 items-start mb-12">
        <Card className="shadow-2xl border-2 pt-0 border-blue-100 hover:shadow-blue-100 transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg border-b px-8 py-6">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-6 w-6" />
              Calculate Player OVR
            </CardTitle>
            <CardDescription className="text-gray-600">
              Choose between Single Player or Team OVR calculation
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="single" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Single Player
                </TabsTrigger>
                <TabsTrigger value="team" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Team OVR
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="space-y-6">
                <div>
                  <Label htmlFor="position" className="text-base font-semibold mb-2 block">
                    Player Position
                  </Label>
                  <Select value={position} onValueChange={(value) => setPosition(value as PlayerPosition)}>
                    <SelectTrigger id="position" className="w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ST">Striker (ST)</SelectItem>
                      <SelectItem value="CF">Center Forward (CF)</SelectItem>
                      <SelectItem value="LW">Left Winger (LW)</SelectItem>
                      <SelectItem value="RW">Right Winger (RW)</SelectItem>
                      <SelectItem value="CAM">Attacking Midfielder (CAM)</SelectItem>
                      <SelectItem value="CM">Central Midfielder (CM)</SelectItem>
                      <SelectItem value="CDM">Defensive Midfielder (CDM)</SelectItem>
                      <SelectItem value="LB">Left Back (LB)</SelectItem>
                      <SelectItem value="RB">Right Back (RB)</SelectItem>
                      <SelectItem value="CB">Center Back (CB)</SelectItem>
                      <SelectItem value="GK">Goalkeeper (GK)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(stats).map(([stat, value]) => (
                    <div key={stat}>
                      <Label htmlFor={stat} className="capitalize font-semibold">
                        {stat}
                      </Label>
                      <Input
                        id={stat}
                        type="number"
                        min="0"
                        max="99"
                        value={value}
                        onChange={(e) => handleStatChange(stat as keyof PlayerStats, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3 text-purple-700">FC Mobile Modifiers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="rankBoost">Rank Boost</Label>
                      <Input
                        id="rankBoost"
                        type="number"
                        min="0"
                        max="20"
                        value={rankBoost}
                        onChange={(e) => setRankBoost(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="skillBoost">Skill Boost</Label>
                      <Input
                        id="skillBoost"
                        type="number"
                        min="0"
                        max="20"
                        value={skillBoost}
                        onChange={(e) => setSkillBoost(parseInt(e.target.value) || 0)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button onClick={calculateOVR} className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate OVR
                  </Button>
                  <Button onClick={resetCalculator} variant="outline">
                    Reset
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="team" className="space-y-6">
                <div className="max-h-96 overflow-y-auto space-y-3 pr-2">
                  {teamPlayers.map((player, index) => (
                    <div key={player.id} className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-700 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="number"
                          min="0"
                          max="120"
                          value={player.ovr || ''}
                          onChange={(e) => handleTeamPlayerChange(player.id, e.target.value)}
                          placeholder="Enter OVR"
                          className="w-full"
                        />
                      </div>
                      {teamPlayers.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTeamPlayer(player.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={addTeamPlayer}
                  variant="outline"
                  className="w-full border-2 border-purple-200 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Player
                </Button>

                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={calculateTeamOVR} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <Calculator className="w-4 h-4 mr-2" />
                    Calculate Team OVR
                  </Button>
                  <Button onClick={resetTeamCalculator} variant="outline">
                    Reset
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <AnimatePresence>
            {ovr !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="shadow-xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-blue-50">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl">Overall Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-7xl font-bold text-green-600 mb-2">{ovr}</div>
                      <div className="text-gray-600">OVR for {position} Position</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {teamOvr !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="shadow-xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
                  <CardHeader>
                    <CardTitle className="text-center text-2xl">Team Overall Rating</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-7xl font-bold text-purple-600 mb-2">{teamOvr}</div>
                      <div className="text-gray-600">Average Team OVR</div>
                      <div className="text-sm text-gray-500 mt-2">
                        Based on {teamPlayers.filter(p => p.ovr > 0).length} players
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <Card className="shadow-xl border-2 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 cursor-pointer" onClick={() => setShowFormula(!showFormula)}>
                <BarChart3 className="w-5 h-5 text-purple-600" />
                Position Weights for {position}
                {showFormula ? <ChevronUp className="w-5 h-5 ml-auto" /> : <ChevronDown className="w-5 h-5 ml-auto" />}
              </CardTitle>
            </CardHeader>
            <AnimatePresence>
              {showFormula && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}>
                  <CardContent className="space-y-2">
                    {Object.entries(POSITION_WEIGHTS[position]).map(([stat, weight]) => (
                      <div key={stat} className="flex justify-between items-center">
                        <span className="capitalize font-medium">{stat}:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${weight * 100}%` }} />
                          </div>
                          <span className="text-sm font-semibold w-12 text-right">{(weight * 100).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card className="shadow-xl border-2 border-yellow-100 bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5 text-yellow-600" />
                Quick Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p>Different positions have different stat weights</p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p>Strikers prioritize Shooting and Pace</p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p>Defenders prioritize Defending and Physical</p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p>FC Mobile includes Rank and Skill Boosts</p>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p>Team OVR is the average of all player OVRs</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CalculatorGuide data={guideData} layout="article" />

      <RatingProfileSection
        entityId="ovr-calculator"
        entityType="calculator"
        creatorSlug="aiden-asher"
        initialRatingTotal={0}
        initialRatingCount={0}
      />

      <SimilarCalculators
        calculators={[{
          calculatorName: "Age Calculator",
          calculatorHref: "/age-calculator",
          calculatorDescription: "Calculate age in years, months, and days from a birth date"
        }]}
        color="blue"
        title="Related Other Calculators"
      />
        </div>
      </main>
    </div>
  )
}
