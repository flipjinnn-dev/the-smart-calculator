'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WheelSlice } from '@/types/wheel-spinner';
import { Trash2, Copy, GripVertical } from 'lucide-react';

interface SortableSliceItemProps {
  slice: WheelSlice;
  slicesLength: number;
  onUpdate: (id: string, updates: Partial<WheelSlice>) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}

export const SortableSliceItem = ({
  slice,
  slicesLength,
  onUpdate,
  onDuplicate,
  onRemove,
}: SortableSliceItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: slice.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 ${
        isDragging ? 'shadow-lg z-10' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="mt-2 cursor-move touch-none"
        >
          <GripVertical size={18} className="text-gray-400" />
        </div>

        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={slice.label}
            onChange={(e) => onUpdate(slice.id, { label: e.target.value })}
            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />

          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Color:</label>
              <input
                type="color"
                value={slice.color}
                onChange={(e) => onUpdate(slice.id, { color: e.target.value })}
                className="w-10 h-8 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Text:</label>
              <input
                type="color"
                value={slice.textColor}
                onChange={(e) => onUpdate(slice.id, { textColor: e.target.value })}
                className="w-10 h-8 rounded cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-1">
              <label className="text-xs text-gray-600 dark:text-gray-400">Size:</label>
              <input
                type="number"
                value={slice.fontSize}
                onChange={(e) => onUpdate(slice.id, { fontSize: parseInt(e.target.value) })}
                min="8"
                max="32"
                className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <select
              value={slice.fontFamily}
              onChange={(e) => onUpdate(slice.id, { fontFamily: e.target.value })}
              className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>

            <button
              onClick={() => onUpdate(slice.id, { 
                fontWeight: slice.fontWeight === 'bold' ? 'normal' : 'bold' 
              })}
              className={`px-3 py-1 text-sm rounded ${
                slice.fontWeight === 'bold'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              B
            </button>

            <button
              onClick={() => onUpdate(slice.id, { 
                fontStyle: slice.fontStyle === 'italic' ? 'normal' : 'italic' 
              })}
              className={`px-3 py-1 text-sm rounded italic ${
                slice.fontStyle === 'italic'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              I
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <button
            onClick={() => onDuplicate(slice.id)}
            className="p-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded hover:bg-blue-200 dark:hover:bg-blue-800"
            title="Duplicate"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={() => onRemove(slice.id)}
            disabled={slicesLength <= 2}
            className="p-2 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
