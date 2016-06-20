"use strict";

var rule = require("../../../lib/rules/sort-object-props");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
var expectedError = {
    message: "Property names in an object literal should be sorted alphabetically",
    type: "Property"
};


ruleTester.run("sort-object-props", rule, {
    valid: [
        "var obj = { a: true, b: true, c: false }",
        "var obj = { 'a': true, b: true, 'c': false }",
        "var obj = { a: true, b: true }",
        "var obj = { 1: 'foo', a: 'bar', c: false }",
        "var obj = { '1': 'foo', a: 'bar', c: false }",
        "var obj = { A: 'eggs', a: 'spam' }",
        { code: "var a = { a:'a' }; var b = {a:1, ...a, b:2}", "parser": "babel-eslint", rules: {strict: 0} },
        { code: "var a = { [a()]: 'a' }", "parser": "babel-eslint", rules: {strict: 0} }
    ],
    invalid: [
        { code: "var obj = { b: 'spam', a: 'eggs', c: 'foo' }", errors: [ expectedError ] },
        { code: "var obj = { 'a': 'foo', '1': 'spam' }", errors: [ expectedError ] },
        { code: "var obj = { a: 'foo', 1: 'spam' }", errors: [ expectedError ] },
        { code: "var obj = { z: 'foo', a: 'spam' }", errors: [ expectedError ] },
        { code: "var obj = { a: true, A: false }", errors: [ expectedError ] }
    ]
});
