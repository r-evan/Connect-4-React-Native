const bestPlacement = (givenBoard : number[][], depth : number):number =>{
    var currBoard = [];
    for(let i = 0; i < 6; i++ ){
      currBoard.push(givenBoard[i].slice());
    }
    const moves = possibleActions(currBoard);
    var moveValues = [];
    for(var i = 0; i < moves.length; i++){
      var row = moves[i];
      var col = i;
      if(row === -1){
        moveValues.push(-9999);
      } else{
        moveValues.push(getValue(row, col, currBoard, depth, 0, 2));
      }
    }
    var bestCol = -1;
    var bestVal = -99999;
    for(var j = 0; j < moveValues.length; j++){
      if(moveValues[j] > bestVal){
        bestCol = j;
        bestVal = moveValues[j];
      }
      if(moveValues[j] === bestVal){ // if at same value, randomly decide whether to swap it out 
        var rand = Math.floor(Math.random() * (j + 1)); 
        if(rand === j - 1){
          bestCol = j;
        }
      }
    }
    return bestCol;
  }

  const possibleActions = (currBoard :number[][]) =>{ // get all possible row-col moves for given state 
    var availableMoves = []; 
    for(var i = 0; i < 7; i++){
      var openRow = getEmptyRow(i, currBoard);
      availableMoves.push(openRow);
    }
    return availableMoves;
  }

  const getValue = (row:number, col:number, givenBoard:number[][], depth:number, currDepth:number, player:number) =>{
    var currBoard = [];
    for(let i = 0; i < 6; i++ ){
      currBoard.push(givenBoard[i].slice());
    }
    //check if someone wins this state
    currBoard[row][col] = player;
    var whoWon = checkGameOver(row, col, currBoard); 
    if(whoWon === 2){ // computer wants to win 
      return 10-depth;
    } 
    else if(whoWon === 3){ // tie is okay
      return 0;
    }
    else if(whoWon === 1){ // do not want player to win
      return -10+depth; 
    } 
    else { // game still going 
      if(currDepth >= depth){ // don't go beyond depth 
        return 0;
      }
      const moves = possibleActions(currBoard);
      var moveValues = [];
      for(var i = 0; i < moves.length; i++){
        var nextRow = moves[i];
        var nextCol = i;
        if(nextRow !== -1){
          moveValues.push(getValue(nextRow, nextCol, currBoard, depth, currDepth+1, 3-player));
        }
      }
      var bestVal = 0; 
      if(player === 2){
        bestVal = Math.min(...moveValues);
      }else{
        bestVal = Math.max(...moveValues);
      }
      return bestVal;
    }
    
  }
  
  const checkBoardFull = (currBoard : number[][])=>{
    var boardFull= true;
    for(var i = 0; i < 7; i++){
      if(currBoard[0][i] === 0){
        boardFull = false; 
      }
    }
    return boardFull;
  }

  const checkGameOver=(row: number, col: number, currBoard: number[][])=>{
    if(checkVertWin(row, col, currBoard) 
    || checkHorizWin(row, col, currBoard) 
    || checkDiagWin(row,col, currBoard)){
      return currBoard[row][col];
    } else{
      if(row === 0 &&   checkBoardFull(currBoard)){
        return 3;
      } else{
        return 0; 
      }
    }
  }
  const checkVertWin = (row:number , col:number, currBoard:number[][]) =>{
    if(row > 2){
      return false;
    }
    var furthestDownIndex = row + 3;
    var furthestUpIndex = row - 3;
    if(furthestDownIndex >5){
      furthestDownIndex = 5;
    }
    if(furthestUpIndex < 0){
      furthestUpIndex = 0; 
    }
    for(var i = furthestDownIndex; i >= furthestUpIndex + 3; i--){
      if(currBoard[i][col] === currBoard[i-1][col] 
        && currBoard[i-1][col] === currBoard[i-2][col]
        && currBoard[i-2][col] === currBoard[i-3][col]){
          return true;
      }
    }
    return false;
  }

  const checkHorizWin = (row:number, col:number, currBoard:number[][]) =>{
    var furthestRightIndex = col + 3;
    var furthestLeftIndex = col - 3;
    if(furthestRightIndex >6){
      furthestRightIndex = 6;
    }
    if(furthestLeftIndex < 0){
      furthestLeftIndex = 0; 
    }
    for(var i = furthestRightIndex; i >= furthestLeftIndex + 3; i--){
      if(currBoard[row][i] === currBoard[row][i-1] 
        && currBoard[row][i-1] === currBoard[row][i-2]
        && currBoard[row][i-2] === currBoard[row][i-3]){
          return true;
      }
    }
    return false;
  }

  const checkDiagWin= (row:number, col:number, currBoard:number[][]) =>{
    // for bottom right to top left
    var checkRow = row;
    var checkCol = col; 
    var count = 0;
    // Get bottom-right-most cell to check
    while(checkRow < 5 && checkCol < 6 && count < 3){
      checkRow++;
      checkCol++;
      count++;
    }
    
    // Check bottom right to top left 
    while(checkRow >= 3 && checkCol >= 3){
      if(currBoard[checkRow][checkCol] !== 0
        && currBoard[checkRow][checkCol] === currBoard[checkRow-1][checkCol-1] 
        && currBoard[checkRow-1][checkCol-1] === currBoard[checkRow-2][checkCol-2]
        && currBoard[checkRow-2][checkCol-2] === currBoard[checkRow-3][checkCol-3]){
          return true;
      }
      checkRow--;
      checkCol--;
    }
  }
  const getEmptyRow = (colIndex:number, currBoard:number[][]) =>{
    for(var i = 5; i >= 0; i--){
      if(currBoard[i][colIndex] === 0){
        return i;
      }
    }
    return -1;
  }

  export default bestPlacement