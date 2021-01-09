const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
const split = (separator: string) => (input: string) => input.split(separator);
const splitLineBreak = split("\n");
const trim = (input: string) => input.trim();
const length = <T>(input: T[]) => input.length;
const sum = (values: number[]) =>
  values.reduce((total, item) => total + item, 0);
const parseList = (input: string): number[] =>
  splitLineBreak(input).map(trim).filter(Boolean).map(Number);
const isSumOfTwoNumbers = (number: number) => (list: number[]) =>
  list.some((n1, i1) =>
    list.some((n2, i2) => {
      if (i1 === i2) return false;
      if (n2 + n1 === number) return true;
      return false;
    })
  );
export const findNumberBreakingSuite = (input: string, preamble: number) => {
  const list = parseList(input);
  const listLength = length(list);
  let index = preamble;
  while (index < listLength) {
    const currentNumber = list[index];
    const lastNumbers = list.slice(index - preamble, index);
    const checkSumOfTwoNumbers = isSumOfTwoNumbers(list[index]);
    const hasSumInPreamble = checkSumOfTwoNumbers(lastNumbers);
    if (!hasSumInPreamble) {
      return currentNumber;
    }
    index++;
  }
  return 0;
};
const findMin = (list: number[]) =>
  list.reduce((min, item) => Math.min(min, item), list[0] || 0);
const findMax = (list: number[]) =>
  list.reduce((max, item) => Math.max(max, item), list[0] || 0);
export const findEncryptionWeakness = (input: string, preamble: number) => {
  const list = parseList(input);
  const listLength = length(list);
  const target = findNumberBreakingSuite(input, preamble);
  let index = 0;

  while (index < listLength) {
    let total = 0;
    let idx = 1;
    while (total < target) {
      const subset = list.slice(index, index + idx);
      total = sum(subset);
      if (total === target) {
        return findMin(subset) + findMax(subset);
      }
      idx++;
    }
    index++;
  }

  return 0;
};

if (require.main === module) {
  const numbers = readFile("day09/day09.txt");
  console.log(
    "What is the first number that does not have this property?",
    findNumberBreakingSuite(numbers, 25)
  );
  console.log(
    "What is the encryption weakness in your XMAS-encrypted list of numbers?",
    findEncryptionWeakness(numbers, 25)
  );
}
