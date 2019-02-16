describe("partial", () => {
  'use strict';

  const {partial} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("with no arguments", () => {
    const f = partial(dummies.doNothing);
    f();

    expect(dummies.doNothing).toHaveBeenCalled();
  });

  it("with single argument", () => {
    const f = partial(dummies.doNothing);
    f("hello");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello");
  });

  it("with two arguments", () => {
    const f = partial(dummies.doNothing);
    f("hello", "world");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello", "world");
  });

  it("with argument to target function", () => {
    const f = partial(dummies.doNothing, "hello");
    f();

    expect(dummies.doNothing).toHaveBeenCalledWith("hello");
  });

  it("with arguments to both target and partial functions", () => {
    const f = partial(dummies.doNothing, "hello");
    f("world");

    expect(dummies.doNothing).toHaveBeenCalledWith("hello", "world");
  });

  it("Given that returned partial function is not used, should not call the target either", () => {
    partial(dummies.doNothing);
    expect(dummies.doNothing).not.toHaveBeenCalled();
  });

  it("Given function that refers to context with this, should not pollute global namespace", () => {
    /* eslint-disable no-undef */
    partial(polluter)();
    expect(global.meaning).toBeUndefined();
    /* eslint-enable */
  });
});

// eslint-disable-next-line strict
const polluter = function() { this.meaning = 42; };
