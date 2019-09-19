import { validateRoomName, splitSecondsToParts } from "../deviceFunctions";

describe("deviceFunctions", () => {
  describe("validateRoomName", () => {
    it("fails validation for non-string values", () => {
      const invalidValues = [undefined, null, 5, NaN, ["name"], true];
      invalidValues.forEach(value => {
        expect(validateRoomName(value)).toBe(false);
      });
    });
    it("fails validation for empty string and whitespaces", () => {
      const invalidValues = ["", "    ", " "];
      invalidValues.forEach(value => {
        expect(validateRoomName(value)).toBe(false);
      });
    });
    it("fails validation for very lengthy strings", () => {
      expect(
        validateRoomName(
          "Unnecessarily long name you should not be giving to a light"
        )
      ).toBe(false);
    });
    it("passes validation for reasonable name", () => {
      expect(validateRoomName("Bedroom")).toBe(true);
    });
  });
  describe("splitSecondsToParts", () => {
    it("returns 0 for NaN", () => {
      expect(splitSecondsToParts("num")).toEqual({ h: 0, m: 0, s: 0 });
    });
    it("converts to seconds correctly", () => {
      expect(splitSecondsToParts(34)).toEqual({ h: 0, m: 0, s: 34 });
    });
    it("converts to minutes correctly", () => {
      expect(splitSecondsToParts(2040)).toEqual({ h: 0, m: 34, s: 0 });
    });
    it("converts to minutes and seconds correctly", () => {
      expect(splitSecondsToParts(2074)).toEqual({ h: 0, m: 34, s: 34 });
    });
    it("converts to hours correctly", () => {
      expect(splitSecondsToParts(7200)).toEqual({ h: 2, m: 0, s: 0 });
    });
    it("converts to hours and minutes correctly", () => {
      expect(splitSecondsToParts(8220)).toEqual({ h: 2, m: 17, s: 0 });
    });
    it("converts to hours, minutes and seconds correctly", () => {
      expect(splitSecondsToParts(8254)).toEqual({ h: 2, m: 17, s: 34 });
    });
    it("converts to hours and seconds correctly", () => {
      expect(splitSecondsToParts(7234)).toEqual({ h: 2, m: 0, s: 34 });
    });
  });
});
