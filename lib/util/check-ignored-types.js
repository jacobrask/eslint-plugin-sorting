"use strict";

var ignoredTypes = [{
    nodeType: "node",
    type: "ExperimentalSpreadProperty"
}, {
    nodeType: "key",
    type: "CallExpression"
}, {
    nodeType: "key",
    type: "ConditionalExpression"
}, {
    nodeType: "value",
    type: "FunctionExpression",
    flag: "ignoreMethods"
}];

/**
 * Checks node whether a certain type should be ignored or not.
 * @param {Node} curr: Current node.
 * @param {Node} prev: Previous node.
 * @param {object} flags: Only ignores a type if its corresponding {flag:xxx} property found in this `flags` object
 * @returns {Boolean} true/false value
 */
module.exports = function checkIgnoredType(curr, prev, flags) {
    for (var i = 0, length = ignoredTypes.length; i < length; i++) {
        var ignoredType = ignoredTypes[i];
        var type = ignoredType.type;
        var flag = ignoredType.flag;

        if (flags && flag && !flags[flag]) {
            continue;
        }

        var node = {};
        if (ignoredType.nodeType === "node") {
            node.curr = curr;
            node.prev = prev;
        } else if (ignoredType.nodeType === "key") {
            node.curr = curr.key;
            node.prev = prev.key;
        } else if (ignoredType.nodeType === "value") {
            node.curr = curr.value;
            node.prev = prev.value;
        } else {
            continue;
        }

        if (type === node.curr.type) {
            return true;
        }
        if (type === node.prev.type) {
            return true;
        }
    }
    return false;
};
