describe("contains", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

  it("Given null input list, should return false", function() {
    expect(fn.contains(1, null)).toBe(false);
  });

  it("Given empty input list, should return false", function() {
    expect(fn.contains("abc", [])).toBe(false);
  });

  it("Given empty string input, should return false", function() {
    expect(fn.contains("a", "")).toBe(false);
  });

  it("Given null criteria that is found in input list, should return true", function() {
    expect(fn.contains(null, [1, null, 2]));
  });

  it("Given empty string criteria that is found in list, should return true", function() {
    expect(fn.contains("", ["a", "", "b"])).toBe(true);
  });

  it("Given empty string criteria and string input where to look in, should return false", function() {
    expect(fn.contains("", "hello")).toBe(false);
  });

  it("Given basic type that is part of the list, should return true", function() {
    expect(fn.contains(2, [1, 2, 3])).toBe(true);
    expect(fn.contains("e", "hello")).toBe(true);
    expect(fn.contains(false, [false, true])).toBe(true);
  });

  it("Given basic type that is not part of the list, should return false", function() {
    expect(fn.contains(4, [1, 2, 3])).toBe(false);
    expect(fn.contains("abc", ["def", "a", "xyz"])).toBe(false);
    expect(fn.contains(true, [false])).toBe(false);
  });

  it("function criteria", function() {
    var list = [{name: "Joe"}, {name: "Jim"}];
    var f = function(name, value) {
      return value.name === name;
    };

    var matching = fn.partial(f, "Joe");
    var unMatching = fn.partial(f, "Smith");

    expect(fn.contains(matching, list)).toBe(true);
    expect(fn.contains(unMatching, list)).toBe(false);

  });

  it("Given criteria type is any other than null, basic data type of function, should throw exception", function() {
    var wrapper = function(value) {
      return function() {
          fn.contains(value, [1, 2, 3]);
      };
    };

    expect(wrapper(undefined)).toThrow();
    expect(wrapper([1, 2, 3])).toThrow();
    expect(wrapper(new Object())).toThrow();
    expect(wrapper(new String("abc"))).toThrow();
  });
});
