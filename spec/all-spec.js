describe("all", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

  var isPositive = function(value) { return value > 0; };

  it("Given null as input, should return false", function() {
    expect(fn.all(isPositive, null)).toBe(false);
  });

  it("Given empty list inupt, should return false", function() {
    expect(fn.all(isPositive, [])).toBe(false);
  });

  it("Given single element list that does not pass the predicate, should return false", function() {
    expect(fn.all(isPositive, [-1])).toBe(false);
  });

  it("Given single element list that passes te predicate, should return true", function() {
    expect(fn.all(isPositive, [2])).toBe(true);
  });

  it("Given a list where all elements pass the predicate criteria, should return true", function() {
    expect(fn.all(isPositive, [1, 2, 3, 4])).toBe(true);
  });

  it("Given a list where only some elements pass the predicate criteria, should return false", function() {
    expect(fn.all(isPositive, [1, -2, 3, 4])).toBe(false);
    expect(fn.all(isPositive, [-1, -2, 3, 4])).toBe(false);
    expect(fn.all(isPositive, [-1, 2, 3, 4])).toBe(false);
    expect(fn.all(isPositive, [1, 2, 3, -4])).toBe(false);
  });

  it("Given a list where none of the elements pass the predicate criteria, should return false", function() {
    expect(fn.all(isPositive, [-1, -2, -3, -4])).toBe(false);
  });

});
