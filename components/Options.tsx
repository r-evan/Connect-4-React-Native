import React, { useState } from 'react';
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import OptionsButton from './GearButton'; // Importer le composant du bouton d'options

interface OptionsProps {
  handleClose: () => void;
}
/*
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleSound, setLanguage } from '../features/options/optionsSlice';

const SomeComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const soundEnabled = useAppSelector(state => state.options.sound);

  const handleToggleSound = () => {
    dispatch(toggleSound());
  };
*/

const Options: React.FC<OptionsProps> = ({ handleClose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Contenu du popup</Text>
        <Button title="Fermer" onPress={handleClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fond grisant semi-transparent
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

export default Options;