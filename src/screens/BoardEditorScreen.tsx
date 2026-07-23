import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board, Cell } from '../types';
import { getBoard } from '../api/mockApi';

/**
 * Board editor (placeholder) — caregiver-facing.
 *
 * Lists the board's cells and links to the cell editor. Real implementation
 * will support add/edit/delete/reorder, grid size, and hide/show.
 */
export default function BoardEditorScreen({ route, navigation }: ScreenProps<'BoardEditor'>) {
  const { boardId } = route.params;
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    if (boardId) {
      getBoard(boardId).then(setBoard);
    }
  }, [boardId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{board ? `Edit: ${board.name}` : 'New Board'}</Text>

      <FlatList
        data={board?.cells ?? []}
        keyExtractor={(c: Cell) => c.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => boardId && navigation.navigate('CellEditor', { boardId, cellId: item.id })}
          >
            <Text style={styles.rowText}>{item.label}</Text>
            <Text style={styles.rowMeta}>{item.type}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No cells yet.</Text>}
      />

      {boardId && (
        <Pressable style={styles.button} onPress={() => navigation.navigate('CellEditor', { boardId })}>
          <Text style={styles.buttonText}>Add Cell</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 12 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  list: { gap: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#eef4f9', borderRadius: 10 },
  rowText: { fontSize: 18, fontWeight: '600' },
  rowMeta: { fontSize: 14, color: '#666' },
  empty: { color: '#666', fontStyle: 'italic' },
  button: { backgroundColor: '#1f77b4', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
