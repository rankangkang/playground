/* eslint-disable */

'use strict'

// console.log(A) // 严格模式下会报错
// A() // 这里调用会报错

{
  console.log(A) // [Function: A]
  A() // 打印 a
  function A() {
    console.log('a')
  }
}

// A() // 严格模式下也会报错
