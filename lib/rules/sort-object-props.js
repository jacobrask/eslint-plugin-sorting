"use strict";

var checkIgnoredTypes = require("../util/check-ignored-types");

/**
 * Recursively converts Nodes to strings so they can be sorted
 * @param {Node} node: Babel AST Node
 * @returns {String} Node value as a string
 */
function nodeToString(node) {
    switch (node.type) {
        case ("BinaryExpression"): {
            return nodeToString(node.left) + node.operator.toString() + nodeToString(node.right);
        }
        case ("CallExpression"): {
            var args = node.arguments.map(function(arg) {
                return nodeToString(arg);
            }).toString();
            return nodeToString(node.callee) + "(" + args + ")";
        }
        case ("ConditionalExpression"): {
            return nodeToString(node.test) + "?" + nodeToString(node.consequent) + ":" + nodeToString(node.alternate);
        }
        case ("Identifier"): {
            return node.name.toString();
        }
        case ("Literal"): {
            return node.value.toString();
        }
        case ("MemberExpression"): {
            return nodeToString(node.object) + "[" + nodeToString(node.property) + "]";
        }
        case ("TemplateElement"): {
            return node.value.raw.toString();
        }
        case ("TemplateLiteral"): {
            // interleave quasis with expressions
            var s = [];
            node.quasis.forEach(function(quasi, i) {
                if (quasi.value.raw) {
                    s.push(nodeToString(quasi));
                }
                var expression = node.expressions[i];
                if (expression) {
                    s.push(nodeToString(expression));
                }
            });
            return s.join("");
        }
        default: {
            // Silently ignore Nodes with types we don't handle
            return "";
        }
    }
}

/**
 * @param {Property} prop: ObjectExpression property.
 * @returns {String} Property key as a string.
 */
function getKey(prop) {
    return nodeToString(prop.key);
}

function isLesserThan(firstKey, secondKey) {
    if (firstKey === 'type') {
        return secondKey !== 'type';
    }
    if (secondKey === 'type') {
        return false;
    }
    return firstKey < secondKey;
}

module.exports = {
    create: function(context) {
        var opts = context.options[0] || {};
        return {
            ObjectExpression: function(node) {
                node.properties.reduce(function(prev, current) {
                    if (checkIgnoredTypes(current, prev, opts)) {
                        return current;
                    }

                    var prevKey = getKey(prev);
                    var currentKey = getKey(current);

                    if (opts.ignoreCase && prev) {
                        prevKey = prevKey.toLowerCase();
                        currentKey = currentKey.toLowerCase();
                    }

                    if (opts.ignorePrivate && /^_/.test(currentKey)) {
                        return current;
                    }

                    if (isLesserThan(currentKey, prevKey)) {
                        context.report(current, "Property names in an object literal should be sorted alphabetically");
                    }
                    return current;
                }, node.properties[0]);
            }
        };
    }
};
