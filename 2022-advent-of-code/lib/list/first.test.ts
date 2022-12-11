import { first } from "./first";

describe("first", () => {
  describe.each([
    [[1, 2, 3], 1],
    [["a", "b", "c"], "a"],
  ])(`with %s`, (input, expected) => {
    test(`should return ${expected}`, () => {
      expect(first(input)).toEqual(expected);
    });
  });
});
