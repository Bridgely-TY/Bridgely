/**
 * Starter board data for Bridgely's child-facing communication mode.
 *
 * Front-end only: this is static mock data that drives the category hub and the
 * shared board screen. Each category defines its own grid size, cell display
 * style (icon+label / text-only / icon-only), colour palette, and cells.
 *
 * Icon names are MaterialCommunityIcons glyphs. Cells left without an icon fall
 * back to a placeholder, matching the unfinished cells in the Figma designs.
 */

export type BoardDisplay = 'both' | 'text' | 'icon';

export interface StarterCell {
  label: string;
  /** MaterialCommunityIcons glyph name. */
  icon?: string;
  /** Phrase spoken / added to the sentence bar. Defaults to the label. */
  phrase?: string;
}

export interface CategoryPalette {
  accent: string;
  cellBg: string;
  cellBorder: string;
  label: string;
  cardBg: string;
  pillBg: string;
}

export interface StarterCategory {
  id: string;
  name: string;
  /** Pill label shown at the top of the board (e.g. "Core Words"). */
  pill: string;
  hubIcon: string;
  display: BoardDisplay;
  cols: number;
  rows: number;
  palette: CategoryPalette;
  cells: StarterCell[];
}

export const CATEGORIES: StarterCategory[] = [
  {
    id: 'core',
    name: 'Core',
    pill: 'Core Words',
    hubIcon: 'star-outline',
    display: 'both',
    cols: 4,
    rows: 4,
    palette: {
      accent: '#2E6BB0',
      cellBg: '#DDEBF8',
      cellBorder: '#C5DCEF',
      label: '#1E2A44',
      cardBg: '#DCEBF7',
      pillBg: '#DCEBF7',
    },
    cells: [
      { label: 'I', icon: 'account-outline' },
      { label: 'you', icon: 'account-outline' },
      { label: 'want', icon: 'hand-back-right-outline' },
      { label: 'need', icon: 'alert-circle-outline' },
      { label: 'more', icon: 'layers-outline' },
      { label: 'all done', icon: 'flag-outline' },
      { label: 'help', icon: 'hand-heart-outline' },
      { label: 'please', icon: 'hand-heart-outline' },
      { label: 'yes', icon: 'check-circle-outline' },
      { label: 'no', icon: 'close-circle-outline' },
      { label: 'stop', icon: 'octagon-outline' },
      { label: 'go', icon: 'arrow-right' },
      { label: 'like', icon: 'thumb-up-outline' },
      { label: 'not', icon: 'slash-forward' },
      { label: 'it', icon: 'cube-outline' },
      { label: 'that', icon: 'hand-pointing-up' },
    ],
  },
  {
    id: 'food',
    name: 'Food',
    pill: 'Food & Drinks',
    hubIcon: 'food-apple-outline',
    display: 'both',
    cols: 2,
    rows: 2,
    palette: {
      accent: '#3E7D46',
      cellBg: '#E1F0D8',
      cellBorder: '#CDE6BF',
      label: '#1E2A44',
      cardBg: '#DEEFD4',
      pillBg: '#DEEFD4',
    },
    cells: [
      { label: 'juice', icon: 'cup-outline', phrase: 'I want juice' },
      { label: 'water', icon: 'water-outline', phrase: 'I want water' },
      { label: 'milk', icon: 'cup-water', phrase: 'I want milk' },
      { label: 'snack', icon: 'cookie-outline', phrase: 'I want a snack' },
      { label: 'pizza', icon: 'pizza', phrase: 'I want pizza' },
      { label: 'banana', icon: 'food-variant', phrase: 'I want a banana' },
      { label: 'apple', icon: 'food-apple-outline', phrase: 'I want an apple' },
      { label: 'cookie', icon: 'cookie-outline', phrase: 'I want a cookie' },
      { label: 'bread', icon: 'bread-slice-outline', phrase: 'I want bread' },
      { label: 'cereal', icon: 'bowl-mix-outline', phrase: 'I want cereal' },
      { label: 'yogurt', icon: 'ice-cream', phrase: 'I want yogurt' },
      { label: 'chicken', icon: 'food-drumstick-outline', phrase: 'I want chicken' },
      { label: 'rice', icon: 'rice', phrase: 'I want rice' },
      { label: 'pasta', icon: 'pasta', phrase: 'I want pasta' },
      { label: 'fruit', icon: 'fruit-watermelon', phrase: 'I want fruit' },
      { label: 'vegetable', icon: 'carrot', phrase: 'I want a vegetable' },
    ],
  },
  {
    id: 'feelings',
    name: 'Feelings',
    pill: 'How I Feel',
    hubIcon: 'emoticon-happy-outline',
    display: 'text',
    cols: 4,
    rows: 4,
    palette: {
      accent: '#7B4FB0',
      cellBg: '#ECE4F8',
      cellBorder: '#DECFF1',
      label: '#2A2140',
      cardBg: '#ECE3F8',
      pillBg: '#ECE3F8',
    },
    cells: [
      { label: 'happy', phrase: 'I feel happy' },
      { label: 'sad', phrase: 'I feel sad' },
      { label: 'angry', phrase: 'I feel angry' },
      { label: 'scared', phrase: 'I feel scared' },
      { label: 'tired', phrase: 'I feel tired' },
      { label: 'hungry', phrase: 'I feel hungry' },
      { label: 'thirsty', phrase: 'I feel thirsty' },
      { label: 'hurt', phrase: 'I feel hurt' },
      { label: 'sick', phrase: 'I feel sick' },
      { label: 'excited', phrase: 'I feel excited' },
      { label: 'calm', phrase: 'I feel calm' },
      { label: 'confused', phrase: 'I feel confused' },
      { label: 'surprised', phrase: 'I feel surprised' },
      { label: 'love', phrase: 'I feel love' },
      { label: 'bored', phrase: 'I feel bored' },
      { label: 'okay', phrase: 'I feel okay' },
    ],
  },
  {
    id: 'people',
    name: 'People',
    pill: 'People',
    hubIcon: 'account-outline',
    display: 'both',
    cols: 3,
    rows: 3,
    palette: {
      accent: '#B23E66',
      cellBg: '#F7DEE8',
      cellBorder: '#EFC9D8',
      label: '#2A2140',
      cardBg: '#F8DEE9',
      pillBg: '#F8DEE9',
    },
    cells: [
      { label: 'Mom', icon: 'account-outline' },
      { label: 'Dad', icon: 'account-outline' },
      { label: 'brother', icon: 'emoticon-outline' },
      { label: 'sister', icon: 'account-outline' },
      { label: 'grandma', icon: 'account-outline' },
      { label: 'grandpa', icon: 'account-outline' },
      { label: 'teacher', icon: 'human-male-board' },
      { label: 'friend', icon: 'account-multiple-outline' },
      { label: 'baby', icon: 'baby-face-outline' },
      { label: 'doctor', icon: 'doctor' },
      { label: 'therapist', icon: 'account-cog-outline' },
      { label: 'me', icon: 'account-check-outline' },
      { label: 'auntie', icon: 'account-outline' },
      { label: 'uncle', icon: 'account-outline' },
      { label: 'cousin', icon: 'account-multiple-outline' },
      { label: 'nanny', icon: 'account-outline' },
      { label: 'neighbor', icon: 'account-multiple-outline' },
      { label: 'other', icon: 'close-circle-outline' },
    ],
  },
  {
    id: 'places',
    name: 'Places',
    pill: 'Places',
    hubIcon: 'home-outline',
    display: 'icon',
    cols: 3,
    rows: 3,
    palette: {
      accent: '#9A6B2E',
      cellBg: '#FBEEBC',
      cellBorder: '#F2E0A0',
      label: '#4A3410',
      cardBg: '#FBEEBC',
      pillBg: '#FBEEBC',
    },
    cells: [
      { label: 'home', icon: 'home-outline', phrase: 'home' },
      { label: 'school', icon: 'school-outline', phrase: 'school' },
      { label: 'car', icon: 'car-outline', phrase: 'car' },
      { label: 'outside', icon: 'weather-sunny', phrase: 'outside' },
      { label: 'room', icon: 'door', phrase: 'room' },
      { label: 'bathroom', icon: 'bathtub-outline', phrase: 'bathroom' },
      { label: 'bed', icon: 'bed-outline', phrase: 'bed' },
      { label: 'restaurant', icon: 'silverware-fork-knife', phrase: 'restaurant' },
      { label: 'store', icon: 'tune-vertical', phrase: 'store' },
    ],
  },
  {
    id: 'actions',
    name: 'Actions',
    pill: 'Actions',
    hubIcon: 'play',
    display: 'both',
    cols: 4,
    rows: 3,
    palette: {
      accent: '#C06B2E',
      cellBg: '#FBE7CE',
      cellBorder: '#F4D8B4',
      label: '#3A2410',
      cardBg: '#F9DCD6',
      pillBg: '#F9DCD6',
    },
    cells: [
      { label: 'play', icon: 'puzzle-outline', phrase: 'I want to play' },
      { label: 'eat', icon: 'cookie-outline', phrase: 'I want to eat' },
      { label: 'drink', icon: 'cup-outline', phrase: 'I want to drink' },
      { label: 'sleep', icon: 'bed-outline', phrase: 'I want to sleep' },
      { label: 'walk', icon: 'shoe-print', phrase: 'I want to walk' },
      { label: 'run', icon: 'run', phrase: 'I want to run' },
      { label: 'sit', icon: 'sofa-outline', phrase: 'I want to sit' },
      { label: 'read', icon: 'book-open-outline', phrase: 'I want to read' },
      { label: 'watch', icon: 'television', phrase: 'I want to watch' },
      { label: 'listen', icon: 'headphones', phrase: 'I want to listen' },
      { label: 'draw', icon: 'palette-outline', phrase: 'I want to draw' },
      { label: 'sing', icon: 'music', phrase: 'I want to sing' },
    ],
  },
];

/** Lookup a category by id. */
export function getCategory(id: string): StarterCategory | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

/** Split a category's cells into pages based on its grid size. */
export function paginate(category: StarterCategory): StarterCell[][] {
  const perPage = category.cols * category.rows;
  const pages: StarterCell[][] = [];
  for (let i = 0; i < category.cells.length; i += perPage) {
    pages.push(category.cells.slice(i, i + perPage));
  }
  return pages;
}
