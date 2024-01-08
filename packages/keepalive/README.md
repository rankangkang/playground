# keep-alive

- 提供 createKeepAlive 方法
  - 创建一个作用域，内部维护 context
  - 返回 Provider、use 钩子、KeepAlive 组件
- 导出 createKeepAlive 创建的默认结构，可直接使用

- context 维护元素节点，当前展示节点等信息
- keepalive 通过 context 获取当前展示节点，匹配到的进行展示，未匹配到的隐藏
