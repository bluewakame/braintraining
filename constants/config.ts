export const QUIZ_CONFIG = {
  questionsPerDay: 5,
  hintCostPoints: 0,
  maxStreak: 9999,
} as const;

// AdMob IDs (テスト用ID — リリース時は実IDに差し替え)
export const ADMOB = {
  bannerAdUnitId: 'ca-app-pub-3940256099942544/6300978111',   // テスト
  rewardedAdUnitId: 'ca-app-pub-3940256099942544/5224354917', // テスト
} as const;

export const STORAGE_KEYS = {
  userStats: 'user_stats',
  dailyProgress: 'daily_progress',
  questionHistory: 'question_history',
  settings: 'settings',
} as const;
