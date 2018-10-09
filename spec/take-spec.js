describe("take function", function() {
  'use strict';
  
  const fn = require('../src/fn-tools.js');

  it("Given null input, should return null", function() {
    expect(fn.take(null)).toBe(null);
  });

  describe("with list input", function() {
    it("Given empty list, should return empty list", function() {
      expect(fn.take(1, [])).toEqual([]);
    });

    it("Given list with elements and zero is taken, should return empty list", function() {
      expect(fn.take(0, [1, 2, 3])).toEqual([]);
    });

    it("Given all elements are taken, should return whole list", function() {
      expect(fn.take(3, [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("Given more are taken than elements in list, should return whole list", function() {
      expect(fn.take(4, [1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("Given elements are taken from a list, should return requested", function() {
      expect(fn.take(2, [1, 2, 3])).toEqual([1, 2]);
    });

    it("Given elemensta are taken from list, should keep the original list unmodified", function() {
      var list = [1, 2, 3];
      fn.take(2, list);
      expect(list).toEqual([1, 2, 3]);
    });

  });

  describe("with string input", function() {
    it("Given empty string, should return empty string", function() {
      expect(fn.take(1, "")).toBe("");
    });

    it("Given string and zero is taken, should return empty string", function() {
      expect(fn.take(0, "hello")).toBe("");
    });

    it("Given all elements are taken, should return the whole string", function() {
      expect(fn.take(5, "hello")).toBe("hello");
    });

    it("Given more are taken than elements in string, should return the whole string", function() {
      expect(fn.take(6, "hello")).toBe("hello");
    });

    it("Given elements are taken from string, should return requested", function() {
      expect(fn.take(2, "hello")).toBe("he");
    });

    it("Given elements are taken from string, should keep the original string unmodified", function() {
      var text = "hello";
      fn.take(2, text);
      expect(text).toBe("hello");
    });

  });

});
