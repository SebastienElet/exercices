import { isCloseTo } from "./isCloseTo";

describe("isCloseTo", () => {
  describe.each([
    [12.66, 0.01, 12.67],
    [12.68, 0.01, 12.67],
    [-12.66, 0.01, -12.67],
    [-12.68, 0.01, -12.67],
    [-12.8, 0.1, -12.77],
  ])(`when called with %p (%p) and %p`, (a, digits, b) => {
    test(`should return true`, () => {
      expect(isCloseTo(a, digits)(b)).toBeTruthy();
    });
  });

  describe.each([
    [12.66, 0.01, 12.69],
    [12.68, 0.01, 12.65],
    [-12.66, 0.01, -12.69],
    [-12.68, 0.01, -12.66],
    [-12.8, 0.1, -12.67],
  ])(`when called with %p (%p) and %p`, (a, digits, b) => {
    test(`should return false`, () => {
      expect(isCloseTo(a, digits)(b)).toBeFalsy();
    });
  });
});
