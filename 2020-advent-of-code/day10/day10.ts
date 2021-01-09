const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
const split = (separator: string) => (input: string) => input.split(separator);
const splitLineBreak = split("\n");
const trim = (input: string) => input.trim();
const length = <T>(input: T[]) => input.length;
const parseList = (input: string): number[] =>
  splitLineBreak(input).map(trim).filter(Boolean).map(Number);
const sort = (input: number[]) => [...input].sort((a, b) => a - b);
const findMax = (list: number[]) =>
  list.reduce((max, item) => Math.max(max, item), list[0] || 0);
const countDiff = (diff: number) => (list: number[]) =>
  list.reduce((count, item, index, items) => {
    const previous = items[index - 1] || 0;
    if (item - previous === diff) {
      return ++count;
    }
    return count;
  }, 0);

const getConsecutiveDiff = (diff: number) => (list: number[]) => {
  const l = length(list) - 1;
  let index = 1;
  let res = [];
  while (index < l) {
    const previous = list[index - 1] || 0;
    if (list[index] - previous === diff && list[index + 1] - previous <= 3) {
      let suite = 1;
      while (
        list[index + 1] - list[index] === diff &&
        list[index + 2] - list[index] <= 3
      ) {
        suite++;
        index++;
      }
      res.push(suite);
    }
    index++;
  }
  return res;
};
export const getJoltDifferenceResult = (input: string) => {
  const list = parseList(input);
  const completeList = [
    0, // The charging outlet near our seat
    ...sort(list),
    findMax(list) + 3, // The final
  ];
  const getDiff1 = countDiff(1);
  const getDiff3 = countDiff(3);
  const diff1 = getDiff1(completeList);
  const diff3 = getDiff3(completeList);

  return diff1 * diff3;
};
export const getDistinctWays = (input: string) => {
  const list = parseList(input);
  const completeList = [
    0, // The charging outlet near our seat
    ...sort(list),
    findMax(list) + 3, // The final
  ];
  const getConsecutiveDiff1 = getConsecutiveDiff(1);
  const consecutiveDiff1 = getConsecutiveDiff1(completeList);
  const possibilities = consecutiveDiff1.reduce((sum, item) => {
    switch (item) {
      case 1:
        // When we have 1 we have 2 possibilities
        return sum ? sum * 2 : 2;
      case 2:
        // When we have 2 we have 4 possibilities
        return sum ? sum * 4 : 4;
      case 3:
        // When we have 3 we have 7 possibilities
        return sum ? sum * 7 : 7;
    }
    return sum;
  }, 0);

  return possibilities;
};

if (require.main === module) {
  const numbers = readFile("day10/day10.txt");
  console.log(
    "What is the number of 1-jolt differences multiplied by the number of 3-jolt differences?",
    getJoltDifferenceResult(numbers)
  );
  console.log(
    "What is the total number of distinct ways you can arrange the adapters to connect the charging outlet to your device?",
    getDistinctWays(numbers)
  );
}
