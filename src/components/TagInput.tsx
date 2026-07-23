import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  placeholder: string;
  tags: string[];
  onAdd: (value: string) => void;
  onRemove: (tag: string) => void;
  /** Show the orange "Add" button. When false, tags are added via the return key. */
  showAddButton?: boolean;
};

/**
 * Text field that turns entries into removable chips.
 * Used for languages, favourite foods, things to avoid, etc.
 */
export default function TagInput({
  placeholder,
  tags,
  onAdd,
  onRemove,
  showAddButton = true,
}: Props) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (trimmed) onAdd(trimmed);
    setValue('');
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          value={value}
          onChangeText={setValue}
          onSubmitEditing={submit}
          returnKeyType="done"
        />
        {showAddButton && (
          <Pressable style={styles.addButton} onPress={submit}>
            <Text style={styles.addButtonText}>Add</Text>
          </Pressable>
        )}
      </View>

      {tags.length > 0 && (
        <View style={styles.chipWrap}>
          {tags.map((tag) => (
            <View key={tag} style={styles.chip}>
              <Text style={styles.chipText}>{tag}</Text>
              <Pressable onPress={() => onRemove(tag)} hitSlop={8}>
                <View style={styles.removeCircle}>
                  <Text style={styles.removeX}>{'\u00D7'}</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 6,
    backgroundColor: colors.card,
  },
  input: { flex: 1, fontSize: 15, color: colors.textPrimary, paddingVertical: 8 },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 22,
    paddingVertical: 10,
  },
  addButtonText: { color: colors.onPrimary, fontSize: 15, fontWeight: '700' },

  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 12 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 20,
    paddingLeft: 14,
    paddingRight: 8,
    paddingVertical: 8,
    backgroundColor: colors.card,
  },
  chipText: { fontSize: 14, fontWeight: '700', color: colors.textPrimary },
  removeCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeX: { color: colors.onPrimary, fontSize: 12, fontWeight: '800', lineHeight: 14 },
});
