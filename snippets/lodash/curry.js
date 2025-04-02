/**
 * 柯里化函数
 */
function curry(fn, argLen = fn.length) {
  return function next(...args) {
    if (args.length < argLen) {
      // 参数长度不够，返回函数，继续接受参数
      return (...extraArgs) => {
        return next(...args, ...extraArgs)
      }
    }

    // 达到长度，截取定长参数
    return fn(...args.slice(0, argLen))
  }
}

function add(...args) {
  let res = 0
  args.forEach((arg) => {
    res += arg
  })

  return res
}

const curryAdd = curry(add, 4)
const c1 = curryAdd(1, 2, 3)(4)
console.log(c1)
const c2 = curryAdd(1)(2)(3)(4)
console.log(c2)
const c3 = curryAdd(1, 2)(3, 4, 5)
console.log(c3)
const c4 = curryAdd(1, 2, 3)(4, 5)
console.log(c4)
