"use strict";

module.exports = {
    create: function(context) {
        var opts = context.options[0] || {};
        var caseSensitive = opts.caseSensitive;
        var ignoreMethods = opts.ignoreMethods;
        var ignorePrivate = opts.ignorePrivate;

        var MSG = "Property names in object literals should be sorted";
        return {
            ObjectExpression: function(node) {
                node.properties.reduce(function(lastProp, prop) {
                    if (ignoreMethods && prop.value.type === "FunctionExpression") {
                        return prop;
                    }
                    if (prop.type === "ExperimentalSpreadProperty") {
                        return prop;
                    }

                    var lastPropId, propId;
                    if (prop.key.type === "Identifier") {
                        lastPropId = lastProp.key.name;
                        propId = prop.key.name;
                    } else if (prop.key.type === "Literal") {
                        lastPropId = lastProp.key.value;
                        propId = prop.key.value;
                    }
                    if (caseSensitive && lastPropId) {
                        lastPropId = lastPropId.toLowerCase();
                        propId = propId.toLowerCase();
                    }

                    if (ignorePrivate && /^_/.test(propId)) {
                        return prop;
                    }

                    if (propId < lastPropId) {
                        context.report(prop, MSG);
                    }
                    return prop;
                }, node.properties[0]);
            }
        };
    }
};
