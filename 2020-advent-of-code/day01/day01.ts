import fs from "fs";

const readExpense = (fileName: string) =>
  fs
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((line: string) => line.trim())
    .map(Number)
    .filter((n: number) => n > 0);

export const findTupleExpensesMatching = (sum: number) => (
  expenses: number[]
): number => {
  let result = 0;

  expenses.some((expense, firstIndex) =>
    expenses.some((secondExpense, secondIndex) => {
      if (firstIndex === secondIndex) {
        return false;
      }

      const check = expense + secondExpense === sum;

      if (check) {
        result = expense * secondExpense;
      }
      return check;
    })
  );

  return result;
};

export const findTripleExpensesMatching = (sum: number) => (
  expenses: number[]
): number => {
  let result = 0;

  expenses.some((expense, firstIndex) =>
    expenses.some(
      (secondExpense, secondIndex) =>
        firstIndex !== secondIndex &&
        expenses.some((thirdExpense, thirdIndex) => {
          if (secondIndex === thirdIndex || firstIndex === thirdIndex) {
            return false;
          }
          const check = expense + secondExpense + thirdExpense === sum;

          if (check) {
            result = expense * secondExpense * thirdExpense;
          }
          return check;
        })
    )
  );

  return result;
};

if (require.main === module) {
  const expenses = readExpense("day01/day01.txt");
  const findTupleExpensesMatching2020 = findTupleExpensesMatching(2020);
  console.log(findTupleExpensesMatching2020(expenses));
  const findTripleExpensesMatching2020 = findTripleExpensesMatching(2020);
  console.log(findTripleExpensesMatching2020(expenses));
}
