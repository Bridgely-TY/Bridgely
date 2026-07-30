import { supabase } from './supabaseClient';
import type { Board, Cell, CellType, GridSize } from '../frontend/src/types';

// Supabase row type for the cell table. 
interface DbCell {
  id: string;
  board_id: string;
  type: string | null;
  label: string;
  spoken_phrase: string | null;
  destination_board_id: string | null;
  category: string | null;
  colour: string | null;
  image_url: string | null;
  position: number;
  hidden: boolean | null;
}

// Supabase row type for the board table.
interface DbBoard {
  id: string;
  child_id: string;
  name: string;
  icon: string | null;
  grid_size: string;
  is_starter: boolean | null;
  hidden: boolean | null;
  position: number;
}

// maps a supabase cell row to a frontend cell type
function mapCell(row: DbCell): Cell {
  return {
    id: row.id,
    type: (row.type ?? 'speech') as CellType,
    label: row.label,
    spokenPhrase: row.spoken_phrase ?? undefined,
    destinationBoardId: row.destination_board_id ?? undefined,
    category: row.category ?? undefined,
    colour: row.colour ?? undefined,
    image: row.image_url ?? undefined,
    hidden: row.hidden ?? false,
    position: row.position,
  };
}

// maps a supabase board row to a frontend board type
function mapBoard(row: DbBoard, cells: Cell[]): Board {
  return {
    id: row.id,
    name: row.name,
    icon: row.icon ?? undefined,
    gridSize: row.grid_size as GridSize,
    cells,
    isStarter: row.is_starter ?? undefined,
    hidden: row.hidden ?? false,
    position: row.position,
  };
}

// fetches all boards for a given child, ordered by position
// note: this only gets the boards associated with the child, but not their cells.
export async function getBoardsForChild(childId: string): Promise<Board[]> {
  const { data, error } = await supabase
    .from('boards')
    .select('*')
    .eq('child_id', childId)
    .order('position', { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row: DbBoard) => mapBoard(row, []));
}

// fetches a board and its cells using board ID; returns null if board doesn't exist
export async function getBoardWithCells(boardId: string): Promise<Board | null> {
  const { data: boardRow, error: boardError } = await supabase
    .from('boards')
    .select('*')
    .eq('id', boardId)
    .maybeSingle();

  if (boardError) throw boardError;
  if (!boardRow) return null;

  const { data: cellRows, error: cellError } = await supabase
    .from('cells')
    .select('*')
    .eq('board_id', boardId)
    .order('position', { ascending: true });

  if (cellError) throw cellError;

  const cells = (cellRows ?? []).map((row: DbCell) => mapCell(row));
  return mapBoard(boardRow as DbBoard, cells);
}

// fetches a single cell by ID; returns null if cell doesn't exist
export async function getCell(cellId: string): Promise<Cell | null> {
  const { data, error } = await supabase
    .from('cells')
    .select('*')
    .eq('id', cellId)
    .maybeSingle();

  if (error) throw error;
  return data ? mapCell(data as DbCell) : null;
}