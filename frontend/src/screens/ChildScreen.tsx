import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ScreenProps } from '../navigation/types';
import { Board } from '../types';
import { getBoardsForChild } from '../../../backend';

// Child mode (placeholder). Displays the home board and urgent needs board for a given 
// child ID.
export default function ChildScreen({ navigation, route }: ScreenProps<'Child'>) {
  const { childId } = route.params;
  const [homeBoardId, setHomeBoardId] = useState<string | null>(null);

  useEffect(() => {
    getBoardsForChild(childId)
      .then((boards) => {
        const visible = boards.filter((b) => !b.hidden);  
        setHomeBoardId(visible[0]?.id ?? null);
      })
      .catch((err) => console.warn('[Bridgely] Failed to load boards:', err));
  }, [childId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Child Mode</Text>

      {homeBoardId && (
        <Pressable style={styles.button} onPress={() => navigation.navigate('BoardView', { boardId: homeBoardId, childId })}>
          <Text style={styles.buttonText}>Open Home Board</Text>
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
