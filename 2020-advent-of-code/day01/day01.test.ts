import { findTupleExpensesMatching, findTripleExpensesMatching } from "./day01";

describe("day1", () => {
  describe("findTupleExpensesmatching", () => {
    describe("with no match", () => {
      test("should return 0", () => {
        expect(findTupleExpensesMatching(30)([])).toEqual(0);
        expect(findTupleExpensesMatching(30)([15])).toEqual(0);
      });
    });
    describe("with one match", () => {
      test("should return 200", () => {
        expect(findTupleExpensesMatching(30)([5, 10, 20, 40])).toEqual(200);
      });
    });
    describe("with multiple match", () => {
      test("should return 200 (the first match)", () => {
        expect(findTupleExpensesMatching(30)([5, 10, 20, 12, 18])).toEqual(200);
      });
    });
  });

  describe("findTripleExpensesMatching", () => {
    describe("with no match", () => {
      test("should return 0", () => {
        expect(findTripleExpensesMatching(30)([])).toEqual(0);
        expect(findTripleExpensesMatching(30)([10])).toEqual(0);
      });
    });
    describe("with one match", () => {
      test("should return 750", () => {
        expect(findTripleExpensesMatching(30)([5, 10, 15, 40])).toEqual(750);
      });
    });
    describe("with multiple match", () => {
      test("should return 200 (the first match)", () => {
        expect(findTripleExpensesMatching(30)([5, 10, 15, 3, 9, 18])).toEqual(
          750
        );
      });
    });
  });
});
