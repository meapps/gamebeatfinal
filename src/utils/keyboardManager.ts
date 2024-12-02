import { generateNewSeed, setSeed } from './seedManager';

export const handleKeyboardShortcuts = (
  e: KeyboardEvent,
  callbacks: {
    onRevealAll: () => void;
    onVictory: () => void;
  }
) => {
  if (!e.altKey) return;

  switch (e.key.toLowerCase()) {
    case 'r':
      callbacks.onRevealAll();
      break;
    case 'v':
      callbacks.onVictory();
      break;
  }
};