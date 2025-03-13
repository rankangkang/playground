# javascript 模块体系设计指南

js 的模块化经历了各种历史时期，不同时期产生了不同的模块化方案。
截至目前，已出现了以下几种模块方案：

- `IIFE`：自执行函数（立即执行函数），一般由`<script>` 标签引入
- `AMD`：全称为 Asynchronous Module Definition，意为异步模块定义，顾名思义，异步加载模块，RequireJS 是实现范例
- `CJS`：即 CommonJS，由 Node JS 官方实现，适用于Node及其打包工具
- `UMD`：全称为 Universal Module Definition，意为通用模块定义，意在抹平 iife、amd 与 cjs 模块方案之间的差异。
- `SystemJS`：与 umd 类似，用得极少，不做讨论。（angular用的就是 SystemJS）
- `ESM`：官方的模块化方案，浏览器中使用 `<script type="module">` 标签引入。

目前，主流方案只剩下两种，分别为 ESM 和 CJS。ESM 诞生自 ES6，是官方自带的模块方案；CJS 则是 NodeJS 使用的方案。

但是为了支持不同的目标运行环境，需要编译成不同的输出格式（方案），了解不同的模块化方案是很有必要的。

> Rollup 是一个JavaScript打包工具，可输出不同模块化方案的代码。下文中将使用 Rollup 来理解打包的代码来帮助理解不同模块化方案在用法上的异同。

## IIFE

IIFE 是浏览器模块化早期产物，其核心思路是：

1. 构建匿名函数，外部依赖通过参数传入

2. 立刻执行该函数，返回模块输出（输出模块）（或将模块直接挂载到 window 上）

典型的 IIFE 模块方案代码示例如下：

```js
var myBundle = (function (lodash) {
  'use strict'
  const result = lodash.every([true, 1, null, 'yes'], Boolean)
  return result
})(lodash)
```

其执行方式也也很简单：如果没有其他依赖，只需引入源文件，并在 window 上取相应变量即可。如 jQuery 就是典型的自执行函数模式，当你引入后，它就会挂载到`window.$`上：

```html
<script src="http://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
<script>
  // 引入后使用
  window.$('#root')
</script>
```

但是如果你依赖了其他模块（如示例），则以下两个条件是必需的：

1. 此包依赖的包在此包之前完成加载
2. 前置依赖的包与 IIFE 自执行函数入参的变量名一致

以示例代码 myBoundle 为例：它前置依赖了 lodash，因此需要在它加载之前完成对 lodash 的加载；IIFE 的入参为 lodash，则需让 window.lodash 也指向 lodash。

```html
<head>
  <script src="https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min.js"></script>
  <!-- 使 window.lodash 指向 lodash -->
  <script>
    window.lodash = window._
  </script>
  <script src="./bundle.js"></script>
</head>
<body>
  <script>
    console.log(window.myBundle)
  </script>
</body>
```

从上文可以看出，IIFE 方案的优点很多：

- 巧用闭包创建私有命名空间，可避免全局污染、防止外部直接修改内部私有变量。
- 依赖自执行函数，代码简单易懂
- IIFE 模块方案代码量小，对模块体积影响不大

缺点也不少，如：

- 需使用者自行维护依赖及其加载顺序
- 引入依赖包时依赖全局变量
- 模块输出可能影响其他全局变量
- ...

## AMD

AMD 全称为 _Asynchronous Module Definition_，意为*异步模块定义*，RequireJS 是其最佳实践者，其核心思路是：

- AMD 采用异步方式加载模块，模块的加载不影响其余语句的执行。
- 所有依赖该模块的的语句，均定义在一个回调函数中，等到模块加载完成之后，回调函数才会运行；模块经由回调的入参传递给依赖语句。

一份典型的 AMD 格式代码如下：

```js
// lodash.js，定义 lodash 模块
define(function (require) {
  // lodash 实现
  // ...
})

// myBundle.js，定义 myBundle 模块
define('myBundle', ['lodash'], function (lodash) {
  'use strict'
  const result = lodash.every([true, 1, null, 'yes'], Boolean)
  return result
})

// 引用 myBundle 模块
// require(['myBundle'], (function (myBundle) {
//   'use strict';
//   console.log(myBundle)
// }));
```

> AMD 模块有几个主要的命令：
>
> - config(opt)：全局依赖配置
> - define(id?, dependencies?, factory)：用于定义模块
> - require(id)：用于导入其他模块
> - return：返回模块的对外接口

其运行（使用）方式较为复杂，一般过程如下：

```html
<head>
  <!-- 1. 引入 require.js -->
  <script src="./require.js"></script>
  <!-- 2. 定义全局依赖 -->
  <script>
    window.requirejs.config({
      paths: {
        lodash: 'https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.min',
      },
    })
  </script>
  <!-- 3. 定义模块 -->
  <script src="./myBundle.js"></script>
</head>
<body>
  <script>
    // 4. 开销模块
    window.requirejs(['myBundle'], function (myBundle) {
      console.log(myBundle)
    })
  </script>
</body>
```

