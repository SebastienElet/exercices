const readFile = (fileName: string) =>
  require("fs").readFileSync(fileName).toString();
const trim = (input: string) => input.trim();
const split = (separator: string) => (input: string) => input.split(separator);
const splitRules = split("\n");
const length = <T>(input: T[]) => input.length;
const replace = (predicate: string | RegExp, replacement: string) => (
  input: string
) => input.replace(predicate, replacement);
const removeBags = replace(/ bag(s?)(\.?)/, "");
export const parseRules = (input: string) => {
  const rules = splitRules(trim(input))
    .map(trim)
    .map(split("contain"))
    .map(([bag, contain]) => {
      return [
        trim(removeBags(bag)),
        split(",")(contain)
          .map(trim)
          .map(removeBags)
          .filter((item) => item !== "no other")
          .map((item) => {
            if (/^\d/.test(item)) {
              const [quantity] = item.match(/\d/) || ["0"];
              const bag = trim(replace(quantity, "")(item));
              return { quantity, bag };
            }
            return null;
          })
          .filter(Boolean),
      ];
    });
  return rules;
};

export const howManyCanCarry = (rulesInput: string, input: string) => {
  const rules = parseRules(rulesInput);
  function canCarryFromRule(rule: any) {
    if (!rule) return null;
    const [bagColor, carry] = rule;
    if (!carry) return null;
    const canCarry = carry.find((item: any) => {
      if (item.bag === input) {
        return true;
      }
    });

    if (!canCarry) {
      const subCarry = carry
        .map((item: any) => {
          const r = rules.find((i: any) => {
            return i[0] === item.bag;
          });

          return canCarryFromRule(r);
        })
        .filter(Boolean);

      if (subCarry.length === 0) {
        return null;
      }
    }

    return bagColor;
  }
  const colors = rules.map(canCarryFromRule).filter(Boolean);

  return length(colors);
};
export const howManyRequiredInside = (rulesInput: string, input: string) => {
  const rules = parseRules(rulesInput);
  function quantityFromRule(rule: any) {
    if (!rule) return 0;
    const [bagColor, carry] = rule;
    if (!carry) return 0;

    return carry.reduce((sum: number, c: any) => {
      const r = rules.find((i: any) => {
        return i[0] === c.bag;
      });
      if (Number(c.quantity) > 0) {
        sum += Number(c.quantity) * (quantityFromRule(r) + 1);
      }

      return sum;
    }, 0);
  }
  const rule = rules.find((i: any) => {
    return i[0] === input;
  });
  const sum = quantityFromRule(rule);
  return sum;
};

if (require.main === module) {
  const rules = readFile("day07/day07.txt");
  console.log(
    "How many bag colors can eventually contain at least one shiny gold bag",
    howManyCanCarry(rules, "shiny gold")
  );
  console.log(
    "How many individual bags are required inside your single shiny gold bag?",
    howManyRequiredInside(rules, "shiny gold")
  );
}
