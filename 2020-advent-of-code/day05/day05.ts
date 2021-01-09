const readBoardingPasses = (fileName: string): string[] => {
  return require("fs").readFileSync(fileName).toString().split("\n");
};
export const getRow = (input: string) => {
  const rowRange = [0, 127];
  const [row] = input.split("").reduce(([start, end], region) => {
    const size = end - start + 1;
    if (size === 1) {
      return region === "F" ? [start, start] : [end, end];
    }
    if (region === "F") {
      end -= Math.floor(size / 2);
    }
    if (region === "B") {
      start += Math.floor(size / 2);
    }
    return [start, end];
  }, rowRange);

  return row;
};
export const getColumn = (input: string) => {
  const columnRange = [0, 7];
  const [column] = input.split("").reduce(([start, end], region) => {
    const size = end - start + 1;
    if (size === 1) {
      return region === "L" ? [start, start] : [end, end];
    }
    if (region === "L") {
      end -= Math.floor(size / 2);
    }
    if (region === "R") {
      start += Math.floor(size / 2);
    }
    return [start, end];
  }, columnRange);

  return column;
};
export const getBoardingId = (input: string) => {
  const row = getRow(input.slice(0, 7));
  const column = getColumn(input.slice(7));

  return row * 8 + column;
};
if (require.main === module) {
  const passes = readBoardingPasses("day05/day05.txt").map(getBoardingId);
  const [highestSeatId] = passes.sort((a, b) => b - a);
  console.log("Highest seat ID", highestSeatId);
  passes
    .sort((a, b) => a - b)
    .forEach((pass, idx) => {
      if (passes[idx + 1] !== pass + 1) {
        console.log(`Free seat on ${pass + 1}`);
      }
    });
}
