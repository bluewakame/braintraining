export const COLORS = {
  primary: '#E8540A',
  primaryLight: '#F5803A',
  primaryDark: '#B33F00',
  secondary: '#F5A623',
  secondaryLight: '#FFD080',
  background: '#FFF8F0',
  surface: '#FFFFFF',
  surfaceWarm: '#FFF0E0',
  text: '#2C1A0E',
  textSecondary: '#6B4423',
  textMuted: '#9B7B5A',
  correct: '#3A7D44',
  correctLight: '#E8F5EA',
  incorrect: '#C0392B',
  incorrectLight: '#FDECEA',
  border: '#E8C8A0',
  shadow: '#8B5E3C',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.5)',
  gold: '#D4A017',
  disabled: '#C4A882',
} as const;

export const FONT_SIZE = {
  xs: 18,
  sm: 22,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 38,
  xxxl: 48,
} as const;

export const FONT_WEIGHT = {
  regular: '400' as const,
  medium: '500' as const,
  bold: '700' as const,
  black: '900' as const,
};

export const BUTTON = {
  minHeight: 72,
  radius: 16,
  paddingVertical: 16,
  paddingHorizontal: 24,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const RADIUS = {
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
} as const;
