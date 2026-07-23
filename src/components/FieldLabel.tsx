import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  label: string;
  helper?: string;
  required?: boolean;
};

/** Section label with optional required asterisk and helper subtext. */
export default function FieldLabel({ label, helper, required }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>
      {helper && <Text style={styles.helper}>{helper}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  label: { fontSize: 16, fontWeight: '700', color: colors.textPrimary },
  required: { color: colors.primary, fontWeight: '700' },
  helper: { fontSize: 13, color: colors.textSecondary, marginTop: 3 },
});
