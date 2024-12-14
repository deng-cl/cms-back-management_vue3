/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended', // eslint + prettier <相互适配>
        '@vue/eslint-config-typescript',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        "vue/multi-word-component-names": "off",
        "vue/valid-template-root": "off",
        "tvue/no-mutating-props": 'off'

    }
}
