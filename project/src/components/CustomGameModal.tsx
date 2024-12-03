import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, X, Save } from 'lucide-react';
import { GameSettings, MineralType, DEFAULT_SETTINGS } from '../types/game';

interface CustomGameModalProps {
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
  onClose: () => void;
}

export const CustomGameModal: React.FC<CustomGameModalProps> = ({
  settings: initialSettings,
  onSave,
  onClose,
}) => {
  const [settings, setSettings] = useState<GameSettings>(initialSettings);

  const handleProbabilityChange = (type: MineralType, value: number) => {
    const newProbabilities = {
      ...settings.mineralProbabilities,
      [type]: value / 100,
    };

    // Normalize probabilities to sum to 1
    const total = Object.values(newProbabilities).reduce((a, b) => a + b, 0);
    const normalizedProbabilities = Object.fromEntries(
      Object.entries(newProbabilities).map(([key, value]) => [key, value / total])
    );

    setSettings({
      ...settings,
      mineralProbabilities: normalizedProbabilities,
    });
  };

  const handleSave = () => {
    onSave(settings);
    onClose();
  };

  const handleReset = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full"
      >
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Custom Game Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Grid Size
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={settings.gridSize}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  gridSize: parseInt(e.target.value),
                })
              }
              className="w-full"
            />
            <div className="text-gray-400 text-sm mt-1">
              {settings.gridSize} x {settings.gridSize}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-300">
              Mineral Distribution
            </label>
            {Object.entries(settings.mineralProbabilities).map(([type, prob]) => (
              <div key={type} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400 capitalize">{type}</span>
                  <span className="text-gray-500">{Math.round(prob * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(prob * 100)}
                  onChange={(e) =>
                    handleProbabilityChange(
                      type as MineralType,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};