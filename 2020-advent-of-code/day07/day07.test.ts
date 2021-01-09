import { howManyCanCarry, howManyRequiredInside, parseRules } from "./day07";

const rules = `
  light red bags contain 1 bright white bag, 2 muted yellow bags.
  dark orange bags contain 3 bright white bags, 4 muted yellow bags.
  bright white bags contain 1 shiny gold bag.
  muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
  shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
  dark olive bags contain 3 faded blue bags, 4 dotted black bags.
  vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
  faded blue bags contain no other bags.
  dotted black bags contain no other bags.
`;
describe("day7", () => {
  describe("parseRules", () => {
    test("should return an array of rules", () => {
      expect(parseRules(rules)).toMatchInlineSnapshot(`
        Array [
          Array [
            "light red",
            Array [
              Object {
                "bag": "bright white",
                "quantity": "1",
              },
              Object {
                "bag": "muted yellow",
                "quantity": "2",
              },
            ],
          ],
          Array [
            "dark orange",
            Array [
              Object {
                "bag": "bright white",
                "quantity": "3",
              },
              Object {
                "bag": "muted yellow",
                "quantity": "4",
              },
            ],
          ],
          Array [
            "bright white",
            Array [
              Object {
                "bag": "shiny gold",
                "quantity": "1",
              },
            ],
          ],
          Array [
            "muted yellow",
            Array [
              Object {
                "bag": "shiny gold",
                "quantity": "2",
              },
              Object {
                "bag": "faded blue",
                "quantity": "9",
              },
            ],
          ],
          Array [
            "shiny gold",
            Array [
              Object {
                "bag": "dark olive",
                "quantity": "1",
              },
              Object {
                "bag": "vibrant plum",
                "quantity": "2",
              },
            ],
          ],
          Array [
            "dark olive",
            Array [
              Object {
                "bag": "faded blue",
                "quantity": "3",
              },
              Object {
                "bag": "dotted black",
                "quantity": "4",
              },
            ],
          ],
          Array [
            "vibrant plum",
            Array [
              Object {
                "bag": "faded blue",
                "quantity": "5",
              },
              Object {
                "bag": "dotted black",
                "quantity": "6",
              },
            ],
          ],
          Array [
            "faded blue",
            Array [],
          ],
          Array [
            "dotted black",
            Array [],
          ],
        ]
      `);
    });
  });

  describe("howManyCanCarry", () => {
    test("should return 4", () => {
      expect(howManyCanCarry(rules, "shiny gold")).toEqual(4);
    });
  });

  describe("howManyRequiredInside", () => {
    describe("with example", () => {
      test("should return 32", () => {
        expect(howManyRequiredInside(rules, "shiny gold")).toEqual(32);
      });
    });

    describe("with another example", () => {
      test("should return 126", () => {
        expect(
          howManyRequiredInside(
            `
            shiny gold bags contain 2 dark red bags.
            dark red bags contain 2 dark orange bags.
            dark orange bags contain 2 dark yellow bags.
            dark yellow bags contain 2 dark green bags.
            dark green bags contain 2 dark blue bags.
            dark blue bags contain 2 dark violet bags.
            dark violet bags contain no other bags.
            `,
            "shiny gold"
          )
        ).toEqual(126);
      });
    });
  });
});
