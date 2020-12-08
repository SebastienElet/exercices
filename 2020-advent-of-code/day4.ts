const readPassports = (fileName: string): string => {
  return require("fs").readFileSync(fileName).toString();
};
// TODO: use [string,string][]
export const parsePassport = (input: string): string[][] =>
  input
    .trim()
    .split("\n")
    .flatMap((line) => line.split(" "))
    .filter(Boolean)
    .map((pair) => pair.split(":"));

export const isValidPassport = (input: string): boolean => {
  const keys = parsePassport(input).map(([key]) => key);
  const mandatoryKeys = ["ecl", "pid", "eyr", "hcl", "byr", "iyr", "hgt"];
  return mandatoryKeys.every((mandatoryKey) => keys.includes(mandatoryKey));
};

export const countValidPasswords = (input: string) =>
  input.split("\n\n").reduce((count, passport) => {
    if (isValidPassport(passport)) {
      count++;
    }
    return count;
  }, 0);

type Pasport = Record<string, string>;
export const isValidPassport2 = (input: string): boolean => {
  const passport: Pasport = parsePassport(input).reduce(
    (obj, [key, value]) => ({
      ...obj,
      [key]: value,
    }),
    {}
  );
  const validators = [
    {
      key: "byr",
      valid: (i: string) => Number(i) >= 1920 && Number(i) <= 2002,
    },
    {
      key: "iyr",
      valid: (i: string) => Number(i) >= 2010 && Number(i) <= 2020,
    },
    {
      key: "eyr",
      valid: (i: string) => Number(i) >= 2020 && Number(i) <= 2030,
    },
    {
      key: "hcl",
      valid: (i: string) => {
        return /^#[a-f0-9]{6}$/.test(i);
      },
    },
    {
      key: "ecl",
      valid: (i: string) =>
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(i),
    },
    { key: "pid", valid: (i: string) => /^[0-9]{9}$/.test(i) },
    {
      key: "hgt",
      valid: (i: string) => {
        if (i.endsWith("cm")) {
          return (
            Number(i.replace("cm", "")) >= 150 &&
            Number(i.replace("cm", "")) <= 193
          );
        }

        if (i.endsWith("in")) {
          return (
            Number(i.replace("in", "")) >= 59 &&
            Number(i.replace("in", "")) <= 76
          );
        }

        return false;
      },
    },
  ];
  return validators.every(({ key, valid }) => {
    if (!passport[key]) return false;
    if (!valid(passport[key])) return false;
    return true;
  });
};
export const countValidPasswords2 = (input: string) =>
  input.split("\n\n").reduce((count, passport) => {
    if (isValidPassport2(passport)) {
      count++;
    }
    return count;
  }, 0);

if (require.main === module) {
  const passports = readPassports("day4.txt");
  const count = countValidPasswords(passports);
  console.log("Valid passports", count);
  const count2 = countValidPasswords2(passports);
  console.log("Valid passports part2", count2);
}
