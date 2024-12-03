import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { HighScore } from '../types/game';

interface LeaderboardProps {
  scores: HighScore[];
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ scores, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-gray-800 rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">High Scores</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-4">
          {scores.length === 0 ? (
            <p className="text-gray-400 text-center py-4">No high scores yet!</p>
          ) : (
            <div className="space-y-2">
              {scores.map((score, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/20' :
                    index === 1 ? 'bg-gray-500/20' :
                    index === 2 ? 'bg-orange-800/20' :
                    'bg-gray-700/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-gray-400 w-8">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-white">{score.playerName}</p>
                      <p className="text-sm text-gray-400">
                        {new Date(score.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-yellow-400">
                    {score.score}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};