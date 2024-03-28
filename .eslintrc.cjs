module.exports = {
  extends: ['@cmkk/eslint-config-lib'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
}
