var fn = (function(fn) {
  'use strict';

  const utils = {
    isString: (input) => typeof input === "string",
    createPredicate: (criteria) => {
      const type = typeof criteria;

      // NOTE: typeof null == 'object'
      if(criteria === null) {
        return (value) => value === null;
      }

      if(type === "function") {
        return criteria;
      }

      if(type === "string" || type === "number" || type === "boolean") {
        return (value) => value === criteria;
      }

      throw new TypeError("Sorry, only supports basic type, null or function criteria :(");
    }
  };

  fn.head = (list) => !list || list.length === 0 ?
    null :
    list[0];

  fn.tail = (collection) => {
    const _stringTail = (str) => {
      if(str === null) {
        return null;
      }

      return str.length <= 1 ?
        "" :
        str.slice(1);
    };
    const _tail = (list) => {
      if(!list) {
        return null;
      }

      return list.length <= 1 ?
        [] :
        list.slice(1);
    };

    return utils.isString(collection) ?
      _stringTail(collection) :
      _tail(collection);
  };

  fn.drop = (n, collection) => {
    const _stringDrop = (str) => {
      if(!str) {
        return "";
      }

      return str.length < n ?
        "" :
        str.slice(n);
    };
    const _drop = (list) => {
      if(!list) {
        return null;
      }

      return list.length <= n ? [] : list.slice(n);
    };

    return utils.isString(collection) ?
      _stringDrop(collection) :
      _drop(collection);
  };

  fn.take = (n, collection) => {
    const _stringTake = (str) => str.substring(0, n);
    const _take = (list) => {
      const _copyAndTake = (list) => {
        const copy = list.slice();
        copy.splice(n);
        return copy;
      };

      if(!list) {
        return null;
      }

      return n >= list.length ?
        list :
        _copyAndTake(list);
    };

    return utils.isString(collection) ?
      _stringTake(collection) :
      _take(collection);
  };

  fn.partial = (f, ...partialArgs) => (...args) => {
    const emptyCtx = Object.create(null);
    return f.apply(emptyCtx, partialArgs.concat(args));
  };

  fn.fold = (f, seed, list) => {
    if(!list || list.length === 0) {
      return null;
    }
    else if(list.length === 1) {
      return f(seed, fn.head(list));
    }
    else {
      return fn.fold(
                  f,
                  f(seed, fn.head(list)),
                  fn.tail(list));
      }
  };

  fn.all = (predicate, list) => {
    // fold expects a function with two arguments,
    // thus wrapping the given predicate in order to use the seed
    const _wrapper = (seed, value) => seed && predicate(value);

    return !list || list.length === 0 ?
      false :
      fn.fold(_wrapper, true, list);
  };

  fn.any = (predicate, list) => {
    // fold expects a function with two arguments,
    // thus wrapping the given predicate in order to use the seed
    const _wrapper = (seed, value) => seed || predicate(value);

    return !list || list.length === 0 ?
      false :
      fn.fold(_wrapper, false, list);
  };

  fn.forEach = (f, list) => {
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

  fn.contains = (criteria, list) => {
    const predicate = utils.createPredicate(criteria);
    return fn.any(predicate, list);
  };

  fn.filter = (criteria, list) => {
    const predicate = utils.createPredicate(criteria);
    const _filter = (list, filtered) => {
      const _performFiltering = (head) => predicate(head) ?
        [...filtered, head] :
        filtered;

      const head = fn.head(list);

      return list.length === 1 ?
        _performFiltering(head) :
        _filter(
                fn.tail(list),
                _performFiltering(head));
      };

    if(!list) {
      return null;
    }

    if(list.length === 0) {
      return [];
    }

    return _filter(list, []);
  };

  fn.map = (f, list) => {
    const _map = (f, list, mod) => {
      const mapped = [...mod, f(fn.head(list))];

      return list.length === 1 ?
        mapped :
        _map(f, fn.tail(list), mapped);
    };

    return list.length === 0 ?
      [] :
      _map(f, list, []);
  };

  fn.identity = value => value;

  fn.pipe = (...fns) => {
    if(!fns || fns.length === 0) {
      return fn.identity;
    }

    return fn.fold(
      (a, b) => value => b(a(value)),
      fn.identity,
      fns
    );
  };

  return fn;
}(fn || {}));

module.exports = fn;
