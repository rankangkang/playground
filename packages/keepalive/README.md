# keepalive 实现原理

核心原理：将组件渲染到一个不会被卸载的地方，从而达到状态保持的目的。

## 实现原理

1. 将组件渲染到一个不会被卸载的地方，通常为所有需要缓存的组件的父级组件，我们称之为 scope，如 ReactRouter 外
2. 组件 dom 结构渲染完成后，将 dom 移动到其正确的层次结构，并在组件卸载时移回 scope

## 参考文档

- <https://github.com/CJY0208/react-activation>
- <https://juejin.cn/post/7122617883837857806>
