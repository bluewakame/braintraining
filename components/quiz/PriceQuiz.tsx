import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import type { PriceQuestion } from '@/types/quiz';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';
import { BigButton } from '@/components/ui/BigButton';
import { HintAdButton } from '@/components/ads/HintAdButton';

interface PriceQuizProps {
  question: PriceQuestion;
  onAnswer: (isCorrect: boolean, usedHint: boolean) => void;
}

const TOLERANCE = 0.3; // 30% 以内なら正解

export function PriceQuiz({ question, onAnswer }: PriceQuizProps) {
  const [value, setValue] = useState(
    Math.round((question.minPrice + question.maxPrice) / 2)
  );
  const [answered, setAnswered] = useState(false);
  const [hintRevealed, setHintRevealed] = useState(false);

  const handleAnswer = () => {
    if (answered) return;
    setAnswered(true);
    const correct = question.correctPrice;
    const diff = Math.abs(value - correct) / correct;
    const isCorrect = diff <= TOLERANCE;
    setTimeout(() => onAnswer(isCorrect, hintRevealed), 1200);
  };

  const formatPrice = (p: number) =>
    p >= 1000
      ? `${p.toLocaleString('ja-JP')}${question.unit}`
      : `${p}${question.unit}`;

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>
      <Text style={styles.era}>（{question.year}年ごろ）</Text>

      <View style={styles.priceBox}>
        <Text style={styles.priceLabel}>あなたの答え</Text>
        <Text style={styles.priceValue}>{formatPrice(value)}</Text>
      </View>

      <View style={styles.sliderWrapper}>
        <Text style={styles.rangeLabel}>{formatPrice(question.minPrice)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={question.minPrice}
          maximumValue={question.maxPrice}
          step={question.step}
          value={value}
          onValueChange={(v) => !answered && setValue(Math.round(v))}
          minimumTrackTintColor={COLORS.primary}
          maximumTrackTintColor={COLORS.border}
          thumbTintColor={COLORS.primary}
          disabled={answered}
        />
        <Text style={styles.rangeLabel}>{formatPrice(question.maxPrice)}</Text>
      </View>

      {answered && (
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>
            正解は {formatPrice(question.correctPrice)} でした
          </Text>
        </View>
      )}

      {!answered && (
        <HintAdButton
          hint={question.hint}
          onWatchAd={() => setHintRevealed(true)}
          revealed={hintRevealed}
        />
      )}

      <BigButton
        label={answered ? '結果を確認中…' : 'この金額で決定！'}
        onPress={handleAnswer}
        disabled={answered}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: SPACING.lg },
  question: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 42,
  },
  era: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    marginTop: -SPACING.md,
  },
  priceBox: {
    backgroundColor: COLORS.surfaceWarm,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '900',
    color: COLORS.primary,
    marginTop: SPACING.xs,
  },
  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  slider: { flex: 1, height: 40 },
  rangeLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
    minWidth: 44,
    textAlign: 'center',
  },
  resultBox: {
    backgroundColor: COLORS.correctLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.correct,
  },
  resultText: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.correct,
    textAlign: 'center',
  },
});
