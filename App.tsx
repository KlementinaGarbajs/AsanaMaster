import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MenuScreen from './screens/MenuScreen';
import LoginScreen from './screens/LoginScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import AsanasMenuScreen from './screens/AsanasMenuScreen';
import AsanasSubmenuScreen from './screens/AsanasSubmenuScreen';
import NotesMenu from './screens/NotesMenu';
import NoteDetailsScreen from './screens/NoteDetailsScreen';
import AsanaDetailsScreen from './screens/AsanaDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Registration" options={{headerShown: false}} component={RegistrationScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Asanas" component={AsanasMenuScreen} />
        <Stack.Screen name="AsanasSubmenu" component={AsanasSubmenuScreen} />
        <Stack.Screen name="AsanaDetails" component={AsanaDetailsScreen} />
        <Stack.Screen name="NotesMenu" component={NotesMenu} />
        <Stack.Screen name="NoteDetails" component={NoteDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}