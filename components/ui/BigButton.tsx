import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
import { COLORS, FONT_SIZE, BUTTON, SPACING, RADIUS } from '@/constants/theme';

interface BigButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'correct' | 'incorrect' | 'disabled';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function BigButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: BigButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], isDisabled && styles.disabledOverride, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} size="small" />
      ) : (
        <Text style={[styles.label, styles[`${variant}Text` as keyof typeof styles], textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: BUTTON.minHeight,
    borderRadius: BUTTON.radius,
    paddingVertical: BUTTON.paddingVertical,
    paddingHorizontal: BUTTON.paddingHorizontal,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  // variants
  primary: { backgroundColor: COLORS.primary },
  primaryText: { color: COLORS.white },
  secondary: { backgroundColor: COLORS.secondary },
  secondaryText: { color: COLORS.text },
  outline: {
    backgroundColor: COLORS.surface,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  outlineText: { color: COLORS.primary },
  correct: { backgroundColor: COLORS.correct },
  correctText: { color: COLORS.white },
  incorrect: { backgroundColor: COLORS.incorrect },
  incorrectText: { color: COLORS.white },
  disabled: { backgroundColor: COLORS.disabled },
  disabledText: { color: COLORS.white },
  disabledOverride: { opacity: 0.6 },
});
