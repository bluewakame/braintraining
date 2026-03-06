import { useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { todayString, isConsecutiveDay } from '@/utils/dateUtils';

/**
 * On mount, checks login streak and updates if necessary.
 */
export function useStreak() {
  const { stats, updateStreak } = useUserStore();

  useEffect(() => {
    const today = todayString();
    if (stats.lastPlayedDate === today) return;

    const consecutive = isConsecutiveDay(stats.lastPlayedDate, today);
    updateStreak(today, consecutive);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    currentStreak: stats.currentStreak,
    maxStreak: stats.maxStreak,
  };
}
