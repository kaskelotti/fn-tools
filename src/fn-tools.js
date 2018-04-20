var fn = (function(fn) {
  'use strict';

  var utils = {
    createPredicate: function(criteria) {
      var type = typeof criteria;

      // NOTE: typeof null == 'object'
      if(criteria === null) {
        return function(value) {
          return value === null;
        };
      }

      if(type === "function") {
        return criteria;
      }

      if(type === "string" || type === "number" || type === "boolean") {
        return function(value) {
          return value === criteria;
        };
      }

      throw new TypeError("Sorry, only supports basic type, null or function criteria :(");
    }
  };

  fn.head = function(list) {
    if(!list || list.length === 0) {
      return null;
    }
    return list[0];
  };

  fn.tail = function(list) {
    if(!list && !(typeof list === "string")) {
      return null;
    }

    if(list.length <= 1) {
      if(typeof list === "string") {
        return "";
      }
      return [];
    }
    return list.slice(1);
  };

  fn.drop = function(n, list) {
    if(!list) {
      if(typeof list === "string") {
        return "";
      }
      return null;
    }

    if(list.length <= n) {
      if(typeof list === "string") {
        return "";
      }
      return [];
    }
    else {
      return list.slice(n);
    }
  };

  fn.take = function(n, list) {
    var copy;

    if(!list && !(typeof list === "string")) {
      return null;
    }

    if(n >= list.length) {
      return list;
    }
    else {
      if(typeof list === "string") {
        return list.substring(0, n);
      }
      else {
          copy = list.slice();
          copy.splice(n);
          return copy;
      }
    }
  };

  fn.partial = function(f /* arguments */) {
    var args = fn.tail(Array.prototype.slice.call(arguments));

    return function() {
      var _args = Array.prototype.slice.call(arguments);
      return f.apply(null, args.concat(_args));
    };
  };

  fn.fold = function(f, seed, list) {
    if(list.length <= 1) {
      return f(seed, fn.head(list));
    }
    else {
      return fn.fold(
                  f,
                  f(seed, fn.head(list)),
                  fn.tail(list));
      }
  };

  fn.all = function(predicate, list) {
    // fold expects a function with two arguments,
    // thus wrapping the given predicate in order to use the seed
    var wrapper = function(seed, value) {
      return seed && predicate(value);
    };

    if(!list || list.length === 0) {
      return false;
    }
    else {
      return fn.fold(wrapper, true, list);
    }
  };

  fn.any = function(predicate, list) {
    // fold expects a function with two arguments,
    // thus wrapping the given predicate in order to use the seed
    var wrapper = function(seed, value) {
      return seed || predicate(value);
    };

    if(!list || list.length === 0) {
      return false;
    }
    else {
      return fn.fold(wrapper, false, list);
    }
  };

  fn.forEach = function(f, list) {
    if(list.length === 0) {
      return;
    }

    if(list.length === 1) {
      f(fn.head(list));
    }
    else {
      f(fn.head(list));
      fn.forEach(f, fn.tail(list));
    }
  };

  fn.contains = function(criteria, list) {
    var predicate = utils.createPredicate(criteria);
    return fn.any(predicate, list);
  };

  fn.filter = function(criteria, list) {
    var predicate = utils.createPredicate(criteria);
    var _filter = function(list, filtered) {
      var head = fn.head(list);

      if(list.length === 1) {
        return predicate(head) ? filtered.concat(head) : filtered;
      }
      else {
        return _filter(
                      fn.tail(list),
                      predicate(head) ? filtered.concat(head) : filtered);
      }
    };

    if(!list) {
      return null;
    }

    if(list.length === 0) {
      return [];
    }

    return _filter(list,[]);
  };

  fn.map = function(f, list) {
    var _map = function(f, list, mod) {
      if(list.length === 1) {
        mod.push(f(fn.head(list)));
        return mod;
      }
      else {
        mod.push(f(fn.head(list)));
        return _map(f, fn.tail(list), mod);
      }
    };

    if(list.length === 0) {
      return [];
    }
    else {
      return _map(f, list, []);
    }
  };

  fn.pipe = function(value /* functions */) {
    var _pipe = function(value, fns) {
      var f = fn.head(fns);

      if(fns.length === 1) {
        return f(value);
      }
      else {
        return _pipe(
                    f(value),
                    fn.tail(fns));
      }
    };

    var args = fn.tail(Array.prototype.slice.call(arguments));
    if(!args || args.length === 0) {
      return value;
    }
    else {
      return _pipe(value, args);
    }
  };

  return fn;
}(fn || {}));

module.exports = fn;
