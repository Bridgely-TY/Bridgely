import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Cell } from '../types';
import { getCells } from '../api/mockApi';

/**
 * Cell editor (placeholder) — caregiver-facing.
 *
 * Real implementation will expose fields for label, spoken phrase, image,
 * category, color, cell type, and destination board.
 */
export default function CellEditorScreen({ route }: ScreenProps<'CellEditor'>) {
  const { boardId, cellId } = route.params;
  const [cell, setCell] = useState<Cell | null>(null);

  useEffect(() => {
    if (cellId) {
      getCells(boardId).then((cells) => setCell(cells.find((c) => c.id === cellId) ?? null));
    }
  }, [boardId, cellId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cellId ? 'Edit Cell' : 'New Cell'}</Text>
      <Text style={styles.field}>Label: {cell?.label ?? '—'}</Text>
      <Text style={styles.field}>Type: {cell?.type ?? '—'}</Text>
      <Text style={styles.field}>Spoken phrase: {cell?.spokenPhrase ?? '—'}</Text>
      <Text style={styles.field}>Category: {cell?.category ?? '—'}</Text>
      <Text style={styles.hint}>Editable fields will be added in a later task.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 10 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  field: { fontSize: 16 },
  hint: { marginTop: 16, color: '#666', fontStyle: 'italic' },
});
