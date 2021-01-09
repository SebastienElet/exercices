import { findEncryptionWeakness, findNumberBreakingSuite } from "./day09";

describe("day9", () => {
  describe("findNumberBreakingSuite", () => {
    test("should return 127", () =>
      expect(
        findNumberBreakingSuite(
          `
        35
        20
        15
        25
        47
        40
        62
        55
        65
        95
        102
        117
        150
        182
        127
        219
        299
        277
        309
        576
        `,
          5
        )
      ).toEqual(127));
  });
  describe("findEncryptionWeakness", () => {
    test("should return 62", () =>
      expect(
        findEncryptionWeakness(
          `
        35
        20
        15
        25
        47
        40
        62
        55
        65
        95
        102
        117
        150
        182
        127
        219
        299
        277
        309
        576
        `,
          5
        )
      ).toEqual(62));
  });
});
