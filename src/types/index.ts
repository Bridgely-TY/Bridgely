/**
 * Shared domain types for Bridgely.
 *
 * These model the core AAC concepts described in the product requirements:
 * communication boards made up of cells, where a cell either speaks a phrase
 * (speech cell) or navigates to another board (navigation cell).
 */

/** Supported grid layouts for a board (per PRD: 2x2, 3x3, 4x4, 5x5). */
export type GridSize = '2x2' | '3x3' | '4x4' | '5x5';

/** A cell either speaks a phrase or navigates to another board. */
export type CellType = 'speech' | 'navigation';

/** A single communication cell within a board. */
export interface Cell {
  id: string;
  type: CellType;
  /** Short text label shown on the cell. */
  label: string;
  /** Phrase spoken aloud when tapped (speech cells). */
  spokenPhrase?: string;
  /** Board this cell navigates to when tapped (navigation cells). */
  destinationBoardId?: string;
  /** Optional grouping category, e.g. "Food/Drink". */
  category?: string;
  /** Optional accent color (must not be the only way meaning is conveyed). */
  color?: string;
  /** Optional image/icon reference (asset key or uri). */
  image?: string;
  /** Whether the cell is hidden without being deleted. */
  hidden?: boolean;
}

/** A communication board containing a grid of cells. */
export interface Board {
  id: string;
  name: string;
  /** Optional icon/image reference for the board. */
  icon?: string;
  gridSize: GridSize;
  cells: Cell[];
  /** Prebuilt starter boards vs. caregiver-created custom boards. */
  isStarter?: boolean;
  /** The fixed calm/urgent needs board that is always accessible. */
  isUrgent?: boolean;
}

/** Which mode the app is currently operating in. */
export type AppMode = 'child' | 'caregiver';
