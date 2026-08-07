import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import BrandLogo from '../components/BrandLogo';
import FieldLabel from '../components/FieldLabel';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';

const ROLES = ['Parent', 'Therapist', 'Teacher'] as const;
const WORD_USAGE = [
  ['I want', 142],
  ['More', 98],
  ['Play', 87],
  ['Eat', 76],
  ['Happy', 61],
  ['Help', 53],
] as const;

export default function CaregiverProfileScreen({
  navigation,
}: ScreenProps<'CaregiverProfile'>) {
  const { width } = useWindowDimensions();
  const [firstName, setFirstName] = useState('Sarah');
  const [lastName, setLastName] = useState('Jenkins');
  const [email, setEmail] = useState('sarah.jenkins@example.com');
  const [phone, setPhone] = useState('+1 (555) 019-2834');
  const [role, setRole] = useState<(typeof ROLES)[number]>('Parent');
  const [alternatePhoto, setAlternatePhoto] = useState(false);
  const [saved, setSaved] = useState(false);
  const horizontalPadding = width < 420 ? 18 : 28;

  return (
    <SafeAreaView style={styles.safe}>
      <ScreenHeader title="Caregiver Profile" onBack={() => navigation.goBack()} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingHorizontal: horizontalPadding }]}
      >
        <Text style={styles.title}>Caregiver Profile</Text>
        <Text style={styles.subtitle}>
          Update your profile details and primary role for your child&apos;s account.
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Photo</Text>
          <Text style={styles.helper}>Use a photo that helps your child recognize you.</Text>
          <View style={styles.photoRow}>
            <View style={styles.avatar}>
              {alternatePhoto ? (
                <MaterialCommunityIcons name="account-heart" size={34} color={colors.accentBlue} />
              ) : (
                <Text style={styles.avatarText}>SJ</Text>
              )}
            </View>
            <Pressable
              onPress={() => setAlternatePhoto((current) => !current)}
              accessibilityRole="button"
              style={styles.textButton}
            >
              <Text style={styles.textButtonLabel}>Change Photo</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Profile Details</Text>
          <ProfileInput label="First Name" value={firstName} onChangeText={setFirstName} />
          <ProfileInput label="Last Name" value={lastName} onChangeText={setLastName} />
          <ProfileInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <ProfileInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Your Primary Role</Text>
          <Text style={styles.helper}>Choose the role that best describes your relationship.</Text>
          <View style={styles.roleRow}>
            {ROLES.map((option) => {
              const selected = role === option;
              return (
                <Pressable
                  key={option}
                  onPress={() => setRole(option)}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  style={[styles.role, selected && styles.roleSelected]}
                >
                  <Text style={[styles.roleText, selected && styles.roleTextSelected]}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Data Analytics</Text>
          <Text style={styles.helper}>A frontend preview of recent communication activity.</Text>
          <View style={styles.analyticsGrid}>
            <View style={styles.analyticsPanel}>
              <Text style={styles.analyticsTitle}>Most Used Words &amp; Phrases</Text>
              {WORD_USAGE.map(([word, count]) => (
                <View key={word} style={styles.wordRow}>
                  <View style={styles.wordHeading}>
                    <Text style={styles.wordLabel}>{word}</Text>
                    <Text style={styles.wordCount}>{count}</Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.bar, { width: `${(count / 142) * 100}%` }]} />
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.analyticsPanel}>
              <Text style={styles.analyticsTitle}>Usage by Time of Day</Text>
              {[
                ['Morning 6-12', '23%'],
                ['Afternoon 12-5', '41%'],
                ['Evening 5-9', '28%'],
                ['Night 9-6', '8%'],
              ].map(([period, percentage], index) => (
                <View key={period} style={[styles.timeRow, index === 1 && styles.timeRowActive]}>
                  <Text style={styles.timeLabel}>{period}</Text>
                  <Text style={styles.timeValue}>{percentage}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {saved && (
          <Text accessibilityRole="alert" style={styles.saved}>Profile changes saved for this preview.</Text>
        )}
        <Pressable
          onPress={() => setSaved(true)}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Save Changes</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileInput({
  label,
  value,
  onChangeText,
  keyboardType,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) {
  return (
    <View style={styles.inputWrap}>
      <FieldLabel label={label} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        accessibilityLabel={label}
        style={styles.input}
      />
    </View>
  );
}

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <View style={styles.topBar}>
      <Pressable onPress={onBack} accessibilityRole="button" style={styles.backButton}>
        <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
      </Pressable>
      <Text style={styles.topTitle}>{title}</Text>
      <View style={styles.brand}><BrandLogo size={30} /><Text style={styles.brandText}>bridgely</Text></View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    minHeight: 62,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
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
  content: { width: '100%', maxWidth: 800, alignSelf: 'center', paddingTop: 28, paddingBottom: 40 },
  title: { color: colors.textPrimary, fontSize: 28, fontWeight: '800', textAlign: 'center' },
  subtitle: { color: colors.textSecondary, fontSize: 14, textAlign: 'center', marginTop: 7, marginBottom: 22 },
  card: {
    backgroundColor: colors.card, borderRadius: 20, borderWidth: 1,
    borderColor: colors.border, padding: 20, marginBottom: 14,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800' },
  helper: { color: colors.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 5 },
  photoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 18 },
  avatar: {
    width: 70, height: 70, borderRadius: 35, backgroundColor: colors.stepBadgeBg,
    alignItems: 'center', justifyContent: 'center',
  },
  avatarText: { color: colors.accentBlue, fontSize: 22, fontWeight: '800' },
  textButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: 10 },
  textButtonLabel: { color: colors.primary, fontSize: 14, fontWeight: '800' },
  inputWrap: { marginTop: 16 },
  input: {
    minHeight: 50, borderWidth: 1, borderColor: colors.inputBorder,
    borderRadius: 13, paddingHorizontal: 15, color: colors.textPrimary, fontSize: 15,
  },
  roleRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  role: {
    minHeight: 44, minWidth: 120, flexGrow: 1, alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: colors.inputBorder, borderRadius: 13,
  },
  roleSelected: { borderColor: colors.primary, backgroundColor: colors.optionHighlightBg },
  roleText: { color: colors.textSecondary, fontSize: 14, fontWeight: '700' },
  roleTextSelected: { color: colors.primary },
  analyticsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 16 },
  analyticsPanel: {
    minWidth: 260, flex: 1, borderWidth: 1, borderColor: colors.border,
    borderRadius: 16, padding: 14,
  },
  analyticsTitle: { color: colors.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 12 },
  wordRow: { marginBottom: 9 },
  wordHeading: { flexDirection: 'row', justifyContent: 'space-between' },
  wordLabel: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' },
  wordCount: { color: colors.primary, fontSize: 12, fontWeight: '800' },
  track: { height: 6, borderRadius: 3, backgroundColor: colors.border, marginTop: 4, overflow: 'hidden' },
  bar: { height: 6, borderRadius: 3, backgroundColor: colors.primary },
  timeRow: {
    minHeight: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    borderWidth: 1, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 11, marginBottom: 8,
  },
  timeRowActive: { borderColor: colors.primary, backgroundColor: colors.optionHighlightBg },
  timeLabel: { color: colors.textPrimary, fontSize: 12, fontWeight: '700' },
  timeValue: { color: colors.textSecondary, fontSize: 12, fontWeight: '700' },
  saved: { color: colors.tilePlayText, textAlign: 'center', fontWeight: '700', marginBottom: 10 },
  cta: { minHeight: 56, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.72 },
});
