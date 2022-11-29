module.exports = {
    babelrcRoots: [
        // Keep the root as a root
        ".",

        "./node_modules/*"

    ],
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": {
                    "version": 3
                },
                "targets": {
                    "chrome": "60",
                    "firefox": "60",
                    "ie": "9",
                    "safari": "10",
                    "edge": "17"
                }
            }
        ]
    ]
}
