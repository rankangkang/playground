// node --harmony argv.js --version --test="a" -h -a name
console.log(process.argv)
/**
[
  '/Users/cmkk/.nvm/versions/node/v18.20.6/bin/node',
  '/Volumes/kksn770/dev/cmkk/playground/snippets/nodejs/argv.js',
  '--version',
  '--test=a',
  '-h',
  '-a',
  'name'
]
 */

console.log(process.execArgv) // [ '--harmony' ]
console.log(process.argv0) // node
