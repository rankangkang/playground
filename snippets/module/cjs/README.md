# cjs 导出值的拷贝

cjs 导出的是值的拷贝：

- 导出的是原始类型时，导出的是原始类型的值拷贝，类似于 const，外部修改会直接报错。
- 导出的是引用类型时，导出的是引用的拷贝，此时可通过该引用修改指向的对象的属性值。

```js
const c = require('./count')
const v = require('./value')

console.log('step 0:', v, v.value, v.getValue()) // { value: 1, getValue: [Function: getValue], inc: [Function: inc] } 1 1
v.inc()
console.log('step 1:', v, v.value, v.getValue()) // { value: 2, getValue: [Function: getValue], inc: [Function: inc] } 2 2

console.log('step 1:', c) // 0
c++ // TypeError: Assignment to constant variable.
console.log('step 2:', c)
```

## CommonJS 原理

一个 cjs 模块通常长下面这样：

```js
const count = require('./count')

module.exports = {
  count,
}
```

我们可以把模块看做是定义在一个函数内部，事实上也确实是这样的，因为在模块中，你可以直接使用 `arguments`，这是函数所独有的：

```js
const count = require('./count')

console.log(arguments.length) // 5

module.exports = {
  count,
}
```

通过打印发现，`arguments` 的长度是 5，说明这个包裹着模块的函数传递了 5 个参数，通过打印会发现结果如下：

```js
console.log(arguments[0] === exports) // true
console.log(arguments[1] === require) // true
console.log(arguments[2] === module) // true
console.log(arguments[3] === __filename) // true
console.log(arguments[4] === __dirname) // true
```

- 第一个入参是 `exports`，实际上它是 `module.exports` 的简单引用
- 第二个入参是 `require` 方法
- 第三个参数是 `module`
- 第四个入参是 `__filename`
- 第五个入参是 `__dirname`

发现这些会让人豁然开朗，结合我们已经知道的信息，实际上我们可以自行模拟出 cjs 的实现：

```js
export function require(moduleId) {
  // moduleId 实际上就是文件的绝对路径，这里可能存在一些 moduleId 转化，如把 相对路径转绝对路径、npm 包名转为路径等
  if (moduleCache.has(moduleId)) {
    // 已被加载的模块，直接进行返回
    return moduleCache.get(moduleId)
  }

  // 包裹模块的方法
  function _require(exports, require, module, __filename, __dirname) {
    // your code here
    // your code here
  }

  var module = {
    exports: {},
  }
  var exports = module.exports
  var __filename = moduleId
  var __dirname = path.dirname(moduleId)

  // 执行这个方法，取得 module.exports
  _require.apply(exports, [exports, require, module, __filename, __dirname])

  moduleCache.set(moduleId, module.exports)

  return module.exports
}
```

示例 👉🏻 [这里](./commonjs/require.mjs)，在 mjs 下模拟 commonjs 行为。
