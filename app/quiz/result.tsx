import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '@/store/quizStore';
import { useUserStore } from '@/store/userStore';
import { BigButton } from '@/components/ui/BigButton';
import { BannerAdView } from '@/components/ads/BannerAdView';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';
import { scoreLabel, scoreEmoji, correctCount } from '@/utils/scoreUtils';
import { todayString } from '@/utils/dateUtils';

export default function ResultScreen() {
  const router = useRouter();
  const session = useQuizStore((s) => s.session);
  const recordDayScore = useUserStore((s) => s.recordDayScore);
  const recorded = useRef(false);

  useEffect(() => {
    if (!session || recorded.current) return;
    recorded.current = true;
    recordDayScore({
      date: todayString(),
      score: session.totalScore,
      correctCount: correctCount(session.answers),
      completed: true,
    });
  }, []);

  if (!session) {
    router.replace('/');
    return null;
  }

  const score = session.totalScore;
  const correct = correctCount(session.answers);
  const total = session.questions.length;
  const label = scoreLabel(score);
  const emoji = scoreEmoji(score);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 結果大見出し */}
        <View style={styles.heroBox}>
          <Text style={styles.heroEmoji}>{emoji}</Text>
          <Text style={styles.heroLabel}>{label}</Text>
          <Text style={styles.scoreText}>{score}点</Text>
          <Text style={styles.correctText}>
            {correct} / {total} 問正解
          </Text>
        </View>

        {/* 問題別結果 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>問題ごとの結果</Text>
          {session.questions.map((q, i) => {
            const ans = session.answers[i];
            const isCorrect = ans?.isCorrect ?? false;
            return (
              <View key={q.id} style={[styles.resultRow, isCorrect ? styles.rowCorrect : styles.rowWrong]}>
                <Text style={styles.rowNum}>Q{i + 1}</Text>
                <View style={styles.rowContent}>
                  <Text style={styles.rowQ} numberOfLines={2}>{q.question}</Text>
                  <Text style={styles.rowAnswer}>
                    正解: {q.correctAnswer}
                    {ans?.usedHint ? ' （ヒント使用）' : ''}
                  </Text>
                </View>
                <Text style={styles.rowMark}>{isCorrect ? '⭕' : '❌'}</Text>
              </View>
            );
          })}
        </View>

        {/* ボタン */}
        <View style={styles.buttonCol}>
          <BigButton
            label="ホームに戻る"
            onPress={() => router.replace('/')}
          />
          <BigButton
            label="📅 過去の成績を見る"
            variant="outline"
            onPress={() => router.push('/history')}
          />
        </View>
      </ScrollView>

      <BannerAdView />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  heroBox: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    alignItems: 'center',
    gap: SPACING.sm,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroEmoji: { fontSize: 72 },
  heroLabel: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: '900',
    color: COLORS.primary,
  },
  scoreText: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '900',
    color: COLORS.text,
  },
  correctText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.md,
  },
  rowCorrect: { backgroundColor: COLORS.correctLight },
  rowWrong: { backgroundColor: COLORS.incorrectLight },
  rowNum: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textSecondary,
    width: 28,
  },
  rowContent: { flex: 1, gap: 4 },
  rowQ: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: '600',
    lineHeight: 28,
  },
  rowAnswer: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  rowMark: { fontSize: 24 },
  buttonCol: { gap: SPACING.md },
});
