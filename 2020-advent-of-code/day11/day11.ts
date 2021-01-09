const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
const split = (separator: string) => (input: string) => input.split(separator);
const splitLineBreak = split("\n");
const trim = (input: string) => input.trim();
const length = <T>(input: T[]) => input.length;
const parseList = (input: string): number[] =>
  splitLineBreak(input).map(trim).filter(Boolean).map(Number);
const sort = (input: number[]) => [...input].sort((a, b) => a - b);
const join = (char: string) => (input: string[]) => input.join(char);
const findMax = (list: number[]) =>
  list.reduce((max, item) => Math.max(max, item), list[0] || 0);

const toMatrix = (input: string) =>
  splitLineBreak(trim(input)).map(trim).map(split(""));
const toString = (matrix: string[][]) => matrix.map(join("")).join("\n");
const checkFourOrMoreSeatOccupied = (matrix: string[][]) => (
  y: number,
  x: number
) => {
  let count = 0;

  if ((matrix[y - 1]?.[x - 1] ?? "") === "#") count++;
  if ((matrix[y - 1]?.[x] ?? "") === "#") count++;
  if ((matrix[y - 1]?.[x + 1] ?? "") === "#") count++;
  if ((matrix[y]?.[x - 1] ?? "") === "#") count++;
  if ((matrix[y]?.[x + 1] ?? "") === "#") count++;
  if ((matrix[y + 1]?.[x - 1] ?? "") === "#") count++;
  if ((matrix[y + 1]?.[x] ?? "") === "#") count++;
  if ((matrix[y + 1]?.[x + 1] ?? "") === "#") count++;
  return count >= 4;
};
const checkAdjacentSeadNotOccupied = (matrix: string[][]) => (
  y: number,
  x: number
) => {
  if (
    (matrix[y - 1]?.[x - 1] ?? "") !== "#" &&
    (matrix[y - 1]?.[x] ?? "") !== "#" &&
    (matrix[y - 1]?.[x + 1] ?? "") !== "#" &&
    (matrix[y]?.[x - 1] ?? "") !== "#" &&
    (matrix[y]?.[x + 1] ?? "") !== "#" &&
    (matrix[y + 1]?.[x - 1] ?? "") !== "#" &&
    (matrix[y + 1]?.[x] ?? "") !== "#" &&
    (matrix[y + 1]?.[x + 1] ?? "") !== "#"
  ) {
    return true;
  }

  return false;
};
const vectors = [
  [-1, -1],
  [-1, 0],
  [-1, +1],
  [0, +1],
  [0, -1],
  [+1, -1],
  [+1, 0],
  [+1, +1],
];
const checkAdjacentSeadNotOccupied2 = (matrix: string[][]) => (
  y: number,
  x: number
) => {
  return vectors.every(([vY, vX]) => {
    let multiplier = 1;
    while (
      matrix[y + multiplier * vY] &&
      matrix[y + multiplier * vY][x + multiplier * vX]
    ) {
      if ((matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "#") {
        return false;
      }
      if ((matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "L") {
        return true;
      }
      multiplier++;
    }

    return true;
  });
};
const checkFiveOrMoreSeatOccupied = (matrix: string[][]) => (
  y: number,
  x: number
) => {
  const count = vectors.reduce((sum, [vY, vX]) => {
    let multiplier = 1;
    while (
      matrix[y + multiplier * vY] &&
      matrix[y + multiplier * vY][x + multiplier * vX]
    ) {
      if (y === 0 && x === 8) {
        if (
          (matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "L"
        ) {
          return sum;
        }
        if (
          (matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "#"
        ) {
          return ++sum;
        }
      }
      if ((matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "L") {
        return sum;
      }
      if ((matrix[y + multiplier * vY]?.[x + multiplier * vX] ?? "") === "#") {
        return ++sum;
      }
      multiplier++;
    }

    return sum;
  }, 0);

  return count >= 5;
};
export const seatingSystemMatrix = (input: string): string => {
  const matrix = toMatrix(input);
  const outputMatrix = toMatrix(input);
  const isAdjacentSeatNotOccupied = checkAdjacentSeadNotOccupied(matrix);
  const isFourOrMoreSeatOccupied = checkFourOrMoreSeatOccupied(matrix);

  matrix.forEach((line, lineIndex) => {
    line.forEach((seat, columnIndex) => {
      if (seat === "#") {
        if (isFourOrMoreSeatOccupied(lineIndex, columnIndex)) {
          outputMatrix[lineIndex][columnIndex] = "L";
        }
      }
      if (seat === "L") {
        if (isAdjacentSeatNotOccupied(lineIndex, columnIndex)) {
          outputMatrix[lineIndex][columnIndex] = "#";
        }
      }
    });
  });

  const output = toString(outputMatrix);
  return output;
};
export const countOccupiedSeat = (input: string): number => {
  const matrix = seatingSystemMatrix(input);

  return matrix.split("#").length - 1;
};

const isOccuped = (seat: string) => seat === "#";
const isFree = (seat: string) => seat === "L";
export const seatingSystemMatrix2 = (input: string): string => {
  const matrix = toMatrix(input);
  const outputMatrix = toMatrix(input);
  const isAdjacentSeatNotOccupied = checkAdjacentSeadNotOccupied2(matrix);
  const isFiveOrMoreSeatOccupied = checkFiveOrMoreSeatOccupied(matrix);

  matrix.forEach((line, lineIndex) => {
    line.forEach((seat, columnIndex) => {
      if (isOccuped(seat)) {
        if (isFiveOrMoreSeatOccupied(lineIndex, columnIndex)) {
          outputMatrix[lineIndex][columnIndex] = "L";
        }
      }
      if (isFree(seat)) {
        if (isAdjacentSeatNotOccupied(lineIndex, columnIndex)) {
          outputMatrix[lineIndex][columnIndex] = "#";
        }
      }
    });
  });

  const output = toString(outputMatrix);
  return output;
};

if (require.main === module) {
  const seats = readFile("day11/day11.txt");
  let matrix = seats;
  let previousOccupied = -1;
  let occupied = 0;

  while (previousOccupied !== occupied) {
    previousOccupied = occupied;
    matrix = seatingSystemMatrix(matrix);
    occupied = matrix.split("#").length - 1;
  }

  console.log("How many seats end up occupied?", occupied);
}

if (require.main === module) {
  const seats = readFile("day11/day11.txt");
  let matrix = seats;
  let previousOccupied = -1;
  let occupied = 0;

  while (previousOccupied !== occupied) {
    previousOccupied = occupied;
    matrix = seatingSystemMatrix2(matrix);
    occupied = matrix.split("#").length - 1;
  }

  console.log("How many seats end up occupied?", occupied);
}
