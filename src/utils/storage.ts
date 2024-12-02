import { HighScore } from '../types/game';

const HIGH_SCORES_KEY = 'mineralExplorer_highScores';
const MAX_HIGH_SCORES = 10;

export function getHighScores(): HighScore[] {
  const scores = localStorage.getItem(HIGH_SCORES_KEY);
  return scores ? JSON.parse(scores) : [];
}

export function addHighScore(score: number): boolean {
  const highScores = getHighScores();
  const isHighScore = highScores.length < MAX_HIGH_SCORES || score > highScores[highScores.length - 1].score;
  
  if (!isHighScore) return false;

  const savedName = localStorage.getItem('mineralExplorer_playerName') || 'Anonymous';
  const newScore: HighScore = {
    playerName: savedName,
    score,
    date: new Date().toISOString()
  };

  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  
  if (highScores.length > MAX_HIGH_SCORES) {
    highScores.length = MAX_HIGH_SCORES;
  }

  localStorage.setItem(HIGH_SCORES_KEY, JSON.stringify(highScores));
  return true;
}