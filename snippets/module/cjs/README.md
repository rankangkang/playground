# cjs 导出值的拷贝

为什么说 cjs 输出的是值的拷贝？

以下示例：

- export.js：

  ```js
  // 模块 count.js
  let count = 0

  module.exports = {
    count,
    getCount: () => {
      return count
    },
    increment: function () {
      count++
    },
  }

  setTimeout(() => {
    console.log('count', count)
  })
  ```

- index.js

  ```js
  const c = require('./count')

  console.log('index c.count', c.count) // 输出 0
  console.log('index c.getCount', c.getCount()) // 输出 0
  c.increment()
  console.log('index c.count', c.count) // 输出 0
  console.log('index c.getCount', c.getCount()) // 输出 1
  ```

运行 index.js ，有如下输出：

```bash
index c.count 0
index c.getCount 0
index c.count 0
index c.getCount 1
count 1
```

可以发现，对 c.count 的输出不会随着增加 count 而改变，而通过 getCount 闭包方法获取的 count 则是正常的，由此可以证明 cjs 导出的是值得拷贝。
（基础类型的值拷贝为直接赋值，引用类型的拷贝会把引用赋给对应属性，这也是为什么通过闭包方法可以获取到正确的输出）
