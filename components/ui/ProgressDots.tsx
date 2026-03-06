import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@/constants/theme';

interface ProgressDotsProps {
  total: number;
  current: number; // 0-indexed, current question being answered
}

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i < current && styles.done,
            i === current && styles.active,
            i > current && styles.pending,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: SPACING.sm,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  done: { backgroundColor: COLORS.correct },
  active: {
    backgroundColor: COLORS.primary,
    width: 24,
    borderRadius: 8,
  },
  pending: { backgroundColor: COLORS.border },
});
