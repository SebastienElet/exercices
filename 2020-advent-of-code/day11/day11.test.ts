import {
  countOccupiedSeat,
  seatingSystemMatrix,
  seatingSystemMatrix2,
} from "./day11";

const input = `
  L.LL.LL.LL
  LLLLLLL.LL
  L.L.L..L..
  LLLL.LL.LL
  L.LL.LL.LL
  L.LLLLL.LL
  ..L.L.....
  LLLLLLLLLL
  L.LLLLLL.L
  L.LLLLL.LL
  `;
describe("day11", () => {
  describe("seatingSystemMatrix", () => {
    describe("first round", () => {
      test("should return all seat occupied", () => {
        expect(seatingSystemMatrix(input)).toEqual(`#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`);
      });
    });

    describe("second round", () => {
      test("should return another matrix", () => {
        expect(seatingSystemMatrix(seatingSystemMatrix(input)))
          .toEqual(`#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##`);
      });
    });
    describe("third round", () => {
      test("should return another matrix", () => {
        expect(
          seatingSystemMatrix(seatingSystemMatrix(seatingSystemMatrix(input)))
        ).toEqual(`#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##`);
      });
    });

    describe("fourth round", () => {
      test("should return another matrix", () => {
        expect(
          seatingSystemMatrix(
            seatingSystemMatrix(seatingSystemMatrix(seatingSystemMatrix(input)))
          )
        ).toEqual(`#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##`);
      });
    });

    describe("fifth round", () => {
      test("should return another matrix", () => {
        expect(
          seatingSystemMatrix(
            seatingSystemMatrix(
              seatingSystemMatrix(
                seatingSystemMatrix(seatingSystemMatrix(input))
              )
            )
          )
        ).toEqual(`#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##`);
      });
    });
  });

  describe("countOccupiedSeat", () => {
    describe("fifth round", () => {
      test("should return 37", () => {
        expect(
          countOccupiedSeat(
            seatingSystemMatrix(
              seatingSystemMatrix(
                seatingSystemMatrix(
                  seatingSystemMatrix(seatingSystemMatrix(input))
                )
              )
            )
          )
        ).toEqual(37);
      });
    });
  });

  describe("seatingSystemMatrix2", () => {
    describe("first round", () => {
      test("should return a matrix", () => {
        expect(seatingSystemMatrix2(input)).toEqual(`#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##`);
      });
    });

    describe("second round", () => {
      test("should return a matrix", () => {
        expect(
          seatingSystemMatrix2(
            `
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
`
          )
        ).toEqual(`#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#`);
      });
    });

    describe("third round", () => {
      test("should return a matrix", () => {
        expect(
          seatingSystemMatrix2(
            `
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
`
          )
        ).toEqual(`#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#`);
      });
    });
  });
});
