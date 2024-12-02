import { Cell, MineralType, GameSettings } from '../types/game';
import { seededRandom, resetRandom } from './seedManager';

export function createInitialGrid(settings: GameSettings): Cell[][] {
  const grid: Cell[][] = [];
  
  for (let i = 0; i < settings.gridSize; i++) {
    grid[i] = [];
    for (let j = 0; j < settings.gridSize; j++) {
      const random = seededRandom();
      let type: MineralType = 'empty';
      
      let cumulative = 0;
      for (const [mineralType, probability] of Object.entries(settings.mineralProbabilities)) {
        cumulative += probability;
        if (random <= cumulative) {
          type = mineralType as MineralType;
          break;
        }
      }
      
      grid[i][j] = {
        type,
        isRevealed: false,
        isExploding: false
      };
    }
  }

  return grid;
}

export function revealAllCells(grid: Cell[][]): Cell[][] {
  return grid.map(row => 
    row.map(cell => ({
      ...cell,
      isRevealed: true
    }))
  );
}

export function calculateScore(type: MineralType): number {
  switch (type) {
    case 'gold': return 100;
    case 'silver': return 50;
    case 'empty': return 5;
    default: return 0;
  }
}

export function checkWinCondition(grid: Cell[][]): boolean {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const cell = grid[i][j];
      if (!cell.isRevealed && cell.type !== 'red' && cell.type !== 'green') {
        return false;
      }
    }
  }
  return true;
}

export function triggerChainExplosion(grid: Cell[][], startI: number, startJ: number): Cell[][] {
  const newGrid = JSON.parse(JSON.stringify(grid));
  const explosionQueue: [number, number][] = [[startI, startJ]];
  const processed = new Set<string>();
  const gridSize = grid.length;

  while (explosionQueue.length > 0) {
    const [i, j] = explosionQueue.shift()!;
    const key = `${i},${j}`;
    
    if (processed.has(key)) continue;
    processed.add(key);

    newGrid[i][j].isRevealed = true;
    newGrid[i][j].isExploding = true;

    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        const newI = i + di;
        const newJ = j + dj;

        if (
          newI >= 0 && newI < gridSize &&
          newJ >= 0 && newJ < gridSize &&
          !processed.has(`${newI},${newJ}`)
        ) {
          const cell = newGrid[newI][newJ];
          if (cell.type === 'red' || cell.type === 'green') {
            explosionQueue.push([newI, newJ]);
          } else {
            cell.isRevealed = true;
          }
        }
      }
    }
  }

  return newGrid;
}