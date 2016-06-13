"use strict";

var rule = require("../../../lib/rules/group-shorthands");
var ruleTester = new (require("eslint").RuleTester)();

var expectedError = {
    message: "Shorthand properties should be grouped at the beginning of an object declaration",
    type: "Property"
};

ruleTester.run("group-shorthands", rule, {
    valid: [
        { code: "var a = 1; var obj = { a }", parserOptions: { ecmaVersion: 6 } },
        { code: "var a = 1; var obj = { a, b: 2 }", parserOptions: { ecmaVersion: 6 } },
        { code: "var a = 1; var obj = { a, b: 2 }", parserOptions: { ecmaVersion: 6 } },
        { code: "var a = 1, b = 2; var obj = { a, b, c: 3 }", parserOptions: { ecmaVersion: 6 } }
    ],
    invalid: [
        { code: "var a = 1; var obj = { b: 2, a }", parserOptions: { ecmaVersion: 6 }, errors: [ expectedError ] },
        { code: "var a = 1, c = 3; var obj = { a, b: 2, c }", parserOptions: { ecmaVersion: 6 }, errors: [ expectedError ] }
    ]
});
