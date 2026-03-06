import { create } from 'zustand';
import type { UserStats, AppSettings, DayScore } from '@/types/quiz';
import { STORAGE_KEYS } from '@/constants/config';
import { loadJSON, saveJSON } from '@/utils/storage';
import { todayString } from '@/utils/dateUtils';

const defaultStats: UserStats = {
  totalDaysPlayed: 0,
  currentStreak: 0,
  maxStreak: 0,
  totalCorrect: 0,
  totalAnswered: 0,
  lastPlayedDate: '',
  scoreHistory: [],
};

const defaultSettings: AppSettings = {
  fontSizeScale: 1.0,
  soundEnabled: false,
};

interface UserState {
  stats: UserStats;
  settings: AppSettings;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  updateStreak: (today: string, consecutive: boolean) => void;
  recordDayScore: (score: DayScore) => void;
  updateSettings: (s: Partial<AppSettings>) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  stats: defaultStats,
  settings: defaultSettings,
  hydrated: false,

  hydrate: async () => {
    const [stats, settings] = await Promise.all([
      loadJSON<UserStats>(STORAGE_KEYS.userStats),
      loadJSON<AppSettings>(STORAGE_KEYS.settings),
    ]);
    set({
      stats: stats ?? defaultStats,
      settings: settings ?? defaultSettings,
      hydrated: true,
    });
  },

  updateStreak: (today: string, consecutive: boolean) => {
    const prev = get().stats;
    const newStreak = consecutive ? prev.currentStreak + 1 : 1;
    const updated: UserStats = {
      ...prev,
      currentStreak: newStreak,
      maxStreak: Math.max(prev.maxStreak, newStreak),
      lastPlayedDate: today,
    };
    set({ stats: updated });
    saveJSON(STORAGE_KEYS.userStats, updated);
  },

  recordDayScore: (score: DayScore) => {
    const prev = get().stats;
    const today = todayString();
    const history = prev.scoreHistory.filter((s) => s.date !== today);
    const updated: UserStats = {
      ...prev,
      totalDaysPlayed: prev.totalDaysPlayed + (score.completed ? 1 : 0),
      totalCorrect: prev.totalCorrect + score.correctCount,
      totalAnswered: prev.totalAnswered + 5,
      lastPlayedDate: today,
      scoreHistory: [score, ...history].slice(0, 60),
    };
    set({ stats: updated });
    saveJSON(STORAGE_KEYS.userStats, updated);
  },

  updateSettings: (s: Partial<AppSettings>) => {
    const updated = { ...get().settings, ...s };
    set({ settings: updated });
    saveJSON(STORAGE_KEYS.settings, updated);
  },
}));
