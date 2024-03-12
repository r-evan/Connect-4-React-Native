import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import OptionsButton from '../components/GearButton'; // Importer le composant du bouton d'options
import Options from './Options';

const { width, height } = Dimensions.get('window');
const popupHeight = height * 0.95;
const popupwidth = width ;

const ModalPopup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);


  const handleOptionsPress = () => {
    // Ajoutez ici la logique pour ouvrir le menu des options
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <OptionsButton onPress={handleOptionsPress} /> 

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleOptionsPress}
      >
        <Options handleClose={handleOptionsPress}/>
          
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    width : popupwidth,
    height : popupHeight,
  },
 
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
  },
});

export default ModalPopup;