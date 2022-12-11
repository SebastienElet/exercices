import { take } from "./take";

describe("take", () => {
  describe(`with 1,2,3`, () => {
    const value = [1, 2, 3];
    describe("take 1", () => {
      test("should return an array with 1 item", () => {
        const takeOne = take(1);
        const items = takeOne(value);
        expect(items).toEqual([1]);
      });
    });
    describe("take 2", () => {
      test("should return an array with 2 item", () => {
        const takeTwo = take(2);
        const items = takeTwo(value);
        expect(items).toEqual([1, 2]);
      });
    });
    describe("take 4", () => {
      test("should return the full array", () => {
        const takeFour = take(4);
        const items = takeFour(value);
        expect(items).toEqual([1, 2, 3]);
      });
    });
  });
});
