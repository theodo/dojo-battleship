import {
  ITERATION_LIMIT,
  getCell,
  BOARD_SIZE,
  getNeighbors,
  getCellIndexes
} from "./board-helper";

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

function getCommonDirection(cell1, cell2) {
  const { row: row1 } = getCellIndexes(cell1);
  const { row: row2 } = getCellIndexes(cell2);
  if (row1 === row2) {
    return ["left", "right"];
  }
  return ["up", "down"];
}

function findUnexploredNeighbors(cell, directions, boardCells) {
  const { row, column } = getCellIndexes(cell);
  const neighbors = Object.keys(getNeighbors(row, column))
    .filter(key => directions.includes(key))
    .map(key => getNeighbors(row, column)[key]);
  const unexploredCells = neighbors.filter(cellAddress =>
    ["empty", "ship"].includes(boardCells[cellAddress].status)
  );
  return unexploredCells;
}

function nextTarget(candidates, boardCells) {
  let filteredDirections = ["up", "down", "left", "right"];
  if (candidates.length > 1) {
    filteredDirections = getCommonDirection(candidates[0], candidates[1]);
  }
  for (let cell in candidates) {
    const unexploredNeighbors = findUnexploredNeighbors(
      candidates[cell],
      filteredDirections,
      boardCells
    );
    if (unexploredNeighbors.length !== 0) {
      return unexploredNeighbors[0];
    }
  }
}

export function findTargetCellV2(boardCells) {
  const candidates = Object.keys(boardCells).filter(
    keyCell => boardCells[keyCell].status === "hit"
  );
  if (candidates.length === 0) {
    const missed = Object.keys(boardCells).filter(
      keyCell => !["hit", "sunk", "missed"].includes(boardCells[keyCell].status)
    );
    return missed[Math.floor(Math.random() * missed.length)];
  }
  return nextTarget(candidates, boardCells);
}
