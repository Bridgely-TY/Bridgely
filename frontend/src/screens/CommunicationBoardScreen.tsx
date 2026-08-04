import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

import BrandLogo from '../components/BrandLogo';
import BoardCell from '../components/board/BoardCell';
import SentenceBar, { SentenceWord } from '../components/board/SentenceBar';
import CategoryTabs from '../components/board/CategoryTabs';
import { colors } from '../theme/colors';
import { getCategory, paginate, type StarterCell } from '../data/starterBoards';
import type { ScreenProps } from '../navigation/types';

/**
 * Shared board screen used by every starter category. Handles the sentence bar,
 * grid rendering, pagination, category switching and text-to-speech.
 *
 * Front-end only: the sentence lives in local state and is not persisted.
 */
export default function CommunicationBoardScreen({
  route,
  navigation,
}: ScreenProps<'CommunicationBoard'>) {
  const [activeId, setActiveId] = useState(route.params.categoryId);
  const [page, setPage] = useState(0);
  const [words, setWords] = useState<SentenceWord[]>([]);

  const category = getCategory(activeId);
  const pages = useMemo(() => (category ? paginate(category) : []), [category]);

  if (!category) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.missing}>Board not found.</Text>
      </SafeAreaView>
    );
  }

  const currentCells = pages[page] ?? [];
  const hasPages = pages.length > 1;

  const handleCellPress = (cell: StarterCell) => {
    setWords((prev) => [
      ...prev,
      {
        label: cell.label,
        icon: cell.icon,
        accent: category.palette.accent,
        bg: category.palette.cellBg,
        display: category.display,
      },
    ]);
  };

  const handleSpeak = () => {
    if (words.length === 0) return;
    Speech.stop();
    Speech.speak(words.map((w) => w.label).join(' '));
  };

  const switchCategory = (id: string) => {
    setActiveId(id);
    setPage(0);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <BrandLogo size={38} />
        <View style={styles.spacer} />
        <View style={[styles.pill, { backgroundColor: category.palette.pillBg }]}>
          <MaterialCommunityIcons
            name={category.hubIcon as React.ComponentProps<typeof MaterialCommunityIcons>['name']}
            size={18}
            color={category.palette.accent}
          />
          <Text style={[styles.pillText, { color: category.palette.accent }]}>
            {category.pill}
          </Text>
        </View>
        <View style={styles.spacer} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Settings"
          style={({ pressed }) => [styles.gear, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons name="cog-outline" size={24} color={colors.textSecondary} />
        </Pressable>
      </View>

      {/* Sentence bar */}
      <View style={styles.section}>
        <SentenceBar
          words={words}
          onSpeak={handleSpeak}
          onClear={() => setWords([])}
          onRemoveLast={() => setWords((prev) => prev.slice(0, -1))}
        />
      </View>

      {/* Grid */}
      <View style={styles.gridWrap}>
        <View style={styles.grid}>
          {Array.from({ length: category.rows }).map((_, r) => (
            <View key={`row-${r}`} style={styles.row}>
              {Array.from({ length: category.cols }).map((_, c) => {
                const cell = currentCells[r * category.cols + c];
                if (!cell) {
                  return <View key={`empty-${r}-${c}`} style={styles.cellSlot} />;
                }
                return (
                  <View key={`${cell.label}-${c}`} style={styles.cellSlot}>
                    <BoardCell
                      cell={cell}
                      display={category.display}
                      palette={category.palette}
                      onPress={() => handleCellPress(cell)}
                    />
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {hasPages && (
          <View style={styles.pagination}>
            <Pressable
              onPress={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              accessibilityRole="button"
              accessibilityLabel="Previous page"
              style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={26}
                color={page === 0 ? colors.textMuted : category.palette.accent}
              />
            </Pressable>

            <View style={styles.dots}>
              {pages.map((_, i) => (
                <View
                  key={`dot-${i}`}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        i === page ? category.palette.accent : colors.pageDotInactive,
                    },
                  ]}
                />
              ))}
            </View>

            <Pressable
              onPress={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
              disabled={page === pages.length - 1}
              accessibilityRole="button"
              accessibilityLabel="Next page"
              style={({ pressed }) => [styles.arrow, pressed && styles.pressed]}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={26}
                color={page === pages.length - 1 ? colors.textMuted : category.palette.accent}
              />
            </Pressable>
          </View>
        )}
      </View>

      {/* Bottom category nav */}
      <View style={styles.bottomNav}>
        <CategoryTabs
          activeId={activeId}
          onSelect={switchCategory}
          onHome={() => navigation.navigate('CommunicationHub')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  missing: {
    margin: 24,
    fontSize: 16,
    color: colors.textSecondary,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 6,
  },
  spacer: {
    flex: 1,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '800',
  },
  gear: {
    padding: 6,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 10,
  },
  gridWrap: {
    flex: 1,
    paddingHorizontal: 20,
  },
  grid: {
    flex: 1,
    gap: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  cellSlot: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 10,
  },
  arrow: {
    padding: 4,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  bottomNav: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 6,
  },
  pressed: {
    opacity: 0.7,
  },
});
