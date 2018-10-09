describe("take function", () => {
  'use strict';

  const {take} = require('../src/fn-tools.js');

  it("Given null input, should return null", () => {
    expect(take(null)).toBe(null);
  });

  describe("with list input", () => {
    it("Given empty list, should return empty list", () => {
      expect(take(1, [])).toEqual([]);
    });

    it("Given list with elements and zero is taken, should return empty list", () => {
      expect(take(0, [1, 2, 3])).toEqual([]);
    });

    it("Given all elements are taken, should return whole list", () => {
      expect(take(3, [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("Given more are taken than elements in list, should return whole list", () => {
      expect(take(4, [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("Given elements are taken from a list, should return requested", () => {
      expect(take(2, [1, 2, 3])).toEqual([1, 2]);
    });

    it("Given elemensta are taken from list, should keep the original list unmodified", () => {
      const list = [1, 2, 3];
      take(2, list);
      expect(list).toEqual([1, 2, 3]);
    });

  });

  describe("with string input", () => {
    it("Given empty string, should return empty string", () => {
      expect(take(1, "")).toBe("");
    });

    it("Given string and zero is taken, should return empty string", () => {
      expect(take(0, "hello")).toBe("");
    });

    it("Given all elements are taken, should return the whole string", () => {
      expect(take(5, "hello")).toBe("hello");
    });

    it("Given more are taken than elements in string, should return the whole string", () => {
      expect(take(6, "hello")).toBe("hello");
    });

    it("Given elements are taken from string, should return requested", () => {
      expect(take(2, "hello")).toBe("he");
    });

    it("Given elements are taken from string, should keep the original string unmodified", () => {
      const text = "hello";
      take(2, text);
      expect(text).toBe("hello");
    });

  });

});
