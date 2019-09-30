export function shoot(cell, board, boats) {
  const shipName = board[cell].shipName;
  switch (board[cell].status) {
    case "ship":
      boats[shipName].nbOfAliveCells = boats[shipName].nbOfAliveCells - 1;

      if (boats[shipName].nbOfAliveCells === 0) {
        boats[shipName].cells.forEach(cell => {
          board[cell].status = "sunk";
        });
        boats.aliveShipsCount -= 1;
      } else {
        board[cell].status = "hit";
      }
      return true;

    case "empty":
      board[cell].status = "missed";
      return true;

    default:
      return false;
  }
}
