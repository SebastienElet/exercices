import { sort } from "./sort";
describe("sort", () => {
  describe("with a function that sorts numbers", () => {
    test("should return a sorted array", () => {
      const sortFn = (a: number, b: number) => a - b;
      const sorter = sort(sortFn);
      expect(sorter([3, 2, 1])).toEqual([1, 2, 3]);
    });
  });
});
