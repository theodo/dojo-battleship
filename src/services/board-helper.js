export const charCodeOffset = 65;

const boardSize = 10;
const shipsSizes = [5, 4, 3, 3, 2];
const directions = ["up", "down", "left", "right"];

export function getCellName(row, column) {
  const columnLetter = String.fromCharCode(column - 1 + charCodeOffset);
  return columnLetter.concat(row.toString());
}

export function getCellIndexesFromName(name) {
  const column = name[0].charCodeAt(0) - charCodeOffset + 1;
  const row = parseInt(name.substr(1));

  return { row: row, column: column };
}

function getNeighbor(row, column, direction) {
  switch (direction) {
    case "up":
      if (row - 1 > 0) {
        return getCellName(row - 1, column);
      }
      break;
    case "down":
      if (row + 1 <= boardSize) {
        return getCellName(row + 1, column);
      }
      break;
    case "left":
      if (column - 1 > 0) {
        return getCellName(row, column - 1);
      }
      break;
    case "right":
      if (column + 1 <= boardSize) {
        return getCellName(row, column + 1);
      }
      break;
    default:
      return null;
  }
}

export function getNeighbors(row, column) {
  let neighbors = [];
  directions.forEach(function(direction) {
    const neighbor = getNeighbor(row, column, direction);
    if (neighbor) {
      neighbors.push(neighbor);
    }
  });

  return neighbors;
}

function createShip(shipSize, shipCellsList) {}

export function getRandomShips() {
  let shipCellsList = [];

  shipsSizes.forEach(shipSize => {
    shipCellsList = createShip(shipSize, shipCellsList);
  });

  return shipCellsList;
}
