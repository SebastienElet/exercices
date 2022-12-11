import { map } from "./map";
describe("map", () => {
  describe("should run a function over an array", () => {
    describe("with a function that adds 1 to a number", () => {
      test("should return an array with the numbers incremented by 1", () => {
        const fn1 = (x: number) => x + 1;
        const mapper = map(fn1);
        expect(mapper([1, 2, 3])).toEqual([2, 3, 4]);
      });
    });
  });
});
