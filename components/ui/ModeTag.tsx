import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { QuizMode } from '@/types/quiz';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';

const MODE_INFO: Record<QuizMode, { label: string; emoji: string; color: string }> = {
  choice: { label: '懐かし4択', emoji: '❓', color: '#7B4FC4' },
  price: { label: 'あの頃いくら？', emoji: '💴', color: '#1A7A50' },
  song: { label: 'この曲な〜んだ？', emoji: '🎵', color: '#B03060' },
};

interface ModeTagProps {
  mode: QuizMode;
}

export function ModeTag({ mode }: ModeTagProps) {
  const info = MODE_INFO[mode];
  return (
    <View style={[styles.tag, { backgroundColor: info.color }]}>
      <Text style={styles.emoji}>{info.emoji}</Text>
      <Text style={styles.label}>{info.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.md,
    gap: SPACING.xs,
  },
  emoji: { fontSize: 16 },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.5,
  },
});
