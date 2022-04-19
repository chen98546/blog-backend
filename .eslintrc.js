module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-unused-vars": 1,
        "no-constant-condition": 'error',
        "no-empty": 2,
        "no-multi-spaces": ["warn", {
            ignoreEOLComments: false
        }]
    }
}