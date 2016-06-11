"use strict";

var rule = require("../../../lib/rules/sort-object-props");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
var expectedError = {
    message: "Property names in object literals should be sorted",
    type: "Property"
};

ruleTester.run("sort-object-props", rule, {
    valid: [
        "var obj = { a: 1, b: 2, c: 3 }"
    ],
    invalid: [
        { code: "var obj = { b: 2, a: 1, c: 3 }", errors: [ expectedError ] }
    ]
});
