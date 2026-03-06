import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuizStore } from '@/store/quizStore';
import { useDailyQuiz } from '@/hooks/useDailyQuiz';
import { ProgressDots } from '@/components/ui/ProgressDots';
import { ModeTag } from '@/components/ui/ModeTag';
import { TriviaCard } from '@/components/ui/TriviaCard';
import { BigButton } from '@/components/ui/BigButton';
import { ChoiceQuiz } from '@/components/quiz/ChoiceQuiz';
import { PriceQuiz } from '@/components/quiz/PriceQuiz';
import { SongQuiz } from '@/components/quiz/SongQuiz';
import { BannerAdView } from '@/components/ads/BannerAdView';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';
import type { ChoiceQuestion, PriceQuestion, SongQuestion } from '@/types/quiz';
import { correctCount } from '@/utils/scoreUtils';

export default function QuizScreen() {
  const router = useRouter();
  const {
    session,
    currentIndex,
    showTrivia,
    hydrated,
    initSession,
    answerQuestion,
    nextQuestion,
    isTodayCompleted,
  } = useQuizStore();
  const questions = useDailyQuiz();

  useEffect(() => {
    initSession(questions);
  }, []);

  if (!hydrated || !session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loading}>
          <Text style={styles.loadingText}>読み込み中…</Text>
        </View>
      </SafeAreaView>
    );
  }

  // セッション完了時
  if (session.completed) {
    router.replace('/quiz/result');
    return null;
  }

  const question = session.questions[currentIndex];
  if (!question) return null;

  const handleAnswer = (isCorrect: boolean, usedHint = false) => {
    answerQuestion(isCorrect, usedHint);
  };

  const handleNext = () => {
    nextQuestion();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ヘッダー */}
        <View style={styles.headerRow}>
          <BigButton
            label="← ホーム"
            variant="outline"
            onPress={() => router.back()}
            style={styles.backBtn}
            textStyle={styles.backBtnText}
          />
          <Text style={styles.questionNum}>
            {currentIndex + 1} / {session.questions.length}
          </Text>
        </View>

        <ProgressDots total={session.questions.length} current={currentIndex} />

        <ModeTag mode={question.mode} />

        {/* 問題 */}
        {!showTrivia && question.mode === 'choice' && (
          <ChoiceQuiz
            question={question as ChoiceQuestion}
            onAnswer={handleAnswer}
          />
        )}
        {!showTrivia && question.mode === 'price' && (
          <PriceQuiz
            question={question as PriceQuestion}
            onAnswer={(ok, hint) => handleAnswer(ok, hint)}
          />
        )}
        {!showTrivia && question.mode === 'song' && (
          <SongQuiz
            question={question as SongQuestion}
            onAnswer={handleAnswer}
          />
        )}

        {/* 豆知識 */}
        {showTrivia && (
          <View style={styles.triviaSection}>
            {/* 正誤表示 */}
            {session.answers[session.answers.length - 1]?.isCorrect ? (
              <View style={[styles.resultBanner, styles.correctBanner]}>
                <Text style={styles.resultBannerText}>⭕ 正解！</Text>
              </View>
            ) : (
              <View style={[styles.resultBanner, styles.incorrectBanner]}>
                <Text style={styles.resultBannerText}>
                  ❌ 不正解… 正解は「{question.correctAnswer}」
                </Text>
              </View>
            )}

            <TriviaCard title={question.triviaTitle} body={question.trivia} />

            <BigButton
              label={
                currentIndex + 1 < session.questions.length
                  ? '次の問題へ →'
                  : '結果を見る！'
              }
              onPress={handleNext}
            />
          </View>
        )}
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
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: FONT_SIZE.lg, color: COLORS.textSecondary },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  questionNum: {
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  triviaSection: { gap: SPACING.lg },
  resultBanner: {
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
  },
  correctBanner: {
    backgroundColor: COLORS.correctLight,
    borderWidth: 2,
    borderColor: COLORS.correct,
  },
  incorrectBanner: {
    backgroundColor: COLORS.incorrectLight,
    borderWidth: 2,
    borderColor: COLORS.incorrect,
  },
  resultBannerText: {
    fontSize: FONT_SIZE.xl,
    fontWeight: '800',
    color: COLORS.text,
  },
});
