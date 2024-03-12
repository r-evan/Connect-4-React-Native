import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack'; 
import { RootStackParamList } from '../navigation/AppNavigator';
import { Text } from 'react-native-animatable';


type ProfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfilScreen'>;


const ProfilScreen = ({ navigation }: { navigation: ProfilScreenNavigationProp }) => {


  return (
    <View style={styles.container}>
      <Text>Profile</Text>

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

export default ProfilScreen;