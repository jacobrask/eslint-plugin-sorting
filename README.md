## Install

`npm install --save-dev eslint eslint-plugin-sorting`

In the plugins section of your `.eslintrc`, add `sorting`.

```json
{
  "plugins": [
    "sorting"
  ],
  "rules": {
    "sorting/sort-object-props": [ 1, {
      "ignoreCase": true,
      "ignoreMethods": false,
      "ignoreMethodSiblings": false
    } ]
  }
}
```

## Rule Details

By default all rules are case insensitive and methods (functions as values) are not ignored.


Warnings:

```js
var obj = {
  c: "foo",
  a: "bar",
  b: {
    e: 1,
    d: 2,
  },
  A: 5
};
```

OK:

```js
var obj = {
  A: 5,
  a: "bar",
  b: {
    d: 2,
    e: 1,
  },
  c: "foo",
};
```

OK if `ignoreMethods: true`

```js
var Foo = {
  b: function() {},
  a: function() {}
};
```

OK if `ignoreMethodSiblings: true`

```js
var Foo = {
  c: 1,
  b: 2,
  a: function() {}
};
```
