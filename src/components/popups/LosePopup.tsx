import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Repeat } from 'lucide-react';

interface LosePopupProps {
  score: number;
  onRestart: () => void;
}

export const LosePopup: React.FC<LosePopupProps> = ({ score, onRestart }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        initial={{ y: -1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-gradient-to-br from-red-500 to-red-700 p-8 rounded-xl shadow-2xl text-center max-w-md mx-4"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="inline-block mb-4"
        >
          <Skull className="w-16 h-16 text-white" />
        </motion.div>
        <motion.h2
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Game Over!
        </motion.h2>
        <p className="text-red-100 text-xl mb-6">
          You've triggered a dangerous mineral!
        </p>
        <p className="text-2xl font-bold text-white mb-8">
          Final Score: {score}
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="bg-white text-red-600 px-6 py-3 rounded-full font-bold text-lg
            shadow-lg hover:shadow-xl transition-shadow duration-200 flex items-center justify-center gap-2 mx-auto"
        >
          <Repeat className="w-5 h-5" />
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};