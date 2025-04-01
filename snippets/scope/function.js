/* eslint-disable */

console.log(A) // undefined
// A() // 这里调用会报错

{
  console.log(A) // [Function: A]
  A() // 打印 a
  function A() {
    console.log('a')
  }
}

A() // 打印 a

// 非严格模式下，块级函数声明会冲破块级作用域，被隐式提升到外层变量环境，初始值为 undefined，执行后赋值，相当于 var
