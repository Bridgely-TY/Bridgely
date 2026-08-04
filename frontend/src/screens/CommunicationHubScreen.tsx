import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BrandLogo from '../components/BrandLogo';
import { colors } from '../theme/colors';
import { CATEGORIES } from '../data/starterBoards';
import type { ScreenProps } from '../navigation/types';

/**
 * Child-mode landing screen: a hub of starter communication categories.
 * Tapping a category opens its board. Front-end only, no persistence.
 */
export default function CommunicationHubScreen({
  navigation,
}: ScreenProps<'CommunicationHub'>) {
  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <BrandLogo size={44} />
        <Text style={styles.brand}>Bridgely</Text>
        <View style={styles.spacer} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          style={({ pressed }) => [styles.gear, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="cog-outline" size={24} color={colors.textSecondary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Let's Talk</Text>
        <Text style={styles.subtitle}>Tap a category to start talking</Text>

        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() =>
                navigation.navigate('CommunicationBoard', { categoryId: cat.id })
              }
              accessibilityRole="button"
              accessibilityLabel={`${cat.name}, ${cat.cells.length} words`}
              style={({ pressed }) => [
                styles.card,
                { backgroundColor: cat.palette.cardBg },
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons
                  name={
                    cat.hubIcon as React.ComponentProps<typeof MaterialCommunityIcons>['name']
                  }
                  size={30}
                  color={cat.palette.accent}
                />
              </View>
              <Text style={styles.cardTitle}>{cat.pill}</Text>
              <Text style={styles.cardCount}>{cat.cells.length} words</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  gear: {
    padding: 6,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 4,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  card: {
    width: '48%',
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  iconCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cardCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  pressed: {
    opacity: 0.75,
  },
});
