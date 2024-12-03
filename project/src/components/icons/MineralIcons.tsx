import React, { useState } from 'react';
import { CircleDollarSign, Diamond, Coins, AlertCircle } from 'lucide-react';
import { MineralType } from '../../types/game';

interface MineralIconProps {
  type: MineralType;
  size?: string;
}

const MINERAL_IMAGES: Record<MineralType, { src: string; alt: string }> = {
  red: { src: '/redcrystal.png', alt: 'Red Crystal' },
  green: { src: '/diamond_green.png', alt: 'Green Diamond' },
  gold: { src: '/gold.png', alt: 'Gold' },
  silver: { src: '/silver.png', alt: 'Silver' },
  empty: { src: '', alt: '' }
};

const FALLBACK_ICONS: Record<MineralType, React.ReactNode> = {
  red: (size: string) => <Diamond className={`${size} text-red-500`} />,
  green: (size: string) => <Diamond className={`${size} text-emerald-500`} />,
  gold: (size: string) => <CircleDollarSign className={`${size} text-yellow-400`} />,
  silver: (size: string) => <Coins className={`${size} text-gray-300`} />,
  empty: () => null
};

export const MineralIcon: React.FC<MineralIconProps> = ({ type, size = 'w-8 h-8' }) => {
  const [imageError, setImageError] = useState(false);

  // Safety check for invalid type
  if (!type || !MINERAL_IMAGES[type]) {
    console.warn(`Invalid mineral type: ${type}`);
    return <AlertCircle className={`${size} text-gray-400`} />;
  }

  // Return early for empty type
  if (type === 'empty') {
    return null;
  }

  // If image failed to load, use fallback icon
  if (imageError) {
    return FALLBACK_ICONS[type](size);
  }

  const { src, alt } = MINERAL_IMAGES[type];

  return (
    <img 
      src={src}
      alt={alt}
      className={`${size} object-contain`}
      onError={() => setImageError(true)}
    />
  );
};