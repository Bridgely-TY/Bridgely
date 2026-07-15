import { StyleSheet, Text, View, Pressable } from 'react-native';
import { ScreenProps } from '../navigation/types';

/**
 * Onboarding screen (placeholder).
 *
 * Real implementation will walk the caregiver through the setup flow described
 * in the PRD (child name, grid size, starter boards, key people, common needs).
 */
export default function OnboardingScreen({ navigation }: ScreenProps<'Onboarding'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bridgely</Text>
      <Text style={styles.subtitle}>Caregiver setup goes here.</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('Caregiver')}>
        <Text style={styles.buttonText}>Caregiver Mode</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Child')}>
        <Text style={styles.buttonText}>Enter Child Mode</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12 },
  title: { fontSize: 28, fontWeight: '700' },
  subtitle: { fontSize: 16, color: '#555', marginBottom: 16 },
  button: { backgroundColor: '#1f77b4', paddingVertical: 16, paddingHorizontal: 24, borderRadius: 12, minWidth: 220, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
});
