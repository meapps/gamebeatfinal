export type MineralType = 'empty' | 'silver' | 'gold' | 'green' | 'red';

export interface Cell {
  type: MineralType;
  isRevealed: boolean;
  isExploding: boolean;
}

export interface GameState {
  grid: Cell[][];
  score: number;
  gameOver: boolean;
  hasWon: boolean;
}

export interface HighScore {
  playerName: string;
  score: number;
  date: string;
}

export interface GameSettings {
  gridSize: number;
  mineralProbabilities: {
    [key in MineralType]: number;
  };
}

export const DEFAULT_SETTINGS: GameSettings = {
  gridSize: 10,
  mineralProbabilities: {
    empty: 0.5,
    silver: 0.2,
    gold: 0.15,
    green: 0.1,
    red: 0.05,
  }
};