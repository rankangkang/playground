# keep-alive 与 auth

- <https://juejin.cn/post/7273434821807636515>
- <https://github.com/irychen/super-admin>

## 畅想

- 给 function 组件添加 meta 属性，存储可能会被使用到的信息，而不用在路由表配置
  - 简化路由匹配的开销
- 

## keep-alive 结构

提供 createKeepAlive 方法，返回 KeppAvliveProvider 组件、use 钩子、KeepAlive 组件。
