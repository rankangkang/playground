# 继承方式

## 1. 组合式继承

- 通过类式继承继承方法（即通过设置 子类 的 prototype 属性为父类实例）
- 通过构造函数式继承继承属性（即在子类构造函数中调用父类构造函数，将父类的 this 指向子类）

```js
function Parent(name) {
  this.name = name
  Parent.prototype.greet = function () {
    console.log(`hi, I'm ${this.name}`)
  }
}

function Child(name, age) {
  // 构造函数继承：继承属性
  Parent.call(this, name)
  this.age = age
}
// 类式继承：继承方法
Child.prototype = new Parent()

const c = new Child('kk', 24)
console.log(c instanceof Parent) // true
c.greet() // hi, I'm kk
```

该方法弥补了 类式继承 与 构造函数继承，但仍然存在一些问题：

- 父类构造函数被调用了两次，显得多余且不便理解
- ...

Child 实例结构为：

> 注：`[[prototype]]` 即为对象的 `__proto__` 属性。实例的 `__proto__` 指向方法的 `prototype`。

```js
console.log(c)
// Child {name: 'kk', age: 24}
//   age: 24
//   name: "kk"
//   [[Prototype]]: Parent      # Parent 实例
//     name: undefined
//     [[Prototype]]: Object
//       greet: ƒ ()
//       constructor: ƒ Parent(name)
//       [[Prototype]]: Object
```

## 原型链继承

为 类式继承 的一种封装，独特之处在于提供了一个干净的临时中间类。

```js
function prototypical_inherit(obj) {
  function f() {}
  f.prototype = obj
  return new f()
}

function Parent(name, age) {
  this.name = name
  Parent.prototype.greet = function () {
    console.log(`hi, I'm ${this.name}`)
  }
}

function Child(name, age) {
  this.name = name
  this.age = age
}

Child.prototype = prototypical_inherit(new Parent())
const c = new Child('kk', 24)
console.log(c instanceof Parent) // true
c.greet() // hi, I'm kk
```

可以看出，`prototypical_inherit` 的实现与 es5 的 `Object.create` 方法类似。原型链继承 应该归为 类式继承 的一种实现方式。

Child 的实例结构如下：

```js
console.log(c)
// Child {name: 'kk', age: 24}
//   age: 24
//   name: "kk"
//   [[Prototype]]: Parent      # 中间类 f 实例，其原型为 Parent 实例
//     [[Prototype]]: Parent    # Parent 实例
//       name: undefined
//       [[Prototype]]: Object  # Parent.prototype
//         greet: ƒ ()
//         constructor: ƒ Parent(name, age)
//         [[Prototype]]: Object
```

可以看到原型链上出现了两层 `[[Prototype]]: Parent`，因为 Parent 被实例化过一次（作为中间类的原型）后才作为 Child 的原型。
假如 `Child.prototype` 定义了一个名为 `sayAge` 的方法，那么在继承后 Child 的属性将无法调用 `sayAge` 方法，因为原 `Child.prototype` 已被覆盖 。

## 寄生组合继承

寄生继承 与 组合继承 结合的产物，推荐使用。

```js
function inherit(subType, superType) {
  // p 继承父类原型，达到继承方法的目的
  const p = Object.create(superType.prototype)
  // 重写子类原型：将父类原型与子类原型合并
  subType.prototype = Object.assign(p, subType.prototype)
  // 还原子类构造函数
  p.constructor = subType
}

function Parent(name) {
  this.name = name
}

Parent.prototype.greet = function () {
  console.log(`hi, I'm ${this.name}`)
}

function Child(name, age) {
  this.name = name
  this.age = age
}

Child.prototype.sayAge = function () {
  console.log(`${this.age}`)
}

inherit(Child, Parent)

const c = new Child('kk', 24)
console.log(c instanceof Parent) // true
c.greet() // hi, I'm kk
c.sayAge()
```

Child 实例结构如下：

```js
console.log(c)
// Child {name: 'kk', age: 24}
//   age: 24
//   name: "kk"
//   [[Prototype]]: Parent    # Parent.prototype 与 Child.prototype 组合体
//     constructor: ƒ Child(name, age)
//     sayAge: ƒ ()
//     [[Prototype]]: Object  # Parent.prototype
//       greet: ƒ ()
//       constructor: ƒ Parent(name)
//       [[Prototype]]: Object
```

可以看到，组合寄生继承完美继承子类型与父类型的方法，且没有无用的属性被初始化。
