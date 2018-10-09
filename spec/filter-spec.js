describe("filter", function() {
  'use strict';

  const fn = require('../src/fn-tools.js');

  var isEven = function(value) {
    return value % 2 === 0;
  };

  it("Given null input list, should return null", function() {
    expect(fn.filter(isEven, null)).toBe(null);
  });

  it("Given empty input list, should return empty list", function() {
    expect(fn.filter(isEven, [])).toEqual([]);
  });

  it("Given function criteria, should use that to evaluate each list element and return matching", function() {
    expect(fn.filter(isEven, [1, 2, 3, 4, 5, 6])).toEqual([2, 4, 6]);
  });

  it("Given basic type criteria, should use that and filter matchig", function() {
    expect(fn.filter("hello", ["hello", "world", "hello", "sir", "ok", "computer"])).toEqual(["hello", "hello"]);
  });

  it("Given null criteria, should use that and return list of nulls", function() {
    // NOTE: Seems counter intuitive, but filter returns all that match the given criteria
    // To filter *out* nulls, have to use function form and use notNull() or similar
    expect(fn.filter(null, [1, null, null, 2, 3])).toEqual([null, null]);
  });

  it("Given sparse array with some null element, should be able to only keep data values", function() {
    var hasValue = function(value) {
      return !(value === null || value === undefined);
    };

    expect(fn.filter(hasValue, ["",,2, null, 4, false, 5])).toEqual(["", 2, 4, false, 5]);   //eslint-disable-line no-sparse-arrays
  });

  it("Given input list should remain unmodified", function() {
    var list = [9, 8, 7, 6, 6, 5, 4, 4, 9, 8, 3, 9, 2, 1];
    var filterDuplicates = (function() {
      var foundValues = [];
      return function(value) {
        if(fn.contains(value, foundValues)) {
          return false;
        }
        else {
          foundValues.push(value);
          return true;
        }
      };
    })();

    expect(fn.filter(filterDuplicates, list)).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1]);
    expect(list).toEqual([9, 8, 7, 6, 6, 5, 4, 4, 9, 8, 3, 9, 2, 1]);
  });
});
