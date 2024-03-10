// instanceof 原理就是通过判断 c 是否在 target 的原型链上
function _instanceof(target, c) {
  if (typeof c !== 'function') {
    throw new Error('2nd parameter must be a function')
  }
  if (typeof target !== 'function' && typeof target !== 'object' || target === null) {
    return false
  }

  let proto = target.__proto__
  while(proto) {
    if (proto === c.prototype) {
      return true
    }
    proto = proto.__proto__
    // 可使用以下替代
    // proto = Object.getPrototypeOf(proto)
  }

  return false
}

let fn = function() {}

console.log(_instanceof(fn, Function))

fn = new Function()

console.log(_instanceof(fn, Function))

let o = {}
console.log(_instanceof(o, Object))

