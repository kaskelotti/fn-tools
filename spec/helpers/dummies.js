const dummies = (() => {
  'use strict';

  return {
    doNothing: () => {},
    fortyTwo: () => 42,
    add: (a, b) => a + b,
    charToInt: (str) => str.charCodeAt(0),
    increment: (a) => a + 1
  };
})();

beforeEach(() => {
  'use strict';

  spyOn(dummies, "doNothing").and.callThrough();
  spyOn(dummies, "fortyTwo").and.callThrough();
  spyOn(dummies, "add").and.callThrough();
  spyOn(dummies, "charToInt").and.callThrough();
  spyOn(dummies, "increment").and.callThrough();
});

module.exports = dummies;
