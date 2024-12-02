import React from 'react';
import { Cell, MineralType } from '../types/game';
import { MineralIcon } from './icons/MineralIcons';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface MineralStatsProps {
  grid: Cell[][];
  showStats: boolean;
  onToggleStats: () => void;
}

export const MineralStats: React.FC<MineralStatsProps> = ({ grid, showStats, onToggleStats }) => {
  const calculateRemainingMinerals = () => {
    const counts: Record<MineralType, number> = {
      empty: 0,
      silver: 0,
      gold: 0,
      green: 0,
      red: 0
    };

    grid.forEach(row => {
      row.forEach(cell => {
        if (!cell.isRevealed) {
          counts[cell.type]++;
        }
      });
    });

    return counts;
  };

  const counts = calculateRemainingMinerals();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2"
    >
      <button
        onClick={onToggleStats}
        className="mb-2 p-2 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title={showStats ? "Hide mineral stats" : "Show mineral stats"}
      >
        {showStats ? (
          <EyeOff className="w-6 h-6 text-gray-400" />
        ) : (
          <Eye className="w-6 h-6 text-gray-400" />
        )}
      </button>

      {showStats && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 p-4 rounded-lg shadow-lg space-y-3"
        >
          <h3 className="text-white font-semibold text-sm mb-4">Remaining Minerals</h3>
          
          {Object.entries(counts).map(([type, count]) => (
            <div key={type} className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center">
                <MineralIcon type={type as MineralType} />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 capitalize text-sm">{type}</span>
                <span className="text-white font-bold">{count}</span>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};