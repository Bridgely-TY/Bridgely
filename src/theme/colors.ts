/**
 * Shared color palette for Bridgely, derived from the product designs.
 * Keeping these in one place so screens stay visually consistent.
 */
export const colors = {
  background: '#FBF8F4',
  card: '#FFFFFF',

  textPrimary: '#2B2E43',
  textSecondary: '#5B6478',
  textMuted: '#A0AEC0',

  // Logo / brand
  brandBlue: '#5B9BD5',
  brandOrange: '#ED7D5A',

  // Traffic-light dots on the board preview card
  dotRed: '#FF6B5E',
  dotYellow: '#FDBA3B',
  dotGreen: '#4CD787',

  // Board preview category tiles
  tileWantBg: '#FBEFC3',
  tileWantText: '#B07D1A',
  tilePlayBg: '#D9EBD3',
  tilePlayText: '#4A7C4E',
  tileEatBg: '#FBE0D6',
  tileEatText: '#B5654A',
  tileHappyBg: '#D6E8F5',
  tileHappyText: '#3A6EA5',

  // Primary call-to-action button
  primary: '#ED7D5A',
  onPrimary: '#FFFFFF',

  // Page indicator dots
  pageDotActive: '#3B82C4',
  pageDotInactive: '#D8D8D8',

  // Forms / onboarding wizard
  stepBadgeBg: '#DCEBF7',
  stepBadgeText: '#3A6EA5',
  border: '#E7E1D8',
  inputBorder: '#E5E0D8',
  placeholder: '#A0AEC0',

  // Selected radio card (e.g. Semi-Verbal)
  selectedCardBg: '#FBEFC3',
  selectedCardBorder: '#E3C765',
  selectedCardText: '#B07D1A',
  radioFill: '#2B2E43',

  // Selected chip (orange) and toggle (blue)
  chipSelectedBg: '#ED7D5A',
  chipSelectedText: '#FFFFFF',
  toggleSelectedBg: '#6BA4E0',
  toggleSelectedText: '#FFFFFF',

  // Highlighted dropdown option
  optionHighlightBg: '#FBEEE4',
  optionHighlightText: '#ED7D5A',

  // Accent helper text
  accentBlue: '#3A6EA5',
  helperAlert: '#E86A4E',
} as const;
