describe("any", () => {
  'use strict';

  const {any} = require('../src/fn-tools.js');

  const isEven = (value) => value % 2  === 0;

  it("Given null as input, should return false", () => {
    expect(any(isEven, null)).toBe(false);
  });

  it("Given empty list inupt, should return false", () => {
    expect(any(isEven, [])).toBe(false);
  });

  it("Given single element list that does not pass the predicate, should return false", () => {
    expect(any(isEven, [1])).toBe(false);
  });

  it("Given single element list that passes te predicate, should return true", () => {
    expect(any(isEven, [2])).toBe(true);
  });

  it("Given a list where all elements pass the predicate criteria, should return true", () => {
    expect(any(isEven, [2, 4, 6])).toBe(true);
  });

  it("Given a list where only some elements pass the predicate criteria, should return false", () => {
    expect(any(isEven, [2, 1, 3])).toBe(true);
    expect(any(isEven, [3, 4])).toBe(true);
    expect(any(isEven, [1, 2, 3])).toBe(true);
  });

  it("Given a list where none of the elements pass the predicate criteria, should return false", () => {
    expect(any(isEven, [1, 3, 5, 7])).toBe(false);
  });

});
