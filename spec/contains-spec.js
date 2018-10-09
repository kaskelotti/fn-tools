describe("contains", () => {
  'use strict';

  const {contains, partial} = require('../src/fn-tools.js');

  it("Given null input list, should return false", () => {
    expect(contains(1, null)).toBe(false);
  });

  it("Given empty input list, should return false", () => {
    expect(contains("abc", [])).toBe(false);
  });

  it("Given empty string input, should return false", () => {
    expect(contains("a", "")).toBe(false);
  });

  it("Given null criteria that is found in input list, should return true", () => {
    expect(contains(null, [1, null, 2]));
  });

  it("Given empty string criteria that is found in list, should return true", () => {
    expect(contains("", ["a", "", "b"])).toBe(true);
  });

  it("Given empty string criteria and string input where to look in, should return false", () => {
    expect(contains("", "hello")).toBe(false);
  });

  it("Given basic type that is part of the list, should return true", () => {
    expect(contains(2, [1, 2, 3])).toBe(true);
    expect(contains("e", "hello")).toBe(true);
    expect(contains(false, [false, true])).toBe(true);
  });

  it("Given basic type that is not part of the list, should return false", () => {
    expect(contains(4, [1, 2, 3])).toBe(false);
    expect(contains("abc", ["def", "a", "xyz"])).toBe(false);
    expect(contains(true, [false])).toBe(false);
  });

  it("function criteria", () => {
    const list = [{name: "Joe"}, {name: "Jim"}];
    const f = (name, value) =>value.name === name;

    const matching = partial(f, "Joe");
    const unMatching = partial(f, "Smith");

    expect(contains(matching, list)).toBe(true);
    expect(contains(unMatching, list)).toBe(false);

  });

  it("Given criteria type is any other than null, basic data type of function, should throw exception", () => {
    const wrapper = (value) => () => contains(value, [1, 2, 3]);

    expect(wrapper(undefined)).toThrow();
    expect(wrapper([1, 2, 3])).toThrow();
    expect(wrapper(new Object())).toThrow();
    expect(wrapper(new String("abc"))).toThrow();
  });
});
