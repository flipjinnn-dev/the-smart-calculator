'use client';

import { useEffect, useRef, useState } from 'react';
import { WheelSlice, WheelSettings } from '@/types/wheel-spinner';

interface WheelCanvasProps {
  slices: WheelSlice[];
  settings: WheelSettings;
  rotation: number;
  isSpinning: boolean;
  onSpinComplete?: (winningSlice: WheelSlice) => void;
  onRotationChange?: (rotation: number) => void;
}

export const WheelCanvas = ({
  slices,
  settings,
  rotation,
  isSpinning,
  onSpinComplete,
  onRotationChange,
}: WheelCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize, setCanvasSize] = useState(500);

  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth * 0.9, 500);
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
    const radius = (canvas.width / 2) - 20;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

      ctx.fillStyle = slice.color;
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

      const textRadius = radius * 0.7;
      ctx.fillText(slice.label, 0, -textRadius);

      ctx.restore();
    });

    ctx.restore();

    drawPointer(ctx, centerX, centerY, radius, settings);
  }, [slices, rotation, settings]);

  const drawPointer = (
    ctx: CanvasRenderingContext2D,
    centerX: number,
    centerY: number,
    radius: number,
    settings: WheelSettings
  ) => {
    ctx.save();
    ctx.translate(centerX, centerY);

    ctx.fillStyle = settings.pointerColor;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;

    if (settings.pointerShape === 'triangle') {
      ctx.beginPath();
      ctx.moveTo(0, -radius - 10);
      ctx.lineTo(-20, -radius - 40);
      ctx.lineTo(20, -radius - 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else if (settings.pointerShape === 'arrow') {
      ctx.beginPath();
      ctx.moveTo(0, -radius - 10);
      ctx.lineTo(-15, -radius - 35);
      ctx.lineTo(-8, -radius - 35);
      ctx.lineTo(-8, -radius - 50);
      ctx.lineTo(8, -radius - 50);
      ctx.lineTo(8, -radius - 35);
      ctx.lineTo(15, -radius - 35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(0, -radius - 25, 15, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    ctx.restore();
  };

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize}
      height={canvasSize}
      className="mx-auto"
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};
