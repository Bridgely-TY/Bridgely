import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import FieldLabel from '../components/FieldLabel';
import { deleteCell, getBoards, getCells, saveCell } from '../api/mockApi';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { Board, Cell, CellType } from '../types';

const COLOR_OPTIONS = [
  colors.stepBadgeBg,
  colors.selectedCardBg,
  colors.tilePlayBg,
  colors.tileEatBg,
  colors.tileHappyBg,
];

export default function CellEditorScreen({
  route,
  navigation,
}: ScreenProps<'CellEditor'>) {
  const { width } = useWindowDimensions();
  const { boardId, cellId } = route.params;
  const [boards, setBoards] = useState<Board[]>([]);
  const [label, setLabel] = useState('');
  const [type, setType] = useState<CellType>('speech');
  const [spokenPhrase, setSpokenPhrase] = useState('');
  const [destinationBoardId, setDestinationBoardId] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState<string>(COLOR_OPTIONS[0]);
  const [hidden, setHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([getBoards(), cellId ? getCells(boardId) : Promise.resolve([])])
      .then(([allBoards, cells]) => {
        if (!active) return;
        setBoards(allBoards);

        if (!cellId) return;
        const existing = cells.find((cell) => cell.id === cellId);
        if (!existing) {
          setError('This cell could not be found.');
          return;
        }

        setLabel(existing.label);
        setType(existing.type);
        setSpokenPhrase(existing.spokenPhrase ?? '');
        setDestinationBoardId(existing.destinationBoardId ?? '');
        setCategory(existing.category ?? '');
        setColor(existing.color ?? COLOR_OPTIONS[0]);
        setHidden(Boolean(existing.hidden));
      })
      .catch(() => setError('We could not load this cell. Please try again.'))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [boardId, cellId]);

  const availableDestinations = boards.filter((board) => board.id !== boardId);
  const horizontalPadding = width < 420 ? 18 : 28;

  const validate = () => {
    const cleanLabel = label.trim();
    if (!cleanLabel) return 'Enter a label for the cell.';
    if (cleanLabel.length > 40) return 'Cell labels must be 40 characters or fewer.';
    if (type === 'speech' && !spokenPhrase.trim()) return 'Enter the phrase this cell should speak.';
    if (spokenPhrase.trim().length > 160) return 'Spoken phrases must be 160 characters or fewer.';
    if (type === 'navigation' && !destinationBoardId) return 'Choose a destination board.';
    if (category.trim().length > 40) return 'Categories must be 40 characters or fewer.';
    return '';
  };

  const handleSave = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError('');

    const nextCell: Cell = {
      id: cellId ?? `cell-${Date.now().toString(36)}`,
      label: label.trim(),
      type,
      category: category.trim() || undefined,
      color,
      hidden,
      spokenPhrase: type === 'speech' ? spokenPhrase.trim() : undefined,
      destinationBoardId: type === 'navigation' ? destinationBoardId : undefined,
    };

    try {
      await saveCell(boardId, nextCell);
      navigation.goBack();
    } catch {
      setError('We could not save the cell. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = () => {
    if (!cellId) return;
    Alert.alert(
      `Delete "${label}"?`,
      'This removes the cell from this board.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setSaving(true);
            setError('');
            try {
              await deleteCell(boardId, cellId);
              navigation.goBack();
            } catch {
              setError('We could not delete the cell. Please try again.');
              setSaving(false);
            }
          },
        },
      ],
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe} edges={['bottom']}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading cell...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            { paddingHorizontal: horizontalPadding },
          ]}
        >
          <Text style={styles.eyebrow}>COMMUNICATION CELL</Text>
          <Text style={styles.title}>{cellId ? 'Edit cell' : 'Add a cell'}</Text>
          <Text style={styles.subtitle}>
            Set what the child sees and what happens when they tap it.
          </Text>

          <View style={styles.card}>
            <FieldLabel
              label="Cell type"
              required
              helper="Speak says a phrase. Navigate opens another board."
            />
            <View accessibilityRole="radiogroup" style={styles.typeRow}>
              <TypeOption
                label="Speak"
                icon="message-text-outline"
                selected={type === 'speech'}
                onPress={() => {
                  setType('speech');
                  setError('');
                }}
              />
              <TypeOption
                label="Navigate"
                icon="arrow-right-circle-outline"
                selected={type === 'navigation'}
                onPress={() => {
                  setType('navigation');
                  setError('');
                }}
              />
            </View>

            <View style={styles.fieldSpacing}>
              <FieldLabel label="Label" required helper="Keep it short and easy to scan." />
              <TextInput
                value={label}
                onChangeText={(value) => {
                  setLabel(value);
                  setError('');
                }}
                placeholder={type === 'speech' ? 'e.g. I need help' : 'e.g. Food'}
                placeholderTextColor={colors.placeholder}
                maxLength={40}
                accessibilityLabel="Cell label"
                style={styles.input}
              />
              <Text style={styles.characterCount}>{label.length}/40</Text>
            </View>

            {type === 'speech' ? (
              <View style={styles.fieldSpacing}>
                <FieldLabel
                  label="Spoken phrase"
                  required
                  helper="This exact phrase will be read aloud."
                />
                <TextInput
                  value={spokenPhrase}
                  onChangeText={(value) => {
                    setSpokenPhrase(value);
                    setError('');
                  }}
                  placeholder="e.g. I need help, please."
                  placeholderTextColor={colors.placeholder}
                  maxLength={160}
                  multiline
                  textAlignVertical="top"
                  accessibilityLabel="Spoken phrase"
                  style={[styles.input, styles.textArea]}
                />
                <Text style={styles.characterCount}>{spokenPhrase.length}/160</Text>
              </View>
            ) : (
              <View style={styles.fieldSpacing}>
                <FieldLabel
                  label="Destination board"
                  required
                  helper="Choose the board this cell should open."
                />
                {availableDestinations.length > 0 ? (
                  <View style={styles.destinationList}>
                    {availableDestinations.map((board) => {
                      const selected = destinationBoardId === board.id;
                      return (
                        <Pressable
                          key={board.id}
                          onPress={() => {
                            setDestinationBoardId(board.id);
                            setError('');
                          }}
                          accessibilityRole="radio"
                          accessibilityState={{ checked: selected }}
                          style={({ pressed }) => [
                            styles.destination,
                            selected && styles.destinationSelected,
                            pressed && styles.pressed,
                          ]}
                        >
                          <View
                            style={[
                              styles.radioOuter,
                              selected && styles.radioOuterSelected,
                            ]}
                          >
                            {selected && <View style={styles.radioInner} />}
                          </View>
                          <View style={styles.destinationCopy}>
                            <Text
                              style={[
                                styles.destinationTitle,
                                selected && styles.destinationTitleSelected,
                              ]}
                            >
                              {board.name}
                            </Text>
                            <Text style={styles.destinationMeta}>{board.gridSize} grid</Text>
                          </View>
                        </Pressable>
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.notice}>
                    <MaterialCommunityIcons
                      name="information-outline"
                      size={20}
                      color={colors.accentBlue}
                    />
                    <Text style={styles.noticeText}>
                      Create another board before adding a navigation cell.
                    </Text>
                  </View>
                )}
              </View>
            )}

            <View style={styles.fieldSpacing}>
              <FieldLabel label="Category" helper="Optional grouping for caregivers." />
              <TextInput
                value={category}
                onChangeText={setCategory}
                placeholder="e.g. Core words"
                placeholderTextColor={colors.placeholder}
                maxLength={40}
                accessibilityLabel="Cell category"
                style={styles.input}
              />
            </View>

            <View style={styles.fieldSpacing}>
              <FieldLabel label="Cell color" helper="Meaning is also shown with text and icons." />
              <View style={styles.colorRow}>
                {COLOR_OPTIONS.map((option, index) => {
                  const selected = color === option;
                  return (
                    <Pressable
                      key={option}
                      onPress={() => setColor(option)}
                      accessibilityRole="radio"
                      accessibilityLabel={`Color option ${index + 1}`}
                      accessibilityState={{ checked: selected }}
                      style={({ pressed }) => [
                        styles.colorOption,
                        { backgroundColor: option },
                        selected && styles.colorOptionSelected,
                        pressed && styles.pressed,
                      ]}
                    >
                      {selected && (
                        <MaterialCommunityIcons
                          name="check"
                          size={22}
                          color={colors.textPrimary}
                        />
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.visibilityRow}>
              <View style={styles.visibilityCopy}>
                <Text style={styles.visibilityTitle}>Hide in child mode</Text>
                <Text style={styles.visibilityHelper}>
                  Keep the cell configured without showing it on the board.
                </Text>
              </View>
              <Switch
                value={hidden}
                onValueChange={setHidden}
                accessibilityLabel="Hide in child mode"
                trackColor={{ false: colors.inputBorder, true: colors.toggleSelectedBg }}
                thumbColor={colors.card}
              />
            </View>
          </View>

          {!!error && (
            <Text accessibilityRole="alert" style={styles.error}>
              {error}
            </Text>
          )}

          <Pressable
            onPress={handleSave}
            disabled={saving}
            accessibilityRole="button"
            accessibilityState={{ disabled: saving }}
            style={({ pressed }) => [
              styles.saveButton,
              saving && styles.disabled,
              pressed && styles.pressed,
            ]}
          >
            {saving ? (
              <ActivityIndicator color={colors.onPrimary} />
            ) : (
              <>
                <MaterialCommunityIcons
                  name="content-save-outline"
                  size={20}
                  color={colors.onPrimary}
                />
                <Text style={styles.saveButtonText}>{cellId ? 'Save changes' : 'Add cell'}</Text>
              </>
            )}
          </Pressable>

          {cellId && (
            <Pressable
              onPress={confirmDelete}
              disabled={saving}
              accessibilityRole="button"
              accessibilityLabel={`Delete ${label}`}
              style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
            >
              <MaterialCommunityIcons
                name="trash-can-outline"
                size={20}
                color={colors.helperAlert}
              />
              <Text style={styles.deleteButtonText}>Delete cell</Text>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

type TypeOptionProps = {
  label: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  selected: boolean;
  onPress: () => void;
};

function TypeOption({ label, icon, selected, onPress }: TypeOptionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => [
        styles.typeOption,
        selected && styles.typeOptionSelected,
        pressed && styles.pressed,
      ]}
    >
      <MaterialCommunityIcons
        name={icon}
        size={24}
        color={selected ? colors.selectedCardText : colors.textSecondary}
      />
      <Text style={[styles.typeOptionText, selected && styles.typeOptionTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: colors.textSecondary, fontSize: 15 },
  content: {
    width: '100%',
    maxWidth: 720,
    alignSelf: 'center',
    paddingTop: 24,
    paddingBottom: 40,
  },
  eyebrow: {
    color: colors.accentBlue,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  title: { color: colors.textPrimary, fontSize: 30, fontWeight: '800', marginTop: 6 },
  subtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 6,
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  typeRow: { flexDirection: 'row', gap: 10 },
  typeOption: {
    flex: 1,
    minHeight: 76,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 16,
  },
  typeOptionSelected: {
    backgroundColor: colors.selectedCardBg,
    borderColor: colors.selectedCardBorder,
  },
  typeOptionText: { color: colors.textSecondary, fontSize: 15, fontWeight: '800' },
  typeOptionTextSelected: { color: colors.selectedCardText },
  fieldSpacing: { marginTop: 24 },
  input: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    backgroundColor: colors.card,
    color: colors.textPrimary,
    fontSize: 16,
    paddingHorizontal: 16,
  },
  textArea: { minHeight: 108, paddingTop: 14, paddingBottom: 14 },
  characterCount: {
    alignSelf: 'flex-end',
    color: colors.textMuted,
    fontSize: 12,
    marginTop: 5,
  },
  destinationList: { gap: 10 },
  destination: {
    minHeight: 64,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
  },
  destinationSelected: {
    backgroundColor: colors.selectedCardBg,
    borderColor: colors.selectedCardBorder,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: colors.radioFill },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.radioFill },
  destinationCopy: { flex: 1 },
  destinationTitle: { color: colors.textPrimary, fontSize: 15, fontWeight: '800' },
  destinationTitleSelected: { color: colors.selectedCardText },
  destinationMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.stepBadgeBg,
  },
  noticeText: { color: colors.accentBlue, fontSize: 14, lineHeight: 20, flex: 1 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  colorOption: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: { borderColor: colors.textPrimary },
  visibilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 26,
    paddingTop: 22,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  visibilityCopy: { flex: 1 },
  visibilityTitle: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  visibilityHelper: { color: colors.textSecondary, fontSize: 13, lineHeight: 18, marginTop: 3 },
  error: { color: colors.helperAlert, fontSize: 14, fontWeight: '600', marginTop: 14 },
  saveButton: {
    minHeight: 54,
    marginTop: 20,
    borderRadius: 27,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  deleteButton: {
    minHeight: 52,
    marginTop: 12,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.helperAlert,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  deleteButtonText: { color: colors.helperAlert, fontSize: 16, fontWeight: '800' },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.6 },
});
