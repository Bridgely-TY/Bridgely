import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface BoardIconProps {
  name?: string;
  size?: number;
  color: string;
}

/**
 * Thin wrapper around MaterialCommunityIcons. Cells that have no chosen icon
 * render a placeholder circle-x, matching the unfinished cells in the designs.
 */
export default function BoardIcon({ name, size = 34, color }: BoardIconProps) {
  const glyph = (name ?? 'close-circle-outline') as React.ComponentProps<
    typeof MaterialCommunityIcons
  >['name'];
  return <MaterialCommunityIcons name={glyph} size={size} color={color} />;
}
