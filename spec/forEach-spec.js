describe("forEach", () => {
  'use strict';

  const {forEach} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("Given empty list, should do nothing", () => {
    forEach(dummies.doNothing, []);
    expect(dummies.doNothing).not.toHaveBeenCalled();
  });

  it("Given one element list, should call given function once with the list element", () => {
    forEach(dummies.doNothing, [1]);
    expect(dummies.doNothing.calls.allArgs()).toEqual([
      [1]
    ]);
  });

  it("Given multi-element list, should call given function for each list element", () => {
    forEach(dummies.doNothing, [1, 2, 3]);
    expect(dummies.doNothing.calls.allArgs()).toEqual([
      [1], [2], [3]
    ]);
  });

  it("Given string, should call given function for each char", () => {
    forEach(dummies.doNothing, "hello");
    expect(dummies.doNothing.calls.allArgs()).toEqual([
      ["h"], ["e"], ["l"], ["l"], ["o"]
    ]);
  });

  it("Given list stays unmodified", () => {
    const list = [1, 2, 3];
    forEach(dummies.doNothing, list);
    expect(list).toEqual([1, 2, 3]);
  });

});
