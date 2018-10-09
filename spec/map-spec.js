describe("map", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("Given empty list, should make no calls to given function and return empty list", function() {
    expect(fn.map(dummies.doNothing, [])).toEqual([]);
    expect(dummies.doNothing).not.toHaveBeenCalled();
  });

  it("Given single element list, should apply the given function on that element and return the value", function() {
    expect(fn.map(dummies.fortyTwo, [1])).toEqual([42]);
    expect(dummies.fortyTwo).toHaveBeenCalledWith(1);
  });

  it("Given list with elements, should apply given function on each element and return new list", function() {
    expect(fn.map(dummies.increment, [1, 2, 3])).toEqual([2, 3, 4]);
    expect(dummies.increment.calls.allArgs()).toEqual([
      [1], [2], [3]
    ]);
  });

  it("Given string input, should call the given function on each char and return an array with stored values of function returns", function() {
    expect(fn.map(dummies.charToInt, "hello")).toEqual([104, 101, 108, 108, 111]);
    expect(dummies.charToInt.calls.allArgs()).toEqual([
      ["h"], ["e"], ["l"], ["l"], ["o"]
    ]);
  });

  it("Given list is mapped, should not change the original list", function() {
    var list = [1, 2, 3];
    fn.map(dummies.increment, list);

    expect(list).toEqual([1, 2, 3]);
  });

});
