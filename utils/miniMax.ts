type Board = number[][];

// Définit le type pour le joueur
type Player = 1 | 2;

// Définit le type pour les coordonnées d'un coup
interface Move {
  col: number;
  row: number;
}

// Fonction pour déterminer si le jeu est terminé et si quelqu'un a gagné
function isGameOver(board: Board): boolean {

    const rows = board[0].length;
    const cols = board.length;

    // Vérifier horizontalement
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 3; col++) {
        if (board[col][row] !== -1 &&
            board[col][row] === board[col + 1][row] &&
            board[col][row] === board[col + 2][row] &&
            board[col][row] === board[col + 3][row]) {   
          return true;
        }
      }
    }
    // Vérifier verticalement
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 3; row++) {
        if (board[col][row] !== -1 &&
            board[col][row] === board[col][row + 1] &&
            board[col][row] === board[col][row + 2] &&
            board[col][row] === board[col][row + 3]) {
          return true;
        }
      }
    }
    
    // Vérifier diagonalement (montant)
    for (let col = 0; col < cols - 3; col++) {
        for (let row = 3; row < rows; row++) {
            if (board[col][row] !== -1 &&
                board[col + 1][row - 1] === board[col][row] &&
                board[col + 2][row - 2] === board[col][row] &&
                board[col + 3][row - 3] === board[col][row]) {
                return true;
            }
        }
    }

    // Vérifier diagonalement (descendant)
    for (let col = 0; col < cols - 3; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[col][row] !== -1 &&
                board[col + 1][row + 1] === board[col][row] &&
                board[col + 2][row + 2] === board[col][row] &&
                board[col + 3][row + 3] === board[col][row]) {
                return true;
            }
        }
    }
  
    return false;
  }

// Fonction pour obtenir tous les coups possibles
function getAvailableMoves(board: Board): Move[] {

    const moves: Move[] = [];
    const rows = board[0].length;
    const cols = board.length;
    for (let col = 0; col < cols; col++) {

      for (let row = 0; row < rows; row++) {
        if (board[col][row] === -1) {
          moves.push({col, row});
          break; // Arrête de chercher dans cette colonne dès qu'un espace vide est trouvé
        }
      }
    }

    return moves;
  }

    function evaluateBoard(board: Board, player: number): number {

      //   console.log("hey");

      
      let score = 0;
    
      const SCORES = {
        FOUR_IN_A_ROW: 100,
        THREE_IN_A_ROW: 10,
        TWO_IN_A_ROW: 4,
        // Ajoutez d'autres configurations si nécessaire
      };
    
      // Fonction pour compter les configurations dans une direction donnée
      const countConfiguration = (col: number, row: number, deltaCol: number, deltaRow: number) => {

        let count = 0;
        for (let i = 0; i < 4; i++) {
          if (row < 0 || row >= board[0].length || col < 0 || col >= board.length) break;
          if (board[col][row] === player) {
            count++;
          } else if (board[col][row] !== -1) {
            // C'est un jeton de l'adversaire
            return 0;
          }
          row += deltaRow;
          col += deltaCol;
        }
        return count;
      };
    
      // Fonction pour évaluer toutes les directions à partir d'une cellule donnée
      const evaluateCell = (col: number, row: number) => {

        let cellScore = 0;
        const directions = [[0, 1], [1, 0], [1, -1], [1, 1]]; // horizontal, Vertical, diagonales
        directions.forEach(([deltaCol, deltaRow]) => {
          const count = countConfiguration(col, row, deltaCol, deltaRow);
          switch(count) {
            case 2:
              cellScore += SCORES.TWO_IN_A_ROW;
              break;
            case 3:
              cellScore += SCORES.THREE_IN_A_ROW;
              break;
            case 4:
              cellScore += SCORES.FOUR_IN_A_ROW;
              break;
            // Ajoutez d'autres cas si nécessaire
          }
        });
        return cellScore;
      };
    
      // Évaluer tout le plateau
      for (let row = 0; row < board[0].length; row++) {
        for (let col = 0; col < board.length; col++) {
          if (board[col][row] === player || board[col][row] === -1) {
            score += evaluateCell(col, row);
          }
        }
      }
      return score;
    }

// Fonction minimax (squelette)
function minimax(board: Board, depth: number, isMaximizingPlayer: boolean, player: number): number {
  const opponent = player === 1 ? 2 : 1;

    let test = isGameOver(board)
    if (depth === 0 || test ) {
      if(isMaximizingPlayer && test){ 
        console.log(test + '  ici');
        console.log(board);
      }

      // console.log(test);
      // console.log('********************MINIMAX prof1*************************************');

      return evaluateBoard(board, opponent);
    }
  
    // console.log('********************MINIMAX prof2*************************************');

    let bestScore = isMaximizingPlayer ? -Infinity : Infinity;
    for (const move of getAvailableMoves(board)) {
      // Jouer le coup
      board[move.col][move.row] = opponent;
      // Calculer le score en utilisant Minimax récursivement
      const score = minimax(board, depth - 1, !isMaximizingPlayer, opponent);
      // console.log('le score est :' + score)
      // Annuler le coup
      board[move.col][move.row] = -1;
      bestScore = isMaximizingPlayer ? Math.max(score, bestScore) : Math.min(score, bestScore);
      console.log('le score est :' + bestScore)
    }

    return bestScore;
  }

function getBestMove(board: Board, player: number, depth: number): Move {
  board = 
    [[1, -1, -1, -1, -1, -1], 
    [1, -1, -1, -1, -1, -1], 
    [1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1], 
    [2, 2, -1, -1, -1, -1], 
    [-1, -1, -1, -1, -1, -1]]


  console.log('*************************************************************************************');
  console.log('*************************************************************************************');


    player = 2;
    


    let bestScore = -Infinity;
    let bestMove = { col: -1, row: -1 };
  
    for (const move of getAvailableMoves(board)) {
      console.log(move);

      //Le but de la fonction est de retourner le score pour chaque configuration
    
      board[move.col][move.row] = player;
      const score = minimax(board, depth - 1, false, player);
      board[move.col][move.row] = -1; // Annuler le coup
      if (score > bestScore) {
        bestScore = score;
        console.log('Le meilleur score est ' +   bestScore)
        bestMove = move;
      }
    }
  
    return bestMove;
  }

  export default getBestMove;