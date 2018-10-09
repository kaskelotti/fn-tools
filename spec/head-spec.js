describe("head function", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

  it("Given null input, should return null", function() {
    expect(fn.head(null)).toBe(null);
  });

  describe("with list input", function() {
    it("Given empty list, should return null", function() {
      var empty = [];
      expect(fn.head(empty)).toBe(null);
    });

    it("Given list with one element, should return the element", function() {
      var list = [7];
      expect(fn.head(list)).toBe(7);
    });

    it("Given list with elements, should return the first element", function() {
      var list = [1,2,3];
      expect(fn.head(list)).toBe(1);
    });
  });

  describe("with string input", function() {
    it("Given empty string, should return null", function() {
      var empty = "";
      expect(fn.head(empty)).toBe(null);
    });

    it("Given one letter string, should return the only char", function() {
      expect(fn.head("h")).toBe("h");
    });

    it("Given string, should return the first char", function() {
      expect(fn.head("hello")).toBe("h");
    });
  });
});
