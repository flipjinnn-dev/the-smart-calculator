'use client'

import CountryWheel from '@/components/country-wheel'

export default function CountryWheelClient() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Country Wheel
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Stop wasting time deciding which country to pick—the Country Wheel gives you a completely random country in seconds with just one spin.
          </p>
        </div>

        {/* Wheel Component */}
        <div className="mb-12">
          <CountryWheel />
        </div>

        {/* How To Use Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How To Use This Country Wheel</h2>
          <p className="text-lg text-gray-700 mb-8">Three simple steps. Done in under 10 seconds.</p>
          
          <div className="space-y-4 mb-8">
            <div className="bg-white p-5 rounded-xl border-l-4 border-green-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 1 — Open or Customize the Wheel</h3>
              <p className="text-gray-700">
                Start with the default country wheel that includes all 197 countries in the world. You can also customize the list and keep only specific regions like Europe, Asia, or the Americas.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-blue-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 2 — Spin The Wheel</h3>
              <p className="text-gray-700">
                Click the spin button to activate the country wheel spinner. Watch it rotate and slow down to a random stop.
              </p>
            </div>
            
            <div className="bg-white p-5 rounded-xl border-l-4 border-purple-600 shadow-sm text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Step 3 — Get Your Random Result</h3>
              <p className="text-gray-700">
                The wheel lands on a completely random country. Accept the result or spin again anytime for a new one. No limits, no restrictions.
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="prose prose-lg max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Is a Country Wheel?</h2>
          <p className="text-gray-700 mb-6">
            A country wheel is an interactive online tool that randomly selects a country from a list when you spin it. People also call it a random country wheel, country wheel spinner, wheel of countries, country picker wheel, or a random country generator wheel. All of these work the same way you spin and instantly get a random country result.
          </p>
          <p className="text-gray-700 mb-6">
            This tool takes away decision fatigue completely. Instead of looking through a long list or using a boring random number generator, you just hit spin and let the wheel decide. It turns a simple selection task into a genuinely fun and satisfying experience.
          </p>
          <p className="text-gray-700 mb-8">
            The country wheel includes every recognized country on Earth from large nations like the United States, China, India, and Brazil to smaller ones like Luxembourg, Maldives, and Fiji. Every spin pulls from the full list unless you customize it yourself.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why People Use the Country Wheel Spinner</h2>
          <p className="text-gray-700 mb-4">
            The country wheel spinner solves real, everyday problems for students, teachers, travelers, gamers, and content creators. Here is why so many people use it every single day.
          </p>
          
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Students and Geography Learners use the wheel of countries to quiz themselves on capitals, flags, languages, and cultures. Instead of flipping through flashcards, they spin the country wheel and challenge themselves with whatever comes up.</li>
            <li>Teachers use the country spinner wheel to make geography lessons interactive. They spin the wheel in front of the class and ask students questions about the selected country. It builds engagement instantly.</li>
            <li>Travelers and Trip Planners use the random country wheel when they want to travel somewhere new but cannot decide where to go. Spin the country wheel, pick your destination, and start planning. Some travelers actually commit to wherever it lands that is how fun it gets.</li>
            <li>Game Nights and Trivia Hosts use the countries wheel to pick random countries for geography trivia rounds. It keeps things fair, fast, and exciting for every player.</li>
            <li>Content Creators on YouTube, TikTok, and Instagram use the country spin the wheel for challenge videos — visiting restaurants from random countries, cooking dishes from wherever the wheel lands, or learning phrases from a new language every week.</li>
            <li>Board Game and Video Game Players use the country spinning wheel to pick starting countries in games like Risk, Civilization, or geography-based card games.</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Versions of the Country Wheel</h2>
          <p className="text-gray-700 mb-6">
            The country wheel comes in many useful formats. Here are the most popular versions people search for and use every day.
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">All 197 Countries Wheel</h3>
              <p className="text-gray-700">
                The complete world wheel of countries with every recognized nation included. This is the default version most people use.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Europe Countries Wheel</h3>
              <p className="text-gray-700">
                A focused wheel with only European countries. Perfect for European geography quizzes, travel planning, or classroom games.
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">European Countries Wheel</h3>
              <p className="text-gray-700">
                Same as above, great for quick spins when you are studying or planning a trip across Europe.
              </p>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-red-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Wheel of Every Country</h3>
              <p className="text-gray-700">
                A full-world version with every country on the wheel. Great for world exploration challenges or global trivia games.
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Country Randomizer Wheel</h3>
              <p className="text-gray-700">
                A version built specifically for random selection without any regional filters. Every country has an equal chance.
              </p>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Random Country Generator Wheel</h3>
              <p className="text-gray-700">
                A generator-style tool that spins and picks countries completely at random for use in games, apps, and classroom activities.
              </p>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-green-50 p-5 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Country Picker Wheel</h3>
              <p className="text-gray-700">
                A simple, clean version designed for quick picks. Great when you need one country fast with no distractions.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Country Wheel Features</h2>
          <p className="text-gray-700 mb-4">
            The country wheel generator is built to be fast, flexible, and fun. Here is everything you get out of the box.
          </p>
          
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Instant spinning animation with smooth, satisfying results</li>
            <li>All 197 countries included by default</li>
            <li>Fully customizable add or remove any country from the list</li>
            <li>Filter by continent or region for focused spins</li>
            <li>Works flawlessly on both mobile and desktop</li>
            <li>No account, no sign-up, and no payment required</li>
            <li>Unlimited spins with zero restrictions</li>
            <li>Country flags displayed alongside country names on some versions</li>
          </ul>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Creative Ways To Use the Country Wheel</h2>
          <p className="text-gray-700 mb-4">
            The country spin wheel is not just for geography class. Here are creative ways real people use it every day.
          </p>
          
          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Travel Challenge — Spin the random country wheel once a month and commit to learning everything about that country. Plan a virtual trip, try the cuisine, watch a documentary, or start saving for a real visit.</li>
            <li>Geography Quiz Game — Use the country wheel picker with friends or family. Whoever spins must answer a question about the selected country capital city, flag color, or what continent it is on.</li>
            <li>World Cooking Challenge — Spin the wheel of countries every Sunday and cook a dish from whatever country it lands on. A fun and delicious way to explore world cultures.</li>
            <li>Language Learning — Spin the country spin wheel, then spend 30 minutes learning 10 words from that country's primary language. A creative way to pick up bits of multiple languages.</li>
            <li>Charity and Awareness — Spin the countries wheel and research one global issue affecting that country this week. A simple habit that grows world awareness over time.</li>
            <li>Content Creation — Spin the country spinning wheel on camera for reaction content, food challenges, history deep-dives, or travel vlogs. Audiences love the randomness and authenticity.</li>
          </ul>

          {/* FAQs */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What is a country wheel?</h3>
              <p className="text-gray-700">
                A country wheel is an online spinner tool that randomly selects a country from a list when you spin it. You can use it for travel planning, geography games, trivia nights, classroom activities, and creative challenges.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is the country wheel free to use?</h3>
              <p className="text-gray-700">
                Yes, the country wheel is completely free. There is no sign-up, no download, and no payment required. You get unlimited spins at no cost.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Does the country wheel include all 197 countries?</h3>
              <p className="text-gray-700">
                Yes, the default version of the wheel includes all 197 recognized countries in the world. You can also customize the list to include only specific countries or regions you want.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is the random country wheel actually random?</h3>
              <p className="text-gray-700">
                Yes, every spin is fully random and fair. Each country on the wheel has an equal chance of being selected unless you remove some or weight the list manually.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use the country wheel for just European countries?</h3>
              <p className="text-gray-700">
                Yes, you can customize the wheel to show only European countries. This gives you a focused Europe countries wheel perfect for regional geography quizzes and travel planning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I use the country wheel on my phone?</h3>
              <p className="text-gray-700">
                Yes, the country wheel spinner works perfectly on all mobile devices including iPhone and Android. The spinning animation is smooth and the interface is fully responsive on any screen size.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
