import { ITERATION_LIMIT, getCell, BOARD_SIZE } from "./board-helper";

export function findTargetCell(boardCells) {
  let cell = "";

  for (let i = 0; i < ITERATION_LIMIT; i++) {
    const row = Math.floor(Math.random() * BOARD_SIZE) + 1;
    const column = Math.floor(Math.random() * BOARD_SIZE) + 1;
    cell = getCell(row, column);

    if (["empty", "ship"].includes(boardCells[cell].status)) {
      return cell;
    }
  }
}
