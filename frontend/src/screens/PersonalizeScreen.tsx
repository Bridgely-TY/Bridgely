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

const ACTIVITY_OPTIONS = [
  'Playing Outside', 'Drawing', 'Music', 'Watching TV', 'Reading',
  'Swimming', 'Building Blocks', 'Dancing', 'Animals',
  'Video Games', 'Cooking', 'Puzzles', 'Other',
];

const SENSORY_OPTIONS = [
  'Bigger Buttons', 'Bigger Pictures', 'Only Visual Aids', 'Only Text Aids',
  'High Contrast Mode', 'Simplified Layout', 'Fewer Options Per Screen', 'Audio Feedback',
];

/**
 * Onboarding Step 4 of 4: "Personalize Bridgely".
 *
 * Collects favourites, things to avoid, sensory/display presets, and free notes.
 * Front-end only — state is held locally; no persistence.
 */
export default function PersonalizeScreen({ navigation }: ScreenProps<'Personalize'>) {
  const [foods, setFoods] = useState<string[]>(['Pizza']);
  const [people, setPeople] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>(ACTIVITY_OPTIONS);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([
    'Playing Outside', 'Drawing', 'Building Blocks',
  ]);
  const [customActivity, setCustomActivity] = useState('');
  const [avoid, setAvoid] = useState<string[]>(['Small buttons']);
  const [sensory, setSensory] = useState<string[]>(['Bigger Buttons', 'Simplified Layout']);
  const [notes, setNotes] = useState('');

  const addTag = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) => setter((prev) => (prev.includes(value) ? prev : [...prev, value]));

  const removeTag = (setter: React.Dispatch<React.SetStateAction<string[]>>) =>
    (value: string) => setter((prev) => prev.filter((x) => x !== value));

  const toggle = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => setter(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);

  const addCustomActivity = () => {
    const value = customActivity.trim();
    if (value) {
      if (!activities.includes(value)) setActivities((prev) => [...prev, value]);
      if (!selectedActivities.includes(value)) {
        setSelectedActivities((prev) => [...prev, value]);
      }
    }
    setCustomActivity('');
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <BrandLogo size={34} />
          <Text style={styles.brandText}>bridgely</Text>
        </View>
        <View style={styles.stepBadge}>
          <Text style={styles.stepBadgeText}>Step 4 of 4</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.backLink} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{'\u2190'}  Back</Text>
        </Pressable>

        <Text style={styles.title}>Personalize Bridgely</Text>
        <Text style={styles.subtitle}>
          Tell us what your child loves (and doesn't) so we can make Bridgely feel like theirs.
        </Text>

        <View style={styles.card}>
          {/* Favourite Foods */}
          <FieldLabel
            label="Favourite Foods"
            required
            helper="We'll add these to their communication boards."
          />
          <TagInput
            placeholder="Type a food..."
            tags={foods}
            onAdd={addTag(setFoods)}
            onRemove={removeTag(setFoods)}
          />

          {/* Favourite People */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Favourite People"
            required
            helper="We'll include familiar names in conversation prompts."
          />
          <TagInput
            placeholder="e.g. Mom, Dad, Grandma, Ms. Sarah..."
            tags={people}
            onAdd={addTag(setPeople)}
            onRemove={removeTag(setPeople)}
            showAddButton={false}
          />

          {/* Favourite Activities & Hobbies */}
          <View style={styles.fieldSpacer} />
          <FieldLabel
            label="Favourite Activities & Hobbies"
            required
            helper="Helps generate visual category boards for quick engagement."
          />
          <View style={styles.chipWrap}>
            {activities.map((a) => (
              <SelectableChip
                key={a}
                label={a}
                selected={selectedActivities.includes(a)}
                onPress={() => toggle(a, selectedActivities, setSelectedActivities)}
              />
            ))}
          </View>
          <TextInput
            style={[styles.input, { marginTop: 14 }]}
            placeholder="Type your own..."
            placeholderTextColor={colors.placeholder}
            value={customActivity}
            onChangeText={setCustomActivity}
            onSubmitEditing={addCustomActivity}
            returnKeyType="done"
          />

          {/* Things to Avoid */}
          <View style={styles.fieldSpacer} />
          <View style={styles.labelWrap}>
            <Text style={styles.label}>Things to Avoid</Text>
            <Text style={styles.helperAlert}>Things that frustrate or overwhelm your child</Text>
            <Text style={styles.helper}>We'll adjust content to avoid known triggers.</Text>
          </View>
          <TagInput
            placeholder="Type something to avoid..."
            tags={avoid}
            onAdd={addTag(setAvoid)}
            onRemove={removeTag(setAvoid)}
          />

          {/* Sensory & Display Needs */}
          <View style={styles.fieldSpacer} />
          <View style={styles.labelWrap}>
            <Text style={styles.label}>Sensory & Display Needs</Text>
            <Text style={styles.helperBlue}>How should Bridgely look and feel?</Text>
            <Text style={styles.helper}>Presets visual parameters and physical interaction rules.</Text>
          </View>
          <View style={styles.chipWrap}>
            {SENSORY_OPTIONS.map((s) => (
              <SelectableChip
                key={s}
                label={s}
                selected={sensory.includes(s)}
                onPress={() => toggle(s, sensory, setSensory)}
              />
            ))}
          </View>

          {/* Anything Else */}
          <View style={styles.fieldSpacer} />
          <View style={styles.labelWrap}>
            <Text style={styles.label}>
              Anything Else We Should Know? <Text style={styles.optional}>(Optional)</Text>
            </Text>
            <Text style={styles.helperAlert}>
              Share anything about how your child communicates, what motivates them, or what
              helps them feel comfortable.
            </Text>
            <Text style={styles.helper}>
              e.g. 'She responds well to songs', 'He uses the word more a lot', 'Prefers pictures over text'
            </Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="e.g. She calms down with music, He already says 'more' and 'no', Responds best to pictures..."
            placeholderTextColor={colors.placeholder}
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        <Pressable
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
          onPress={() => navigation.navigate('Caregiver')}
        >
          <Text style={styles.ctaText}>Finish Setup</Text>
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

  labelWrap: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  optional: { color: colors.accentBlue, fontWeight: '700' },
  helper: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },
  helperAlert: { fontSize: 13, color: colors.helperAlert, fontWeight: '600', marginTop: 3, lineHeight: 18 },
  helperBlue: { fontSize: 13, color: colors.accentBlue, fontWeight: '600', marginTop: 3 },

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
  textArea: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.card,
    minHeight: 110,
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
