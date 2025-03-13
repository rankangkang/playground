const options = require('./easy-webpack.config')
const Compiler = require('./lib/Compiler')

const compiler = new Compiler(options)
compiler.run()
