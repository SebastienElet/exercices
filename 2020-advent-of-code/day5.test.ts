import { getBoardingId, getColumn, getRow } from "./day5";

describe("day5", () => {
  describe("getRow", () => {
    describe.each([
      ["FBFBBFF", 44],
      ["BFFFBBF", 70],
      ["FFFBBBF", 14],
      ["BBFFBBF", 102],
    ])("with row %s", (input, expected) => {
      test(`should return ${expected}`, () => {
        expect(getRow(input)).toEqual(expected);
      });
    });
  });
  describe("getColumn", () => {
    describe.each([
      ["RLR", 5],
      ["RRR", 7],
      ["RLL", 4],
    ])("with column %s", (input, expected) => {
      test(`should return ${expected}`, () => {
        expect(getColumn(input)).toEqual(expected);
      });
    });
  });
  describe("getBoardingId", () => {
    describe.each([
      ["FBFBBFFRLR", 357],
      ["BFFFBBFRRR", 567],
      ["FFFBBBFRRR", 119],
      ["BBFFBBFRLL", 820],
    ])("with boarding %s", (input, expected) => {
      test(`should return ${expected}`, () => {
        expect(getBoardingId(input)).toEqual(expected);
      });
    });
  });
});
