import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../navigation/AppNavigator';


type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartScreen'>;


const IALevelScreen = ({ navigation }: { navigation: StartScreenNavigationProp }) => {

  const handleStartGame = (IALevel : number) => {
    navigation.navigate('GameScreen', {IALevel});
  };

  return (
    <View style={styles.container}>
      <Button title="Facile" onPress={() => handleStartGame(1)} />
      <Button title="Nomal" onPress={() => handleStartGame(2)} />
      <Button title="Difficile" onPress={() => handleStartGame(3)} />
      <Button title="Impossible" onPress={() => handleStartGame(4)} />

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

export default IALevelScreen;