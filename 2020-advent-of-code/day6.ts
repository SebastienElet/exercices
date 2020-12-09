const uniq = <T>(input: T[]) => [...new Set(input)];
const length = <T>(input: T[]) => input.length;
const trim = (input: string) => input.trim();
const split = (separator: string) => (input: string) => input.split(separator);
const sum = (values: number[]) =>
  values.reduce((total, item) => total + item, 0);
const splitGroups = split("\n\n");
const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
export const countAnswersYes = (input: string) => {
  const answers = uniq(trim(input).split("").map(trim).filter(Boolean));
  return length(answers);
};

export const countAnswersYesForGroups = (input: string) => {
  const groups = splitGroups(trim(input));
  return groups.map(countAnswersYes);
};
export const sumAnswersYesForGroups = (input: string) =>
  sum(countAnswersYesForGroups(input));

export const countAnswersAllYes = (input: string) => {
  const answers = uniq(trim(input).split("").map(trim).filter(Boolean));
  const answersPerPerson = trim(input).split("\n").map(trim);
  const all = answers.filter((answer) =>
    answersPerPerson.every((a) => a.includes(answer))
  );
  return length(all);
};
export const countAnswersAllYesForGroups = (input: string) => {
  const groups = splitGroups(trim(input));
  return groups.map(countAnswersAllYes);
};
export const sumAnswersAllYesForGroups = (input: string) =>
  sum(countAnswersAllYesForGroups(input));

if (require.main === module) {
  const forms = readFile("day6.txt");
  console.log("Sum of count for each group", sumAnswersYesForGroups(forms));
  console.log(
    "Sum of count for each group when every person answered yes",
    sumAnswersAllYesForGroups(forms)
  );
}
