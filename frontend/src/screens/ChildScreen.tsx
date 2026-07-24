import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board } from '../types';
import { getBoards } from '../api/mockApi';

/**
 * Child mode entry (placeholder).
 *
 * Opens the home board in a simple, low-distraction view. The urgent needs
 * board is always one tap away, per the PRD.
 */
export default function ChildScreen({ navigation }: ScreenProps<'Child'>) {
  const [homeBoardId, setHomeBoardId] = useState<string | null>(null);
  const [urgentBoardId, setUrgentBoardId] = useState<string | null>(null);

  useEffect(() => {
    getBoards().then((boards: Board[]) => {
      setHomeBoardId((boards.find((b) => b.id === 'home') ?? boards[0])?.id ?? null);
      setUrgentBoardId(boards.find((b) => b.isUrgent)?.id ?? null);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Mode</Text>

      {homeBoardId && (
        <Pressable style={styles.button} onPress={() => navigation.navigate('BoardView', { boardId: homeBoardId })}>
          <Text style={styles.buttonText}>Open Home Board</Text>
        </Pressable>
      )}
      {urgentBoardId && (
        <Pressable style={[styles.button, styles.urgent]} onPress={() => navigation.navigate('BoardView', { boardId: urgentBoardId })}>
          <Text style={styles.buttonText}>Calm / Urgent Needs</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 12 },
  button: { backgroundColor: '#1f77b4', padding: 20, borderRadius: 16, minWidth: 260, alignItems: 'center' },
  urgent: { backgroundColor: '#b60205' },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: '700' },
});
