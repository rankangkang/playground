/* eslint-disable */
const c = require('./count')
const v = require('./value')

console.log('step 0:', v, v.value, v.getValue()) // { value: 1, getValue: [Function: getValue], inc: [Function: inc] } 1 1
v.inc()
console.log('step 1:', v, v.value, v.getValue()) // { value: 2, getValue: [Function: getValue], inc: [Function: inc] } 2 2

console.log('step 1:', c) // 0
c++ // TypeError: Assignment to constant variable.
console.log('step 2:', c)
