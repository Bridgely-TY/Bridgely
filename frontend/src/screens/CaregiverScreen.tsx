import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board } from '../types';
import { getBoardsForChild } from '../../../backend'; 

// using backend functions to fetch boards for a given child ID
export default function CaregiverScreen({ navigation, route }: ScreenProps<'Caregiver'>) {
  const { childId } = route.params;
  const [boards, setBoards] = useState<Board[]>([]);

  useEffect(() => {
    getBoardsForChild(childId)
      .then(setBoards)
      .catch((err) => console.warn('[Bridgely] Failed to load boards:', err));
  }, [childId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Caregiver Dashboard</Text>

      <FlatList
        data={boards}
        keyExtractor={(b) => b.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => navigation.navigate('BoardEditor', { boardId: item.id, childId })}>
            <Text style={styles.rowText}>{item.name}</Text>
            <Text style={styles.rowMeta}>{item.gridSize}</Text>
          </Pressable>
        )}
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('BoardEditor', { childId })}>
        <Text style={styles.buttonText}>Add New Board</Text>
      </Pressable>
      <Pressable style={[styles.button, styles.secondary]} onPress={() => navigation.navigate('Child', { childId } )}>
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
