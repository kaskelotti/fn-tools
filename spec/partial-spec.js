describe("partial", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("with no arguments", function() {
    var partial = fn.partial(dummies.doNothing);
    partial();

    expect(dummies.doNothing).toHaveBeenCalled();
  });

  it("with single argument", function() {
    var partial = fn.partial(dummies.doNothing);
    partial("hello");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello");
  });

  it("with two arguments", function() {
    var partial = fn.partial(dummies.doNothing);
    partial("hello", "world");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello", "world");
  });

  it("with argument to target function", function() {
    var partial = fn.partial(dummies.doNothing, "hello");
    partial();

    expect(dummies.doNothing).toHaveBeenCalledWith("hello");
  });

  it("with arguments to both target and partial functions", function() {
    var partial = fn.partial(dummies.doNothing, "hello");
    partial("world");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello", "world");
  });

  it("Given that returned partial function is not used, should not call the target either", function() {
    fn.partial(dummies.doNothing);
    expect(dummies.doNothing).not.toHaveBeenCalled();
  });
});
