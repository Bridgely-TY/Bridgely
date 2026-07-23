import { StyleSheet, Text, View, Pressable, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import BrandLogo from '../components/BrandLogo';

type PreviewTile = {
  label: string;
  icon: string;
  bg: string;
  text: string;
};

const PREVIEW_TILES: PreviewTile[] = [
  { label: 'I Want', icon: '\u270B', bg: colors.tileWantBg, text: colors.tileWantText },
  { label: 'Play', icon: '\uD83E\uDDE9', bg: colors.tilePlayBg, text: colors.tilePlayText },
  { label: 'Eat & Drink', icon: '\uD83C\uDF4E', bg: colors.tileEatBg, text: colors.tileEatText },
  { label: 'Happy', icon: '\uD83D\uDE42', bg: colors.tileHappyBg, text: colors.tileHappyText },
];

const PAGE_COUNT = 3;

/**
 * First onboarding page ("Get Started").
 *
 * Shows the Bridgely brand mark, a static board preview card, and a CTA that
 * kicks off the caregiver setup flow. Additional onboarding pages will be added
 * as a carousel; the page indicator already reflects the intended page count.
 */
export default function OnboardingScreen({ navigation }: ScreenProps<'Onboarding'>) {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <BrandLogo size={72} />
          <Text style={styles.wordmark}>bridgely</Text>
          <Text style={styles.tagline}>Communication made easier</Text>
        </View>

        <View style={styles.previewCard}>
          <View style={styles.previewHeader}>
            <View style={styles.dots}>
              <View style={[styles.dot, { backgroundColor: colors.dotRed }]} />
              <View style={[styles.dot, { backgroundColor: colors.dotYellow }]} />
              <View style={[styles.dot, { backgroundColor: colors.dotGreen }]} />
            </View>
            <Text style={styles.previewLabel}>BOARD PREVIEW</Text>
          </View>

          <View style={styles.grid}>
            {PREVIEW_TILES.map((tile) => (
              <View key={tile.label} style={[styles.tile, { backgroundColor: tile.bg }]}>
                <View style={styles.tileIconCircle}>
                  <Text style={styles.tileIcon}>{tile.icon}</Text>
                </View>
                <Text style={[styles.tileLabel, { color: tile.text }]}>{tile.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.helperText}>
          We'll create a personalized communication board for your child.
        </Text>

        <View style={styles.footer}>
          <Pressable
            style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
            onPress={() => navigation.navigate('ChildProfile')}
          >
            <Text style={styles.ctaText}>Get Started</Text>
          </Pressable>

          <View style={styles.pageIndicator}>
            {Array.from({ length: PAGE_COUNT }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.pageDot,
                  {
                    backgroundColor:
                      i === 0 ? colors.pageDotActive : colors.pageDotInactive,
                    width: i === 0 ? 9 : 7,
                    height: i === 0 ? 9 : 7,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    paddingHorizontal: 36,
    paddingTop: 24,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },

  header: { alignItems: 'center', marginTop: 32 },
  wordmark: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 20,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textSecondary,
    marginTop: 10,
  },

  previewCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 4,
  },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  previewLabel: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    color: colors.textMuted,
  },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47.5%',
    flexGrow: 1,
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  tileIconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileIcon: { fontSize: 22 },
  tileLabel: { fontSize: 16, fontWeight: '700' },

  helperText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },

  footer: { gap: 20 },
  cta: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: { color: colors.onPrimary, fontSize: 18, fontWeight: '700' },

  pageIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  pageDot: { borderRadius: 5 },
});
