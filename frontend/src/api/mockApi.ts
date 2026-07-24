import { Board, Cell } from '../types';
import { sampleBoards } from '../data/sampleBoards';

/**
 * Mock API layer for Bridgely.
 *
 * This is the single, clearly-marked seam between the UI and data. Every
 * function returns a Promise so the interface matches a future real backend
 * (Supabase / Firebase / custom). To connect a real backend, replace the bodies
 * of these functions with network calls — the screen code should not need to
 * change.
 *
 * Data is currently served from in-memory sample data. A future implementation
 * would read/write local storage (SQLite / AsyncStorage) or a remote API.
 */

// Simulate async latency so screens are built against realistic timing.
const delay = <T>(value: T, ms = 150): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

// Local mutable copy so mock create/update/delete behave realistically.
let boards: Board[] = sampleBoards.map((b) => ({ ...b, cells: [...b.cells] }));

/** Return all communication boards. */
export async function getBoards(): Promise<Board[]> {
  return delay(boards.map((b) => ({ ...b, cells: [...b.cells] })));
}

/** Return a single board by id, or null if not found. */
export async function getBoard(boardId: string): Promise<Board | null> {
  const board = boards.find((b) => b.id === boardId) ?? null;
  return delay(board ? { ...board, cells: [...board.cells] } : null);
}

/** Return the cells for a given board. */
export async function getCells(boardId: string): Promise<Cell[]> {
  const board = boards.find((b) => b.id === boardId);
  return delay(board ? [...board.cells] : []);
}

/** Create or replace a board. */
export async function saveBoard(board: Board): Promise<Board> {
  const index = boards.findIndex((b) => b.id === board.id);
  if (index >= 0) {
    boards[index] = board;
  } else {
    boards = [...boards, board];
  }
  return delay({ ...board, cells: [...board.cells] });
}

/** Create or update a single cell within a board. */
export async function saveCell(boardId: string, cell: Cell): Promise<Cell> {
  const board = boards.find((b) => b.id === boardId);
  if (board) {
    const index = board.cells.findIndex((c) => c.id === cell.id);
    if (index >= 0) {
      board.cells[index] = cell;
    } else {
      board.cells.push(cell);
    }
  }
  return delay({ ...cell });
}

/** Delete a cell from a board. */
export async function deleteCell(boardId: string, cellId: string): Promise<void> {
  const board = boards.find((b) => b.id === boardId);
  if (board) {
    board.cells = board.cells.filter((c) => c.id !== cellId);
  }
  return delay(undefined);
}
