import {
  countAnswersYes,
  countAnswersAllYes,
  countAnswersYesForGroups,
  sumAnswersYesForGroups,
  countAnswersAllYesForGroups,
  sumAnswersAllYesForGroups,
} from "./day06";

describe("day6", () => {
  describe("countAnswersYes", () => {
    describe.each([
      ["first group", "abc", 3],
      [
        "second group",
        `
        a
        b
        c
        `,
        3,
      ],
      [
        "third group",
        `
        ab
        ac
        `,
        3,
      ],
      [
        "fourth group",
        `
        a
        a
        a
        a
        `,
        1,
      ],
      ["fifth group", "b", 1],
    ])("with %s", (name, input, expected) => {
      test(`should return ${expected}`, () => {
        expect(countAnswersYes(input)).toEqual(expected);
      });
    });
  });

  describe("countAnswersForGroups", () => {
    test("should return [3,3,3,1,1]", () => {
      expect(
        countAnswersYesForGroups(`
          abc

          a
          b
          c

          ab
          ac

          a
          a
          a
          a

          b
        `)
      ).toMatchInlineSnapshot(`
        Array [
          3,
          3,
          3,
          1,
          1,
        ]
      `);
    });
  });

  describe("sumAnswersForGroups", () => {
    test("should return 11", () => {
      expect(
        sumAnswersYesForGroups(`
          abc

          a
          b
          c

          ab
          ac

          a
          a
          a
          a

          b
        `)
      ).toEqual(11);
    });
  });

  describe("countAnswersAllYes", () => {
    describe.each([
      ["first group", "abc", 3],
      [
        "second group",
        `
        a
        b
        c
        `,
        0,
      ],
      [
        "third group",
        `
        ab
        ac
        `,
        1,
      ],
      [
        "fourth group",
        `
        a
        a
        a
        a
        `,
        1,
      ],
      ["fifth group", "b", 1],
    ])("with %s", (name, input, expected) => {
      test(`should return ${expected}`, () => {
        expect(countAnswersAllYes(input)).toEqual(expected);
      });
    });
  });

  describe("countAnswersAllYesForGroups", () => {
    test("should return [3,0,1,1,1]", () => {
      expect(
        countAnswersAllYesForGroups(`
          abc

          a
          b
          c

          ab
          ac

          a
          a
          a
          a

          b
        `)
      ).toMatchInlineSnapshot(`
        Array [
          3,
          0,
          1,
          1,
          1,
        ]
      `);
    });
  });

  describe("sumAnswersAllYesForGroups", () => {
    test("should return 6", () => {
      expect(
        sumAnswersAllYesForGroups(`
          abc

          a
          b
          c

          ab
          ac

          a
          a
          a
          a

          b
        `)
      ).toEqual(6);
    });
  });
});
