describe("tail function", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

    it("Given null input, should return null", function() {
      expect(fn.tail(null)).toBe(null);
    });

    describe("with list input", function() {
      it("Given empty list, should return empty list", function() {
        expect(fn.tail([])).toEqual([]);
      });

      it("Given one element list, should return empty list", function() {
        expect(fn.tail([1])).toEqual([]);
      });

      it("Given list, should return all but first element", function() {
        expect(fn.tail([1,2,3])).toEqual([2,3]);
      });
    });

    describe("with string input", function() {
      it("Given empty string, should return empty string", function() {
        expect(fn.tail("")).toBe("");
      });

      it("Given one char string, should return empty string", function() {
        expect(fn.tail("a")).toBe("");
      });

      it("Given string, should return all but first char", function() {
        expect(fn.tail("abc")).toBe("bc");
      });

    });
});
