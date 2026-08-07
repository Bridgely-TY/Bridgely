import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrandLogo from '../components/BrandLogo';
import { CATEGORIES } from '../data/starterBoards';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';

const ACCENTS = ['US Friendly (Kid)', 'UK Gentle', 'AU Playful'];
const SPEEDS = ['Slow (0.8x)', 'Normal (1.0x)', 'Fast (1.2x)'];

export default function ChildModeSettingsScreen({
  navigation,
}: ScreenProps<'ChildModeSettings'>) {
  const { width } = useWindowDimensions();
  const [lockNavigation, setLockNavigation] = useState(true);
  const [hideSettings, setHideSettings] = useState(true);
  const [requirePin, setRequirePin] = useState(false);
  const [speed, setSpeed] = useState(SPEEDS[1]);
  const [accent, setAccent] = useState(ACCENTS[0]);
  const [visible, setVisible] = useState(() => new Set(CATEGORIES.slice(0, 4).map((item) => item.id)));
  const [saved, setSaved] = useState(false);
  const horizontalPadding = width < 420 ? 18 : 28;

  const toggleCategory = (id: string) => {
    setVisible((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setSaved(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} accessibilityRole="button" style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Child Mode</Text>
        <View style={styles.brand}><BrandLogo size={30} /><Text style={styles.brandText}>bridgely</Text></View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]}
      >
        <Text style={styles.title}>Child Mode Settings</Text>
        <Text style={styles.subtitle}>
          Control board interactions, voice styles, and settings access in child mode.
        </Text>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Security &amp; Restrictions</Text>
          <ToggleRow
            title="Lock Navigation"
            description="Keep the child inside the active communication experience."
            value={lockNavigation}
            onChange={(value) => { setLockNavigation(value); setSaved(false); }}
          />
          <ToggleRow
            title="Hide Settings Icon"
            description="Remove the settings gear from child communication screens."
            value={hideSettings}
            onChange={(value) => { setHideSettings(value); setSaved(false); }}
          />
          <ToggleRow
            title="Require PIN to Exit"
            description="Ask for a caregiver PIN before leaving child mode."
            badge="PIN Protected"
            value={requirePin}
            onChange={(value) => { setRequirePin(value); setSaved(false); }}
            last
          />
        </View>

        <View style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.brandBlue }]}>Vocal Preferences</Text>
          <Text style={styles.fieldTitle}>Voice Speed</Text>
          <ChoiceRow options={SPEEDS} value={speed} onChange={(value) => { setSpeed(value); setSaved(false); }} />
          <Text style={styles.fieldTitle}>Voice Accent</Text>
          <ChoiceRow options={ACCENTS} value={accent} onChange={(value) => { setAccent(value); setSaved(false); }} />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Visible Folders</Text>
          <Text style={styles.helper}>Choose which category modules appear in child mode.</Text>
          <View style={styles.folderList}>
            {CATEGORIES.map((category, index) => {
              const selected = visible.has(category.id);
              return (
                <Pressable
                  key={category.id}
                  onPress={() => toggleCategory(category.id)}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: selected }}
                  style={[styles.folderRow, index === CATEGORIES.length - 1 && styles.folderRowLast]}
                >
                  <View style={[styles.folderIcon, { backgroundColor: category.palette.cardBg }]}>
                    <MaterialCommunityIcons
                      name={category.hubIcon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                      size={22}
                      color={category.palette.accent}
                    />
                  </View>
                  <View style={styles.folderCopy}>
                    <Text style={styles.folderTitle}>{category.name}</Text>
                    <Text style={styles.folderMeta}>{category.cells.length} words</Text>
                  </View>
                  <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
                    {selected && <MaterialCommunityIcons name="check" size={16} color={colors.onPrimary} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {saved && <Text accessibilityRole="alert" style={styles.saved}>Child mode settings saved for this preview.</Text>}
        <Pressable
          onPress={() => setSaved(true)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Save Child Mode Settings</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ToggleRow({
  title, description, badge, value, onChange, last,
}: {
  title: string; description: string; badge?: string; value: boolean;
  onChange: (value: boolean) => void; last?: boolean;
}) {
  return (
    <View style={[styles.toggleRow, last && styles.toggleRowLast]}>
      <View style={styles.toggleCopy}>
        <View style={styles.toggleTitleRow}>
          <Text style={styles.toggleTitle}>{title}</Text>
          {badge && <View style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></View>}
        </View>
        <Text style={styles.toggleDescription}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={title}
        trackColor={{ false: colors.inputBorder, true: colors.primary }}
        thumbColor={colors.card}
      />
    </View>
  );
}

function ChoiceRow({ options, value, onChange }: { options: string[]; value: string; onChange: (value: string) => void }) {
  return (
    <View style={styles.choiceRow}>
      {options.map((option) => {
        const selected = value === option;
        return (
          <Pressable
            key={option}
            onPress={() => onChange(option)}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            style={[styles.choice, selected && styles.choiceSelected]}
          >
            <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </View>
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
  subtitle: { color: colors.textSecondary, fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 8, marginBottom: 24 },
  card: {
    backgroundColor: colors.card, borderRadius: 20, borderWidth: 1,
    borderColor: colors.border, padding: 20, marginBottom: 16,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800' },
  helper: { color: colors.textSecondary, fontSize: 13, marginTop: 5 },
  toggleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 18,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  toggleRowLast: { borderBottomWidth: 0, paddingBottom: 0 },
  toggleCopy: { flex: 1 },
  toggleTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flexWrap: 'wrap' },
  toggleTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  toggleDescription: { color: colors.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  badge: { backgroundColor: colors.stepBadgeBg, borderRadius: 9, paddingHorizontal: 7, paddingVertical: 3 },
  badgeText: { color: colors.stepBadgeText, fontSize: 9, fontWeight: '800' },
  fieldTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800', marginTop: 20, marginBottom: 10 },
  choiceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 9 },
  choice: {
    minHeight: 42, minWidth: 130, flexGrow: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 13, paddingHorizontal: 10,
  },
  choiceSelected: { borderColor: colors.primary, backgroundColor: colors.optionHighlightBg },
  choiceText: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  choiceTextSelected: { color: colors.primary },
  folderList: { marginTop: 14 },
  folderRow: {
    minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  folderRowLast: { borderBottomWidth: 0 },
  folderIcon: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  folderCopy: { flex: 1 },
  folderTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '800' },
  folderMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 1,
    borderColor: colors.textMuted, alignItems: 'center', justifyContent: 'center',
  },
  checkboxSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  saved: { color: colors.tilePlayText, textAlign: 'center', fontWeight: '700', marginBottom: 10 },
  cta: { minHeight: 56, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.72 },
});
