import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { BigButton } from '@/components/ui/BigButton';
import { BannerAdView } from '@/components/ads/BannerAdView';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';
import { formatDateJP } from '@/utils/dateUtils';
import { scoreEmoji } from '@/utils/scoreUtils';
import type { DayScore } from '@/types/quiz';

export default function HistoryScreen() {
  const router = useRouter();
  const stats = useUserStore((s) => s.stats);
  const history = stats.scoreHistory;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ヘッダー */}
        <View style={styles.headerRow}>
          <BigButton
            label="← 戻る"
            variant="outline"
            onPress={() => router.back()}
            style={styles.backBtn}
            textStyle={styles.backBtnText}
          />
          <Text style={styles.title}>過去の成績</Text>
        </View>

        {/* 概要 */}
        <View style={styles.summaryRow}>
          <SummaryBox label="挑戦日数" value={`${stats.totalDaysPlayed}日`} />
          <SummaryBox
            label="総正解率"
            value={
              stats.totalAnswered > 0
                ? `${Math.round((stats.totalCorrect / stats.totalAnswered) * 100)}%`
                : '—'
            }
          />
          <SummaryBox label="最高連続" value={`${stats.maxStreak}日`} />
        </View>

        {/* 履歴リスト */}
        {history.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>まだ記録がありません</Text>
            <Text style={styles.emptySubtext}>クイズに挑戦すると記録が残ります！</Text>
          </View>
        ) : (
          <View style={styles.listCard}>
            <Text style={styles.listTitle}>📅 履歴（直近60日）</Text>
            {history.map((day) => (
              <DayRow key={day.date} day={day} />
            ))}
          </View>
        )}
      </ScrollView>

      <BannerAdView />
    </SafeAreaView>
  );
}

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryBox}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
  );
}

function DayRow({ day }: { day: DayScore }) {
  const bar = Math.round((day.correctCount / 5) * 100);
  return (
    <View style={styles.dayRow}>
      <Text style={styles.dayEmoji}>{scoreEmoji(day.score)}</Text>
      <View style={styles.dayContent}>
        <Text style={styles.dayDate}>{formatDateJP(day.date)}</Text>
        <View style={styles.barBg}>
          <View style={[styles.barFill, { width: `${bar}%` }]} />
        </View>
      </View>
      <View style={styles.dayRight}>
        <Text style={styles.dayScore}>{day.score}点</Text>
        <Text style={styles.dayCorrect}>{day.correctCount}/5問</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: {
    padding: SPACING.lg,
    gap: SPACING.xl,
    paddingBottom: SPACING.xxxl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  backBtn: {
    minHeight: 48,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    shadowOpacity: 0,
    elevation: 0,
  },
  backBtnText: { fontSize: FONT_SIZE.sm },
  title: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  summaryRow: { flexDirection: 'row', gap: SPACING.md },
  summaryBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  summaryValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '900',
    color: COLORS.primary,
  },
  summaryLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  emptyBox: {
    alignItems: 'center',
    padding: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyText: {
    fontSize: FONT_SIZE.lg,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
  },
  listCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    gap: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
  },
  listTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '800',
    color: COLORS.text,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  dayEmoji: { fontSize: 24, width: 28, textAlign: 'center' },
  dayContent: { flex: 1, gap: SPACING.xs },
  dayDate: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    fontWeight: '600',
  },
  barBg: {
    height: 8,
    backgroundColor: COLORS.border,
    borderRadius: RADIUS.full,
    overflow: 'hidden',
  },
  barFill: {
    height: 8,
    backgroundColor: COLORS.correct,
    borderRadius: RADIUS.full,
  },
  dayRight: { alignItems: 'flex-end', gap: 2 },
  dayScore: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.primary,
  },
  dayCorrect: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
  },
});
