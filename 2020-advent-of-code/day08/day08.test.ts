import {
  executeAndReturnAccumulatorValue,
  mutateTheProgramAndReturnAccumulatorValue,
} from "./day08";

describe("day8", () => {
  describe("executeAndReturnAccumulatorValue", () => {
    test("should return 5", () => {
      expect(
        executeAndReturnAccumulatorValue(`
          nop +0
          acc +1
          jmp +4
          acc +3
          jmp -3
          acc -99
          acc +1
          jmp -4
          acc +6
        `)
      ).toEqual(5);
    });
  });

  describe("mutateTheProgramAndReturnAccumulatorValue", () => {
    test("should return 8", () => {
      return expect(
        mutateTheProgramAndReturnAccumulatorValue(`
          acc +1
          jmp +4
          acc +3
          jmp -3
          acc -99
          acc +1
          jmp -4
          acc +6
        `)
      ).toEqual(8);
    });
  });
});
