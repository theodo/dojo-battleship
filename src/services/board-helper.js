const boardSize = 10;
const shipsSizes = [5, 4, 3, 3, 2];
const directions = ["up", "down", "left", "right"];
const iterationLimit = 100;

export const charCodeOffset = 65;

export function getCell(row, column) {
  const columnLetter = String.fromCharCode(column - 1 + charCodeOffset);
  return columnLetter.concat(row.toString());
}

export function getCellIndexes(cell) {
  const column = cell[0].charCodeAt(0) - charCodeOffset + 1;
  const row = parseInt(cell.substr(1));

  return { row: row, column: column };
}

export function getNeighbors(row, column) {
  let neighbors = {};
  directions.forEach(direction => {
    const neighbor = getNeighborX(row, column, direction, 1);
    if (neighbor) {
      neighbors[direction] = neighbor;
    }
  });

  return neighbors;
}

function getNeighborX(row, column, direction, distance) {
  switch (direction) {
    case "up":
      if (row - distance > 0) {
        return getCell(row - distance, column);
      }
      break;
    case "down":
      if (row + distance <= boardSize) {
        return getCell(row + distance, column);
      }
      break;
    case "left":
      if (column - distance > 0) {
        return getCell(row, column - distance);
      }
      break;
    case "right":
      if (column + distance <= boardSize) {
        return getCell(row, column + distance);
      }
      break;
    default:
      return null;
  }
}

function checkNeighborsAvailability(cell, cells) {
  const cellIndexes = getCellIndexes(cell);
  const neighbors = getNeighbors(cellIndexes.row, cellIndexes.column);
  let neighborsNonEmptyCellCount = true;

  Object.keys(neighbors).forEach(direction => {
    if (!checkCellAvailability([neighbors[direction]], cells)) {
      neighborsNonEmptyCellCount = false;
    }
  });
  return neighborsNonEmptyCellCount;
}

function findAvailableCell(cells) {
  let cell = "";

  for (let i = 0; i < iterationLimit; i++) {
    const row = Math.floor(Math.random() * 9) + 1;
    const column = Math.floor(Math.random() * 9) + 1;
    cell = getCell(row, column);

    if (
      !cells.hasOwnProperty(cell) &&
      checkNeighborsAvailability(cell, cells)
    ) {
      break;
    }
  }
  return cell;
}

function cellFitsShipConstraint(cell, cells, direction) {
  if (!cell) {
    return false;
  }
  if (!checkCellAvailability([cell], cells)) {
    return false;
  }
  if (!checkNeighborsAvailability(cell, cells)) {
    return false;
  }

  return true;
}

function checkCellAvailability(candidates, cells) {
  let cellAvailability = true;
  candidates.forEach(candidate => {
    if (cells.hasOwnProperty(candidate)) {
      cellAvailability = false;
    }
  });
  return cellAvailability;
}

function findNewShipCells(shipSize, cells, startingCell) {
  const startingCellIndexes = getCellIndexes(startingCell);
  const shipCellsCandidates = {};

  directions.forEach(direction => {
    const shipCellsCandidate = {};
    shipCellsCandidate[startingCell] = "ship";

    for (let distance = 1; distance < shipSize; distance++) {
      const cell = getNeighborX(
        startingCellIndexes.row,
        startingCellIndexes.column,
        direction,
        distance
      );
      if (!cellFitsShipConstraint(cell, cells, direction)) {
        break;
      }
      shipCellsCandidate[cell] = "ship";
    }
    if (Object.keys(shipCellsCandidate).length === shipSize) {
      shipCellsCandidates[direction] = shipCellsCandidate;
    }
  });

  const directionCandidates = Object.keys(shipCellsCandidates);

  if (directionCandidates.length > 0) {
    const randomIndex = Math.floor(Math.random() * directionCandidates.length);
    return shipCellsCandidates[directionCandidates[randomIndex]];
  }

  return {};
}

function addNewShipCells(shipSize, shipCells) {
  for (let i = 0; i < iterationLimit; i++) {
    const startingCell = findAvailableCell(shipCells);
    const newShipCells = findNewShipCells(shipSize, shipCells, startingCell);
    if (Object.keys(newShipCells).length > 0) {
      return Object.assign(shipCells, newShipCells);
    }
  }

  return {};
}

export function getRandomShips() {
  let shipCells = {};
  shipsSizes.forEach(shipSize => {
    shipCells = addNewShipCells(shipSize, shipCells);
  });

  return shipCells;
}
