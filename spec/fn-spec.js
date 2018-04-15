describe("fn-tools spec", function() {
  'use strict';

  var fn = require('../src/fn-tools.js');

  var dummies = {
    doNothing: function() {},
    fortyTwo: function() { return 42; },
    add: function(a, b) { return a + b; },
    charToInt: function(str) { return str.charCodeAt(0); },
    increment: function(a) { return a + 1; }
  };

  beforeEach(function() {
    spyOn(dummies, "doNothing").and.callThrough();
    spyOn(dummies, "fortyTwo").and.callThrough();
    spyOn(dummies, "add").and.callThrough();
    spyOn(dummies, "charToInt").and.callThrough();
    spyOn(dummies, "increment").and.callThrough();
  });

  describe("head function", function() {

    it("Given null input, should return null", function() {
      expect(fn.head(null)).toBe(null);
    });

    describe("with list input", function() {
      it("Given empty list, should return null", function() {
        var empty = [];
        expect(fn.head(empty)).toBe(null);
      });

      it("Given list with one element, should return the element", function() {
        var list = [7];
        expect(fn.head(list)).toBe(7);
      });

      it("Given list with elements, should return the first element", function() {
        var list = [1,2,3];
        expect(fn.head(list)).toBe(1);
      });
    });

    describe("with string input", function() {
      it("Given empty string, should return null", function() {
        var empty = "";
        expect(fn.head(empty)).toBe(null);
      });

      it("Given one letter string, should return the only char", function() {
        expect(fn.head("h")).toBe("h");
      });

      it("Given string, should return the first char", function() {
        expect(fn.head("hello")).toBe("h");
      });
    });



  });

  describe("tail function", function() {

      it("Given null input, should return null", function() {
        expect(fn.tail(null)).toBe(null);
      });

      describe("with list input", function() {
        it("Given empty list, should return empty list", function() {
          expect(fn.tail([])).toEqual([]);
        });

        it("Given one element list, should return empty list", function() {
          expect(fn.tail([1])).toEqual([]);
        });

        it("Given list, should return all but first element", function() {
          expect(fn.tail([1,2,3])).toEqual([2,3]);
        });
      });

      describe("with string input", function() {
        it("Given empty string, should return empty string", function() {
          expect(fn.tail("")).toBe("");
        });

        it("Given one char string, should return empty string", function() {
          expect(fn.tail("a")).toBe("");
        });

        it("Given string, should return all but first char", function() {
          expect(fn.tail("abc")).toBe("bc");
        });

      });
  });

  describe("drop function", function() {
    it("Given null input, should return null", function() {
      expect(fn.drop(null)).toBe(null);
    });

    describe("with list input", function() {
      it("Given empty list, should return empty list", function() {
        expect(fn.drop(1, [])).toEqual([]);
      });

      it("Given one element list, should return empty list", function() {
        expect(fn.drop(1, [1])).toEqual([]);
      });

      it("Given list has less elements than dropped, should return empty list, i.e. drop all", function() {
        expect(fn.drop(3, [1, 2])).toEqual([]);
      });

      it("Given list has equal amount of items than dropped, should return empty list, i.e drop all", function() {
        expect(fn.drop(2, [1, 2])).toEqual([]);
      });

      it("Given zero elements are dropped, should return the list as is", function() {
        expect(fn.drop(0, [1, 2])).toEqual([1, 2]);
      });

      it("Given four element list and two are dropped, should return two remaining", function() {
        expect(fn.drop(2, [1, 2, 3, 4])).toEqual([3, 4]);
      });

    });

    describe("with string input", function() {

      it("Given empty string, should return empty string", function() {
        expect(fn.drop(1, "")).toBe("");
      });

      it("Given single char string, should return empty string", function() {
        expect(fn.drop(1, "h")).toBe("");
      });

      it("Given more chars are dropped than the string length, should return empty string", function() {
        expect(fn.drop(6, "hello")).toBe("");
      });

      it("Given equal amount of chars are dropped than the string length, should return empty string", function() {
        expect(fn.drop(5, "hello")).toBe("");
      });

      it("Given zero chars are dropped, should return string as is", function() {
        expect(fn.drop(0, "hello")).toBe("hello");
      });

      it("Given two chars are dropped, should return remaining", function() {
        expect(fn.drop(2, "hello")).toBe("llo");
      });
    });
  });

  describe("take function", function() {

    it("Given null input, should return null", function() {
      expect(fn.take(null)).toBe(null);
    });

    describe("with list input", function() {
      it("Given empty list, should return empty list", function() {
        expect(fn.take(1, [])).toEqual([]);
      });

      it("Given list with elements and zero is taken, should return empty list", function() {
        expect(fn.take(0, [1, 2, 3])).toEqual([]);
      });

      it("Given all elements are taken, should return whole list", function() {
        expect(fn.take(3, [1, 2, 3])).toEqual([1, 2, 3]);
      });

      it("Given more are taken than elements in list, should return whole list", function() {
        expect(fn.take(4, [1, 2, 3])).toEqual([1, 2, 3]);
      });

      it("Given elements are taken from a list, should return requested", function() {
        expect(fn.take(2, [1, 2, 3])).toEqual([1, 2]);
      });

      it("Given elemensta are taken from list, should keep the original list unmodified", function() {
        var list = [1, 2, 3];
        fn.take(2, list);
        expect(list).toEqual([1, 2, 3]);
      });

    });

    describe("with string input", function() {
      it("Given empty string, should return empty string", function() {
        expect(fn.take(1, "")).toBe("");
      });

      it("Given string and zero is taken, should return empty string", function() {
        expect(fn.take(0, "hello")).toBe("");
      });

      it("Given all elements are taken, should return the whole string", function() {
        expect(fn.take(5, "hello")).toBe("hello");
      });

      it("Given more are taken than elements in string, should return the whole string", function() {
        expect(fn.take(6, "hello")).toBe("hello");
      });

      it("Given elements are taken from string, should return requested", function() {
        expect(fn.take(2, "hello")).toBe("he");
      });

      it("Given elements are taken from string, should keep the original string unmodified", function() {
        var text = "hello";
        fn.take(2, text);
        expect(text).toBe("hello");
      });

    });

  });

  describe("partial", function() {
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

  describe("fold", function() {
    var seed = 7;

    it("Given empty list, should call given function with null arg and return value from that", function() {
      var result = fn.fold(dummies.fortyTwo, seed, []);

      expect(dummies.fortyTwo).toHaveBeenCalledWith(seed, null);
      expect(result).toBe(42);
    });

    it("Given single element list, should call given function with the first element and return value from that", function() {
      var result = fn.fold(dummies.fortyTwo, seed, [1]);

      expect(dummies.fortyTwo).toHaveBeenCalledWith(seed, 1);
      expect(result).toBe(42);
    });

    it("Given function to add values, should calculate the sum of list elements and call given function with all intermediate values", function() {
      var sum = fn.fold(dummies.add, 0, [1, 2, 3, 4, 5]);

      expect(dummies.add.calls.allArgs()).toEqual([
        [0, 1],
        [1, 2],
        [3, 3],
        [6, 4],
        [10, 5]
      ]);
      expect(sum).toBe(15);
    });

    it("Given input list stays unmodified", function() {
      var list = [1, 2, 3];
      fn.fold(dummies.fortyTwo, 0, list);
      expect(list).toEqual([1, 2, 3]);
    });

    it("Works with string also!", function() {
      var strSum = function(a, b) {
        var seed = a || 0;
        return seed + dummies.charToInt(b);
      };

      var result = fn.fold(strSum, "", "hello");
      expect(result).toBe(532);
    });

  });

  describe("all", function() {
    var isPositive = function(value) { return value > 0; };

    it("Given null as input, should return false", function() {
      expect(fn.all(isPositive, null)).toBe(false);
    });

    it("Given empty list inupt, should return false", function() {
      expect(fn.all(isPositive, [])).toBe(false);
    });

    it("Given single element list that does not pass the predicate, should return false", function() {
      expect(fn.all(isPositive, [-1])).toBe(false);
    });

    it("Given single element list that passes te predicate, should return true", function() {
      expect(fn.all(isPositive, [2])).toBe(true);
    });

    it("Given a list where all elements pass the predicate criteria, should return true", function() {
      expect(fn.all(isPositive, [1, 2, 3, 4])).toBe(true);
    });

    it("Given a list where only some elements pass the predicate criteria, should return false", function() {
      expect(fn.all(isPositive, [1, -2, 3, 4])).toBe(false);
      expect(fn.all(isPositive, [-1, -2, 3, 4])).toBe(false);
      expect(fn.all(isPositive, [-1, 2, 3, 4])).toBe(false);
      expect(fn.all(isPositive, [1, 2, 3, -4])).toBe(false);
    });

    it("Given a list where none of the elements pass the predicate criteria, should return false", function() {
      expect(fn.all(isPositive, [-1, -2, -3, -4])).toBe(false);
    });

  });

  describe("any", function() {
    var isEven = function(value) { return value % 2  == 0; };

    it("Given null as input, should return false", function() {
      expect(fn.any(isEven, null)).toBe(false);
    });

    it("Given empty list inupt, should return false", function() {
      expect(fn.any(isEven, [])).toBe(false);
    });

    it("Given single element list that does not pass the predicate, should return false", function() {
      expect(fn.any(isEven, [1])).toBe(false);
    });

    it("Given single element list that passes te predicate, should return true", function() {
      expect(fn.any(isEven, [2])).toBe(true);
    });

    it("Given a list where all elements pass the predicate criteria, should return true", function() {
      expect(fn.any(isEven, [2, 4, 6])).toBe(true);
    });

    it("Given a list where only some elements pass the predicate criteria, should return false", function() {
      expect(fn.any(isEven, [2, 1, 3])).toBe(true);
      expect(fn.any(isEven, [3, 4])).toBe(true);
      expect(fn.any(isEven, [1, 2, 3])).toBe(true);
    });

    it("Given a list where none of the elements pass the predicate criteria, should return false", function() {
      expect(fn.any(isEven, [1, 3, 5, 7])).toBe(false);
    });

  });

  describe("forEach", function() {

    it("Given empty list, should do nothing", function() {
      fn.forEach(dummies.doNothing, []);
      expect(dummies.doNothing).not.toHaveBeenCalled();
    });

    it("Given one element list, should call given function once with the list element", function() {
      fn.forEach(dummies.doNothing, [1]);
      expect(dummies.doNothing.calls.allArgs()).toEqual([
        [1]
      ]);
    });

    it("Given multi-element list, should call given function for each list element", function() {
      fn.forEach(dummies.doNothing, [1, 2, 3]);
      expect(dummies.doNothing.calls.allArgs()).toEqual([
        [1], [2], [3]
      ]);
    });

    it("Given string, should call given function for each char", function() {
      fn.forEach(dummies.doNothing, "hello");
      expect(dummies.doNothing.calls.allArgs()).toEqual([
        ["h"], ["e"], ["l"], ["l"], ["o"]
      ]);
    });

    it("Given list stays unmodified", function() {
      var list = [1, 2, 3];
      fn.forEach(dummies.doNothing, list);
      expect(list).toEqual([1, 2, 3]);
    });

  });

  describe("map", function() {
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

  describe("pipe", function() {

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
});
