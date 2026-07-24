import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board, Cell } from '../types';
import { getBoard } from '../api/mockApi';

/**
 * Board view (placeholder) — the child-facing communication grid.
 *
 * Renders the board's visible cells as large buttons. Speech cells will speak
 * their phrase (TTS wired later); navigation cells open the destination board.
 */
export default function BoardViewScreen({ route, navigation }: ScreenProps<'BoardView'>) {
  const { boardId } = route.params;
  const [board, setBoard] = useState<Board | null>(null);

  useEffect(() => {
    getBoard(boardId).then(setBoard);
  }, [boardId]);

  const onCellPress = (cell: Cell) => {
    if (cell.type === 'navigation' && cell.destinationBoardId) {
      navigation.push('BoardView', { boardId: cell.destinationBoardId });
    }
    // Speech cells will trigger text-to-speech in a later task.
  };

  if (!board) {
    return (
      <View style={styles.center}>
        <Text>Loading…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{board.name}</Text>
      <View style={styles.grid}>
        {board.cells
          .filter((c) => !c.hidden)
          .map((cell) => (
            <Pressable
              key={cell.id}
              style={[styles.cell, cell.type === 'navigation' && styles.navCell]}
              onPress={() => onCellPress(cell)}
            >
              <Text style={styles.cellLabel}>{cell.label}</Text>
            </Pressable>
          ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cell: { width: 120, height: 120, borderRadius: 16, backgroundColor: '#1f77b4', alignItems: 'center', justifyContent: 'center', padding: 8 },
  navCell: { backgroundColor: '#6a4fb3' },
  cellLabel: { color: '#fff', fontSize: 18, fontWeight: '600', textAlign: 'center' },
});
