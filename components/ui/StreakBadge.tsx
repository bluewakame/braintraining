import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const flame = streak >= 7 ? '🔥🔥' : streak >= 3 ? '🔥' : '✨';

  return (
    <View style={styles.badge}>
      <Text style={styles.flame}>{flame}</Text>
      <View>
        <Text style={styles.count}>{streak}日</Text>
        <Text style={styles.label}>連続ログイン</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceWarm,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
  },
  flame: {
    fontSize: 28,
  },
  count: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '900',
    color: COLORS.primary,
    lineHeight: 34,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
