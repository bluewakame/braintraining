import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useUserStore } from '@/store/userStore';
import { BigButton } from '@/components/ui/BigButton';
import { BannerAdView } from '@/components/ads/BannerAdView';
import { COLORS, FONT_SIZE, SPACING, RADIUS } from '@/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const settings = useUserStore((s) => s.settings);
  const updateSettings = useUserStore((s) => s.updateSettings);

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
          <Text style={styles.title}>⚙️ 設定</Text>
        </View>

        {/* 文字サイズ */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>文字サイズ</Text>
          <Text style={[styles.preview, { fontSize: 20 * settings.fontSizeScale }]}>
            これがサンプルの文字サイズです
          </Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>小</Text>
            <Slider
              style={styles.slider}
              minimumValue={0.85}
              maximumValue={1.4}
              step={0.05}
              value={settings.fontSizeScale}
              onValueChange={(v) => updateSettings({ fontSizeScale: v })}
              minimumTrackTintColor={COLORS.primary}
              maximumTrackTintColor={COLORS.border}
              thumbTintColor={COLORS.primary}
            />
            <Text style={styles.sliderLabel}>大</Text>
          </View>
          <Text style={styles.sliderValue}>
            {Math.round(settings.fontSizeScale * 100)}%
          </Text>
        </View>

        {/* サウンド */}
        <View style={styles.card}>
          <View style={styles.switchRow}>
            <View>
              <Text style={styles.cardTitle}>効果音</Text>
              <Text style={styles.cardSub}>正誤音を鳴らします</Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(v) => updateSettings({ soundEnabled: v })}
              trackColor={{ false: COLORS.border, true: COLORS.primary }}
              thumbColor={COLORS.white}
            />
          </View>
        </View>

        {/* アプリ情報 */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>アプリ情報</Text>
          <InfoRow label="バージョン" value="1.0.0" />
          <InfoRow label="クイズ問題数" value="4択 20問 / 物価 12問 / 歌謡 12問" />
        </View>
      </ScrollView>

      <BannerAdView />
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
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
    fontWeight: '700',
    color: COLORS.text,
  },
  cardSub: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textMuted,
  },
  preview: {
    color: COLORS.text,
    lineHeight: 36,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  slider: { flex: 1, height: 40 },
  sliderLabel: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.textSecondary,
    minWidth: 16,
    textAlign: 'center',
  },
  sliderValue: {
    fontSize: FONT_SIZE.md,
    color: COLORS.primary,
    fontWeight: '700',
    textAlign: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  infoLabel: {
    fontSize: FONT_SIZE.md,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text,
    flex: 1,
    textAlign: 'right',
    lineHeight: 28,
  },
});
