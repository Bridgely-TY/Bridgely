import { NativeStackScreenProps } from '@react-navigation/native-stack';

// navigation types for each screen + their parameters.
// this checks that the correct parameters are passed to each screen when navigating to it, 
// and that the correct parameters are received. 
export type RootStackParamList = {
  Onboarding: undefined;
  ChildProfile: undefined;
  DailyCommunication: undefined;
  Personalize: { childId?: string } | undefined;
  Caregiver: { childId: string };
  Child: { childId: string };
  BoardView: { boardId: string; childId: string };
  BoardEditor: { boardId?: string; childId: string };
  CellEditor: { boardId: string; cellId?: string };
};

/** Convenience type for a screen component's props by route name. */
export type ScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
