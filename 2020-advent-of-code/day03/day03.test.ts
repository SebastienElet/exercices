import {
  countTreeOnTobogganTrajectory,
  matrixToString,
  stringToMatrix,
} from "./day03";

const example = `
..##.........##.........##.........##.........##.........##.......
#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..#...#...#..
.#....#..#..#....#..#..#....#..#..#....#..#..#....#..#..#....#..#.
..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#..#.#...#.#
.#...##..#..#...##..#..#...##..#..#...##..#..#...##..#..#...##..#.
..#.##.......#.##.......#.##.......#.##.......#.##.......#.##.....
.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#.#.#.#....#
.#........#.#........#.#........#.#........#.#........#.#........#
#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...#.##...#...
#...##....##...##....##...##....##...##....##...##....##...##....#
.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#.#..#...#.#
`.trim();
const exampleMatrix = stringToMatrix(example);
const partialExample = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`.trim();
const partialExampleMatrix = stringToMatrix(partialExample);
describe("day3", () => {
  describe("stringToMatrix()", () => {
    test("should return an array of length 11", () => {
      expect(stringToMatrix(example)).toHaveLength(11);
    });
    test("should return a matrix", () => {
      expect(stringToMatrix(example)).toMatchSnapshot();
    });
  });
  describe("matrixToString()", () => {
    test("should return a string", () => {
      expect(matrixToString(exampleMatrix)).toEqual(example);
    });
  });

  describe("countTreeOnTobogganTrajectory", () => {
    test("should return 7", () => {
      expect(countTreeOnTobogganTrajectory(exampleMatrix)([3, 1])).toEqual(7);
    });

    describe("with partial example", () => {
      test("should return 7", () => {
        expect(
          countTreeOnTobogganTrajectory(partialExampleMatrix)([3, 1])
        ).toEqual(7);
      });
    });

    describe("with multiple trajectories", () => {
      test.each([
        [1, 1, 2],
        [3, 1, 7],
        [5, 1, 3],
        [7, 1, 4],
        [1, 2, 2],
      ])("with direction [%i, %i] we expect %i", (a, b, expected) => {
        expect(countTreeOnTobogganTrajectory(exampleMatrix)([a, b])).toEqual(
          expected
        );
      });
    });
  });
});
