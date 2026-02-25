'use client';

import { useEffect, useRef, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { ModernWheelCanvas } from './ModernWheelCanvas';
import { animateSpin, calculateSpinRotation, getWinningSlice, playTickSound, calculateTickInterval } from '@/lib/utils/wheel-physics';
import { Sparkles } from 'lucide-react';

export const ModernWheelSpinner = () => {
  const {
    slices,
    settings,
    isSpinning,
    selectedSlice,
    rotation,
    setIsSpinning,
    setSelectedSlice,
    setRotation,
  } = useWheelSpinnerStore();

  const [showResult, setShowResult] = useState(false);
  const cancelSpinRef = useRef<(() => void) | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleSpin = () => {
    if (isSpinning || slices.length < 2) return;

    setIsSpinning(true);
    setShowResult(false);
    setSelectedSlice(null);

    const targetRotation = calculateSpinRotation(rotation);
    const duration = 5000;

    let lastAngle = rotation % 360;
    const sliceAngle = calculateTickInterval(slices);

    const cancel = animateSpin(
      rotation,
      targetRotation,
      duration,
      (currentRotation, progress) => {
        setRotation(currentRotation);

        if (settings.tickSoundEnabled && progress > 0.1) {
          const currentAngle = currentRotation % 360;
          const angleDiff = Math.abs(currentAngle - lastAngle);
          
          if (angleDiff >= sliceAngle * 0.8) {
            playTickSound();
            lastAngle = currentAngle;
          }
        }
      },
      () => {
        const winner = getWinningSlice(targetRotation, slices);
        setSelectedSlice(winner);
        setIsSpinning(false);
        setShowResult(true);

        if (settings.soundEnabled) {
          playWinSound();
        }
      }
    );

    cancelSpinRef.current = cancel;
  };

  const playWinSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 523.25;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.error('Failed to play win sound:', error);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSpinning) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSpinning || !touchStartRef.current) return;
    
    const touch = e.changedTouches[0];
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    if (Math.abs(deltaY) > 50) {
      handleSpin();
    }
    
    touchStartRef.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isSpinning) return;
    touchStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (isSpinning || !touchStartRef.current) return;
    
    const deltaY = e.clientY - touchStartRef.current.y;
    
    if (Math.abs(deltaY) > 50) {
      handleSpin();
    }
    
    touchStartRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (cancelSpinRef.current) {
        cancelSpinRef.current();
      }
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      <div
        className="relative cursor-pointer select-none transition-transform hover:scale-[1.02]"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ 
          backgroundColor: settings.backgroundColor,
          borderRadius: '50%',
          padding: '20px'
        }}
      >
        <ModernWheelCanvas
          slices={slices}
          settings={settings}
          rotation={rotation}
          isSpinning={isSpinning}
        />
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning || slices.length < 2}
        className="mt-8 px-12 py-5 text-2xl font-bold text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
        style={{ backgroundColor: settings.spinButtonColor }}
      >
        <span className="relative z-10 flex items-center gap-3">
          {isSpinning ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              SPINNING...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              {settings.spinButtonText}
              <Sparkles className="w-6 h-6" />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </button>

      {showResult && selectedSlice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-in zoom-in duration-300">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Winner!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The wheel has chosen...
              </p>
            </div>
            
            <div
              className="p-8 rounded-2xl mb-6 text-center transform hover:scale-105 transition-transform shadow-lg"
              style={{ backgroundColor: selectedSlice.color }}
            >
              <p
                className="text-4xl font-bold break-words"
                style={{ color: selectedSlice.textColor }}
              >
                {selectedSlice.label}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowResult(false)}
                className="flex-1 px-6 py-4 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setTimeout(handleSpin, 100);
                }}
                className="flex-1 px-6 py-4 text-white rounded-xl hover:opacity-90 font-semibold transition-all shadow-lg hover:shadow-xl"
                style={{ backgroundColor: settings.spinButtonColor }}
              >
                Spin Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Click the button or swipe on the wheel to spin
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Ready to spin</span>
        </div>
      </div>
    </div>
  );
};
