function _new(ctor, ...args) {
  /**
   * 以构造器的原型为原型创建一个对象
   * 隐含继承原型这一步步骤
   * @example
   * obj.__proto__ = ctor.prototype
   */
  const obj = Object.create(ctor.prototype)

  // 继承属性
  const res = ctor.apply(obj, args)
  // 返回值
  return typeof res === 'object' ? res : obj
}

function Person(name, age) {
  console.log('constructor')
  this.name = name
  this.age = age
  return this
}

const o = _new(Person, 'kk', 34)
console.log(o.name, o.age)
console.log(o instanceof Person)
