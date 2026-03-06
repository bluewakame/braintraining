import { create } from 'zustand';
import type { Question, QuizAnswer, DailyQuizSession } from '@/types/quiz';
import { todayString } from '@/utils/dateUtils';
import { calculateScore, correctCount } from '@/utils/scoreUtils';
import { STORAGE_KEYS } from '@/constants/config';
import { loadJSON, saveJSON } from '@/utils/storage';

interface QuizState {
  session: DailyQuizSession | null;
  currentIndex: number;
  showTrivia: boolean;
  hydrated: boolean;

  initSession: (questions: Question[]) => Promise<void>;
  answerQuestion: (isCorrect: boolean, usedHint: boolean) => void;
  proceedToTrivia: () => void;
  nextQuestion: () => void;
  resetSession: () => void;
  isTodayCompleted: () => boolean;
}

const makeSession = (questions: Question[]): DailyQuizSession => ({
  date: todayString(),
  questions,
  answers: [],
  completed: false,
  totalScore: 0,
});

export const useQuizStore = create<QuizState>((set, get) => ({
  session: null,
  currentIndex: 0,
  showTrivia: false,
  hydrated: false,

  initSession: async (questions: Question[]) => {
    const saved = await loadJSON<DailyQuizSession>(STORAGE_KEYS.dailyProgress);
    const today = todayString();

    if (saved && saved.date === today) {
      set({
        session: saved,
        currentIndex: saved.answers.length,
        showTrivia: false,
        hydrated: true,
      });
    } else {
      const session = makeSession(questions);
      set({ session, currentIndex: 0, showTrivia: false, hydrated: true });
      await saveJSON(STORAGE_KEYS.dailyProgress, session);
    }
  },

  answerQuestion: (isCorrect: boolean, usedHint: boolean) => {
    const { session, currentIndex } = get();
    if (!session) return;

    const answer: QuizAnswer = {
      questionId: session.questions[currentIndex].id,
      isCorrect,
      usedHint,
      answeredAt: Date.now(),
    };

    const answers = [...session.answers, answer];
    const completed = answers.length >= session.questions.length;
    const updated: DailyQuizSession = {
      ...session,
      answers,
      completed,
      totalScore: calculateScore(answers),
    };

    set({ session: updated, showTrivia: true });
    saveJSON(STORAGE_KEYS.dailyProgress, updated);
  },

  proceedToTrivia: () => set({ showTrivia: true }),

  nextQuestion: () => {
    const { currentIndex } = get();
    set({ currentIndex: currentIndex + 1, showTrivia: false });
  },

  resetSession: () => {
    set({ session: null, currentIndex: 0, showTrivia: false });
  },

  isTodayCompleted: () => {
    const { session } = get();
    return !!session && session.date === todayString() && session.completed;
  },
}));
