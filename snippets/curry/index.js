function curry(fn, argLen) {
  return (...args) => {
    return run(args, argLen)
  }

  function run(args) {
    const len = args.length
    if (len < argLen) {
      return (...extraArgs) => {
        return run([...args, ...extraArgs], argLen - len)
      }
    }

    return fn(...args)
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
const c3 = curryAdd(1, 2)(3, 4)
console.log(c2)
