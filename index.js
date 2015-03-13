"use strict";

module.exports = {
    rules: {
        "sort-object-props": function(context) {
            var ignoreCase = context.options[0].ignoreCase;
            var ignoreMethods = context.options[0].ignoreMethods;
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
                        if (ignoreCase) {
                            if (propId == null)
                              console.log(prop);
                            lastPropId = lastPropId.toLowerCase();
                            propId = propId.toLowerCase();
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
        "sort-object-props": [ 1, { ignoreCase: true, ignoreMethods: false } ]
    }
};
