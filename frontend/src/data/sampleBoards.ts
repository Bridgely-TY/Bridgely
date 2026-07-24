import { Board } from '../types';

/**
 * Sample board and cell data for local development.
 *
 * This mirrors the starter boards and calm/urgent needs board described in the
 * product requirements. It is intentionally small but representative so the UI
 * has real data to render before a backend exists.
 */
export const sampleBoards: Board[] = [
  {
    id: 'home',
    name: 'Home',
    icon: 'home',
    gridSize: '3x3',
    isStarter: true,
    cells: [
      { id: 'home-food', type: 'navigation', label: 'Food', destinationBoardId: 'food', category: 'Navigation' },
      { id: 'home-emotions', type: 'navigation', label: 'Emotions', destinationBoardId: 'emotions', category: 'Navigation' },
      { id: 'home-urgent', type: 'navigation', label: 'Urgent', destinationBoardId: 'urgent', category: 'Navigation' },
      { id: 'home-yes', type: 'speech', label: 'Yes', spokenPhrase: 'Yes.', category: 'Core' },
      { id: 'home-no', type: 'speech', label: 'No', spokenPhrase: 'No.', category: 'Core' },
      { id: 'home-help', type: 'speech', label: 'Help', spokenPhrase: 'I need help.', category: 'Core' },
      { id: 'home-more', type: 'speech', label: 'More', spokenPhrase: 'I want more.', category: 'Core' },
      { id: 'home-stop', type: 'speech', label: 'Stop', spokenPhrase: 'Stop.', category: 'Core' },
      { id: 'home-want', type: 'speech', label: 'I want', spokenPhrase: 'I want.', category: 'Core' },
    ],
  },
  {
    id: 'food',
    name: 'Food and Drink',
    icon: 'food',
    gridSize: '2x2',
    isStarter: true,
    cells: [
      { id: 'food-water', type: 'speech', label: 'Water', spokenPhrase: 'I want water.', category: 'Food/Drink' },
      { id: 'food-snack', type: 'speech', label: 'Snack', spokenPhrase: 'I want a snack.', category: 'Food/Drink' },
      { id: 'food-hungry', type: 'speech', label: 'Hungry', spokenPhrase: 'I am hungry.', category: 'Food/Drink' },
      { id: 'food-home', type: 'navigation', label: 'Back', destinationBoardId: 'home', category: 'Navigation' },
    ],
  },
  {
    id: 'emotions',
    name: 'Emotions',
    icon: 'emotions',
    gridSize: '2x2',
    isStarter: true,
    cells: [
      { id: 'emo-happy', type: 'speech', label: 'Happy', spokenPhrase: 'I feel happy.', category: 'Emotions' },
      { id: 'emo-sad', type: 'speech', label: 'Sad', spokenPhrase: 'I feel sad.', category: 'Emotions' },
      { id: 'emo-angry', type: 'speech', label: 'Angry', spokenPhrase: 'I feel angry.', category: 'Emotions' },
      { id: 'emo-home', type: 'navigation', label: 'Back', destinationBoardId: 'home', category: 'Navigation' },
    ],
  },
  {
    id: 'urgent',
    name: 'Calm / Urgent Needs',
    icon: 'urgent',
    gridSize: '4x4',
    isStarter: true,
    isUrgent: true,
    cells: [
      { id: 'urg-help', type: 'speech', label: 'Help', spokenPhrase: 'I need help.', category: 'Urgent' },
      { id: 'urg-stop', type: 'speech', label: 'Stop', spokenPhrase: 'Stop.', category: 'Urgent' },
      { id: 'urg-yes', type: 'speech', label: 'Yes', spokenPhrase: 'Yes.', category: 'Urgent' },
      { id: 'urg-no', type: 'speech', label: 'No', spokenPhrase: 'No.', category: 'Urgent' },
      { id: 'urg-break', type: 'speech', label: 'Break', spokenPhrase: 'I need a break.', category: 'Urgent' },
      { id: 'urg-hurt', type: 'speech', label: 'Hurt', spokenPhrase: 'I am hurt.', category: 'Urgent' },
      { id: 'urg-bathroom', type: 'speech', label: 'Bathroom', spokenPhrase: 'I need the bathroom.', category: 'Urgent' },
      { id: 'urg-hungry', type: 'speech', label: 'Hungry', spokenPhrase: 'I am hungry.', category: 'Urgent' },
      { id: 'urg-thirsty', type: 'speech', label: 'Thirsty', spokenPhrase: 'I am thirsty.', category: 'Urgent' },
      { id: 'urg-loud', type: 'speech', label: 'Too loud', spokenPhrase: 'It is too loud.', category: 'Urgent' },
      { id: 'urg-bright', type: 'speech', label: 'Too bright', spokenPhrase: 'It is too bright.', category: 'Urgent' },
      { id: 'urg-scared', type: 'speech', label: 'Scared', spokenPhrase: 'I feel scared.', category: 'Urgent' },
      { id: 'urg-angry', type: 'speech', label: 'Angry', spokenPhrase: 'I feel angry.', category: 'Urgent' },
      { id: 'urg-confused', type: 'speech', label: "Don't understand", spokenPhrase: "I don't understand.", category: 'Urgent' },
    ],
  },
];
