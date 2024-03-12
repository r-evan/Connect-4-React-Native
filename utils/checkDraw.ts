const checkDraw = (grid: number[][]): boolean => {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (grid[row][col] === -1) {
          // S'il reste des cases vides, ce n'est pas un match nul
          return false;
        }
      }
    }
    // Si toutes les cases sont remplies et qu'aucun joueur n'a gagné, c'est un match nul
    return true;
  };
  
  export default checkDraw;