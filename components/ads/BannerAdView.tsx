import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE, SPACING } from '@/constants/theme';

/**
 * AdMob バナー広告コンポーネント。
 * 本番では react-native-google-mobile-ads の BannerAd を使用。
 * このファイルはスタブ実装（開発・Expo Go 用）。
 */
export function BannerAdView() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>広告</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.textMuted,
  },
});
