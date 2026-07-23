import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
};

/** Pill-shaped selectable chip: white when unselected, orange when selected. */
export default function SelectableChip({ label, selected, onPress, disabled }: Props) {
  return (
    <Pressable
      style={[
        styles.chip,
        selected && styles.chipSelected,
        disabled && !selected && styles.chipDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 11,
    backgroundColor: colors.card,
  },
  chipSelected: { backgroundColor: colors.chipSelectedBg, borderColor: colors.chipSelectedBg },
  chipDisabled: { opacity: 0.45 },
  text: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  textSelected: { color: colors.chipSelectedText },
});
