"use strict";

/**
 * @param {Property} prop ObjectExpression property.
 *
 * @returns {String} Property key as a string.
 */
function getKey(prop) {
    if (prop.key.type === "Literal") {
        return prop.key.value.toString();
    }
    return prop.key.name.toString();
}

module.exports = {
    create: function(context) {
        var opts = context.options[0] || {};
        return {
            ObjectExpression: function(node) {
                node.properties.reduce(function(prev, current) {
                    if (opts.ignoreMethods && current.value.type === "FunctionExpression") {
                        return current;
                    }
                    if (current.type === "ExperimentalSpreadProperty") {
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

                    if (currentKey < prevKey) {
                        context.report(current, "Property names in an object literal should be sorted alphabetically");
                    }
                    return current;
                }, node.properties[0]);
            }
        };
    }
};
