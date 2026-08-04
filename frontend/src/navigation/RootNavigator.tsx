import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';
import OnboardingScreen from '../screens/OnboardingScreen';
import ChildProfileScreen from '../screens/ChildProfileScreen';
import DailyCommunicationScreen from '../screens/DailyCommunicationScreen';
import PersonalizeScreen from '../screens/PersonalizeScreen';
import CommunicationHubScreen from '../screens/CommunicationHubScreen';
import CommunicationBoardScreen from '../screens/CommunicationBoardScreen';
import CaregiverScreen from '../screens/CaregiverScreen';
import ChildScreen from '../screens/ChildScreen';
import BoardViewScreen from '../screens/BoardViewScreen';
import BoardEditorScreen from '../screens/BoardEditorScreen';
import CellEditorScreen from '../screens/CellEditorScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Root navigator wiring the six FE-1 routes:
 * onboarding, caregiver mode, child mode, board view, board editor, cell editor.
 */
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChildProfile" component={ChildProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DailyCommunication" component={DailyCommunicationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Personalize" component={PersonalizeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CommunicationHub" component={CommunicationHubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CommunicationBoard" component={CommunicationBoardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Caregiver" component={CaregiverScreen} options={{ title: 'Caregiver' }} />
        <Stack.Screen name="Child" component={ChildScreen} options={{ title: 'Child Mode' }} />
        <Stack.Screen name="BoardView" component={BoardViewScreen} options={{ title: 'Board' }} />
        <Stack.Screen name="BoardEditor" component={BoardEditorScreen} options={{ title: 'Edit Board' }} />
        <Stack.Screen name="CellEditor" component={CellEditorScreen} options={{ title: 'Edit Cell' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
