import { useMemo } from 'react';
import { choiceQuestions, priceQuestions, songQuestions } from '@/data/questions';
import type { Question } from '@/types/quiz';
import { dateSeed, seededRandom, todayString } from '@/utils/dateUtils';
import { QUIZ_CONFIG } from '@/constants/config';

/**
 * Returns today's 5 questions deterministically based on today's date.
 * Distribution: 2 choice + 2 price + 1 song (or balanced depending on pool size).
 */
export function useDailyQuiz(dateStr?: string): Question[] {
  const date = dateStr ?? todayString();

  return useMemo(() => {
    const seed = dateSeed(date);

    const pick = <T>(pool: T[], count: number, offset: number): T[] => {
      const shuffled = [...pool].sort(
        (_, __, i = 0) => seededRandom(seed, offset + (i++)) - 0.5
      );
      // Proper seeded shuffle
      const arr = [...pool];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(seededRandom(seed, offset + i) * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      void shuffled; // suppress lint
      return arr.slice(0, count);
    };

    const choicePicked = pick(choiceQuestions, 2, 0);
    const pricePicked = pick(priceQuestions, 2, 100);
    const songPicked = pick(songQuestions, 1, 200);

    const all: Question[] = [...choicePicked, ...pricePicked, ...songPicked];

    // Shuffle final order
    const final = [...all];
    for (let i = final.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed, 300 + i) * (i + 1));
      [final[i], final[j]] = [final[j], final[i]];
    }

    return final.slice(0, QUIZ_CONFIG.questionsPerDay);
  }, [date]);
}
