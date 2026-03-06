import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserStore } from '@/store/userStore';
import { useQuizStore } from '@/store/quizStore';
import { useDailyQuiz } from '@/hooks/useDailyQuiz';
import { useStreak } from '@/hooks/useStreak';
import { BigButton } from '@/components/ui/BigButton';
import { StreakBadge } from '@/components/ui/StreakBadge';
import { BannerAdView } from '@/components/ads/BannerAdView';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';
import { todayString, formatDateJP } from '@/utils/dateUtils';

export default function HomeScreen() {
  const router = useRouter();
  const hydrated = useUserStore((s) => s.hydrated);
  const stats = useUserStore((s) => s.stats);
  const { currentStreak } = useStreak();
  const questions = useDailyQuiz();
  const { initSession, isTodayCompleted } = useQuizStore();

  useEffect(() => {
    if (hydrated) {
      initSession(questions);
    }
  }, [hydrated]);

  const completed = isTodayCompleted();
  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ヘッダー */}
        <View style={styles.header}>
          <Text style={styles.appName}>昨日は誰に！</Text>
          <Text style={styles.subtitle}>〜昭和を旅するクイズ〜</Text>
          <Text style={styles.dateText}>{formatDateJP(todayString())}</Text>
        </View>

        {/* ストリーク */}
        <View style={styles.center}>
          <StreakBadge streak={currentStreak} />
        </View>

        {/* 今日のクイズカード */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📻 今日の昭和クイズ</Text>
          <Text style={styles.cardDesc}>
            毎日5問！懐かし4択・物価クイズ・歌謡クイズが登場。
            {'\n'}連続ログインでストリークを伸ばそう！
          </Text>

          {completed ? (
            <View style={styles.completedBox}>
              <Text style={styles.completedText}>✅ 今日はクリア済み！</Text>
              <Text style={styles.completedSub}>また明日も挑戦してね</Text>
            </View>
          ) : (
            <BigButton
              label="今日のクイズをはじめる"
              onPress={() => router.push('/quiz')}
            />
          )}
        </View>

        {/* 成績サマリ */}
        <View style={styles.statsRow}>
          <StatBox label="挑戦日数" value={`${stats.totalDaysPlayed}日`} />
          <StatBox label="正解率" value={`${accuracy}%`} />
          <StatBox label="最高連続" value={`${stats.maxStreak}日`} />
        </View>

        {/* メニュー */}
        <View style={styles.menuCol}>
          <BigButton
            label="📅 過去の成績"
            variant="outline"
            onPress={() => router.push('/history')}
          />
          <BigButton
            label="⚙️ 設定"
            variant="outline"
            onPress={() => router.push('/settings')}
          />
        </View>
      </ScrollView>

      <BannerAdView />
    </SafeAreaView>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
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
  header: { alignItems: 'center', gap: SPACING.xs },
  appName: {
    fontSize: FONT_SIZE.xxxl,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  dateText: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
  },
  center: { alignItems: 'center' },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    gap: SPACING.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
  cardDesc: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    lineHeight: 34,
  },
  completedBox: {
    backgroundColor: COLORS.correctLight,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    alignItems: 'center',
    gap: SPACING.xs,
    borderWidth: 2,
    borderColor: COLORS.correct,
  },
  completedText: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: COLORS.correct,
  },
  completedSub: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.correct,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    borderWidth: 2,
    borderColor: COLORS.border,
    padding: SPACING.md,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statValue: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '900',
    color: COLORS.primary,
  },
  statLabel: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  menuCol: { gap: SPACING.md },
});
