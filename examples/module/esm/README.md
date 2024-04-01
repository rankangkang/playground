# esm 导出值的引用

为什么说 esm 输出的是值的引用？

以下示例：

- export.mjs：

  ```js
  export let count = 0

  export function addCount() {
    count++
  }

  setTimeout(() => {
    console.log('count', count)
  })
  ```

- index.mjs
  
  ```js
  import { count, addCount } from './count.mjs'

  console.log('index', count) // 0

  addCount()

  console.log('index', count) // 1
  ```

运行 index.mjs ，有如下输出：

```bash
index 0
index 1
count 1
```

可以发现，当调用 addCount 闭包方法改变 count 后，导入的 count 值也发生了改变。由此可以证明，esm 输出的是值的引用。
