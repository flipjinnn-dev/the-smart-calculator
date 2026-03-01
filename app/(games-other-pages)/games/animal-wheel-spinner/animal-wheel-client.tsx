'use client';

import { useEffect, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { ModernWheelSpinner } from '@/components/games/wheel-spinner/ModernWheelSpinner';
import { EditorPanel } from '@/components/games/wheel-spinner/EditorPanel';
import { SettingsPanel } from '@/components/games/wheel-spinner/SettingsPanel';
import { Menu, X, Share2, Sparkles } from 'lucide-react';
import Link from 'next/link';

const ANIMALS = [
  '🦁 Lion', '🐘 Elephant', '🦒 Giraffe', '🐯 Tiger', '🐼 Panda',
  '🦓 Zebra', '🦘 Kangaroo', '🐨 Koala', '🦊 Fox', '🐺 Wolf',
  '🐻 Bear', '🦌 Deer', '🐰 Rabbit', '🐶 Dog', '🐱 Cat'
];

export default function AnimalWheelClient() {
  const { theme, loadFromLocalStorage, slices, settings, importSlices, updateSlice } = useWheelSpinnerStore();
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
    
    if (!isInitialized) {
      const animalSlices = ANIMALS.map((animal, index) => ({
        id: `animal-${index}`,
        label: animal,
        color: getAnimalColor(index),
        textColor: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'Arial',
        fontWeight: 'bold' as const,
        fontStyle: 'normal' as const,
      }));
      
      importSlices(animalSlices);
      setIsInitialized(true);
    }
  }, [loadFromLocalStorage, isInitialized, importSlices]);

  const getAnimalColor = (index: number) => {
    const colors = [
      '#FF6B35', '#4ECDC4', '#95E1D3', '#F38181', '#AA96DA',
      '#FCBAD3', '#A8D8EA', '#FFAAA6', '#FFD3B5', '#DCEDC2',
      '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'
    ];
    return colors[index % colors.length];
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowEditor(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleShare = () => {
    const data = {
      slices,
      settings,
    };
    const encoded = btoa(JSON.stringify(data));
    const url = `${window.location.origin}${window.location.pathname}?data=${encoded}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Animal Wheel Spinner',
        text: 'Check out my animal wheel!',
        url: url,
      }).catch(() => {
        copyToClipboard(url);
      });
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-yellow-100 dark:from-gray-900 dark:via-green-900 dark:to-gray-900 transition-colors duration-200">
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-green-300 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="p-2 bg-green-200 dark:bg-green-900 rounded-lg hover:bg-green-300 dark:hover:bg-green-800 md:hidden transition-colors shadow-sm"
                >
                  {showEditor ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center shadow-md text-2xl">
                    🦁
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Animal Wheel Spinner
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Spin for Random Animals</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 md:p-3 bg-green-100 dark:bg-green-900 rounded-full hover:bg-green-200 dark:hover:bg-green-800 transition-colors shadow-sm"
                  title="Share Wheel"
                >
                  <Share2 size={20} className="md:w-6 md:h-6 text-green-700 dark:text-green-200" />
                </button>
                <SettingsPanel />
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          {showEditor && (
            <div className={`${
              isMobile 
                ? 'fixed inset-0 top-[73px] z-30 bg-white dark:bg-gray-800' 
                : 'w-96 flex-shrink-0'
            }`}>
              <EditorPanel />
            </div>
          )}

          <div className="flex-1 overflow-auto">
            <div className="max-w-6xl mx-auto py-8 px-4">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                  <Sparkles className="w-5 h-5 text-green-600 dark:text-green-300" />
                  <span className="text-sm font-semibold text-green-600 dark:text-green-300">
                    Spin to Discover Random Animals
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Random Animal Generator Wheel
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Spin the wheel to pick a random animal. Perfect for games, learning, storytelling, and fun activities for kids and adults.
                </p>
              </div>

              <ModernWheelSpinner />

              <div className="mt-16 prose prose-lg dark:prose-invert max-w-none">
                <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-4xl">🦁</span>
                    Animal Wheel Spinner: The Ultimate Guide to Random Animal Fun
                  </h2>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    An <strong>animal wheel spinner</strong> is a digital or physical tool that lets users generate random animals by spinning a wheel. Popular among educators, children, game designers, and animal lovers, it can take forms like <strong>animal spin wheel games</strong>, <strong>animal generator wheels</strong>, or <strong>cute animal wheel spinners</strong>. Whether for learning, entertainment, or decision-making, animal wheels provide an interactive and engaging way to explore animals.
                  </p>

                  <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-6 mb-8 border-l-4 border-green-500">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      What is an Animal Wheel Spinner?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      An <strong>animal wheel spinner</strong> is a fun, interactive tool designed to randomly select an animal from a set of options. These tools are often shaped like a <strong>spinning animal wheel</strong> where each section represents a different animal. Users can <strong>spin the wheel animal</strong> or <strong>animal spin the wheel</strong> to get an unpredictable result.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      These spinners can be digital, as in a <strong>random animal generator wheel</strong>, or physical, like a toy <strong>animal wheel spinner wheel</strong>. Some even include images, known as <strong>animal spinning wheel with pictures</strong>, making it ideal for kids and classrooms.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Types of Animal Wheel Spinners
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-green-100 dark:border-green-900">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 text-2xl">
                        💻
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Digital Animal Spinners
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        Online options like <strong>animal spinner online</strong>, <strong>animal wheel spinner online</strong>, or <strong>animal spin wheel generator</strong> are easy to use.
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Random animal wheel spinner for quick selection</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Animal spinner random for games or learning</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Animal spin wheel game for interactive activities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-blue-100 dark:border-blue-900">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4 text-2xl">
                        🎡
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Physical Animal Spinners
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        These include <strong>animal wheel spinner toys</strong> or <strong>animal wheel spinner wheels</strong> that kids can physically spin.
                      </p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Farm animal wheel spinner</strong> – chickens, cows, pigs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Pet wheel spinner</strong> – cats, dogs, hamsters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Cute animal wheel spinner</strong> – cartoon animals</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-yellow-100 dark:border-yellow-900">
                      <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4 text-2xl">
                        🔗
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        Hybrid Spinners
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        Some toys integrate QR codes linking to a <strong>random animal generator wheel online</strong>, combining tactile and digital experiences.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    How Animal Wheels Work
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    An <strong>animal spin wheel</strong> works by dividing a circle into multiple sections, each representing an animal. When you <strong>spin the wheel animal</strong>, it slows down gradually until it lands on a random section.
                  </p>

                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Elements:</h4>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🎲</span>
                        <div>
                          <strong>Randomization</strong> – ensures each animal has an equal chance
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🖼️</span>
                        <div>
                          <strong>Visual appeal</strong> – some feature <strong>animal spinning wheel with pictures</strong> for recognition
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🎮</span>
                        <div>
                          <strong>Interactivity</strong> – encourages users to <strong>animals spin the wheel</strong> repeatedly
                        </div>
                      </li>
                    </ul>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 italic">
                      <strong>Technical note:</strong> Digital spinners like <strong>animal spin wheel generator</strong> use pseudo-random algorithms to select an animal each time, while physical spinners rely on momentum and friction.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Popular Uses for Animal Spin Wheels
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-900/20 dark:to-gray-800 p-6 rounded-xl border border-green-200 dark:border-green-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        Education
                      </h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Teachers use <strong>animal wheel to spin</strong> for lessons</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Teaching animal names and sounds</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Introducing farm or exotic animals</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Storytelling prompts</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎮</span>
                        Games and Entertainment
                      </h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Animal spin wheel game</strong> for parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Spin the wheel animal</strong> challenges for kids</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span><strong>Animal wheel spin</strong> as a board game element</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-white dark:from-yellow-900/20 dark:to-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        Decision-Making
                      </h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">✓</span>
                          <span>Randomly choosing a pet to draw or discuss</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">✓</span>
                          <span>Selecting animals for virtual classroom activities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎬</span>
                        Content Creation
                      </h4>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">✓</span>
                          <span><strong>Animal spinner online</strong> can help YouTubers, educators, and TikTok creators with random animal challenges</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Features to Look for in an Animal Wheel Spinner
                  </h3>

                  <div className="overflow-x-auto mb-8">
                    <table className="w-full border-collapse bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                      <thead>
                        <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                          <th className="px-6 py-4 text-left font-bold">Feature</th>
                          <th className="px-6 py-4 text-left font-bold">What to Consider</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Number of Animals
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Does it allow dozens of options or only a few?
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Customization
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Can you add your own animals?
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Visuals
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Are there images, like <strong>animal spinning wheel with pictures</strong>?
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Digital vs Physical
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Some prefer <strong>animal wheel spinner online</strong>, others a toy <strong>animal wheel spinner</strong>
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Interactivity
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            Can kids <strong>animals spin the wheel</strong> themselves?
                          </td>
                        </tr>
                        <tr className="hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Theme Options
                          </td>
                          <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                            <strong>Farm animal wheel spinner</strong>, <strong>pet wheel spinner</strong>, or <strong>cute animal wheel spinner</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Online vs. Physical Animal Wheels
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-6 rounded-xl border-2 border-green-300 dark:border-green-700">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        💻 Online Animal Spinner
                      </h4>
                      <div className="mb-4">
                        <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros:</p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Instant randomization</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Easy to share</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Supports many animals, including rare ones</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons:</p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>Requires a device and internet</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>Less tactile fun</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-xl border-2 border-yellow-300 dark:border-yellow-700">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        🎡 Physical Animal Wheel Spinner
                      </h4>
                      <div className="mb-4">
                        <p className="font-semibold text-green-600 dark:text-green-400 mb-2">Pros:</p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Tactile, hands-on experience</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Can be played anywhere</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>Great for classroom or party use</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-red-600 dark:text-red-400 mb-2">Cons:</p>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>Limited number of animals</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 mt-1">✗</span>
                            <span>Less flexible than digital</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Farm Animal Wheel Spinner vs. Pet Wheel Spinner
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-green-200 dark:border-green-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-3xl">🐄</span>
                        Farm Animal Wheel Spinner
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Focused on barnyard animals like cows, pigs, chickens, and sheep.
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Perfect for:</p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Teaching children about agriculture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Farm-themed parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Educational activities</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-blue-200 dark:border-blue-800">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <span className="text-3xl">🐶</span>
                        Pet Wheel Spinner
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        Covers domestic pets like dogs, cats, birds, or hamsters.
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white mb-2">Ideal for:</p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span>Pet education</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span>Home fun</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">✓</span>
                          <span>Virtual pet games</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Both types enhance learning through interactive play and allow users to <strong>spin the wheel animal</strong> multiple times for variety.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Cute Animal Wheel Spinner Ideas
                  </h3>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8">
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🎨</span>
                        <span>Cartoon animals for toddlers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🌴</span>
                        <span>Jungle animal themes</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🌊</span>
                        <span>Ocean animal wheels for aquatic lessons</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-2xl">🎄</span>
                        <span>Seasonal or holiday-themed <strong>animal wheel spin</strong></span>
                      </li>
                    </ul>
                    <p className="text-gray-700 dark:text-gray-300 mt-4 italic">
                      These <strong>cute animal wheel spinner</strong> ideas are especially effective in classrooms, parties, or online content creation.
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    How to Create Your Own Animal Spinner
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Select animals
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Farm animals, pets, or wild animals
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Divide the wheel into sections
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          For each animal
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Add images
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Optional but increases engagement
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Choose a spin mechanism
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Physical arrow or digital spin
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          Test for randomness
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          Ensure fair selection
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    This DIY approach allows for a <strong>random animal wheel</strong>, <strong>spinning animal wheel</strong>, or <strong>animal wheel spinner toy</strong> unique to your needs.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    FAQs About Animal Wheel Spinners
                  </h3>

                  <div className="space-y-6">
                    <div className="border-l-4 border-green-600 pl-6 py-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Q1: What is the difference between an animal wheel spinner and a random animal generator wheel?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>A1:</strong> An <strong>animal wheel spinner</strong> can be physical or digital, often interactive. A <strong>random animal generator wheel</strong> is usually digital and automatically selects an animal. Both serve similar purposes but differ in medium and interactivity.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-6 py-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Q2: Can I use an animal spinner online for classroom activities?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>A2:</strong> Yes, <strong>animal spinner online</strong> is perfect for education, storytelling, and quizzes. It supports multiple animals and randomization.
                      </p>
                    </div>

                    <div className="border-l-4 border-yellow-600 pl-6 py-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Q3: Are there toys for spinning animals?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>A3:</strong> Yes, <strong>animal wheel spinner toy</strong> and <strong>animal wheel spinner wheel</strong> options exist for tactile play. Some include <strong>animal spinning wheel with pictures</strong> for added engagement.
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-6 py-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Q4: How do farm animal wheel spinners differ from pet wheel spinners?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong>A4:</strong> <strong>Farm animal wheel spinner</strong> focuses on barnyard creatures, while <strong>pet wheel spinner</strong> focuses on domestic animals like cats and dogs. Both are used for educational and entertainment purposes.
                      </p>
                    </div>

                    <div className="border-l-4 border-pink-600 pl-6 py-2">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Q5: What are creative uses of a cute animal wheel spinner?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        <strong>A5:</strong>
                      </p>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300 ml-4">
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">✓</span>
                          <span>Birthday parties</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">✓</span>
                          <span>Virtual classroom challenges</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">✓</span>
                          <span>Social media content creation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-pink-500 mt-1">✓</span>
                          <span>Storytelling prompts</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-12 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white text-center shadow-xl">
                      <h3 className="text-2xl font-bold mb-3">🔗 Related Wheel Games</h3>
                      <p className="mb-4 opacity-90">Explore more exciting wheel spinner games!</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <Link 
                          href="/games/anime-character-wheel"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Anime Character Wheel
                        </Link>
                        <Link 
                          href="/games/aesthetic-wheel-spinner"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Aesthetic Wheel
                        </Link>
                        <Link 
                          href="/games/age-generator-wheel"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                        >
                          Age Generator
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl p-8 mt-12">
                    <h3 className="text-2xl font-bold mb-4">
                      Conclusion
                    </h3>
                    <p className="text-lg leading-relaxed mb-4">
                      An <strong>animal wheel spinner</strong> is more than just a toy or game—it's an interactive learning tool that combines fun and education. Whether you choose a <strong>farm animal wheel spinner</strong>, a <strong>pet wheel spinner</strong>, or a <strong>cute animal wheel spinner</strong>, the concept of spinning for a random result engages children and adults alike.
                    </p>
                    <p className="text-lg leading-relaxed">
                      From digital <strong>animal spinner online</strong> generators to physical <strong>animal wheel spinner toy</strong> wheels, the versatility ensures it remains popular in classrooms, parties, and at home. The <strong>random animal wheel</strong>, <strong>animal spin wheel game</strong>, and <strong>animal generator wheel</strong> options cater to educators, parents, and content creators alike.
                    </p>
                  </div>

                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
