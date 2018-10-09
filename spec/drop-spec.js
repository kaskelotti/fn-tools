describe("drop function", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

  it("Given null input, should return null", function() {
    expect(fn.drop(null)).toBe(null);
  });

  describe("with list input", function() {
    it("Given empty list, should return empty list", function() {
      expect(fn.drop(1, [])).toEqual([]);
    });

    it("Given one element list, should return empty list", function() {
      expect(fn.drop(1, [1])).toEqual([]);
    });

    it("Given list has less elements than dropped, should return empty list, i.e. drop all", function() {
      expect(fn.drop(3, [1, 2])).toEqual([]);
    });

    it("Given list has equal amount of items than dropped, should return empty list, i.e drop all", function() {
      expect(fn.drop(2, [1, 2])).toEqual([]);
    });

    it("Given zero elements are dropped, should return the list as is", function() {
      expect(fn.drop(0, [1, 2])).toEqual([1, 2]);
    });

    it("Given four element list and two are dropped, should return two remaining", function() {
      expect(fn.drop(2, [1, 2, 3, 4])).toEqual([3, 4]);
    });

  });

  describe("with string input", function() {

    it("Given empty string, should return empty string", function() {
      expect(fn.drop(1, "")).toBe("");
    });

    it("Given single char string, should return empty string", function() {
      expect(fn.drop(1, "h")).toBe("");
    });

    it("Given more chars are dropped than the string length, should return empty string", function() {
      expect(fn.drop(6, "hello")).toBe("");
    });

    it("Given equal amount of chars are dropped than the string length, should return empty string", function() {
      expect(fn.drop(5, "hello")).toBe("");
    });

    it("Given zero chars are dropped, should return string as is", function() {
      expect(fn.drop(0, "hello")).toBe("hello");
    });

    it("Given two chars are dropped, should return remaining", function() {
      expect(fn.drop(2, "hello")).toBe("llo");
    });
  });
});
