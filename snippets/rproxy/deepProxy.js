/* eslint-disable no-unused-expressions */
// TODO: 是对象则 proxy，proxy 后，对其子节点做 proxy
// TODO: 先对子做 proxy，再对 父做 proxy

/**
 * 递归 proxy 对象
 * @typedef {ProxyHandler} MyProxyHandler
 * @param {Object} target
 * @param {MyProxyHandler} handler
 * @returns
 */
function deepProxy(target, handler) {
  if (!isShallowObject(target)) {
    proxySubProp(target, handler)
  }

  return new Proxy(target, handler)

  // proxy 子属性
  function proxySubProp(target, handler) {
    // proxy 子属性
    for (let p in target) {
      if (typeof target[p] === 'object') {
        if (!isShallowObject(target[p])) {
          proxySubProp(target[p], handler)
        }
        target[p] = new Proxy(target[p], handler)
      }
    }
    // target = new Proxy(target, handler)
  }

  // 校验是否是单层对象
  function isShallowObject(target) {
    if (typeof target !== 'object') {
      return false
    }

    for (let p in target) {
      if (typeof target[p] === 'object') {
        return false
      }
    }

    return true
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

object = deepProxy(object, handler)
array = deepProxy(array, handler)

console.time('deepProxy')
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
console.timeEnd('deepProxy')
