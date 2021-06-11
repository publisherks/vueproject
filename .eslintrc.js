module.exports = {
    root: true,
    extends: [
        'plugin:vue/essential'
    ],
    parserOptions: {
        parser: 'babel-eslint',
    },
    plugins: [
        'vue'
    ],
    env: {
        browser: true
    },
    rules: {
        "no-unused-vars" : "off",
        "vue/no-multiple-template-root" : "off",
    }
}