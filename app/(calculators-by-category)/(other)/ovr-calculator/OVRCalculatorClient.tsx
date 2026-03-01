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

export default function OVRCalculatorClient() {
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
  const contentSectionRef = useRef<HTMLDivElement>(null)

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
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl shadow-lg">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            OVR Calculator
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Calculate Overall Rating (OVR) for FC & FIFA players using position-based weighted formulas. Fast, accurate, and easy to use.
        </p>
      </div>

      <section className="mb-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          An <strong>OVR calculator</strong> helps you calculate a player's Overall Rating based on their stats and position. Different positions use different stat weights to determine the final OVR.
        </p>
        <div className="bg-white p-6 rounded-xl border-2 border-blue-500 mb-4">
          <p className="text-center text-2xl font-semibold text-gray-900">
            OVR = <span className="text-blue-600">(Stats × Position Weights)</span> + Boosts
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-blue-600 mb-1">Position Weights</p>
            <p>Each position prioritizes different stats</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-blue-600 mb-1">Player Stats</p>
            <p>Pace, Shooting, Passing, Dribbling, Defending, Physical</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <p className="font-semibold text-blue-600 mb-1">FC Mobile Boosts</p>
            <p>Rank and Skill Boosts add to final OVR</p>
          </div>
        </div>
      </section>

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

      <div ref={contentSectionRef} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            OVR Calculator – Accurate Overall Rating Tools for FC & FIFA Players
          </h2>
          <p className="text-gray-600 text-lg">Complete guide to calculating player ratings in EA Sports FC and FIFA Mobile</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-200">
          <p className="text-lg text-gray-700 leading-relaxed">
            An <strong>OVR calculator</strong> is a tool that helps you calculate a player's or team's Overall Rating (OVR) based on in-game stats such as pace, shooting, passing, defending, physical, and skill boosts. Whether you need an <strong>fc mobile ovr calculator</strong>, an <strong>ovr calculator fifa mobile</strong>, or an advanced <strong>ovr calculator ea fc</strong>, these tools estimate ratings using weighted formulas similar to those used in EA Sports FC Mobile and older FIFA Mobile systems.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-3">
            If you want to know <strong>how to calculate OVR in FIFA</strong>, compare upgrades, or predict team rating changes, this complete guide explains everything with formulas, examples, FAQs, and expert tips.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-600" />
            What Is an OVR Calculator?
          </h3>
          <p className="text-gray-700 leading-relaxed">
            An <strong>OVR calculator online</strong> is a digital tool that estimates a player's Overall Rating (OVR) using individual attribute stats. OVR (Overall Rating) represents a player's total quality in football simulation games such as:
          </p>
          <ul className="list-disc list-inside ml-4 mt-3 space-y-1 text-gray-700">
            <li>EA Sports FC</li>
            <li>EA Sports FC Mobile</li>
            <li>FIFA Mobile</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-3">
            In competitive modes like Division Rivals, H2H, and VS Attack, even +1 OVR can significantly impact matchmaking and gameplay performance.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Why OVR Matters in FC & FIFA Games
          </h3>
          <p className="text-gray-700 leading-relaxed mb-3">OVR determines:</p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700">
            <li>Matchmaking strength</li>
            <li>Team chemistry performance</li>
            <li>AI behavior</li>
            <li>Market value of cards</li>
            <li>Squad Building Challenge (SBC) eligibility</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-600" />
            How to Calculate OVR in FIFA (Step-by-Step)
          </h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Many players ask: <strong>how to calculate OVR in FIFA</strong> manually?
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            While EA doesn't publicly reveal full formulas, OVR is calculated using weighted averages of key stats based on position.
          </p>

          <div className="bg-blue-50 p-5 rounded-xl border-2 border-blue-200 mb-4">
            <h4 className="font-bold text-blue-900 mb-3">Example: Striker (ST) OVR Formula Approximation</h4>
            <p className="text-gray-700 mb-2">Forwards rely heavily on:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 mb-3">
              <li>Pace</li>
              <li>Shooting</li>
              <li>Dribbling</li>
              <li>Physical</li>
            </ul>
            <div className="bg-white p-4 rounded-lg font-mono text-sm">
              <p className="text-gray-800">
                OVR = (Pace × 0.25) + (Shooting × 0.30) + (Dribbling × 0.20)
              </p>
              <p className="text-gray-800 ml-12">
                + (Passing × 0.10) + (Physical × 0.10) + (Defending × 0.05)
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-purple-600" />
            FAQs – OVR Calculator Guide
          </h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">1. What is an OVR calculator?</h4>
              <p className="text-gray-700">
                An OVR calculator estimates player overall rating based on weighted stats in FC or FIFA games.
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">2. How to calculate OVR in FIFA manually?</h4>
              <p className="text-gray-700">
                Use weighted averages based on position. Shooting and Pace dominate attackers; Defending and Physical dominate defenders.
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">3. Is there an accurate FC Mobile OVR calculator?</h4>
              <p className="text-gray-700">
                Yes, advanced tools simulate rank, skill boost, and training modifiers.
              </p>
            </div>
            <div className="bg-gray-50 p-5 rounded-xl border-2 border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">4. How does team OVR calculator in FC Mobile work?</h4>
              <p className="text-gray-700">
                It averages starting XI OVR and applies rounding rules with boost modifiers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border-2 border-purple-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Final Summary</h3>
          <p className="text-gray-700 leading-relaxed mb-3">
            An <strong>OVR calculator</strong> is essential for serious players in FC and FIFA games. Whether you use an <strong>ovr calculator fc mobile</strong>, <strong>ovr calculator fifa mobile</strong>, <strong>ovr calculator ea fc</strong>, or <strong>ovr calculator renderz</strong>, the key is understanding that OVR is a weighted calculation — not a simple average.
          </p>
          <p className="text-gray-700 leading-relaxed mb-3">
            If you want to know <strong>how to calculate OVR in FIFA</strong>, remember:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1 text-gray-700 mb-3">
            <li>Position determines weight</li>
            <li>Key stats dominate rating</li>
            <li>Rank & skill boosts impact FC Mobile</li>
            <li>Team OVR differs from individual OVR</li>
          </ul>
          <p className="text-gray-700 leading-relaxed">
            Using a reliable <strong>ovr calculator online</strong> gives you a competitive edge in squad building, trading, and ranked gameplay.
          </p>
        </div>
      </div>
    </div>
  )
}
