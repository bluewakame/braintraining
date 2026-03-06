import type { QuizAnswer } from '@/types/quiz';

export const SCORE_PER_CORRECT = 20;
export const HINT_PENALTY = 5;

export function calculateScore(answers: QuizAnswer[]): number {
  return answers.reduce((total, a) => {
    if (!a.isCorrect) return total;
    const pts = SCORE_PER_CORRECT - (a.usedHint ? HINT_PENALTY : 0);
    return total + Math.max(pts, 0);
  }, 0);
}

export function correctCount(answers: QuizAnswer[]): number {
  return answers.filter((a) => a.isCorrect).length;
}

export function scoreLabel(score: number): string {
  if (score >= 90) return '昭和博士！';
  if (score >= 70) return 'なかなかやるね！';
  if (score >= 50) return 'もう少しだ！';
  if (score >= 30) return 'また挑戦してね！';
  return 'むずかしかったね';
}

export function scoreEmoji(score: number): string {
  if (score >= 90) return '🏆';
  if (score >= 70) return '⭐';
  if (score >= 50) return '👍';
  if (score >= 30) return '😊';
  return '💪';
}
