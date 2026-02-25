'use client';

import { useWheelSpinnerStore } from '@/lib/stores/wheel-spinner-store';
import { Settings, Volume2, VolumeX } from 'lucide-react';
import { useState } from 'react';

export const SettingsPanel = () => {
  const { settings, updateSettings } = useWheelSpinnerStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow-sm"
        title="Settings"
      >
        <Settings size={24} className="text-gray-700 dark:text-gray-200" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border-2 border-gray-300 dark:border-gray-700 p-4 z-50">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Wheel Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Border Width: {settings.borderWidth}px
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={settings.borderWidth}
                onChange={(e) => updateSettings({ borderWidth: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Border Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.borderColor}
                  onChange={(e) => updateSettings({ borderColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.borderColor}
                  onChange={(e) => updateSettings({ borderColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Background Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pointer Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.pointerColor}
                  onChange={(e) => updateSettings({ pointerColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.pointerColor}
                  onChange={(e) => updateSettings({ pointerColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pointer Shape
              </label>
              <select
                value={settings.pointerShape}
                onChange={(e) => updateSettings({ pointerShape: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="triangle">Triangle</option>
                <option value="arrow">Arrow</option>
                <option value="circle">Circle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spin Button Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={settings.spinButtonColor}
                  onChange={(e) => updateSettings({ spinButtonColor: e.target.value })}
                  className="w-16 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.spinButtonColor}
                  onChange={(e) => updateSettings({ spinButtonColor: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spin Button Text
              </label>
              <input
                type="text"
                value={settings.spinButtonText}
                onChange={(e) => updateSettings({ spinButtonText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Sound Effects
              </label>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`p-2 rounded ${
                  settings.soundEnabled
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Tick Sound
              </label>
              <button
                onClick={() => updateSettings({ tickSoundEnabled: !settings.tickSoundEnabled })}
                className={`p-2 rounded ${
                  settings.tickSoundEnabled
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {settings.tickSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};
