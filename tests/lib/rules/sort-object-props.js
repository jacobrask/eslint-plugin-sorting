"use strict";

var rule = require("../../../lib/rules/sort-object-props");
var RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
var expectedError = {
    message: "Property names in an object literal should be sorted alphabetically",
    type: "Property"
};

/**
 * Wraps a block of code and that needs to be tested with babel-eslint
 * @param {String} code: Code to be tested
 * @param {Object} options: Options to test with
 * @returns {object} Object that will be tested
 */
function transpile(code, options) {
    return {
        code: code,
        options: options,
        parser: "babel-eslint",
        rules: {strict: 0}
    };
}

/**
 * Wraps a block of code and that that should error
 * @param {String} code: Code to be tested
 * @returns {object} Object that will be tested
 */
function expectError(code) {
    return {
        code: code,
        errors: [ expectedError ]
    };
}

/**
 * Wraps a block of code that needs to be tested with babel-eslint and will error
 * @param {String} code: Code to be tested
 * @returns {object} Object that will be tested
 */
function transpileExpectError(code) {
    return {
        code: code,
        errors: [ expectedError ],
        parser: "babel-eslint",
        rules: {strict: 0}
    };
}


ruleTester.run("sort-object-props", rule, {
    valid: [
        "var obj = { a: true, apple: true }",
        "var obj = { a: true, b: true, c: false }",
        "var obj = { 'a': true, b: true, 'c': false }",
        "var obj = { a: true, b: true }",
        "var obj = { 1: 'foo', a: 'bar', c: false }",
        "var obj = { '1': 'foo', a: 'bar', c: false }",
        "var obj = { A: 'eggs', a: 'spam' }",
        "var obj = { false: 'eggs', true: 'spam' }",
        transpile("var template = { [`${a}-key`]: 'foo', 'b-key': 'bar' }"),
        transpile("var templateWithBinaryExpression = { [`${a + b}-value`]: false, 'b+a': true }"),
        transpile("var spread = { a:'a' }; var b = {a:1, ...a, b:2}"),
        transpile("var functionCall = { [a()]: 'a', [b()]: 'b' }"),
        transpile("var functionCallWithArg = { [a('apple')]: 'a', [a('banana')]: 'b' }"),
        transpile("var functionCallWithArgs = { [a('apple','banana')]: 'a', [a('apple','orange')]: 'b' }"),
        transpile("var conditional = { [a?b:c]: d }"),
        transpile("var conditional = { [a ? b : c]: d }"),
        transpile("var conditional = { [(a !== b)?b:c]: d, [(a === b)?b:c]: d,  }"),
        transpile("var member = {[a.b]: c}"),
        transpile("var nestedMember = {[a[b][c]]: d, [b[a][c]]: d}"),
        transpile("var binaryExpression = { [a + b]: c}"),
        transpile("var withMethods = { b: function() {}, a: function() {} }", [ { ignoreMethods: true } ]),
        transpile("var withMethodSiblings = { c: 1, b: 2, a: function() {} }", [ { ignoreMethodSiblings: true } ]),
        transpile("var withMethodSiblings = { c: 1, b: 2, ...a, a: () => {} }", [ { ignoreMethodSiblings: true } ]),
        transpile("var withMethodSiblings = { c: 1, b: 2, a() {} }", [ { ignoreMethodSiblings: true } ])
    ],
    invalid: [
        expectError("var obj = { b: 'spam', a: 'eggs', c: 'foo' }"),
        expectError("var obj = { 'a': 'foo', '1': 'spam' }"),
        expectError("var obj = { a: 'foo', 1: 'spam' }"),
        expectError("var obj = { z: 'foo', a: 'spam' }"),
        expectError("var obj = { a: true, A: false }"),
        expectError("var withMethods = { b: function() {}, a: function() {} }"),
        expectError("var withMethodSiblings = { b: 2, a: function() {} }"),
        transpileExpectError("var functionCallWithArg = { [a('banana')]: 'a', [a('apple')]: 'b' }"),
        transpileExpectError("var functionCallWithArgs = { [a('apple','orange')]: 'a', [a('apple','banana')]: 'b' }"),
        transpileExpectError("var conditional = { [c?b:a]: d, [a?b:c]: d }"),
        transpileExpectError("var nestedMember = {[b[a][c]]: d, [a[b][c]]: d}"),
        transpileExpectError("var binaryExpression = { apple: true, [a + b]: c}")
    ]
});
