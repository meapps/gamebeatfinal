import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Hash, X, Save, RefreshCw } from 'lucide-react';

interface SeedMenuProps {
  currentSeed: number;
  onSaveSeed: (seed: number) => void;
  onClose: () => void;
}

export const SeedMenu: React.FC<SeedMenuProps> = ({
  currentSeed,
  onSaveSeed,
  onClose,
}) => {
  const [seed, setSeed] = useState(currentSeed.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSeed = parseInt(seed);
    if (!isNaN(newSeed)) {
      onSaveSeed(newSeed);
    }
  };

  const generateRandomSeed = () => {
    const newSeed = Math.floor(Math.random() * 1000000);
    setSeed(newSeed.toString());
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
            <Hash className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Seed Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Game Seed
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-lg
                  focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter seed number"
              />
              <button
                type="button"
                onClick={generateRandomSeed}
                className="p-2 bg-gray-700 text-gray-400 rounded-lg hover:text-white
                  hover:bg-gray-600 transition-colors"
                title="Generate random seed"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-400">
              Use the same seed to generate identical mineral layouts
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg
                hover:bg-purple-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Apply Seed
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};