In the plugins section of your `.eslintrc`, add `sorting`.

    {
      "plugins": [
        "sorting"
      ],
      "rules": {
        "sorting/sort-object-props": [ 1, { ignoreCase: true, ignoreMethods: false } ]
      }
    }

By default all rules are case insensitive and methods (functions as values) are not ignored.


Warnings:

    var obj = {
      c: "foo",
      a: "bar",
      b: {
        e: 1,
        d: 2,
      },
      A: 5
    };


OK:

    var obj = {
      A: 5,
      a: "bar",
      b: {
        d: 2,
        e: 1,
      },
      c: "foo",
    };


OK if `ignoreMethods: true`

    var Foo = {
      b: function() {},
      a: function() {}
    };
