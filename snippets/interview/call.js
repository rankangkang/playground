Function.prototype._call = function (context, ...args) {
  const self = this
  // 核心思想是改变 this 指向，然后执行
  const symbol = Symbol()
  context[symbol] = self
  const result = context[symbol](...args)
  delete context[symbol]
  return result;
}

Function.prototype._bind = function (context, ...args) {
  const self = this;
  return function (...restArgs) {
    return self._call(context, ...args, ...restArgs)
  }
}