import { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Route param list for the root stack navigator.
 *
 * Covers the six routes required by FE-1: onboarding, caregiver mode,
 * child mode, board view, board editor, and cell editor.
 */
export type RootStackParamList = {
  Onboarding: undefined;
  ChildProfile: undefined;
  DailyCommunication: undefined;
  Personalize: undefined;
  CommunicationHub: undefined;
  CommunicationBoard: { categoryId: string };
  Caregiver: undefined;
  Child: undefined;
  BoardView: { boardId: string };
  BoardEditor: { boardId?: string };
  CellEditor: { boardId: string; cellId?: string };
};

/** Convenience type for a screen component's props by route name. */
export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
