describe("all", () => {
  'use strict';

  const {all} = require('../src/fn-tools.js');

  const isPositive = (value) => value > 0;

  it("Given null as input, should return false", () => {
    expect(all(isPositive, null)).toBe(false);
  });

  it("Given empty list inupt, should return false", () => {
    expect(all(isPositive, [])).toBe(false);
  });

  it("Given single element list that does not pass the predicate, should return false", () => {
    expect(all(isPositive, [-1])).toBe(false);
  });

  it("Given single element list that passes te predicate, should return true", () => {
    expect(all(isPositive, [2])).toBe(true);
  });

  it("Given a list where all elements pass the predicate criteria, should return true", () => {
    expect(all(isPositive, [1, 2, 3, 4])).toBe(true);
  });

  it("Given a list where only some elements pass the predicate criteria, should return false", () => {
    expect(all(isPositive, [1, -2, 3, 4])).toBe(false);
    expect(all(isPositive, [-1, -2, 3, 4])).toBe(false);
    expect(all(isPositive, [-1, 2, 3, 4])).toBe(false);
    expect(all(isPositive, [1, 2, 3, -4])).toBe(false);
  });

  it("Given a list where none of the elements pass the predicate criteria, should return false", () => {
    expect(all(isPositive, [-1, -2, -3, -4])).toBe(false);
  });

});
