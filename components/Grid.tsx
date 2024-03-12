import { View, StyleSheet, Pressable } from 'react-native';
import GridCell from './GridCell';

interface GridProps {
  gridState: number[][];
  handleCellPress: (columnIndex: number) => void;
}

const Grid: React.FC<GridProps> = ({ gridState, handleCellPress }) => {

  return (
    <View style={styles.gridContainer}>
      {gridState.map((column, columnIndex) => (
        <Pressable key={columnIndex} onPress={() => handleCellPress(columnIndex)} style={styles.column}>
          {column.map((cell, rowIndex) => (
            <GridCell
              key={`${rowIndex}-${columnIndex}`}
              color={cell === 1 ? 'red' : cell === 2 ? 'yellow' : 'transparent'}
            />
          ))}
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
    gridContainer: {
      flexDirection: 'row',
      backgroundColor: 'blue',
      padding : 7,
      borderRadius: 25,
      position:'relative',
      zIndex:0,
    },
    column: {
      flexDirection: 'column-reverse',
      position:'relative',
      zIndex:0,
    },
  });

export default Grid;