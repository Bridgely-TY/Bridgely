import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import BrandLogo from '../components/BrandLogo';
import FieldLabel from '../components/FieldLabel';
import SelectableChip from '../components/SelectableChip';

const CAREGIVER_TYPES = ['Parent', 'Therapist', 'Teacher', 'Other'];
const USAGE_CONTEXTS = ['Home', 'School', 'Therapy', 'All of the Above'];
const CHALLENGES = [
  'Asking for Food', 'Expressing Emotions', 'Saying Yes/No',
  'Asking for Help', 'Talking About Pain', 'Following Routines',
  'Social Interaction', 'Making Choices', 'Short Attention Spans',
];
const MAX_CHALLENGES = 3;

/**
 * Onboarding Step 3 of 4: "Daily Communication".
 *
 * Collects caregiver type, usage context, and the top communication challenges.
 * Front-end only — state is held locally; no persistence.
 */
export default function DailyCommunicationScreen({
  navigation,
}: ScreenProps<'DailyCommunication'>) {
  const [caregiverType, setCaregiverType] = useState('Parent');
  const [otherCaregiver, setOtherCaregiver] = useState('');
  const [usageContext, setUsageContext] = useState('All of the Above');
  const [challenges, setChallenges] = useState<string[]>([
    'Expressing Emotions', 'Asking for Help', 'Social Interaction',
  ]);

  const toggleChallenge = (c: string) =>
    setChallenges((prev) => {
      if (prev.includes(c)) return prev.filter((x) => x !== c);
      if (prev.length >= MAX_CHALLENGES) return prev;
      return [...prev, c];
    });

  const challengesFull = challenges.length >= MAX_CHALLENGES;

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <BrandLogo size={34} />
          <Text style={styles.brandText}>bridgely</Text>
        </View>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step 3 of 4</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'\u2190'}  Back</Text>
        </Pressable>

        <Text style={styles.title}>Daily Communication</Text>
        <Text style={styles.subtitle}>
          Help us understand how your child communicates day-to-day.
        </Text>

        <View style={styles.card}>
          {/* Caregiver type */}
          <FieldLabel
            label="Who will use Bridgely with your child most often?"
            required
            helper="We will optimize the workspace setups for this caregiver type"
          />
          <View style={styles.chipWrap}>
            {CAREGIVER_TYPES.map((t) => (
              <SelectableChip
                key={t}
                label={t}
                selected={caregiverType === t}
                onPress={() => setCaregiverType(t)}
              />
            ))}
          </View>
          <TextInput
            style={[styles.input, { marginTop: 14 }]}
            placeholder="e.g. Grandparent, Sibling, Nanny..."
            placeholderTextColor={colors.placeholder}
            value={otherCaregiver}
            onChangeText={setOtherCaregiver}
          />

          {/* Usage context */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="When will they use it most?"
            required
            helper="Allows us to preload relevant contextual vocabulary sets"
          />
          <View style={styles.chipWrap}>
            {USAGE_CONTEXTS.map((c) => (
              <SelectableChip
                key={c}
                label={c}
                selected={usageContext === c}
                onPress={() => setUsageContext(c)}
              />
            ))}
          </View>

          {/* Challenges */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="What are the biggest communication challenges today?"
            required
            helper="Choose up to 3 to pin to their primary dashboard"
          />
          <View style={styles.chipWrap}>
            {CHALLENGES.map((c) => {
              const selected = challenges.includes(c);
              return (
                <SelectableChip
                  key={c}
                  label={c}
                  selected={selected}
                  disabled={!selected && challengesFull}
                  onPress={() => toggleChallenge(c)}
                />
              );
            })}
          </View>
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => navigation.navigate('Personalize')}
        >
          <Text style={styles.ctaText}>Continue to Step 4</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  brandText: { fontSize: 20, fontWeight: '800', color: colors.textPrimary, letterSpacing: -0.3 },
  stepBadge: {
    backgroundColor: colors.stepBadgeBg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  stepBadgeText: { color: colors.stepBadgeText, fontSize: 13, fontWeight: '700' },

  scrollContent: { paddingHorizontal: 28, paddingBottom: 40 },

  backLink: { alignSelf: 'flex-start', paddingVertical: 4 },
  backText: { color: colors.textSecondary, fontSize: 15, fontWeight: '600' },

  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    lineHeight: 21,
    paddingHorizontal: 8,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },

  fieldSpacer: { height: 24 },

  input: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.card,
  },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },

  cta: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaPressed: { opacity: 0.85 },
  ctaText: { color: colors.onPrimary, fontSize: 18, fontWeight: '700' },
});
