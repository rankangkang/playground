function _new(ctor, ...args) {
  const obj = Object.create()
  // 继承原型
  Object.setPrototypeOf(obj, ctor.prototype)

  // 继承属性
  const obj2 = ctor.apply(obj, args)
  if (obj2) {
    return obj2
  }

  return obj
}

function _instanceof(obj, ctor) {
  let proto = Object.getPrototypeOf(obj)

  while (proto) {
    if (proto === ctor.prototype) {
      return true
    }

    proto = Object.getPrototypeOf(proto)
  }

  return false
}

function _inherit(sub, sup) {
  // p 继承父类原型，达到继承方法的目的
  const p = Object.create(sup.prototype)
  // 重写子类原型
  sub.prototype = Object.assign(p, sub.prototype)
  // 还原子类构造函数
  p.constructor = sub
}
