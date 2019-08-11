const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
const charCodeOffset = 65;

export function getCellName(index) {
  const rest = index % 10;
  const tens = (index - rest) / 10;

  let rowIndex = alphabet[tens];
  let columnIndex = rest;

  if (rest === 0) {
    rowIndex = String.fromCharCode(tens - 1 + charCodeOffset);
    columnIndex = 10;
  }

  return rowIndex.concat(columnIndex.toString());
}

export function getCellIndexFromName(name) {
  const rowIndex = name[0].charCodeAt(0) - 65;

  const columnIndex = parseInt(name.substring(1));

  return rowIndex * 10 + columnIndex;
}
