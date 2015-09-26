"use strict";

module.exports = {
    rules: {
        "sort-object-props": function(context) {
            var caseSensitive = context.options[0].caseSensitive;
            var ignoreMethods = context.options[0].ignoreMethods;
            var ignorePrivate = context.options[0].ignorePrivate;

            var MSG = "Property names in object literals should be sorted";
            return {
                "ObjectExpression": function(node) {
                    node.properties.reduce(function(lastProp, prop) {
                        if (ignoreMethods &&
                                prop.value.type === "FunctionExpression") {
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
                        if (caseSensitive) {
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
    },
    rulesConfig: {
        "sort-object-props": [ 1, { caseSensitive: false, ignoreMethods: false } ]
    }
};
