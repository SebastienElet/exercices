import { split } from "./split";

describe("split", () => {
  describe.each([
    ["\n", "a\nb", ["a", "b"]],
    ["-", "a-b-c", ["a", "b", "c"]],
  ])(`with %s separator`, (separator, input, expected) => {
    describe(`with ${input}`, () => {
      test("shoud return", () => {
        expect(split(separator)(input)).toEqual(expected);
      });
    });
  });
});
