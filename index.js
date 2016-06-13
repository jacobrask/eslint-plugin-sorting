"use strict";

module.exports = {
    rules: {
        "group-shorthands": require("./lib/rules/group-shorthands"),
        "sort-object-props": require("./lib/rules/sort-object-props")
    },
    configs: {
        recommended: {
            rules: {
                "group-shorthands": [0]
                "sort-object-props": [1, { ignoreCase: true, ignoreMethods: false }]
            }
        }
    }
};
