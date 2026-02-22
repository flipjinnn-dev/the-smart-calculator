'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Hammer, Pause, Play, RotateCcw, Maximize, Volume2, VolumeX } from 'lucide-react';

const COLUMN_COUNT = 5;
const MAX_STACK_HEIGHT = 10;
const COIN_VALUES = [1, 2, 3, 4, 5, 6, 7];
const COIN_COLORS = {
  1: '#FFD700',
  2: '#FF4444',
  3: '#44FF44',
  4: '#4444FF',
  5: '#FF44FF',
  6: '#44FFFF',
  7: '#FFA500',
};

const DIFFICULTY_SETTINGS = {
  easy: { name: 'Easy', initialCoins: 3, maxLevel: 3, hammerCount: 5, startingCoins: 300 },
  medium: { name: 'Medium', initialCoins: 4, maxLevel: 5, hammerCount: 3, startingCoins: 200 },
  hard: { name: 'Hard', initialCoins: 5, maxLevel: 7, hammerCount: 2, startingCoins: 150 },
};

type Coin = {
  value: number;
  id: string;
};

type Column = Coin[];
type Difficulty = keyof typeof DIFFICULTY_SETTINGS;

type GameState = {
  columns: Column[];
  score: number;
  coins: number;
  selectedColumn: number | null;
  selectedCoins: Coin[];
  selectedStartIndex: number;
  hammerCount: number;
  isPaused: boolean;
  level: number;
  moves: number;
  difficulty: Difficulty;
};

