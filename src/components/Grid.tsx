import React from 'react';
import { Cell } from './Cell';
import { Cell as CellType } from '../types/game';
import { Smartphone, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface GridProps {
  grid: CellType[][];
  onCellHover: (i: number, j: number) => void;
  onCellClick: (i: number, j: number) => void;
}

export const Grid: React.FC<GridProps> = ({ grid, onCellHover, onCellClick }) => {
  const [isMobileMode, setIsMobileMode] = React.useState(window.innerWidth < 768);

  const cellSize = isMobileMode ? 'w-8 h-8' : 'w-12 h-12';
  const gridGap = isMobileMode ? 'gap-0.5' : 'gap-1';

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMode(!isMobileMode)}
        className="absolute -top-28 right-0 flex items-center gap-2 px-3 py-2 bg-gray-700 
          rounded-lg text-gray-300 hover:bg-gray-600 transition-colors"
      >
        {isMobileMode ? (
          <>
            <Monitor className="w-4 h-4" />
            <span className="text-sm">Desktop Mode</span>
          </>
        ) : (
          <>
            <Smartphone className="w-4 h-4" />
            <span className="text-sm">Mobile Mode</span>
          </>
        )}
      </motion.button>

      <div className={`grid ${gridGap} p-4 bg-gray-800 rounded-lg shadow-xl`}>
        {grid.map((row, i) => (
          <div key={i} className={`flex ${gridGap}`}>
            {row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                cell={cell}
                onHover={() => onCellHover(i, j)}
                onClick={() => onCellClick(i, j)}
                size={cellSize}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;