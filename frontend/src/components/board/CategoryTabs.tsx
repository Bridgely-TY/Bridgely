import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CATEGORIES } from '../../data/starterBoards';
import { colors } from '../../theme/colors';

interface CategoryTabsProps {
  activeId: string;
  onSelect: (id: string) => void;
  onHome: () => void;
}

/**
 * Bottom navigation for the board: a home button plus one tab per category.
 * The active category is highlighted using its own palette.
 */
export default function CategoryTabs({ activeId, onSelect, onHome }: CategoryTabsProps) {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={onHome}
        accessibilityRole="button"
        accessibilityLabel="Back to categories"
        style={({ pressed }) => [styles.homeBtn, pressed && styles.pressed]}
      >
        <MaterialCommunityIcons name="home-outline" size={24} color={colors.textSecondary} />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabs}
      >
        {CATEGORIES.map((cat) => {
          const active = cat.id === activeId;
          return (
            <Pressable
              key={cat.id}
              onPress={() => onSelect(cat.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={cat.name}
              style={({ pressed }) => [
                styles.tab,
                active
                  ? { backgroundColor: cat.palette.cellBg, borderColor: cat.palette.cellBorder }
                  : styles.tabInactive,
                pressed && styles.pressed,
              ]}
            >
              <MaterialCommunityIcons
                name={cat.hubIcon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
                size={20}
                color={active ? cat.palette.accent : colors.textSecondary}
              />
              <Text
                style={[
                  styles.tabText,
                  { color: active ? cat.palette.accent : colors.textSecondary },
                ]}
              >
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  homeBtn: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  tabInactive: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
