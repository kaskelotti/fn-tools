[![Build Status](https://travis-ci.org/kaskelotti/fn-tools.svg?branch=master)](https://travis-ci.org/kaskelotti/fn-tools)

# fn-tools

Bunch of functional programming concepts in a module. Written on purpose of learning
how functional programming concepts are built. Not optimized in anyway.

For production use, there are better alternatives such as

- native list functions (map, reduce, etc)
- a real functional lib like underscore, lodash, ramda, etc

## Notes

- Using String#substring would be faster than String#slice, but here readability matters more
- any / all go through the whole list even that it could return as soon as the matching criteria is filled

## Feature Ideas

- trampoline
- filter
- contains
- zip / unzip
- Maybe / Option
