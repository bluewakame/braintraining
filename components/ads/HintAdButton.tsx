import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS, BUTTON } from '@/constants/theme';

interface HintAdButtonProps {
  hint: string;
  onWatchAd: () => void;
  revealed: boolean;
}

/**
 * 動画広告を視聴するとヒントが表示されるボタン。
 * 本番では react-native-google-mobile-ads の RewardedAd を使用。
 */
export function HintAdButton({ hint, onWatchAd, revealed }: HintAdButtonProps) {
  if (revealed) {
    return (
      <View style={styles.hintBox}>
        <Text style={styles.hintLabel}>💡 ヒント</Text>
        <Text style={styles.hintText}>{hint}</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.button} onPress={onWatchAd} activeOpacity={0.8}>
      <Text style={styles.icon}>▶</Text>
      <Text style={styles.label}>動画を見てヒントをゲット</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: BUTTON.minHeight,
    borderRadius: BUTTON.radius,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.surfaceWarm,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
  },
  icon: {
    fontSize: 18,
    color: COLORS.primary,
  },
  label: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  hintBox: {
    backgroundColor: '#FFF9C4',
    borderRadius: RADIUS.md,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: SPACING.md,
    gap: SPACING.xs,
  },
  hintLabel: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  hintText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 32,
  },
});
