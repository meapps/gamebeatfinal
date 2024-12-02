import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Repeat } from 'lucide-react';
import Confetti from 'react-confetti';

interface WinPopupProps {
  score: number;
  onRestart: () => void;
}

export const WinPopup: React.FC<WinPopupProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={true}
        numberOfPieces={200}
      />
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-8 rounded-xl shadow-2xl text-center max-w-md mx-4"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block mb-4"
        >
          <Trophy className="w-16 h-16 text-white" />
        </motion.div>
        <h2 className="text-4xl font-bold text-white mb-4">Victory!</h2>
        <p className="text-yellow-100 text-xl mb-6">
          Amazing! You've collected all safe minerals!
        </p>
        <p className="text-2xl font-bold text-white mb-8">
          Final Score: {score}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-white text-yellow-600 px-6 py-3 rounded-full font-bold text-lg
            shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2 mx-auto"
        >
          <Repeat className="w-5 h-5" />
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};