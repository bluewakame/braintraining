import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { SongQuestion } from '@/types/quiz';
import { COLORS, FONT_SIZE, SPACING, RADIUS, BUTTON } from '@/constants/theme';

interface SongQuizProps {
  question: SongQuestion;
  onAnswer: (isCorrect: boolean) => void;
}

export function SongQuiz({ question, onAnswer }: SongQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    setTimeout(() => {
      onAnswer(index === question.correctIndex);
    }, 1000);
  };

  const getStyle = (index: number) => {
    if (selected === null) return styles.choiceIdle;
    if (index === question.correctIndex) return styles.choiceCorrect;
    if (index === selected) return styles.choiceWrong;
    return styles.choiceDim;
  };

  const getTextStyle = (index: number) => {
    if (selected === null) return styles.choiceTextIdle;
    if (index === question.correctIndex) return styles.choiceTextCorrect;
    if (index === selected) return styles.choiceTextWrong;
    return styles.choiceTextDim;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question.question}</Text>

      <View style={styles.lyricsBox}>
        <Text style={styles.lyricsText}>{question.lyrics}</Text>
      </View>

      <View style={styles.choices}>
        {question.choices.map((choice, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.choiceBase, getStyle(i)]}
            onPress={() => handleSelect(i)}
            disabled={selected !== null}
            activeOpacity={0.75}
            accessibilityRole="button"
          >
            <Text style={styles.choiceNum}>{['①', '②', '③', '④'][i]}</Text>
            <Text style={[styles.choiceText, getTextStyle(i)]}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selected !== null && (
        <View style={styles.artistBox}>
          <Text style={styles.artistLabel}>
            🎤 {question.artist}（{question.year}年）
          </Text>
        </View>
      )}
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
  lyricsBox: {
    backgroundColor: '#FFF0F5',
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: '#E8A0B0',
    padding: SPACING.lg,
  },
  lyricsText: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 40,
    fontStyle: 'italic',
  },
  choices: { gap: SPACING.md },
  choiceBase: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: BUTTON.minHeight,
    borderRadius: BUTTON.radius,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderWidth: 2,
    gap: SPACING.md,
  },
  choiceIdle: { backgroundColor: COLORS.surface, borderColor: COLORS.border },
  choiceCorrect: { backgroundColor: COLORS.correctLight, borderColor: COLORS.correct },
  choiceWrong: { backgroundColor: COLORS.incorrectLight, borderColor: COLORS.incorrect },
  choiceDim: { backgroundColor: COLORS.surface, borderColor: '#DDD', opacity: 0.5 },
  choiceNum: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.textSecondary,
    width: 28,
  },
  choiceText: { fontSize: FONT_SIZE.md, flex: 1, lineHeight: 32 },
  choiceTextIdle: { color: COLORS.text, fontWeight: '600' },
  choiceTextCorrect: { color: COLORS.correct, fontWeight: '700' },
  choiceTextWrong: { color: COLORS.incorrect, fontWeight: '700' },
  choiceTextDim: { color: COLORS.textMuted, fontWeight: '400' },
  artistBox: {
    backgroundColor: COLORS.surfaceWarm,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: 'center',
  },
  artistLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