AMD 方案的优点如下：

- 解决了 IIFE 的缺点
- 面向浏览器，完备的浏览器模块解决方案

缺点也相当明显：

- 代码组织形式别扭
- 使用方式较为复杂

## CJS

CJS 是 CommonJS 的简称，适用于浏览器之外的 NodeJS 及其生态系统。

CJS 在NodeJS 服务端被广泛使用，主要通过 `require` 和 `module.exports` 来导入、导出模块。

CJS 的模块设计考虑到了服务器开发，所以这个API是天生同步的。也即，程序将按代码 require 顺序同步加载模块。

CJS是同步的，且不能被浏览器识别，所以不能在浏览器端使用，除非被转译器打包（webpack、rollup、esbuild 等）。

以下为 CJS 格式代码：

```js
'use strict'
var lodash = require('lodash')
const result = lodash.every([true, 1, null, 'yes'], Boolean)
module.exports = result
```

运行极为简单，只要在 NodeJS 环境下即可：

```js
// main.js
const MyBundle = require('./bundle')
console.log(MyBundle)
```

```bash
node main.js
```

CJS 有如下优点（特点）：

- NodeJS 实现，考虑服务器开发，天生同步
- 通过 require 导入模块，通过 module.exports 导出模块，简单直接
- 导入得到的是对象的副本，模块本身不会实时更改
- 解决了 IIFE 方案的问题

缺点（特点）也有：

- 无法 tree-shake（摇树优化）：导出结构是一个对象，属性查找在运行时进行，无法静态分析
- 循环依赖是个问题
- 不支持浏览器环境（浏览器端，异步加载是更合理的方案），不是通用的模块设计

## UMD

UMD 全称是 _Universal Module Definition_，意为通*用模块定义*，该模式主要用于解决 AMD 与 CJS 模式不通用的问题，同时支持 IIFE 模式。

UMD 的核心思路如下：

1. 判断是否为 CJS 模式（module.exports 是否存在），存在则使用 CJS 模式规范
2. 判断是否为 AMD 模式（define 与 define.amd 是否存在），存在则使用 AMD 模式规范
3. 若以上两种都没有，则使用为 IIFE 模式规范

示例代码如下：

```js
;(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('lodash')))
    : typeof define === 'function' && define.amd
      ? define(['lodash'], factory)
      : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self),
        (global.myBundle = factory(global.lodash)))
})(this, function (lodash) {
  'use strict'
  const result = lodash.every([true, 1, null, 'yes'], Boolean)
  return result
})
```

其运行方式在浏览器端与 AMD 规范完全一致；在 NodeJS 端与 CJS 规范完全一致。

UMD 模式规范的有点有如下几点：

- 抹平 AMD 与 CJS 之间的差异，同时兼容了 IIFE
- 同时支持AMD、CJS与IIFE，可运行在浏览器与服务器环境。

缺点也有：

- 为了兼容产生大量不好理解的代码，增加了理解难度与包体积

## ESM

ESM 是 ES Modules 的简写，是 JavaScript 官方的标准化模块系统。

相比 CJS，ESM 有如下特点：

- JS 官方标准，主流浏览器均会支持，同时 NodeJS 也支持
- 通过 import 、export 确定模块导入、导出，不能省略 .js 后缀
- 兼容在 NodeJS 环境运行，可与 CJS 模块混合使用
- ESM 输出值的引用（即输出接口动态绑定），而 CJS 输出值的拷贝
- ESM 模块在编译时加载（即所有 import 模块都加载完成后才会开始执行），而 CJS 模块在运行时加载
- 支持静态分析，所以支持 tree-shake（摇树优化）
- 更好的循环依赖管理

ESM 格式的代码如下：

```js
import { every } from 'lodash'

const result = every([true, 1, null, 'yes'], Boolean)

export { result as default }
```

如何运行？相信不用我多说，你已了然于心：

```js
<script src="./bundle.js" type="module"></script>
```

## 总结

不同模式的规范分别适合用在什么场景呢？

- IIFE：部分作为 SDK 使用，尤其是挂载到全局 window / global 的场景
- AMD：仅浏览器端使用的场景
- UMD：既可以在浏览器也可以在 NodeJS 环境使用的场景
- CJS：仅 NodeJS 使用的场景，如服务器开发、NodeJS 工具库等
- ESM：被引用、二次编译的场景（如组件库）；浏览器调试（如基于 Vite 的开发）；开发浏览器兼容性要求宽松的应用等。

对打包工具来说，ESM 模块可以更容易地进行 tree-shake 优化，因此对于库开发者来说，ESM 规范非常重要。可以看到，现在越来越多地库开始导出 ESM 规范格式地代码，纯 ESM 模块数量也越来越多。在现在，你开发的库可以只输出 ESM 格式代码。

ESM 是 JS 模块化的未来，但当前 CJS 在大前端社区与生态中占有举足轻重的地位，二者可谓并驾齐驱。
