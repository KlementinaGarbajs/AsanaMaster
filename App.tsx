import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotenPasswordScreen from './screens/ForgotenPassword';
import RegistrationScreen from './screens/RegistrationScreen';
import AsanasMenuScreen from './screens/AsanasMenuScreen';
import AsanasSubmenuScreen from './screens/AsanasSubmenuScreen';
import NotesMenu from './screens/NotesMenu';
import NoteDetailsScreen from './screens/NoteDetailsScreen';
import AsanaDetailsScreen from './screens/AsanaDetailsScreen';
import NewNoteScreen from './screens/NewNoteScreen';
import SplitsScreen from './screens/SplitsScreen';
import BackbendsScreen from './screens/BackbendsScreen';
import InversionsScreen from './screens/InversionsScreen';
import GoalsMenu from './screens/GoalsMenu';
import OnBoardingOne from './screens/OnBoarding/OnBoardingOne';
import OnBoardingTwo from './screens/OnBoarding/OnBoardingTwo';
import ProfileScreen from './screens/ProfileScreen';
import { CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Registration" options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid }} component={RegistrationScreen} />
        <Stack.Screen name="Forgoten" options={{headerShown: false}} component={ForgotenPasswordScreen} />
        <Stack.Screen name="About Yoga" options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid }} component={OnBoardingOne} />
        <Stack.Screen name="About" options={{headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={OnBoardingTwo} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Asanas" component={AsanasMenuScreen} />
        <Stack.Screen name="Asanas Submenu" component={AsanasSubmenuScreen} />
        <Stack.Screen name="Asana Details" component={AsanaDetailsScreen} />
        <Stack.Screen name="Notes" component={NotesMenu} />
        <Stack.Screen name="Note Details" component={NoteDetailsScreen} />
        <Stack.Screen name="New Note" options={{headerShown: false}} component={NewNoteScreen} />
        <Stack.Screen name="Splits" component={SplitsScreen} />
        <Stack.Screen name="Backbends" component={BackbendsScreen} />
        <Stack.Screen name="Inversions" component={InversionsScreen} />
        <Stack.Screen name="Goals" component={GoalsMenu} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}