// Shared domain types for Bridgely.

/** Supported grid layouts for a board (per PRD: 2x2, 3x3, 4x4, 5x5). */
export type GridSize = '2x2' | '3x3' | '4x4' | '5x5';

/** A cell either speaks a phrase or navigates to another board. */
export type CellType = 'speech' | 'navigation';

/** A single communication cell within a board. */
export interface Cell {
  id: string; // Cell ID
  type: CellType; // either "speech" or "navigation"
  label: string; // display text on the cell
  spokenPhrase?: string; // phrase spoken when cell is pressed (SPEECH ONLY)
  destinationBoardId?: string; // destination board when cell is pressed (NAVIGATION ONLY)
  category?: string; // for colour
  colour?: string; // background colour of cell
  image?: string; // icon URL for cell
  hidden?: boolean; // whether the cell is hidden (for seasonal cells)
  position: number; // the cell's grid location (0-indexed, left-to-right, top-to-bottom)
}

/** A communication board containing a grid of cells. */
export interface Board {
  id: string; // Board ID
  name: string; // name of board
  icon?: string; // icon URL for board
  gridSize: GridSize; // board dimensions
  cells: Cell[]; // cells on board
  isStarter?: boolean; // whether this is a started board (for new users)
  position: number; // the board's location (0-indexed, left-to-right, top-to-bottom)
  hidden: boolean; // whether the board is hidden (for seasonal boards)
}

/** Which mode the app is currently operating in. */
export type AppMode = 'child' | 'caregiver';
