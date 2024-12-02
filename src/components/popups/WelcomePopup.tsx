import React from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, MousePointer, HandMetal, Gem, Shield } from 'lucide-react';

interface WelcomePopupProps {
  onStart: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full"
      >
        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gem className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
              <h1 className="text-3xl sm:text-4xl font-bold text-white">GemBeat</h1>
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm sm:text-base">
              A musical mineral exploration game
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">How to Play</h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p>Use sound cues to detect different minerals. Each mineral type has a unique sound!</p>
                </div>
                <div className="flex items-start gap-3">
                  <MousePointer className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p>Hover over cells to hear the sounds and identify minerals.</p>
                </div>
                <div className="flex items-start gap-3">
                  <HandMetal className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                  <p>Click to reveal minerals, but be careful of dangerous ones!</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Mineral Types:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <li className="text-yellow-400">• Gold (100 points)</li>
                <li className="text-gray-300">• Silver (50 points)</li>
                <li className="text-gray-400">• Empty (5 points)</li>
                <li className="text-emerald-400">• Green Diamond (Dangerous!)</li>
                <li className="text-red-400">• Red Crystal (Dangerous!)</li>
              </ul>
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm">
                <span className="text-yellow-400 font-semibold">Tip:</span> Start from the corners and edges for safer exploration. Listen carefully to the sounds to identify valuable minerals!
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-4 px-6
              font-bold text-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Play className="w-5 h-5" />
            Start Playing
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};