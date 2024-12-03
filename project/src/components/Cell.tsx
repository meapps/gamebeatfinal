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
  const getCellBackground = () => {
    if (!cell?.type) return 'bg-gray-700'; // Fallback for invalid cell
    if (cell.isExploding) return 'bg-orange-500 animate-pulse';
    if (!cell.isRevealed) return 'bg-transparent';
    
    const backgrounds: Record<CellType['type'], string> = {
      red: 'bg-red-900/20',
      green: 'bg-emerald-900/20',
      gold: 'bg-yellow-900/20',
      silver: 'bg-gray-800/20',
      empty: 'bg-gray-700/20'
    };

    return backgrounds[cell.type] || 'bg-gray-700/20';
  };

  const handleHover = () => {
    if (!cell?.isRevealed) {
      playSound.swipe();
      onHover();
    }
  };

  const iconSize = size === 'w-8 h-8' ? 'w-5 h-5' : 'w-8 h-8';

  // Safety check for invalid cell
  if (!cell) {
    return (
      <div className={`${size} border border-gray-800 bg-gray-700 cursor-not-allowed`} />
    );
  }

  return (
    <div
      className={`${size} border border-gray-800 ${getCellBackground()} 
        cursor-pointer transition-all duration-200 hover:opacity-90 hover:scale-105
        flex items-center justify-center touch-none relative`}
      onMouseEnter={handleHover}
      onTouchStart={handleHover}
      onClick={onClick}
    >
      {!cell.isRevealed && (
        <img 
          src="/cells.png"
          alt="Hidden cell"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.classList.add('bg-gray-700');
          }}
        />
      )}
      {cell.isRevealed && cell.type !== 'empty' && (
        <MineralIcon type={cell.type} size={iconSize} />
      )}
    </div>
  );
};