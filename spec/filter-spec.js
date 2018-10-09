describe("filter", () => {
  'use strict';

  const {filter, contains} = require('../src/fn-tools.js');

  const isEven = (value) => value % 2 === 0;

  it("Given null input list, should return null", () => {
    expect(filter(isEven, null)).toBe(null);
  });

  it("Given empty input list, should return empty list", () => {
    expect(filter(isEven, [])).toEqual([]);
  });

  it("Given function criteria, should use that to evaluate each list element and return matching", () => {
    expect(filter(isEven, [1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  it("Given basic type criteria, should use that and filter matchig", () => {
    expect(filter("hello", ["hello", "world", "hello", "sir", "ok", "computer"])).toEqual(["hello", "hello"]);
  });

  it("Given null criteria, should use that and return list of nulls", () => {
    // NOTE: Seems counter intuitive, but filter returns all that match the given criteria
    // To filter *out* nulls, have to use function form and use notNull() or similar
    expect(filter(null, [1, null, null, 2, 3])).toEqual([null, null]);
  });

  it("Given sparse array with some null element, should be able to only keep data values", () => {
    const hasValue = (value) => !(value === null || value === undefined);

    expect(filter(hasValue, ["",,2, null, 4, false, 5])).toEqual(["", 2, 4, false, 5]);   //eslint-disable-line no-sparse-arrays
  });

  it("Given input list should remain unmodified", () => {
    const list = [9, 8, 7, 6, 6, 5, 4, 4, 9, 8, 3, 9, 2, 1];
    const filterDuplicates = (() => {
      const foundValues = [];
      return (value) => {
        if(contains(value, foundValues)) {
          return false;
        }
        else {
          foundValues.push(value);
          return true;
        }
      };
    })();

    expect(filter(filterDuplicates, list)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    expect(list).toEqual([9, 8, 7, 6, 6, 5, 4, 4, 9, 8, 3, 9, 2, 1]);
  });
});
