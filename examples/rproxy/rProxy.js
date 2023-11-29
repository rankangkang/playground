/* eslint-disable no-unused-expressions */

/**
 * 深度优先递归proxy对象
 * @param {*} target
 * @param {ProxyHandler} handler
 * @returns
 */
function rProxy(target, handler) {
  if (isObject(target)) {
    proxySubProp(target)
    // 返回 proxy 对象
    // 深度优先 proxy 对象
    console.log('proxy', target)
    return new Proxy(target, handler)
  }

  // 只能处理 object 类型的数据
  return target

  function proxySubProp(target) {
    for (let p in target) {
      target[p] = rProxy(target[p], handler)
    }
  }

  function isObject(target) {
    return typeof target === 'object' && target !== null
  }
}

let object = {
  name: {
    first: {
      four: 5,
      second: {
        third: 'ssss',
      },
    },
  },
  class: 5,
  arr: [1, 2, { arr1: 10 }],
  age: {
    age1: 10,
  },
}

let array = [{ name: { first: 'ss' }, arr1: [1, 2] }, 2, 3, 4, 5, 6]

// 这是proxy的handler
let handler = {
  get(target, property) {
    console.log('get:' + property)
    return Reflect.get(target, property)
  },
  set(target, property, value) {
    console.log('set:' + property + '=' + value)
    return Reflect.set(target, property, value)
  },
}

object = rProxy(object, handler)
array = rProxy(array, handler)

console.time('rProxy')
array.length
array[3]
array[2] = 10
array[0].name.first = 'ss'
array[0].arr1[0]
object.name.first.second.third = 'yyyyy'
object.class = 6
object.name.first.four
object.arr[2].arr1
object.age.age1 = 20
console.timeEnd('rProxy')
