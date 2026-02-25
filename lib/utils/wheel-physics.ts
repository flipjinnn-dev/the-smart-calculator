import { WheelSlice } from '@/types/wheel-spinner';

export interface SpinConfig {
  minSpins: number;
  maxSpins: number;
  duration: number;
  easing: (t: number) => number;
}

export const DEFAULT_SPIN_CONFIG: SpinConfig = {
  minSpins: 5,
  maxSpins: 8,
  duration: 7000,
  easing: (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  },
};

export const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

export const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

export const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export const easeInOutCubic = (t: number): number => {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const customSpinEase = (t: number): number => {
  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  return t < 0.5
    ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
    : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
};

export const calculateSpinRotation = (
  currentRotation: number,
  config: SpinConfig = DEFAULT_SPIN_CONFIG
): number => {
  const randomSpins = config.minSpins + Math.random() * (config.maxSpins - config.minSpins);
  const randomDegrees = Math.random() * 360;
  const totalRotation = randomSpins * 360 + randomDegrees;
  
  return currentRotation + totalRotation;
};

export const getWinningSlice = (
  finalRotation: number,
  slices: WheelSlice[]
): WheelSlice => {
  const normalizedRotation = ((finalRotation % 360) + 360) % 360;
  const pointerAngle = 0;
  const adjustedAngle = (pointerAngle - normalizedRotation + 360) % 360;
  
  const sliceAngle = 360 / slices.length;
  const winningIndex = Math.floor(adjustedAngle / sliceAngle) % slices.length;
  
  return slices[winningIndex];
};

export const animateSpin = (
  startRotation: number,
  endRotation: number,
  duration: number,
  onUpdate: (rotation: number, progress: number) => void,
  onComplete: () => void,
  easing: (t: number) => number = easeOutExpo
): (() => void) => {
  const startTime = performance.now();
  let animationFrameId: number;
  let lastRotation = startRotation;

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easedProgress = easing(progress);
    const targetRotation = startRotation + (endRotation - startRotation) * easedProgress;
    
    const smoothRotation = lastRotation + (targetRotation - lastRotation) * 0.3;
    lastRotation = smoothRotation;
    
    onUpdate(smoothRotation, progress);
    
    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      onUpdate(endRotation, 1);
      onComplete();
    }
  };

  animationFrameId = requestAnimationFrame(animate);

  return () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };
};

export const createTickSound = (): HTMLAudioElement | null => {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);

    return null;
  } catch (error) {
    console.error('Failed to create tick sound:', error);
    return null;
  }
};

export const playTickSound = () => {
  createTickSound();
};

export const calculateTickInterval = (slices: WheelSlice[]): number => {
  const sliceAngle = 360 / slices.length;
  return sliceAngle;
};
