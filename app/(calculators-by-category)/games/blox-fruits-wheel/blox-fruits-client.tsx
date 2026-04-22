"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BloxFruitsWheel from "@/components/blox-fruits-wheel"
import { Gamepad2, Info, BookOpen, Zap, HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function BloxFruitsWheelClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
            Blox Fruits Wheel
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
            Welcome to the Blox Fruits Wheel! Give it a spin to reveal your next journey or upgrade in this exciting universe. Every segment unlocks a distinct ability, ready for you to uncover and use.
          </p>
        </div>

        {/* Main Wheel Card */}
        <div className="mb-12">
          <Card className="border-2 border-purple-200 shadow-2xl">
            <CardHeader className="py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Gamepad2 className="w-8 h-8" />
                Blox Fruits Wheel
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <BloxFruitsWheel />
            </CardContent>
          </Card>
        </div>

        {/* Description Below Wheel */}
        <div className="text-center mb-12 max-w-4xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Are you tired of spending hours deciding which fruit to use in Blox Fruits? Do you and your friends argue about builds, races, or fighting styles? The Blox Fruits Wheel solves all of that with one single spin. This free, interactive Blox Fruits Spin Wheel gives you a completely random result every time, making your gameplay faster, fairer, and way more exciting.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Whether you call it the blox fruit wheel, the wheel of blox fruits, or simply spin the wheel blox fruits, you are in the right place. Spin it, trust it, and get back into the game without wasting another second.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          {/* What Is Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-600" />
              What Is the Blox Fruits Wheel?
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The Blox Fruits Wheel is an online random picker tool built specifically for Blox Fruits players. Instead of overthinking your next fruit, sword, gun, race, or fighting style, you simply spin the wheel and let it decide everything for you.
              </p>
              <p>
                The blox fruit spin wheel works by randomly selecting one option from a complete and updated list. Every spin gives you a different result, so you always get a fresh and unpredictable experience.
              </p>
              <p className="font-semibold text-gray-900">You can use the wheel of blox fruits for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Random fruit selection for solo challenges</li>
                <li>Weapon picks for PvP and grinding</li>
                <li>Full random loadout builds with friends</li>
                <li>Content creation and challenge videos</li>
                <li>Settling arguments fairly in friend groups</li>
              </ul>
              <p>
                This tool fully supports everything from blox fruit spin wheel update 25 to blox fruits wheel update 26 and blox fruits wheel update 27, so you always stay current with the latest game content.
              </p>
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use the Blox Fruits Spin Wheel</h2>
            <p className="text-gray-700 mb-6">Using the blox fruit spin the wheel is extremely simple and takes only a few seconds. Here is exactly how it works:</p>
            
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 1 — Choose your category</h3>
                <p className="text-gray-700">Pick from fruits, swords, guns, races, or fighting styles. Each category has its own dedicated wheel loaded with every available option.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 2 — Click the spin button</h3>
                <p className="text-gray-700">The blox fruits wheel spin animation starts instantly and slows down naturally before landing on a completely random result.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Step 3 — Accept your result and play</h3>
                <p className="text-gray-700">Jump into the game using whatever the wheel selected. No second-guessing. No rerolls. Just pure gameplay.</p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              Many players add personal rules to make the spin wheel blox fruit experience even more intense. Popular rules include no rerolls allowed, playing for at least one full hour with the result, or spinning after every single death. These rules push your skill and keep the game feeling brand new every session.
            </p>
          </div>

          {/* All Fruits */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruits Wheel All Fruits — Update 26 and Update 27</h2>
            <p className="text-gray-700 mb-6">
              The blox fruits fruit wheel covers every single fruit available in the game. This makes the all fruits in blox fruits wheel perfect for complete random challenges. Here is a full breakdown of what the wheel includes:
            </p>

            <div className="space-y-6">
              <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Natural Fruits</h3>
                <p className="text-gray-700">
                  These are the classic fruits that most players encounter first. The wheel includes Spike, Chop, Spring, Bomb, Smoke, Falcon, Flame, Ice, Sand, Dark, Diamond, Rubber, and Barrier.
                </p>
              </div>

              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Elemental Fruits</h3>
                <p className="text-gray-700">
                  These fruits give you powerful elemental abilities and dominate mid-game content. The wheel includes Light, Magma, Quake, Buddha, Rumble, Blizzard, and Phoenix.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Beast Fruits</h3>
                <p className="text-gray-700">
                  These are the rarest and most powerful fruits in the entire game. The wheel includes Shadow, Venom, Control, Gravity, Love, Spider, Dough, Pain, Portal, Spirit, Sound, Dragon, Mammoth, Kitsune, and Leopard.
                </p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              The blox fruits fruit wheel update 26 and blox fruits wheel update 27 versions include every newly added fruit, so your spins always reflect the most accurate and complete fruit pool in the current version of the game.
            </p>
          </div>

          {/* Swords */}
          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruits Wheel Swords</h2>
            <p className="text-gray-700 mb-4">
              The Blox Fruits Wheel Swords option lets you fully randomize your weapon choice. Instead of defaulting to the same sword every single session, you spin the wheel and adapt to whatever you get.
            </p>
            <p className="text-gray-700 mb-4">
              The sword wheel covers every weapon tier in the game including starter swords for new players, solid mid-game weapons for grinders, and powerful endgame legendary swords for advanced players.
            </p>
            <p className="text-gray-700">
              Using the blox fruit wheel for swords forces you to step outside your comfort zone and learn new combat techniques. Many players discover their new favorite sword through a random spin they almost ignored.
            </p>
          </div>

          {/* Guns */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruits Wheel Guns</h2>
            <p className="text-gray-700 mb-4">
              The Blox Fruits Wheel Guns is the perfect tool for ranged build players. You spin the blox fruits random gun wheel and get a completely random gun assignment every single time.
            </p>
            <p className="text-gray-700">
              The gun wheel includes every ranged weapon in Blox Fruits, from basic early-game pistols all the way to advanced sea-event guns. Playing with a random gun forces you to improve your aim, develop new strategies, and make your gameplay far more dynamic than sticking to one weapon permanently.
            </p>
          </div>

          {/* Race */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruits Wheel Race</h2>
            <p className="text-gray-700 mb-4">
              Your race in Blox Fruits directly affects your speed, passive abilities, and overall strategy. The Blox Fruits Wheel Race lets you randomize this important decision completely.
            </p>
            <p className="text-gray-700">
              You can land on races including Human, Mink, Fishman, Skypian, Ghoul, and Cyborg. Each race plays differently and suits different builds. Spinning the blox fruits wheel race pushes you to explore strengths and playstyles you never considered before, making the game feel completely fresh even after hundreds of hours.
            </p>
          </div>

          {/* Fighting Style */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruits Wheel Fighting Style</h2>
            <p className="text-gray-700 mb-4">
              The Blox Fruits Wheel Fighting Style adds another powerful layer of randomness to your build. Instead of always going back to your main fighting style, you spin and commit to whatever comes up.
            </p>
            <p className="text-gray-700 mb-4">
              The blox fruits spin wheel fighting style includes Black Leg, Electric, Superhuman, Dragon Talon, Sharkman Karate, Death Step, and all other current fighting styles in the game. Getting a random fighting style challenges you to learn new combos and master techniques you previously ignored.
            </p>
            <p className="text-gray-700">
              Combine the fruit wheel, sword wheel, and blox fruits wheel fighting style together and you get a completely randomized full loadout. This is the ultimate Blox Fruits challenge format.
            </p>
          </div>

          {/* Challenge Ideas */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-yellow-600" />
              Spin the Wheel Blox Fruits — Popular Challenge Ideas
            </h2>
            <p className="text-gray-700 mb-6">
              The spin the wheel blox fruits format is one of the most popular challenge types in the entire community. Players and content creators use it constantly to generate unique and entertaining gameplay.
            </p>

            <p className="font-semibold text-gray-900 mb-4">Here are some challenge ideas you can try right now:</p>
            
            <div className="space-y-4">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">One Spin Only Challenge</h4>
                <p className="text-gray-700">Spin once and use that result for the entire session, no matter what</p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Full Random Loadout Challenge</h4>
                <p className="text-gray-700">Spin for your fruit, sword, gun, race, and fighting style all at once</p>
              </div>

              <div className="bg-pink-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Spin After Every Death</h4>
                <p className="text-gray-700">Every time you die, you must spin again and switch to the new result</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Random PvP Build Challenge</h4>
                <p className="text-gray-700">Spin before every PvP fight and use a completely fresh build each time</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">No Reroll Noob to Pro Challenge</h4>
                <p className="text-gray-700">Start with a random fruit and grind all the way to endgame without changing it</p>
              </div>
            </div>

            <p className="text-gray-700 mt-6">
              These challenges make the blox fruit spin the wheel system one of the most entertaining tools available for both solo players and content creators.
            </p>
          </div>

          {/* Fair Chances */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Blox Fruit Spin Wheel Chances — Is It Truly Fair?</h2>
            <p className="text-gray-700 mb-4">
              Yes, the blox fruit spin wheel chances are completely equal for every option on the standard wheel. Every fruit, sword, gun, race, and fighting style carries the exact same probability of being selected.
            </p>
            <p className="text-gray-700 mb-4">
              For example, if the wheel contains 40 fruits, each fruit gets a 2.5% chance of appearing on every spin. The result depends entirely on the natural stopping point of the wheel, which changes with every single spin.
            </p>
            <p className="text-gray-700">
              This makes the blox fruits random wheel one of the most unbiased and fair decision-making tools available for Blox Fruits players. Some advanced versions also allow custom weighted chances, so you can increase or decrease the probability of specific options to match your challenge rules.
            </p>
          </div>

          {/* Why This Wheel Beats Others */}
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Blox Fruits Wheel Beats Every Other Option</h2>
            <p className="text-gray-700 mb-6">
              This blox fruits wheel stands out from every competitor because it combines simplicity with complete and powerful features all in one place.
            </p>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Fully updated for blox fruits wheel update 25, update 26, and update 27</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Covers every category including fruits, swords, guns, races, and fighting styles</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Delivers a fast, smooth, and deeply satisfying blox fruits wheel spin that works perfectly on every device</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Completely free with no account, no download, and no payment required</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Perfect for beginners exploring the game and advanced players running challenges</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <span className="text-gray-700">Works on mobile, tablet, and desktop without any installation</span>
              </li>
            </ul>

            <p className="text-gray-700 mt-6">
              The blox fruits spin wheel gives you everything you need to play faster, smarter, and with far more excitement than before.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-purple-600" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  1. What is the Blox Fruits Wheel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The Blox Fruits Wheel is a free random spin tool that selects fruits, swords, guns, races, or fighting styles for you instantly. It helps players make quick decisions and adds a fun layer of randomness to gameplay.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  2. Is the Blox Fruit Spin Wheel truly random?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, the blox fruit spin wheel chances are 100% equal for every single option in the standard version — no fruit, sword, or style has any advantage over another.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  3. Can I use the Blox Fruits Wheel for challenges?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, the spin the wheel blox fruits method is extremely popular for challenge runs. Players use it for random builds, no reroll runs, spin after death challenges, and full random loadout sessions.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  4. Does the wheel include all fruits from every update?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, the blox fruits wheel all fruits version includes every Natural, Elemental, and Beast fruit. It also fully supports blox fruits wheel update 26 and blox fruits wheel update 27 with all newly added fruits included.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  5. Can I spin for swords, guns, races, and fighting styles too?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  Yes, the blox fruits random wheel includes separate dedicated wheels for swords, guns, races, and fighting styles. You can combine all of them to create a complete random build in seconds.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left text-lg font-semibold">
                  6. Why should I use the Blox Fruits Spin Wheel?
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  The blox fruits spin wheel saves you time, removes confusion, adds exciting randomness to your gameplay, and helps you discover new builds and strategies you would never try on your own.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-2xl shadow-2xl text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Start Spinning Right Now</h2>
            <p className="text-lg text-white/90 mb-6 max-w-3xl mx-auto">
              The Blox Fruits Wheel is free, instant, and ready to use right now. You do not need an account, a download, or a payment. Just open the wheel, click spin, and get your result in seconds.
            </p>
            <p className="text-lg text-white/90 mb-6">
              Whether you need the blox fruits wheel update 26, the full all fruits in blox fruits wheel, the blox fruits spin wheel fighting style, or the blox fruits random gun wheel — everything lives right here on this page.
            </p>
            <p className="text-xl font-bold text-white">
              Stop overthinking your next move. Start spinning. Let the blox fruit wheel decide for you and enjoy Blox Fruits in a completely new way.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
