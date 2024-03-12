const checkHorizontal = (grid: number[][], player: number): boolean => {
    for (let row = 0; row <= 5; row++) {
      for (let col = 0; col <= 3; col++) {
        //3 -> 3+3 = 6, vérifie bien toute les cases
        if (
          grid[col][row] === player &&
          grid[col + 1][row] === player &&
          grid[col + 2][row] === player &&
          grid[col + 3][row] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };
  
  const checkVertical = (grid: number[][], player: number): boolean => {
    for (let col = 0; col <= 6; col++) {
      for (let row = 0; row <= 2; row++) {
        if (
          grid[col][row] === player &&
          grid[col][row + 1] === player &&
          grid[col][row + 2] === player &&
          grid[col][row + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };
  
  const checkDiagonal = (grid: number[][], player: number): boolean => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          grid[col][row] === player &&
          grid[col + 1][row + 1] === player &&
          grid[col + 2][row + 2] === player &&
          grid[col + 3][row + 3] === player
        ) {
          return true;
        }
      }
    }
    for (let row = 0; row < 3; row++) {
      for (let col = 3; col < 7; col++) {
        if (
          grid[col][row] === player &&
          grid[col - 1][row + 1] === player &&
          grid[col - 2][row + 2] === player &&
          grid[col - 3][row + 3] === player
        ) {
          return true;
        }
      }
    }
    return false;
  };
  
  const checkWin = (grid: number[][], player: number): boolean => {
    return (
      checkHorizontal(grid, player) ||
      checkVertical(grid, player) ||
      checkDiagonal(grid, player)
    );
  };
  
  export default checkWin;