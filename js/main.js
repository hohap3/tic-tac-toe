
import { 
  getCurrentTurnElement ,  
  getCellElementList,
  getCellElementAtIdx,
  getGameStatusElement,
  getReplayButton,
  getCellListElement
} from './selectors.js'

import { TURN , GAME_STATUS , CELL_VALUE } from './constants.js'
import { checkGameStatus } from './utils.js'

// console.log(checkGameStatus(['X', 'O', 'O', '', 'X', '', '', 'O', 'X']))

/**
 * Global variables
 */
let currentTurn = TURN.CROSS;
let isGameEnded = GAME_STATUS.PLAYING;
let cellValues = new Array(9).fill("");

/**
 * TODOs
 *
 * 1. Bind click event for all cells
 * 2. On cell click, do the following:
 *    - Toggle current turn
 *    - Mark current turn to the selected cell
 *    - Check game state: win, ended or playing
 *    - If game is win, highlight win cells
 *    - Not allow to re-click the cell having value.
 *
 * 3. If game is win or ended --> show replay button.
 * 4. On replay button click --> reset game to play again.
 *
 */

function toggleTurn() {
  currentTurn = currentTurn === TURN.CROSS ? TURN.CIRCLE : TURN.CROSS;
  const currentTurnElement = getCurrentTurnElement();
  if(!currentTurnElement) return;
  currentTurnElement.className = '';
  currentTurnElement.classList.add(currentTurn);
}

function showReplayButton() {
  const replayBtn = getReplayButton();
  if(!replayBtn) return;
  replayBtn.classList.add('show');
}

function updateGameStatus(status) {
  isGameEnded = status;
  const gameStatusElement = getGameStatusElement();
  if(!gameStatusElement) return;
  gameStatusElement.textContent = isGameEnded;
}

function showWinPosition(winPositions) {
  if(!Array.isArray(winPositions) || winPositions.length !== 3)
    return;

  for(let index of winPositions) {
    const winElement = getCellElementAtIdx(index);
    winElement.classList.add('win');
  }  
}

function handleClickEvent(cell,index) {
  if(!cell) return;

  // Check if cell had been clicked
  const isClicked = cell.classList.contains(TURN.CIRCLE) || cell.classList.contains(TURN.CROSS); 
  // Check if the game is ended
  const isEnded = isGameEnded !== GAME_STATUS.PLAYING;
  if(isClicked || isEnded) return;

  cell.classList.add(currentTurn);

  // Add value into cellValues
  cellValues[index] = currentTurn === TURN.CIRCLE ? CELL_VALUE.CIRCLE : CELL_VALUE.CROSS;

  // toggle turn
  // Change turn 
  toggleTurn();

  // Check game status
  const gameStatus = checkGameStatus(cellValues);

  switch(gameStatus.status) {
    // If there are no winner
    case GAME_STATUS.ENDED:
        // Show replay button
        // Change game status 
        showReplayButton();
        updateGameStatus(gameStatus.status);
        break;

    //If someone win the match  
    case GAME_STATUS.X_WIN:
    case GAME_STATUS.O_WIN:
      // Show replay button
      // Update game status
      // Show win position
      showReplayButton();
      updateGameStatus(gameStatus.status);      
      showWinPosition(gameStatus.winPositions);
      break;      

    //If the game is still playing
    default:
      break; 
  }
}

function initCellElementList() {
  const liElementList = getCellElementList();
  if(liElementList.length < 1) return;

  // Attach index into element
  liElementList.forEach((liElement,index) => {
    liElement.dataset.idx = index;
  })

  const listElement = getCellListElement();
  if(!listElement) return;

  // Event delegation
  listElement.addEventListener('click',function(e) {

    // Check if element is li element
    if(e.target.tagName !== 'LI') return;
    const index = Number(e.target.dataset.idx);
    handleClickEvent(e.target,index);
  })
}

function handleReplayEvent() {
 // Reset global variable
 currentTurn = TURN.CROSS;
 isGameEnded = GAME_STATUS.PLAYING;
 cellValues = cellValues.map(x => '');

 // Update game status
 updateGameStatus(isGameEnded);
 
 //Update DOM
 const liElementList = getCellElementList();
 const currentTurnElement = getCurrentTurnElement();
 if(liElementList.length < 1 || !currentTurnElement) return;
 liElementList.forEach(cell => {
   cell.className = '';
 })  
 currentTurnElement.className = '';
 currentTurnElement.classList.add(currentTurn);

 // Hide replay button
  this.classList.remove('show');


}

function initReplayBtn() {

  const replayBtn = getReplayButton();
  if(!replayBtn) return;

  replayBtn.addEventListener('click',handleReplayEvent)

}

// main
(() => {

  initCellElementList();

  // // replay button
  initReplayBtn();

})()