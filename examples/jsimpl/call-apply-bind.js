// call 用于切换 this 指向，并立即执行该函数
// 故只需在 context 上先添加这个方法，执行后删除即可
Function.prototype._call = function(context, ...args) {
  const symbol = Symbol()
  context[symbol] = this
  const result = context[symbol]?.(...args)
  delete context[symbol]
  return result
}

// apply 同 call，只是参数传入方式不一样
Function.prototype._apply = function(context, args) {
  const symbol = Symbol()
  context[symbol] = this
  const result = context[symbol]?.(...args)
  delete context[symbol]
  return result
}

// bind 返回一个新函数，新函数的 this 指向 context
// 我们只需要保证目标函数执行时 this 指向 context 即可
Function.prototype._bind = function(context) {
  if (typeof this !== 'function') {
    throw new Error("this must be function")
  }
  const self = this
  return function(...args) {
    self._call(context, ...args)
  }
}

function sayHello(...args) {
  console.log(`hello ${this.name}!`, ...args)
}

sayHello._call({ name: 'world' }, Date.now(), Date.now())

sayHello._apply({ name: 'world' }, [Date.now(), Date.now()])

const _sayHello = sayHello._bind({ name: 'world' })
_sayHello(Date.now(), Date.now())
