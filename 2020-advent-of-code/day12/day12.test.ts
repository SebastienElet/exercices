import { getManathanDistance } from "./day12";

describe("day12", () => {
  describe("for a given instruction set", () => {
    test("should return the manathan distance", () => {
      /*
      expect(
        getManathanDistance(
          `F10
        `
        )
      ).toEqual(10);
      expect(
        getManathanDistance(
          `F10
N3
        `
        )
      ).toEqual(13);
      */
      expect(
        getManathanDistance(
          `F10
N3
F7
        `
        )
      ).toEqual(20);
      /*
      expect(
        getManathanDistance(
          `
F10
N3
F7
R90
F11
        `
        )
      ).toEqual(25);
      */
    });
  });
});
