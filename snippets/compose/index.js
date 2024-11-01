/**
 * 将 a(b(c(x))) 修改为 compose(a, b, c)(x) 的形式
 * @param  {...any} fns
 * @returns
 */
function compose(...fns) {
  return fns.reduce((res, fn) => {
    return (...args) => res(fn(...args))
  })
}

function a(arg) {
  return 'a' + arg
}

function b(arg) {
  return 'b' + arg
}

function c(arg) {
  return 'c' + arg
}

console.log(compose(a, b, c)('123'))
