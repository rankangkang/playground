/* eslint-disable */
// a 存在于全局作用域，不存在暂时性死区，可在声明前使用，但值为 undefined
console.log(a) // undefined

{
  var a = 1
}

console.log(a) // 1

;(function () {
  {
    var b = 2
  }
  console.log(b) // 2
})()

console.log(b) // Uncaught ReferenceError: b is not defined
