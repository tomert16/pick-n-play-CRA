module.exports = function (api) {
    api.cache(true);

    const presets = ["@babel/preset-env"];
    const plugins = [
        "@babel/plugin-transform-private-methods",
        "@babel/plugin-transform-numeric-separator",
        "@babel/plugin-transform-class-properties",
        "@babel/plugin-transform-nullish-coalescing-operator",
        "@babel/plugin-transform-optional-chaining",
        "@babel/plugin-transform-private-property-in-object",
        "@babel/plugin-transform-object-rest-spread"
    ]

    return {
        presets,
        plugins
    };
};