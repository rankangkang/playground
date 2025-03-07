module.exports = {
  ...require('@cmkk/prettier-config'),
  plugins: [
    require.resolve('prettier-plugin-packagejson')
  ]
}
