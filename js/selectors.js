// Implement selector function to get elements needed
// 1. Cell List
// 2. Current Turn
// 3. Replay Game
// 4. Game status
// 5. Replay Button
export function getCellElementList() {
  return document.querySelectorAll('#cellList > li')
}

export function getCurrentTurnElement() {
  return document.getElementById('currentTurn');
}

export function getCellElementAtIdx(index) {
  return document.querySelector(`#cellList > li:nth-child(${index + 1})`); 
  //vì index sẽ đi từ 0 đến array.length - 1 nên ta mới thêm 1 vào
}

export function getCellListElement() {
  return document.getElementById('cellList');
}

export function getGameStatusElement() {
  return document.getElementById('gameStatus');
}

export function getReplayButton() {
  return document.getElementById('replayGame');
}