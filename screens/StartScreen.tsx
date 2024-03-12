import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../navigation/AppNavigator';


type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartScreen'>;


const StartScreen = ({ navigation }: { navigation: StartScreenNavigationProp }) => {

  function handleStart1v1 (IALevel : number){
    navigation.navigate('GameScreen', {IALevel});
  };

  function handleIASelection()   {
    navigation.navigate('IALevelScreen');
  };

  function handleProfil()  {
    navigation.navigate('ProfilScreen');
  };

  return (
    <View style={styles.container}>
      <Button title="1 vs 1" onPress={() => handleStart1v1(0)} />
      <Button title="Contre IA" onPress={handleIASelection} />
      <Button title="Profile" onPress={handleProfil} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartScreen;