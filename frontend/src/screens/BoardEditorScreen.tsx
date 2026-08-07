import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FieldLabel from '../components/FieldLabel';
import { deleteCell, getBoard, saveBoard, saveCell } from '../api/mockApi';
import { ScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { Board, Cell, GridSize } from '../types';

const GRID_OPTIONS: GridSize[] = ['2x2', '3x3', '4x4', '5x5'];

const gridCapacity = (gridSize: GridSize) => {
  const [rows, columns] = gridSize.split('x').map(Number);
  return rows * columns;
};

export default function BoardEditorScreen({
  route,
  navigation,
}: ScreenProps<'BoardEditor'>) {
  const { width } = useWindowDimensions();
  const boardId = route.params.boardId;
  const [board, setBoard] = useState<Board | null>(null);
  const [name, setName] = useState('');
  const [gridSize, setGridSize] = useState<GridSize>('3x3');
  const [loading, setLoading] = useState(Boolean(boardId));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useFocusEffect(
    useCallback(() => {
      let active = true;

      if (!boardId) {
        setLoading(false);
        return () => {
          active = false;
        };
      }

      setLoading(true);
      setError('');
      getBoard(boardId)
        .then((result) => {
          if (!active) return;
          if (!result) {
            setError('This board could not be found.');
            return;
          }
          setBoard(result);
          setName(result.name);
          setGridSize(result.gridSize);
        })
        .catch(() => {
          if (active) setError('We could not load this board. Please try again.');
        })
        .finally(() => {
          if (active) setLoading(false);
        });

      return () => {
        active = false;
      };
    }, [boardId]),
  );

  const capacity = gridCapacity(gridSize);
  const cellCount = board?.cells.length ?? 0;
  const canAddCell = Boolean(boardId) && cellCount < capacity;
  const horizontalPadding = width < 420 ? 18 : 28;

  const validateBoard = () => {
    if (!name.trim()) return 'Enter a board name.';
    if (name.trim().length > 60) return 'Board names must be 60 characters or fewer.';
    if (cellCount > capacity) {
      return `The ${gridSize} layout holds ${capacity} cells. Delete cells before using this size.`;
    }
    return '';
  };

  const handleSaveBoard = async () => {
    const validationError = validateBoard();
    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    const nextBoard: Board = {
      ...(board ?? {
        id: `board-${Date.now().toString(36)}`,
        cells: [],
      }),
      name: name.trim(),
      gridSize,
    };

    try {
      const saved = await saveBoard(nextBoard);
      setBoard(saved);
      if (!boardId) {
        navigation.replace('BoardEditor', { boardId: saved.id });
      } else {
        setSuccess('Board changes saved.');
      }
    } catch {
      setError('We could not save the board. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleHidden = async (cell: Cell) => {
    setError('');
    const updated = { ...cell, hidden: !cell.hidden };
    setBoard((current) =>
      current
        ? {
            ...current,
            cells: current.cells.map((item) => (item.id === cell.id ? updated : item)),
          }
        : current,
    );

    try {
      await saveCell(boardId!, updated);
    } catch {
      setBoard((current) =>
        current
          ? {
              ...current,
              cells: current.cells.map((item) => (item.id === cell.id ? cell : item)),
            }
          : current,
      );
      setError('We could not update the cell visibility. Please try again.');
    }
  };

  const confirmDelete = (cell: Cell) => {
    Alert.alert(
      `Delete "${cell.label}"?`,
      'This removes the cell from this board.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setError('');
            try {
              await deleteCell(boardId!, cell.id);
              setBoard((current) =>
                current
                  ? { ...current, cells: current.cells.filter((item) => item.id !== cell.id) }
                  : current,
              );
            } catch {
              setError('We could not delete the cell. Please try again.');
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
          <Text style={styles.loadingText}>Loading board...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <FlatList
        data={board?.cells ?? []}
        keyExtractor={(cell) => cell.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingHorizontal: horizontalPadding },
        ]}
        ListHeaderComponent={
          <View>
            <Text style={styles.eyebrow}>CAREGIVER MODE</Text>
            <Text style={styles.title}>{boardId ? 'Edit board' : 'Create a board'}</Text>
            <Text style={styles.subtitle}>
              Choose the layout and manage the words available in child mode.
            </Text>

            <View style={styles.card}>
              <FieldLabel label="Board name" required />
              <TextInput
                value={name}
                onChangeText={(value) => {
                  setName(value);
                  setError('');
                  setSuccess('');
                }}
                placeholder="e.g. School"
                placeholderTextColor={colors.placeholder}
                maxLength={60}
                returnKeyType="done"
                accessibilityLabel="Board name"
                style={styles.input}
              />

              <View style={styles.fieldSpacing}>
                <FieldLabel
                  label="Grid size"
                  required
                  helper="Pick a size that leaves enough room for every cell."
                />
                <View style={styles.options}>
                  {GRID_OPTIONS.map((option) => {
                    const selected = option === gridSize;
                    return (
                      <Pressable
                        key={option}
                        onPress={() => {
                          setGridSize(option);
                          setError('');
                          setSuccess('');
                        }}
                        accessibilityRole="radio"
                        accessibilityState={{ checked: selected }}
                        accessibilityLabel={`${option} grid, ${gridCapacity(option)} cells`}
                        style={({ pressed }) => [
                          styles.option,
                          selected && styles.optionSelected,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                          {option}
                        </Text>
                        <Text style={[styles.optionMeta, selected && styles.optionTextSelected]}>
                          {gridCapacity(option)} cells
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              <Pressable
                onPress={handleSaveBoard}
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
                    <Text style={styles.saveButtonText}>
                      {boardId ? 'Save board' : 'Create board'}
                    </Text>
                  </>
                )}
              </Pressable>

              {!!error && (
                <Text accessibilityRole="alert" style={styles.error}>
                  {error}
                </Text>
              )}
              {!!success && (
                <Text accessibilityRole="alert" style={styles.success}>
                  {success}
                </Text>
              )}
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Communication cells</Text>
                <Text style={styles.sectionMeta}>
                  {cellCount} of {capacity} used
                </Text>
              </View>
              <View
                accessibilityRole="progressbar"
                accessibilityValue={{ min: 0, max: capacity, now: cellCount }}
                style={styles.countBadge}
              >
                <Text style={styles.countBadgeText}>{capacity - cellCount} open</Text>
              </View>
            </View>

            {!boardId && (
              <View style={styles.notice}>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color={colors.accentBlue}
                />
                <Text style={styles.noticeText}>Create the board before adding cells.</Text>
              </View>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={[styles.cellCard, item.hidden && styles.cellCardHidden]}>
            <Pressable
              onPress={() =>
                navigation.navigate('CellEditor', { boardId: boardId!, cellId: item.id })
              }
              accessibilityRole="button"
              accessibilityLabel={`Edit ${item.label}, ${item.type} cell${item.hidden ? ', hidden' : ''}`}
              style={({ pressed }) => [styles.cellMain, pressed && styles.pressed]}
            >
              <View
                style={[
                  styles.cellIcon,
                  { backgroundColor: item.color ?? colors.stepBadgeBg },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.type === 'navigation' ? 'arrow-right-circle-outline' : 'message-outline'}
                  size={23}
                  color={colors.textPrimary}
                />
              </View>
              <View style={styles.cellCopy}>
                <Text numberOfLines={1} style={styles.cellLabel}>
                  {item.label}
                </Text>
                <Text numberOfLines={1} style={styles.cellMeta}>
                  {item.hidden ? 'Hidden' : item.type === 'speech' ? 'Speaks a phrase' : 'Opens a board'}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={colors.textMuted}
              />
            </Pressable>

            <View style={styles.cellActions}>
              <Pressable
                onPress={() => handleToggleHidden(item)}
                accessibilityRole="button"
                accessibilityLabel={`${item.hidden ? 'Show' : 'Hide'} ${item.label}`}
                style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
              >
                <MaterialCommunityIcons
                  name={item.hidden ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color={colors.textSecondary}
                />
                <Text style={styles.actionText}>{item.hidden ? 'Show' : 'Hide'}</Text>
              </Pressable>
              <Pressable
                onPress={() => confirmDelete(item)}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.label}`}
                style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={20}
                  color={colors.helperAlert}
                />
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListEmptyComponent={
          boardId ? (
            <View style={styles.empty}>
              <MaterialCommunityIcons
                name="view-grid-plus-outline"
                size={36}
                color={colors.textMuted}
              />
              <Text style={styles.emptyTitle}>No cells yet</Text>
              <Text style={styles.emptyText}>Add the first word or navigation button.</Text>
            </View>
          ) : null
        }
        ListFooterComponent={
          <Pressable
            onPress={() => boardId && navigation.navigate('CellEditor', { boardId })}
            disabled={!canAddCell}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canAddCell }}
            accessibilityLabel={
              cellCount >= capacity ? 'Board is full' : 'Add communication cell'
            }
            style={({ pressed }) => [
              styles.addButton,
              !canAddCell && styles.addButtonDisabled,
              pressed && canAddCell && styles.pressed,
            ]}
          >
            <MaterialCommunityIcons
              name="plus"
              size={22}
              color={canAddCell ? colors.primary : colors.textMuted}
            />
            <Text style={[styles.addButtonText, !canAddCell && styles.addButtonTextDisabled]}>
              {cellCount >= capacity ? 'Grid is full' : 'Add cell'}
            </Text>
          </Pressable>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { color: colors.textSecondary, fontSize: 15 },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingTop: 24,
    paddingBottom: 32,
    gap: 12,
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
  fieldSpacing: { marginTop: 22 },
  options: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  option: {
    minWidth: 104,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.card,
  },
  optionSelected: {
    backgroundColor: colors.selectedCardBg,
    borderColor: colors.selectedCardBorder,
  },
  optionText: { color: colors.textPrimary, fontSize: 16, fontWeight: '800' },
  optionMeta: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  optionTextSelected: { color: colors.selectedCardText },
  saveButton: {
    minHeight: 52,
    marginTop: 24,
    borderRadius: 26,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: { color: colors.onPrimary, fontSize: 16, fontWeight: '800' },
  error: { color: colors.helperAlert, fontSize: 14, fontWeight: '600', marginTop: 12 },
  success: { color: colors.tilePlayText, fontSize: 14, fontWeight: '600', marginTop: 12 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 21, fontWeight: '800' },
  sectionMeta: { color: colors.textSecondary, fontSize: 14, marginTop: 3 },
  countBadge: {
    backgroundColor: colors.stepBadgeBg,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
  },
  countBadgeText: { color: colors.stepBadgeText, fontSize: 13, fontWeight: '800' },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.stepBadgeBg,
  },
  noticeText: { color: colors.accentBlue, fontSize: 14, flex: 1 },
  cellCard: {
    overflow: 'hidden',
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  cellCardHidden: { opacity: 0.72 },
  cellMain: {
    minHeight: 78,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    padding: 14,
  },
  cellIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellCopy: { flex: 1 },
  cellLabel: { color: colors.textPrimary, fontSize: 17, fontWeight: '800' },
  cellMeta: { color: colors.textSecondary, fontSize: 13, marginTop: 3 },
  cellActions: {
    minHeight: 46,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    minWidth: 96,
    minHeight: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
  },
  actionText: { color: colors.textSecondary, fontSize: 14, fontWeight: '700' },
  deleteText: { color: colors.helperAlert, fontSize: 14, fontWeight: '700' },
  empty: {
    alignItems: 'center',
    padding: 28,
    marginBottom: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.inputBorder,
    borderRadius: 18,
  },
  emptyTitle: { color: colors.textPrimary, fontSize: 17, fontWeight: '800', marginTop: 10 },
  emptyText: { color: colors.textSecondary, fontSize: 14, marginTop: 4, textAlign: 'center' },
  addButton: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 27,
    backgroundColor: colors.card,
    marginTop: 4,
  },
  addButtonDisabled: { borderColor: colors.inputBorder, backgroundColor: colors.background },
  addButtonText: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  addButtonTextDisabled: { color: colors.textMuted },
  pressed: { opacity: 0.72 },
  disabled: { opacity: 0.6 },
});
