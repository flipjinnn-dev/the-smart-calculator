'use client'

import ClashRoyaleWheel from '@/components/clash-royale-wheel'

export default function ClashRoyaleWheelClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Clash Royale Wheel
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            The Clash Royale Wheel is a free spin tool that randomly selects a Clash Royale card or deck element instantly. Every spin is fair, unbiased, and fully random.
          </p>
        </div>

        {/* Wheel Component */}
        <div className="mb-12">
          <ClashRoyaleWheel />
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How To Use The Clash Royale Wheel</h2>
          <p className="text-gray-700 mb-6">
            The Clash Royale spin the wheel tool is designed for instant gameplay decisions in under 20 seconds.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1 — Add Your Cards</h3>
              <p className="text-gray-700">
                Add any Clash Royale cards you want such as:
                Hog Rider, Mega Knight, Goblin Barrel, P.E.K.K.A, Archer Queen, Skeleton Army, Fireball, Zap, and more.
                You can also include Champions and Evo cards for advanced challenges.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-red-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2 — Customize Your Wheel</h3>
              <p className="text-gray-700">
                You can fully control your Clash Royale wheel spinner:
                Adjust colors based on rarity
                Set section sizes for probability control
                Add Evo or Champion cards
                Create challenge-based wheels
                This allows you to simulate real Clash Royale wheel spin challenge rules or create your own custom gameplay system.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3 — Spin & Play</h3>
              <p className="text-gray-700">
                Click spin and the Clash Royale wheel spin system will randomly select one result.
                Every spin is:
                fully random
                unbiased
                independent of previous results
                instant and smooth
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is Clash Royale Wheel?</h2>
          <p className="text-gray-700 mb-6">
            The Clash Royale Wheel is a digital decision-making tool that works as a random generator for Clash Royale cards and decks.
            Players also call it:
          </p>
          
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>clash royale spin wheel</li>
            <li>wheel clash royale</li>
            <li>clash royale random wheel</li>
            <li>spin wheel clash royale</li>
            <li>wheel of names clash royale (style system)</li>
          </ul>
          
          <p className="text-gray-700 mb-8">
            It removes decision fatigue and replaces it with randomness and challenge-based gameplay.
            Unlike the in-game system, this clash royale spin the wheel tool is fully customizable. You control:
            which cards appear
            their probability
            challenge rules
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">How The Clash Royale Wheel Spin Works</h2>
          <p className="text-gray-700 mb-6">
            The Clash Royale wheel spin system uses a transparent probability model.
          </p>

          <div className="bg-gray-50 p-6 rounded-xl mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Core Mechanism:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>The wheel is divided into equal 360° sections</li>
              <li>Each card occupies a segment</li>
              <li>A random number selects the result</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Fairness Rules:</h3>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li>All cards have equal probability by default</li>
              <li>No hidden bias</li>
              <li>Each spin is independent</li>
            </ul>
            
            <p className="text-gray-700">
              For example, if 40 cards exist, each card has a 2.5% chance.
              This ensures the clash royale spinning wheel experience remains fair and competitive.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Clash Royale Card Tiers</h2>
          <p className="text-gray-700 mb-6">
            You can structure your clash royale character wheel based on real rarity systems.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Common Cards</h3>
              <p className="text-gray-700">
                Minions, Goblins, Skeletons, Arrows, Cannon, Tesla, Fireball, Zap
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rare Cards</h3>
              <p className="text-gray-700">
                Hog Rider, Valkyrie, Mini P.E.K.K.A, Musketeer, Goblin Barrel
              </p>
            </div>

            <div className="bg-purple-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Epic Cards</h3>
              <p className="text-gray-700">
                P.E.K.K.A, Witch, Bowler, Graveyard, Electro Giant
              </p>
            </div>

            <div className="bg-red-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Legendary Cards</h3>
              <p className="text-gray-700">
                Mega Knight, Sparky, Lava Hound, Miner, Inferno Dragon
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Champion & Evo Cards</h3>
              <p className="text-gray-700">
                Archer Queen, Golden Knight, Skeleton King, Little Prince
                Evo Knight, Evo Firecracker, Evo Skeletons, Evo Goblin Barrel
              </p>
              <p className="text-gray-700 mt-2">
                👉 Adding Evo cards creates a jackpot effect in the Clash Royale Evo Wheel system.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Where Players Use Clash Royale Wheel</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-600 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clash Royale Spin The Wheel Challenge</h3>
              <p className="text-gray-700">
                Players spin 8 times and build a full deck using only selected cards. This is one of the most popular Clash Royale spin the wheel challenge formats on YouTube.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-red-600 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Spin The Wheel Deck Builder</h3>
              <p className="text-gray-700">
                Spin multiple times to generate a full random deck using the spin wheel clash royale decks system.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Clash Royale Evo Wheel Events</h3>
              <p className="text-gray-700">
                Communities use the Clash Royale Evo Wheel spin system to assign Evo cards fairly in tournaments.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-green-600 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Win Condition Wheel</h3>
              <p className="text-gray-700">
                Players spin to get a win condition (Hog Rider, Graveyard, Goblin Barrel) and build a deck around it.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border-l-4 border-yellow-600 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Discord & Community Events</h3>
              <p className="text-gray-700">
                Servers use the wheel spinner clash royale system to host fair tournaments and events.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Clash Royale Wheel vs Basic Random Picker</h2>
          
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Feature</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Clash Royale Wheel</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Basic Picker</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Visual spinning</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interactive experience</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">High</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Low</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Evo & Champion support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Probability control</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Limited</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Deck building support</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Yes</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">No</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Engagement</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Strong</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Weak</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-gray-700 mb-8">
            The Clash Royale spinning wheel tool clearly provides a superior gameplay experience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Features</h2>
          
          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Probability Control</h3>
              <p className="text-gray-700">
                Adjust section sizes to simulate real Clash Royale rarity and wheel of fortune style chances.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Elimination Mode</h3>
              <p className="text-gray-700">
                Remove cards after selection to build unique decks without repetition.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Themes</h3>
              <p className="text-gray-700">
                Match Clash Royale UI colors for rarity-based visuals:
                Common, Rare, Epic, Legendary, Champion.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Reset & Respin</h3>
              <p className="text-gray-700">
                Reset anytime and update cards instantly.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Share System</h3>
              <p className="text-gray-700">
                Share your custom Wheel of Names Clash Royale setup with friends or Discord communities.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is Clash Royale Wheel?</h3>
              <p className="text-gray-700">
                It is a random spin tool that selects Clash Royale cards or decks instantly using a fair system.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How does Clash Royale spin the wheel challenge work?</h3>
              <p className="text-gray-700">
                You spin 8 times and build a deck using only selected cards, then battle with that random deck.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is Clash Royale wheel spinner fair?</h3>
              <p className="text-gray-700">
                Yes, every card has equal probability unless manually adjusted.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use Evo cards in the wheel?</h3>
              <p className="text-gray-700">
                Yes, Evo and Champion cards can be added for advanced challenge setups.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is Clash Royale win condition wheel?</h3>
              <p className="text-gray-700">
                It is a system where only win condition cards are included and one is selected randomly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is this Clash Royale wheel free?</h3>
              <p className="text-gray-700">
                Yes, it is 100% free with unlimited spins and no login required.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-red-50 p-8 rounded-2xl mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Final Summary</h2>
            <p className="text-gray-700 mb-4">
              The Clash Royale Wheel is a powerful interactive random generator that transforms normal gameplay into a creative challenge system. It allows players to generate random cards, build unpredictable decks, and run Evo or Champion-based challenges instantly.
            </p>
            <p className="text-gray-700 mb-4">
              With full customization, fair probability logic, and fast spin mechanics, it is the most effective tool for Clash Royale challenges, content creation, and community events.
            </p>
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-red-600">
              👉 Spin the wheel, accept your card, and start the battle.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
