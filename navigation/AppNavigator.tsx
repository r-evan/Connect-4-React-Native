import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import GameScreen from '../screens/GameScreen';
import IALevelScreen from '../screens/IALevelScreen';
import ProfilScreen from '../screens/ProfilScreen';


export type RootStackParamList = {
  StartScreen: undefined;
  GameScreen: {IALevel?: number};
  IALevelScreen: undefined;
  ProfilScreen: undefined;

};


const Stack =  createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
      <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'Écran de démarrage' }} />
      <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Jeu Puissance 4' }} />
      <Stack.Screen name="IALevelScreen" component={IALevelScreen} options={{ title: 'Sélection de l\ia' }} />
      <Stack.Screen name="ProfilScreen" component={ProfilScreen} options={{ title: 'Profile' }} />

      </Stack.Navigator>
    </NavigationContainer>

    
  );
};

export default AppNavigator;