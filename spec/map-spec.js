describe("map", () => {
  'use strict';

  const {map} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("Given empty list, should make no calls to given function and return empty list", () => {
    expect(map(dummies.doNothing, [])).toEqual([]);
    expect(dummies.doNothing).not.toHaveBeenCalled();
  });

  it("Given single element list, should apply the given function on that element and return the value", () => {
    expect(map(dummies.fortyTwo, [1])).toEqual([42]);
    expect(dummies.fortyTwo).toHaveBeenCalledWith(1);
  });

  it("Given list with elements, should apply given function on each element and return new list", () => {
    expect(map(dummies.increment, [1, 2, 3])).toEqual([2, 3, 4]);
    expect(dummies.increment.calls.allArgs()).toEqual([
      [1], [2], [3]
    ]);
  });

  it("Given string input, should call the given function on each char and return an array with stored values of function returns", () => {
    expect(map(dummies.charToInt, "hello")).toEqual([104, 101, 108, 108, 111]);
    expect(dummies.charToInt.calls.allArgs()).toEqual([
      ["h"], ["e"], ["l"], ["l"], ["o"]
    ]);
  });

  it("Given list is mapped, should not change the original list", () => {
    const list = [1, 2, 3];
    map(dummies.increment, list);

    expect(list).toEqual([1, 2, 3]);
  });

});
