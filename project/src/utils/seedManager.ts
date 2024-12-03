let currentSeed = Math.floor(Math.random() * 1000000);

export function setSeed(seed: number) {
  currentSeed = seed;
  resetRandom(); // Reset the random state when seed changes
}

export function getSeed(): number {
  return currentSeed;
}

export function generateNewSeed(): number {
  const newSeed = Math.floor(Math.random() * 1000000);
  setSeed(newSeed);
  return newSeed;
}

let lastRandom = currentSeed;

// Reset the random state
function resetRandom() {
  lastRandom = currentSeed;
}

// Seeded random number generator
export function seededRandom(): number {
  lastRandom = (lastRandom * 16807) % 2147483647;
  return (lastRandom - 1) / 2147483646;
}