import React, { useState, useEffect } from 'react';
import { Shield, Gem, Trophy, RotateCcw, Settings, Grid as GridIcon, Hash } from 'lucide-react';
import Grid from './components/Grid';
import { WinPopup } from './components/popups/WinPopup';
import { LosePopup } from './components/popups/LosePopup';
import { WelcomePopup } from './components/popups/WelcomePopup';
import { Leaderboard } from './components/Leaderboard';
import { CustomGameModal } from './components/CustomGameModal';
import { PlayerName } from './components/PlayerName';
import { MineralStats } from './components/MineralStats';
import { SeedMenu } from './components/SeedMenu';
import { GameState, HighScore, GameSettings, DEFAULT_SETTINGS } from './types/game';
import { createInitialGrid, calculateScore, triggerChainExplosion, checkWinCondition, revealAllCells } from './utils/gameLogic';
import { getHighScores, addHighScore } from './utils/storage';
import { setSeed, getSeed, generateNewSeed } from './utils/seedManager';
import { playSound, initAudio } from './utils/audioManager';
import { handleKeyboardShortcuts } from './utils/keyboardManager';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    grid: createInitialGrid(DEFAULT_SETTINGS),
    score: 0,
    gameOver: false,
    hasWon: false
  });
  const [showWelcome, setShowWelcome] = useState(true);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCustomGame, setShowCustomGame] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSeedMenu, setShowSeedMenu] = useState(false);
  const [highScores, setHighScores] = useState<HighScore[]>([]);
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setHighScores(getHighScores());

    // Initialize audio system on first mount
    const handleFirstInteraction = () => {
      initAudio();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    const handleKeyDown = (e: KeyboardEvent) => {
      handleKeyboardShortcuts(e, {
        onRevealAll: () => {
          setGameState(prev => ({
            ...prev,
            grid: revealAllCells(prev.grid)
          }));
        },
        onVictory: () => {
          setGameState(prev => ({
            ...prev,
            hasWon: true
          }));
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const handleCellHover = (i: number, j: number) => {
    const cell = gameState.grid[i][j];
    if (cell.isRevealed || gameState.gameOver || gameState.hasWon) return;

    switch (cell.type) {
      case 'empty':
        playSound.empty();
        break;
      case 'silver':
        playSound.silver();
        break;
      case 'gold':
        playSound.gold();
        break;
      case 'green':
      case 'red':
        playSound.danger();
        break;
    }
  };

  const handleCellClick = (i: number, j: number) => {
    if (gameState.gameOver || gameState.hasWon) return;

    const cell = gameState.grid[i][j];
    if (cell.isRevealed) return;

    if (cell.type === 'red' || cell.type === 'green') {
      playSound.explosion();
      const newGrid = triggerChainExplosion(gameState.grid, i, j);
      
      setGameState({
        ...gameState,
        grid: newGrid,
        gameOver: true,
        hasWon: false
      });

      addHighScore(gameState.score);
      setHighScores(getHighScores());
      return;
    }

    const newGrid = [...gameState.grid];
    newGrid[i][j].isRevealed = true;
    const newScore = gameState.score + calculateScore(cell.type);

    const hasWon = checkWinCondition(newGrid);
    if (hasWon) {
      playSound.victory();
      addHighScore(newScore);
      setHighScores(getHighScores());
    }

    setGameState({
      grid: newGrid,
      score: newScore,
      gameOver: false,
      hasWon
    });
  };

  const resetGame = (useDefaultSettings: boolean = false) => {
    generateNewSeed();
    const gameSettings = useDefaultSettings ? DEFAULT_SETTINGS : settings;
    if (useDefaultSettings) {
      setSettings(DEFAULT_SETTINGS);
    }
    setGameState({
      grid: createInitialGrid(gameSettings),
      score: 0,
      gameOver: false,
      hasWon: false
    });
  };

  const handleSaveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
    generateNewSeed();
    setGameState({
      grid: createInitialGrid(newSettings),
      score: 0,
      gameOver: false,
      hasWon: false
    });
  };

  const handleSaveSeed = (newSeed: number) => {
    setSeed(newSeed);
    setGameState({
      grid: createInitialGrid(settings),
      score: 0,
      gameOver: false,
      hasWon: false
    });
  };

  if (showWelcome) {
    return <WelcomePopup onStart={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="text-center mb-4 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4 flex items-center justify-center gap-2">
          <Gem className="w-6 h-6 sm:w-8 sm:h-8" /> GemBeat <Shield className="w-6 h-6 sm:w-8 sm:h-8" />
        </h1>
        <div className="mb-2 sm:mb-4">
          <PlayerName />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-2">
          <p className="text-gray-300 text-sm sm:text-base">Score: {gameState.score}</p>
          <button
            onClick={() => setShowSeedMenu(true)}
            className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm hover:text-gray-300 transition-colors"
          >
            <Hash className="w-3 h-3 sm:w-4 sm:h-4" />
            Seed: {getSeed()}
          </button>
          <button
            onClick={() => resetGame(true)}
            className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 bg-green-600/20 text-green-400 rounded-lg
              hover:bg-green-600/30 transition-colors text-sm sm:text-base"
          >
            <GridIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            Default
          </button>
          <button
            onClick={() => setShowCustomGame(true)}
            className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 bg-purple-600/20 text-purple-400 rounded-lg
              hover:bg-purple-600/30 transition-colors text-sm sm:text-base"
          >
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
            Custom
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 bg-yellow-600/20 text-yellow-400 rounded-lg
              hover:bg-yellow-600/30 transition-colors text-sm sm:text-base"
          >
            <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
            Scores
          </button>
          <button
            onClick={() => resetGame(false)}
            className="flex items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 bg-blue-600/20 text-blue-400 rounded-lg
              hover:bg-blue-600/30 transition-colors text-sm sm:text-base"
          >
            <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
            Reset
          </button>
        </div>
      </div>

      <Grid
        grid={gameState.grid}
        onCellHover={handleCellHover}
        onCellClick={handleCellClick}
      />

      <MineralStats
        grid={gameState.grid}
        showStats={showStats}
        onToggleStats={() => setShowStats(!showStats)}
      />

      <div className="mt-4 sm:mt-8 text-gray-400 text-xs sm:text-sm">
        <p>Hover/touch cells to detect minerals</p>
        <p>Click to reveal - but beware of dangerous materials!</p>
      </div>

      {gameState.hasWon && (
        <WinPopup score={gameState.score} onRestart={() => resetGame(false)} />
      )}

      {gameState.gameOver && !gameState.hasWon && (
        <LosePopup score={gameState.score} onRestart={() => resetGame(false)} />
      )}

      {showLeaderboard && (
        <Leaderboard
          scores={highScores}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {showCustomGame && (
        <CustomGameModal
          settings={settings}
          onSave={handleSaveSettings}
          onClose={() => setShowCustomGame(false)}
        />
      )}

      {showSeedMenu && (
        <SeedMenu
          currentSeed={getSeed()}
          onSaveSeed={handleSaveSeed}
          onClose={() => setShowSeedMenu(false)}
        />
      )}
    </div>
  );
}

export default App;