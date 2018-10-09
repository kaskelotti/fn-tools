describe("tail function", () => {
  'use strict';

  const {tail} = require('../src/fn-tools.js');

    it("Given null input, should return null", () => {
      expect(tail(null)).toBe(null);
    });

    describe("with list input", () => {
      it("Given empty list, should return empty list", () => {
        expect(tail([])).toEqual([]);
      });

      it("Given one element list, should return empty list", () => {
        expect(tail([1])).toEqual([]);
      });

      it("Given list, should return all but first element", () => {
        expect(tail([1,2,3])).toEqual([2,3]);
      });
    });

    describe("with string input", () => {
      it("Given empty string, should return empty string", () => {
        expect(tail("")).toBe("");
      });

      it("Given one char string, should return empty string", () => {
        expect(tail("a")).toBe("");
      });

      it("Given string, should return all but first char", () => {
        expect(tail("abc")).toBe("bc");
      });

    });
});
