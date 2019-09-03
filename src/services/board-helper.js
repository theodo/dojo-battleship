const BOARD_SIZE = 10;
const SHIPS = {
  boat1: 5,
  boat2: 4,
  boat3: 3,
  boat4: 3,
  boat5: 2
};
const DIRECTIONS = ["up", "down", "left", "right"];
const ITERATION_LIMIT = 100;

export const CHAR_CODE_OFFSET = 65;

export function generateRandomBoard() {
  let boardCells = {};
  let boats = {};
  Object.keys(SHIPS).forEach(shipName => {
    const shipSize = SHIPS[shipName];
    const newShipCells = generateRandomBoatPosition(shipSize, boardCells);
    // TODO what happend if no board is found ?
    boardCells = { ...newShipCells, ...boardCells };
    boats[shipName] = newShipCells;
  });
  return { boardCells, boats };
}

export function findTargetCell(cells) {
  let cell = "";

  for (let i = 0; i < ITERATION_LIMIT; i++) {
    const row = Math.floor(Math.random() * 9) + 1;
    const column = Math.floor(Math.random() * 9) + 1;
    cell = getCell(row, column);

    if (!(cells[cell] in ["hit", "missed"])) {
      return cell;
    }
  }
}

function generateRandomBoatPosition(shipSize, boardCells) {
  for (let i = 0; i < ITERATION_LIMIT; i++) {
    const startingCell = findAvailableCell(boardCells);
    const newShipCells = findNewShipCells(shipSize, boardCells, startingCell);
    return newShipCells;
  }
  return {};
}

export function getCell(row, column) {
  const columnLetter = String.fromCharCode(column - 1 + CHAR_CODE_OFFSET);
  return columnLetter.concat(row.toString());
}

export function getCellIndexes(cell) {
  const column = cell[0].charCodeAt(0) - CHAR_CODE_OFFSET + 1;
  const row = parseInt(cell.substr(1));

  return { row: row, column: column };
}

export function getNeighbors(row, column) {
  let neighbors = {};
  DIRECTIONS.forEach(direction => {
    const neighbor = getNeighborFromDirectionAndDistance(
      row,
      column,
      direction,
      1
    );
    if (neighbor) {
      neighbors[direction] = neighbor;
    }
  });

  return neighbors;
}

function getNeighborFromDirectionAndDistance(row, column, direction, distance) {
  switch (direction) {
    case "up":
      if (row - distance > 0) {
        // check that we are not on the top border of the board
        return getCell(row - distance, column);
      }
      break;
    case "down":
      if (row + distance <= BOARD_SIZE) {
        return getCell(row + distance, column);
      }
      break;
    case "left":
      if (column - distance > 0) {
        return getCell(row, column - distance);
      }
      break;
    case "right":
      if (column + distance <= BOARD_SIZE) {
        return getCell(row, column + distance);
      }
      break;
    default:
      return null;
  }
}

function areNeighborsAvailabale(cell, cells) {
  const cellIndexes = getCellIndexes(cell);
  const neighbors = getNeighbors(cellIndexes.row, cellIndexes.column);

  Object.keys(neighbors).forEach(direction => {
    if (!isCellAvailable(neighbors[direction], cells)) {
      return false;
    }
  });
  return true;
}

function findAvailableCell(cells) {
  let cell = "";

  for (let i = 0; i < ITERATION_LIMIT; i++) {
    const row = Math.floor(Math.random() * 9) + 1;
    const column = Math.floor(Math.random() * 9) + 1;
    cell = getCell(row, column);

    if (!cells.hasOwnProperty(cell) && areNeighborsAvailabale(cell, cells)) {
      break;
    }
  }
  return cell;
}

function isCellRespectingShipConstraints(cell, cells) {
  return (
    !!cell &&
    isCellAvailable(cell, cells) &&
    areNeighborsAvailabale(cell, cells)
  );
}

function isCellAvailable(candidate, cells) {
  if (cells.hasOwnProperty(candidate)) {
    return false;
  }
  return true;
}

function findNewShipCells(shipSize, cells, startingCell) {
  const startingCellIndexes = getCellIndexes(startingCell);
  const shipCellsCandidates = {};

  DIRECTIONS.forEach(direction => {
    const shipCellsCandidate = {};
    shipCellsCandidate[startingCell] = "ship";

    for (let distance = 1; distance < shipSize; distance++) {
      const cell = getNeighborFromDirectionAndDistance(
        startingCellIndexes.row,
        startingCellIndexes.column,
        direction,
        distance
      );
      if (!isCellRespectingShipConstraints(cell, cells)) {
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
