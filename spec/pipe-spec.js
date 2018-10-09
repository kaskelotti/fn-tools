describe("pipe", () => {
  'use strict';

  const {pipe, tail, partial, map, drop, take, fold, head} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("Given only value, should return the value as is", () => {
    expect(pipe("hello")).toBe("hello");
  });

  it("Given one functions, should apply the function with given value and return the result", () => {
    expect(pipe("hello", dummies.fortyTwo)).toBe(42);
    expect(dummies.fortyTwo).toHaveBeenCalledWith("hello");
  });

  it("Given null input value and a function that can handle nulls, should not break the chain", () => {
    expect(pipe(null, dummies.fortyTwo)).toBe(42);
    expect(dummies.fortyTwo).toHaveBeenCalledWith(null);
  });

  it("Given multiple functions, should apply all by chaining the return value of previous as input", () => {
    const result = pipe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        tail,
        partial(map, dummies.increment),
        partial(drop, 2),
        partial(take, 5),
        partial(fold, dummies.add, 0)
      );
      expect(result).toBe(35);

      expect(dummies.increment.calls.allArgs()).toEqual([
        [2], [3], [4], [5], [6], [7], [8], [9], [10]
      ]);

      expect(dummies.add.calls.allArgs()).toEqual([
        [0, 5], [5, 6], [11, 7], [18, 8], [26, 9]
      ]);
  });

  it("Given pipe operations, should keep the original input list unmodified", () => {
    const list = [1, 2, 3];
    pipe(list,
      tail,
      head
    );
    expect(list).toEqual([1, 2, 3]);
  });

});
