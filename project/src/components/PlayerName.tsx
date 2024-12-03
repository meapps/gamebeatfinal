import React, { useState, useEffect } from 'react';
import { User, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const PlayerName: React.FC = () => {
  const [playerName, setPlayerName] = useState('Anonymous');
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(playerName);

  useEffect(() => {
    const savedName = localStorage.getItem('mineralExplorer_playerName');
    if (savedName) {
      setPlayerName(savedName);
      setTempName(savedName);
    }
  }, []);

  const handleSave = () => {
    const trimmedName = tempName.trim();
    const finalName = trimmedName || 'Anonymous';
    setPlayerName(finalName);
    localStorage.setItem('mineralExplorer_playerName', finalName);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setTempName(playerName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <User className="w-5 h-5 text-gray-400" />
      {isEditing ? (
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="relative"
        >
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            maxLength={20}
            autoFocus
            className="bg-gray-700 text-white px-3 py-1 rounded-lg outline-none
              focus:ring-2 focus:ring-blue-500 w-40"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">
            ↵
          </div>
        </motion.div>
      ) : (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(true)}
          className="group flex items-center gap-2 px-3 py-1 rounded-lg
            hover:bg-gray-700 transition-colors"
        >
          <span className="text-white">{playerName}</span>
          <Edit2 className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
      )}
    </div>
  );
};