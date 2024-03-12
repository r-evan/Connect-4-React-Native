import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, Dimensions, View } from 'react-native';

interface GridCellProps {
  color: string;
}

const { width } = Dimensions.get('window');
const CELL_SIZE = width * 0.1; // 10% de la largeur de l'écran

const GridCell: React.FC<GridCellProps> = React.memo(({ color }) => {
  const translateY = useRef(new Animated.Value(-500)).current;
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [color]);

  const animatedStyle = {
    transform: [{ translateY }],
    zIndex: color === 'transparent' ? 1 : 3,
  };

  return (
    <View style={styles.cellContainer}  >
      <Animated.View style={[
        styles.cell, 
        //color !== 'transparent' ? styles.filled : null, 
        animatedStyle,
        { backgroundColor: color }
      ]} />
      <View style={[styles.cell, styles.empty]} />
    </View>
  )
});

const styles = StyleSheet.create({
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    margin: 5,
  },
  empty: {
    position: 'absolute', // Les cellules doivent être positionnées absolument pour s'aligner correctement
    zIndex: 2,
    backgroundColor: 'white',
  },
  cellContainer: {

  },
  filled :{

  }
});

export default GridCell;