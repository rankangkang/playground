const config = require('./greet-words.js')

const greet = (type) => {
  type = type || 'hello'
  console.log(config[type])
}

module.exports = greet
