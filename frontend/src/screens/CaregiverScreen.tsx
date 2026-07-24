import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board } from '../types';
import { getBoards } from '../api/mockApi';

/**
 * Caregiver mode (placeholder dashboard).
 *
 * Lists all boards and provides entry points to edit boards/cells and preview
 * Child Mode. Real implementation will add lock-editing, hide/show, reordering.
 */
export default function CaregiverScreen({ navigation }: ScreenProps<'Caregiver'>) {
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    getBoards().then(setBoards);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caregiver Dashboard</Text>

      <FlatList
        data={boards}
        keyExtractor={(b) => b.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => navigation.navigate('BoardEditor', { boardId: item.id })}>
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.rowMeta}>{item.gridSize}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('BoardEditor', {})}>
        <Text style={styles.buttonText}>Add New Board</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.secondary]} onPress={() => navigation.navigate('Child')}>
        <Text style={styles.buttonText}>Preview Child Mode</Text>
      </Pressable>
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
  button: { backgroundColor: '#1f77b4', padding: 16, borderRadius: 12, alignItems: 'center' },
  secondary: { backgroundColor: '#2a9d5c' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});
