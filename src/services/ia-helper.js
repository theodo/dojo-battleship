import { getNeighbors, getCellIndexes } from "./board-helper";

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

export function findTargetCell(boardCells) {
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
