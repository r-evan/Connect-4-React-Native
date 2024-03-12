import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import Grid from '../components/Grid';
import ModalPopup from '../components/ModalPopup';
import checkWin from '../utils/checkWin';
import checkDraw from '../utils/checkDraw';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import minmax from '../utils/MinMax';
import bestMove from '../utils/bestMove';

enum GameStatus {
  Playing,
  Won,
  Draw,
}

enum GamePlayer {
  None = 0,
  Player1 = 1,
  Player2 = 2,
}

enum GameMode {
  Local1v1,
  VersusAI,
  Online, // Supposons que vous pourriez vouloir ajouter un mode multijoueur en ligne à l'avenir
}

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const [gridState, setGridState] = useState<number[][]>([...Array(7)].map(_ => Array(6).fill(-1)));
  const [currentPlayer, setCurrentPlayer] = useState<number>(GamePlayer.None);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Playing);
  const [winner, setWinner] = useState<GamePlayer | null>(null);
  const [key, setKey] = useState<number>(0); // Pour re rendre en cas de partie relancé

  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Local1v1); // Nouveau


  const route = useRoute<GameScreenRouteProp>();
  const IALevel = route.params?.IALevel;

  useEffect(() => {
    // Initialiser le mode de jeu
    if (IALevel !== 0) {
      setGameMode(GameMode.VersusAI);
      // Décider aléatoirement qui commence: joueur ou IA
      const firstPlayer = Math.floor(Math.random() * 2) + 1;
      setCurrentPlayer(firstPlayer);
      if (firstPlayer === GamePlayer.Player2) { 
        // Si l'IA commence
        handleAIPlay();
      }
    } else {
      // Pour le mode Local1v1, ou toute autre logique initiale spécifique au mode
      setGameMode(GameMode.Local1v1);
    }
  }, [key]);

  useEffect(() => {
    // S'assurer que le jeu est en mode VersusAI et que c'est le tour de l'IA
    if (gameMode === GameMode.VersusAI && currentPlayer === GamePlayer.Player2 && gameStatus === GameStatus.Playing) {
      //Délai le temps de changer de joueur 
      const timer = setTimeout(() => {
        handleAIPlay();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameStatus]);

  const handleAIPlay = () => {
    if (gameMode !== GameMode.VersusAI || gameStatus !== GameStatus.Playing) return;
    
    //Todo : implémenter l'ia
    let columnIndex = bestMove(gridState, currentPlayer);
    setGrid(columnIndex);
  };
  
  const handleCellPress = (columnIndex: number) => {
    //Return si c'est à l'ia ou que la partie est finie
  if (gameStatus !== GameStatus.Playing || (gameMode === GameMode.VersusAI && currentPlayer !== GamePlayer.Player1)) return;
      setGrid(columnIndex);
  };

  const setGrid = (columnIndex: number) => {
    const updatedGridState = [...gridState];
    const columnIndexToFill = updatedGridState[columnIndex].indexOf(-1);
    //TODO ajouter un else action non permise
    if (columnIndexToFill !== -1) {
      updatedGridState[columnIndex][columnIndexToFill] = currentPlayer;
      setGridState(updatedGridState);
      checkGameState(updatedGridState);     
    }
  };


  const checkGameState = (updatedGridState: number[][]) => {
    if (checkWin(updatedGridState, currentPlayer)) {
      setWinner(currentPlayer);
      setGameStatus(GameStatus.Won);
    } else if (checkDraw(updatedGridState)) {
      setGameStatus(GameStatus.Draw);
    } else {
      //Change de joueur
      setCurrentPlayer(currentPlayer === GamePlayer.Player1 ? GamePlayer.Player2 : GamePlayer.Player1);
    }
  };

  const handleRestartGame = () => {
    setGridState([...Array(7)].map(_ => Array(6).fill(-1)));
    setCurrentPlayer(Math.floor(Math.random() * 2) + 1);
    setGameStatus(GameStatus.Playing);
    setKey(prevKey => prevKey + 1);
    setWinner(null);
  };

  let winnerText = '';
  if (gameStatus === GameStatus.Won) {
    winnerText = `Joueur ${winner} a gagné !`;
  } else if (gameStatus === GameStatus.Draw) {
    winnerText = 'Match nul !';
  }

  return (
    <View style={styles.container}>
      <ModalPopup />
      <Grid key={key} gridState={gridState} handleCellPress={handleCellPress} />
      <Button title="Recommencer" onPress={handleRestartGame} />
      
      {gameStatus !== GameStatus.Playing && <Text>{winnerText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 0,
  },
});

export default GameScreen;

