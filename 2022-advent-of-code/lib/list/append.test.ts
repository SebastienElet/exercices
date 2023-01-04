import { append } from "./append";

describe("append", () => {
  test("should add an item to the end of an array", () => {
    expect(append(3)([1, 2])).toEqual([1, 2, 3]);
  });
});
