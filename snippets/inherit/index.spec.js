function Parent(name, age) {
  this.name = name
  this.age = age
}

Parent.prototype.greet = function () {
  console.log(`hi, I'm ${this.name}`)
}

// 组合继承
function Child1(name, age) {
  Parent.call(this, name, age)
  this.sex = 'male'
}

Child1.prototype = new Parent()

console.log('组合继承')
const c1 = new Child1('kk', 24)
console.log(c1 instanceof Parent)
c1.greet()

// 原型继承
function prototypical_inherit(sup) {
  function f() {}
  f.prototype = sup
  return new f()
}

function Child2(name, age) {
  this.name = name
  this.age = age
}

Child2.prototype = prototypical_inherit(new Parent())

console.log('原型继承')
const c2 = new Child2('kk', 24)
console.log(c2 instanceof Parent)
c2.greet()

// 寄生组合继承
function inherit(subType, superType) {
  // p 继承父类原型，达到继承方法的目的
  const p = Object.create(superType.prototype)
  // 重写子类原型
  subType.prototype = Object.assign(p, subType.prototype)
  // 还原子类构造函数
  p.constructor = subType
}

function Child3(name, age) {
  this.name = name
  this.age = age
}

Child3.prototype.sayAge = function () {
  console.log(`${this.age}`)
}

inherit(Child3, Parent)

console.log('寄生组合继承')
const c3 = new Child3('kk', 24)
console.log(c3 instanceof Parent)
c3.greet()
c3.sayAge()
