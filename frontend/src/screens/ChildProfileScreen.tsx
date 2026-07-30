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
import TagInput from '../components/TagInput';

const AGE_OPTIONS = [
  'Under 2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15+',
];

const COMM_LEVELS = [
  {
    key: 'mostly-verbal',
    title: 'Mostly Verbal',
    desc: 'Uses spoken sentences but needs visual aids for complex feelings or when frustrated',
  },
  {
    key: 'semi-verbal',
    title: 'Semi-Verbal',
    desc: 'Communicates with single words or short phrases, requires prompting',
  },
  {
    key: 'non-verbal',
    title: 'Non-Verbal',
    desc: 'Relies entirely on gestures, expressions, or assistive tools to express needs',
  },
  {
    key: 'uses-aac',
    title: 'Uses AAC Already',
    desc: 'Familiar with standard PECS cards or other digital speech generation devices',
  },
];

const DIAGNOSES = [
  'Autism', 'Down Syndrome', 'Developmental Delay', 'Cerebral Palsy', 'Other', 'Prefer Not to Say',
];

const INTERACTIONS = [
  'One Finger', 'Multiple Fingers', 'Whole Hand', 'Eye Gaze', 'Switch Access', 'Not Sure',
];

/**
 * Onboarding Step 2 of 4: "Tell us about your child".
 *
 * A long scrollable form collecting the child's profile used to personalize
 * boards. Front-end only — state is held locally; no persistence yet.
 */
