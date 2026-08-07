import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrandLogo from '../components/BrandLogo';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';

const STEPS = [
  { number: 1, title: "Child's Name & Age", summary: 'Leo, Cognitive Age: 5', route: 'ChildProfile' as const },
  { number: 2, title: 'Communication Level', summary: 'Semi-Verbal', route: 'ChildProfile' as const },
  { number: 3, title: 'Daily Routine', summary: 'Morning School, Afternoon Therapy, Evening Bath', route: 'DailyCommunication' as const },
  { number: 4, title: 'Vocabulary Preferences', summary: 'Food, Play & Toys, Urgent Needs', route: 'DailyCommunication' as const },
  { number: 5, title: 'Personalization', summary: 'High Contrast Icons, Slow Voice Accent', route: 'Personalize' as const },
];

export default function EditOnboardingScreen({
  navigation,
}: ScreenProps<'EditOnboarding'>) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width < 420 ? 18 : 28;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Edit Onboarding</Text>
        <View style={styles.brand}><BrandLogo size={30} /><Text style={styles.brandText}>bridgely</Text></View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]}
      >
        <Text style={styles.title}>Recalibrate Setup</Text>
        <Text style={styles.subtitle}>
          Keep Bridgely aligned with your child&apos;s development by updating setup answers.
        </Text>

        <View style={styles.steps}>
          {STEPS.map((step) => (
            <Pressable
              key={step.number}
              onPress={() => navigation.navigate(step.route)}
              accessibilityRole="button"
              accessibilityLabel={`Edit step ${step.number}, ${step.title}`}
              style={({ pressed }) => [styles.stepCard, pressed && styles.pressed]}
            >
              <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>Step {step.number}</Text></View>
              <View style={styles.stepCopy}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text numberOfLines={2} style={styles.stepSummary}>{step.summary}</Text>
              </View>
              <MaterialCommunityIcons name="pencil-outline" size={20} color={colors.textSecondary} />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={() => navigation.navigate('CommunicationHub')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Recalibrate Communication Board</Text>
        </Pressable>
        <Pressable
          onPress={() => Alert.alert('Reset setup?', 'This frontend preview does not persist changes.', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Reset', style: 'destructive' },
          ])}
          accessibilityRole="button"
          style={styles.resetButton}
        >
          <Text style={styles.resetText}>Reset to Brand Default Settings</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    minHeight: 62, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center',
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  backButton: {
    width: 42, height: 42, borderRadius: 12, borderWidth: 1,
    borderColor: colors.inputBorder, backgroundColor: colors.card,
    alignItems: 'center', justifyContent: 'center',
  },
  topTitle: {
    position: 'absolute', left: 0, right: 0, textAlign: 'center',
    color: colors.textPrimary, fontSize: 18, fontWeight: '800',
  },
  brand: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5 },
  brandText: { color: colors.textPrimary, fontSize: 12, fontWeight: '800' },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingTop: 28, paddingBottom: 40 },
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: {
    color: colors.textSecondary, fontSize: 14, lineHeight: 21,
    textAlign: 'center', marginTop: 8, marginBottom: 24,
  },
  steps: { gap: 12 },
  stepCard: {
    minHeight: 84, flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 16, borderWidth: 1, borderColor: colors.border,
    borderRadius: 18, backgroundColor: colors.card,
  },
  stepBadge: { backgroundColor: colors.stepBadgeBg, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 },
  stepBadgeText: { color: colors.stepBadgeText, fontSize: 11, fontWeight: '800' },
  stepCopy: { flex: 1 },
  stepTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  stepSummary: { color: colors.textSecondary, fontSize: 12, lineHeight: 17, marginTop: 4 },
  cta: { minHeight: 56, marginTop: 24, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: colors.onPrimary, fontSize: 15, fontWeight: '800' },
  resetButton: { minHeight: 48, alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  resetText: { color: colors.primary, fontSize: 13, fontWeight: '700', textDecorationLine: 'underline' },
  pressed: { opacity: 0.72 },
});