export default function SortCoinsGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const [gameState, setGameState] = useState<GameState>({
    columns: [],
    score: 0,
    coins: 200,
    selectedColumn: null,
    selectedCoins: [],
    selectedStartIndex: -1,
    hammerCount: 3,
    isPaused: false,
    level: 3,
    moves: 0,
    difficulty: 'medium',
  });

  const [hammerMode, setHammerMode] = useState(false);

  const playSound = (type: 'click' | 'merge' | 'error' | 'success') => {
    if (!soundEnabled) return;
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
      case 'click':
        oscillator.frequency.value = 400;
        gainNode.gain.value = 0.1;
        break;
      case 'merge':
        oscillator.frequency.value = 600;
        gainNode.gain.value = 0.15;
        break;
      case 'error':
        oscillator.frequency.value = 200;
        gainNode.gain.value = 0.1;
        break;
      case 'success':
        oscillator.frequency.value = 800;
        gainNode.gain.value = 0.15;
        break;
    }
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const initializeGame = useCallback((difficulty: Difficulty) => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    const columns: Column[] = Array(COLUMN_COUNT)
      .fill(null)
      .map(() => []);

    for (let i = 0; i < COLUMN_COUNT; i++) {
      for (let j = 0; j < settings.initialCoins; j++) {
        const value = Math.floor(Math.random() * Math.min(3, settings.maxLevel)) + 1;
        columns[i].push({
          value,
          id: `${i}-${j}-${Date.now()}-${Math.random()}`,
        });
      }
    }

    setGameState({
      columns,
      score: 0,
      coins: settings.startingCoins,
      selectedColumn: null,
      selectedCoins: [],
      selectedStartIndex: -1,
      hammerCount: settings.hammerCount,
      isPaused: false,
      level: settings.maxLevel,
      moves: 0,
      difficulty,
    });
    setHammerMode(false);
    setIsPlaying(true);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      gameContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const getBottomCoinsOfSameValue = (column: Column): { coins: Coin[], startIndex: number } => {
    if (column.length === 0) return { coins: [], startIndex: -1 };
    
    const bottomCoin = column[0];
    const sameValueCoins: Coin[] = [bottomCoin];
    let startIndex = 0;
    
    for (let i = 1; i < column.length; i++) {
      if (column[i].value === bottomCoin.value) {
        sameValueCoins.push(column[i]);
      } else {
        break;
      }
    }
    
    return { coins: sameValueCoins, startIndex };
  };

  const canPlaceCoins = (targetColumn: Column, coins: Coin[]): boolean => {
    if (targetColumn.length + coins.length > MAX_STACK_HEIGHT) return false;
    if (targetColumn.length === 0) return true;
    
    const topCoin = targetColumn[targetColumn.length - 1];
    return topCoin.value === coins[0].value;
  };


  const handleColumnClick = (columnIndex: number) => {
    if (gameState.isPaused) return;

    if (hammerMode) {
      handleHammerUse(columnIndex);
      return;
    }

    const column = gameState.columns[columnIndex];

    if (gameState.selectedColumn === null) {
      if (column.length === 0) return;
      
      const { coins: bottomCoins, startIndex } = getBottomCoinsOfSameValue(column);
      setGameState({
        ...gameState,
        selectedColumn: columnIndex,
        selectedCoins: bottomCoins,
        selectedStartIndex: startIndex,
      });
      playSound('click');
    } else {
      if (gameState.selectedColumn === columnIndex) {
        setGameState({
          ...gameState,
          selectedColumn: null,
          selectedCoins: [],
          selectedStartIndex: -1,
        });
        return;
      }

      if (canPlaceCoins(column, gameState.selectedCoins)) {
        const newColumns = [...gameState.columns];
        const sourceColumn = [...newColumns[gameState.selectedColumn]];
        const targetColumn = [...newColumns[columnIndex]];

        for (let i = 0; i < gameState.selectedCoins.length; i++) {
          sourceColumn.shift();
        }

        targetColumn.push(...gameState.selectedCoins);

        newColumns[gameState.selectedColumn] = sourceColumn;
        newColumns[columnIndex] = targetColumn;

        setGameState({
          ...gameState,
          columns: newColumns,
          selectedColumn: null,
          selectedCoins: [],
          selectedStartIndex: -1,
          moves: gameState.moves + 1,
        });
        playSound('success');
      } else {
        setGameState({
          ...gameState,
          selectedColumn: null,
          selectedCoins: [],
          selectedStartIndex: -1,
        });
        playSound('error');
      }
    }
  };

  const canMergeColumn = (column: Column): boolean => {
    if (column.length === 0) return false;
    
    const firstValue = column[0].value;
    if (firstValue >= COIN_VALUES[COIN_VALUES.length - 1]) return false;
    
    return column.every(coin => coin.value === firstValue) && column.length >= 5;
  };

  const handleMerge = () => {
    if (gameState.isPaused) return;

    const newColumns = gameState.columns.map(column => {
      if (canMergeColumn(column)) {
        const newValue = column[0].value + 1;
        const mergeCount = Math.floor(column.length / 5);
        const newCoins: Coin[] = [];
        
        for (let i = 0; i < mergeCount * 2; i++) {
          newCoins.push({
            value: newValue,
            id: `merged-${Date.now()}-${Math.random()}`,
          });
        }
        
        const remainingCoins = column.slice(mergeCount * 5);
        
        return [...remainingCoins, ...newCoins];
      }
      return column;
    });

    const mergedColumns = newColumns.filter((col, idx) => 
      JSON.stringify(col) !== JSON.stringify(gameState.columns[idx])
    ).length;

    if (mergedColumns > 0) {
      setGameState({
        ...gameState,
        columns: newColumns,
        score: gameState.score + mergedColumns * 10,
        selectedColumn: null,
        selectedCoins: [],
      });
      playSound('merge');
    }
  };

  const handleDeal = () => {
    if (gameState.isPaused || gameState.coins < 10) return;

    const newColumns = gameState.columns.map(column => {
      if (column.length >= MAX_STACK_HEIGHT) return column;
      
      const maxLevel = Math.min(gameState.level, COIN_VALUES.length - 1);
      const value = Math.floor(Math.random() * maxLevel) + 1;
      
      return [
        ...column,
        {
          value,
          id: `deal-${Date.now()}-${Math.random()}`,
        },
      ];
    });

    setGameState({
      ...gameState,
      columns: newColumns,
      coins: gameState.coins - 10,
      selectedColumn: null,
      selectedCoins: [],
      selectedStartIndex: -1,
    });
    playSound('click');
  };

  const handleHammerUse = (columnIndex: number) => {
    if (gameState.hammerCount <= 0) {
      setHammerMode(false);
      return;
    }

    const newColumns = [...gameState.columns];
    newColumns[columnIndex] = [];

    setGameState({
      ...gameState,
      columns: newColumns,
      hammerCount: gameState.hammerCount - 1,
      selectedColumn: null,
      selectedCoins: [],
      selectedStartIndex: -1,
    });
    setHammerMode(false);
    playSound('success');
  };

  const togglePause = () => {
    setGameState({
      ...gameState,
      isPaused: !gameState.isPaused,
    });
  };

  const hasAvailableMoves = (): boolean => {
    for (let i = 0; i < gameState.columns.length; i++) {
      const column = gameState.columns[i];
      if (column.length === 0) continue;
      
      const { coins: bottomCoins } = getBottomCoinsOfSameValue(column);
      
      for (let j = 0; j < gameState.columns.length; j++) {
        if (i === j) continue;
        if (canPlaceCoins(gameState.columns[j], bottomCoins)) {
          return true;
        }
      }
    }
    
    return gameState.columns.some(canMergeColumn);
  };

  return (
    <div ref={gameContainerRef} className="min-h-screen bg-gradient-to-br from-green-800 via-green-700 to-green-900">
      <div className="p-4">
        <div className="max-w-6xl mx-auto">
          {isPlaying && (
          <div className="bg-green-900/50 backdrop-blur-sm rounded-2xl p-4 mb-4 shadow-2xl border-4 border-green-600">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2">
                <Button
                  onClick={togglePause}
                  variant="outline"
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-500"
                >
                  {gameState.isPaused ? <Play className="w-6 h-6" /> : <Pause className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="outline"
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-500"
                >
                  {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
                </Button>
                
                <Button
                  onClick={toggleFullscreen}
                  variant="outline"
                  size="lg"
                  className="bg-gray-700 hover:bg-gray-600 text-white border-2 border-gray-500"
                >
                  <Maximize className="w-6 h-6" />
                </Button>
              </div>

              <div className="flex items-center gap-2 bg-green-800 px-6 py-3 rounded-xl border-2 border-yellow-400">
                <div className="text-left">
                  <div className="text-xs text-yellow-200">Score</div>
                  <div className="text-2xl font-bold text-white">{gameState.score}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-green-800 px-6 py-3 rounded-xl border-2 border-yellow-400">
                <div className="text-left">
                  <div className="text-xs text-yellow-200">Coins</div>
                  <div className="text-2xl font-bold text-white">{gameState.coins}</div>
                </div>
              </div>

              <Button
                onClick={() => setIsPlaying(false)}
                variant="outline"
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white border-2 border-blue-400"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-center gap-2">
              {COIN_VALUES.slice(0, gameState.level).map((value) => (
                <div
                  key={value}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 border-white shadow-lg"
                  style={{ 
                    backgroundColor: COIN_COLORS[value as keyof typeof COIN_COLORS],
                    boxShadow: `0 4px 0 ${COIN_COLORS[value as keyof typeof COIN_COLORS]}99, inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)`
                  }}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          )}

          {isPlaying && (
            <Card className="bg-green-800/80 backdrop-blur-sm p-6 rounded-3xl shadow-2xl border-4 border-green-600">
              <div className="grid grid-cols-5 gap-4 mb-6">
                {gameState.columns.map((column, columnIndex) => (
                  <div
                    key={columnIndex}
                    onClick={() => handleColumnClick(columnIndex)}
                    className={`relative bg-green-700/50 rounded-2xl p-3 min-h-[400px] cursor-pointer transition-all border-4 ${
                      gameState.selectedColumn === columnIndex
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
                        : hammerMode
                        ? 'border-red-400 hover:border-red-300'
                        : 'border-green-500 hover:border-green-400'
                    }`}
                  >
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 text-white font-bold text-sm bg-green-900/70 px-3 py-1 rounded-full">
                      {column.length}/{MAX_STACK_HEIGHT}
                    </div>

                    <div className="flex flex-col-reverse gap-1 mt-8">
                      {column.map((coin, coinIndex) => {
                        const isSelected = gameState.selectedColumn === columnIndex && 
                                         coinIndex < gameState.selectedCoins.length;
                        
                        return (
                          <div
                            key={coin.id}
                            className={`relative w-full h-12 rounded-full flex items-center justify-center text-xl font-bold transition-all border-4 ${
                              isSelected ? 'transform translate-y-2 shadow-lg' : ''
                            }`}
                            style={{
                              backgroundColor: COIN_COLORS[coin.value as keyof typeof COIN_COLORS],
                              borderColor: isSelected ? '#fff' : '#000',
                              boxShadow: `0 4px 0 ${COIN_COLORS[coin.value as keyof typeof COIN_COLORS]}99, inset 0 -3px 6px rgba(0,0,0,0.4), inset 0 3px 6px rgba(255,255,255,0.4)`,
                            }}
                          >
                            <span className="drop-shadow-lg">{coin.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center flex-wrap">
                <Button
                  onClick={handleDeal}
                  disabled={gameState.coins < 10 || gameState.isPaused}
                  size="lg"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-xl px-8 py-6 rounded-xl border-4 border-green-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  DEALS (-10)
                </Button>

                <Button
                  onClick={handleMerge}
                  disabled={!gameState.columns.some(canMergeColumn) || gameState.isPaused}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold text-xl px-8 py-6 rounded-xl border-4 border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  MERGE COINS
                </Button>

                <Button
                  onClick={() => setHammerMode(!hammerMode)}
                  disabled={gameState.hammerCount <= 0 || gameState.isPaused}
                  size="lg"
                  className={`font-bold text-xl px-8 py-6 rounded-xl border-4 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                    hammerMode
                      ? 'bg-gradient-to-r from-red-600 to-red-700 border-red-400'
                      : 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 border-orange-400'
                  }`}
                >
                  <Hammer className="w-6 h-6 mr-2 inline" />
                  HAMMER ({gameState.hammerCount})
                </Button>
              </div>

              {hammerMode && (
                <div className="mt-4 text-center text-yellow-300 font-bold text-lg animate-pulse">
                  Click on a column to clear it with the hammer!
                </div>
              )}

              {!hasAvailableMoves() && !gameState.isPaused && (
                <div className="mt-4 text-center">
                  <div className="bg-red-600 text-white font-bold text-xl px-6 py-3 rounded-xl inline-block border-4 border-red-400">
                    No more moves! Use DEALS or HAMMER
                  </div>
                </div>
              )}

              <div className="mt-6 text-center text-white/70 text-sm">
                <p>Moves: {gameState.moves} • Difficulty: {DIFFICULTY_SETTINGS[gameState.difficulty].name}</p>
                <p className="mt-2">Click to select and move coins • Merge 5+ coins • Use hammer when stuck</p>
              </div>
            </Card>
          )}

          {!isPlaying && (
            <>
              <Card className="bg-gradient-to-br from-green-700 to-green-900 p-8 mb-6 border-4 border-yellow-400 shadow-2xl">
                <div className="text-center">
                  <h1 className="text-5xl font-bold text-yellow-300 mb-4">Sort Coins</h1>
                  <p className="text-white text-lg mb-8">Choose your difficulty level and start sorting!</p>
                  
                  <div className="grid gap-4 mb-8">
                    {(Object.keys(DIFFICULTY_SETTINGS) as Difficulty[]).map((diff) => {
                      const settings = DIFFICULTY_SETTINGS[diff];
                      return (
                        <button
                          key={diff}
                          onClick={() => initializeGame(diff)}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-bold text-2xl py-6 px-8 rounded-xl border-4 border-yellow-300 shadow-lg transform hover:scale-105 transition-all"
                        >
                          <div className="flex items-center justify-between">
                            <span>{settings.name}</span>
                            <span className="text-sm ml-4">
                              {settings.initialCoins} coins • Level {settings.maxLevel} • {settings.hammerCount} hammers
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-green-800/50 p-6 rounded-xl border-2 border-green-500 text-left">
                    <h3 className="text-yellow-300 font-bold text-xl mb-3">How to Play:</h3>
                    <ul className="text-white space-y-2">
                      <li>• <strong>Click</strong> on a column to select bottom coins of same color</li>
                      <li>• <strong>Click another column</strong> to move selected coins there</li>
                      <li>• Stack coins of the <strong>same value</strong> together</li>
                      <li>• <strong>Merge 5+</strong> same coins into higher value coins</li>
                      <li>• Use <strong>DEALS</strong> to add new coins (costs 10 coins)</li>
                      <li>• Use <strong>HAMMER</strong> to clear a column when stuck</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </>)}
          
          {!isPlaying && (
            <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl p-10 shadow-2xl border-2 border-green-200">
              <article className="max-w-4xl mx-auto">
                <h1 className="text-5xl font-extrabold text-green-800 mb-6 text-center">Sort Coins</h1>
                
                <div className="bg-green-100 border-l-4 border-green-600 p-6 mb-8 rounded-r-lg">
                  <p className="text-xl text-gray-800 leading-relaxed">
                    Sort Coins is a popular puzzle category where players organize coins by value, color, or denomination. The main objective of a coin sort game is to group identical coins, plan correct moves, and complete levels. Coin sorting game online experiences are trending because they combine relaxing gameplay with brain training mechanics.
                  </p>
                </div>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">
                    <a href="/games/money-saving" className="hover:text-green-600 transition-colors">Money Saving Game</a>
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-green-600 mb-3">What Is Sort Coins</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">
                        Sort coins refers to organizing coins into proper groups. This concept is used in two ways:
                      </p>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">Real-life coin sorting for money counting</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">Coin sort game as puzzle gameplay</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        In a sorting coins game, players move coins between stacks, slots, or tubes until all coins are correctly grouped.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-green-600 mb-3">What Is a Coin Sort Game</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">A coin sort game is a logic puzzle where:</p>
                      <ul className="list-none space-y-2 ml-4">
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">Coins move from one stack to another</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">Only matching coins can stack together</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">Full stacks may merge into higher value coins</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 mr-2">•</span>
                          <span className="text-gray-700">Planning and strategy are required</span>
                        </li>
                      </ul>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        A coin sorter game provides simple controls but highly engaging gameplay.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-green-600 mb-3">How Coin Sorting Game Works</h3>
                      <p className="text-gray-700 leading-relaxed mb-3">The basic coin sorting game online flow:</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                        <li>Select a coin stack</li>
                        <li>Move it to a matching stack</li>
                        <li>Use empty slots for strategy</li>
                        <li>Complete stacks of identical coins</li>
                        <li>Finish sorting to complete the level</li>
                      </ol>
                      <p className="text-gray-700 leading-relaxed mt-3">
                        Difficulty increases with each level. These mechanics are similar to a <a href="/games/grocery-cashier" className="text-green-600 hover:text-green-700 font-semibold underline">cashier simulator game</a> where players handle money and transactions.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">Types of Coin Sorting Games</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Classic Coin Sort Puzzle</h3>
                      <p className="text-gray-700">Players group coins and complete levels with simple sorting mechanics.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Coin Merge Sort Game</h3>
                      <p className="text-gray-700">Some versions include merge mechanics where identical coins create higher value coins. Variants such as coin sort game ice introduce extra obstacles.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Timed Coin Sorting Game</h3>
                      <p className="text-gray-700">These versions include time limits, making gameplay faster and more challenging.</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md border border-green-200">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Educational Coin Sorting Games</h3>
                      <p className="text-gray-700">Coin sorting games help players understand money counting and denominations. Players who enjoy a <a href="/games/money-counting" className="text-green-600 hover:text-green-700 font-semibold underline">money counting game</a> can also try handling real purchase scenarios.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">Coin Sort Game Online Free</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Coin sort game online free versions usually:</p>
                  <ul className="list-none space-y-2 ml-4 mb-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Run in the browser</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Require no download</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Work on mobile devices</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Provide short casual sessions</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    A coin sort online game is ideal for quick, relaxing gameplay. Many players who enjoy a <a href="/games/money-management" className="text-green-600 hover:text-green-700 font-semibold underline">money management game</a> also prefer coin sorting challenges.
                  </p>
                </section>

                <section className="mb-10 bg-green-50 p-6 rounded-lg border border-green-200">
                  <h2 className="text-3xl font-bold text-green-700 mb-4">Game Parlor Coin Sorting Bank Concept</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">
                    Game parlor coin sorting bank style gameplay expands beyond sorting. Players can:
                  </p>
                  <ul className="list-none space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Earn coins</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Unlock tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Open new slots</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-gray-700">Experience money management mechanics</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    This combines puzzle and management gameplay.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">Benefits of Coin Sorting Games</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Brain Training</h3>
                      <p className="text-gray-700">
                        Coin sorting games improve logic and pattern recognition. These skills connect closely with a <a href="/games/mental-math" className="text-green-600 hover:text-green-700 font-semibold underline">mental math game</a> focused on quick calculations.
                      </p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Planning Skills</h3>
                      <p className="text-gray-700">Players must think ahead and manage space carefully.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Relaxing Gameplay</h3>
                      <p className="text-gray-700">Sorting coins game offers a calm casual experience.</p>
                    </div>

                    <div className="bg-white p-5 rounded-lg shadow-sm border-l-4 border-green-500">
                      <h3 className="text-xl font-semibold text-green-600 mb-2">Educational Value</h3>
                      <p className="text-gray-700">Coin sorting games help with money counting and financial basics.</p>
                    </div>
                  </div>
                </section>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">How to Sort Coins (Real Life)</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Steps to sort coins:</p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 ml-4">
                    <li>Separate coins by country</li>
                    <li>Group by denomination</li>
                    <li>Stack or roll coins</li>
                    <li>Count totals</li>
                    <li>Store or deposit</li>
                  </ol>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    Real-life coin sorting improves financial organization.
                  </p>
                </section>

                <section className="mb-10">
                  <h2 className="text-3xl font-bold text-green-700 mb-4 border-b-2 border-green-300 pb-2">Why Coin Sort Game Is Popular</h2>
                  <p className="text-gray-700 leading-relaxed mb-3">Coin sort game popularity comes from:</p>
                  <ul className="list-none space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Simple controls</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Relaxing puzzle mechanics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Merge gameplay trends</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Educational value</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-gray-700">Strong mobile usage</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed mt-3">
                    This is why coin sorting game online search demand continues to grow.
                  </p>
                </section>

                <section className="bg-gradient-to-r from-green-100 to-green-50 p-8 rounded-xl border-2 border-green-300">
                  <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">FAQs Sort Coins</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">What is sort coins game</h4>
                      <p className="text-gray-700">A puzzle where coins are arranged into matching stacks.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">Is coin sort game online free</h4>
                      <p className="text-gray-700">Yes, most versions are free and browser based.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">What is coin sorter game</h4>
                      <p className="text-gray-700">A logic puzzle focused on organizing coins correctly.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">Are coin sorting games educational</h4>
                      <p className="text-gray-700">Yes, they help with counting money and logic skills.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">What is coin sort game ice</h4>
                      <p className="text-gray-700">A themed version with additional obstacles.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">How to sort coins fast</h4>
                      <p className="text-gray-700">Separate by denomination first, then stack and count.</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="font-bold text-green-700 text-lg mb-2">Is coin sorting game good for kids</h4>
                      <p className="text-gray-700">Yes, educational versions are useful for kids.</p>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