export default function ChildProfileScreen({ navigation }: ScreenProps<'ChildProfile'>) {
  const [name, setName] = useState('');
  const [age, setAge] = useState<string | null>(null);
  const [ageOpen, setAgeOpen] = useState(false);
  const [commLevel, setCommLevel] = useState('semi-verbal');
  const [languages, setLanguages] = useState<string[]>(['English']);
  const [diagnoses, setDiagnoses] = useState<string[]>(['Autism']);
  const [otherDiagnosis, setOtherDiagnosis] = useState('');
  const [interaction, setInteraction] = useState('One Finger');
  const [vision, setVision] = useState<'No' | 'Yes'>('No');

  const addLanguage = (value: string) => {
    if (!languages.includes(value)) {
      setLanguages((prev) => [...prev, value]);
    }
  };

  const removeLanguage = (lang: string) =>
    setLanguages((prev) => prev.filter((l) => l !== lang));

  const toggleDiagnosis = (d: string) =>
    setDiagnoses((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <BrandLogo size={34} />
          <Text style={styles.brandText}>bridgely</Text>
        </View>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step 2 of 4</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'\u2190'}  Back</Text>
        </Pressable>

        <Text style={styles.title}>Tell us about your child</Text>
        <Text style={styles.subtitle}>
          This helps us personalize Bridgely to make communication easier for them.
        </Text>

        <View style={styles.card}>
          {/* Child's Name */}
          <FieldLabel label="Child's Name" required helper="What should we call your child?" />
          <TextInput
            style={styles.input}
            placeholder="e.g. Leo"
            placeholderTextColor={colors.placeholder}
            value={name}
            onChangeText={setName}
          />

          {/* Cognitive Age */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Cognitive Age"
            required
            helper="We tailor vocabularies and icon packs based on cognitive age"
          />
          <Pressable
            style={styles.select}
            onPress={() => setAgeOpen((o) => !o)}
          >
            <Text style={[styles.selectText, !age && styles.placeholderText]}>
              {age ?? 'Select age...'}
            </Text>
            <Text style={styles.chevron}>{ageOpen ? '\u25B4' : '\u25BE'}</Text>
          </Pressable>
          {ageOpen && (
            <View style={styles.optionList}>
              {AGE_OPTIONS.map((opt, idx) => {
                const selected = opt === age;
                return (
                  <Pressable
                    key={opt}
                    style={[
                      styles.option,
                      idx < AGE_OPTIONS.length - 1 && styles.optionDivider,
                      selected && styles.optionSelected,
                    ]}
                    onPress={() => {
                      setAge(opt);
                      setAgeOpen(false);
                    }}
                  >
                    <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Communication Level */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Communication Level"
            required
            helper="Choose the description that fits best today"
          />
          <View style={{ gap: 12 }}>
            {COMM_LEVELS.map((level) => {
              const selected = level.key === commLevel;
              return (
                <Pressable
                  key={level.key}
                  style={[styles.radioCard, selected && styles.radioCardSelected]}
                  onPress={() => setCommLevel(level.key)}
                >
                  <View style={styles.radioCardBody}>
                    <Text style={[styles.radioTitle, selected && styles.radioTitleSelected]}>
                      {level.title}
                    </Text>
                    <Text style={[styles.radioDesc, selected && styles.radioDescSelected]}>
                      {level.desc}
                    </Text>
                  </View>
                  <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                    {selected && <View style={styles.radioInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>

          {/* Languages */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Languages Spoken at Home"
            required
            helper="Supports bilingual boards and speech synthesis"
          />
          <TagInput
            placeholder="Type a language..."
            tags={languages}
            onAdd={addLanguage}
            onRemove={removeLanguage}
          />

          {/* Diagnoses */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Diagnoses (Optional)"
            helper="Helps adapt interface parameters for sensory preferences"
          />
          <View style={styles.chipWrap}>
            {DIAGNOSES.map((d) => (
              <SelectableChip
                key={d}
                label={d}
                selected={diagnoses.includes(d)}
                onPress={() => toggleDiagnosis(d)}
              />
            ))}
          </View>
          <TextInput
            style={[styles.input, { marginTop: 14 }]}
            placeholder="Specify diagnosis if other..."
            placeholderTextColor={colors.placeholder}
            value={otherDiagnosis}
            onChangeText={setOtherDiagnosis}
          />

          {/* Interaction */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="How does your child interact with a device?"
            required
            helper="Adapts tap sensitivity and button sizing"
          />
          <View style={styles.chipWrap}>
            {INTERACTIONS.map((i) => (
              <SelectableChip
                key={i}
                label={i}
                selected={interaction === i}
                onPress={() => setInteraction(i)}
              />
            ))}
          </View>

          {/* Vision impairment */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Vision Impairment?"
            helper="This means low vision, not full blindness."
          />
          <YesNoToggle value={vision} onChange={setVision} />
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => navigation.navigate('DailyCommunication')}
        >
          <Text style={styles.ctaText}>Continue to Step 2</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Local subcomponents ---------- */

function YesNoToggle({
  value,
  onChange,
}: {
  value: 'No' | 'Yes';
  onChange: (v: 'No' | 'Yes') => void;
}) {
  return (
    <View style={styles.toggleRow}>
      {(['No', 'Yes'] as const).map((opt) => {
        const selected = value === opt;
        return (
          <Pressable
            key={opt}
            style={[styles.toggle, selected && styles.toggleSelected]}
            onPress={() => onChange(opt)}
          >
            <Text style={[styles.toggleText, selected && styles.toggleTextSelected]}>
              {opt}
            </Text>
          </Pressable>
        );
      })}
    </View>
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

  select: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.card,
  },
  selectText: { fontSize: 15, color: colors.textPrimary },
  placeholderText: { color: colors.placeholder },
  chevron: { fontSize: 14, color: colors.textMuted },

  optionList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    overflow: 'hidden',
  },
  option: { paddingHorizontal: 16, paddingVertical: 14 },
  optionDivider: { borderBottomWidth: 1, borderBottomColor: '#F0ECE4' },
  optionSelected: { backgroundColor: colors.optionHighlightBg },
  optionText: { fontSize: 15, color: colors.textPrimary },
  optionTextSelected: { color: colors.optionHighlightText, fontWeight: '700' },

  radioCard: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
  },
  radioCardSelected: {
    backgroundColor: colors.selectedCardBg,
    borderColor: colors.selectedCardBorder,
  },
  radioCardBody: { flex: 1 },
  radioTitle: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  radioTitleSelected: { color: colors.selectedCardText },
  radioDesc: { fontSize: 13, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
  radioDescSelected: { color: colors.selectedCardText },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: colors.radioFill },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.radioFill },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },

  toggleRow: { flexDirection: 'row', gap: 12 },
  toggle: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: 'center',
    backgroundColor: colors.card,
  },
  toggleSelected: { backgroundColor: colors.toggleSelectedBg, borderColor: colors.toggleSelectedBg },
  toggleText: { fontSize: 15, fontWeight: '700', color: colors.textPrimary },
  toggleTextSelected: { color: colors.toggleSelectedText },

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
