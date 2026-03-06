import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';

interface TriviaCardProps {
  title: string;
  body: string;
}

export function TriviaCard({ title, body }: TriviaCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.icon}>📚</Text>
        <Text style={styles.headerLabel}>昭和豆知識</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.body}>{body}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceWarm,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.secondary,
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  icon: { fontSize: 22 },
  headerLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 36,
  },
  body: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text,
    lineHeight: 36,
  },
});
