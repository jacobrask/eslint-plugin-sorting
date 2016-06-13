"use strict";

module.exports = {
    create: function(context) {
        return {
            ObjectExpression: function(node) {
                node.properties.reduce(function(prev, current) {
                    if (!prev.shorthand && current.shorthand) {
                        context.report(current, "Shorthand properties should be grouped at the beginning of an object declaration");
                    }
                    return current;
                }, node.properties[0]);
            }
        };
    }
};
