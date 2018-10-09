describe("pipe", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');
  
  it("Given only value, should return the value as is", function() {
    expect(fn.pipe("hello")).toBe("hello");
  });

  it("Given one functions, should apply the function with given value and return the result", function() {
    expect(fn.pipe("hello", dummies.fortyTwo)).toBe(42);
    expect(dummies.fortyTwo).toHaveBeenCalledWith("hello");
  });

  it("Given null input value and a function that can handle nulls, should not break the chain", function() {
    expect(fn.pipe(null, dummies.fortyTwo)).toBe(42);
    expect(dummies.fortyTwo).toHaveBeenCalledWith(null);
  });

  it("Given multiple functions, should apply all by chaining the return value of previous as input", function() {
    var result = fn.pipe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        fn.tail,
        fn.partial(fn.map, dummies.increment),
        fn.partial(fn.drop, 2),
        fn.partial(fn.take, 5),
        fn.partial(fn.fold, dummies.add, 0)
      );
      expect(result).toBe(35);

      expect(dummies.increment.calls.allArgs()).toEqual([
        [2], [3], [4], [5], [6], [7], [8], [9], [10]
      ]);

      expect(dummies.add.calls.allArgs()).toEqual([
        [0, 5], [5, 6], [11, 7], [18, 8], [26, 9]
      ]);
  });

  it("Given pipe operations, should keep the original input list unmodified", function() {
    var list = [1, 2, 3];
    fn.pipe(list,
      fn.tail,
      fn.head
    );
    expect(list).toEqual([1, 2, 3]);
  });

});
