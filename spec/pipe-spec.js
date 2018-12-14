describe("pipe", () => {
  'use strict';

  const {pipe} = require('../src/fn-tools.js');
  const dummies = require('./helpers/dummies.js');

  it("Given no input to pipe function, should compose an identity function", () => {
    const composed = pipe();
    expect(composed("hello")).toBe("hello");
  });

  it("Given single input function, should apply that", () => {
    const composed = pipe(dummies.double);
    expect(composed(5)).toBe(10);
  });

  it("Given two input functions, should apply both", () => {
    const composed = pipe(dummies.double, dummies.square);
    expect(composed(5)).toBe(100);
  });

  it("Composed function can be reused without affecting state", () => {
    const composed = pipe(dummies.increment);
    expect(composed(2)).toBe(3);
    expect(composed(5)).toBe(6);

    expect(dummies.increment.calls.allArgs()).toEqual([
      [2],
      [5]
    ]);
  });

  it("Multilevel composed function", () => {
    const composed = pipe(
      dummies.increment,
      pipe(
        dummies.square,
        dummies.double
      )
    );

    expect(composed(2)).toBe(18);
  });

  it("Functions used in composition are called on composed function use, not on composition phase", () => {
    const composed = pipe(dummies.square, dummies.increment);
    expect(dummies.square).not.toHaveBeenCalled();
    expect(dummies.increment).not.toHaveBeenCalled();

    composed(10);
    expect(dummies.square).toHaveBeenCalledWith(10);
    expect(dummies.increment).toHaveBeenCalledWith(100);
  });
});
