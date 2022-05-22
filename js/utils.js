import { GAME_STATUS , CELL_VALUE } from './constants.js'

// Write a function to check status of tic-tac-toe game
// Ref: what is tic-tac-toe game: https://en.wikipedia.org/wiki/Tic-tac-toe
// In summary, tic-tac-toe game has 9 cells divided into 3 rows of 3 cells.
// Each cell can have 3 values: either X, O or empty.
// We say X is win if there are 3 'X' in either horizontal, vertical or diagonal row.
// The same to O.
// If 9 cells is full of values but no one win, then the game is ended.
//
// Given an array of 9 items: [a0, a1, ..., a7, a8] represent for the tic-tac-toe game cells value:
// |  a0  | a1  | a2  |
// |  a3  | a4  | a5  |
// |  a6  | a7  | a8  |
// Each item will receive either of 3 values: empty, X or O.
// Return an object includes two keys:
// - `status`: a string indicate status of the game. It can be one of the following values:
//    - 'X': if X is win
//    - `O`: if O is win
//    - 'END': if game is ended and no one win
//    - 'PLAYING': if no one is win and game is not ended yet.
//
// - `winPositions`:
//    - If X or O is win, return indexes of the 3 winning marks(X/O).
//    - Return empty array.
//
// Example:
// Input array: cellValues = ['X', 'O', 'O', '', 'X', '', '', 'O', 'X']; represent for
// |  X  | O  | O  |
// |     | X  |    |
// |     | O  | X  |
// -----
// ANSWER:
// {
//    status: 'X',
//    winPositions: [0, 4, 8],
// }
//

// Input: an array of 9 items
// Output: an object as mentioned above
export function checkGameStatus(cellValues) {
  // Write your code here ...
  // Please feel free to add more helper function if you want.
  // It's not required to write everything just in this function.

  // check initial value
  if(!Array.isArray(cellValues) || cellValues.length !== 9)
    throw new Error('cellValues must be an array and have 9 values');

  // win condition
  const winCondition = [
    // Điều kiện thắng nằm ngang
    [0,1,2],
    [3,4,5],
    [6,7,8],

    // Điều kiện thắng nằm dọc
    [0,3,6],
    [1,4,7],
    [2,5,8],

    // Điều kiện thắng nằm chéo
    [0,4,8],
    [6,4,2],
  ]; 

  // If found the winner
  const winConditionIndex = winCondition.findIndex(set => {
    // Lấy từng giá trị của cellValues
    // Rồi kiểm tra index của cellValues có nằm trong array ko
    // Nếu có thì ta trả về index
    const first = cellValues[set[0]];
    const second = cellValues[set[1]];
    const third = cellValues[set[2]];
    return first !== '' && first === second && second === third;
  })

  if(winConditionIndex >= 0) {
    const winValue = cellValues[winCondition[winConditionIndex][0]];
    return {
      status:winValue === CELL_VALUE.CROSS ? GAME_STATUS.X_WIN : GAME_STATUS.O_WIN,
      winPositions:winCondition[winConditionIndex]
    }
  }

  // If there weren't winner or the game is still playing
  const emptyValues = cellValues.filter(x => x === '');
  return {
    status:emptyValues.length === 0 ? GAME_STATUS.ENDED : GAME_STATUS.PLAYING,
    winPositions:[]
  }
}