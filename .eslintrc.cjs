module.exports = {
  extends: ['@cmkk/eslint-config'],
  env: {
    node: true,
    es2021: true,
  },
  rules: {
    '@typescript-eslint/no-this-alias': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-empty-pattern': 'off',
    '@typescript-eslint/ban-types': 'off',
  },
}
