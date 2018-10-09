const dummies = (() => {
  'use strict';

  return {
    doNothing: function() {},
    fortyTwo: function() { return 42; },
    add: function(a, b) { return a + b; },
    charToInt: function(str) { return str.charCodeAt(0); },
    increment: function(a) { return a + 1; }
  };
})();

beforeEach(function() {
  'use strict';

  spyOn(dummies, "doNothing").and.callThrough();
  spyOn(dummies, "fortyTwo").and.callThrough();
  spyOn(dummies, "add").and.callThrough();
  spyOn(dummies, "charToInt").and.callThrough();
  spyOn(dummies, "increment").and.callThrough();
});

module.exports = dummies;
