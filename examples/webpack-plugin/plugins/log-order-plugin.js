module.exports = class LogOrderPlugin {
  constructor(name) {
    this.name = name
  }

  /** @param {import('webpack').Compiler} compiler */
  apply(compiler) {
    compiler.hooks.compilation.tap(this.name, () => {
      console.log(`[${this.name}] compilation hook triggered`);
    })
  }
}