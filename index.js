"use strict";

module.exports = {
    rules: {
        "sort-object-props": require("./lib/rules/sort-object-props")
    },
    configs: {
        recommended: {
            rules: {
                "sort-object-props": [1, { ignoreCase: true, ignoreMethods: false }]
            }
        }
    }
};
