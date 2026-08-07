import React from 'react';
import {
  Pressable,
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
  // Group categories into rows of two so the grid can fill the page vertically.
  const rows: (typeof CATEGORIES)[] = [];
  for (let i = 0; i < CATEGORIES.length; i += 2) {
    rows.push(CATEGORIES.slice(i, i + 2));
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <BrandLogo size={44} />
        <Text style={styles.brand}>Bridgely</Text>
        <View style={styles.spacer} />
        <Pressable
          onPress={() => navigation.navigate('Caregiver')}
          accessibilityRole="button"
          accessibilityLabel="Open caregiver settings"
          style={({ pressed }) => [styles.gear, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="cog-outline" size={24} color={colors.textSecondary} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Let's Talk</Text>
        <Text style={styles.subtitle}>Tap a category to start talking</Text>

        <View style={styles.grid}>
          {rows.map((row, rowIndex) => (
            <View key={`row-${rowIndex}`} style={styles.row}>
              {row.map((cat) => (
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
                        cat.hubIcon as React.ComponentProps<
                          typeof MaterialCommunityIcons
                        >['name']
                      }
                      size={38}
                      color={cat.palette.accent}
                    />
                  </View>
                  <Text style={styles.cardTitle}>{cat.pill}</Text>
                  <Text style={styles.cardCount}>{cat.cells.length} words</Text>
                </Pressable>
              ))}
            </View>
          ))}
        </View>
      </View>
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
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    flex: 1,
    gap: 16,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 16,
  },
  card: {
    flex: 1,
    borderRadius: 22,
    paddingVertical: 24,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  cardCount: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
