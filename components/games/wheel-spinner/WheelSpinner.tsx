'use client';

import { useEffect, useRef, useState } from 'react';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { WheelCanvas } from './WheelCanvas';
import { animateSpin, calculateSpinRotation, getWinningSlice, playTickSound, calculateTickInterval } from '@/lib/utils/wheel-physics';
import { WheelSlice } from '@/types/wheel-spinner';

export const WheelSpinner = () => {
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
  const lastTickAngleRef = useRef(0);
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
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className="relative cursor-pointer select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{ backgroundColor: settings.backgroundColor }}
      >
        <WheelCanvas
          slices={slices}
          settings={settings}
          rotation={rotation}
          isSpinning={isSpinning}
        />
      </div>

      <button
        onClick={handleSpin}
        disabled={isSpinning || slices.length < 2}
        className="mt-6 px-8 py-4 text-xl font-bold text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        style={{ backgroundColor: settings.spinButtonColor }}
      >
        {isSpinning ? 'SPINNING...' : settings.spinButtonText}
      </button>

      {showResult && selectedSlice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              🎉 Winner! 🎉
            </h2>
            <div
              className="p-6 rounded-lg mb-6 text-center"
              style={{ backgroundColor: selectedSlice.color }}
            >
              <p
                className="text-3xl font-bold"
                style={{ color: selectedSlice.textColor }}
              >
                {selectedSlice.label}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResult(false)}
                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setTimeout(handleSpin, 100);
                }}
                className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 font-medium"
                style={{ backgroundColor: settings.spinButtonColor }}
              >
                Spin Again
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>Click the button or swipe on the wheel to spin</p>
      </div>
    </div>
  );
};
