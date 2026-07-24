import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

type Props = {
  /** Overall width of the logo mark in px. Height scales automatically. */
  size?: number;
};

/**
 * Bridgely brand mark: two overlapping rainbow arcs (blue + orange) that form
 * the twin-hump "bridge" shape from the product designs.
 *
 * Built from plain Views (border arcs) so it needs no SVG/icon dependency.
 */
export default function BrandLogo({ size = 72 }: Props) {
  const arcSize = size * 0.62;
  const stroke = Math.max(4, size * 0.09);
  const arc = {
    width: arcSize,
    height: arcSize / 2 + stroke / 2,
    borderTopLeftRadius: arcSize,
    borderTopRightRadius: arcSize,
    borderWidth: stroke,
    borderBottomWidth: 0,
  } as const;

  return (
    <View style={[styles.container, { width: size, height: size / 2 }]}>
      <View style={[arc, styles.blueArc, { borderColor: colors.brandBlue }]} />
      <View
        style={[
          arc,
          styles.orangeArc,
          { borderColor: colors.brandOrange, left: arcSize * 0.55 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'flex-start', justifyContent: 'flex-end' },
  blueArc: { position: 'absolute', bottom: 0, left: 0 },
  orangeArc: { position: 'absolute', bottom: 0 },
});
