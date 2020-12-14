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

if (require.main === module) {
  const seats = readFile("day11.txt");
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
