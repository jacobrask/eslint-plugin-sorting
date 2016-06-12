"use strict";

function getKey(prop) {
  if (prop.key.type === "Literal") {
    return prop.key.value.toString();
  }
  return prop.key.name.toString();
}

module.exports = {
    create: function(context) {
        var opts = context.options[0] || {};
        var caseSensitive = opts.caseSensitive;
        var ignoreMethods = opts.ignoreMethods;
        var ignorePrivate = opts.ignorePrivate;
        var message = "Property names in an object literal should be sorted alphabetically";
        return {
            ObjectExpression: function(node) {
                node.properties.reduce(function(prev, current) {
                    if (ignoreMethods && current.value.type === "FunctionExpression") {
                        return current;
                    }
                    if (current.type === "ExperimentalSpreadProperty") {
                        return current;
                    }

                    var lastKey = getKey(prev);
                    var currentKey = getKey(current);
                    if (caseSensitive && lastKey) {
                        lastKey = lastKey.toLowerCase();
                        currentKey = currentKey.toLowerCase();
                    }

                    if (ignorePrivate && /^_/.test(currentKey)) {
                        return current;
                    }

                    if (currentKey < lastKey) {
                        context.report(current, message);
                    } else {
                        console.log(currentKey, lastKey);
                    }
                    return current;
                }, node.properties[0]);
            }
        };
    }
};
