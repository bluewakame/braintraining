export type QuizMode = 'choice' | 'price' | 'song';

export interface BaseQuestion {
  id: string;
  mode: QuizMode;
  question: string;
  correctAnswer: string;
  trivia: string;
  triviaTitle: string;
  era: string; // 昭和何年代か
}

export interface ChoiceQuestion extends BaseQuestion {
  mode: 'choice';
  choices: string[];
  correctIndex: number;
}

export interface PriceQuestion extends BaseQuestion {
  mode: 'price';
  item: string;
  year: number;         // 昭和何年
  correctPrice: number;
  unit: string;         // 円, 銭 など
  minPrice: number;
  maxPrice: number;
  step: number;
  hint: string;
}

export interface SongQuestion extends BaseQuestion {
  mode: 'song';
  lyrics: string;      // 歌詞の一節
  artist: string;
  year: number;         // 昭和何年
  choices: string[];
  correctIndex: number;
}

export type Question = ChoiceQuestion | PriceQuestion | SongQuestion;

export interface QuizAnswer {
  questionId: string;
  isCorrect: boolean;
  usedHint: boolean;
  answeredAt: number;
}

export interface DailyQuizSession {
  date: string;           // YYYY-MM-DD
  questions: Question[];
  answers: QuizAnswer[];
  completed: boolean;
  totalScore: number;
}

export interface UserStats {
  totalDaysPlayed: number;
  currentStreak: number;
  maxStreak: number;
  totalCorrect: number;
  totalAnswered: number;
  lastPlayedDate: string;
  scoreHistory: DayScore[];
}

export interface DayScore {
  date: string;
  score: number;
  correctCount: number;
  completed: boolean;
}

export interface AppSettings {
  fontSizeScale: number;   // 1.0〜1.4
  soundEnabled: boolean;
}
