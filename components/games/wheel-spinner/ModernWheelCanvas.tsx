'use client';

import { useEffect, useRef, useState } from 'react';
import { WheelSlice, WheelSettings } from '@/types/wheel-spinner';

interface ModernWheelCanvasProps {
  slices: WheelSlice[];
  settings: WheelSettings;
  rotation: number;
  isSpinning: boolean;
}

export const ModernWheelCanvas = ({
  slices,
  settings,
  rotation,
  isSpinning,
}: ModernWheelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth * 0.85, 600);
      setCanvasSize(size);
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (canvas.width / 2) - 30;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((rotation * Math.PI) / 180);

    const sliceAngle = (2 * Math.PI) / slices.length;

    slices.forEach((slice, index) => {
      const startAngle = index * sliceAngle - Math.PI / 2;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      gradient.addColorStop(0, lightenColor(slice.color, 20));
      gradient.addColorStop(1, slice.color);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.strokeStyle = settings.borderColor;
      ctx.lineWidth = settings.borderWidth;
      ctx.stroke();

      ctx.save();
      const textAngle = startAngle + sliceAngle / 2;
      ctx.rotate(textAngle + Math.PI / 2);

      ctx.fillStyle = slice.textColor;
      ctx.font = `${slice.fontStyle} ${slice.fontWeight} ${slice.fontSize}px ${slice.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      const textRadius = radius * 0.65;
      ctx.fillText(slice.label, 0, -textRadius);

      ctx.restore();
    });

    ctx.restore();

    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.12, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.strokeStyle = settings.borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.08, 0, 2 * Math.PI);
    const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 0.08);
    centerGradient.addColorStop(0, '#F0F0F0');
    centerGradient.addColorStop(1, '#D0D0D0');
    ctx.fillStyle = centerGradient;
    ctx.fill();

    drawModernPointer(ctx, centerX, centerY, radius, settings);
  }, [slices, rotation, settings]);

  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  const drawModernPointer = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    settings: WheelSettings
  ) => {
    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    const gradient = ctx.createLinearGradient(0, -radius - 50, 0, -radius - 10);
    gradient.addColorStop(0, lightenColor(settings.pointerColor, 20));
    gradient.addColorStop(1, settings.pointerColor);
    ctx.fillStyle = gradient;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 2;

    if (settings.pointerShape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(0, -radius - 8);
      ctx.lineTo(-22, -radius - 45);
      ctx.lineTo(22, -radius - 45);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (settings.pointerShape === 'arrow') {
      ctx.beginPath();
      ctx.moveTo(0, -radius - 8);
      ctx.lineTo(-18, -radius - 38);
      ctx.lineTo(-10, -radius - 38);
      ctx.lineTo(-10, -radius - 55);
      ctx.lineTo(10, -radius - 55);
      ctx.lineTo(10, -radius - 38);
      ctx.lineTo(18, -radius - 38);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(0, -radius - 28, 18, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  };

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        className="mx-auto drop-shadow-2xl"
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          willChange: 'transform',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      />
      {isSpinning && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full rounded-full border-4 border-transparent border-t-white/30 animate-spin" style={{ animationDuration: '1s' }}></div>
        </div>
      )}
    </div>
  );
};
