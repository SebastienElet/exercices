import { isValidPassword, isValidPassword2 } from "./day02";

describe("day2", () => {
  describe("isValidPassword", () => {
    describe("without password", () => {
      test("should return false", () => {
        expect(isValidPassword("1-3 a", "")).toBeFalsy();
      });
    });
    describe("with missing char", () => {
      test("should return false", () => {
        expect(isValidPassword("1-3 a", "b")).toBeFalsy();
        expect(isValidPassword("1-3 b", "cdefg")).toBeFalsy();
      });
    });
    describe("with not enought chars", () => {
      test("should return false", () => {
        expect(isValidPassword("3-3 a", "aba")).toBeFalsy();
      });
    });
    describe("with too many chars", () => {
      test("should return false", () => {
        expect(isValidPassword("1-3 a", "ababababa")).toBeFalsy();
      });
    });
    describe("with valid password", () => {
      test("should return true", () => {
        expect(isValidPassword("1-3 a", "a")).toBeTruthy();
        expect(isValidPassword("1-3 a", "aba")).toBeTruthy();
        expect(isValidPassword("1-3 a", "ababa")).toBeTruthy();
        expect(isValidPassword("1-3 a", "abcde")).toBeTruthy();
        expect(isValidPassword("2-9 c", "ccccccccc")).toBeTruthy();
      });
    });
  });
  describe("isValidPassword2", () => {
    describe("without password", () => {
      test("should return false", () => {
        expect(isValidPassword2("1-3 a", "")).toBeFalsy();
      });
    });
    describe("with missing char", () => {
      test("should return false", () => {
        expect(isValidPassword2("1-3 a", "b")).toBeFalsy();
        expect(isValidPassword2("1-3 b", "cdefg")).toBeFalsy();
      });
    });
    describe("with not enought chars", () => {
      test("should return false", () => {
        expect(isValidPassword2("3-3 a", "aba")).toBeFalsy();
      });
    });
    describe("with too many chars", () => {
      test("should return false", () => {
        expect(isValidPassword2("1-3 a", "ababababa")).toBeFalsy();
        expect(isValidPassword2("1-3 a", "aba")).toBeFalsy();
        expect(isValidPassword2("1-3 a", "ababa")).toBeFalsy();
        expect(isValidPassword2("2-9 c", "ccccccccc")).toBeFalsy();
      });
    });
    describe("with valid password", () => {
      test("should return true", () => {
        expect(isValidPassword2("1-3 a", "a")).toBeTruthy();
        expect(isValidPassword2("1-3 a", "a")).toBeTruthy();
        expect(isValidPassword2("1-3 a", "abcde")).toBeTruthy();
      });
    });
  });
});
