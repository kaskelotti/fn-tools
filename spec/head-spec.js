describe("head function", () => {
  'use strict';

  const {head} = require('../src/fn-tools.js');

  it("Given null input, should return null", () => {
    expect(head(null)).toBe(null);
  });

  describe("with list input", () => {
    it("Given empty list, should return null", () => {
      const empty = [];
      expect(head(empty)).toBe(null);
    });

    it("Given list with one element, should return the element", () => {
      const list = [7];
      expect(head(list)).toBe(7);
    });

    it("Given list with elements, should return the first element", () => {
      const list = [1,2,3];
      expect(head(list)).toBe(1);
    });
  });

  describe("with string input", () => {
    it("Given empty string, should return null", () => {
      const empty = "";
      expect(head(empty)).toBe(null);
    });

    it("Given one letter string, should return the only char", () => {
      expect(head("h")).toBe("h");
    });

    it("Given string, should return the first char", () => {
      expect(head("hello")).toBe("h");
    });
  });
});
