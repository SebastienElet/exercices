const readPasswords = (fileName: string) =>
  require("fs")
    .readFileSync(fileName)
    .toString()
    .split("\n")
    .map((line: string) => line.trim())
    .filter(Boolean)
    .map((line: string) => line.split(": "));
export const isValidPassword = (rule: string, password: string) => {
  const regexpRule = /(?<min>\d+)-(?<max>\d+) (?<char>\w)/;
  const { min, max, char } = regexpRule.exec(rule)?.groups ?? {};
  const searchRegex = new RegExp(`[${char}]`, "g");
  const occurences = [...password.matchAll(searchRegex)].length;

  return occurences >= Number(min) && occurences <= Number(max);
};
export const isValidPassword2 = (rule: string, password: string) => {
  const regexpRule = /(?<first>\d+)-(?<second>\d+) (?<char>\w)/;
  const { first, second, char } = regexpRule.exec(rule)?.groups ?? {};
  const isMatchingChar = (position: string) =>
    password[Number(position) - 1] === char;
  const firstMatch = isMatchingChar(first);
  const secondMatch = isMatchingChar(second);

  if (firstMatch && secondMatch) {
    return false;
  }

  return firstMatch || secondMatch;
};
export const howManyValidPasswords = (tuple: [string, string][]) => {
  return tuple.reduce((count, [rule, password]) => {
    if (isValidPassword(rule, password)) {
      count++;
    }
    return count;
  }, 0);
};
export const howManyValidPasswords2 = (tuple: [string, string][]) => {
  return tuple.reduce((count, [rule, password]) => {
    if (isValidPassword2(rule, password)) {
      count++;
    }
    return count;
  }, 0);
};

if (require.main === module) {
  const passwords = readPasswords("day2.txt");
  const validPassword = howManyValidPasswords(passwords);
  console.log("Valid passwords (outdated policy):", validPassword);
  const validPassword2 = howManyValidPasswords2(passwords);
  console.log("Valid passwords:", validPassword2);
}
