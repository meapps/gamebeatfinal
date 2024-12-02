import React from 'react';
import { Cell as CellType } from '../types/game';
import { MineralIcon } from './icons/MineralIcons';
import { playSound } from '../utils/audioManager';

interface CellProps {
  cell: CellType;
  onHover: () => void;
  onClick: () => void;
  size: string;
}

export const Cell: React.FC<CellProps> = ({ cell, onHover, onClick, size }) => {
  const getCellColor = () => {
    if (cell.isExploding) return 'bg-orange-500 animate-pulse';
    if (!cell.isRevealed) return 'bg-gray-700';
    
    switch (cell.type) {
      case 'red': return 'bg-red-900/20';
      case 'green': return 'bg-emerald-900/20';
      case 'gold': return 'bg-yellow-900/20';
      case 'silver': return 'bg-gray-800/20';
      default: return 'bg-gray-200';
    }
  };

  const handleHover = () => {
    if (!cell.isRevealed) {
      playSound.swipe();
      onHover();
    }
  };

  const iconSize = size === 'w-8 h-8' ? 'w-5 h-5' : 'w-8 h-8';

  return (
    <div
      className={`${size} border border-gray-800 ${getCellColor()} 
        cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105
        flex items-center justify-center touch-none`}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      onClick={onClick}
    >
      {cell.isRevealed && cell.type !== 'empty' && (
        <MineralIcon type={cell.type} size={iconSize} />
      )}
    </div>
  );
};