module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    env: {
        browser: true
    },
    rules: {
        "no-unused-vars" : "off",
        "vue/no-multiple-template-root" : "off",
    }
}