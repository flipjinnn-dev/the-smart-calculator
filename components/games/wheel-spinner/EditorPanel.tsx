'use client';

import { useState } from 'react';
import { WheelSlice } from '@/types/wheel-spinner';
import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { Trash2, Copy, GripVertical, Plus, Download, Upload, RotateCcw, Undo, Redo } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableSliceItem } from './SortableSliceItem';

export const EditorPanel = () => {
  const {
    slices,
    addSlice,
    removeSlice,
    updateSlice,
    duplicateSlice,
    reorderSlices,
    clearAllSlices,
    importSlices,
    bulkAddSlices,
    reset,
    undo,
    redo,
    history,
  } = useWheelSpinnerStore();

  const [bulkText, setBulkText] = useState('');
  const [showBulkAdd, setShowBulkAdd] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = slices.findIndex((slice) => slice.id === active.id);
      const newIndex = slices.findIndex((slice) => slice.id === over.id);

      const newSlices = arrayMove(slices, oldIndex, newIndex);
      reorderSlices(newSlices);
    }
  };

  const handleBulkAdd = () => {
    const lines = bulkText
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    if (lines.length > 0) {
      bulkAddSlices(lines);
      setBulkText('');
      setShowBulkAdd(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = JSON.stringify(slices, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wheel-slices.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    const csv = ['Label,Color,TextColor,FontSize,FontFamily,FontWeight,FontStyle']
      .concat(
        slices.map(slice =>
          `"${slice.label}",${slice.color},${slice.textColor},${slice.fontSize},${slice.fontFamily},${slice.fontWeight},${slice.fontStyle}`
        )
      )
      .join('\n');
    
    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'wheel-slices.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        if (Array.isArray(imported) && imported.length >= 2) {
          importSlices(imported);
        }
      } catch (error) {
        console.error('Failed to import JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Editor</h2>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={undo}
            disabled={history.past.length === 0}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={redo}
            disabled={history.future.length === 0}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo size={18} />
          </button>
          <button
            onClick={reset}
            className="p-2 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            title="Reset to Default"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={addSlice}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            <Plus size={18} />
            Add Slice
          </button>
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowBulkAdd(!showBulkAdd)}
            className="flex-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Bulk Add
          </button>
          <button
            onClick={clearAllSlices}
            className="flex-1 px-3 py-2 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded hover:bg-red-200 dark:hover:bg-red-800"
          >
            Clear All
          </button>
        </div>

        {showBulkAdd && (
          <div className="mb-4">
            <textarea
              value={bulkText}
              onChange={(e) => setBulkText(e.target.value)}
              placeholder="Enter one option per line..."
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={5}
            />
            <button
              onClick={handleBulkAdd}
              className="w-full mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add All
            </button>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleExportJSON}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Download size={16} />
            JSON
          </button>
          <button
            onClick={handleExportCSV}
            className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Download size={16} />
            CSV
          </button>
          <label className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer">
            <Upload size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Total Slices: {slices.length}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={slices.map(s => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {slices.map((slice) => (
                <SortableSliceItem
                  key={slice.id}
                  slice={slice}
                  slicesLength={slices.length}
                  onUpdate={updateSlice}
                  onDuplicate={duplicateSlice}
                  onRemove={removeSlice}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
