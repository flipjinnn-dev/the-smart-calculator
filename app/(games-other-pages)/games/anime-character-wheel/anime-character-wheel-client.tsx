'use client';

import { useEffect, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { ModernWheelSpinner } from '@/components/games/wheel-spinner/ModernWheelSpinner';
import { EditorPanel } from '@/components/games/wheel-spinner/EditorPanel';
import { SettingsPanel } from '@/components/games/wheel-spinner/SettingsPanel';
import { Menu, X, Share2, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const ANIME_CHARACTERS = [
  'Naruto Uzumaki', 'Sasuke Uchiha', 'Monkey D. Luffy', 'Levi Ackerman',
  'Tanjiro Kamado', 'Gojo Satoru', 'Goku', 'Izuku Midoriya',
  'Eren Yeager', 'Light Yagami', 'L Lawliet', 'Edward Elric',
  'Spike Spiegel', 'Vegeta', 'Kakashi Hatake', 'Itachi Uchiha',
  'Roronoa Zoro', 'Killua Zoldyck', 'Gon Freecss', 'Saitama'
];

export default function AnimeCharacterWheelClient() {
  const { theme, loadFromLocalStorage, slices, settings, importSlices, updateSlice } = useWheelSpinnerStore();
  const [showEditor, setShowEditor] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    loadFromLocalStorage();
    
    if (!isInitialized) {
      const animeSlices = ANIME_CHARACTERS.map((character, index) => ({
        id: `anime-${index}`,
        label: character,
        color: getAnimeColor(index),
        textColor: '#FFFFFF',
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 'bold' as const,
        fontStyle: 'normal' as const,
      }));
      
      importSlices(animeSlices);
      setIsInitialized(true);
    }
  }, [loadFromLocalStorage, isInitialized, importSlices]);

  const getAnimeColor = (index: number) => {
    const colors = [
      '#FF6B35', '#F7931E', '#FDC830', '#37B7C3', '#088395',
      '#071952', '#9B59B6', '#E74C3C', '#3498DB', '#1ABC9C',
      '#F39C12', '#D35400', '#C0392B', '#8E44AD', '#2980B9',
      '#16A085', '#27AE60', '#F1C40F', '#E67E22', '#E74C3C'
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
        title: 'Anime Character Wheel',
        text: 'Check out my anime character wheel!',
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
      <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-purple-100 dark:from-gray-900 dark:via-orange-900 dark:to-gray-900 transition-colors duration-200">
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg border-b border-orange-300 dark:border-gray-700 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowEditor(!showEditor)}
                  className="p-2 bg-orange-200 dark:bg-orange-900 rounded-lg hover:bg-orange-300 dark:hover:bg-orange-800 md:hidden transition-colors shadow-sm"
                >
                  {showEditor ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-md">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Anime Character Wheel
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Spin Random Anime Picks</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="p-2 md:p-3 bg-orange-100 dark:bg-orange-900 rounded-full hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors shadow-sm"
                  title="Share Wheel"
                >
                  <Share2 size={20} className="md:w-6 md:h-6 text-orange-700 dark:text-orange-200" />
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
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900 rounded-full mb-4">
                  <Sparkles className="w-5 h-5 text-orange-600 dark:text-orange-300" />
                  <span className="text-sm font-semibold text-orange-600 dark:text-orange-300">
                    Spin to Discover Random Anime Characters
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  Random Anime Character Picker
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Use the anime character wheel to randomly select characters from your favorite anime series. Perfect for games, content creation, and challenges.
                </p>
              </div>

              <ModernWheelSpinner />

              <div className="mt-12 mb-8">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white text-center shadow-xl">
                  <h3 className="text-2xl font-bold mb-3">🔗 Related Wheel Games</h3>
                  <p className="mb-4 opacity-90">Explore more exciting wheel spinner games!</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                    <Link 
                      href="/games/animal-wheel-spinner"
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 transition-all transform hover:scale-105 font-semibold"
                    >
                      Animal Wheel
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-16 prose prose-lg dark:prose-invert max-w-none">
                <article className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-xl">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Zap className="w-8 h-8 text-orange-600" />
                    Anime Character Wheel – Spin, Create & Discover Random Anime Characters Instantly
                  </h2>
                  
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Looking for a fun and interactive way to pick anime characters at random? An <strong>anime character wheel</strong> is a digital spinning tool that lets you randomly select characters from your favorite anime series. Whether you're playing games, creating content, roleplaying, or just exploring new characters, a <strong>random anime character wheel</strong> makes the process exciting and fair.
                  </p>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    From a <strong>spin the wheel anime characters</strong> tool to a fully customizable <strong>anime character creator wheel</strong>, this guide covers everything you need to know how it works, why it's popular, how to use it effectively, and how to build your own.
                  </p>

                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 mb-8 border-l-4 border-orange-500">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      What Is an Anime Character Wheel?
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      An <strong>anime character wheel</strong> (also known as a <strong>wheel of anime characters</strong>) is a spinning selector tool designed to randomly pick anime characters from a pre-set list. It works like a prize wheel you click to spin, and the pointer lands on a randomly selected name.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 font-semibold mb-3">
                      This tool is commonly used by:
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Anime fans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Content creators</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Streamers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Cosplayers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Roleplayers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Game organizers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Writers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">✓</span>
                        <span>Anime quiz hosts</span>
                      </li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">
                    Why Anime Character Wheels Are So Popular
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Anime communities are highly interactive. Fans love challenges, rankings, debates, and randomizer games. A <strong>random anime character wheel</strong> makes these activities more engaging.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">Here's why it works:</p>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎯</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Fair & Random Selection
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        Instead of arguing about choices, let the <strong>anime characters spin wheel</strong> decide.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🎮</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Perfect for Games & Challenges
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Examples:</p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• "Cosplay whoever the wheel chooses"</li>
                        <li>• "Draw the character you spin"</li>
                        <li>• "Rate the character you land on"</li>
                        <li>• "Make a team of 5 random characters"</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">📺</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Ideal for YouTube & TikTok
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Many anime influencers use a <strong>spin the wheel anime characters</strong> tool for:
                      </p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Power-scaling battles</li>
                        <li>• "Build your squad" challenges</li>
                        <li>• Random ship generators</li>
                        <li>• Guess-the-anime games</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl">🧠</span>
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          Helps Discover New Characters
                        </h4>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        If your wheel includes characters from classics and new-gen anime, you may discover someone from:
                      </p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Naruto</li>
                        <li>• One Piece</li>
                        <li>• Attack on Titan</li>
                        <li>• Demon Slayer: Kimetsu no Yaiba</li>
                        <li>• My Hero Academia</li>
                        <li>• Jujutsu Kaisen</li>
                        <li>• Dragon Ball Z</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    How Does an Anime Character Spin the Wheel Tool Work?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    A typical <strong>anime character spin the wheel</strong> tool works on a simple randomization algorithm:
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        1
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          User clicks "Spin"
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        2
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Wheel rotates with animation
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                        3
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Random selection algorithm triggers
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                        4
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Pointer stops on a character name
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                        5
                      </div>
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">
                          Result is displayed
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Most advanced <strong>anime characters generator wheel</strong> tools allow:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-3 text-gray-700 dark:text-gray-300 mb-8">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Custom character lists</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Image display options</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Duplicate prevention</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Weighted probabilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Sound effects</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">✓</span>
                      <span>Save & share results</span>
                    </li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Types of Anime Character Wheels
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    There are multiple variations depending on your needs.
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="bg-gradient-to-r from-orange-50 to-white dark:from-orange-900/20 dark:to-gray-800 p-6 rounded-xl border-l-4 border-orange-500">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">1️⃣</span>
                        Random Anime Character Wheel
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        Pre-loaded with hundreds of popular anime characters.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Best for:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Quick fun</li>
                        <li>• Content ideas</li>
                        <li>• New anime discovery</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-gray-800 p-6 rounded-xl border-l-4 border-red-500">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">2️⃣</span>
                        Anime Character Creator Wheel
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        This version allows you to build your own custom list.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">You can:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1 mb-3">
                        <li>• Add specific characters</li>
                        <li>• Create themed wheels (villains only, female leads, swordsmen, etc.)</li>
                        <li>• Save different versions</li>
                      </ul>
                      <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">Great for:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Writers</li>
                        <li>• RPG players</li>
                        <li>• Roleplay communities</li>
                      </ul>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 p-6 rounded-xl border-l-4 border-purple-500">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">3️⃣</span>
                        Anime Picker Wheel
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        A simplified version used mainly for quick decision-making.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        Example: "Which character should I draw today?"
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-800 p-6 rounded-xl border-l-4 border-blue-500">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">4️⃣</span>
                        Spinning Wheel Anime Characters for Streaming
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Streamers often use OBS-compatible versions that:
                      </p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Show dynamic animations</li>
                        <li>• Include character images</li>
                        <li>• Display background music</li>
                        <li>• Add suspense effects</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Popular Anime Characters Commonly Found on Wheels
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Here are examples of characters often included in a <strong>wheel of anime characters</strong>:
                  </p>
                  <div className="grid md:grid-cols-3 gap-3 mb-8">
                    {[
                      'Naruto Uzumaki', 'Sasuke Uchiha', 'Monkey D. Luffy',
                      'Levi Ackerman', 'Tanjiro Kamado', 'Gojo Satoru',
                      'Goku', 'Izuku Midoriya', 'Eren Yeager',
                      'Light Yagami', 'L Lawliet', 'Edward Elric'
                    ].map((char, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg p-3 shadow text-center">
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{char}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Including popular and niche characters makes your <strong>anime characters spin wheel</strong> more exciting and unpredictable.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    How to Use an Anime Character Generator Wheel Effectively
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Here's a strategic approach if you're using a <strong>random anime character generator wheel</strong> for content creation:
                  </p>

                  <div className="space-y-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                        Define Your Goal
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Are you:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Making a YouTube short?</li>
                        <li>• Doing a cosplay challenge?</li>
                        <li>• Creating an OC crossover?</li>
                        <li>• Hosting a debate?</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                        Filter by Category
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Create custom wheels like:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Villains only</li>
                        <li>• Female leads</li>
                        <li>• Shonen protagonists</li>
                        <li>• Isekai characters</li>
                        <li>• Swordsmen</li>
                        <li>• Magic users</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                        Set Rules
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Example:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Spin 3 times → build a team</li>
                        <li>• Spin 1 time → must draw within 1 hour</li>
                        <li>• Spin until you get a villain</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                        Document Results
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">Track outcomes for:</p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Fairness analysis</li>
                        <li>• Statistical patterns</li>
                        <li>• Content variety</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Benefits of Using a Spin Wheel Anime Characters Tool
                  </h3>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        Eliminates Bias
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Random selection ensures fairness.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        Boosts Creativity
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Writers can use it to:
                      </p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Generate crossover story ideas</li>
                        <li>• Develop character mashups</li>
                        <li>• Create alternate universes</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        Enhances Community Engagement
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Great for:
                      </p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Discord servers</li>
                        <li>• Reddit challenges</li>
                        <li>• Anime clubs</li>
                        <li>• Live streams</li>
                      </ul>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="text-2xl">✅</span>
                        Educational Use
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Anime clubs can use it for:
                      </p>
                      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Character analysis sessions</li>
                        <li>• Power scaling debates</li>
                        <li>• Story structure discussions</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Common Use Cases
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-6 border-l-4 border-orange-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🎥</span>
                        YouTube Challenge Format
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        "Build the strongest anime team with 5 spins"
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-l-4 border-purple-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🎭</span>
                        Cosplay Challenge
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        "Cosplay whoever the <strong>anime character spin the wheel</strong> picks"
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-l-4 border-blue-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🎨</span>
                        Art Prompt
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        "Draw the character chosen by the <strong>random anime character wheel</strong>"
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-xl p-6 border-l-4 border-green-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">🧩</span>
                        Debate Format
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        "Villain battle – <strong>spin wheel anime characters</strong> edition"
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 border-l-4 border-yellow-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                        <span className="text-2xl">📚</span>
                        Fanfiction Generator
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Spin 3 characters → Write a crossover story
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Frequently Asked Questions
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-orange-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        What is the best anime character wheel online?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        The best tool depends on features. Look for: Large database, Custom wheel support, Smooth animations, Mobile compatibility, No forced ads
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-red-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Is a random anime character generator wheel truly random?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Most tools use pseudo-random algorithms. While not cryptographically secure, they are statistically fair for entertainment use.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Can I create my own anime characters spin wheel?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes. Many tools allow custom entry lists, making it easy to build an <strong>anime character creator wheel</strong>.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Is it safe for kids?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes, as long as the character list avoids mature content.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        Can I embed a wheel of anime characters on my website?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Yes, using HTML/JS or iframe embedding.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-yellow-500">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        How many characters should I add?
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">
                        Ideal range:
                      </p>
                      <ul className="text-gray-700 dark:text-gray-300 space-y-1">
                        <li>• Small wheel: 20–30 characters</li>
                        <li>• Medium wheel: 50–100 characters</li>
                        <li>• Large database: 300+ characters</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 mt-12">
                    Who Should Use an Anime Picker Wheel?
                  </h3>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: '🎨', text: 'Anime fans' },
                      { icon: '📺', text: 'Streamers' },
                      { icon: '🎬', text: 'TikTok creators' },
                      { icon: '🎭', text: 'Cosplayers' },
                      { icon: '✍️', text: 'Writers' },
                      { icon: '🎮', text: 'Game hosts' },
                      { icon: '💬', text: 'Discord moderators' },
                      { icon: '🏫', text: 'Anime club organizers' },
                      { icon: '📚', text: 'Teachers teaching storytelling' }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                        <span className="text-2xl">{item.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-4">
                      Ready to Spin Your Anime Adventure?
                    </h3>
                    <p className="text-lg mb-6 opacity-90">
                      Use the wheel above to discover random anime characters and create your next challenge!
                    </p>
                    <div className="flex justify-center">
                      <Link 
                        href="/games"
                        className="px-8 py-4 bg-white text-orange-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Explore More Games
                      </Link>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>

        {!showEditor && isMobile && (
          <button
            onClick={() => setShowEditor(true)}
            className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-2xl hover:shadow-3xl z-30 transform hover:scale-110 transition-all"
          >
            <Menu size={24} />
          </button>
        )}
      </div>
    </div>
  );
}
