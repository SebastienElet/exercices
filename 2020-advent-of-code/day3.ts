const readMap = (fileName: string) =>
  stringToMatrix(require("fs").readFileSync(fileName).toString().trim());
export const stringToMatrix = (input: string): string[][] => {
  return input
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(""));
};
export const matrixToString = (matrix: string[][]): string => {
  return matrix.map((line) => line.join("")).join("\n");
};

export const countTreeOnTobogganTrajectory = (matrix: string[][]): any => ([
  right,
  down,
]: [number, number]) => {
  let x = 0;
  let y = 0;
  let maxX = matrix[0].length;
  let maxY = matrix.length - 1;
  let treeCount = 0;

  while (y < maxY) {
    y += down;
    x += right;

    if (x > maxX - 1) {
      x -= maxX;
    }

    let current = matrix[y][x];
    if (current === "#") {
      treeCount++;
    }
  }

  return treeCount;
};

if (require.main === module) {
  const map = readMap("day3.txt");
  const countTree = countTreeOnTobogganTrajectory(map);
  console.log("Trees on toboggan trajectory", countTree([3, 1]));
  console.log(
    "Trees on toboggan trajectores multiplied",
    [
      [1, 1],
      [3, 1],
      [5, 1],
      [7, 1],
      [1, 2],
    ].reduce(
      (total, direction) =>
        total > 0 ? total * countTree(direction) : countTree(direction),
      0
    )
  );
}
