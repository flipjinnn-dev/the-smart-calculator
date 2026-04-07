"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SongLengthCalculator from "@/components/song-length-calculator"
import { Music, Calculator, Clock, Info, Zap, TrendingUp } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SongLengthCalculatorClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Song Length Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Calculate Song Duration Instantly
          </p>
        </div>

        {/* Quick Answer Box */}
        <div className="mb-12 p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl shadow-lg">
          <div className="flex items-start gap-4">
            <div className="bg-purple-600 text-white rounded-full p-3 flex-shrink-0">
              <Info className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">What Is a Song Length Calculator?</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                A song length calculator is an online tool that helps you calculate the total duration of one or multiple songs, playlists, or tracks. You can add individual song durations, convert time formats, or estimate song length based on BPM (beats per minute). It's useful for DJs, musicians, content creators, and anyone managing playlists.
              </p>
            </div>
          </div>
        </div>

        {/* Main Calculator Card */}
        <div className="mb-12">
          <Card className="border-2 border-gray-200 shadow-xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                Song Length Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <SongLengthCalculator />
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Music className="w-8 h-8 text-purple-600" />
                Song Length Calculator – Calculate Song Duration Instantly
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  A song length calculator is one of the most useful tools if you work with music regularly. Whether you're building a playlist, planning a DJ set, editing videos, or analyzing track durations, this tool saves time and reduces manual calculation errors.
                </p>
                <p>
                  Unlike basic timers, a song time calculator allows you to:
                </p>
                <ul className="space-y-2 ml-6">
                  {[
                    "Add multiple tracks",
                    "Convert minutes to seconds",
                    "Calculate playlist duration",
                    "Estimate song length using BPM",
                    "Find average song length",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  This page will guide you through everything you need to know, including how to use a song length calculator online, real-world examples, and advanced use cases.
                </p>
              </div>
            </div>

            {/* What Is Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a Song Length Calculator?</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A song length calculator online is a digital tool that calculates the total playtime of songs or playlists. You simply input durations (e.g., 3:45, 4:20), and it automatically adds them.
              </p>
              <div className="bg-white border-2 border-blue-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Common Uses:</h3>
                <ul className="space-y-2 ml-6">
                  {[
                    "Playlist planning",
                    "DJ set timing",
                    "Podcast or video background music timing",
                    "Album duration calculation",
                    "BPM-based song length estimation",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* How to Use */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use a Song Time Calculator</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                Using a song time duration calculator is very simple:
              </p>
              <div className="space-y-4 mb-6">
                <h3 className="text-xl font-bold text-gray-900">Step-by-Step Guide:</h3>
                {[
                  "Enter each song duration (e.g., 3:15, 4:05)",
                  "Add multiple tracks",
                  "Click calculate",
                  "Get total playlist time instantly",
                ].map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0 text-lg">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-2">{step}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Song</th>
                        <th className="px-6 py-3 text-left text-sm font-bold text-gray-900">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-green-50">
                        <td className="px-6 py-4 text-gray-700">Track 1</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">3:30</td>
                      </tr>
                      <tr className="hover:bg-green-50">
                        <td className="px-6 py-4 text-gray-700">Track 2</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">4:15</td>
                      </tr>
                      <tr className="hover:bg-green-50">
                        <td className="px-6 py-4 text-gray-700">Track 3</td>
                        <td className="px-6 py-4 text-gray-700 font-semibold">2:45</td>
                      </tr>
                      <tr className="bg-green-100">
                        <td className="px-6 py-4 text-gray-900 font-bold">Total</td>
                        <td className="px-6 py-4 text-green-600 font-bold text-lg">10:30</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-gray-700">
                  Total = <strong>10:30</strong> (10 minutes, 30 seconds)
                </p>
                <p className="mt-2 text-gray-600 text-sm">
                  This is exactly what a song playlist length calculator does automatically.
                </p>
              </div>
            </div>

            {/* Why It Matters */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Song Playlist Length Calculator — Why It Matters</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  When creating playlists on apps like Spotify or Apple Music, knowing the total duration helps you:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Fit music into time limits (e.g., gym sessions)",
                    "Plan radio shows or podcasts",
                    "Avoid exceeding event time slots",
                    "Maintain consistent listening experiences",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                      <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Types of Calculations */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Types of Song Length Calculations</h2>
              <div className="space-y-6">
                {[
                  { title: "1. Basic Song Length Calculator", desc: "Adds durations of multiple songs." },
                  { title: "2. Song Length Adder", desc: "A tool specifically designed to sum track durations quickly." },
                  { title: "3. Song Time Length Calculator", desc: "Focuses on precise time conversion and formatting." },
                  { title: "4. Song Playlist Time Calculator Online", desc: "Calculates total playlist duration in real-time." },
                  { title: "5. Average Song Length Calculator", desc: "Finds the average duration of songs in a playlist." },
                ].map((type, index) => (
                  <div key={index} className="p-5 bg-white border-2 border-purple-200 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">{type.title}</h3>
                    <p className="text-gray-700">{type.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Average Song Length */}
            <div className="bg-white border-2 border-indigo-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <TrendingUp className="w-8 h-8" />
                  Average Song Length — What You Should Know
                </h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">What is the Average Song Length?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    The average song length today is around <strong>2.5 to 4 minutes</strong>.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Factors That Affect Song Length:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Genre (Pop vs Classical)",
                      "Platform (Streaming vs Radio)",
                      "Audience attention span",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-indigo-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Pop songs: <strong>~3 minutes</strong></p>
                    <p>• Hip-hop: <strong>~2–3 minutes</strong></p>
                    <p>• Classical: <strong>5+ minutes</strong></p>
                  </div>
                  <p className="mt-4 text-gray-600">
                    Use an average song length calculator to analyze your playlist data.
                  </p>
                </div>
              </div>
            </div>

            {/* BPM to Song Length */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-600" />
                BPM to Song Length Calculator
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A BPM to song length calculator estimates track duration based on tempo.
              </p>

              <div className="bg-white border-2 border-yellow-300 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Formula:</h3>
                <div className="bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 font-mono text-lg">
                  <p className="text-gray-900"><strong>Song Length</strong> = (Total Beats ÷ BPM)</p>
                </div>
              </div>

              <div className="bg-yellow-100 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                <div className="space-y-2 text-gray-700">
                  <p>• BPM = <strong>120</strong></p>
                  <p>• Beats = <strong>480</strong></p>
                  <p className="mt-4 text-lg">Length = 480 ÷ 120 = <strong className="text-yellow-700">4 minutes</strong></p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">This is helpful for:</h3>
                <ul className="space-y-2 ml-6">
                  {[
                    "Music producers",
                    "DJs syncing tracks",
                    "Beat creators",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-gray-700">
                      <span className="text-yellow-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Song Length Converter */}
            <div className="bg-white border-2 border-teal-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Song Length Converter — Convert Time Easily</h2>
              </div>
              <div className="p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  A song length converter helps convert between:
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    "Seconds → Minutes",
                    "Minutes → Hours",
                    "Time formats (MM:SS to HH:MM:SS)",
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-teal-50 border-2 border-teal-200 rounded-lg text-center">
                      <p className="text-gray-700 font-semibold">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Example:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• 240 seconds = <strong>4 minutes</strong></p>
                    <p>• 1:30 = <strong>90 seconds</strong></p>
                  </div>
                </div>
              </div>
            </div>

            {/* For Professionals */}
            <div className="bg-gradient-to-br from-pink-50 to-red-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Song Track Length Calculator for Professionals</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                If you're a:
              </p>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {["DJ", "Music producer", "Video editor"].map((role, index) => (
                  <div key={index} className="p-4 bg-pink-100 border-2 border-pink-300 rounded-lg text-center">
                    <p className="text-gray-900 font-bold text-lg">{role}</p>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                A song track length calculator helps you:
              </p>
              <ul className="space-y-2 ml-6">
                {[
                  "Align audio with visuals",
                  "Maintain pacing",
                  "Sync beats perfectly",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="text-pink-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Perfect Song Length */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">What is the Perfect Song Length?</h2>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Ideal Song Length:</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Streaming platforms: <strong>2–3 minutes</strong></p>
                    <p>• Radio-friendly: <strong>3–4 minutes</strong></p>
                    <p>• Storytelling songs: <strong>4–6 minutes</strong></p>
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Why Shorter Songs Work Today:</h3>
                  <ul className="space-y-2 ml-6">
                    {[
                      "Higher replay value",
                      "Better engagement",
                      "Algorithm-friendly",
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700">
                        <span className="text-blue-600 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-gray-600">
                    This is why many modern artists optimize track duration.
                  </p>
                </div>
              </div>
            </div>

            {/* Features to Look For */}
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Song Length Calculator Online — Features to Look For</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                A high-quality song playlist time calculator online should include:
              </p>
              <div className="bg-white border-2 border-green-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Must-Have Features:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Multiple track input",
                    "Auto calculation",
                    "Time format conversion",
                    "Mobile-friendly design",
                    "Fast processing",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        ✓
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Real-Life Experience */}
            <div className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
                <h2 className="text-3xl font-bold text-white">Real-Life Experience & Use Cases</h2>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-700 leading-relaxed">
                  From experience, using a song length calculator bpm is extremely helpful when:
                </p>

                <div className="space-y-4">
                  <div className="p-5 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">DJ Sets:</h3>
                    <p className="text-gray-700">I've used this tool to plan 60-minute sets without going over time.</p>
                  </div>

                  <div className="p-5 bg-pink-50 border-2 border-pink-200 rounded-lg">
                    <h3 className="text-xl font-bold text-pink-600 mb-2">Video Editing:</h3>
                    <p className="text-gray-700">Matching background music with video scenes becomes easier.</p>
                  </div>

                  <div className="p-5 bg-purple-50 border-2 border-purple-200 rounded-lg">
                    <h3 className="text-xl font-bold text-purple-600 mb-2">Playlist Creation:</h3>
                    <p className="text-gray-700">Helps create perfectly timed workout or study playlists.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Benefits of Using a Song Length Calculator</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: "Saves Time", desc: "No manual calculations needed." },
                  { title: "Improves Accuracy", desc: "Avoids mistakes in time addition." },
                  { title: "Better Planning", desc: "Perfect for playlists and events." },
                  { title: "Professional Workflow", desc: "Useful for music and media professionals." },
                ].map((benefit, index) => (
                  <div key={index} className="p-6 bg-white border-2 border-blue-200 rounded-xl">
                    <h3 className="text-xl font-bold text-blue-600 mb-2">{benefit.title}</h3>
                    <p className="text-gray-700">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">FAQs</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is a song length calculator?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    A tool that calculates total duration of songs or playlists.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How do I calculate playlist time?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Add all song durations using a song playlist length calculator.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Can I calculate song length using BPM?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes, use a bpm to song length calculator.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    What is the average song length?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Typically between 2.5 to 4 minutes.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    Is there a free song length calculator online?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    Yes, many tools are available for free.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="text-left text-lg font-semibold">
                    How accurate are these calculators?
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed">
                    They are highly accurate when correct input is provided.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
