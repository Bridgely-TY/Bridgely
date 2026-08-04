import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import BoardIcon from './BoardIcon';
import type { BoardDisplay, CategoryPalette, StarterCell } from '../../data/starterBoards';

interface BoardCellProps {
  cell: StarterCell;
  display: BoardDisplay;
  palette: CategoryPalette;
  onPress: () => void;
}

/**
 * A single tappable board cell. Renders icon + label, text-only, or icon-only
 * depending on the category's display mode.
 */
export default function BoardCell({ cell, display, palette, onPress }: BoardCellProps) {
  const showIcon = display === 'both' || display === 'icon';
  const showLabel = display === 'both' || display === 'text';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={cell.label}
      style={({ pressed }) => [
        styles.cell,
        { backgroundColor: palette.cellBg, borderColor: palette.cellBorder },
        pressed && styles.pressed,
      ]}
    >
      {showIcon && (
        <BoardIcon
          name={cell.icon}
          color={palette.accent}
          size={display === 'icon' ? 44 : 32}
        />
      )}
      {showLabel && (
        <Text
          style={[
            styles.label,
            { color: palette.label },
            display === 'text' && styles.labelTextOnly,
            showIcon && styles.labelWithIcon,
          ]}
          numberOfLines={2}
        >
          {cell.label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    flex: 1,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    minHeight: 78,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelWithIcon: {
    marginTop: 6,
  },
  labelTextOnly: {
    fontSize: 18,
    fontWeight: '700',
  },
});
