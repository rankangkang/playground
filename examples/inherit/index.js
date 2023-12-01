/**
 * 组合寄生继承
 * @param {*} sibType
 * @param {*} superType
 */
function inherit(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: subType,
    },
  })

  Object.setPrototypeOf(subType, superType)
}

// 父类
function Animal(name) {
  this.name = name
}

Animal.prototype.sayHello = function () {
  console.log("Hello, I'm " + this.name)
}

// 子类
function Cat(name, color) {
  Animal.call(this, name) // 调用父类的构造函数
  this.color = color
}

inherit(Cat, Animal) // 使用 inherit() 方法来实现继承

Cat.prototype.sayMeow = function () {
  console.log("Meow, I'm " + this.name)
}

// 使用示例
let cat = new Cat('Tom', 'gray')
cat.sayHello() // 输出：Hello, I'm Tom
cat.sayMeow() // 输出：Meow, I'm Tom
