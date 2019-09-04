import { ITERATION_LIMIT, getCell } from "./board-helper";

export function findTargetCell(boardCells) {
  let cell = "";

  for (let i = 0; i < ITERATION_LIMIT; i++) {
    const row = Math.floor(Math.random() * 9) + 1;
    const column = Math.floor(Math.random() * 9) + 1;
    cell = getCell(row, column);

    if (boardCells[cell].status === "empty") {
      return cell;
    }
  }
}
