"use strict";

module.exports = {
    rules: {
        "sort-object-props": function(context) {
            var ignoreCase = context.options[0].ignoreCase;
            var MSG = "Property names in object literals should be sorted";
            return {
                "ObjectExpression": function(node) {
                    node.properties.reduce(function(lastProp, prop) {
                        var lastPropName = lastProp.key.name;
                        var propName = prop.key.name;
                        if (ignoreCase) {
                            lastPropName = lastPropName.toLowerCase();
                            propName = propName.toLowerCase();
                        }
                        if (propName < lastPropName) {
                            context.report(prop, MSG);
                        }
                        return prop;
                    }, node.properties[0]);
                }
            };
        }
    },
    rulesConfig: {
        "sort-object-props": [ 1, "ignoreCase" ]
    }
};
