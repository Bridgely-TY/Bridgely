import {
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

type SettingsCardProps = {
  title: string;
  description: string;
  badge?: string;
  onPress: () => void;
};

export default function CaregiverScreen({ navigation }: ScreenProps<'Caregiver'>) {
  const { width } = useWindowDimensions();
  const horizontalPadding = width < 420 ? 18 : 28;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.topBar, { paddingHorizontal: horizontalPadding }]}>
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityRole="button"
          accessibilityLabel="Back"
          style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color={colors.textPrimary} />
        </Pressable>
        <Text style={styles.topTitle}>Settings</Text>
        <View style={styles.brand}>
          <BrandLogo size={30} />
          <Text style={styles.brandText}>bridgely</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Parent &amp; Caregiver Space</Text>
        <Text style={styles.subtitle}>
          Customize settings, manage vocabulary boards, and switch profiles.
        </Text>

        <View style={styles.cards}>
          <SettingsCard
            title="Caregiver Profile"
            description="Manage your profile, contact details, primary role, and caregiver preferences."
            onPress={() => navigation.navigate('CaregiverProfile')}
          />
          <SettingsCard
            title="Child Mode"
            badge="PIN Protected"
            description="Control board interactions, voice preferences, visible folders, and exit protection."
            onPress={() => navigation.navigate('ChildModeSettings')}
          />
          <SettingsCard
            title="Edit Onboarding Wizard"
            description="Review the setup questions used to personalize vocabulary and interaction choices."
            onPress={() => navigation.navigate('EditOnboarding')}
          />
          <SettingsCard
            title="Edit Boards"
            description="Create boards and add, edit, hide, or remove communication cells."
            onPress={() => navigation.navigate('BoardManager')}
          />
        </View>

        <Pressable
          onPress={() => navigation.navigate('CommunicationHub')}
          accessibilityRole="button"
          style={({ pressed }) => [styles.cta, pressed && styles.pressed]}
        >
          <Text style={styles.ctaText}>Enter Child Communication Mode</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsCard({ title, description, badge, onPress }: SettingsCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${title}. ${description}`}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardCopy}>
        <View style={styles.cardTitleRow}>
          <Text style={styles.cardTitle}>{title}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <View style={styles.chevron}>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={colors.textSecondary}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  topBar: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
  },
  brand: { marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 5 },
  brandText: { color: colors.textPrimary, fontSize: 12, fontWeight: '800' },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingTop: 16,
    paddingBottom: 36,
  },
  handle: {
    width: 136,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.pageDotInactive,
    alignSelf: 'center',
    marginBottom: 28,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 27,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 26,
  },
  cards: { gap: 14 },
  card: {
    minHeight: 108,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  cardPressed: { opacity: 0.72, transform: [{ scale: 0.995 }] },
  cardCopy: { flex: 1 },
  cardTitleRow: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  cardTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  cardDescription: {
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 7,
  },
  badge: {
    backgroundColor: colors.stepBadgeBg,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: { color: colors.stepBadgeText, fontSize: 10, fontWeight: '800' },
  chevron: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cta: {
    minHeight: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    borderRadius: 18,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  ctaText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.72 },
});
