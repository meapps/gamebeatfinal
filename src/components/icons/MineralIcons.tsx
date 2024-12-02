import React from 'react';
import { Diamond, CircleDollarSign, Coins, Gem } from 'lucide-react';
import { MineralType } from '../../types/game';

interface MineralIconProps {
  type: MineralType;
  size?: string;
}

export const MineralIcon: React.FC<MineralIconProps> = ({ type, size = 'w-8 h-8' }) => {
  switch (type) {
    case 'red':
      return <Diamond className={`${size} text-red-500`} />;
    case 'green':
      return <Gem className={`${size} text-emerald-400`} />;
    case 'gold':
      return <CircleDollarSign className={`${size} text-yellow-400`} />;
    case 'silver':
      return <Coins className={`${size} text-gray-300`} />;
    default:
      return null;
  }
};