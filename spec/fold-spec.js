describe("fold", () => {
  'use strict';

  const {fold} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  const seed = 7;

  it("Given empty list, should call given function with null arg and return value from that", () => {
    const result = fold(dummies.fortyTwo, seed, []);

    expect(dummies.fortyTwo).toHaveBeenCalledWith(seed, null);
    expect(result).toBe(42);
  });

  it("Given single element list, should call given function with the first element and return value from that", () => {
    const result = fold(dummies.fortyTwo, seed, [1]);

    expect(dummies.fortyTwo).toHaveBeenCalledWith(seed, 1);
    expect(result).toBe(42);
  });

  it("Given function to add values, should calculate the sum of list elements and call given function with all intermediate values", () => {
    const sum = fold(dummies.add, 0, [1, 2, 3, 4, 5]);

    expect(dummies.add.calls.allArgs()).toEqual([
      [0, 1],
      [1, 2],
      [3, 3],
      [6, 4],
      [10, 5]
    ]);
    expect(sum).toBe(15);
  });

  it("Given input list stays unmodified", () => {
    const list = [1, 2, 3];
    fold(dummies.fortyTwo, 0, list);
    expect(list).toEqual([1, 2, 3]);
  });

  it("Works with string also!", () => {
    const strSum = (a, b) => {
      const seed = a || 0;
      return seed + dummies.charToInt(b);
    };

    const result = fold(strSum, "", "hello");
    expect(result).toBe(532);
  });

});
