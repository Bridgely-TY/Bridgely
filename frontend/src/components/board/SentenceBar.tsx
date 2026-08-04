import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BoardIcon from './BoardIcon';
import { colors } from '../../theme/colors';

export interface SentenceWord {
  label: string;
  icon?: string;
  accent: string;
  bg: string;
  display: 'both' | 'text' | 'icon';
}

interface SentenceBarProps {
  words: SentenceWord[];
  onSpeak: () => void;
  onClear: () => void;
  onRemoveLast: () => void;
}

/**
 * The sentence strip at the top of a board. Shows the words the child has
 * tapped as chips, a Speak button (TTS) and a clear/backspace control.
 */
export default function SentenceBar({
  words,
  onSpeak,
  onClear,
  onRemoveLast,
}: SentenceBarProps) {
  const empty = words.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.strip}>
        {empty ? (
          <Text style={styles.placeholder}>Tap words to build a sentence…</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
          >
            {words.map((w, i) => (
              <View
                key={`${w.label}-${i}`}
                style={[styles.chip, { backgroundColor: w.bg }]}
              >
                {w.display !== 'text' && (
                  <BoardIcon name={w.icon} color={w.accent} size={18} />
                )}
                <Text style={[styles.chipText, { color: w.accent }]}>
                  {w.label}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        <Pressable
          onPress={onRemoveLast}
          disabled={empty}
          accessibilityRole="button"
          accessibilityLabel="Delete last word"
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name="backspace-outline"
            size={22}
            color={empty ? colors.textMuted : colors.textSecondary}
          />
        </Pressable>

        <Pressable
          onPress={onClear}
          disabled={empty}
          accessibilityRole="button"
          accessibilityLabel="Clear sentence"
          style={({ pressed }) => [styles.iconBtn, pressed && styles.pressed]}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={22}
            color={empty ? colors.textMuted : colors.textSecondary}
          />
        </Pressable>
      </View>

      <Pressable
        onPress={onSpeak}
        disabled={empty}
        accessibilityRole="button"
        accessibilityLabel="Speak sentence"
        style={({ pressed }) => [
          styles.speak,
          empty && styles.speakDisabled,
          pressed && styles.pressed,
        ]}
      >
        <MaterialCommunityIcons name="volume-high" size={22} color={colors.onPrimary} />
        <Text style={styles.speakText}>Speak</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  strip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 12,
    minHeight: 58,
  },
  placeholder: {
    flex: 1,
    fontSize: 15,
    color: colors.textMuted,
  },
  chips: {
    alignItems: 'center',
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  chipText: {
    fontSize: 15,
    fontWeight: '700',
  },
  iconBtn: {
    padding: 6,
  },
  speak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 16,
  },
  speakDisabled: {
    opacity: 0.5,
  },
  speakText: {
    color: colors.onPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.7,
  },
});
