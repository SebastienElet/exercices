import { sum } from "./sum";

describe("sum", () => {
  describe.each([
    [[1, 2, 3], 6],
    [[1, 2, 3, 4], 10],
  ])("with %s input", (input, expected) => {
    test("should return", () => {
      expect(sum(input)).toEqual(expected);
    });
  });
});
